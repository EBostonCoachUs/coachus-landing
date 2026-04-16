import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./index.css";

export default function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState(null); // "ok" | "error" | "loading" | null
  const [showModal, setShowModal] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    try {
      setStatus("loading");

      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone }),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        setStatus("ok");
        setName("");
        setEmail("");
        setPhone("");
        setShowModal(true);
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-[#F3F3F3] antialiased">
      {/* Subtle background gradient */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(60,130,246,0.25),rgba(11,11,11,0.0))]" />

      {/* Success Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
            />
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center px-6"
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.25 }}
            >
              <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#111111]/95 p-8 shadow-[0_0_40px_rgba(0,0,0,0.45)] backdrop-blur-xl">
                <div className="mb-4 flex items-center justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#3C82F6]/15 ring-1 ring-[#3C82F6]/30">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-[#3C82F6]"
                    >
                      <path
                        d="M20 6L9 17L4 12"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                <h3 className="mb-3 text-center text-2xl font-semibold text-white">
                  Thank you
                </h3>

                <p className="mb-6 text-center text-sm leading-6 text-zinc-300">
                  You have been added to the CoachUs waitlist. We will be in
                  contact soon!
                </p>

                <button
                  onClick={() => setShowModal(false)}
                  className="w-full rounded-2xl bg-[#3C82F6] px-5 py-3 text-sm font-medium text-white transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#3C82F6]/40"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section className="relative flex min-h-[80vh] flex-col items-center justify-center px-6 py-16 text-center">
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
            className="mx-auto w-full max-w-4xl"
          >
            <form
              onSubmit={onSubmit}
              className="flex flex-col gap-3 md:flex-row md:items-center"
            >
              <input
                type="text"
                name="name"
                aria-label="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="h-12 flex-1 rounded-2xl border border-zinc-800 bg-zinc-900/60 px-4 text-base text-white placeholder:text-zinc-500 outline-none ring-0 transition focus:border-zinc-600 focus:bg-zinc-900 focus:ring-2 focus:ring-[#3C82F6]/40"
              />

              <input
                type="email"
                required
                name="email"
                aria-label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="h-12 flex-1 rounded-2xl border border-zinc-800 bg-zinc-900/60 px-4 text-base text-white placeholder:text-zinc-500 outline-none ring-0 transition focus:border-zinc-600 focus:bg-zinc-900 focus:ring-2 focus:ring-[#3C82F6]/40"
              />

              <input
                type="tel"
                name="phone"
                aria-label="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone number (optional)"
                className="h-12 flex-1 rounded-2xl border border-zinc-800 bg-zinc-900/60 px-4 text-base text-white placeholder:text-zinc-500 outline-none ring-0 transition focus:border-zinc-600 focus:bg-zinc-900 focus:ring-2 focus:ring-[#3C82F6]/40"
              />

              <button
                type="submit"
                disabled={status === "loading"}
                className="h-12 whitespace-nowrap rounded-2xl bg-[#3C82F6] px-8 text-base font-medium text-white transition disabled:opacity-60 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#3C82F6]/40 shadow-[0_0_18px_rgba(60,130,246,0.35)] hover:shadow-[0_0_24px_rgba(60,130,246,0.5)]"
              >
                {status === "loading" ? "Sending…" : "Join our waitlist"}
              </button>
            </form>

            {status === "error" && (
              <p className="mt-4 text-center text-sm text-red-400">
                Something went wrong. Please try again.
              </p>
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
