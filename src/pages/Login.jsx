import SiteLink from "../components/SiteLink.jsx";
export default function Login({ navigate }) {
  return (
    <section className="section">
      <div className="container max-w-3xl">
        <p className="eyebrow">Application access</p>
        <h1 className="page-title">Access is arranged with your dealership.</h1>
        <p className="intro">
          If you’re participating in a pilot, use the invitation or access
          instructions you received during onboarding.
        </p>
        <SiteLink
          href="/support"
          navigate={navigate}
          className="button secondary mt-8"
        >
          Contact CoachUS
        </SiteLink>
      </div>
    </section>
  );
}
