import { Link } from "react-router-dom";

const FEATURES = [
  { icon: "🤖", title: "AI Voice Agents", desc: "Create intelligent voice agents that handle calls naturally with AI-powered conversations." },
  { icon: "📞", title: "Inbound & Outbound", desc: "Handle incoming customer calls and run outbound campaigns — all from one platform." },
  { icon: "📊", title: "Real-time Analytics", desc: "Track call duration, sentiment, conversion rates, and more with detailed dashboards." },
  { icon: "📚", title: "Knowledge Base", desc: "Upload documents so your agents can reference company-specific information during calls." },
  { icon: "📢", title: "Campaign Manager", desc: "Build outbound call campaigns with contact lists, scheduling, and progress tracking." },
  { icon: "🔗", title: "Twilio Integration", desc: "Seamlessly connect with Twilio for reliable call handling and phone number management." },
];

export default function Landing() {
  return (
    <div>
      <header style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "1rem 2rem", borderBottom: "1px solid var(--color-border)",
        background: "var(--color-bg-secondary)",
      }}>
        <strong style={{ fontSize: "1.25rem" }}>DoAide Voice</strong>
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <Link to="/pricing" style={{ fontSize: "0.875rem" }}>Pricing</Link>
          <Link to="/login" className="btn btn-secondary">Login</Link>
          <Link to="/register" className="btn btn-primary">Get Started</Link>
        </div>
      </header>

      <section style={{ textAlign: "center", padding: "5rem 1.5rem 3rem", maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "3rem", fontWeight: 700, lineHeight: 1.2, marginBottom: "1rem" }}>
          AI Voice Agents<br />
          <span style={{ color: "var(--color-primary)" }}>for Your Business</span>
        </h1>
        <p style={{ fontSize: "1.125rem", color: "var(--color-text-secondary)", marginBottom: "2rem", maxWidth: "600px", margin: "0 auto 2rem" }}>
          Build, deploy, and manage intelligent voice agents that handle customer calls,
          run outbound campaigns, and deliver insights — powered by AI.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/register" className="btn btn-primary" style={{ padding: "0.75rem 2rem", fontSize: "1rem" }}>
            Start Free
          </Link>
          <Link to="/pricing" className="btn btn-secondary" style={{ padding: "0.75rem 2rem", fontSize: "1rem" }}>
            View Pricing
          </Link>
        </div>
      </section>

      <section style={{ padding: "3rem 1.5rem", maxWidth: "1100px", margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", fontSize: "1.75rem", fontWeight: 700, marginBottom: "2rem" }}>
          Everything you need for voice AI
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {FEATURES.map(({ icon, title, desc }) => (
            <div key={title} className="card">
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{icon}</div>
              <h3 style={{ fontSize: "1.125rem", fontWeight: 600, marginBottom: "0.5rem" }}>{title}</h3>
              <p style={{ color: "var(--color-text-secondary)", fontSize: "0.875rem" }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ textAlign: "center", padding: "3rem 1.5rem", background: "var(--color-bg-tertiary)" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>
          Ready to build your AI voice team?
        </h2>
        <Link to="/register" className="btn btn-primary" style={{ padding: "0.75rem 2rem", fontSize: "1rem" }}>
          Get Started Free
        </Link>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "0.875rem", marginTop: "0.75rem" }}>
          50 free minutes per month. No credit card required.
        </p>
      </section>

      <footer style={{ textAlign: "center", padding: "2rem", color: "var(--color-text-tertiary)", fontSize: "0.8rem" }}>
        &copy; {new Date().getFullYear()} DoAide Voice by Apprend Technologies. All rights reserved.
      </footer>
    </div>
  );
}
