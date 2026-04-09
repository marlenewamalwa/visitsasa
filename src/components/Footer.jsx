import React from "react";
import { Link } from "react-router-dom";

const WHATSAPP_NUMBER = "254778389333";
const WHATSAPP_MESSAGE = encodeURIComponent("Hi! I'd like to find out more about your Kenya travel packages.");
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/destinations", label: "Destinations" },
  { to: "/activities", label: "Activities" },
  { to: "/travel-tips", label: "Travel Tips" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
  { to: "/howitworks", label: "How It Works" },
];

const DESTINATIONS = [
  "Maasai Mara", "Diani Beach", "Naivasha", "Amboseli", "Lamu", "Tsavo",
];

function Footer() {
  return (
    <footer style={styles.footer}>
      <style>{css}</style>

      {/* Top strip */}
      <div style={styles.topStrip}>
        <div style={styles.topStripInner}>
          <span style={styles.topStripText}>
            Ready to explore Kenya? Chat with our team right now.
          </span>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.topStripBtn}
            className="footer-cta"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: 7, flexShrink: 0, verticalAlign: "middle" }}>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Chat on WhatsApp
          </a>
        </div>
      </div>

      {/* Main grid — className added so media queries work */}
      <div style={styles.main} className="footer-main">

        {/* Brand col */}
        <div style={styles.brandCol}>
          <p style={styles.brandName}>Visit Sasa</p>
          <p style={styles.brandTagline}>
            A Nairobi-based travel company connecting curious travellers
            with Kenya's most extraordinary landscapes, cultures, and wildlife.
          </p>
        </div>

        {/* Pages col */}
        <div style={styles.col}>
          <h4 style={styles.colTitle}>Explore</h4>
          <ul style={styles.colList}>
            {NAV_LINKS.map(l => (
              <li key={l.to}>
                <Link to={l.to} style={styles.colLink} className="footer-link">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter / social col */}
        <div style={styles.col}>
          <h4 style={styles.colTitle}>Stay Updated</h4>
          <p style={styles.colDesc}>
            Get travel inspiration, new packages, and Kenya tips delivered to your inbox.
          </p>
          <div style={styles.emailRow}>
            <input
              type="email"
              placeholder="your@email.com"
              style={styles.emailInput}
              className="footer-email"
            />
            <button style={styles.emailBtn} className="footer-email-btn">→</button>
          </div>

          {/* Social links — className added so wrap media query works */}
          <div style={styles.socialRow} className="footer-social">
            <a href="https://www.instagram.com/visitsasaofficial/" style={styles.socialLink} className="footer-link">Instagram</a>
            <a href="https://www.tiktok.com/@visitsasaofficial?_r=1&_t=ZS-95CPc5EriS4" style={styles.socialLink} className="footer-link">Tiktok</a>
            <a href="https://web.facebook.com/Visitsasa/?_rdc=1&_rdr#" style={styles.socialLink} className="footer-link">Facebook</a>
            <a href="https://www.linkedin.com/company/visitsasa/" style={styles.socialLink} className="footer-link">LinkedIn</a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...styles.socialLink, color: "#4ade80" }}
              className="footer-link"
            >
              WhatsApp
            </a>
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div style={styles.bottomBar}>
        <p style={styles.copy}>
          &copy; {new Date().getFullYear()} Visit Sasa. All rights reserved.
        </p>
        <p style={styles.legal}>
          <a href="#" style={styles.legalLink} className="footer-link">Privacy Policy</a>
          <span style={styles.legalDot}>·</span>
          <a href="#" style={styles.legalLink} className="footer-link">Terms of Service</a>
        </p>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: "#0f1f1a",
    color: "#fff",
    fontFamily: "'Helvetica Neue', sans-serif",
    marginTop: 0,
  },

  topStrip: {
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    padding: "22px 24px",
  },
  topStripInner: {
    maxWidth: 1200,
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 16,
  },
  topStripText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.65)",
    fontStyle: "italic",
    fontFamily: "'Georgia', serif",
  },
  topStripBtn: {
    display: "inline-flex",
    alignItems: "center",
    padding: "9px 20px",
    border: "1px solid #25D366",
    color: "#25D366",
    textDecoration: "none",
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    transition: "background 0.2s, color 0.2s",
    whiteSpace: "nowrap",
  },

  main: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "56px 24px 48px",
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1.5fr",
    gap: 48,
  },

  brandCol: {},
  brandName: {
    fontFamily: "'Georgia', 'Times New Roman', serif",
    fontSize: 22,
    fontWeight: 400,
    letterSpacing: "-0.01em",
    margin: "0 0 14px",
    color: "#fff",
  },
  brandTagline: {
    fontSize: 13,
    color: "rgba(255,255,255,0.52)",
    lineHeight: 1.75,
    margin: "0 0 22px",
    maxWidth: 280,
  },

  col: {},
  colTitle: {
    fontSize: 10,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "#c8a96e",
    fontWeight: 600,
    margin: "0 0 18px",
  },
  colList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  colLink: {
    fontSize: 13,
    color: "rgba(255,255,255,0.6)",
    textDecoration: "none",
    transition: "color 0.2s",
    display: "inline-block",
  },
  colDesc: {
    fontSize: 13,
    color: "rgba(255,255,255,0.5)",
    lineHeight: 1.7,
    margin: "0 0 16px",
  },

  emailRow: {
    display: "flex",
    marginBottom: 20,
  },
  emailInput: {
    flex: 1,
    padding: "9px 12px",
    backgroundColor: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRight: "none",
    color: "#fff",
    fontFamily: "'Helvetica Neue', sans-serif",
    fontSize: 13,
    outline: "none",
    borderRadius: 0,
    minWidth: 0,
  },
  emailBtn: {
    padding: "9px 16px",
    backgroundColor: "#c8a96e",
    color: "#fff",
    border: "none",
    fontSize: 16,
    cursor: "pointer",
    fontWeight: 700,
    transition: "background 0.2s",
    flexShrink: 0,
  },

  socialRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 18,
  },
  socialLink: {
    fontSize: 11,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.4)",
    textDecoration: "none",
    transition: "color 0.2s",
  },

  bottomBar: {
    borderTop: "1px solid rgba(255,255,255,0.07)",
    padding: "20px 24px",
    maxWidth: 1200,
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
  },
  copy: {
    fontSize: 12,
    color: "rgba(255,255,255,0.3)",
    margin: 0,
  },
  legal: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    margin: 0,
  },
  legalLink: {
    fontSize: 12,
    color: "rgba(255,255,255,0.3)",
    textDecoration: "none",
    transition: "color 0.2s",
  },
  legalDot: {
    color: "rgba(255,255,255,0.2)",
    fontSize: 12,
  },
};

const css = `
  .footer-link:hover { color: #fff !important; }
  .footer-cta:hover { background: #25D366 !important; color: #fff !important; }
  .footer-email:focus { border-color: rgba(200,169,110,0.5) !important; background: rgba(255,255,255,0.09) !important; }
  .footer-email-btn:hover { background: #b8954f !important; }
  @media (max-width: 900px) {
    .footer-main { grid-template-columns: 1fr 1fr !important; }
  }
  @media (max-width: 560px) {
    .footer-main { grid-template-columns: 1fr !important; }
    .footer-social { flex-wrap: wrap !important; gap: 12px !important; }
  }
`;

export default Footer;