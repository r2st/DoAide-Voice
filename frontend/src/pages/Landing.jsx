import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { usePageTitle } from "../hooks/usePageTitle";

const DOAIDE_PRODUCTS = [
  { name: "Desk", url: "https://desk.doaide.com" },
  { name: "Jobs", url: "https://job.doaide.com" },
  { name: "409A", url: "https://409a.doaide.com" },
  { name: "GST", url: "https://gst.doaide.com" },
  { name: "Pulse", url: "https://pulse.doaide.com" },
  { name: "Med", url: "https://med.doaide.com" },
  { name: "Realty", url: "https://realty.doaide.com" },
  { name: "Reach", url: "https://reach.doaide.com" },
  { name: "Trade", url: "https://trade.doaide.com" },
];

const TYPEWRITER_PHRASES = [
  "AI handles your customer calls",
  "Run outbound campaigns at scale",
  "Real-time sentiment analysis",
  "Knowledge-powered conversations",
];

function RobotFace({ size = 32, color }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width={size} height={size} aria-hidden="true">
      <line x1="16" y1="6" x2="16" y2="2" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="16" cy="1.5" r="1.5" fill={color} />
      <rect x="5" y="6" width="22" height="17" rx="5" fill={color} />
      <ellipse cx="11" cy="13" rx="2.5" ry="3" fill="#0A0A0B" />
      <ellipse cx="21" cy="13" rx="2.5" ry="3" fill="#0A0A0B" />
      <circle cx="11.5" cy="12.5" r="1" fill={color} opacity="0.6" />
      <circle cx="21.5" cy="12.5" r="1" fill={color} opacity="0.6" />
      <path d="M12 19Q16 22 20 19" stroke="#0A0A0B" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <rect x="1" y="10" width="4" height="5" rx="2" fill={color} opacity="0.8" />
      <rect x="27" y="10" width="4" height="5" rx="2" fill={color} opacity="0.8" />
    </svg>
  );
}

function HeroRobot({ color }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 100" width="120" height="100" className="landing-hero-robot" aria-hidden="true">
      <line x1="60" y1="18" x2="60" y2="6" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="60" cy="4" r="3" fill={color} className="landing-antenna-glow" />
      <rect x="25" y="18" width="70" height="55" rx="16" fill={color} />
      <ellipse cx="42" cy="40" rx="8" ry="10" fill="#0A0A0B" />
      <ellipse cx="78" cy="40" rx="8" ry="10" fill="#0A0A0B" />
      <circle cx="44" cy="38" r="3" fill={color} opacity="0.5" />
      <circle cx="80" cy="38" r="3" fill={color} opacity="0.5" />
      <path d="M45 60 Q60 72 75 60" stroke="#0A0A0B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <rect x="5" y="30" width="16" height="18" rx="6" fill={color} opacity="0.8" />
      <rect x="99" y="30" width="16" height="18" rx="6" fill={color} opacity="0.8" />
    </svg>
  );
}

function Typewriter({ phrases }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const phrase = phrases[index];
    let timeout;
    if (!deleting && text === phrase) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % phrases.length);
    } else {
      const speed = deleting ? 30 : 60;
      timeout = setTimeout(() => {
        setText(deleting ? phrase.slice(0, text.length - 1) : phrase.slice(0, text.length + 1));
      }, speed);
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, index, phrases]);

  return (
    <span className="landing-typewriter" aria-label={phrases[index]}>
      {text}
      <span className="landing-cursor" aria-hidden="true">|</span>
    </span>
  );
}

