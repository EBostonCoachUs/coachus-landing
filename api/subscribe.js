// /api/subscribe.js
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FIELD_LIMITS = {
  name: 120,
  email: 254,
  phone: 32,
  gotcha: 200,
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "8kb",
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
      return res.status(400).json({ ok: false, error: "Invalid request" });
    }

    const { name = "", email = "", phone = "", _gotcha = "" } = req.body;

    // spam trap
    if (normalizeField(_gotcha, FIELD_LIMITS.gotcha)) {
      return res.status(200).json({ ok: true });
    }

    if (
      isTooLong(name, FIELD_LIMITS.name) ||
      isTooLong(email, FIELD_LIMITS.email) ||
      isTooLong(phone, FIELD_LIMITS.phone)
    ) {
      return res.status(400).json({ ok: false, error: "Invalid submission" });
    }

    const cleanName = normalizeField(name, FIELD_LIMITS.name);
    const cleanEmail = normalizeEmail(email);
    const cleanPhone = normalizeField(phone, FIELD_LIMITS.phone);

    // Basic email validation without accepting whitespace or control chars.
    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(cleanEmail)) {
      return res.status(400).json({ ok: false, error: "Invalid email" });
    }

    if (cleanPhone && !isValidPhone(cleanPhone)) {
      return res.status(400).json({ ok: false, error: "Invalid phone" });
    }

    const from = process.env.FROM_ADDRESS || "CoachUS <noreply@coachus.com>";

    const to = [
      "eric.boston@coachus.com",
      "matt.cady@coachus.com",
    ];

    const safeName = escapeHtml(cleanName || "(not provided)");
    const safeEmail = escapeHtml(cleanEmail);
    const safePhone = escapeHtml(cleanPhone || "(not provided)");

    const subject = `New Waitlist Signup - ${cleanName || cleanEmail}`;

    const html = `
      <div style="font-family:Inter,Arial,sans-serif;background:#0B0B0B;padding:24px;color:#F3F3F3;">
        <div style="max-width:600px;margin:0 auto;background:#111111;border:1px solid #27272a;border-radius:20px;padding:24px;">
          
          <h2 style="margin:0 0 16px 0;font-size:22px;line-height:1.2;color:#F3F3F3;">
            New CoachUS Waitlist Signup
          </h2>

          <div style="margin-bottom:12px;padding:14px 16px;background:#18181b;border:1px solid #27272a;border-radius:14px;">
            <p style="margin:0 0 8px 0;color:#a1a1aa;font-size:12px;text-transform:uppercase;letter-spacing:.08em;">Name</p>
            <p style="margin:0;color:#F3F3F3;font-size:16px;">${safeName}</p>
          </div>

          <div style="margin-bottom:12px;padding:14px 16px;background:#18181b;border:1px solid #27272a;border-radius:14px;">
            <p style="margin:0 0 8px 0;color:#a1a1aa;font-size:12px;text-transform:uppercase;letter-spacing:.08em;">Email</p>
            <p style="margin:0;color:#F3F3F3;font-size:16px;">${safeEmail}</p>
          </div>

          <div style="margin-bottom:12px;padding:14px 16px;background:#18181b;border:1px solid #27272a;border-radius:14px;">
            <p style="margin:0 0 8px 0;color:#a1a1aa;font-size:12px;text-transform:uppercase;letter-spacing:.08em;">Phone</p>
            <p style="margin:0;color:#F3F3F3;font-size:16px;">${safePhone}</p>
          </div>

          <p style="margin:20px 0 0 0;color:#71717a;font-size:12px;">
            Source: coachus.com waitlist form
          </p>

        </div>
      </div>
    `;

    await resend.emails.send({
      from,
      to,
      subject,
      html,
      reply_to: cleanEmail,
    });

    return res.status(200).json({ ok: true });

  } catch (err) {
    console.error("Subscribe API error:", err);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
}

function normalizeField(value, maxLength) {
  if (value === null || value === undefined) return "";
  if (typeof value !== "string") return "";

  return value
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function normalizeEmail(value) {
  return normalizeField(value, FIELD_LIMITS.email).toLowerCase();
}

function isTooLong(value, maxLength) {
  return typeof value === "string" && value.length > maxLength;
}

function isValidPhone(value) {
  const digits = value.replace(/\D/g, "");
  return (
    /^[+().\-\sxX\d]+$/.test(value) &&
    digits.length >= 7 &&
    digits.length <= 15
  );
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (m) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[m]));
}
