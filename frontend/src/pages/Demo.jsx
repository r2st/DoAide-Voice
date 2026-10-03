import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ShareButtons from "../components/ShareButtons";
import { usePageTitle } from "../hooks/usePageTitle";

const DEMO_SCENARIOS = [
  { id: "support", label: "Customer Support", greeting: "Hi! Thanks for calling Acme Support. How can I help you today?", responses: { default: "I understand your concern. Let me look into that for you right away.", "refund": "I can help you with a refund. Could you provide your order number?", "hours": "Our office hours are Monday through Friday, 9 AM to 6 PM Eastern.", "speak": "Let me transfer you to a specialist who can better assist you.", "product": "I'd be happy to help with product information. Which product are you asking about?", "shipping": "Standard shipping takes 3-5 business days. Express shipping is 1-2 business days." } },
  { id: "sales", label: "Sales Outreach", greeting: "Hi there! I'm calling from Acme Solutions. Do you have a moment to chat about how we can help your business?", responses: { default: "That's a great question. Our platform helps businesses save up to 40% on customer service costs.", "price": "Our plans start at $49 per month with a free trial. No commitment required.", "demo": "I'd love to set up a personalized demo for you. What day works best?", "competitor": "Great question — what sets us apart is our AI-powered sentiment analysis and real-time analytics.", "no": "I completely understand. Can I send you some information to review at your convenience?" } },
  { id: "appointment", label: "Appointment Booking", greeting: "Hello! Welcome to Acme Medical. I can help you schedule an appointment. What type of visit do you need?", responses: { default: "Let me check our availability for you. Do you have a preferred day of the week?", "cancel": "I can help you cancel or reschedule. Could you tell me your appointment date?", "doctor": "We have several doctors available. Do you have a preference for a specific doctor?", "insurance": "We accept most major insurance plans. Could you tell me your provider?", "urgent": "For urgent matters, I'd recommend our same-day appointment slots. Let me check what's open." } },
];

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

export default function Demo() {
  usePageTitle("Try AI Voice Demo — DoAide Voice");
  const [scenario, setScenario] = useState(DEMO_SCENARIOS[0]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    setMessages([{ role: "agent", text: scenario.greeting }]);
  }, [scenario]);

  useEffect(() => {
    if (chatRef.current?.scrollTo) chatRef.current.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages]);

  function getResponse(userText) {
    const lower = userText.toLowerCase();
    const responses = scenario.responses;
    for (const [key, val] of Object.entries(responses)) {
      if (key !== "default" && lower.includes(key)) return val;
    }
    return responses.default;
  }

  function sendMessage(text) {
    if (!text.trim()) return;
    const userMsg = text.trim();
    setMessages((m) => [...m, { role: "user", text: userMsg }]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { role: "agent", text: getResponse(userMsg) }]);
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  }

  function toggleListening() {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      sendMessage("(Speech recognition not supported in this browser)");
      return;
    }
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      sendMessage(transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
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
            <h1>Try AI Voice Agent Demo</h1>
            <p>Experience how an AI voice agent handles real conversations. Choose a scenario and start talking.</p>
          </div>

          <div className="demo-scenarios">
            {DEMO_SCENARIOS.map((s) => (
              <button
                key={s.id}
                className={`demo-scenario-btn ${scenario.id === s.id ? "is-active" : ""}`}
                onClick={() => setScenario(s)}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="demo-chat-container">
            <div className="demo-chat-header">
              <RobotFace size={24} color="#F0B429" />
              <span>AI Agent — {scenario.label}</span>
              <span className="badge badge-success" style={{ marginLeft: "auto" }}>Live</span>
            </div>
            <div className="demo-chat-messages" ref={chatRef}>
              {messages.map((m, i) => (
                <div key={i} className={`demo-msg demo-msg-${m.role}`}>
                  <span className="demo-msg-label">{m.role === "agent" ? "AI Agent" : "You"}</span>
                  <p>{m.text}</p>
                </div>
              ))}
              {isTyping && (
                <div className="demo-msg demo-msg-agent">
                  <span className="demo-msg-label">AI Agent</span>
                  <p className="demo-typing">
                    <span /><span /><span />
                  </p>
                </div>
              )}
            </div>
            <div className="demo-chat-input">
              <input
                type="text"
                placeholder="Type a message or click the mic..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              />
              <button className={`demo-mic-btn ${isListening ? "is-listening" : ""}`} onClick={toggleListening} aria-label={isListening ? "Stop listening" : "Start voice input"}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
                  <path d="M19 10v2a7 7 0 01-14 0v-2" />
                  <line x1="12" y1="19" x2="12" y2="23" />
                  <line x1="8" y1="23" x2="16" y2="23" />
                </svg>
              </button>
              <button className="btn btn-primary" onClick={() => sendMessage(input)} disabled={!input.trim()}>Send</button>
            </div>
          </div>

          <div className="demo-cta-section">
            <h2>Ready to Build Your Own AI Agent?</h2>
            <p>Create custom voice agents for your business in minutes — no coding required.</p>
            <Link to="/register" className="btn btn-primary" style={{ padding: "0.7rem 2rem" }}>Start Free</Link>
          </div>

          <div className="viral-share-section">
            <p>Share this demo with your team</p>
            <ShareButtons url="https://voice.doaide.com/demo" text="Try this AI voice agent demo — it actually talks back!" />
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
