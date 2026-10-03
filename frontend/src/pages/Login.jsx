import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { usePageTitle } from "../hooks/usePageTitle";

function RobotFace({ size = 32, color }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 320" width={size} height={size} aria-hidden="true">
      <defs><linearGradient id="hg-auth" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} /><stop offset="100%" stopColor="#D4A017" /></linearGradient></defs>
      <line x1="200" y1="45" x2="200" y2="20" stroke={color} strokeWidth="6" strokeLinecap="round" />
      <circle cx="200" cy="14" r="10" fill={color} /><circle cx="200" cy="14" r="5" fill="#F7CC5F" />
      <rect x="110" y="50" width="180" height="140" rx="35" fill="url(#hg-auth)" />
      <ellipse cx="165" cy="115" rx="18" ry="20" fill="#0A0A0B" /><ellipse cx="235" cy="115" rx="18" ry="20" fill="#0A0A0B" />
      <circle cx="170" cy="113" r="8" fill="#F7CC5F" /><circle cx="240" cy="113" r="8" fill="#F7CC5F" />
      <path d="M170 155Q200 178 230 155" stroke="#0A0A0B" strokeWidth="4" fill="none" strokeLinecap="round" />
      <rect x="92" y="95" width="22" height="45" rx="8" fill="#D4A017" /><rect x="286" y="95" width="22" height="45" rx="8" fill="#D4A017" />
    </svg>
  );
}

export default function Login() {
  usePageTitle("Sign In — DoAide Voice");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <RobotFace size={72} color="#F0B429" />
        <h1 className="auth-title">
          DoAide <span className="auth-title-accent">Voice</span>
        </h1>
        <p className="auth-subtitle">Sign in to your account</p>

        <div className="auth-card">
          {error && (
            <div className="banner banner-error" role="alert" style={{ marginBottom: "1rem" }}>
              <span>{error}</span>
            </div>
          )}
          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              autoFocus
            />
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            <button type="submit" className="auth-submit" disabled={submitting}>
              {submitting ? "Signing in…" : "Sign in"}
            </button>
          </form>
          <div className="auth-switch">
            Don&apos;t have an account?{" "}
            <Link to="/register" style={{ color: "#F0B429" }}>Create one</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
