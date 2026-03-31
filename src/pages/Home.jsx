import React, { useState } from "react";
import { Link } from "react-router-dom";
import TripWizard from "../components/TripWizard";
import heroBg from "../assets/amboseli.jpg";
import coastal from "../assets/dianibeach2.jpg";
import migration from "../assets/migration.jpg";
import vasha from "../assets/vashatrees.jpg";
import ctabanner from "../assets/transport.jpg";

const DESTINATIONS = [
  {
    name: "Maasai Mara",
    tag: "Wildlife Safari",
    desc: "Witness the Great Migration across endless golden savannah.",
    img: migration,
    days: "3–5 days",
  },
  {
    name: "Diani Beach",
    tag: "Coastal Escape",
    desc: "Pristine white sands and turquoise waters of the Indian Ocean.",
    img: coastal,
    days: "4–7 days",
  },
  {
    name: "Naivasha",
    tag: "Lake & Highlands",
    desc: "Flamingo-filled shores, Hell's Gate, and fresh highland air.",
    img: vasha,
    days: "2–3 days",
  },
];

const HOW_IT_WORKS = [
  {
    num: "01",
    title: "Tell Us Your Dream",
    body: "Use our trip builder to pick your destinations, dates, activities, and accommodation style — all in a few simple steps.",
  },
  {
    num: "02",
    title: "We Craft Your Itinerary",
    body: "Our local experts review your selections and hand-build a personalised itinerary within 24 hours.",
  },
  {
    num: "03",
    title: "Travel Your Way",
    body: "Confirm, pack, and go. We handle every detail on the ground so you can focus on the experience.",
  },
];

const EXPERIENCES = [
  { icon: "🦁", label: "Game Drives" },
  { icon: "🌊", label: "Ocean Excursions" },
  { icon: "🥾", label: "Bush Walks" },
  { icon: "🏕️", label: "Glamping" },
  { icon: "🎭", label: "Cultural Visits" },
  { icon: "🐦", label: "Bird Watching" },
  { icon: "🚣", label: "Lake Safaris" },
  { icon: "🌋", label: "Mountain Hikes" },
];

