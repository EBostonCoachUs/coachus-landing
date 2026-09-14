import { motion, useReducedMotion } from "framer-motion";
import AnimatedSection from "../components/AnimatedSection.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import SiteLink from "../components/SiteLink.jsx";
import WaitlistForm from "../components/WaitlistForm.jsx";
import { assets } from "../config/site.js";
import { audiences, dataPrinciples } from "../data/content.js";

const featureCards = [
  {
    title: "Find the bottleneck.",
    text: "CoachUS pulls from dealership systems and breaks performance data into effort, skill, performance, and improvement signals.",
  },
  {
    title: "Make every coaching conversation count.",
    text: "A manager starts the day with a clearer view of where each salesperson may be stuck and what conversation should happen next.",
  },
  {
    title: "Give leadership a clearer view.",
    text: "Dealer principals and GMs can see where coaching is happening across teams instead of relying on gut feel or month-end numbers.",
  },
];

const blindSpotCards = [
  "Dealership software measures outcomes. CoachUS helps influence the daily behaviors that create those outcomes.",
  "Managers get a clearer view of where to spend their time without digging through reports or waiting for month-end.",
  "Salespeople get daily focus, progress visibility, and recognition that reinforces the coaching happening in the store.",
];

function HeroVisual() {
  return (
    <div className="relative mx-auto mt-12 w-full max-w-xl lg:mt-0">
      <div className="overflow-hidden rounded-[34px] border border-white/10 bg-[#0c1220]/92 p-4 shadow-[0_30px_130px_rgba(0,0,0,0.48)]">
        <div className="rounded-[26px] border border-white/10 bg-[#070b13] p-4">
          <div className="rounded-[22px] border border-white/10 bg-white/[0.045] p-6 md:p-7">
            <p className="text-xs uppercase tracking-[0.22em] text-[#ff7a45]">
              Coaching signal
            </p>
            <h2 className="mt-5 text-3xl font-semibold leading-tight text-white md:text-4xl">
              Who needs your attention today?
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-400 md:text-lg md:leading-8">
              CoachUS turns performance patterns into a clear manager action
              while there is still time to change the outcome.
            </p>
            <div className="mt-7 grid gap-3">
              {[
                "Who needs help?",
                "Where are they getting stuck?",
                "What should happen next?",
              ].map((question) => (
                <div
                  key={question}
                  className="rounded-2xl border border-white/10 bg-[#0d1525] px-4 py-4 text-sm font-semibold text-slate-200"
                >
                  {question}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home({ navigate }) {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <section className="px-6 pb-20 pt-12 md:pb-28 md:pt-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <motion.img
              src={assets.logoColorInvert}
              alt="CoachUS"
              className="mb-10 h-16 w-auto md:h-20"
              initial={reduceMotion ? false : { opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            />
            <motion.p
              className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#ff7a45]"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
            >
              <span className="h-px w-8 bg-[#ff7a45]" />
              DEALERSHIP COACHING INTELLIGENCE
            </motion.p>
            <motion.h1
              id="hero-title"
              className="mt-6 max-w-5xl text-balance text-5xl font-semibold leading-[0.98] tracking-normal text-white md:text-7xl"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              The next era of dealership performance begins here.
            </motion.h1>
            <motion.p
              className="mt-7 max-w-2xl text-xl leading-9 text-slate-300"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.16 }}
            >
              You’ve optimized your inventory. You’ve digitized your showroom.
              Now give your people the same attention.
            </motion.p>

            <motion.div
              className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.22 }}
            >
              <SiteLink
                href="/#waitlist"
                navigate={navigate}
                className="inline-flex min-h-[3.25rem] items-center justify-center rounded-[18px] bg-[#2d76ff] px-7 text-sm font-semibold text-white shadow-[0_18px_48px_rgba(45,118,255,0.28)] transition hover:-translate-y-0.5 hover:bg-[#3b82ff] focus:outline-none focus:ring-4 focus:ring-[#2d76ff]/25"
              >
                Join our waitlist
              </SiteLink>
              <SiteLink
                href="/#product"
                navigate={navigate}
                className="inline-flex min-h-[3.25rem] items-center justify-center rounded-[18px] border border-white/10 bg-white/[0.04] px-6 text-sm font-semibold text-slate-200 transition hover:bg-white/[0.08] hover:text-white focus:outline-none focus:ring-4 focus:ring-[#2d76ff]/20"
              >
                See how CoachUS works
              </SiteLink>
            </motion.div>
          </div>

          <HeroVisual />
        </div>
      </section>

      <AnimatedSection className="border-y border-white/10 bg-white/[0.025] px-6 py-14">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">
          <div className="py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ff7a45]">
              DEALER RESPONSE
            </p>
            <h2 className="mt-5 text-balance text-4xl font-semibold leading-tight text-white md:text-5xl">
              19 dealers saw it.
              <br />
              <span className="text-[#ff7a45]">17</span> wanted in.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
              We showed dealers the prototype. Seventeen said they’d be in if
              it were live.
            </p>
          </div>
          <div className="py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ff7a45]">
              DEALERSHIP EXPERIENCE
            </p>
            <h2 className="mt-5 text-balance text-4xl font-semibold leading-tight text-white md:text-5xl">
              <span className="text-[#ff7a45]">25+</span> years on the floor.
              <br />
              Built into CoachUS.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
              Real dealership experience. A coaching approach developed while
              leading sales teams.
            </p>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="px-6 py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1fr]">
          <SectionHeading
            eyebrow="THE BLIND SPOT"
            title="Every dealership knows what happened last month."
          >
            <p>
              Far fewer can tell you who needed help last Tuesday, while there
              was still time to change the outcome. CoachUS closes that gap by
              turning dealership data into timely coaching signals.
            </p>
          </SectionHeading>

          <div className="grid gap-4">
            {blindSpotCards.map((text) => (
              <div
                key={text}
                className="rounded-[28px] border border-white/10 bg-white/[0.045] p-6 text-lg leading-8 text-slate-200"
              >
                {text}
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection id="product" className="px-6 pb-10">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="WHAT COACHUS DOES"
            title={
              <>
                See where they’re stuck.
                <br />
                Know where to start.
              </>
            }
          >
            <p>
              CoachUS breaks performance information into practical signals so
              managers can coach with more consistency and salespeople can see
              the next useful step.
            </p>
          </SectionHeading>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {featureCards.map((item, index) => (
              <div
                key={item.title}
                className={`rounded-[30px] border p-7 ${
                  index === 1
                    ? "border-[#2d76ff]/30 bg-[#2d76ff]/10"
                    : "border-white/10 bg-white/[0.045]"
                }`}
              >
                <p className="text-xl font-semibold text-white">{item.title}</p>
                <p className="mt-4 leading-7 text-slate-300">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="px-6 py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <div className="rounded-[34px] border border-white/10 bg-[#0d111b] p-6 md:p-8">
            <div className="grid gap-4">
              {audiences.map((audience, index) => (
                <div
                  key={audience.role}
                  className="grid gap-4 rounded-[24px] border border-white/10 bg-white/[0.04] p-5 md:grid-cols-[auto_1fr] md:items-start"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#ff7a45]/12 text-sm font-semibold text-[#ff9b73] ring-1 ring-[#ff7a45]/25">
                    0{index + 1}
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-white">
                      {audience.role}
                    </p>
                    <p className="mt-2 leading-7 text-slate-300">
                      {audience.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <SectionHeading
            eyebrow="BUILT FOR DEALERSHIP LEADERSHIP"
            title={
              <>
                Clarity for leaders.
                <br />
                Direction for managers.
                <br />
                Progress for salespeople.
              </>
            }
          />
        </div>
      </AnimatedSection>

      <AnimatedSection className="px-6 py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1fr] lg:items-start">
          <SectionHeading
            eyebrow="DATA AND AI PHILOSOPHY"
            title={
              <>
                AI is the mechanism.
                <br />
                Better coaching is the point.
              </>
            }
          >
            <p>
              CoachUS uses data to help leaders see trends, managers identify
              coaching opportunities, and salespeople understand what to focus
              on today.
            </p>
            <SiteLink
              href="/data"
              navigate={navigate}
              className="mt-7 inline-flex rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.06] focus:outline-none focus:ring-4 focus:ring-[#2d76ff]/20"
            >
              Read our data approach
            </SiteLink>
          </SectionHeading>

          <div className="grid gap-4 sm:grid-cols-2">
            {dataPrinciples.map((principle) => (
              <div
                key={principle.title}
                className="rounded-[28px] border border-white/10 bg-white/[0.045] p-6"
              >
                <p className="text-lg font-semibold text-white">
                  {principle.title}
                </p>
                <p className="mt-3 leading-7 text-slate-300">
                  {principle.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="px-6 pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[36px] border border-white/10 bg-[#0d111b]">
          <div className="grid gap-8 p-7 md:p-10 lg:grid-cols-[0.42fr_1fr] lg:items-center lg:p-14">
            <figure className="m-0 max-w-sm">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[26px] border border-white/10 bg-[#070b13]">
                <img
                  src={assets.founderHeadshot}
                  alt="Matt Cady, founder of CoachUS"
                  className="absolute left-1/2 top-[44%] h-auto w-[156%] max-w-none -translate-x-1/2 -translate-y-1/2"
                  width="3375"
                  height="4219"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <figcaption className="mt-4 text-sm font-semibold text-slate-100">
                Matt Cady <span className="font-normal text-slate-400">· Founder</span>
              </figcaption>
            </figure>
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#ff7a45]">
                  <span className="h-px w-8 bg-[#ff7a45]" />
                  FOUNDER LED
                </p>
                <h2 className="mt-6 text-balance text-3xl font-semibold leading-tight md:text-5xl">
                  Built by someone who lived the problem.
                </h2>
              </div>
              <div>
                <p className="text-xl leading-9 text-slate-200">
                  After decades leading dealership sales teams, Matt Cady built
                  CoachUS around a simple belief: developing your people
                  deserves the same attention as measuring their performance.
                </p>
                <SiteLink
                  href="/about"
                  navigate={navigate}
                  className="mt-8 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#0b1020] transition hover:bg-slate-200 focus:outline-none focus:ring-4 focus:ring-white/20"
                >
                  The story behind CoachUS
                </SiteLink>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection id="waitlist" className="scroll-mt-32 px-6 pb-28">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mx-auto flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#ff7a45]">
            <span className="h-px w-8 bg-[#ff7a45]" />
            JOIN THE WAITLIST
            <span className="h-px w-8 bg-[#ff7a45]" />
          </p>
          <h2
            id="final-waitlist-title"
            className="mt-6 text-balance text-4xl font-semibold leading-tight md:text-6xl"
          >
            Bring daily coaching clarity into the dealership.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            CoachUS is preparing pilot access for dealership teams that want a
            clearer daily coaching rhythm.
          </p>
          <WaitlistForm
            variant="stacked"
            headingId="final-waitlist-title"
            className="mx-auto mt-9 max-w-2xl"
          />
        </div>
      </AnimatedSection>
    </>
  );
}
