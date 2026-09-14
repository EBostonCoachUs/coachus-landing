import test from "node:test";
import assert from "node:assert/strict";
import { validateIntake, campaignFromSearch } from "../shared/intake.mjs";
import { createSubscribe, createVerify } from "../server/handlers.mjs";
import {
  configured,
  hash,
  seal,
  unseal,
  verifyChallenge,
} from "../server/runtime.mjs";
import { createOutbox, sendMessage, messageFor } from "../server/outbox.mjs";
const env = {
  EARLY_ACCESS_ENABLED: "true",
  RELEASE_APPROVED: "true",
  RESEND_API_KEY: "test",
  FROM_ADDRESS: "CoachUS <test@example.com>",
  LEAD_NOTIFY_TO: "owner@example.com",
  PUBLIC_ORIGIN: "https://www.example.com",
  SUPABASE_URL: "https://test.supabase.co",
  SUPABASE_SERVICE_ROLE_KEY: "test",
  TURNSTILE_SECRET_KEY: "test",
  TURNSTILE_HOSTNAME: "www.example.com",
  CRON_SECRET: "test-cron",
  TOKEN_ENCRYPTION_KEY: "a".repeat(64),
  ABUSE_HASH_KEY: "b".repeat(32),
  VERCEL: "1",
};
const body = {
  name: "李",
  email: "Alex+Dealer@EXAMPLE.COM",
  dealership: "O’Neill Motors",
  role: "General Manager",
  turnstileToken: "test",
};
const req = (over = {}) => ({
  method: "POST",
  headers: {
    origin: env.PUBLIC_ORIGIN,
    "content-type": "application/json",
    "x-vercel-forwarded-for": "192.0.2.10",
  },
  body: { ...body },
  ...over,
});
function res() {
  return {
    headers: {},
    setHeader(k, v) {
      this.headers[k] = v;
    },
    status(n) {
      this.code = n;
      return this;
    },
    json(v) {
      this.data = v;
      return this;
    },
  };
}
test("Unicode/single names, personal email and plus tags remain valid; only email domain is lowercased", () => {
  const v = validateIntake(body);
  assert.deepEqual(v.errors, {});
  assert.equal(v.value.email, "Alex+Dealer@example.com");
  assert.deepEqual(
    validateIntake({ ...body, email: "dealer@gmail.com" }).errors,
    {},
  );
});
test("malformed, oversized, control characters and role injection are rejected", () => {
  for (const value of [
    null,
    [],
    { ...body, name: 123 },
    { ...body, name: "x".repeat(121) },
    { ...body, email: "a\r\nb@example.com" },
    { ...body, email: "a@@example.com" },
    { ...body, role: "admin" },
  ])
    assert.ok(Object.keys(validateIntake(value).errors).length);
});
test("attribution omits raw URLs, email values and unsupported keys", () => {
  assert.deepEqual(
    campaignFromSearch(
      "?utm_source=dealer_email&utm_campaign=fall26&email=x@y.com&utm_medium=a@y.com",
    ),
    { utm_source: "dealer_email", utm_campaign: "fall26" },
  );
});
test("unconfigured intake fails closed without touching storage", async () => {
  let calls = 0;
  const response = res();
  await createSubscribe({ env: {}, storage: () => calls++ })(req(), response);
  assert.equal(response.code, 503);
  assert.equal(calls, 0);
  assert.equal(configured(env), true);
});
test("origin mismatch, invalid payload and failed bot verification do not persist", async () => {
  let calls = 0;
  const handler = createSubscribe({
    env,
    storage: () => calls++,
    challenge: async () => false,
  });
  for (const request of [
    req({ headers: { origin: "https://evil.example" } }),
    req({ body: [] }),
    req(),
  ]) {
    const response = res();
    await handler(request, response);
    assert.ok([400, 403].includes(response.code));
  }
  assert.equal(calls, 0);
});
test("honeypot returns neutral receipt with zero side effects", async () => {
  const response = res();
  await createSubscribe({
    env,
    storage: () => {
      throw Error("should not run");
    },
  })(req({ body: { ...body, _gotcha: "robot" } }), response);
  assert.deepEqual(response.data, { ok: true });
});
test("durable receipt contains encrypted token and no raw IP; storage failure is never success", async () => {
  let saved;
  const raw = "c".repeat(43);
  let response = res();
  await createSubscribe({
    env,
    challenge: async () => true,
    token: () => raw,
    storage: async (n, a) => {
      saved = a;
      return { ok: true };
    },
  })(req(), response);
  assert.equal(response.code, 200);
  assert.equal(saved.p_token_hash, hash(raw));
  assert.equal(unseal(saved.p_sealed_token, env.TOKEN_ENCRYPTION_KEY), raw);
  assert.ok(!JSON.stringify(saved).includes("192.0.2.10"));
  response = res();
  await createSubscribe({
    env,
    challenge: async () => true,
    storage: async () => {
      throw Error("offline");
    },
  })(req(), response);
  assert.equal(response.code, 503);
});
test("distributed budget response is surfaced as retryable 429", async () => {
  const response = res();
  await createSubscribe({
    env,
    challenge: async () => true,
    storage: async () => ({ limited: true }),
  })(req(), response);
  assert.equal(response.code, 429);
  assert.equal(response.headers["Retry-After"], "600");
});
test("Turnstile checks success, hostname and action", async () => {
  for (const data of [
    { success: false },
    { success: true, hostname: "wrong", action: "early_access" },
    { success: true, hostname: env.TURNSTILE_HOSTNAME, action: "wrong" },
  ])
    assert.equal(
      await verifyChallenge("test", env, async () => ({
        ok: true,
        json: async () => data,
      })),
      false,
    );
  assert.equal(
    await verifyChallenge("test", env, async () => ({
      ok: true,
      json: async () => ({
        success: true,
        hostname: env.TURNSTILE_HOSTNAME,
        action: "early_access",
      }),
    })),
    true,
  );
});
test("verification GET/scanner visit cannot confirm; POST sends hash only", async () => {
  let args;
  const handler = createVerify({
    env,
    storage: async (n, a) => {
      args = a;
      return { ok: true };
    },
  });
  let response = res();
  await handler(req({ method: "GET" }), response);
  assert.equal(response.code, 405);
  assert.equal(args, undefined);
  response = res();
  await handler(req({ body: { token: "d".repeat(43) } }), response);
  assert.equal(response.code, 200);
  assert.deepEqual(args, { p_hash: hash("d".repeat(43)) });
});
test("encryption detects tampering and wrong keys", () => {
  const value = seal("secret", env.TOKEN_ENCRYPTION_KEY);
  assert.equal(unseal(value, env.TOKEN_ENCRYPTION_KEY), "secret");
  assert.throws(() => unseal(value, "f".repeat(64)));
});
test("email provider error payload is not treated as success", async () => {
  await assert.rejects(
    sendMessage({}, "job", env, async () => ({
      ok: false,
      json: async () => ({ message: "invalid" }),
    })),
  );
  await assert.rejects(
    sendMessage({}, "job", env, async () => ({
      ok: true,
      json: async () => ({ error: "bad" }),
    })),
  );
  assert.equal(
    await sendMessage({}, "job", env, async (url, o) => {
      assert.equal(o.headers["Idempotency-Key"], "coachus/job");
      return { ok: true, json: async () => ({ id: "provider-id" }) };
    }),
    "provider-id",
  );
});
test("unauthorized worker never claims jobs; failed mail is durably retryable", async () => {
  let calls = [];
  let handler = createOutbox({
    env,
    storage: async (n, a) => {
      calls.push([n, a]);
      return n === "coachus_claim_job"
        ? {
            job: { id: "job", lease: "lease", kind: "notification" },
            lead: { email: "dealer@example.com" },
          }
        : true;
    },
    send: async () => {
      throw Error("outage");
    },
  });
  let response = res();
  await handler({ method: "GET", headers: {} }, response);
  assert.equal(response.code, 401);
  assert.equal(calls.length, 0);
  response = res();
  await handler(
    { method: "GET", headers: { authorization: "Bearer test-cron" } },
    response,
  );
  assert.equal(response.code, 200);
  assert.equal(response.data.failed, 1);
  assert.equal(calls[1][1].p_provider_id, null);
  assert.equal(calls[1][1].p_error, "email_not_accepted");
});
test("verification link puts token in fragment, notification goes to Matt-configured inbox", () => {
  const msg = messageFor(
    {
      kind: "verification",
      sealed_token: seal("raw-token", env.TOKEN_ENCRYPTION_KEY),
    },
    { email: "dealer@example.com" },
    env,
  );
  assert.ok(msg.text.includes("/verify#token="));
  assert.ok(!msg.text.includes("/verify?token="));
  assert.deepEqual(
    messageFor({ kind: "notification" }, { email: "dealer@example.com" }, env)
      .to,
    ["owner@example.com"],
  );
});

// September 14: the approved public form no longer asks for role.
test("three-field signup accepts omitted role without inventing a prospect role", () => {
  const checked = validateIntake({ name: "Alex", email: "alex@example.com", dealership: "Example Motors" });
  assert.deepEqual(checked.errors, {});
  assert.equal(checked.value.role, "Not provided");
});
