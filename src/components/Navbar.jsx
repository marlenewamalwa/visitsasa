import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { label: "Destinations", path: "/destinations" },
  { label: "Wildlife", path: "/wildlife" },
  { label: "Food & Culture", path: "/food-culture" },
  { label: "Travel Tips", path: "/travel-tips" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [location]);

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        height: "68px",
        background: scrolled || menuOpen ? "rgba(13,43,49,0.97)" : "rgba(13,43,49,0.6)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(78,205,196,0.1)",
        transition: "background 0.4s ease",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 6%",
      }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.5rem", fontWeight: 900, color: "#F4F9FA", letterSpacing: "-0.5px" }}>
            Visit<span style={{ color: "#4ECDC4" }}>Sasa</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="desktop-nav" style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
          {NAV_LINKS.map((l) => (
            <Link key={l.label} to={l.path} className={`nav-link ${location.pathname === l.path ? "active" : ""}`}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* Hamburger */}
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span style={{ transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
          <span style={{ opacity: menuOpen ? 0 : 1 }} />
          <span style={{ transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
        </button>
      </nav>

      {/* Mobile dropdown */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        {NAV_LINKS.map((l) => (
          <Link key={l.label} to={l.path}>{l.label}</Link>
        ))}
      </div>
    </>
  );
}