function PipelineGraphic() {
  return (
    <div className="landing-pipeline" aria-hidden="true">
      <svg viewBox="0 0 520 90" xmlns="http://www.w3.org/2000/svg">
        <line x1="78" y1="36" x2="152" y2="36" stroke="rgba(240,180,41,0.2)" strokeWidth="2" />
        <line x1="218" y1="36" x2="302" y2="36" stroke="rgba(240,180,41,0.2)" strokeWidth="2" />
        <line x1="368" y1="36" x2="442" y2="36" stroke="rgba(240,180,41,0.2)" strokeWidth="2" />

        <circle r="3" fill="#F0B429" opacity="0.8">
          <animateMotion dur="2s" repeatCount="indefinite" path="M78,36 L152,36" />
        </circle>
        <circle r="2" fill="#F7CC5F" opacity="0.5">
          <animateMotion dur="2s" repeatCount="indefinite" begin="0.5s" path="M78,36 L152,36" />
        </circle>
        <circle r="3" fill="#F0B429" opacity="0.8">
          <animateMotion dur="2s" repeatCount="indefinite" begin="0.7s" path="M218,36 L302,36" />
        </circle>
        <circle r="2" fill="#F7CC5F" opacity="0.5">
          <animateMotion dur="2s" repeatCount="indefinite" begin="1.2s" path="M218,36 L302,36" />
        </circle>
        <circle r="3" fill="#F0B429" opacity="0.8">
          <animateMotion dur="2s" repeatCount="indefinite" begin="1.4s" path="M368,36 L442,36" />
        </circle>
        <circle r="2" fill="#F7CC5F" opacity="0.5">
          <animateMotion dur="2s" repeatCount="indefinite" begin="1.9s" path="M368,36 L442,36" />
        </circle>

        {/* Design */}
        <circle cx="50" cy="36" r="28" fill="rgba(240,180,41,0.06)" stroke="rgba(240,180,41,0.25)" strokeWidth="1.5" />
        <path d="M43 42V30l14 6-14 6z" fill="none" stroke="#F0B429" strokeWidth="1.3" strokeLinejoin="round" />
        <text x="50" y="78" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="10" fontFamily="'IBM Plex Mono',monospace">Design</text>

        {/* Deploy */}
        <circle cx="190" cy="36" r="28" fill="rgba(240,180,41,0.06)" stroke="rgba(240,180,41,0.25)" strokeWidth="1.5" />
        <path d="M183 30h14v12h-14z" fill="none" stroke="#F0B429" strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M186 36h8M186 39h5" stroke="#F0B429" strokeWidth="1" strokeLinecap="round" />
        <text x="190" y="78" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="10" fontFamily="'IBM Plex Mono',monospace">Deploy</text>

        {/* Call */}
        <circle cx="330" cy="36" r="28" fill="rgba(240,180,41,0.06)" stroke="rgba(240,180,41,0.25)" strokeWidth="1.5" />
        <path d="M323 30c0 0-2 4-2 6s2 6 9 6 9-4 9-6-2-6-2-6" fill="none" stroke="#F0B429" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M326 29l-3 3 3 3" fill="none" stroke="#F0B429" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M334 29l3 3-3 3" fill="none" stroke="#F0B429" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <text x="330" y="78" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="10" fontFamily="'IBM Plex Mono',monospace">Call</text>

        {/* Analyze */}
        <circle cx="470" cy="36" r="28" fill="rgba(240,180,41,0.06)" stroke="rgba(240,180,41,0.25)" strokeWidth="1.5" />
        <path d="M460 44l4-8 4 4 4-10 4 6" fill="none" stroke="#F0B429" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        <text x="470" y="78" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="10" fontFamily="'IBM Plex Mono',monospace">Analyze</text>
      </svg>
    </div>
  );
}

const PARTICLES = [
  { left: "8%", top: "15%", size: 3, delay: 0, dur: 18 },
  { left: "22%", top: "65%", size: 2, delay: 3, dur: 22 },
  { left: "35%", top: "30%", size: 4, delay: 7, dur: 15 },
  { left: "50%", top: "80%", size: 2, delay: 1, dur: 20 },
  { left: "65%", top: "20%", size: 3, delay: 5, dur: 17 },
  { left: "78%", top: "55%", size: 2, delay: 9, dur: 23 },
  { left: "90%", top: "35%", size: 3, delay: 2, dur: 19 },
  { left: "15%", top: "85%", size: 2, delay: 6, dur: 21 },
  { left: "42%", top: "45%", size: 3, delay: 4, dur: 16 },
  { left: "72%", top: "75%", size: 2, delay: 8, dur: 24 },
  { left: "88%", top: "10%", size: 4, delay: 10, dur: 14 },
  { left: "5%", top: "50%", size: 2, delay: 11, dur: 25 },
];

function ParticleField() {
  return (
    <div className="landing-particles" aria-hidden="true">
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className="landing-particle"
          style={{
            left: p.left, top: p.top, width: p.size, height: p.size,
            animationDelay: `${p.delay}s`, animationDuration: `${p.dur}s`,
          }}
        />
      ))}
    </div>
  );
}

