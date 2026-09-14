import AnimatedSection from "../components/AnimatedSection.jsx";
import SiteLink from "../components/SiteLink.jsx";
import { reviewMode, site } from "../config/site.js";
import { legalDrafts, legalEffectiveDate } from "../data/legal.js";

const titles = {
  website: "Privacy Policy",
  terms: "Terms of Service",
  cookies: "Cookie Policy",
};

export default function Privacy({ navigate, kind = "website" }) {
  const title = titles[kind] || titles.website;
  const sections = legalDrafts[kind] || legalDrafts.website;

  return (
    <>
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-5xl">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#ff7a45]">
            <span className="h-px w-8 bg-[#ff7a45]" />
            COACHUS LLC · LEGAL
          </p>
          <h1 className="mt-6 text-balance text-5xl font-semibold leading-tight md:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-9 text-slate-300">
            {reviewMode
              ? "Prepared for launch review: September 14, 2026"
              : `Effective date: ${legalEffectiveDate}`}
          </p>
          {reviewMode && (
            <aside className="mt-7 rounded-[24px] border border-white/10 bg-white/[0.045] p-5 text-slate-300">
              Proposed website notice. The copy reflects the agreed simple
              launch; live services, retention, approval, and the real effective
              date still need to be verified before public release.
            </aside>
          )}
          <nav aria-label="Legal pages" className="mt-7 flex flex-wrap gap-3">
            {[
              ["/privacy", "Privacy"],
              ["/terms", "Terms"],
              ["/cookies", "Cookies"],
            ].map(([href, label]) => (
              <SiteLink
                key={href}
                href={href}
                navigate={navigate}
                className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.06] focus:outline-none focus:ring-4 focus:ring-[#2d76ff]/20"
              >
                {label}
              </SiteLink>
            ))}
          </nav>
        </div>
      </section>

      <AnimatedSection className="px-6 pb-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[280px_1fr]">
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <nav
              aria-label={`${title} sections`}
              className="rounded-[28px] border border-white/10 bg-white/[0.045] p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                Contents
              </p>
              <div className="mt-4 grid gap-2">
                {sections.map(([heading], index) => (
                  <a
                    key={heading}
                    href={`#legal-${index + 1}`}
                    className="rounded-2xl px-3 py-2 text-sm text-slate-300 transition hover:bg-white/[0.06] hover:text-white focus:outline-none focus:ring-4 focus:ring-[#2d76ff]/20"
                  >
                    {heading}
                  </a>
                ))}
              </div>
            </nav>
          </aside>

          <div className="rounded-[36px] border border-white/10 bg-[#0d111b] p-6 md:p-10">
            <div className="space-y-12">
              {sections.map(([heading, ...paragraphs], index) => (
                <section
                  key={heading}
                  id={`legal-${index + 1}`}
                  className="scroll-mt-32 border-b border-white/10 pb-10 last:border-b-0 last:pb-0"
                >
                  <h2 className="text-2xl font-semibold text-white">
                    {index + 1}. {heading}
                  </h2>
                  <div className="mt-5 space-y-4 text-base leading-8 text-slate-300 md:text-lg">
                    {paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
            <p className="mt-10">
              <a
                className="text-slate-200 underline decoration-white/20 underline-offset-4 transition hover:text-white hover:decoration-white focus:outline-none focus:ring-4 focus:ring-[#2d76ff]/20"
                href={`mailto:${site.contactEmail}?subject=Privacy%20request`}
              >
                Contact CoachUS
              </a>
            </p>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}
