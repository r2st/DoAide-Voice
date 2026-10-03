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

const POSITIONS = [
  { id: "bottom-right", label: "Bottom Right" },
  { id: "bottom-left", label: "Bottom Left" },
];

const THEMES = [
  { id: "dark", label: "Dark" },
  { id: "light", label: "Light" },
  { id: "brand", label: "Brand Gold" },
];

export default function Embed() {
  usePageTitle("Embed AI Voice Widget — DoAide Voice");
  const [config, setConfig] = useState({
    position: "bottom-right",
    theme: "dark",
    buttonText: "Talk to AI",
    primaryColor: "#F0B429",
  });
  const [copied, setCopied] = useState(false);

  const embedCode = `<!-- DoAide Voice Widget -->
<script>
(function(){
  var d=document,s=d.createElement('script');
  s.src='https://voice.doaide.com/widget.js';
  s.setAttribute('data-position','${config.position}');
  s.setAttribute('data-theme','${config.theme}');
  s.setAttribute('data-button-text','${config.buttonText}');
  s.setAttribute('data-color','${config.primaryColor}');
  d.head.appendChild(s);
})();
</script>`;

  function handleCopy() {
    navigator.clipboard.writeText(embedCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const bgColor = config.theme === "light" ? "#fff" : config.theme === "brand" ? "#1a1a1d" : "#0a0a0b";
  const textColor = config.theme === "light" ? "#1a1a1d" : "#e5e7eb";

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
            <h1>Embed AI Voice Widget</h1>
            <p>Add a "Talk to AI" button to your website. Visitors can speak with your AI agent directly from any page.</p>
          </div>

          <div className="embed-grid">
            <div className="embed-config">
              <h2>Configure Widget</h2>
              <div className="form-group">
                <label htmlFor="btn-text">Button text</label>
                <input id="btn-text" type="text" value={config.buttonText} onChange={(e) => setConfig((c) => ({ ...c, buttonText: e.target.value }))} maxLength={30} />
              </div>
              <div className="form-group">
                <label htmlFor="color">Primary color</label>
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                  <input id="color" type="color" value={config.primaryColor} onChange={(e) => setConfig((c) => ({ ...c, primaryColor: e.target.value }))} style={{ width: 48, height: 36, padding: 2, cursor: "pointer" }} />
                  <span className="field-hint">{config.primaryColor}</span>
                </div>
              </div>
              <div className="form-group">
                <label>Position</label>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  {POSITIONS.map((p) => (
                    <button key={p.id} className={`btn ${config.position === p.id ? "btn-primary" : "btn-ghost"}`} onClick={() => setConfig((c) => ({ ...c, position: p.id }))} style={{ flex: 1 }}>
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label>Theme</label>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  {THEMES.map((t) => (
                    <button key={t.id} className={`btn ${config.theme === t.id ? "btn-primary" : "btn-ghost"}`} onClick={() => setConfig((c) => ({ ...c, theme: t.id }))} style={{ flex: 1 }}>
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="embed-preview-container">
              <h2>Preview</h2>
              <div className="embed-preview" style={{ background: bgColor, color: textColor }}>
                <div className="embed-preview-content">
                  <p style={{ opacity: 0.4, fontSize: "0.85rem" }}>Your website content here...</p>
                </div>
                <div className={`embed-widget-preview embed-${config.position}`}>
                  <div className="embed-widget-btn" style={{ background: config.primaryColor, color: config.theme === "light" ? "#fff" : "#0a0a0b" }}>
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
                      <path d="M19 10v2a7 7 0 01-14 0v-2" />
                    </svg>
                    {config.buttonText}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="embed-code-section">
            <h2>Embed Code</h2>
            <p className="field-hint">Copy and paste this code before the closing &lt;/body&gt; tag of your website.</p>
            <div className="embed-code-block">
              <pre>{embedCode}</pre>
              <button className="btn btn-primary" onClick={handleCopy}>{copied ? "Copied!" : "Copy Code"}</button>
            </div>
          </div>

          <div className="viral-share-section">
            <p>Share with your developer</p>
            <ShareButtons url="https://voice.doaide.com/embed" text="Add an AI voice agent widget to your website in 2 minutes:" />
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
