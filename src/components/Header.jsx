import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { assets, navItems, site } from "../config/site.js";
import SiteLink from "./SiteLink.jsx";

export default function Header({ path, navigate }) {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setOpen(false);
  }, [path]);

  return (
    <header className="sticky top-0 z-40 px-4 py-4 md:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-[24px] border border-white/10 bg-[#080d16]/78 px-4 py-3 shadow-[0_24px_80px_rgba(0,0,0,0.22)] backdrop-blur-xl">
        <SiteLink
          href="/"
          navigate={navigate}
          className="flex items-center gap-3 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#2d76ff]/20"
          aria-label="CoachUS home"
        >
          <img
            src={assets.logoColorInvert}
            alt="CoachUS"
            className="h-8 w-auto md:h-9"
          />
        </SiteLink>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1 lg:flex"
        >
          {navItems.map((item) => (
            <SiteLink
              key={item.href}
              href={item.href}
              navigate={navigate}
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/[0.06] hover:text-white focus:outline-none focus:ring-4 focus:ring-[#2d76ff]/20"
            >
              {item.label}
            </SiteLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <SiteLink
            href={site.loginRoute}
            navigate={navigate}
            className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-white/20 hover:bg-white/[0.06] focus:outline-none focus:ring-4 focus:ring-[#2d76ff]/20"
          >
            Login
          </SiteLink>
          <SiteLink
            href="/#waitlist"
            navigate={navigate}
            className="rounded-full bg-[#2d76ff] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_14px_38px_rgba(45,118,255,0.28)] transition hover:bg-[#3b82ff] focus:outline-none focus:ring-4 focus:ring-[#2d76ff]/25"
          >
            Join our waitlist
          </SiteLink>
        </div>

        <button
          type="button"
          className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] transition hover:bg-white/[0.1] focus:outline-none focus:ring-4 focus:ring-[#2d76ff]/20 lg:hidden"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
        >
          <span
            className={`absolute h-0.5 w-5 rounded-full bg-white transition ${
              open ? "rotate-45" : "-translate-y-1.5"
            }`}
          />
          <span
            className={`absolute h-0.5 w-5 rounded-full bg-white transition ${
              open ? "-rotate-45" : "translate-y-1.5"
            }`}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Mobile navigation"
            className="mx-auto mt-3 max-w-7xl overflow-hidden rounded-[26px] border border-white/10 bg-[#080d16]/95 p-3 shadow-[0_24px_90px_rgba(0,0,0,0.38)] backdrop-blur-xl lg:hidden"
            initial={reduceMotion ? false : { opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.22 }}
          >
            <div className="grid gap-1">
              {navItems.map((item) => (
                <SiteLink
                  key={item.href}
                  href={item.href}
                  navigate={navigate}
                  className="rounded-2xl px-4 py-4 text-base font-medium text-slate-200 transition hover:bg-white/[0.06] focus:outline-none focus:ring-4 focus:ring-[#2d76ff]/20"
                >
                  {item.label}
                </SiteLink>
              ))}
              <div className="mt-2 grid gap-2 border-t border-white/10 pt-3">
                <SiteLink
                  href={site.loginRoute}
                  navigate={navigate}
                  className="rounded-2xl border border-white/10 px-4 py-4 text-center text-base font-semibold text-white transition hover:bg-white/[0.06] focus:outline-none focus:ring-4 focus:ring-[#2d76ff]/20"
                >
                  Login
                </SiteLink>
                <SiteLink
                  href="/#waitlist"
                  navigate={navigate}
                  className="rounded-2xl bg-[#2d76ff] px-4 py-4 text-center text-base font-semibold text-white transition hover:bg-[#3b82ff] focus:outline-none focus:ring-4 focus:ring-[#2d76ff]/25"
                >
                  Join our waitlist
                </SiteLink>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
