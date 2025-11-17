// /api/subscribe.js
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const { name = "", email = "" } = req.body || {};

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ ok: false, error: "Invalid email" });
    }

    const from = process.env.FROM_ADDRESS || "CoachUS <noreply@coachus.com>";
    const to = process.env.TEAM_NOTIFY || "eric.boston@coachus.com";

    const html = `
      <div style="font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;padding:16px;">
        <h2 style="margin:0 0 12px 0;">New CoachUS early access signup</h2>
        <p style="margin:0 0 8px 0;"><strong>Name:</strong> ${escapeHtml(
          name || "(not provided)"
        )}</p>
        <p style="margin:0 0 8px 0;"><strong>Email:</strong> ${escapeHtml(
          email
        )}</p>
        <p style="margin:16px 0 0 0;font-size:12px;opacity:.7;">Source: coachus-landing form</p>
      </div>
    `;

    await resend.emails.send({
      from,
      to,
      subject: "New CoachUS early access signup",
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