const FEATURES = [
  {
    title: "AI Voice Agents",
    desc: "Create intelligent agents with custom personas, scripts, and natural conversation abilities powered by AI.",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#F0B429" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: "Inbound Call Handling",
    desc: "AI agents answer incoming calls, greet customers naturally, and resolve queries using your knowledge base.",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#F0B429" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
  },
  {
    title: "Outbound Campaigns",
    desc: "Build and launch automated call campaigns with contact lists, scheduling, and real-time progress tracking.",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#F0B429" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    title: "Real-time Analytics",
    desc: "Track call duration, sentiment scores, conversion rates, and trends with detailed visual dashboards.",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#F0B429" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  {
    title: "Knowledge Base",
    desc: "Upload documents so your voice agents can reference company-specific information during live calls.",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#F0B429" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
        <line x1="8" y1="7" x2="16" y2="7" />
        <line x1="8" y1="11" x2="13" y2="11" />
      </svg>
    ),
  },
  {
    title: "Twilio Integration",
    desc: "Connect with Twilio for reliable call handling, phone number provisioning, and global reach.",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#F0B429" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
];

const HOW_IT_WORKS = [
  { step: "1", title: "Build your agent", desc: "Define a persona, write a script, and upload knowledge documents your agent can reference during calls." },
  { step: "2", title: "Connect a number", desc: "Link a Twilio phone number in seconds. Your agent is live for inbound calls or outbound campaigns." },
  { step: "3", title: "Track results", desc: "Launch campaigns, monitor calls in real time, and review sentiment, duration, and conversion analytics." },
];

const TESTIMONIALS = [
  { name: "Sarah K.", role: "VP Sales, SaaS startup", quote: "DoAide Voice handles 80% of our inbound support calls. Our team now focuses exclusively on high-value conversations." },
  { name: "James R.", role: "Founder, real estate agency", quote: "We ran a 5,000-call outbound campaign in one afternoon. The sentiment analysis helped us refine our pitch in real time." },
  { name: "Priya M.", role: "Operations Manager, clinic", quote: "The knowledge base feature means our AI agent answers patient scheduling questions as accurately as our front desk." },
];

const FAQ_ITEMS = [
  {
    q: "What are AI voice agents?",
    a: "AI voice agents are intelligent virtual assistants that handle phone calls using natural language processing. They can greet callers, answer questions, collect information, and route calls — all without human intervention.",
  },
  {
    q: "How does inbound call handling work?",
    a: "When a call comes in to your Twilio number, DoAide Voice connects the caller to your AI agent. The agent uses your knowledge base and scripts to handle the conversation naturally, escalating to a human only when needed.",
  },
  {
    q: "Can I run outbound campaigns?",
    a: "Yes. Upload a contact list, set a schedule, and launch automated outbound campaigns. Your AI agent calls each contact, follows your script, and logs the outcome with full analytics.",
  },
  {
    q: "Is DoAide Voice really free?",
    a: "Yes. The free plan includes 50 minutes per month, 2 voice agents, call transcripts, and basic analytics — no credit card required. Paid plans start at $49/month for higher volumes.",
  },
  {
    q: "What integrations are supported?",
    a: "DoAide Voice integrates with Twilio for call handling and phone number management. We support any Twilio-compatible phone number, including local, toll-free, and international numbers.",
  },
  {
    q: "How accurate is the sentiment analysis?",
    a: "Our AI analyzes caller tone, word choice, and conversation flow in real time to score sentiment. Most users see 85%+ accuracy, and the model improves as it processes more of your calls.",
  },
  {
    q: "Can I customize what the agent says?",
    a: "Absolutely. You define the agent's persona, greeting, script flow, and knowledge base. The AI follows your guidelines while maintaining natural conversation — it is not a rigid IVR menu.",
  },
];

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="landing-faq" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="landing-section-title">Frequently Asked Questions</h2>
      <dl className="landing-faq-list">
        {FAQ_ITEMS.map((item, i) => (
          <div key={i} className="landing-faq-item">
            <dt>
              <button
                className="landing-faq-q"
                aria-expanded={openIndex === i}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                {item.q}
                <span className="landing-faq-chevron" aria-hidden="true">{openIndex === i ? "−" : "+"}</span>
              </button>
            </dt>
            {openIndex === i && <dd className="landing-faq-a">{item.a}</dd>}
          </div>
        ))}
      </dl>
    </section>
  );
}

