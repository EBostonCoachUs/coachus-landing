// /api/subscribe.js
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const {
      name = "",
      email = "",
      phone = "",
      _gotcha = "",
    } = req.body || {};

    // spam trap
    if (_gotcha) {
      return res.status(200).json({ ok: true });
    }

    // basic email validation
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ ok: false, error: "Invalid email" });
    }

    const from = process.env.FROM_ADDRESS || "CoachUS <noreply@coachus.com>";
    const to = process.env.TEAM_NOTIFY || "eric.boston@coachus.com";

    const safeName = escapeHtml(name || "(not provided)");
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone || "(not provided)");

    const html = `
      <div style="font-family:Inter,Arial,sans-serif;background:#0B0B0B;padding:24px;color:#F3F3F3;">
        <div style="max-width:600px;margin:0 auto;background:#111111;border:1px solid #27272a;border-radius:20px;padding:24px;">
          <h2 style="margin:0 0 16px 0;font-size:22px;line-height:1.2;color:#F3F3F3;">
            New CoachUS waitlist signup
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
            Source: coachus landing page waitlist form
          </p>
        </div>
      </div>
    `;

    await resend.emails.send({
      from,
      to,
      subject: "New CoachUS waitlist signup",
      html,
      reply_to: email,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Subscribe API error:", err);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
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