function Home() {
  const [wizardOpen, setWizardOpen] = useState(false);

  return (
    <div style={styles.page}>
      <style>{css}</style>

      {/* ── HERO ── */}
      <section style={styles.hero}>
        <img src={heroBg} alt="Kenya landscape" style={styles.heroBg} />
        <div style={styles.heroOverlay} />
        <div style={styles.heroContent}>
          <span style={styles.heroEyebrow}>Your Trip. Your Rules.</span>
          <h1 style={styles.heroTitle}>
            Build Your<br />Perfect Kenya<br />Adventure
          </h1>
          <p style={styles.heroSub}>
            No fixed packages. No compromise.<br />
            Choose your destinations, activities, and pace — we'll handle the rest.
          </p>
          <div style={styles.heroActions}>
            <button
              onClick={() => setWizardOpen(true)}
              style={styles.ctaPrimary}
              className="btn-primary"
            >
              Start Building Your Trip
            </button>
            <Link to="/howitworks" style={styles.ctaSecondary} className="btn-secondary">
              How It Works
            </Link>
          </div>
          <div style={styles.heroTrust}>
            <span style={styles.trustItem}>✓ Free to plan</span>
            <span style={styles.trustItem}>✓ No commitment</span>
            <span style={styles.trustItem}>✓ Expert review within 24hrs</span>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ ...styles.section, borderBottom: "1px solid #ece9e2" }}>
        <div style={styles.sectionHeader}>
          <span style={styles.sectionTag}>Simple Process</span>
          <h2 style={styles.sectionTitle}>How It Works</h2>
          <p style={styles.sectionDesc}>
            From dream to departure in three easy steps.
          </p>
        </div>
        <div style={styles.howGrid}>
          {HOW_IT_WORKS.map((step, i) => (
            <div key={step.num} style={styles.howCard} className="how-card">
              <span style={styles.howNum}>{step.num}</span>
              {i < HOW_IT_WORKS.length - 1 && (
                <span style={styles.howArrow} className="how-arrow">→</span>
              )}
              <h3 style={styles.howTitle}>{step.title}</h3>
              <p style={styles.howBody}>{step.body}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 44 }}>
          <button
            onClick={() => setWizardOpen(true)}
            style={styles.ctaPrimaryDark}
            className="btn-primary-dark"
          >
            Start Planning Now
          </button>
        </div>
      </section>

      {/* ── DESTINATIONS ── */}
      <section style={{ ...styles.section, backgroundColor: "#f7f4ef", maxWidth: "100%", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionTag}>Where To Go</span>
            <h2 style={styles.sectionTitle}>Popular Destinations</h2>
            <p style={styles.sectionDesc}>
              Hand-pick your stops — mix and match to build a multi-destination trip.
            </p>
          </div>
          <div style={styles.destGrid}>
            {DESTINATIONS.map((d) => (
              <div
                key={d.name}
                style={styles.destCard}
                className="dest-card"
                onClick={() => setWizardOpen(true)}
              >
                <div style={styles.destImgWrap}>
                  <img src={d.img} alt={d.name} style={styles.destImg} />
                  <span style={styles.destDaysBadge}>{d.days}</span>
                </div>
                <div style={styles.destInfo}>
                  <span style={styles.destTag}>{d.tag}</span>
                  <h3 style={styles.destName}>{d.name}</h3>
                  <p style={styles.destDesc}>{d.desc}</p>
                  <button style={styles.destCta} className="dest-cta-btn">
                    Add to My Trip +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST SECTION ── */}
      <section style={{ ...styles.section, backgroundColor: "#204E59", maxWidth: "100%", padding: "72px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={styles.trustGrid}>
            <div style={styles.trustLeft}>
              <span style={{ ...styles.sectionTag, color: "#c8a96e" }}>Why Plan With Us</span>
              <h2 style={{ ...styles.sectionTitle, color: "#fff", textAlign: "left", marginBottom: 16 }}>
                We Know Kenya<br />Like No One Else
              </h2>
              <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.75, maxWidth: 400, fontFamily: "'Helvetica Neue', sans-serif", fontSize: 15 }}>
                From the red dust of Tsavo to the coral reefs of Watamu, we've spent years
                building relationships with the people and places that make Kenya extraordinary.
              </p>
              <button
                onClick={() => setWizardOpen(true)}
                style={{ ...styles.ctaPrimary, marginTop: 32 }}
                className="btn-primary"
              >
                Build My Trip
              </button>
            </div>
            <div style={styles.trustRight}>
              {[
                { num: "500+", label: "Custom Trips Built" },
                { num: "98%", label: "Guest Satisfaction" },
                { num: "12+", label: "Years in Kenya" },
                { num: "24hr", label: "Response Time" },
              ].map((s) => (
                <div key={s.label} style={styles.trustStat}>
                  <span style={styles.trustStatNum}>{s.num}</span>
                  <span style={styles.trustStatLabel}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={styles.ctaBanner}>
        <img src={ctabanner} alt="cta" style={styles.ctaBannerBg} />
        <div style={styles.ctaBannerOverlay} />
        <div style={styles.ctaBannerContent}>
          <h2 style={styles.ctaBannerTitle}>Your Kenya Story Starts Here</h2>
          <p style={styles.ctaBannerSub}>
            Tell us your dream — we'll build the perfect itinerary, just for you.
          </p>
          <button
            onClick={() => setWizardOpen(true)}
            style={styles.ctaPrimary}
            className="btn-primary"
          >
            Start Building Your Trip
          </button>
        </div>
      </section>

      {/* ── WIZARD MODAL ── */}
      {wizardOpen && (
        <TripWizard onClose={() => setWizardOpen(false)} />
      )}
    </div>
  );
}

/* ── STYLES ── */
const styles = {
  page: {
    fontFamily: "'Georgia', 'Times New Roman', serif",
    color: "#1a1a1a",
    backgroundColor: "#fff",
  },

  hero: {
    position: "relative",
    minHeight: 700,
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
  },
  heroBg: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
  },
  heroOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(135deg, rgba(10,25,18,0.75) 0%, rgba(10,25,18,0.5) 100%)",
  },
  heroContent: {
    position: "relative",
    zIndex: 2,
    maxWidth: 760,
    margin: "0 auto",
    padding: "80px 24px",
    textAlign: "center",
  },
  heroEyebrow: {
    display: "inline-block",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    fontSize: 11,
    color: "#c8a96e",
    fontFamily: "'Helvetica Neue', sans-serif",
    marginBottom: 20,
    borderBottom: "1px solid #c8a96e",
    paddingBottom: 6,
  },
  heroTitle: {
    fontSize: "clamp(42px, 7vw, 80px)",
    fontWeight: 400,
    color: "#fff",
    lineHeight: 1.08,
    letterSpacing: "-0.02em",
    margin: "0 0 24px",
  },
  heroSub: {
    fontSize: 17,
    color: "rgba(255,255,255,0.78)",
    lineHeight: 1.7,
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 300,
    marginBottom: 40,
  },
  heroActions: {
    display: "flex",
    gap: 16,
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: 28,
  },
  heroTrust: {
    display: "flex",
    gap: 24,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  trustItem: {
    fontSize: 12,
    color: "rgba(255,255,255,0.65)",
    fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.04em",
  },

  ctaPrimary: {
    display: "inline-block",
    padding: "14px 32px",
    backgroundColor: "#c8a96e",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 600,
    fontSize: 14,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    transition: "background 0.2s, transform 0.15s",
    textDecoration: "none",
  },
  ctaPrimaryDark: {
    display: "inline-block",
    padding: "14px 32px",
    backgroundColor: "#204E59",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 600,
    fontSize: 14,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    transition: "background 0.2s, transform 0.15s",
  },
  ctaSecondary: {
    display: "inline-block",
    padding: "14px 32px",
    backgroundColor: "transparent",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.5)",
    textDecoration: "none",
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 400,
    fontSize: 14,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    transition: "border-color 0.2s, background 0.2s",
  },
  outlineBtn: {
    display: "inline-block",
    padding: "12px 28px",
    border: "1px solid #204E59",
    color: "#204E59",
    backgroundColor: "transparent",
    cursor: "pointer",
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 600,
    fontSize: 13,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    transition: "background 0.2s, color 0.2s",
  },

  section: {
    padding: "80px 24px",
    maxWidth: 1200,
    margin: "0 auto",
  },
  sectionHeader: {
    textAlign: "center",
    marginBottom: 52,
  },
  sectionTag: {
    display: "inline-block",
    fontSize: 11,
    fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: "#c8a96e",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: "clamp(28px, 4vw, 44px)",
    fontWeight: 400,
    letterSpacing: "-0.02em",
    margin: "0 0 14px",
    lineHeight: 1.15,
    textAlign: "center",
  },
  sectionDesc: {
    fontSize: 16,
    color: "#666",
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 300,
    lineHeight: 1.7,
    maxWidth: 520,
    margin: "0 auto",
  },

  howGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 0,
    position: "relative",
  },
  howCard: {
    padding: "36px 40px",
    borderRight: "1px solid #ece9e2",
    position: "relative",
  },
  howNum: {
    display: "block",
    fontSize: 13,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#c8a96e",
    letterSpacing: "0.1em",
    marginBottom: 16,
  },
  howArrow: {
    position: "absolute",
    top: 36,
    right: -14,
    fontSize: 20,
    color: "#c8a96e",
    zIndex: 1,
  },
  howTitle: {
    fontSize: 20,
    fontWeight: 400,
    margin: "0 0 12px",
    letterSpacing: "-0.01em",
  },
  howBody: {
    fontSize: 14,
    color: "#666",
    fontFamily: "'Helvetica Neue', sans-serif",
    lineHeight: 1.7,
    margin: 0,
  },

  destGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: 24,
  },
  destCard: {
    backgroundColor: "#fff",
    overflow: "hidden",
    boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
    transition: "transform 0.25s, box-shadow 0.25s",
    cursor: "pointer",
  },
  destImgWrap: {
    position: "relative",
  },
  destImg: {
    width: "100%",
    height: 220,
    objectFit: "cover",
    display: "block",
  },
  destDaysBadge: {
    position: "absolute",
    top: 14,
    right: 14,
    backgroundColor: "rgba(10,25,18,0.8)",
    color: "#fff",
    fontSize: 11,
    fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.08em",
    padding: "4px 10px",
    backdropFilter: "blur(4px)",
  },
  destInfo: {
    padding: "24px 24px 28px",
  },
  destTag: {
    fontSize: 10,
    fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "#c8a96e",
    display: "block",
    marginBottom: 8,
  },
  destName: {
    fontSize: 22,
    fontWeight: 400,
    margin: "0 0 10px",
    letterSpacing: "-0.01em",
  },
  destDesc: {
    fontSize: 14,
    color: "#666",
    fontFamily: "'Helvetica Neue', sans-serif",
    lineHeight: 1.65,
    margin: "0 0 18px",
  },
  destCta: {
    fontSize: 12,
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 700,
    color: "#204E59",
    background: "none",
    border: "1px solid #204E59",
    padding: "8px 16px",
    cursor: "pointer",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    transition: "background 0.2s, color 0.2s",
  },

  expGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
    gap: 16,
  },
  expCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: "28px 16px",
    border: "1px solid #ece9e2",
    cursor: "pointer",
    transition: "border-color 0.2s, background 0.2s, transform 0.2s",
    textAlign: "center",
  },
  expIcon: {
    fontSize: 28,
  },
  expLabel: {
    fontSize: 12,
    fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#444",
    fontWeight: 600,
  },

  trustGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 80,
    alignItems: "center",
  },
  trustLeft: {},
  trustRight: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 2,
  },
  trustStat: {
    padding: "36px 28px",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderLeft: "1px solid rgba(255,255,255,0.08)",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },
  trustStatNum: {
    display: "block",
    fontSize: 40,
    fontWeight: 400,
    color: "#c8a96e",
    letterSpacing: "-0.02em",
    lineHeight: 1.1,
    marginBottom: 6,
  },
  trustStatLabel: {
    display: "block",
    fontSize: 11,
    fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.5)",
  },

  ctaBanner: {
    position: "relative",
    minHeight: 300,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  ctaBannerBg: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  ctaBannerOverlay: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(8, 22, 14, 0.72)",
  },
  ctaBannerContent: {
    position: "relative",
    zIndex: 2,
    textAlign: "center",
    padding: "60px 24px",
  },
  ctaBannerTitle: {
    fontSize: "clamp(26px, 4vw, 46px)",
    fontWeight: 400,
    color: "#fff",
    margin: "0 0 14px",
    letterSpacing: "-0.02em",
  },
  ctaBannerSub: {
    fontSize: 16,
    color: "rgba(255,255,255,0.72)",
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 300,
    marginBottom: 32,
  },
};

const css = `
  .btn-primary:hover { background-color: #b8954f !important; transform: translateY(-1px); }
  .btn-primary-dark:hover { background-color: #0f1f18 !important; transform: translateY(-1px); }
  .btn-secondary:hover { border-color: #fff !important; background: rgba(255,255,255,0.08) !important; }
  .btn-outline:hover { background: #204E59 !important; color: #fff !important; }
  .dest-card:hover { transform: translateY(-4px); box-shadow: 0 8px 32px rgba(0,0,0,0.13) !important; }
  .dest-cta-btn:hover { background: #204E59 !important; color: #fff !important; }
  .exp-card:hover { border-color: #c8a96e !important; background: #fdf9f3 !important; transform: translateY(-2px); }
  @media (max-width: 900px) {
    .how-grid { grid-template-columns: 1fr !important; }
    .trust-grid { grid-template-columns: 1fr !important; }
  }
  @media (max-width: 768px) {
    .how-card { border-right: none !important; border-bottom: 1px solid #ece9e2; }
  }
`;

export default Home;