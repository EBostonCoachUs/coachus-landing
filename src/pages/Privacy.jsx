import AnimatedSection from "../components/AnimatedSection.jsx";
import { privacySections } from "../data/content.js";

export default function Privacy() {
  return (
    <>
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-5xl">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#ff7a45]">
            <span className="h-px w-8 bg-[#ff7a45]" />
            Privacy Policy
          </p>
          <h1 className="mt-6 text-balance text-5xl font-semibold leading-tight md:text-7xl">
            CoachUS Privacy Policy
          </h1>
          <div className="mt-8 rounded-[28px] border border-[#ff7a45]/25 bg-[#ff7a45]/10 p-5 text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ff9b73]">
              Draft for legal review
            </p>
            <p className="mt-3 leading-7 text-slate-200">
              No final approved legal privacy policy was included in the
              supplied materials. This page provides a stable draft structure
              for review before publication as an approved policy.
            </p>
          </div>
          <p className="mt-6 text-sm text-slate-500">
            Draft effective date: August 25, 2026
          </p>
        </div>
      </section>

      <AnimatedSection className="px-6 pb-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[280px_1fr]">
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <nav
              aria-label="Privacy policy sections"
              className="rounded-[28px] border border-white/10 bg-white/[0.045] p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                Contents
              </p>
              <div className="mt-4 grid gap-2">
                {privacySections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="rounded-2xl px-3 py-2 text-sm text-slate-300 transition hover:bg-white/[0.06] hover:text-white focus:outline-none focus:ring-4 focus:ring-[#2d76ff]/20"
                  >
                    {section.title}
                  </a>
                ))}
              </div>
            </nav>
          </aside>

          <div className="rounded-[36px] border border-white/10 bg-[#0d111b] p-6 md:p-10">
            <div className="space-y-12">
              {privacySections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-32 border-b border-white/10 pb-10 last:border-b-0 last:pb-0"
                >
                  <h2 className="text-2xl font-semibold text-white">
                    {section.title}
                  </h2>
                  <div className="mt-5 space-y-4 text-base leading-8 text-slate-300 md:text-lg">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
