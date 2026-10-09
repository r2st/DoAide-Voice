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

const INDUSTRIES = [
  "Healthcare", "Real Estate", "E-commerce", "SaaS", "Restaurant",
  "Legal", "Education", "Finance", "Insurance", "Retail", "Other",
];

const SCENARIOS = [
  "Inbound Support", "Outbound Sales", "Appointment Booking",
  "Lead Qualification", "Follow-up Call", "Customer Survey",
];

const TONES = ["Professional", "Friendly", "Casual"];

export default function ScriptWriter() {
  usePageTitle("Free AI Voice Script Generator — DoAide Voice");
  const [industry, setIndustry] = useState("Healthcare");
  const [scenario, setScenario] = useState("Inbound Support");
  const [tone, setTone] = useState("Professional");
  const [companyName, setCompanyName] = useState("");
  const [script, setScript] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  async function handleGenerate() {
    setLoading(true);
    setError(null);
    setScript("");
    try {
      const res = await fetch("/api/v1/tools/generate-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          industry: industry.toLowerCase(),
          scenario: scenario.toLowerCase().replace(/ /g, "-"),
          tone: tone.toLowerCase(),
          company_name: companyName || "Your Company",
        }),
      });
      if (!res.ok) throw new Error("Failed to generate script");
      const data = await res.json();
      setScript(data.script);
    } catch {
      setError("Could not generate script. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(script).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
            <h1>Free AI Voice Script Generator</h1>
            <p>Generate professional voice agent scripts for any industry and scenario — powered by AI, no login required.</p>
          </div>

          <div style={{ display: "grid", gap: "1.5rem", maxWidth: 800, margin: "0 auto", gridTemplateColumns: "1fr 1fr" }}>
            <div className="card" style={{ padding: "1.5rem", gridColumn: "1 / -1" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div className="form-group">
                  <label htmlFor="sw-industry">Industry</label>
                  <select
                    id="sw-industry"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    style={{ width: "100%", background: "var(--glass-input)", border: "1px solid var(--glass-input-border)", borderRadius: "var(--radius)", padding: "0.5rem", color: "var(--ink)" }}
                  >
                    {INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="sw-scenario">Scenario</label>
                  <select
                    id="sw-scenario"
                    value={scenario}
                    onChange={(e) => setScenario(e.target.value)}
                    style={{ width: "100%", background: "var(--glass-input)", border: "1px solid var(--glass-input-border)", borderRadius: "var(--radius)", padding: "0.5rem", color: "var(--ink)" }}
                  >
                    {SCENARIOS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="sw-company">Company Name (optional)</label>
                <input
                  id="sw-company"
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g., Acme Healthcare"
                  style={{ width: "100%", background: "var(--glass-input)", border: "1px solid var(--glass-input-border)", borderRadius: "var(--radius)", padding: "0.5rem", color: "var(--ink)" }}
                />
              </div>

              <div className="form-group">
                <label>Tone</label>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  {TONES.map((t) => (
                    <label key={t} style={{ display: "flex", alignItems: "center", gap: "0.35rem", cursor: "pointer", color: "var(--ink)" }}>
                      <input
                        type="radio"
                        name="tone"
                        value={t}
                        checked={tone === t}
                        onChange={(e) => setTone(e.target.value)}
                        style={{ accentColor: "var(--brand)" }}
                      />
                      {t}
                    </label>
                  ))}
                </div>
              </div>

              <button
                className="btn btn-primary btn-block"
                onClick={handleGenerate}
                disabled={loading}
                style={{ marginTop: "0.5rem" }}
              >
                {loading ? "Generating..." : "Generate Script"}
              </button>

              {error && <p style={{ color: "var(--bad)", marginTop: "0.75rem" }}>{error}</p>}
            </div>

            {(script || loading) && (
              <div className="card" style={{ padding: "1.5rem", gridColumn: "1 / -1" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                  <h2 style={{ fontSize: "1.1rem", margin: 0 }}>Generated Script</h2>
                  {script && (
                    <button className="btn btn-primary" onClick={handleCopy} style={{ fontSize: "0.85rem", padding: "0.3rem 0.75rem" }}>
                      {copied ? "Copied!" : "Copy Script"}
                    </button>
                  )}
                </div>
                {loading ? (
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--brand)" }}>
                    <span className="demo-typing"><span /><span /><span /></span>
                    <span>AI is writing your script...</span>
                  </div>
                ) : (
                  <pre style={{
                    whiteSpace: "pre-wrap",
                    wordWrap: "break-word",
                    background: "var(--glass-input)",
                    border: "1px solid var(--glass-input-border)",
                    borderRadius: "var(--radius)",
                    padding: "1rem",
                    color: "var(--ink)",
                    fontSize: "0.9rem",
                    lineHeight: 1.6,
                    maxHeight: 500,
                    overflow: "auto",
                  }}>
                    {script}
                  </pre>
                )}
              </div>
            )}
          </div>

          <div className="demo-cta-section">
            <h2>Deploy This Script as a Live AI Agent</h2>
            <p>Turn your generated script into a voice agent that answers calls 24/7 — no coding required.</p>
            <Link to="/register" className="btn btn-primary" style={{ padding: "0.7rem 2rem" }}>Start Free</Link>
          </div>

          <div className="viral-share-section">
            <p>Share this tool</p>
            <ShareButtons url="https://voice.doaide.com/script-writer" text="Free AI voice script generator — create scripts for any industry:" />
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
