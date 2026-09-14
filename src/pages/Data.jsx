import SiteLink from "../components/SiteLink.jsx";
export default function Data({ navigate }) {
  return (
    <>
      <section className="section">
        <div className="container">
          <p className="eyebrow">Data & trust</p>
          <h1 className="page-title">Data should make coaching clearer.</h1>
          <p className="intro max-w-3xl">
            CoachUS is being built to turn dealership performance patterns into
            useful coaching priorities. The manager brings the context and leads
            the conversation.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container grid gap-5 md:grid-cols-2">
          {[
            [
              "A specific purpose",
              "The approach starts with a coaching question: where could a conversation help someone improve?",
            ],
            [
              "People stay involved",
              "A signal is a starting point for inquiry. Managers and salespeople discuss what is happening and agree on the next step.",
            ],
            [
              "Connections confirmed individually",
              "Available systems and data scope depend on the current integration stage and the dealership. We confirm those details before a pilot.",
            ],
            [
              "Questions before access",
              "Ask about data access, handling, and pilot scope before deciding whether CoachUS fits your dealership.",
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
          <h2 className="section-title">
            Understand the scope before you connect.
          </h2>
          <p className="intro">
            Website inquiries and dealership application data serve different
            purposes. Our privacy notices address those separately.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <SiteLink
              href="/privacy"
              navigate={navigate}
              className="button secondary"
            >
              Privacy notices
            </SiteLink>
            <SiteLink
              href="/support"
              navigate={navigate}
              className="button secondary"
            >
              Contact CoachUS
            </SiteLink>
          </div>
        </div>
      </section>
    </>
  );
}
