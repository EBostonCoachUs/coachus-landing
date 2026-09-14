import { site } from "../config/site.js";

export default function Support() {
  return (
    <section className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#ff7a45]">
          <span className="h-px w-8 bg-[#ff7a45]" />
          CONTACT & SUPPORT
        </p>
        <h1 className="mt-6 text-balance text-5xl font-semibold leading-tight md:text-7xl">
          Talk to CoachUS.
        </h1>
        <p className="mt-7 text-xl leading-9 text-slate-300">
          For website questions, early access, or privacy inquiries, contact{" "}
          <a
            className="underline decoration-white/20 underline-offset-4 transition hover:text-white hover:decoration-white focus:outline-none focus:ring-4 focus:ring-[#2d76ff]/20"
            href={`mailto:${site.contactEmail}`}
          >
            {site.contactEmail}
          </a>
          .
        </p>
        <div className="mt-10 rounded-[30px] border border-white/10 bg-[#0d111b] p-7">
          <h2 className="text-2xl font-semibold text-white">
            Already participating in a pilot?
          </h2>
          <p className="mt-5 leading-8 text-slate-300">
            Use the support contact provided during onboarding. Include your
            dealership name and a brief description of the issue. Please leave
            customer records, passwords, and sensitive dealership data out of
            your first email.
          </p>
        </div>
      </div>
    </section>
  );
}
