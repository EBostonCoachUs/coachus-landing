import AnimatedSection from "../components/AnimatedSection.jsx";
import SiteLink from "../components/SiteLink.jsx";
import { assets } from "../config/site.js";

export default function About({ navigate }) {
  return (
    <>
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#ff7a45]">
            <span className="h-px w-8 bg-[#ff7a45]" />
            ABOUT COACHUS
          </p>
          <h1 className="mt-6 max-w-5xl text-balance text-5xl font-semibold leading-tight md:text-7xl">
            Built from life on the dealership floor.
          </h1>
          <p className="mt-7 max-w-3xl text-xl leading-9 text-slate-300">
            CoachUS exists because knowing the numbers is often easier than
            knowing where coaching could help.
          </p>
        </div>
      </section>

      <AnimatedSection className="px-6 pb-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
          <figure className="m-0 max-w-md">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] border border-white/10 bg-[#070b13] shadow-[0_30px_120px_rgba(0,0,0,0.34)]">
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

          <div className="rounded-[36px] border border-white/10 bg-[#0d111b] p-7 md:p-12">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#ff7a45]">
              <span className="h-px w-8 bg-[#ff7a45]" />
              MATT CADY · FOUNDER
            </p>
            <h2 className="mt-6 text-balance text-3xl font-semibold leading-tight md:text-5xl">
              The problem was familiar long before the software.
            </h2>
            <div className="mt-8 space-y-6 text-lg leading-8 text-slate-300">
              <p>
                Before founding CoachUS, Matt Cady led dealership sales teams.
                He saw the daily gap between reviewing performance and helping
                a salesperson improve.
              </p>
              <p>
                CoachUS is being built around that moment: who needs attention,
                what to ask, and what to work on next.
              </p>
              <p>
                The goal is consistent, useful coaching that fits the pace of a
                real dealership.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="px-6 pb-24">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {[
            [
              "Operator reality first",
              "The experience should make sense to the people running the sales floor.",
            ],
            [
              "Human coaching stays central",
              "Managers bring judgment, relationships, and context to each conversation.",
            ],
            [
              "Improvement over labels",
              "Salespeople should have a clear focus, see progress, and receive recognition.",
            ],
          ].map(([title, text]) => (
            <div
              key={title}
              className="rounded-[28px] border border-white/10 bg-white/[0.045] p-6"
            >
              <h2 className="text-xl font-semibold text-white">{title}</h2>
              <p className="mt-5 leading-8 text-slate-300">{text}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="px-6 pb-28">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 rounded-[32px] border border-white/10 bg-white/[0.045] p-7 md:flex-row md:items-center md:justify-between md:p-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#ff7a45]">
              EARLY ACCESS
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white">
              Preparing for early dealer access.
            </h2>
          </div>
          <SiteLink
            href="/#waitlist"
            navigate={navigate}
            className="rounded-full bg-white px-5 py-3 text-center text-sm font-semibold text-[#0b1020] transition hover:bg-slate-200 focus:outline-none focus:ring-4 focus:ring-white/20"
          >
            Join our waitlist
          </SiteLink>
        </div>
      </AnimatedSection>
    </>
  );
}
