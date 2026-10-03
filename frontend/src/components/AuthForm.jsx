import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorBanner from "./ErrorBanner";
import { useAuth } from "../hooks/useAuth";

const EMPTY = { email: "", password: "", full_name: "", business_name: "" };

export default function AuthForm() {
  const [mode, setMode] = useState("register");
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const { login, register } = useAuth();
  const navigate = useNavigate();
  const registering = mode === "register";

  function switchTo(next) {
    setMode(next);
    setError("");
    setFieldErrors({});
  }

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setFieldErrors({});

    const problems = {};
    if (!form.email.trim()) problems.email = "Enter your email.";
    if (!form.password) problems.password = "Enter your password.";
    if (registering && form.password.length < 6) problems.password = "At least 6 characters.";
    if (Object.keys(problems).length > 0) {
      setFieldErrors(problems);
      return;
    }

    setBusy(true);
    try {
      if (registering) {
        await register({
          email: form.email,
          password: form.password,
          full_name: form.full_name || null,
          business_name: form.business_name || null,
        });
      } else {
        await login(form.email, form.password);
      }
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="auth-card">
      <div className="auth-tabs" role="tablist">
        <button
          type="button"
          role="tab"
          className={`auth-tab ${!registering ? "is-active" : ""}`}
          aria-selected={!registering}
          onClick={() => switchTo("login")}
        >
          Sign in
        </button>
        <button
          type="button"
          role="tab"
          className={`auth-tab ${registering ? "is-active" : ""}`}
          aria-selected={registering}
          onClick={() => switchTo("register")}
        >
          Create account
        </button>
      </div>

      <ErrorBanner message={error} onDismiss={() => setError("")} />

      <form onSubmit={handleSubmit} className="auth-form" noValidate>
        <label htmlFor="auth-email">Email</label>
        <input
          id="auth-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={form.email}
          aria-invalid={fieldErrors.email ? true : undefined}
          onChange={(e) => update("email", e.target.value)}
        />
        {fieldErrors.email && <p className="field-error" role="alert">{fieldErrors.email}</p>}

        <label htmlFor="auth-password">Password</label>
        <input
          id="auth-password"
          name="password"
          type="password"
          required
          minLength={registering ? 6 : undefined}
          autoComplete={registering ? "new-password" : "current-password"}
          value={form.password}
          aria-invalid={fieldErrors.password ? true : undefined}
          onChange={(e) => update("password", e.target.value)}
        />
        {fieldErrors.password ? (
          <p className="field-error" role="alert">{fieldErrors.password}</p>
        ) : (
          registering && <p className="field-hint">At least 6 characters.</p>
        )}

        {registering && (
          <>
            <label htmlFor="auth-name">Your name (optional)</label>
            <input
              id="auth-name"
              name="full_name"
              autoComplete="name"
              value={form.full_name}
              onChange={(e) => update("full_name", e.target.value)}
            />

            <label htmlFor="auth-business">Business name (optional)</label>
            <input
              id="auth-business"
              name="business_name"
              value={form.business_name}
              onChange={(e) => update("business_name", e.target.value)}
            />
          </>
        )}

        <button type="submit" className="auth-submit" disabled={busy}>
          {busy ? "Please wait…" : registering ? "Create account" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
