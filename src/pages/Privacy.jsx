import SiteLink from "../components/SiteLink.jsx";
import { legalDrafts, legalEffectiveDate } from "../data/legal.js";
import { reviewMode, site } from "../config/site.js";
export default function Privacy({ navigate, kind = "website" }) {
  const application = kind === "application";
  const titles = { website: "Privacy Policy", application: "Application Privacy Notice", terms: "Terms of Service", cookies: "Cookie Policy" };
  return (
    <section className="section">
      <div className="container max-w-4xl">
        <p className="eyebrow">CoachUS LLC · Legal</p>
        <h1 className="page-title">{titles[kind]}</h1>
        <p className="mt-5 text-slate-400">{reviewMode ? "Prepared for launch review: September 14, 2026" : `Effective date: ${legalEffectiveDate}`}</p>
        {reviewMode && <aside className="mt-7 rounded-2xl border border-white/15 bg-white/5 p-5 text-slate-300">
          {application ? "Application notice remains an internal working draft. It is excluded from the public website release." : "Proposed website notice. The copy below reflects the agreed simple launch; Boston must verify the live services and complete the launch checks before publication."}
        </aside>}
        <nav aria-label="Legal pages" className="mt-6 flex flex-wrap gap-3">
          {[["/privacy", "Privacy"], ["/terms", "Terms"], ["/cookies", "Cookies"]].map(([href,label]) => <SiteLink key={href} className="button secondary" href={href} navigate={navigate}>{label}</SiteLink>)}
        </nav>
        <div className="mt-10 space-y-9">
          {legalDrafts[kind].map(([heading, ...paras], i) => <section key={heading}>
            <h2 className="text-2xl font-semibold">{i + 1}. {heading}</h2>
            {paras.map(p => <p key={p} className="mt-4 leading-8 text-slate-300">{p}</p>)}
          </section>)}
        </div>
        <p className="mt-10"><a className="underline underline-offset-4" href={`mailto:${site.contactEmail}?subject=Privacy%20request`}>Contact CoachUS</a></p>
      </div>
    </section>
  );
}
