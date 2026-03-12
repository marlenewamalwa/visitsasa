import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { label: "Destinations", path: "/destinations" },
  { label: "Wildlife", path: "/wildlife" },
  { label: "Food & Culture", path: "/food-culture" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      height: "68px",
      background: scrolled ? "rgba(13,43,49,0.97)" : "rgba(13,43,49,0.6)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(78,205,196,0.1)",
      transition: "all 0.4s ease",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 6%",
    }}>
      <Link to="/" style={{ textDecoration: "none" }}>
        <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.5rem", fontWeight: 900, color: "#F4F9FA", letterSpacing: "-0.5px" }}>
          Visit<span style={{ color: "#4ECDC4" }}>Sasa</span>
        </div>
      </Link>
      <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
        {NAV_LINKS.map((l) => {
          const isActive = location.pathname === l.path;
          return (
            <Link key={l.label} to={l.path} style={{ textDecoration: "none" }}>
              <span style={{
                fontFamily: "'Lato', sans-serif", fontSize: "0.82rem", fontWeight: 700,
                letterSpacing: "1.5px", textTransform: "uppercase",
                color: isActive ? "#4ECDC4" : "#F4F9FA",
                borderBottom: isActive ? "2px solid #4ECDC4" : "2px solid transparent",
                paddingBottom: "2px",
                transition: "color 0.3s, border-color 0.3s",
              }}>{l.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}