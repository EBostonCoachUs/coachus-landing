-- Proposed Supabase/Postgres adapter. Apply only to a company-controlled project after review.
-- No anonymous/browser grants. All writes pass through the server-only service role.
begin;
create table if not exists public.coachus_leads (
 id uuid primary key default gen_random_uuid(), email_key text not null unique,
 name text not null, email text not null, dealership text not null, role text not null,
 campaign jsonb not null default '{}', created_at timestamptz not null default now(),
 verified_at timestamptz, last_sent_at timestamptz, token_hash text, token_expires_at timestamptz,
 status text not null default 'unverified' check(status in ('unverified','needs_review','qualified','needs_information','not_now','spam')),
 next_action text, owner text not null default 'Matt Cady', do_not_email boolean not null default false
);
create table if not exists public.coachus_outbox (
 id uuid primary key default gen_random_uuid(), lead_id uuid not null references public.coachus_leads(id) on delete cascade,
 kind text not null check(kind in ('verification','notification')), sealed_token text,
 state text not null default 'pending' check(state in ('pending','sending','accepted','failed','cancelled')),
 created_at timestamptz not null default now(), next_attempt_at timestamptz not null default now(),
 attempts integer not null default 0, lease uuid, provider_id text, error_class text
);
create table if not exists public.coachus_attempts (
 id bigint generated always as identity primary key, email_key text not null, ip_key text not null, created_at timestamptz not null default now()
);
alter table public.coachus_leads enable row level security;
alter table public.coachus_outbox enable row level security;
alter table public.coachus_attempts enable row level security;
revoke all on public.coachus_leads,public.coachus_outbox,public.coachus_attempts from public,anon,authenticated;
grant all on public.coachus_leads,public.coachus_outbox,public.coachus_attempts to service_role;
grant usage,select on sequence public.coachus_attempts_id_seq to service_role;
create index if not exists coachus_outbox_due on public.coachus_outbox(state,next_attempt_at);
create index if not exists coachus_attempts_recent on public.coachus_attempts(created_at);

create or replace function public.coachus_intake(p_email_key text,p_ip_key text,p_name text,p_email text,p_dealership text,p_role text,p_campaign jsonb,p_token_hash text,p_sealed_token text)
returns jsonb language plpgsql security invoker set search_path='' as $$
declare l public.coachus_leads;
begin
 -- Low-volume intake: serialize the budget check and receipt, avoiding race oversends.
 perform pg_advisory_xact_lock(733491);
 delete from public.coachus_attempts where created_at<now()-interval '24 hours';
 if (select count(*) from public.coachus_attempts)>=100 or
    (select count(*) from public.coachus_attempts where ip_key=p_ip_key and created_at>now()-interval '10 minutes')>=30 then
   return jsonb_build_object('limited',true);
 end if;
 insert into public.coachus_attempts(email_key,ip_key) values(p_email_key,p_ip_key);
 select * into l from public.coachus_leads where email_key=p_email_key for update;
 if found and (l.verified_at is not null or l.do_not_email or l.last_sent_at>now()-interval '5 minutes') then return jsonb_build_object('ok',true); end if;
 if (select count(*) from public.coachus_outbox o join public.coachus_leads a on a.id=o.lead_id where a.email_key=p_email_key and o.kind='verification' and o.created_at>now()-interval '24 hours')>=3 then return jsonb_build_object('ok',true); end if;
 if l.id is null then
  insert into public.coachus_leads(email_key,name,email,dealership,role,campaign) values(p_email_key,p_name,p_email,p_dealership,p_role,p_campaign) returning * into l;
 else
  update public.coachus_leads set name=p_name,email=p_email,dealership=p_dealership,role=p_role,campaign=p_campaign where id=l.id;
 end if;
 update public.coachus_outbox set state='cancelled',sealed_token=null where lead_id=l.id and kind='verification' and state in ('pending','failed');
 update public.coachus_leads set token_hash=p_token_hash,token_expires_at=now()+interval '24 hours',last_sent_at=now() where id=l.id;
 insert into public.coachus_outbox(lead_id,kind,sealed_token) values(l.id,'verification',p_sealed_token);
 return jsonb_build_object('ok',true);
end $$;

create or replace function public.coachus_verify(p_hash text) returns jsonb language plpgsql security invoker set search_path='' as $$
declare lead uuid;
begin
 update public.coachus_leads set verified_at=now(),status='needs_review',token_hash=null,token_expires_at=null
 where token_hash=p_hash and token_expires_at>now() and verified_at is null and not do_not_email returning id into lead;
 if lead is null then return jsonb_build_object('ok',false); end if;
 update public.coachus_outbox set state='cancelled',sealed_token=null where lead_id=lead and kind='verification' and state in ('pending','failed');
 insert into public.coachus_outbox(lead_id,kind) values(lead,'notification');
 return jsonb_build_object('ok',true);
end $$;

create or replace function public.coachus_claim_job() returns jsonb language plpgsql security invoker set search_path='' as $$
declare job public.coachus_outbox; lead public.coachus_leads;
begin
 -- Never retry outside the email provider's 24-hour idempotency window.
 update public.coachus_outbox set state='failed',sealed_token=null,error_class='retry_window_ended' where state in ('pending','sending') and (created_at<now()-interval '23 hours' or (attempts>=5 and next_attempt_at<=now()));
 select o.* into job from public.coachus_outbox o where o.state in ('pending','sending') and o.next_attempt_at<=now() and o.attempts<5 order by o.created_at limit 1 for update skip locked;
 if job.id is null then return null; end if;
 select * into lead from public.coachus_leads where id=job.lead_id;
 if lead.do_not_email or (job.kind='verification' and (lead.verified_at is not null or lead.token_expires_at<=now())) then
  update public.coachus_outbox set state='cancelled',sealed_token=null where id=job.id;return null;
 end if;
 update public.coachus_outbox set state='sending',attempts=attempts+1,next_attempt_at=now()+interval '5 minutes',lease=gen_random_uuid() where id=job.id returning * into job;
 return jsonb_build_object('job',to_jsonb(job),'lead',to_jsonb(lead));
end $$;

create or replace function public.coachus_finish_job(p_id uuid,p_lease uuid,p_provider_id text,p_error text) returns boolean language plpgsql security invoker set search_path='' as $$
begin
 update public.coachus_outbox set state=case when p_provider_id is not null then 'accepted' when attempts>=5 then 'failed' else 'pending' end,
 provider_id=p_provider_id,error_class=p_error,sealed_token=case when p_provider_id is not null or attempts>=5 then null else sealed_token end,
 next_attempt_at=now()+make_interval(mins=>least(60,power(2,attempts)::integer)),lease=null
 where id=p_id and lease=p_lease and state='sending';return found;
end $$;
revoke all on function public.coachus_intake(text,text,text,text,text,text,jsonb,text,text),public.coachus_verify(text),public.coachus_claim_job(),public.coachus_finish_job(uuid,uuid,text,text) from public,anon,authenticated;
grant execute on function public.coachus_intake(text,text,text,text,text,text,jsonb,text,text),public.coachus_verify(text),public.coachus_claim_job(),public.coachus_finish_job(uuid,uuid,text,text) to service_role;
commit;
-- Matt's queue: use a company-controlled authenticated admin surface, never a public browser key.
-- select name,email,dealership,role,verified_at,status,next_action from public.coachus_leads where status='needs_review' order by verified_at;
-- select id,kind,state,attempts,error_class from public.coachus_outbox where state='failed';
-- Owner/counsel must approve retention and deletion jobs for leads, outbox, logs, and backups before activation.
