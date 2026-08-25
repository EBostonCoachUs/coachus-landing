import { assets, navItems, site } from "../config/site.js";
import SiteLink from "./SiteLink.jsx";

export default function Footer({ navigate }) {
  return (
    <footer className="border-t border-white/10 bg-[#06080d] px-6 py-12">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_1fr] md:items-start">
        <div>
          <SiteLink
            href="/"
            navigate={navigate}
            className="inline-flex rounded-xl focus:outline-none focus:ring-4 focus:ring-[#2d76ff]/20"
            aria-label="CoachUS home"
          >
            <img src={assets.logoWhite} alt="CoachUS" className="h-7 w-auto" />
          </SiteLink>
          <p className="mt-5 max-w-lg text-sm leading-7 text-slate-400">
            Dealership coaching intelligence built to help managers coach better
            and salespeople improve faster.
          </p>
          <p className="mt-5 text-sm text-slate-500">
            Copyright 2026 CoachUS. All rights reserved.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <nav aria-label="Footer navigation" className="grid gap-3">
            {navItems.map((item) => (
              <SiteLink
                key={item.href}
                href={item.href}
                navigate={navigate}
                className="text-sm text-slate-400 transition hover:text-white focus:outline-none focus:ring-4 focus:ring-[#2d76ff]/20"
              >
                {item.label}
              </SiteLink>
            ))}
            <SiteLink
              href={site.loginRoute}
              navigate={navigate}
              className="text-sm text-slate-400 transition hover:text-white focus:outline-none focus:ring-4 focus:ring-[#2d76ff]/20"
            >
              Login
            </SiteLink>
          </nav>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Contact
            </p>
            <a
              href={`mailto:${site.contactEmail}`}
              className="mt-3 inline-flex text-sm text-slate-300 underline decoration-white/20 underline-offset-4 transition hover:text-white hover:decoration-white focus:outline-none focus:ring-4 focus:ring-[#2d76ff]/20"
            >
              {site.contactEmail}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
