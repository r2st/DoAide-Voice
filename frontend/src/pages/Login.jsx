import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { usePageTitle } from "../hooks/usePageTitle";

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
        <h1 className="auth-title">
          <span className="auth-title-doaide">DoAide</span>
          <span className="auth-title-sep">|</span>
          Voice
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
            <Link to="/register" style={{ color: "#0D9488" }}>Create one</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
