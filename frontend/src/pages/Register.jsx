import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { usePageTitle } from "../hooks/usePageTitle";

function RobotFace({ size = 32, color }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 320" width={size} height={size} aria-hidden="true">
      <defs><linearGradient id="hg-reg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} /><stop offset="100%" stopColor="#D4A017" /></linearGradient></defs>
      <line x1="200" y1="45" x2="200" y2="20" stroke={color} strokeWidth="6" strokeLinecap="round" />
      <circle cx="200" cy="14" r="10" fill={color} /><circle cx="200" cy="14" r="5" fill="#F7CC5F" />
      <rect x="110" y="50" width="180" height="140" rx="35" fill="url(#hg-reg)" />
      <ellipse cx="165" cy="115" rx="18" ry="20" fill="#0A0A0B" /><ellipse cx="235" cy="115" rx="18" ry="20" fill="#0A0A0B" />
      <circle cx="170" cy="113" r="8" fill="#F7CC5F" /><circle cx="240" cy="113" r="8" fill="#F7CC5F" />
      <path d="M170 155Q200 178 230 155" stroke="#0A0A0B" strokeWidth="4" fill="none" strokeLinecap="round" />
      <rect x="92" y="95" width="22" height="45" rx="8" fill="#D4A017" /><rect x="286" y="95" width="22" height="45" rx="8" fill="#D4A017" />
    </svg>
  );
}

export default function Register() {
  usePageTitle("Create Account — DoAide Voice");
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", full_name: "", business_name: "", industry: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await register(form);
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
        <p className="auth-subtitle">Create your account</p>

        <div className="auth-card">
          {error && (
            <div className="banner banner-error" role="alert" style={{ marginBottom: "1rem" }}>
              <span>{error}</span>
            </div>
          )}
          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            <label htmlFor="reg-name">Full Name</label>
            <input id="reg-name" value={form.full_name} onChange={set("full_name")} required autoFocus autoComplete="name" />

            <label htmlFor="reg-business">Business Name</label>
            <input id="reg-business" value={form.business_name} onChange={set("business_name")} required />

            <label htmlFor="reg-industry">Industry (optional)</label>
            <input id="reg-industry" value={form.industry} onChange={set("industry")} placeholder="e.g. Healthcare, Real Estate" />

            <label htmlFor="reg-email">Email</label>
            <input id="reg-email" type="email" value={form.email} onChange={set("email")} required autoComplete="email" />

            <label htmlFor="reg-password">Password</label>
            <input id="reg-password" type="password" value={form.password} onChange={set("password")} required minLength={6} autoComplete="new-password" />
            <p className="field-hint">At least 6 characters.</p>

            <button type="submit" className="auth-submit" disabled={submitting}>
              {submitting ? "Creating account…" : "Create account"}
            </button>
          </form>
          <div className="auth-switch">
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#F0B429" }}>Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
