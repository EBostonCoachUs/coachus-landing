import AnimatedSection from "../components/AnimatedSection.jsx";
import SiteLink from "../components/SiteLink.jsx";
import { assets } from "../config/site.js";

export default function Leadership({ navigate }) {
  return (
    <>
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#ff7a45]">
              <span className="h-px w-8 bg-[#ff7a45]" />
              FOUNDER
            </p>
            <h1 className="mt-6 max-w-4xl text-balance text-5xl font-semibold leading-tight md:text-7xl">
              Matt Cady built CoachUS from the dealership floor.
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-9 text-slate-300">
              CoachUS is founder-led and operator-built by someone who spent his
              career inside dealerships before building software for them.
            </p>
          </div>

          <figure className="m-0 max-w-md justify-self-start lg:justify-self-end">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[34px] border border-white/10 bg-[#070b13] shadow-[0_30px_120px_rgba(0,0,0,0.34)]">
              <img
                src={assets.founderHeadshot}
                alt="Matt Cady, founder of CoachUS"
                className="absolute left-1/2 top-[44%] h-auto w-[156%] max-w-none -translate-x-1/2 -translate-y-1/2"
                width="3375"
                height="4219"
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption className="mt-4 text-sm font-semibold text-slate-100">
              Matt Cady <span className="font-normal text-slate-400">· Founder</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <AnimatedSection className="px-6 pb-24">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[32px] border border-white/10 bg-[#0d111b] p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              BACKGROUND
            </p>
            <dl className="mt-7 grid gap-6">
              <div>
                <dt className="text-sm text-slate-500">Role</dt>
                <dd className="mt-1 text-lg font-semibold text-white">
                  Founder, CoachUS
                </dd>
              </div>
              <div>
                <dt className="text-sm text-slate-500">Experience</dt>
                <dd className="mt-1 text-lg font-semibold text-white">
                  25+ years on dealership floors
                </dd>
              </div>
              <div>
                <dt className="text-sm text-slate-500">Focus</dt>
                <dd className="mt-1 text-lg font-semibold text-white">
                  Manager-led coaching for sales teams
                </dd>
              </div>
            </dl>
          </div>

          <div className="space-y-6 text-lg leading-9 text-slate-300">
            <p>
              After decades leading dealership sales teams, Matt Cady built
              CoachUS around a simple belief: developing your people deserves
              the same attention as measuring their performance.
            </p>
            <p>
              CoachUS brings that coaching focus into software a manager can use
              every day, without replacing the judgment, relationships, and
              context that make coaching work.
            </p>
            <p>
              The product should feel like it was built by someone who
              understands dealership pace, pressure, and accountability because
              it was.
            </p>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="px-6 pb-28">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 rounded-[32px] border border-white/10 bg-white/[0.045] p-7 md:flex-row md:items-center md:justify-between md:p-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#ff7a45]">
              COMPANY STORY
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white">
              Learn why CoachUS exists.
            </h2>
          </div>
          <SiteLink
            href="/about"
            navigate={navigate}
            className="rounded-full bg-white px-5 py-3 text-center text-sm font-semibold text-[#0b1020] transition hover:bg-slate-200 focus:outline-none focus:ring-4 focus:ring-white/20"
          >
            About CoachUS
          </SiteLink>
        </div>
      </AnimatedSection>
    </>
  );
}
