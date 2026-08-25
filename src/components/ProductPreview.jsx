import AnimatedSection from "./AnimatedSection.jsx";
import { productSignals } from "../data/content.js";

export default function ProductPreview({ compact = false }) {
  return (
    <AnimatedSection
      id="product"
      className={`px-6 ${compact ? "py-16" : "py-24 md:py-32"}`}
    >
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#ff7a45]">
            <span className="h-px w-8 bg-[#ff7a45]" />
            Platform Preview
          </p>
          <h2 className="mt-5 text-balance text-3xl font-semibold leading-tight md:text-5xl">
            A daily coaching plan, not another dashboard to decode.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
            The platform brings manager priorities, coaching signals, and
            salesperson momentum into a focused daily view.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0c1220] p-4 shadow-[0_36px_120px_rgba(0,0,0,0.45)]">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#2d76ff]/70 to-transparent" />
          <div className="rounded-[24px] border border-white/10 bg-[#070b13] p-4">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Today
                </p>
                <p className="mt-1 text-lg font-semibold text-white">
                  Manager coaching queue
                </p>
              </div>
              <div className="rounded-full border border-[#2d76ff]/25 bg-[#2d76ff]/10 px-4 py-2 text-sm text-[#9cc0ff]">
                4 signals ready
              </div>
            </div>

            <div className="grid gap-3 py-4">
              {["Follow-up rhythm", "Lead response quality", "Next-step clarity"].map(
                (item, index) => (
                  <div
                    key={item}
                    className="grid gap-4 rounded-[20px] border border-white/10 bg-white/[0.045] p-4 sm:grid-cols-[1fr_auto] sm:items-center"
                  >
                    <div>
                      <p className="text-sm font-semibold text-white">{item}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-400">
                        Suggested conversation for a salesperson who can still
                        change the outcome this week.
                      </p>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-white/10 sm:w-28">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#ff7a45] to-[#2d76ff]"
                        style={{ width: `${78 - index * 16}%` }}
                      />
                    </div>
                  </div>
                ),
              )}
            </div>

            <div className="grid gap-3 sm:grid-cols-4">
              {productSignals.map((signal) => (
                <div
                  key={signal.title}
                  className="rounded-[18px] border border-white/10 bg-[#0f1726] p-4"
                >
                  <p className="text-sm font-semibold text-white">
                    {signal.title}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-slate-400">
                    {signal.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
