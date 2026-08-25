import AnimatedSection from "../components/AnimatedSection.jsx";
import SiteLink from "../components/SiteLink.jsx";

export default function Leadership({ navigate }) {
  return (
    <>
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#ff7a45]">
              <span className="h-px w-8 bg-[#ff7a45]" />
              Leadership
            </p>
            <h1 className="mt-6 max-w-4xl text-balance text-5xl font-semibold leading-tight md:text-7xl">
              Matt Cady, Founder and CEO.
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-9 text-slate-300">
              CoachUS is founder-led and operator-built by someone who spent his
              career inside dealerships before building software for them.
            </p>
          </div>

          <div className="rounded-[34px] border border-dashed border-white/[0.18] bg-white/[0.04] p-7">
            <div className="flex aspect-[4/5] items-center justify-center rounded-[26px] border border-white/10 bg-[#0d111b] p-6 text-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#ff7a45]">
                  TODO
                </p>
                <p className="mt-4 text-2xl font-semibold text-white">
                  Approved founder headshot
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  No approved photo was included in the supplied materials.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AnimatedSection className="px-6 pb-24">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[32px] border border-white/10 bg-[#0d111b] p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Background
            </p>
            <dl className="mt-7 grid gap-6">
              <div>
                <dt className="text-sm text-slate-500">Role</dt>
                <dd className="mt-1 text-lg font-semibold text-white">
                  Founder and CEO, CoachUS
                </dd>
              </div>
              <div>
                <dt className="text-sm text-slate-500">Experience</dt>
                <dd className="mt-1 text-lg font-semibold text-white">
                  25 years on dealership floors
                </dd>
              </div>
              <div>
                <dt className="text-sm text-slate-500">Operating proof</dt>
                <dd className="mt-1 text-lg font-semibold text-white">
                  Led a Toyota sales team ranked in the national top 25
                </dd>
              </div>
            </dl>
          </div>

          <div className="space-y-6 text-lg leading-9 text-slate-300">
            <p>
              Matt Cady built CoachUS from the management systems and coaching
              standards he used on dealership floors. The product is shaped by a
              direct belief: managers need practical help before poor habits
              become poor results.
            </p>
            <p>
              The supplied read-ahead describes CoachUS as the framework Matt
              ran on the floor, built into a tool a manager can use every day.
              That is the center of the leadership story.
            </p>
            <p>
              CoachUS should feel like it was built by someone who understands
              dealership pace, pressure, and accountability because it was.
            </p>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="px-6 pb-24">
        <div className="mx-auto overflow-hidden rounded-[36px] border border-white/10 bg-[#0d111b]">
          <div className="grid gap-8 p-7 md:p-10 lg:grid-cols-3">
            {[
              {
                title: "Operator reality first",
                text: "If experienced dealership managers would say a workflow is not how the store actually works, the product should change.",
              },
              {
                title: "Human coaching stays central",
                text: "CoachUS enhances the manager's ability to coach. It does not replace relationships, judgment, or conversations.",
              },
              {
                title: "Improvement over labels",
                text: "The product should help salespeople see progress, daily focus, recognition, and a next step they can take.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[28px] bg-white/[0.045] p-6"
              >
                <p className="text-xl font-semibold text-white">{item.title}</p>
                <p className="mt-4 leading-7 text-slate-300">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="px-6 pb-28">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 rounded-[32px] border border-white/10 bg-white/[0.045] p-7 md:flex-row md:items-center md:justify-between md:p-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#ff7a45]">
              Company Story
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
