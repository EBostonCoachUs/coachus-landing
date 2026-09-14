import { assets, navItems, site } from "../config/site.js";
import SiteLink from "./SiteLink.jsx";
export default function Footer({ navigate }) {
  return (
    <footer className="border-t border-white/10 px-6 py-12">
      <div className="container grid gap-10 md:grid-cols-2">
        <div>
          <SiteLink href="/" navigate={navigate} aria-label="CoachUS home">
            <img src={assets.logoWhite} alt="CoachUS" width="160" height="32" />
          </SiteLink>
          <p className="mt-5 max-w-md leading-7 text-slate-400">
            Coaching software for dealership sales teams.
          </p>
          <p className="mt-5 text-sm text-slate-400">
            © 2026 CoachUS LLC. All rights reserved.
          </p>
        </div>
        <div className="grid gap-7 sm:grid-cols-2">
          <nav aria-label="Footer navigation" className="grid gap-3">
            {[
              ...navItems,
              { label: "Early access", href: "/early-access" },
              { label: "Privacy", href: "/privacy" },
              { label: "Terms", href: "/terms" },
              { label: "Cookies", href: "/cookies" },
              { label: "Contact & support", href: "/support" },
            ].map((x) => (
              <SiteLink
                className="text-slate-300"
                key={x.href}
                href={x.href}
                navigate={navigate}
              >
                {x.label}
              </SiteLink>
            ))}
          </nav>
          <div>
            <p className="eyebrow">Contact</p>
            <a
              className="mt-4 block underline underline-offset-4"
              href={`mailto:${site.contactEmail}`}
            >
              {site.contactEmail}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
