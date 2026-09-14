import {
  createHash,
  createHmac,
  randomBytes,
  createCipheriv,
  createDecipheriv,
  timingSafeEqual,
} from "node:crypto";
export function hash(value) {
  return createHash("sha256").update(value).digest("hex");
}
export function fingerprint(value, key) {
  return createHmac("sha256", key).update(value).digest("hex");
}
export function seal(value, key) {
  const iv = randomBytes(12),
    cipher = createCipheriv("aes-256-gcm", Buffer.from(key, "hex"), iv);
  return Buffer.concat([
    iv,
    cipher.update(value, "utf8"),
    cipher.final(),
    cipher.getAuthTag(),
  ]).toString("base64url");
}
export function unseal(value, key) {
  const data = Buffer.from(value, "base64url"),
    cipher = createDecipheriv(
      "aes-256-gcm",
      Buffer.from(key, "hex"),
      data.subarray(0, 12),
    );
  cipher.setAuthTag(data.subarray(-16));
  return Buffer.concat([
    cipher.update(data.subarray(12, -16)),
    cipher.final(),
  ]).toString("utf8");
}
export function equalSecret(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || !a || !b) return false;
  const x = Buffer.from(a),
    y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}
export function configured(env) {
  return (
    env.EARLY_ACCESS_ENABLED === "true" &&
    env.RELEASE_APPROVED === "true" &&
    [
      "RESEND_API_KEY",
      "FROM_ADDRESS",
      "LEAD_NOTIFY_TO",
      "PUBLIC_ORIGIN",
      "SUPABASE_URL",
      "SUPABASE_SERVICE_ROLE_KEY",
      "TURNSTILE_SECRET_KEY",
      "TURNSTILE_HOSTNAME",
      "CRON_SECRET",
      "TOKEN_ENCRYPTION_KEY",
      "ABUSE_HASH_KEY",
    ].every((k) => !!env[k]) &&
    /^[a-fA-F0-9]{64}$/.test(env.TOKEN_ENCRYPTION_KEY) &&
    env.ABUSE_HASH_KEY.length >= 32 &&
    env.PUBLIC_ORIGIN.startsWith("https://") &&
    env.SUPABASE_URL.startsWith("https://")
  );
}
export function requestAllowed(req, env) {
  return (
    req.headers?.origin === env.PUBLIC_ORIGIN &&
    /^application\/json\b/i.test(req.headers?.["content-type"] || "")
  );
}
export async function rpc(name, args, env, fetcher = fetch) {
  const res = await fetcher(
    `${env.SUPABASE_URL.replace(/\/$/, "")}/rest/v1/rpc/${name}`,
    {
      method: "POST",
      headers: {
        apikey: env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(args),
      signal: AbortSignal.timeout(10000),
    },
  );
  if (!res.ok) throw new Error("storage_unavailable");
  return res.json();
}
export async function verifyChallenge(token, env, fetcher = fetch) {
  if (typeof token !== "string" || !token || token.length > 2048) return false;
  const res = await fetcher(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: env.TURNSTILE_SECRET_KEY,
        response: token,
      }),
      signal: AbortSignal.timeout(10000),
    },
  );
  if (!res.ok) return false;
  const data = await res.json();
  return (
    data.success === true &&
    data.hostname === env.TURNSTILE_HOSTNAME &&
    data.action === "early_access"
  );
}
export function response(res, status, body) {
  res.setHeader("Cache-Control", "no-store");
  return res.status(status).json(body);
}
export function newToken() {
  return randomBytes(32).toString("base64url");
}
