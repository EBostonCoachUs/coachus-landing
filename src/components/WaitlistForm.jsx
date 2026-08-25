import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function WaitlistForm({
  variant = "inline",
  headingId,
  className = "",
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    _gotcha: "",
  });
  const [status, setStatus] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const closeRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!showModal) return undefined;

    closeRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === "Escape") setShowModal(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showModal]);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function onSubmit(event) {
    event.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok && data.ok) {
        setStatus("ok");
        setForm({ name: "", email: "", phone: "", _gotcha: "" });
        setShowModal(true);
        return;
      }

      setStatus("error");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  const fieldClass =
    "h-[3.25rem] min-h-[3.25rem] w-full rounded-[18px] border border-white/10 bg-white/[0.055] px-4 text-base text-white outline-none transition placeholder:text-slate-500 focus:border-[#2d76ff]/70 focus:bg-white/[0.08] focus:ring-4 focus:ring-[#2d76ff]/15";
  const layout =
    variant === "stacked"
      ? "grid gap-3"
      : "grid gap-3 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end";

  return (
    <>
      <form
        aria-labelledby={headingId}
        className={`${layout} ${className}`}
        onSubmit={onSubmit}
      >
        <div>
          <label className="sr-only" htmlFor={`${variant}-waitlist-name`}>
            Name
          </label>
          <input
            id={`${variant}-waitlist-name`}
            className={fieldClass}
            name="name"
            value={form.name}
            onChange={updateField}
            placeholder="Name"
            autoComplete="name"
            required
          />
        </div>
        <div>
          <label className="sr-only" htmlFor={`${variant}-waitlist-email`}>
            Email
          </label>
          <input
            id={`${variant}-waitlist-email`}
            className={fieldClass}
            name="email"
            type="email"
            value={form.email}
            onChange={updateField}
            placeholder="Email"
            autoComplete="email"
            required
          />
        </div>
        <div>
          <label className="sr-only" htmlFor={`${variant}-waitlist-phone`}>
            Phone number
          </label>
          <input
            id={`${variant}-waitlist-phone`}
            className={fieldClass}
            name="phone"
            type="tel"
            value={form.phone}
            onChange={updateField}
            placeholder="Phone (optional)"
            autoComplete="tel"
          />
        </div>
        <div aria-hidden="true" className="hidden">
          <label htmlFor={`${variant}-company`}>Company</label>
          <input
            id={`${variant}-company`}
            name="_gotcha"
            tabIndex="-1"
            autoComplete="off"
            value={form._gotcha}
            onChange={updateField}
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="h-[3.25rem] min-h-[3.25rem] rounded-[18px] bg-[#2d76ff] px-6 text-sm font-semibold text-white shadow-[0_18px_48px_rgba(45,118,255,0.28)] transition hover:-translate-y-0.5 hover:bg-[#3b82ff] focus:outline-none focus:ring-4 focus:ring-[#2d76ff]/25 disabled:translate-y-0 disabled:cursor-wait disabled:opacity-70"
        >
          {status === "loading" ? "Sending..." : "Join our waitlist"}
        </button>
        {status === "error" && (
          <p className="text-sm text-[#ff8b68] lg:col-span-4" role="alert">
            Something went wrong. Please try again.
          </p>
        )}
      </form>

      <AnimatePresence>
        {showModal && (
          <>
            <motion.button
              aria-label="Close waitlist confirmation"
              className="fixed inset-0 z-50 cursor-default bg-black/65 backdrop-blur-md"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
            />
            <motion.div
              aria-labelledby="waitlist-success-title"
              aria-modal="true"
              className="fixed inset-0 z-50 flex items-center justify-center px-5"
              role="dialog"
              initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.97 }}
              transition={{ duration: 0.24 }}
            >
              <div className="w-full max-w-md rounded-[28px] border border-white/[0.12] bg-[#0d111b]/95 p-8 shadow-[0_30px_100px_rgba(0,0,0,0.45)]">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#2d76ff]/15 text-2xl font-semibold text-[#78a9ff] ring-1 ring-[#2d76ff]/25">
                  OK
                </div>
                <h2
                  id="waitlist-success-title"
                  className="text-2xl font-semibold text-white"
                >
                  Thank you.
                </h2>
                <p className="mt-3 leading-7 text-slate-300">
                  You have been added to the CoachUS waitlist. We will be in
                  contact soon!
                </p>
                <button
                  ref={closeRef}
                  type="button"
                  className="mt-7 w-full rounded-[18px] border border-white/10 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15 focus:outline-none focus:ring-4 focus:ring-[#2d76ff]/20"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
