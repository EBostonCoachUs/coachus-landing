import { configured, equalSecret, response, rpc, unseal } from "./runtime.mjs";
export function messageFor(job, lead, env) {
  if (job.kind === "verification") {
    const token = unseal(job.sealed_token, env.TOKEN_ENCRYPTION_KEY);
    return {
      from: env.FROM_ADDRESS,
      to: [lead.email],
      reply_to: env.LEAD_NOTIFY_TO,
      subject: "Confirm your CoachUS request",
      text: `Thanks for your interest in CoachUS. Confirm your email so we can follow up about your dealership and next steps.\n\n${env.PUBLIC_ORIGIN}/verify#token=${token}\n\nThis link expires 24 hours after the request. Opening the page does not confirm your request; select “Confirm my email” there.\n\nIf you did not make this request, ignore this email. This does not reserve a pilot place.`,
    };
  }
  return {
    from: env.FROM_ADDRESS,
    to: [env.LEAD_NOTIFY_TO],
    reply_to: lead.email,
    subject: "Verified CoachUS early-access request",
    text: `A prospect confirmed their email.\n\nName: ${lead.name}\nDealership: ${lead.dealership}\nRole: ${lead.role}\nEmail: ${lead.email}\n\nLead ID: ${lead.id}\nReview the company-controlled lead queue, record fit and next action, and reply when ready.\nEmail verification establishes mailbox control, not dealership identity or buying authority.`,
  };
}
export async function sendMessage(message, id, env, fetcher = fetch) {
  const res = await fetcher("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `coachus/${id}`,
    },
    body: JSON.stringify(message),
    signal: AbortSignal.timeout(12000),
  });
  const result = await res.json();
  if (!res.ok || !result.id) throw new Error("email_not_accepted");
  return result.id;
}
export function createOutbox({
  env = process.env,
  storage = (n, a) => rpc(n, a, env),
  send = (m, id) => sendMessage(m, id, env),
} = {}) {
  return async function (req, res) {
    if (req.method !== "GET") return response(res, 405, { ok: false });
    if (!configured(env)) return response(res, 503, { ok: false });
    if (!equalSecret(req.headers?.authorization, `Bearer ${env.CRON_SECRET}`))
      return response(res, 401, { ok: false });
    let accepted = 0,
      failed = 0;
    try {
      // Bound execution to one job; one-minute cron is ample for an early-stage funnel.
      const item = await storage("coachus_claim_job", {});
      if (!item) return response(res, 200, { ok: true, accepted, failed });
      const { job, lead } = item;
      let provider = null,
        error = null;
      try {
        provider = await send(messageFor(job, lead, env), job.id);
        accepted++;
      } catch {
        error = "email_not_accepted";
        failed++;
      }
      await storage("coachus_finish_job", {
        p_id: job.id,
        p_lease: job.lease,
        p_provider_id: provider,
        p_error: error,
      });
      return response(res, 200, { ok: true, accepted, failed });
    } catch {
      return response(res, 503, { ok: false });
    }
  };
}
