import { useState } from "react";
import { motion } from "framer-motion";
import "./index.css";

export default function App() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); // "ok" | "error" | "loading" | null

  const FORM_ACTION = "#"; // replace with your Mailchimp/HubSpot action later

  async function onSubmit(e) {
    e.preventDefault();
    try {
      setStatus("loading");
      await new Promise((r) => setTimeout(r, 800));
      setStatus("ok");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#F3F3F3] antialiased">
      {/* Subtle background gradient */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(60,130,246,0.25),rgba(11,11,11,0.0))]" />

      {/* HERO SECTION */}
      <section className="relative flex min-h-[80vh] flex-col items-center justify-center px-6 py-16 text-center">
        {/* Animated Top Logo (tighter spacing) */}
        <motion.img
          src="/assets/Color-Invert-cropped.svg"
          alt="CoachUS logo"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.0, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-8 h-20 w-auto md:h-24 transition duration-300 hover:brightness-110 hover:opacity-100"
        />

        <div className="mx-auto w-full max-w-3xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0 }}
            className="mb-6 text-4xl font-bold leading-tight tracking-tight md:text-6xl"
            style={{ fontFamily: "Inter, Poppins, ui-sans-serif, system-ui" }}
          >
            The next era of dealership performance begins here.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mx-auto mb-10 max-w-2xl text-lg md:text-2xl font-light text-zinc-300"
            style={{ fontFamily: "Inter, ui-sans-serif" }}
          >
            You’ve optimized your inventory.
            <br />
            You’ve digitized your showroom.
            <br />
            But your people? Still stuck in the dark.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto w-full max-w-xl"
          >
            {status === "ok" ? (
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4 text-center text-sm text-zinc-100">
                You’re on the list. See you soon.
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                action={FORM_ACTION}
                method="POST"
                className="flex flex-col gap-3 sm:flex-row"
              >
                <input
                  type="email"
                  required
                  aria-label="Email address"
                  name="EMAIL"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="h-12 flex-1 rounded-2xl border border-zinc-800 bg-zinc-900/60 px-4 text-base text-white placeholder:text-zinc-500 outline-none ring-0 transition focus:border-zinc-600 focus:bg-zinc-900 focus:ring-2 focus:ring-[#3C82F6]/40"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="h-12 rounded-2xl bg-[#3C82F6] px-6 text-base font-medium text-white transition disabled:opacity-60 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#3C82F6]/40 shadow-[0_0_18px_rgba(60,130,246,0.35)] hover:shadow-[0_0_24px_rgba(60,130,246,0.5)]"
                >
                  {status === "loading" ? "Sending…" : "Get Early Access"}
                </button>
              </form>
            )}
            <p className="mt-6 text-center text-xs italic text-zinc-500">
              Coming soon in stealth. Designed to replace micromanagement with momentum.
            </p>
          </motion.div>
        </div>
      </section>

      {/* INFO SECTION */}
      <section className="px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p
            className="text-xl text-zinc-200 md:text-2xl"
            style={{ fontFamily: "Inter, ui-sans-serif" }}
          >
            <span className="block font-semibold">CoachUS changes that.</span>
            <span className="block">Daily coaching clarity.</span>
            <span className="block">Powered by data. Delivered by AI.</span>
            <span className="block">Built by dealers who lived the chaos.</span>
          </p>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-900/70 px-6 py-8 text-sm text-zinc-400 flex flex-col items-center sm:flex-row sm:justify-center gap-2 sm:gap-4">
        {/* Footer logo with fade-in animation */}
        <motion.img
          src="/assets/White-cropped.svg"
          alt="CoachUS logo"
          initial={{ opacity: 0, y: 5 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-4 w-auto opacity-80 sm:mr-2 ml-5 transition duration-300 hover:opacity-100 hover:brightness-110"
        />
        <motion.p
          initial={{ opacity: 0, y: 5 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center sm:text-left"
        >
          © 2025 CoachUS •{" "}
          <a
            href="mailto:info@coachus.com"
            className="underline decoration-zinc-600 underline-offset-4 hover:decoration-zinc-300"
          >
            info@coachus.com
          </a>
          <span className="mx-2">•</span> All rights reserved.
        </motion.p>
      </footer>
    </div>
  );
}
