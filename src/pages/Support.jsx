import { site } from "../config/site.js";
export default function Support() {
  return (
    <section className="section">
      <div className="container max-w-3xl">
        <p className="eyebrow">Contact & support</p>
        <h1 className="page-title">Talk to CoachUS.</h1>
        <p className="intro">
          For website questions, early access, or privacy inquiries, contact{" "}
          <a
            className="underline underline-offset-4"
            href={`mailto:${site.contactEmail}`}
          >
            {site.contactEmail}
          </a>
          .
        </p>
        <div className="panel mt-9">
          <h2 className="text-2xl font-semibold">
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
