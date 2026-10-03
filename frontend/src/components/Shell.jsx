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
          <svg viewBox="0 0 400 320" className="brand-robot" aria-hidden="true">
            <defs><linearGradient id="hg-nav" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#F0B429" /><stop offset="100%" stopColor="#D4A017" /></linearGradient></defs>
            <line x1="200" y1="45" x2="200" y2="20" stroke="#F0B429" strokeWidth="6" strokeLinecap="round" />
            <circle cx="200" cy="14" r="10" fill="#F0B429" /><circle cx="200" cy="14" r="5" fill="#F7CC5F" />
            <rect x="110" y="50" width="180" height="140" rx="35" fill="url(#hg-nav)" />
            <rect x="130" y="68" width="140" height="105" rx="25" fill="#D4A017" opacity="0.4" />
            <ellipse cx="165" cy="115" rx="18" ry="20" fill="#0A0A0B" /><ellipse cx="235" cy="115" rx="18" ry="20" fill="#0A0A0B" />
            <circle cx="170" cy="113" r="8" fill="#F7CC5F" /><circle cx="240" cy="113" r="8" fill="#F7CC5F" />
            <circle cx="174" cy="109" r="3" fill="white" opacity="0.7" /><circle cx="244" cy="109" r="3" fill="white" opacity="0.7" />
            <path d="M170 155Q200 178 230 155" stroke="#0A0A0B" strokeWidth="4" fill="none" strokeLinecap="round" />
            <rect x="92" y="95" width="22" height="45" rx="8" fill="#D4A017" /><rect x="286" y="95" width="22" height="45" rx="8" fill="#D4A017" />
            <rect x="175" y="190" width="50" height="14" rx="5" fill="#D4A017" />
            <rect x="145" y="204" width="110" height="55" rx="18" fill="url(#hg-nav)" />
            <circle cx="200" cy="228" r="7" fill="#0A0A0B" />
            <path d="M145 218Q118 223 113 240Q108 257 120 262" stroke="#D4A017" strokeWidth="9" fill="none" strokeLinecap="round" /><circle cx="120" cy="265" r="7" fill="#D4A017" />
            <path d="M255 218Q282 223 287 240Q292 257 280 262" stroke="#D4A017" strokeWidth="9" fill="none" strokeLinecap="round" /><circle cx="280" cy="265" r="7" fill="#D4A017" />
          </svg>
          <span className="brand-name">DoAide <span className="brand-accent">Voice</span></span>
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