export default function Landing() {
  usePageTitle("AI Voice Agents for Your Business — DoAide Voice");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const vis = visible ? "landing-visible" : "";

  return (
    <div className="landing-root">
      <ParticleField />

      <header className={`landing-header ${vis}`}>
        <a href="https://doaide.com" className="landing-brand">
          <RobotFace size={28} color="#F0B429" />
          <span className="landing-brand-text">
            DoAide <em>Voice</em>
          </span>
        </a>
      </header>

      <main>
        <div className={`landing-split ${vis}`}>
          <div className="landing-left">
            <div className="landing-hero-robot-wrap">
              <HeroRobot color="#F0B429" />
            </div>
            <h1 className="landing-headline">AI Voice Agents for Your Business</h1>
            <p className="landing-subtitle">
              Build, deploy, and manage intelligent voice agents that handle inbound
              calls, run outbound campaigns, and deliver real-time insights — powered
              by AI and connected to your knowledge base.
            </p>
            <div className="landing-typewriter-wrap">
              <Typewriter phrases={TYPEWRITER_PHRASES} />
            </div>
            <PipelineGraphic />
            <div className="landing-features">
              <div className="landing-feature">
                <strong>Free forever</strong>
                <span>50 minutes/month, 2 agents</span>
              </div>
              <div className="landing-feature">
                <strong>From $49/mo</strong>
                <span>500+ minutes, unlimited agents</span>
              </div>
            </div>
            <Link to="/pricing" className="landing-pricing-link">View all plans &rarr;</Link>
          </div>

          <div className="landing-right">
            <AuthForm />
          </div>
        </div>

        <section className="landing-section" aria-labelledby="features-heading">
          <h2 id="features-heading" className="landing-section-title">Everything You Need for Voice AI</h2>
          <div className="landing-features-grid">
            {FEATURES.map((f) => (
              <div key={f.title} className="landing-feature-card">
                <div className="landing-feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="landing-section" aria-labelledby="how-heading">
          <h2 id="how-heading" className="landing-section-title">How It Works</h2>
          <div className="landing-steps">
            {HOW_IT_WORKS.map((s) => (
              <div key={s.step} className="landing-step">
                <div className="landing-step-num">{s.step}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="landing-section" aria-labelledby="testimonials-heading">
          <h2 id="testimonials-heading" className="landing-section-title">Trusted by Growing Businesses</h2>
          <div className="landing-testimonials">
            {TESTIMONIALS.map((t) => (
              <blockquote key={t.name} className="landing-testimonial">
                <p>&ldquo;{t.quote}&rdquo;</p>
                <footer>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </section>

        <FaqSection />

        <section className="landing-cta">
          <h2>Start Building Your AI Voice Team</h2>
          <p>Free forever for up to 50 minutes/month. No credit card required.</p>
          <a href="#root" className="btn btn-primary landing-cta-btn" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
            Sign Up Free
          </a>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="landing-footer-nav">
          <div className="landing-footer-col">
            <h4>Product</h4>
            <Link to="/pricing">Pricing</Link>
            <a href="#features-heading" onClick={(e) => { e.preventDefault(); document.getElementById("features-heading")?.scrollIntoView({ behavior: "smooth" }); }}>Features</a>
            <a href="#faq-heading" onClick={(e) => { e.preventDefault(); document.getElementById("faq-heading")?.scrollIntoView({ behavior: "smooth" }); }}>FAQ</a>
          </div>
          <div className="landing-footer-col">
            <h4>Resources</h4>
            <a href="#how-heading" onClick={(e) => { e.preventDefault(); document.getElementById("how-heading")?.scrollIntoView({ behavior: "smooth" }); }}>How It Works</a>
          </div>
          <div className="landing-footer-col">
            <h4>Company</h4>
            <a href="https://doaide.com">About DoAide</a>
            <a href="mailto:support@doaide.com">Contact</a>
          </div>
        </div>
        <div className="landing-footer-products">
          {DOAIDE_PRODUCTS.map((p) => (
            <a key={p.name} href={p.url} className="landing-footer-link">
              {p.name}
            </a>
          ))}
        </div>
        <div className="landing-footer-bottom">
          <a href="https://doaide.com" className="landing-footer-home">
            <RobotFace size={16} color="#F0B429" />
            doaide.com
          </a>
          <span className="landing-footer-copy">&copy; 2026 DoAide</span>
        </div>
      </footer>
    </div>
  );
}
