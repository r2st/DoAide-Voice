import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { usePageTitle } from "../hooks/usePageTitle";

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
        <h1 className="auth-title">
          <span className="auth-title-doaide">DoAide</span>
          <span className="auth-title-sep">|</span>
          Voice
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
            <Link to="/login" style={{ color: "#0D9488" }}>Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
