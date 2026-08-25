import SiteLink from "../components/SiteLink.jsx";

export default function NotFound({ navigate }) {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#ff7a45]">
          Page not found
        </p>
        <h1 className="mt-5 text-5xl font-semibold text-white">
          This page is not part of CoachUS yet.
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-300">
          Return to the public site and keep exploring the current CoachUS
          marketing experience.
        </p>
        <SiteLink
          href="/"
          navigate={navigate}
          className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0b1020] transition hover:bg-slate-200 focus:outline-none focus:ring-4 focus:ring-white/20"
        >
          Back to CoachUS
        </SiteLink>
      </div>
    </section>
  );
}
