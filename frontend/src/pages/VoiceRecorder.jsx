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

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function VoiceRecorder() {
  usePageTitle("Free Voice Recorder — DoAide Voice");
  const [recording, setRecording] = useState(false);
  const [recordings, setRecordings] = useState([]);
  const [elapsed, setElapsed] = useState(0);
  const [error, setError] = useState(null);
  const mediaRef = useRef(null);
  const timerRef = useRef(null);
  const chunksRef = useRef([]);

  async function startRecording() {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || "audio/webm" });
        const url = URL.createObjectURL(blob);
        setRecordings((prev) => [
          { id: Date.now(), url, blob, duration: elapsed, name: `recording-${prev.length + 1}` },
          ...prev,
        ]);
        stream.getTracks().forEach((t) => t.stop());
      };

      mediaRef.current = recorder;
      recorder.start();
      setRecording(true);
      setElapsed(0);
      timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
    } catch {
      setError("Microphone access denied. Please allow microphone access in your browser settings.");
    }
  }

  function stopRecording() {
    if (mediaRef.current && mediaRef.current.state === "recording") {
      mediaRef.current.stop();
    }
    clearInterval(timerRef.current);
    setRecording(false);
  }

  function downloadRecording(rec) {
    const a = document.createElement("a");
    a.href = rec.url;
    a.download = `${rec.name}.webm`;
    a.click();
  }

  function deleteRecording(id) {
    setRecordings((prev) => {
      const rec = prev.find((r) => r.id === id);
      if (rec) URL.revokeObjectURL(rec.url);
      return prev.filter((r) => r.id !== id);
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
            <h1>Free Voice Recorder</h1>
            <p>Record audio directly in your browser. Play back, download, and manage your recordings — no login required.</p>
          </div>

          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <div className="card" style={{ padding: "2rem", textAlign: "center" }}>
              {error && <p style={{ color: "var(--bad)", marginBottom: "1rem" }}>{error}</p>}

              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ fontSize: "2.5rem", fontWeight: 700, fontVariantNumeric: "tabular-nums", color: recording ? "var(--bad)" : "var(--ink)" }}>
                  {formatTime(elapsed)}
                </div>
                {recording && (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", marginTop: "0.5rem", color: "var(--bad)" }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--bad)", animation: "pulse 1s infinite" }} />
                    Recording...
                  </div>
                )}
              </div>

              <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
                {!recording ? (
                  <button className="btn btn-primary" onClick={startRecording} style={{ padding: "0.75rem 2rem" }}>
                    Start Recording
                  </button>
                ) : (
                  <button className="btn btn-ghost" onClick={stopRecording} style={{ padding: "0.75rem 2rem", borderColor: "var(--bad)", color: "var(--bad)" }}>
                    Stop Recording
                  </button>
                )}
              </div>
            </div>

            {recordings.length > 0 && (
              <div style={{ marginTop: "1.5rem" }}>
                <h2 style={{ fontSize: "1.1rem", marginBottom: "0.75rem" }}>Recordings ({recordings.length})</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {recordings.map((rec) => (
                    <div key={rec.id} className="card" style={{ padding: "1rem" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                        <strong>{rec.name}</strong>
                        <span style={{ color: "var(--ink-soft)", fontSize: "0.85rem" }}>{formatTime(rec.duration)}</span>
                      </div>
                      <audio controls src={rec.url} style={{ width: "100%", marginBottom: "0.5rem" }} />
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button className="btn btn-primary" onClick={() => downloadRecording(rec)} style={{ fontSize: "0.85rem", padding: "0.3rem 0.75rem" }}>
                          Download
                        </button>
                        <button className="btn btn-ghost" onClick={() => deleteRecording(rec.id)} style={{ fontSize: "0.85rem", padding: "0.3rem 0.75rem" }}>
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="demo-cta-section">
            <h2>Turn Recordings into AI Voice Agents</h2>
            <p>Record your best scripts, then let AI handle the calls. Build voice agents in minutes.</p>
            <Link to="/register" className="btn btn-primary" style={{ padding: "0.7rem 2rem" }}>Start Free</Link>
          </div>

          <div className="viral-share-section">
            <p>Share this tool</p>
            <ShareButtons url="https://voice.doaide.com/recorder" text="Free voice recorder — record audio right in your browser:" />
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
