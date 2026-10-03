import { Link } from "react-router-dom";

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: ["50 minutes/month", "2 voice agents", "Call transcripts", "Basic analytics", "Community support"],
    cta: "Start Free",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$49",
    period: "/month",
    features: ["500 minutes/month", "Unlimited agents", "Full analytics & sentiment", "Campaign manager", "Knowledge base", "Priority support"],
    cta: "Start Pro Trial",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    features: ["Unlimited minutes", "Unlimited everything", "Custom AI models", "SLA guarantee", "Dedicated support", "API access"],
    cta: "Contact Sales",
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <div>
      <header style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "1rem 2rem", borderBottom: "1px solid var(--color-border)",
        background: "var(--color-bg-secondary)",
      }}>
        <Link to="/" style={{ fontWeight: 700, fontSize: "1.25rem", color: "var(--color-text)", textDecoration: "none" }}>DoAide Voice</Link>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <Link to="/login" className="btn btn-secondary">Login</Link>
          <Link to="/register" className="btn btn-primary">Get Started</Link>
        </div>
      </header>

      <section style={{ textAlign: "center", padding: "4rem 1.5rem 2rem" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>Simple, transparent pricing</h1>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "1.125rem" }}>Start free, scale as you grow.</p>
      </section>

      <section style={{ display: "flex", justifyContent: "center", gap: "1.5rem", padding: "1rem 1.5rem 4rem", flexWrap: "wrap", maxWidth: "1100px", margin: "0 auto" }}>
        {PLANS.map(plan => (
          <div key={plan.name} className="card" style={{
            width: "320px", textAlign: "center",
            border: plan.highlight ? "2px solid var(--color-primary)" : undefined,
            position: "relative",
          }}>
            {plan.highlight && (
              <div style={{ position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)", background: "var(--color-primary)", color: "#fff", padding: "0.125rem 0.75rem", borderRadius: "9999px", fontSize: "0.75rem", fontWeight: 600 }}>
                Most Popular
              </div>
            )}
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>{plan.name}</h3>
            <div style={{ fontSize: "2.5rem", fontWeight: 700, color: "var(--color-primary)" }}>
              {plan.price}
              {plan.period && <span style={{ fontSize: "1rem", color: "var(--color-text-secondary)", fontWeight: 400 }}>{plan.period}</span>}
            </div>
            <ul style={{ listStyle: "none", margin: "1.5rem 0", textAlign: "left" }}>
              {plan.features.map(f => (
                <li key={f} style={{ padding: "0.375rem 0", fontSize: "0.875rem", borderBottom: "1px solid var(--color-border-light)" }}>
                  ✓ {f}
                </li>
              ))}
            </ul>
            <Link to="/register" className={`btn ${plan.highlight ? "btn-primary" : "btn-secondary"}`} style={{ width: "100%", justifyContent: "center" }}>
              {plan.cta}
            </Link>
          </div>
        ))}
      </section>

      <footer style={{ textAlign: "center", padding: "2rem", color: "var(--color-text-tertiary)", fontSize: "0.8rem", borderTop: "1px solid var(--color-border)" }}>
        &copy; {new Date().getFullYear()} DoAide Voice by Apprend Technologies
      </footer>
    </div>
  );
}
