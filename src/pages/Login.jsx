import SiteLink from "../components/SiteLink.jsx";
import { assets } from "../config/site.js";

export default function Login({ navigate }) {
  return (
    <section className="px-6 py-20 md:py-28">
      <div className="mx-auto flex min-h-[62vh] max-w-4xl items-center justify-center">
        <div className="w-full rounded-[38px] border border-white/10 bg-[#0d111b] p-8 text-center shadow-[0_30px_120px_rgba(0,0,0,0.38)] md:p-14">
          <img
            src={assets.logoColorInvert}
            alt="CoachUS"
            className="mx-auto h-16 w-auto"
          />
          <p className="mt-10 text-sm font-semibold uppercase tracking-[0.22em] text-[#ff7a45]">
            CoachUS Login
          </p>
          <h1 className="mt-5 text-balance text-5xl font-semibold leading-tight md:text-7xl">
            Coming soon.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            The CoachUS application portal is being prepared. For now, return
            to the public site or join the waitlist for product updates.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <SiteLink
              href="/"
              navigate={navigate}
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0b1020] transition hover:bg-slate-200 focus:outline-none focus:ring-4 focus:ring-white/20"
            >
              Back to CoachUS
            </SiteLink>
            <SiteLink
              href="/#waitlist"
              navigate={navigate}
              className="rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.08] focus:outline-none focus:ring-4 focus:ring-[#2d76ff]/20"
            >
              Join our waitlist
            </SiteLink>
          </div>
        </div>
      </div>
    </section>
  );
}
