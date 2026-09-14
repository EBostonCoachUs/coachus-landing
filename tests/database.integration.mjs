import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
const { PGlite } = await import(
  process.env.PGLITE_MODULE || "@electric-sql/pglite"
);
const db = new PGlite();
let count = 0;
const check = (condition, message) => {
  assert.ok(condition, message);
  count++;
};
try {
  await db.exec(
    "create role anon; create role authenticated; create role service_role;",
  );
  await db.exec(await readFile("server/schema.sql", "utf8"));
  const intake = async (key = "email", ip = "ip") =>
    (
      await db.query(
        "select public.coachus_intake($1,$2,'Alex','alex@example.com','Example Motors','General Manager','{}','hash','sealed') as result",
        [key, ip],
      )
    ).rows[0].result;
  check((await intake()).ok, "receipt");
  check(
    (await db.query("select * from public.coachus_leads")).rows.length === 1,
    "durable lead",
  );
  check(
    (await db.query("select * from public.coachus_outbox")).rows.length === 1,
    "durable outbox",
  );
  await intake();
  check(
    (await db.query("select * from public.coachus_outbox")).rows.length === 1,
    "duplicate does not create send",
  );
  const job = (await db.query("select public.coachus_claim_job() as result"))
    .rows[0].result;
  check(job.job.attempts === 1 && job.job.state === "sending", "lease job");
  check(
    (await db.query("select public.coachus_claim_job() as result")).rows[0]
      .result === null,
    "leased job cannot be claimed again",
  );
  check(
    (
      await db.query(
        "select public.coachus_finish_job($1,$2,null,$3) as result",
        [job.job.id, job.job.lease, "email_not_accepted"],
      )
    ).rows[0].result,
    "record failure",
  );
  check(
    (await db.query("select state from public.coachus_outbox")).rows[0]
      .state === "pending",
    "retry retained",
  );
  check(
    !(await db.query("select public.coachus_verify('bad') as result")).rows[0]
      .result.ok,
    "bad token rejected",
  );
  check(
    (await db.query("select public.coachus_verify('hash') as result")).rows[0]
      .result.ok,
    "confirm",
  );
  check(
    !(await db.query("select public.coachus_verify('hash') as result")).rows[0]
      .result.ok,
    "single use",
  );
  check(
    (
      await db.query(
        "select count(*)::int as n from public.coachus_outbox where kind='notification'",
      )
    ).rows[0].n === 1,
    "one notification",
  );
  await intake();
  check(
    (
      await db.query(
        "select count(*)::int as n from public.coachus_outbox where kind='notification'",
      )
    ).rows[0].n === 1,
    "verified duplicate neutral",
  );
  check(
    (await db.query("select status from public.coachus_leads")).rows[0]
      .status === "needs_review",
    "Matt queue",
  );
  const notify = (await db.query("select public.coachus_claim_job() as result"))
    .rows[0].result;
  await db.query("select public.coachus_finish_job($1,$2,$3,null)", [
    notify.job.id,
    notify.job.lease,
    "provider-id",
  ]);
  check(
    (
      await db.query(
        "select state from public.coachus_outbox where kind='notification'",
      )
    ).rows[0].state === "accepted",
    "accepted is recorded separately from delivered",
  );
  await intake("expired", "another-ip");
  await db.exec(
    "update public.coachus_leads set token_expires_at=now()-interval '1 hour' where email_key='expired';",
  );
  check(
    !(await db.query("select public.coachus_verify('hash') as result")).rows[0]
      .result.ok,
    "expired rejected",
  );
  for (let i = 0; i < 30; i++) await intake("volume-" + i, "shared-ip");
  check(
    (await intake("over-limit", "shared-ip")).limited,
    "shared-IP rate budget",
  );
  check(
    (
      await db.query(
        "select has_table_privilege('anon','public.coachus_leads','select') as allowed",
      )
    ).rows[0].allowed === false,
    "no browser read",
  );
  check(
    (
      await db.query(
        "select has_function_privilege('anon','public.coachus_verify(text)','execute') as allowed",
      )
    ).rows[0].allowed === false,
    "no anonymous RPC",
  );
  console.log(
    `Database integration: ${count} checks passed. Local PostgreSQL runtime, fictional data only.`,
  );
} finally {
  await db.close();
}
