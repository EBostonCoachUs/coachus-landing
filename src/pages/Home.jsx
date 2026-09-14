import SiteLink from '../components/SiteLink.jsx';
import WaitlistForm from '../components/WaitlistForm.jsx';
import { assets } from '../config/site.js';

const features = [
 ['Find the bottleneck.', 'CoachUS pulls from dealership systems and breaks performance data into effort, skill, performance, and improvement signals.'],
 ['Make every coaching conversation count.', 'A manager starts the day with a clearer view of where each salesperson may be stuck and what conversation should happen next.'],
 ['Give leadership a clearer view.', 'Dealer principals and GMs can see where coaching is happening across teams instead of relying on gut feel or month-end numbers.'],
];
const roles = [
 ['Dealer principals and GMs', 'Invest in a consistent operating layer for coaching across teams, not another month-end report.'],
 ['Managers', 'Walk in knowing who needs help, why they may need help, and what conversation to have next.'],
 ['Salespeople', 'See daily priorities, personal progress, Power Rankings, streaks, and a clearer path to improve.'],
];
const principles = [
 ['Use data to make coaching specific', 'CoachUS is designed to turn fragmented performance information into timely coaching signals and daily priorities.'],
 ['Keep managers in the lead', 'AI helps identify coaching opportunities at a scale that would otherwise be hard to manage. It does not replace judgment, relationships, or the conversation.'],
 ['Make improvement visible', 'The product should help salespeople understand progress over time and know what to focus on today.'],
 ['Built for the dealership floor', 'Every feature should earn its place in a manager’s day.'],
];
function Eyebrow({children}) { return <p className="eyebrow review-eyebrow">{children}</p>; }
export default function Home({navigate}) {
 return <div className="approved-home">
  <section className="section approved-hero">
   <div className="container hero-columns">
    <div>
     <img src={assets.logoColorInvert} alt="CoachUS" className="hero-wordmark" />
     <Eyebrow>Dealership coaching intelligence</Eyebrow>
     <h1 id="hero-title" className="approved-hero-title">The next era<br className="desktop-break"/> of dealership<br className="desktop-break"/> performance<br className="desktop-break"/> begins here.</h1>
     <p className="intro hero-intro">You’ve optimized your inventory. You’ve digitized your showroom. <strong>Now give your people the same attention.</strong></p>
     <WaitlistForm headingId="hero-title" navigate={navigate} compact />
     <div className="hero-links"><SiteLink href="/#product" navigate={navigate}>See how CoachUS works</SiteLink><span>Built by dealership operators for daily coaching.</span></div>
    </div>
    <div className="coaching-frame"><div className="coaching-frame-inner"><div className="coaching-card">
     <Eyebrow>Coaching signal</Eyebrow>
     <h2>Who needs your attention today?</h2>
     <p>CoachUS turns performance patterns into a clear manager action while there is still time to change the outcome.</p>
     <div className="coaching-questions">{['Who needs help?', 'Where are they getting stuck?', 'What should happen next?'].map(q=><div key={q}>{q}</div>)}</div>
    </div></div></div>
   </div>
  </section>
  <section className="section proof-band" aria-label="Dealer response and dealership experience"><div className="container proof-columns">
   <div><Eyebrow>Dealer response</Eyebrow><h2>19 dealers saw it.<br/><em>17</em> wanted in.</h2><p>We showed dealers the prototype. Seventeen said they’d be in if it were live.</p></div>
   <div><Eyebrow>Dealership experience</Eyebrow><h2><em>25+</em> years on the floor.<br/>Built into CoachUS.</h2><p>Real dealership experience. A coaching approach developed while leading sales teams.</p></div>
  </div></section>
  <section className="section"><div className="container blind-columns">
   <div><Eyebrow>The blind spot</Eyebrow><h2 className="section-title">Every dealership knows what happened last month.</h2><p className="intro">Far fewer can tell you who needed help last Tuesday, while there was still time to change the outcome. CoachUS closes that gap by turning dealership data into timely coaching signals.</p></div>
   <div className="blind-cards">{[
    'Dealership software measures outcomes. CoachUS helps influence the daily behaviors that create those outcomes.',
    'Managers get a clearer view of where to spend their time without digging through reports or waiting for month-end.',
    'Salespeople get daily focus, progress visibility, and recognition that reinforces the coaching happening in the store.'
   ].map(t=><div className="panel" key={t}><p>{t}</p></div>)}</div>
  </div></section>
  <section className="section" id="product"><div className="container">
   <Eyebrow>What CoachUS does</Eyebrow><h2 className="section-title">See where they’re stuck.<br/>Know where to start.</h2>
   <p className="intro feature-intro">CoachUS breaks performance information into practical signals so managers can coach with more consistency and salespeople can see the next useful step.</p>
   <div className="feature-cards">{features.map(([h,p],i)=><div className={`panel ${i===1?'accent-panel':''}`} key={h}><h3>{h}</h3><p>{p}</p></div>)}</div>
  </div></section>
  <section className="section"><div className="container leadership-columns">
   <div className="roles-frame">{roles.map(([h,p],i)=><div className="role-card" key={h}><span className="role-number">0{i+1}</span><div><h3>{h}</h3><p>{p}</p></div></div>)}</div>
   <div><Eyebrow>Built for dealership leadership</Eyebrow><h2 className="leadership-title">Clarity for leaders.<br/>Direction for managers.<br/>Progress for salespeople.</h2></div>
  </div></section>
  <section className="section"><div className="container data-columns">
   <div><Eyebrow>Data and AI philosophy</Eyebrow><h2 className="section-title">AI is the mechanism.<br/>Better coaching is the point.</h2><p className="intro">CoachUS uses data to help leaders see trends, managers identify coaching opportunities, and salespeople understand what to focus on today.</p><SiteLink className="button secondary data-link" href="/data" navigate={navigate}>Read our data approach</SiteLink></div>
   <div className="principle-cards">{principles.map(([h,p])=><div className="panel" key={h}><h3>{h}</h3><p>{p}</p></div>)}</div>
  </div></section>
  <section className="section founder-section"><div className="container founder-panel founder-with-portrait">
   <figure className="founder-figure"><div className="portrait-crop"><img src="/assets/matt-cady-headshot.jpg" alt="Matt Cady, founder of CoachUS" width="3375" height="4219" loading="lazy" decoding="async" /></div><figcaption>Matt Cady <span>· Founder</span></figcaption></figure>
   <div className="founder-copy">
   <div><Eyebrow>Founder led</Eyebrow><h2 className="section-title">Built by someone who lived the problem.</h2></div>
   <div><p>After decades leading dealership sales teams, Matt Cady built CoachUS around a simple belief: developing your people deserves the same attention as measuring their performance.</p><SiteLink href="/about" navigate={navigate} className="button founder-link">The story behind CoachUS <span aria-hidden="true">→</span></SiteLink></div>
   </div>
  </div></section>
  <section className="section closing-signup" id="early-access"><div className="container max-w-4xl">
   <Eyebrow>Join the waitlist</Eyebrow><h2 className="section-title" id="closing-signup-title">Bring daily coaching clarity into the dealership.</h2><p className="intro">CoachUS is preparing pilot access for dealership teams that want a clearer daily coaching rhythm.</p><div className="closing-form"><WaitlistForm headingId="closing-signup-title" navigate={navigate}/></div>
  </div></section>
 </div>;
}
