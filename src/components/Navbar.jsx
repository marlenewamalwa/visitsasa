import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/visitsasa.jpg";
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: "/destinations", label: "Destinations" },
    { to: "/packages", label: "Packages" },
    { to: "/travel-tips", label: "Travel Tips" },
    { to: "/about", label: "About Us" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=DM+Sans:wght@400;500&display=swap');

        .tk-nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          transition: all 0.35s ease;
          font-family: 'DM Sans', sans-serif;
        }

        .tk-nav.scrolled {
          background: rgba(18, 42, 48, 0.96);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: 0 1px 0 rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.3);
        }

        .tk-nav.top {
          background: linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 100%);
        }

        .tk-nav.menu-open {
          background: rgba(18, 42, 48, 0.98);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
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

        /* Logo */
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

        .tk-logo-text {
          font-family: 'Playfair Display', serif;
          font-size: 19px;
          font-weight: 600;
          color: #fff;
          letter-spacing: 0.01em;
          line-height: 1;
        }

        .tk-logo-text span {
          color: #6ECBD4;
        }

        /* Desktop links */
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
          color: #1E4D56;
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

        .tk-cta {
          color: #fff;
          text-decoration: none;
          font-size: 13.5px;
          font-weight: 600;
          letter-spacing: 0.03em;
          padding: 8px 18px;
          background: #1E4D56;
          border-radius: 8px;
          margin-left: 10px;
          transition: background 0.2s ease, transform 0.15s ease;
          white-space: nowrap;
        }

        .tk-cta:hover {
          background: #8fd8e0;
          transform: translateY(-1px);
        }

        /* Hamburger */
        .tk-hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          width: 40px;
          height: 40px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 10px;
          cursor: pointer;
          padding: 0 10px;
          z-index: 2;
          transition: background 0.2s ease;
        }

        .tk-hamburger:hover {
          background: rgba(255,255,255,0.14);
        }

        .tk-hamburger span {
          display: block;
  width: 25px;
  height: 3px;
  background: black;
  margin: 5px 0;
  transition: 0.4s;
        }

        .tk-hamburger.open span:nth-child(1) {
          transform: translateY(6.5px) rotate(45deg);
        }
        .tk-hamburger.open span:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }
        .tk-hamburger.open span:nth-child(3) {
          transform: translateY(-6.5px) rotate(-45deg);
        }

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

        .tk-mobile-link {
          color: rgba(255,255,255,0.8);
          text-decoration: none;
          font-size: 15px;
          font-weight: 500;
          letter-spacing: 0.02em;
          padding: 13px 8px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          transition: color 0.2s ease, padding-left 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .tk-mobile-link:last-of-type {
          border-bottom: none;
        }

        .tk-mobile-link:hover,
        .tk-mobile-link.active {
          color: #fff;
          padding-left: 14px;
        }

        .tk-mobile-link.active {
          color: #6ECBD4;
        }

        .tk-mobile-link-arrow {
          font-size: 12px;
          opacity: 0.4;
        }

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
          margin-top: 12px;
          transition: background 0.2s ease;
        }

        .tk-mobile-cta:hover {
          background: #8fd8e0;
        }

        /* Responsive breakpoint */
        @media (max-width: 768px) {
          .tk-links { display: none; }
          .tk-hamburger { display: flex; }
          .tk-mobile-menu { display: flex; }
          .tk-nav-inner { padding: 0 20px; }
        }
      `}</style>

      <nav className={`tk-nav ${menuOpen ? "menu-open" : scrolled ? "scrolled" : "top"}`}>
        <div className="tk-nav-inner">

          {/* Logo */}
          <Link to="/" className="tk-logo">
            <img src={logo} alt="Travel Kenya" className="tk-logo-img" />
          </Link>

          {/* Desktop links */}
          <div className="tk-links">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`tk-link${location.pathname === to ? " active" : ""}`}
              >
                {label}
              </Link>
            ))}
            <Link to="/contact" className="tk-cta">Plan a Trip</Link>
          </div>

          {/* Hamburger (mobile only) */}
          <button
            className={`tk-hamburger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* Mobile drawer */}
        {menuOpen && (
          <div className="tk-mobile-menu">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`tk-mobile-link${location.pathname === to ? " active" : ""}`}
              >
                {label}
                <span className="tk-mobile-link-arrow">›</span>
              </Link>
            ))}
            <Link to="/contact" className="tk-mobile-cta">Plan a Trip →</Link>
          </div>
        )}
      </nav>

      <div style={{ height: 68 }} />
    </>
  );
}

export default Navbar;