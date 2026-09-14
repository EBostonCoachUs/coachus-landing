import WaitlistForm from "../components/WaitlistForm.jsx";
export default function EarlyAccess({ navigate }) {
  return (
    <section className="section">
      <div className="container max-w-3xl">
        <p className="eyebrow">Early access</p>
        <h1 className="page-title" id="access-title">
          See whether CoachUS fits your dealership.
        </h1>
        <p className="intro">
          Share your name, email, and optional phone number. Matt Cady will
          review your request and follow up about fit and next steps.
        </p>
        <WaitlistForm headingId="access-title" navigate={navigate} />
      </div>
    </section>
  );
}
