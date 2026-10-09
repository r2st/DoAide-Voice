import { useRef, useState } from "react";
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

const LANGUAGES = [
  { code: "en-US", label: "English (US)" },
  { code: "en-GB", label: "English (UK)" },
  { code: "es-ES", label: "Spanish" },
  { code: "fr-FR", label: "French" },
  { code: "hi-IN", label: "Hindi" },
  { code: "de-DE", label: "German" },
];

export default function SpeechToText() {
  usePageTitle("Free Speech-to-Text Demo — DoAide Voice");
  const [transcript, setTranscript] = useState("");
  const [interim, setInterim] = useState("");
  const [listening, setListening] = useState(false);
  const [lang, setLang] = useState("en-US");
  const [copied, setCopied] = useState(false);
  const [supported] = useState(() => "SpeechRecognition" in window || "webkitSpeechRecognition" in window);
  const recognitionRef = useRef(null);

  function startListening() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = lang;

    recognition.onresult = (event) => {
      let final = "";
      let inter = "";
      for (let i = 0; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          final += result[0].transcript + " ";
        } else {
          inter += result[0].transcript;
        }
      }
      if (final) setTranscript((prev) => prev + final);
      setInterim(inter);
    };

    recognition.onerror = () => {
      setListening(false);
      setInterim("");
    };
    recognition.onend = () => {
      setListening(false);
      setInterim("");
    };

    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  }

  function stopListening() {
    recognitionRef.current?.stop();
    setListening(false);
    setInterim("");
  }

  function handleCopy() {
    navigator.clipboard.writeText(transcript.trim()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const wordCount = transcript.trim() ? transcript.trim().split(/\s+/).length : 0;

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
            <h1>Free Speech-to-Text Demo</h1>
            <p>Speak into your microphone and see your words transcribed in real time. Supports multiple languages — no login required.</p>
          </div>

          {!supported ? (
            <div className="card" style={{ padding: "2rem", textAlign: "center" }}>
              <p style={{ color: "var(--bad)" }}>Your browser does not support the Web Speech API. Try Chrome or Edge for speech recognition.</p>
            </div>
          ) : (
            <div style={{ maxWidth: 700, margin: "0 auto" }}>
              <div className="card" style={{ padding: "1.5rem" }}>
                <div style={{ display: "flex", gap: "1rem", alignItems: "end", marginBottom: "1.5rem", flexWrap: "wrap" }}>
                  <div className="form-group" style={{ flex: 1, minWidth: 180, marginBottom: 0 }}>
                    <label htmlFor="stt-lang">Language</label>
                    <select
                      id="stt-lang"
                      value={lang}
                      onChange={(e) => setLang(e.target.value)}
                      disabled={listening}
                      style={{ width: "100%", background: "var(--glass-input)", border: "1px solid var(--glass-input-border)", borderRadius: "var(--radius)", padding: "0.5rem", color: "var(--ink)" }}
                    >
                      {LANGUAGES.map((l) => (
                        <option key={l.code} value={l.code}>{l.label}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    className={`btn ${listening ? "btn-ghost" : "btn-primary"}`}
                    onClick={listening ? stopListening : startListening}
                    style={{ padding: "0.5rem 1.5rem", borderColor: listening ? "var(--bad)" : undefined, color: listening ? "var(--bad)" : undefined }}
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "0.4rem", verticalAlign: "middle" }}>
                      <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
                      <path d="M19 10v2a7 7 0 01-14 0v-2" />
                      <line x1="12" y1="19" x2="12" y2="23" />
                      <line x1="8" y1="23" x2="16" y2="23" />
                    </svg>
                    {listening ? "Stop" : "Start Listening"}
                  </button>
                </div>

                {listening && (
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem", color: "var(--bad)" }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--bad)", animation: "pulse 1s infinite" }} />
                    Listening...
                  </div>
                )}

                <div
                  style={{
                    minHeight: 150,
                    background: "var(--glass-input)",
                    border: "1px solid var(--glass-input-border)",
                    borderRadius: "var(--radius)",
                    padding: "1rem",
                    fontSize: "1rem",
                    lineHeight: 1.7,
                    color: "var(--ink)",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {transcript}
                  {interim && <span style={{ color: "var(--ink-soft)" }}>{interim}</span>}
                  {!transcript && !interim && (
                    <span style={{ color: "var(--glass-input-placeholder)" }}>
                      {listening ? "Start speaking..." : "Click \"Start Listening\" and speak into your microphone."}
                    </span>
                  )}
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.75rem", flexWrap: "wrap", gap: "0.5rem" }}>
                  <span style={{ color: "var(--ink-soft)", fontSize: "0.85rem" }}>{wordCount} words</span>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button className="btn btn-ghost" onClick={() => { setTranscript(""); setInterim(""); }} disabled={!transcript} style={{ fontSize: "0.85rem", padding: "0.3rem 0.75rem" }}>
                      Clear
                    </button>
                    <button className="btn btn-primary" onClick={handleCopy} disabled={!transcript.trim()} style={{ fontSize: "0.85rem", padding: "0.3rem 0.75rem" }}>
                      {copied ? "Copied!" : "Copy Text"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="demo-cta-section">
            <h2>Go Beyond Transcription</h2>
            <p>Build AI voice agents that understand, respond, and act — powered by your knowledge base.</p>
            <Link to="/register" className="btn btn-primary" style={{ padding: "0.7rem 2rem" }}>Start Free</Link>
          </div>

          <div className="viral-share-section">
            <p>Share this tool</p>
            <ShareButtons url="https://voice.doaide.com/stt" text="Free speech-to-text tool — real-time transcription in your browser:" />
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
