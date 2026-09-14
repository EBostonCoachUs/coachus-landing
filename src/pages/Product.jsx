import AnimatedSection from "../components/AnimatedSection.jsx";
import SiteLink from "../components/SiteLink.jsx";
import { audiences } from "../data/content.js";

export default function Product({ navigate }) {
  return (
    <>
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#ff7a45]">
            <span className="h-px w-8 bg-[#ff7a45]" />
            PRODUCT
          </p>
          <h1 className="mt-6 max-w-5xl text-balance text-5xl font-semibold leading-tight md:text-7xl">
            A clearer starting point for daily coaching.
          </h1>
          <p className="mt-7 max-w-3xl text-xl leading-9 text-slate-300">
            CoachUS is being built to help dealership sales managers turn
            performance patterns into a useful conversation and an agreed next
            step.
          </p>
        </div>
      </section>

      <AnimatedSection className="px-6 pb-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#ff7a45]">
              <span className="h-px w-8 bg-[#ff7a45]" />
              COACHING FLOW
            </p>
            <h2 className="mt-6 text-balance text-3xl font-semibold leading-tight md:text-5xl">
              From a pattern to a conversation.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              A manager starts with who may need attention, adds context, and
              works with the salesperson on a practical next step.
            </p>
          </div>
          <div className="rounded-[34px] border border-white/10 bg-[#0d111b] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.34)]">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Example prompt
            </p>
            <h3 className="mt-6 text-3xl font-semibold leading-tight text-white">
              Where is the follow-up rhythm getting stuck?
            </h3>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              CoachUS should give the manager a sharper starting point, not a
              script that replaces their judgment.
            </p>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-balance text-3xl font-semibold leading-tight md:text-5xl">
            One purpose. A role for everyone.
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {audiences.map((audience) => (
              <div
                key={audience.role}
                className="rounded-[28px] border border-white/10 bg-white/[0.045] p-6"
              >
                <h3 className="text-xl font-semibold text-white">
                  {audience.role}
                </h3>
                <p className="mt-4 leading-8 text-slate-300">
                  {audience.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="px-6 pb-28">
        <div className="mx-auto max-w-7xl rounded-[32px] border border-white/10 bg-white/[0.045] p-7 md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#ff7a45]">
            FIT COMES FIRST
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-white">
            Let’s start with your dealership.
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            Early-access scope, system connections, and timing are confirmed
            individually. A request starts a conversation; it does not guarantee
            a pilot place.
          </p>
          <SiteLink
            href="/#waitlist"
            navigate={navigate}
            className="mt-8 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#0b1020] transition hover:bg-slate-200 focus:outline-none focus:ring-4 focus:ring-white/20"
          >
            Join our waitlist
          </SiteLink>
        </div>
      </AnimatedSection>
    </>
  );
}
