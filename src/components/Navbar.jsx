import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/visitsasa.jpg";

const PRIMARY_LINKS = [
  { to: "/destinations", label: "Destinations" },
  { to: "/activities", label: "Activities" },
];

const MORE_LINKS = [
  { to: "/travel-tips", label: "Travel Tips" },
  { to: "/howitworks", label: "How It Works" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
];

const ALL_MOBILE_LINKS = [...PRIMARY_LINKS, ...MORE_LINKS];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const location = useLocation();
  const moreRef = useRef(null);

  useEffect(() => {
    setMenuOpen(false);
    setMoreOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handler = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const moreIsActive = MORE_LINKS.some(l => l.to === location.pathname);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=DM+Sans:wght@400;500&display=swap');

        .tk-nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          font-family: 'DM Sans', sans-serif;
          background: rgba(18, 42, 48, 0.97);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: 0 1px 0 rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.3);
        }

        .tk-nav-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 28px;
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .tk-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
          z-index: 2;
        }

        .tk-logo-img {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          object-fit: cover;
          border: 1.5px solid rgba(255,255,255,0.2);
        }

        .tk-links {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .tk-link {
          position: relative;
          color: rgba(255,255,255,0.82);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.02em;
          padding: 7px 14px;
          border-radius: 8px;
          transition: color 0.2s ease, background 0.2s ease;
        }

        .tk-link:hover {
          color: #fff;
          background: rgba(255,255,255,0.09);
        }

        .tk-link.active {
          color: #fff;
          background: rgba(110, 203, 212, 0.15);
        }

        .tk-link.active::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 50%;
          transform: translateX(-50%);
          width: 18px;
          height: 2px;
          background: #6ECBD4;
          border-radius: 2px;
        }

        /* More button */
        .tk-more-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          color: rgba(255,255,255,0.82);
          background: none;
          border: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.02em;
          padding: 7px 14px;
          border-radius: 8px;
          cursor: pointer;
          transition: color 0.2s ease, background 0.2s ease;
        }

        .tk-more-btn:hover,
        .tk-more-btn.open {
          color: #fff;
          background: rgba(255,255,255,0.09);
        }

        .tk-more-btn.active-section {
          color: #fff;
          background: rgba(110, 203, 212, 0.15);
        }

        .tk-more-chevron {
          width: 11px;
          height: 11px;
          opacity: 0.55;
          transition: transform 0.2s ease;
          flex-shrink: 0;
        }

        .tk-more-btn.open .tk-more-chevron {
          transform: rotate(180deg);
        }

        /* Dropdown */
        .tk-dropdown {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          background: rgba(10, 28, 24, 0.98);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
          min-width: 210px;
          padding: 8px;
          animation: dropIn 0.18s ease forwards;
          z-index: 100;
        }

        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-6px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .tk-dropdown-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px;
          border-radius: 8px;
          color: rgba(255,255,255,0.75);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: background 0.15s ease, color 0.15s ease;
        }

        .tk-dropdown-link:hover {
          background: rgba(255,255,255,0.08);
          color: #fff;
        }

        .tk-dropdown-link.active {
          color: #6ECBD4;
          background: rgba(110, 203, 212, 0.1);
        }

        .tk-dropdown-arrow {
          font-size: 11px;
          opacity: 0.25;
        }

        .tk-dropdown-divider {
          height: 1px;
          background: rgba(255,255,255,0.07);
          margin: 6px 6px;
        }

        /* CTA */
        .tk-cta {
          color: #fff;
          text-decoration: none;
          font-size: 13.5px;
          font-weight: 600;
          letter-spacing: 0.03em;
          padding: 8px 18px;
          background: #1E4D56;
          border-radius: 8px;
          margin-left: 6px;
          transition: background 0.2s ease, transform 0.15s ease;
          white-space: nowrap;
        }

        .tk-cta:hover {
          background: #2a6570;
          transform: translateY(-1px);
        }

        /* Hamburger */
        .tk-hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 40px;
          height: 40px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.18);
          border-radius: 10px;
          cursor: pointer;
          padding: 0;
          z-index: 2;
          transition: background 0.2s ease;
        }

        .tk-hamburger:hover { background: rgba(255,255,255,0.14); }

        .tk-hamburger span {
          display: block;
          width: 20px;
          height: 2px;
          background: #fff;
          border-radius: 2px;
          transition: transform 0.3s ease, opacity 0.3s ease;
          margin: 3px 0;
        }

        .tk-hamburger.open span:nth-child(1) { transform: translateY(8px) rotate(45deg); }
        .tk-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .tk-hamburger.open span:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }

        /* Mobile drawer */
        .tk-mobile-menu {
          display: none;
          flex-direction: column;
          padding: 8px 20px 24px;
          border-top: 1px solid rgba(255,255,255,0.08);
          animation: slideDown 0.25s ease forwards;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .tk-mobile-section-label {
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          padding: 14px 8px 4px;
        }

        .tk-mobile-link {
          color: rgba(255,255,255,0.8);
          text-decoration: none;
          font-size: 15px;
          font-weight: 500;
          letter-spacing: 0.02em;
          padding: 12px 8px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          transition: color 0.2s ease, padding-left 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .tk-mobile-link:last-of-type { border-bottom: none; }
        .tk-mobile-link:hover, .tk-mobile-link.active { color: #fff; padding-left: 14px; }
        .tk-mobile-link.active { color: #6ECBD4; }
        .tk-mobile-link-arrow { font-size: 12px; opacity: 0.35; }

        .tk-mobile-cta {
          display: block;
          text-align: center;
          color: #0e2e33;
          text-decoration: none;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.04em;
          padding: 13px;
          background: #6ECBD4;
          border-radius: 10px;
          margin-top: 14px;
          transition: background 0.2s ease;
        }

        .tk-mobile-cta:hover { background: #8fd8e0; }

        @media (max-width: 768px) {
          .tk-links { display: none; }
          .tk-hamburger { display: flex; }
          .tk-mobile-menu { display: flex; }
          .tk-nav-inner { padding: 0 20px; }
        }
      `}</style>

      <nav className={`tk-nav${menuOpen ? " menu-open" : ""}`}>
        <div className="tk-nav-inner">

          <Link to="/" className="tk-logo">
            <img src={logo} alt="Visit Sasa" className="tk-logo-img" />
          </Link>

          {/* Desktop */}
          <div className="tk-links">
            {PRIMARY_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`tk-link${location.pathname === to ? " active" : ""}`}
              >
                {label}
              </Link>
            ))}

            {/* More dropdown */}
            <div ref={moreRef} style={{ position: "relative" }}>
              <button
                className={`tk-more-btn${moreOpen ? " open" : ""}${moreIsActive ? " active-section" : ""}`}
                onClick={() => setMoreOpen(o => !o)}
              >
                More
                <svg className="tk-more-chevron" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="2,4 6,8 10,4" />
                </svg>
              </button>

              {moreOpen && (
                <div className="tk-dropdown">
                  {MORE_LINKS.slice(0, 2).map(({ to, label }) => (
                    <Link key={to} to={to} className={`tk-dropdown-link${location.pathname === to ? " active" : ""}`}>
                      {label}
                      <span className="tk-dropdown-arrow">›</span>
                    </Link>
                  ))}
                  <div className="tk-dropdown-divider" />
                  {MORE_LINKS.slice(2).map(({ to, label }) => (
                    <Link key={to} to={to} className={`tk-dropdown-link${location.pathname === to ? " active" : ""}`}>
                      {label}
                      <span className="tk-dropdown-arrow">›</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/packages" className="tk-cta">Plan a Trip</Link>
          </div>

          {/* Hamburger */}
          <button
            className={`tk-hamburger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>

        {/* Mobile drawer — flat list with section labels */}
        {menuOpen && (
          <div className="tk-mobile-menu">
            <span className="tk-mobile-section-label">Browse</span>
            {PRIMARY_LINKS.map(({ to, label }) => (
              <Link key={to} to={to} className={`tk-mobile-link${location.pathname === to ? " active" : ""}`}>
                {label}
                <span className="tk-mobile-link-arrow">›</span>
              </Link>
            ))}
            <span className="tk-mobile-section-label">More</span>
            {MORE_LINKS.map(({ to, label }) => (
              <Link key={to} to={to} className={`tk-mobile-link${location.pathname === to ? " active" : ""}`}>
                {label}
                <span className="tk-mobile-link-arrow">›</span>
              </Link>
            ))}
            <Link to="/" className="tk-mobile-cta">Plan a Trip →</Link>
          </div>
        )}
      </nav>

      <div style={{ height: 68 }} />
    </>
  );
}

export default Navbar;