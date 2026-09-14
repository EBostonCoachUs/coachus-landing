import CoachingExample from "../components/CoachingExample.jsx";
import SiteLink from "../components/SiteLink.jsx";
import { audiences } from "../data/content.js";
export default function Product({ navigate }) {
  return (
    <>
      <section className="section">
        <div className="container">
          <p className="eyebrow">The product approach</p>
          <h1 className="page-title">
            A clearer starting point for daily coaching.
          </h1>
          <p className="intro max-w-3xl">
            CoachUS is being built to help dealership sales managers turn
            performance patterns into a useful conversation and an agreed next
            step.
          </p>
          <p className="mt-5 text-slate-400">
            Preparing for early dealer access.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="section-title">From a pattern to a conversation.</h2>
            <p className="intro">
              This fictional scenario explains the coaching approach. It is a
              human-authored illustration, not a claim that this exact signal or
              screen is available today.
            </p>
            <p className="intro">
              The manager asks what is happening, adds context, and works with
              the salesperson on a practical next step.
            </p>
          </div>
          <CoachingExample />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <h2 className="section-title">One purpose. A role for everyone.</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {audiences.map((x) => (
              <div className="panel" key={x.role}>
                <h3 className="text-xl font-semibold">{x.role}</h3>
                <p className="mt-4 leading-8 text-slate-300">{x.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container panel">
          <p className="eyebrow">Fit comes first</p>
          <h2 className="section-title">Let’s start with your dealership.</h2>
          <p className="intro max-w-3xl">
            Early-access scope, system connections, and timing are confirmed
            individually. A request starts a conversation; it does not guarantee
            a pilot place.
          </p>
          <SiteLink
            href="/early-access"
            navigate={navigate}
            className="button primary mt-7"
          >
            Request early access
          </SiteLink>
        </div>
      </section>
    </>
  );
}
