import SiteLink from "../components/SiteLink.jsx";
export default function About({ navigate }) {
  return (
    <>
      <section className="section">
        <div className="container">
          <p className="eyebrow">About CoachUS</p>
          <h1 className="page-title">
            Built from life on the dealership floor.
          </h1>
          <p className="intro max-w-3xl">
            CoachUS exists because knowing the numbers is often easier than
            knowing where coaching could help.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container about-founder-layout">
          <figure className="founder-figure about-founder-figure"><div className="portrait-crop"><img src="/assets/matt-cady-headshot.jpg" alt="Matt Cady, founder of CoachUS" width="3375" height="4219" loading="lazy" decoding="async" /></div><figcaption>Matt Cady <span>· Founder</span></figcaption></figure>
          <div className="about-founder-copy">
          <div>
            <p className="eyebrow">Matt Cady · Founder</p>
            <h2 className="section-title">
              The problem was familiar long before the software.
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-8 text-slate-300">
            <p>
              Before founding CoachUS, Matt Cady led dealership sales teams. He
              saw the daily gap between reviewing performance and helping a
              salesperson improve.
            </p>
            <p>
              CoachUS is being built around that moment: who needs attention,
              what to ask, and what to work on next.
            </p>
            <p>
              The goal is consistent, useful coaching that fits the pace of a
              real dealership.
            </p>
          </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container grid gap-5 md:grid-cols-3">
          {[
            [
              "Operator reality first",
              "The experience should make sense to the people running the sales floor.",
            ],
            [
              "Human coaching stays central",
              "Managers bring judgment, relationships, and context to each conversation.",
            ],
            [
              "Improvement over labels",
              "Salespeople should have a clear focus, see progress, and receive recognition.",
            ],
          ].map(([title, text]) => (
            <div className="panel" key={title}>
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="mt-5 leading-8 text-slate-300">{text}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="container panel">
          <h2 className="section-title">Preparing for early dealer access.</h2>
          <p className="intro">
            Our initial focus is automotive dealership sales departments. We’re
            finishing the product and preparing pilots.
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
