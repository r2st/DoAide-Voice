import { useEffect, useRef, useState } from "react";
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

const SAMPLE_TEXT = "Hello! Welcome to DoAide Voice. I'm your AI assistant, ready to help you with any questions about our platform. How can I assist you today?";

export default function TextToSpeech() {
  usePageTitle("Free Text-to-Speech Preview — DoAide Voice");
  const [text, setText] = useState(SAMPLE_TEXT);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState("");
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(true);
  const utterRef = useRef(null);

  useEffect(() => {
    if (!("speechSynthesis" in window)) {
      setSupported(false);
      return;
    }
    function loadVoices() {
      const v = speechSynthesis.getVoices();
      if (v.length) {
        setVoices(v);
        const english = v.find((voice) => voice.lang.startsWith("en"));
        setSelectedVoice((english || v[0]).name);
      }
    }
    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
    return () => window.speechSynthesis?.removeEventListener("voiceschanged", loadVoices);
  }, []);

  function handleSpeak() {
    if (!text.trim()) return;
    speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    const voice = voices.find((v) => v.name === selectedVoice);
    if (voice) utter.voice = voice;
    utter.rate = rate;
    utter.pitch = pitch;
    utter.onstart = () => setSpeaking(true);
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);
    utterRef.current = utter;
    speechSynthesis.speak(utter);
  }

  function handleStop() {
    speechSynthesis.cancel();
    setSpeaking(false);
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
            <h1>Free Text-to-Speech Preview</h1>
            <p>Type or paste any text and hear it spoken aloud. Choose voices, adjust speed and pitch — no login required.</p>
          </div>

          {!supported ? (
            <div className="card" style={{ padding: "2rem", textAlign: "center" }}>
              <p style={{ color: "var(--bad)" }}>Your browser does not support the Web Speech API. Try Chrome, Edge, or Safari.</p>
            </div>
          ) : (
            <div style={{ display: "grid", gap: "1.5rem", maxWidth: 700, margin: "0 auto" }}>
              <div className="card" style={{ padding: "1.5rem" }}>
                <div className="form-group">
                  <label htmlFor="tts-text">Text to speak</label>
                  <textarea
                    id="tts-text"
                    rows={5}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    style={{ width: "100%", resize: "vertical", background: "var(--glass-input)", border: "1px solid var(--glass-input-border)", borderRadius: "var(--radius)", padding: "0.75rem", color: "var(--ink)", fontFamily: "inherit", fontSize: "0.95rem" }}
                    placeholder="Enter text to convert to speech..."
                  />
                  <span className="field-hint">{text.length} characters</span>
                </div>

                <div className="form-group">
                  <label htmlFor="tts-voice">Voice</label>
                  <select
                    id="tts-voice"
                    value={selectedVoice}
                    onChange={(e) => setSelectedVoice(e.target.value)}
                    style={{ width: "100%", background: "var(--glass-input)", border: "1px solid var(--glass-input-border)", borderRadius: "var(--radius)", padding: "0.5rem", color: "var(--ink)" }}
                  >
                    {voices.map((v) => (
                      <option key={v.name} value={v.name}>{v.name} ({v.lang})</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div className="form-group">
                    <label htmlFor="tts-rate">Speed: {rate}x</label>
                    <input id="tts-rate" type="range" min="0.5" max="2" step="0.1" value={rate} onChange={(e) => setRate(parseFloat(e.target.value))} style={{ width: "100%", background: "none" }} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="tts-pitch">Pitch: {pitch}</label>
                    <input id="tts-pitch" type="range" min="0.5" max="2" step="0.1" value={pitch} onChange={(e) => setPitch(parseFloat(e.target.value))} style={{ width: "100%", background: "none" }} />
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                  <button className="btn btn-primary" onClick={handleSpeak} disabled={!text.trim() || speaking} style={{ flex: 1 }}>
                    {speaking ? "Speaking..." : "Speak"}
                  </button>
                  <button className="btn btn-ghost" onClick={handleStop} disabled={!speaking}>
                    Stop
                  </button>
                </div>

                {speaking && (
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "1rem", color: "var(--brand)" }}>
                    <span className="demo-typing"><span /><span /><span /></span>
                    <span>Speaking...</span>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="demo-cta-section">
            <h2>Build AI Voice Agents for Your Business</h2>
            <p>Go beyond text-to-speech — create intelligent agents that hold real conversations on the phone.</p>
            <Link to="/register" className="btn btn-primary" style={{ padding: "0.7rem 2rem" }}>Start Free</Link>
          </div>

          <div className="viral-share-section">
            <p>Share this tool</p>
            <ShareButtons url="https://voice.doaide.com/tts" text="Free text-to-speech tool — try different voices and speeds:" />
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
