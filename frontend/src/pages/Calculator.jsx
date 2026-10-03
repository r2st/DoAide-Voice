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

const DEFAULTS = { callsPerMonth: 2000, avgHandleMinutes: 5, agentHourlyRate: 20, automationRate: 70 };

export default function Calculator() {
  usePageTitle("AI Voice Agent ROI Calculator — DoAide Voice");
  const [values, setValues] = useState(DEFAULTS);
  const [calculated, setCalculated] = useState(false);

  function set(key, raw) {
    const val = Math.max(0, Number(raw) || 0);
    setValues((v) => ({ ...v, [key]: val }));
    setCalculated(false);
  }

  const totalMinutes = values.callsPerMonth * values.avgHandleMinutes;
  const totalHours = totalMinutes / 60;
  const currentMonthlyCost = totalHours * values.agentHourlyRate;
  const automatedCalls = Math.round(values.callsPerMonth * (values.automationRate / 100));
  const automatedHours = (automatedCalls * values.avgHandleMinutes) / 60;
  const aiCostPerMinute = 0.08;
  const aiMonthlyCost = automatedCalls * values.avgHandleMinutes * aiCostPerMinute;
  const remainingHumanCost = (totalHours - automatedHours) * values.agentHourlyRate;
  const newTotalCost = aiMonthlyCost + remainingHumanCost;
  const monthlySavings = currentMonthlyCost - newTotalCost;
  const annualSavings = monthlySavings * 12;
  const savingsPercent = currentMonthlyCost > 0 ? Math.round((monthlySavings / currentMonthlyCost) * 100) : 0;

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
            <h1>AI Voice Agent ROI Calculator</h1>
            <p>See how much your business could save by automating customer calls with AI voice agents.</p>
          </div>

          <div className="calc-grid">
            <div className="calc-inputs">
              <h2>Your Current Setup</h2>
              <div className="form-group">
                <label htmlFor="calls">Calls per month</label>
                <input id="calls" type="number" value={values.callsPerMonth} onChange={(e) => set("callsPerMonth", e.target.value)} min="0" />
              </div>
              <div className="form-group">
                <label htmlFor="handle">Average handle time (minutes)</label>
                <input id="handle" type="number" value={values.avgHandleMinutes} onChange={(e) => set("avgHandleMinutes", e.target.value)} min="0" />
              </div>
              <div className="form-group">
                <label htmlFor="rate">Agent hourly rate ($)</label>
                <input id="rate" type="number" value={values.agentHourlyRate} onChange={(e) => set("agentHourlyRate", e.target.value)} min="0" />
              </div>
              <div className="form-group">
                <label htmlFor="automation">AI automation rate (%)</label>
                <input id="automation" type="range" min="10" max="95" value={values.automationRate} onChange={(e) => set("automationRate", e.target.value)} style={{ background: "none" }} />
                <span className="field-hint">{values.automationRate}% of calls handled by AI</span>
              </div>
              <button className="btn btn-primary btn-block" onClick={() => setCalculated(true)} style={{ marginTop: "0.5rem" }}>Calculate Savings</button>
            </div>

            <div className={`calc-results ${calculated ? "calc-results-visible" : ""}`}>
              <h2>Your Estimated Savings</h2>
              <div className="calc-stat calc-stat-hero">
                <span className="calc-stat-label">Annual Savings</span>
                <span className="calc-stat-value">${annualSavings.toLocaleString()}</span>
              </div>
              <div className="calc-stats-row">
                <div className="calc-stat">
                  <span className="calc-stat-label">Monthly Savings</span>
                  <span className="calc-stat-value">${Math.round(monthlySavings).toLocaleString()}</span>
                </div>
                <div className="calc-stat">
                  <span className="calc-stat-label">Cost Reduction</span>
                  <span className="calc-stat-value">{savingsPercent}%</span>
                </div>
              </div>
              <div className="calc-breakdown">
                <h3>Breakdown</h3>
                <div className="calc-breakdown-row">
                  <span>Current monthly cost</span>
                  <span>${Math.round(currentMonthlyCost).toLocaleString()}</span>
                </div>
                <div className="calc-breakdown-row">
                  <span>AI agent cost ({automatedCalls.toLocaleString()} calls)</span>
                  <span>${Math.round(aiMonthlyCost).toLocaleString()}</span>
                </div>
                <div className="calc-breakdown-row">
                  <span>Remaining human cost</span>
                  <span>${Math.round(remainingHumanCost).toLocaleString()}</span>
                </div>
                <div className="calc-breakdown-row calc-breakdown-total">
                  <span>New monthly cost</span>
                  <span>${Math.round(newTotalCost).toLocaleString()}</span>
                </div>
              </div>
              <Link to="/register" className="btn btn-primary btn-block" style={{ marginTop: "1rem", textAlign: "center" }}>Start Saving — Sign Up Free</Link>
            </div>
          </div>

          <div className="viral-share-section">
            <p>Share this calculator with your team</p>
            <ShareButtons url="https://voice.doaide.com/calculator" text="See how much AI voice agents could save your business:" />
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
