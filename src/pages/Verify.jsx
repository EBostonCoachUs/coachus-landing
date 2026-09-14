import { useEffect, useRef, useState } from "react";
import SiteLink from "../components/SiteLink.jsx";
import { reviewMode } from "../config/site.js";

export default function Verify({ navigate }) {
  const [status, setStatus] = useState("ready");
  const [token, setToken] = useState("");
  const busy = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.slice(1));
    setToken(params.get("token") || "");
    window.history.replaceState({}, "", window.location.pathname);
  }, []);

  async function confirm() {
    if (busy.current) return;

    busy.current = true;
    setStatus("sending");

    try {
      const response = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await response.json();
      setStatus(response.ok && data.ok ? "confirmed" : "error");
    } catch {
      setStatus("error");
    } finally {
      busy.current = false;
    }
  }

  return (
    <section className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#ff7a45]">
          <span className="h-px w-8 bg-[#ff7a45]" />
          EARLY ACCESS
        </p>
        <h1 className="mt-6 text-balance text-5xl font-semibold leading-tight md:text-7xl">
          {status === "confirmed"
            ? "Your email is confirmed."
            : "Confirm your CoachUS request."}
        </h1>
        <div aria-live="polite">
          <p className="mt-7 text-xl leading-9 text-slate-300">
            {status === "confirmed"
              ? "Matt Cady will review your request and follow up about fit and next steps. Access and timing are confirmed individually."
              : reviewMode
                ? "This is the confirmation-page preview. No verification or email sending is active here."
                : "Select the button below to confirm your email address. Opening this page alone does not confirm your request."}
          </p>
          {status === "error" && (
            <p role="alert" className="mt-5 text-[#ffad91]">
              We couldn’t confirm this link. It may have expired or already been
              used. You can request a new one.
            </p>
          )}
        </div>
        {!reviewMode && token && status !== "confirmed" && (
          <button
            className="mt-8 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#0b1020] transition hover:bg-slate-200 focus:outline-none focus:ring-4 focus:ring-white/20"
            disabled={status === "sending"}
            onClick={confirm}
          >
            {status === "sending" ? "Confirming..." : "Confirm my email"}
          </button>
        )}
        <SiteLink
          href="/#waitlist"
          navigate={navigate}
          className="mt-8 inline-flex rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.06] focus:outline-none focus:ring-4 focus:ring-[#2d76ff]/20"
        >
          {status === "confirmed" ? "Back to CoachUS" : "Request a new link"}
        </SiteLink>
      </div>
    </section>
  );
}
