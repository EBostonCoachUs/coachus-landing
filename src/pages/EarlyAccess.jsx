import WaitlistForm from "../components/WaitlistForm.jsx";

export default function EarlyAccess() {
  return (
    <section className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#ff7a45]">
          <span className="h-px w-8 bg-[#ff7a45]" />
          EARLY ACCESS
        </p>
        <h1
          id="access-title"
          className="mt-6 text-balance text-5xl font-semibold leading-tight md:text-7xl"
        >
          See whether CoachUS fits your dealership.
        </h1>
        <p className="mt-7 text-xl leading-9 text-slate-300">
          Share your name, email, and optional phone number. Matt Cady will
          review the request and follow up about fit and next steps.
        </p>
        <WaitlistForm
          variant="stacked"
          headingId="access-title"
          className="mt-9"
        />
      </div>
    </section>
  );
}
