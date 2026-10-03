import { useState } from "react";
import { Link } from "react-router-dom";
import ShareButtons from "../components/ShareButtons";
import { usePageTitle } from "../hooks/usePageTitle";

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

const SCRIPTS = [
  {
    id: "sales",
    title: "Sales Outreach",
    category: "Sales",
    description: "Qualify leads, pitch products, and book demos through automated outbound calls.",
    script: `Agent: "Hi [Name], this is [Agent] from [Company]. I noticed you recently visited our website — do you have two minutes to chat about how we can help your team?"

If interested:
Agent: "Great! What's your biggest challenge with [pain point] right now?"
[Listen and acknowledge]
Agent: "That's exactly what our platform solves. We've helped companies like yours reduce [metric] by up to 40%. Would you be open to a quick 15-minute demo this week?"

If not interested:
Agent: "No worries at all! Can I send you a quick email with some resources you might find useful?"

Close:
Agent: "Thanks for your time, [Name]. Have a great day!"`,
  },
  {
    id: "support",
    title: "Customer Support",
    category: "Support",
    description: "Handle common support queries, troubleshoot issues, and escalate when needed.",
    script: `Agent: "Thank you for calling [Company] support. My name is [Agent]. How can I help you today?"

[Listen to issue]
Agent: "I understand you're experiencing [issue]. Let me help you with that."

For known issues:
Agent: "Here's what I'd recommend: [solution steps]. Would you like me to walk you through this?"

For complex issues:
Agent: "This sounds like something our specialist team can best assist with. Let me transfer you to [department]. Before I do, is there anything else I can note for them?"

Resolution:
Agent: "Is there anything else I can help you with today? Great — thanks for calling [Company]. Have a wonderful day!"`,
  },
  {
    id: "appointment",
    title: "Appointment Booking",
    category: "Scheduling",
    description: "Book, reschedule, and confirm appointments with natural conversation flow.",
    script: `Agent: "Hello! Thank you for calling [Business]. I can help you schedule an appointment. What type of visit are you looking for?"

[Identify service type]
Agent: "Perfect. Let me check our availability for [service]. Do you have a preferred day or time?"

If available:
Agent: "I have an opening on [date] at [time]. Would that work for you?"

Confirm details:
Agent: "Great! I've booked you for [service] on [date] at [time]. Can I confirm your name and contact number?"

Reminder:
Agent: "You'll receive a confirmation text shortly. We'll also send a reminder 24 hours before your appointment. Is there anything else I can help with?"`,
  },
  {
    id: "survey",
    title: "Customer Survey",
    category: "Research",
    description: "Conduct post-call or satisfaction surveys with structured question flows.",
    script: `Agent: "Hi [Name], this is [Agent] from [Company]. We'd love to get your feedback on your recent experience. Do you have about 2 minutes?"

If yes:
Agent: "On a scale of 1 to 10, how would you rate your overall experience with us?"
[Record score]

Agent: "What's one thing we did well?"
[Record response]

Agent: "And is there anything we could improve?"
[Record response]

Agent: "Thank you so much for your feedback, [Name]. It really helps us improve. Have a great day!"

If no:
Agent: "No problem at all. Would there be a better time for us to call back?"`,
  },
  {
    id: "followup",
    title: "Follow-up Call",
    category: "Retention",
    description: "Re-engage past customers, check satisfaction, and identify upsell opportunities.",
    script: `Agent: "Hi [Name], this is [Agent] from [Company]. I'm reaching out to see how things have been going since your recent [purchase/visit]. Do you have a quick moment?"

Check satisfaction:
Agent: "How has your experience been with [product/service]? Is everything working as expected?"

If positive:
Agent: "That's wonderful to hear! By the way, we recently launched [new feature/product] that many of our customers have found helpful. Would you like to hear about it?"

If issues:
Agent: "I'm sorry to hear that. Let me make a note and have someone from our team reach out to help resolve this. What's the best way to contact you?"

Close:
Agent: "Thanks for your time, [Name]. We really appreciate your business!"`,
  },
  {
    id: "qualification",
    title: "Lead Qualification",
    category: "Sales",
    description: "Screen and qualify inbound leads with BANT criteria before routing to sales.",
    script: `Agent: "Thanks for your interest in [Company]! I'd love to learn a bit more about your needs to connect you with the right team member."

Budget:
Agent: "Do you have a budget range in mind for this type of solution?"

Authority:
Agent: "Are you the primary decision-maker for this, or would others be involved?"

Need:
Agent: "What specific challenge are you looking to solve? And how are you handling it today?"

Timeline:
Agent: "What's your ideal timeline for getting started?"

Qualified:
Agent: "Based on what you've shared, I think you'd be a great fit for our [plan]. Let me schedule you with one of our specialists. What day works best?"

Not qualified:
Agent: "Thanks for sharing that. Based on your needs, I'd recommend checking out our [free resources/entry plan]. I'll send those over to you."`,
  },
];

export default function Scripts() {
  usePageTitle("Free AI Voice Scripts Library — DoAide Voice");
  const [selected, setSelected] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  function handleCopy(script, id) {
    navigator.clipboard.writeText(script).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  }

  return (
    <div className="landing-root">
      <header className="landing-header landing-visible">
        <a href="https://doaide.com" className="landing-brand">
          <RobotFace size={28} color="#F0B429" />
          <span className="landing-brand-text">DoAide <em>Voice</em></span>
        </a>
        <div style={{ marginLeft: "auto", display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <Link to="/" className="btn btn-ghost">Home</Link>
          <Link to="/register" className="btn btn-primary">Get Started</Link>
        </div>
      </header>

      <main>
        <div className="viral-page">
          <div className="viral-header">
            <h1>AI Voice Agent Scripts Library</h1>
            <p>Free, ready-to-use scripts for common business scenarios. Copy, customize, and deploy with DoAide Voice.</p>
          </div>

          <div className="scripts-grid">
            {SCRIPTS.map((s) => (
              <div key={s.id} className={`script-card ${selected === s.id ? "script-card-expanded" : ""}`}>
                <div className="script-card-header">
                  <span className="badge badge-primary">{s.category}</span>
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                  <div className="script-card-actions">
                    <button className="btn btn-ghost" onClick={() => setSelected(selected === s.id ? null : s.id)}>
                      {selected === s.id ? "Hide Script" : "View Script"}
                    </button>
                    <button className="btn btn-primary" onClick={() => handleCopy(s.script, s.id)}>
                      {copiedId === s.id ? "Copied!" : "Copy Script"}
                    </button>
                  </div>
                </div>
                {selected === s.id && (
                  <div className="script-preview">
                    <pre>{s.script}</pre>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="demo-cta-section">
            <h2>Deploy These Scripts as AI Voice Agents</h2>
            <p>Turn any script into a live AI voice agent that handles calls 24/7 — no coding required.</p>
            <Link to="/register" className="btn btn-primary" style={{ padding: "0.7rem 2rem" }}>Start Free</Link>
          </div>

          <div className="viral-share-section">
            <p>Share these scripts with your team</p>
            <ShareButtons url="https://voice.doaide.com/scripts" text="Free AI voice agent scripts for sales, support, and more:" />
          </div>
        </div>
      </main>

      <footer className="landing-footer">
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
