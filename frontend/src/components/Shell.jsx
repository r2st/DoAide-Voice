import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import ThemeToggle from "./ThemeToggle";

const LINKS = [
  { to: "/dashboard", label: "Dashboard", end: true },
  { to: "/agents", label: "Agents" },
  { to: "/calls", label: "Calls" },
  { to: "/campaigns", label: "Campaigns" },
  { to: "/knowledge", label: "Knowledge" },
  { to: "/analytics", label: "Analytics" },
  { to: "/settings", label: "Settings" },
];

export default function Shell({ children }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [navOpen, setNavOpen] = useState(false);
  const toggleRef = useRef(null);

  useEffect(() => { setNavOpen(false); }, [location.pathname]);

  useEffect(() => {
    if (!navOpen) return undefined;
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setNavOpen(false);
        toggleRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [navOpen]);

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="shell">
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="shell-header">
        <div className="brand">
          <span className="brand-name">
            <span className="brand-doaide">DoAide</span>
            <span className="brand-sep">|</span>
            <span className="brand-product">Voice</span>
          </span>
        </div>

        <button
          type="button"
          ref={toggleRef}
          className="nav-toggle"
          aria-expanded={navOpen}
          aria-controls="main-nav"
          aria-label={navOpen ? "Close menu" : "Open menu"}
          onClick={() => setNavOpen((open) => !open)}
        >
          <span className="nav-toggle-bars" aria-hidden="true" />
        </button>

        <nav
          id="main-nav"
          className={navOpen ? "shell-nav is-open" : "shell-nav"}
          aria-label="Main"
        >
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => (isActive ? "nav-link is-active" : "nav-link")}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="shell-user">
          <ThemeToggle />
          <button type="button" className="btn btn-ghost" onClick={handleLogout}>
            Sign out
          </button>
        </div>
      </header>

      {navOpen && (
        <div className="nav-scrim" onClick={() => setNavOpen(false)} aria-hidden="true" />
      )}

      <main className="shell-main" id="main">
        {children}
      </main>
    </div>
  );
}
