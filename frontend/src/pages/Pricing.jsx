import { Link } from "react-router-dom";
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
  usePageTitle("Pricing — DoAide Voice");

  return (
    <div className="landing-root">
      <header className="landing-header landing-visible">
        <a href="https://doaide.com" className="landing-brand">
          <span className="landing-brand-text">
            <span className="landing-brand-doaide">DoAide</span>
            <span className="landing-brand-sep">|</span>
            <span className="landing-brand-product">Voice</span>
          </span>
        </a>
        <div style={{ marginLeft: "auto", display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <Link to="/login" className="btn btn-ghost">Sign in</Link>
          <Link to="/register" className="btn btn-primary">Get Started</Link>
        </div>
      </header>

      <main>
        <div className="pricing-page">
          <div className="pricing-header">
            <h1>Simple, Transparent Pricing</h1>
            <p>Start free, scale as you grow. No hidden fees.</p>
          </div>

          <div className="pricing-grid">
            {PLANS.map((plan) => (
              <div key={plan.name} className={`pricing-card ${plan.highlight ? "pricing-card-highlight" : ""}`}>
                {plan.highlight && <div className="pricing-badge">Most Popular</div>}
                <h2>{plan.name}</h2>
                <div className="pricing-price">
                  {plan.price}
                  {plan.period && <span style={{ fontSize: "0.9rem", color: "var(--ink-soft)", fontWeight: 400, fontFamily: "inherit" }}> {plan.period}</span>}
                </div>
                <ul className="pricing-features">
                  {plan.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <Link to="/register" className={`btn ${plan.highlight ? "btn-primary" : "btn-ghost"} btn-block`} style={{ textAlign: "center" }}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="landing-footer">
        <div className="landing-footer-products">
          {DOAIDE_PRODUCTS.map((p) => (
            <a key={p.name} href={p.url} className="landing-footer-link">{p.name}</a>
          ))}
        </div>
        <div className="landing-footer-bottom">
          <a href="https://doaide.com" className="landing-footer-home">
            <span style={{ color: "#0D9488", fontWeight: 700 }}>DoAide</span>
          </a>
          <span className="landing-footer-badge">A DoAide Product</span>
          <span className="landing-footer-copy">&copy; 2026 DoAide</span>
        </div>
      </footer>
    </div>
  );
}
