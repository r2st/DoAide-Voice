import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: "📊" },
  { to: "/agents", label: "Agents", icon: "🤖" },
  { to: "/calls", label: "Calls", icon: "📞" },
  { to: "/campaigns", label: "Campaigns", icon: "📢" },
  { to: "/knowledge", label: "Knowledge", icon: "📚" },
  { to: "/analytics", label: "Analytics", icon: "📈" },
  { to: "/settings", label: "Settings", icon: "⚙️" },
];

export default function Shell({ children }) {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => { logout(); navigate("/"); };

  const themeOptions = ["system", "light", "dark"];
  const nextTheme = () => {
    const idx = themeOptions.indexOf(theme);
    setTheme(themeOptions[(idx + 1) % themeOptions.length]);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <button
        className="mobile-nav-toggle"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle navigation"
      >
        ☰
      </button>
      <nav className={`sidebar ${mobileOpen ? "sidebar--open" : ""}`}>
        <div className="sidebar-header">
          <Link to="/dashboard" style={{ textDecoration: "none", color: "var(--color-text)" }}>
            <strong>DoAide Voice</strong>
          </Link>
        </div>
        <div className="sidebar-nav">
          {NAV_ITEMS.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `nav-link ${isActive ? "nav-link--active" : ""}`}
              onClick={() => setMobileOpen(false)}
            >
              <span className="nav-icon">{icon}</span>
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
        <div className="sidebar-footer">
          <button className="btn btn-secondary" style={{ width: "100%", justifyContent: "center" }} onClick={nextTheme}>
            {theme === "dark" ? "🌙" : theme === "light" ? "☀️" : "💻"} {theme}
          </button>
          <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", marginTop: "0.5rem", textAlign: "center" }}>
            {user?.email}
          </div>
          <button className="btn btn-secondary" style={{ width: "100%", marginTop: "0.5rem", justifyContent: "center" }} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>
      {mobileOpen && <div className="sidebar-backdrop" onClick={() => setMobileOpen(false)} />}
      <main style={{ flex: 1, minWidth: 0 }}>
        {children}
      </main>
      <style>{`
        .sidebar {
          width: var(--nav-width);
          background: var(--color-bg-secondary);
          border-right: 1px solid var(--color-border);
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 0;
          height: 100vh;
          overflow-y: auto;
          z-index: 50;
        }
        .sidebar-header { padding: 1.25rem; border-bottom: 1px solid var(--color-border); }
        .sidebar-nav { flex: 1; padding: 0.5rem; }
        .sidebar-footer { padding: 1rem; border-top: 1px solid var(--color-border); }
        .nav-link {
          display: flex; align-items: center; gap: 0.75rem;
          padding: 0.625rem 0.75rem; border-radius: var(--radius-md);
          color: var(--color-text-secondary); text-decoration: none;
          font-size: 0.875rem; font-weight: 500; transition: all 0.15s;
        }
        .nav-link:hover { background: var(--color-bg-tertiary); color: var(--color-text); text-decoration: none; }
        .nav-link--active { background: var(--color-primary-light); color: var(--color-primary); }
        .nav-icon { font-size: 1.1rem; width: 1.5rem; text-align: center; }
        .mobile-nav-toggle {
          display: none; position: fixed; top: 0.75rem; left: 0.75rem;
          z-index: 60; background: var(--color-bg-secondary); border: 1px solid var(--color-border);
          border-radius: var(--radius-md); padding: 0.5rem 0.75rem; font-size: 1.25rem;
        }
        .sidebar-backdrop { display: none; }
        @media (max-width: 768px) {
          .sidebar {
            position: fixed; left: -100%; top: 0;
            transition: left 0.2s;
          }
          .sidebar--open { left: 0; }
          .mobile-nav-toggle { display: block; }
          .sidebar-backdrop {
            display: block; position: fixed; inset: 0;
            background: rgba(0,0,0,0.4); z-index: 40;
          }
        }
      `}</style>
    </div>
  );
}
