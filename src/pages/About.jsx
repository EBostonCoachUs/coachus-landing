import AnimatedSection from "../components/AnimatedSection.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import SiteLink from "../components/SiteLink.jsx";
import { proofPoints } from "../data/content.js";

export default function About({ navigate }) {
  return (
    <>
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#ff7a45]">
            <span className="h-px w-8 bg-[#ff7a45]" />
            About CoachUS
          </p>
          <h1 className="mt-6 max-w-5xl text-balance text-5xl font-semibold leading-tight md:text-7xl">
            Dealerships measure outcomes. CoachUS helps influence the behaviors
            that create them.
          </h1>
          <p className="mt-7 max-w-3xl text-xl leading-9 text-slate-300">
            CoachUS exists because dealership teams deserve a better way to make
            coaching consistent, timely, and useful inside the real pace of the
            store.
          </p>
        </div>
      </section>

      <AnimatedSection className="px-6 pb-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeading
            eyebrow="Why It Exists"
            title="Managers cannot coach what they cannot see in time."
          >
            <p>
              Most systems tell leadership what already happened. CoachUS is
              built for the daily moment before the result is lost: who needs
              help, why they may need help, and what should happen next.
            </p>
          </SectionHeading>

          <div className="grid gap-5">
            {[
              "The goal is not to create another reporting tool. The goal is to make improvement obvious.",
              "CoachUS is designed to help every manager coach more consistently without replacing the judgment that great managers already bring.",
              "Salespeople are active users. They should see progress, daily focus, recognition, and a clearer path to improve.",
            ].map((text) => (
              <div
                key={text}
                className="rounded-[28px] border border-white/10 bg-white/[0.045] p-6 text-lg leading-8 text-slate-200"
              >
                {text}
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="px-6 pb-24 md:pb-32">
        <div className="mx-auto overflow-hidden rounded-[36px] border border-white/10 bg-[#0d111b] p-7 md:p-12">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#ff7a45]">
                <span className="h-px w-8 bg-[#ff7a45]" />
                Operator Built
              </p>
              <h2 className="mt-6 text-balance text-3xl font-semibold leading-tight md:text-5xl">
                Real dealership experience, built into a daily operating rhythm.
              </h2>
            </div>
            <div className="space-y-6 text-lg leading-8 text-slate-300">
              <p>
                Before founding CoachUS, Matt Cady spent 25 years on dealership
                floors and built a Toyota sales team ranked in the top 25
                nationally.
              </p>
              <p>
                CoachUS is not dealership management imagined from the outside.
                It is a practical coaching framework shaped by real stores,
                real managers, and the pressure of daily performance.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Where It Stands"
            title="Built software. Tested demand. Focused on the pilot path."
          >
            <p>CoachUS is moving with a narrow product focus and a clear path.</p>
          </SectionHeading>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {proofPoints.map((point) => (
              <div
                key={point.eyebrow}
                className="rounded-[28px] border border-white/10 bg-white/[0.045] p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                  {point.eyebrow}
                </p>
                <p className="mt-5 text-5xl font-semibold text-white">
                  {point.stat}
                </p>
                <p className="mt-3 font-semibold text-slate-200">
                  {point.label}
                </p>
                <p className="mt-4 leading-7 text-slate-400">{point.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="px-6 pb-28">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 rounded-[32px] border border-white/10 bg-white/[0.045] p-7 md:flex-row md:items-center md:justify-between md:p-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#ff7a45]">
              Next
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white">
              See the founder story.
            </h2>
          </div>
          <SiteLink
            href="/leadership"
            navigate={navigate}
            className="rounded-full bg-white px-5 py-3 text-center text-sm font-semibold text-[#0b1020] transition hover:bg-slate-200 focus:outline-none focus:ring-4 focus:ring-white/20"
          >
            Meet Matt Cady
          </SiteLink>
        </div>
      </AnimatedSection>
    </>
  );
}
