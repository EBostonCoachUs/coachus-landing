import { validateIntake, campaignFromSearch } from "../shared/intake.mjs";
import {
  configured,
  requestAllowed,
  response,
  hash,
  fingerprint,
  seal,
  newToken,
  verifyChallenge,
  rpc,
} from "./runtime.mjs";
export function createSubscribe({
  env = process.env,
  storage = (n, a) => rpc(n, a, env),
  challenge = (t) => verifyChallenge(t, env),
  token = newToken,
} = {}) {
  return async function (req, res) {
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return response(res, 405, { ok: false });
    }
    if (!configured(env))
      return response(res, 503, {
        ok: false,
        error: "Intake is not available yet.",
      });
    if (!requestAllowed(req, env)) return response(res, 403, { ok: false });
    if (!req.body || typeof req.body !== "object" || Array.isArray(req.body))
      return response(res, 400, { ok: false });
    if (JSON.stringify(req.body).length > 8192)
      return response(res, 413, { ok: false });
    if (typeof req.body._gotcha === "string" && req.body._gotcha.trim())
      return response(res, 200, { ok: true });
    const { value, errors } = validateIntake(req.body);
    if (Object.keys(errors).length)
      return response(res, 400, { ok: false, fields: errors });
    try {
      if (!(await challenge(req.body.turnstileToken)))
        return response(res, 400, {
          ok: false,
          fields: { form: "Please complete the security check again." },
        });
      // Trust only Vercel's platform-managed header on the intended Vercel runtime.
      const ip =
        env.VERCEL === "1" &&
        typeof req.headers["x-vercel-forwarded-for"] === "string"
          ? req.headers["x-vercel-forwarded-for"].split(",")[0].trim()
          : "unknown";
      const raw = token();
      const campaign = campaignFromSearch(
        new URLSearchParams(
          req.body.campaign && typeof req.body.campaign === "object"
            ? req.body.campaign
            : {},
        ),
      );
      const result = await storage("coachus_intake", {
        p_email_key: fingerprint(value.email, env.ABUSE_HASH_KEY),
        p_ip_key: fingerprint(ip, env.ABUSE_HASH_KEY),
        p_name: value.name,
        p_email: value.email,
        p_dealership: value.dealership,
        p_role: value.role,
        p_campaign: campaign,
        p_token_hash: hash(raw),
        p_sealed_token: seal(raw, env.TOKEN_ENCRYPTION_KEY),
      });
      if (result?.limited) {
        res.setHeader("Retry-After", "600");
        return response(res, 429, { ok: false });
      }
      if (!result?.ok) throw new Error("storage_unavailable");
      return response(res, 200, { ok: true });
    } catch {
      return response(res, 503, { ok: false, error: "Please try again." });
    }
  };
}
export function createVerify({
  env = process.env,
  storage = (n, a) => rpc(n, a, env),
} = {}) {
  return async function (req, res) {
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return response(res, 405, { ok: false });
    }
    if (!configured(env)) return response(res, 503, { ok: false });
    if (!requestAllowed(req, env)) return response(res, 403, { ok: false });
    const token = req.body?.token;
    if (typeof token !== "string" || !/^[A-Za-z0-9_-]{43}$/.test(token))
      return response(res, 400, { ok: false });
    try {
      const result = await storage("coachus_verify", { p_hash: hash(token) });
      return response(res, result?.ok ? 200 : 400, { ok: result?.ok === true });
    } catch {
      return response(res, 503, { ok: false });
    }
  };
}
