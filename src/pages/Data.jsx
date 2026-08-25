import AnimatedSection from "../components/AnimatedSection.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import SiteLink from "../components/SiteLink.jsx";
import { dataPrinciples, productSignals } from "../data/content.js";

export default function Data({ navigate }) {
  return (
    <>
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#ff7a45]">
            <span className="h-px w-8 bg-[#ff7a45]" />
            Data Philosophy
          </p>
          <h1 className="mt-6 max-w-5xl text-balance text-5xl font-semibold leading-tight md:text-7xl">
            Data should make coaching clearer, not colder.
          </h1>
          <p className="mt-7 max-w-3xl text-xl leading-9 text-slate-300">
            CoachUS uses dealership performance information to help people take
            better action while the day, week, or month can still improve.
          </p>
        </div>
      </section>

      <AnimatedSection className="px-6 pb-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeading
            eyebrow="How It Works"
            title="From fragmented information to coaching signals."
          >
            <p>
              CoachUS is designed to pull from dealership systems overnight and
              break 25+ data points into four practical signals.
            </p>
          </SectionHeading>

          <div className="grid gap-4 sm:grid-cols-2">
            {productSignals.map((signal) => (
              <div
                key={signal.title}
                className="rounded-[28px] border border-white/10 bg-white/[0.045] p-6"
              >
                <p className="text-2xl font-semibold text-white">
                  {signal.title}
                </p>
                <p className="mt-4 leading-7 text-slate-300">{signal.text}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Principles"
            title="Responsible data use starts with a narrower purpose."
          >
            <p>
              CoachUS is a coaching platform. The product should use data only
              when it helps managers coach better or salespeople improve faster.
            </p>
          </SectionHeading>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {dataPrinciples.map((principle) => (
              <div
                key={principle.title}
                className="rounded-[30px] border border-white/10 bg-[#0d111b] p-7"
              >
                <p className="text-xl font-semibold text-white">
                  {principle.title}
                </p>
                <p className="mt-4 leading-8 text-slate-300">
                  {principle.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="px-6 pb-24">
        <div className="mx-auto overflow-hidden rounded-[36px] border border-white/10 bg-[#0d111b]">
          <div className="grid gap-10 p-7 md:p-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#ff7a45]">
                <span className="h-px w-8 bg-[#ff7a45]" />
                AI Approach
              </p>
              <h2 className="mt-6 text-balance text-3xl font-semibold leading-tight md:text-5xl">
                AI assists the coach. It is not the coach.
              </h2>
            </div>
            <div className="space-y-5 text-lg leading-8 text-slate-300">
              <p>
                Artificial intelligence helps CoachUS identify coaching
                opportunities at a scale that would otherwise be hard to manage.
              </p>
              <p>
                The value is not the technology by itself. The value is giving a
                manager a better starting point for the next conversation.
              </p>
              <p>
                CoachUS should never promise behavior change without human
                coaching. The product exists to support better leadership, not
                to replace it.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="px-6 pb-28">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 rounded-[32px] border border-white/10 bg-white/[0.045] p-7 md:flex-row md:items-center md:justify-between md:p-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#ff7a45]">
              Policy
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white">
              Review the privacy policy.
            </h2>
          </div>
          <SiteLink
            href="/privacy"
            navigate={navigate}
            className="rounded-full bg-white px-5 py-3 text-center text-sm font-semibold text-[#0b1020] transition hover:bg-slate-200 focus:outline-none focus:ring-4 focus:ring-white/20"
          >
            Privacy Policy
          </SiteLink>
        </div>
      </AnimatedSection>
    </>
  );
}
