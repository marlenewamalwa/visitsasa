import React from "react";
import { Link } from "react-router-dom";
import aboutBg from "../assets/nairobi3.jpg";
const VALUES = [
  {
    num: "01",
    title: "Local Knowledge",
    body: "Every itinerary is built by people who live, breathe, and love Kenya. We know the hidden trails, the best sundowner spots, and the lodges that genuinely support the land.",
  },
  {
    num: "02",
    title: "Transparent Pricing",
    body: "No hidden fees, no last-minute surprises. The price you see is the price you pay — with a clear breakdown of exactly what's included.",
  },
  {
    num: "03",
    title: "Sustainable Travel",
    body: "We partner only with eco-certified operators and community conservancies. A portion of every booking goes directly to wildlife conservation and local communities.",
  },
  {
    num: "04",
    title: "End-to-End Support",
    body: "From your first enquiry to your final transfer home, our team is reachable by phone, email, and WhatsApp — 7 days a week.",
  },
];


const STATS = [
  { value: "2016", label: "Founded" },
  { value: "12K+", label: "Travellers Hosted" },
  { value: "50+", label: "Active Packages" },
  { value: "30+", label: "Partner Lodges" },
];

function About() {
  return (
    <div style={styles.page}>
      <style>{css}</style>

      {/* Hero */}
      <section style={styles.hero}>
         <img src={aboutBg} alt="Hero" style={styles.heroBg} />
        <div style={styles.heroOverlay} />
        <div style={styles.heroContent}>
          <span style={styles.eyebrow}>Who We Are</span>
          <h1 style={styles.heroTitle}>Built by Kenyans,<br />for the World</h1>
          <p style={styles.heroSub}>
            Visit Sasa is a Nairobi-based travel company dedicated to connecting
            curious travellers with Kenya's most extraordinary landscapes, cultures,
            and wildlife — responsibly and authentically.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section style={styles.missionSection}>
        <div style={styles.missionLeft}>
          <span style={styles.sectionTag}>Our Mission</span>
          <h2 style={styles.sectionTitle}>Making Kenya Accessible<br />to Every Traveller</h2>
        </div>
        <div style={styles.missionRight}>
          <p style={styles.missionBody}>
            Kenya holds some of the most diverse and breathtaking ecosystems on the planet
            — yet for many travellers, getting there feels complicated and uncertain.
          </p>
          <p style={styles.missionBody}>
            Our mission is simple: remove the friction. We connect travellers directly with
            trusted local guides, curate packages that suit every budget and pace, and make
            the entire booking process transparent and stress-free.
          </p>
          <p style={styles.missionBody}>
            Whether you're after a solo bush escape, a family beach holiday, or a once-in-a-
            lifetime Migration safari — we build it around you.
          </p>
        </div>
      </section>

      <div style={styles.fullDivider} />

      {/* Values */}
      <section style={styles.valuesSection}>
        <div style={styles.valuesSectionHeader}>
          <span style={styles.sectionTag}>What We Stand For</span>
          <h2 style={{ ...styles.sectionTitle, textAlign: "center" }}>Our Values</h2>
        </div>
        <div style={styles.valuesGrid}>
          {VALUES.map(v => (
            <div key={v.num} style={styles.valueCard} className="value-card">
              <span style={styles.valueNum}>{v.num}</span>
              <h3 style={styles.valueTitle}>{v.title}</h3>
              <p style={styles.valueBody}>{v.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "'Georgia', 'Times New Roman', serif",
    color: "#1a1a1a",
    backgroundColor: "#fff",
    minHeight: "100vh",
  },

  /* Hero */
  hero: {
    position: "relative",
    minHeight: 500,
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
  },
  heroOverlay: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(8,22,14,0.65)",
  },
  heroContent: {
    position: "relative",
    zIndex: 2,
    maxWidth: 720,
    margin: "0 auto",
    padding: "80px 24px",
    textAlign: "center",
  },
  eyebrow: {
    display: "inline-block",
    fontSize: 11,
    fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "#c8a96e",
    marginBottom: 20,
    borderBottom: "1px solid #c8a96e",
    paddingBottom: 6,
  },
  heroTitle: {
    fontSize: "clamp(36px, 6vw, 68px)",
    fontWeight: 400,
    color: "#fff",
    lineHeight: 1.08,
    letterSpacing: "-0.02em",
    margin: "0 0 22px",
  },
  heroSub: {
    fontSize: 17,
    color: "rgba(255,255,255,0.76)",
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 300,
    lineHeight: 1.7,
  },

  /* Stats */
  statsBar: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    borderBottom: "1px solid #ece9e2",
  },
  statItem: {
    padding: "32px 52px",
    borderRight: "1px solid #ece9e2",
    textAlign: "center",
    flex: "1 1 160px",
  },
  statValue: {
    display: "block",
    fontSize: 36,
    fontWeight: 400,
    color: "#1a2f2a",
    letterSpacing: "-0.02em",
    lineHeight: 1.1,
  },
  statLabel: {
    display: "block",
    fontSize: 11,
    fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#888",
    marginTop: 4,
  },

  /* Mission */
  missionSection: {
    display: "grid",
    gridTemplateColumns: "1fr 1.5fr",
    gap: 80,
    maxWidth: 1100,
    margin: "0 auto",
    padding: "80px 24px",
    alignItems: "start",
  },
  missionLeft: {},
  missionRight: {},
  sectionTag: {
    display: "inline-block",
    fontSize: 11,
    fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: "#c8a96e",
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: "clamp(26px, 3.5vw, 40px)",
    fontWeight: 400,
    letterSpacing: "-0.02em",
    lineHeight: 1.15,
    margin: "0 0 16px",
  },
  missionBody: {
    fontSize: 15,
    color: "#555",
    fontFamily: "'Helvetica Neue', sans-serif",
    lineHeight: 1.8,
    margin: "0 0 18px",
  },

  fullDivider: {
    borderTop: "1px solid #ece9e2",
    maxWidth: 1100,
    margin: "0 auto",
  },

  /* Values */
  valuesSection: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "72px 24px",
  },
  valuesSectionHeader: {
    textAlign: "center",
    marginBottom: 52,
  },
  valuesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 2,
  },
  valueCard: {
    padding: "32px 28px",
    backgroundColor: "#fafaf8",
    border: "1px solid #ece9e2",
    transition: "border-color 0.2s, transform 0.2s",
  },
  valueNum: {
    display: "block",
    fontSize: 11,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#c8a96e",
    letterSpacing: "0.12em",
    marginBottom: 14,
  },
  valueTitle: {
    fontSize: 18,
    fontWeight: 400,
    margin: "0 0 12px",
    letterSpacing: "-0.01em",
  },
  valueBody: {
    fontSize: 13,
    color: "#666",
    fontFamily: "'Helvetica Neue', sans-serif",
    lineHeight: 1.72,
    margin: 0,
  },

  /* Team */
  teamSection: {
    backgroundColor: "#f7f4ef",
    padding: "80px 24px",
  },
  teamHeader: {
    textAlign: "center",
    maxWidth: 560,
    margin: "0 auto 52px",
  },
  teamDesc: {
    fontSize: 15,
    color: "#666",
    fontFamily: "'Helvetica Neue', sans-serif",
    lineHeight: 1.7,
    margin: 0,
  },
  teamGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 28,
    maxWidth: 1000,
    margin: "0 auto",
  },
  memberCard: {
    backgroundColor: "#fff",
    overflow: "hidden",
    boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
    transition: "transform 0.25s, box-shadow 0.25s",
  },
  memberImg: {
    width: "100%",
    height: 200,
    objectFit: "cover",
    display: "block",
  },
  memberInfo: {
    padding: "22px 24px 28px",
  },
  memberRole: {
    display: "block",
    fontSize: 10,
    fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "#c8a96e",
    marginBottom: 6,
  },
  memberName: {
    fontSize: 20,
    fontWeight: 400,
    margin: "0 0 10px",
    letterSpacing: "-0.01em",
  },
  memberBio: {
    fontSize: 13,
    color: "#666",
    fontFamily: "'Helvetica Neue', sans-serif",
    lineHeight: 1.68,
    margin: 0,
  },

  /* Story strip */
  storyStrip: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    maxWidth: "100%",
    minHeight: 480,
  },
  storyImgWrap: {
    overflow: "hidden",
  },
  storyImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  storyText: {
    padding: "72px 64px",
    backgroundColor: "#1a2f2a",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  storyBody: {
    fontSize: 15,
    color: "rgba(255,255,255,0.72)",
    fontFamily: "'Helvetica Neue', sans-serif",
    lineHeight: 1.8,
    margin: "0 0 18px",
  },
  storyBtn: {
    display: "inline-block",
    marginTop: 8,
    padding: "12px 28px",
    backgroundColor: "#c8a96e",
    color: "#fff",
    textDecoration: "none",
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 600,
    fontSize: 12,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    alignSelf: "flex-start",
    transition: "background 0.2s",
  },
};

const css = `
  .value-card:hover { border-color: #c8a96e !important; transform: translateY(-2px); }
  .member-card:hover { transform: translateY(-4px); box-shadow: 0 10px 32px rgba(0,0,0,0.11) !important; }
  .story-btn:hover { background-color: #b8954f !important; }
  @media (max-width: 768px) {
    .mission-grid, .story-strip { grid-template-columns: 1fr !important; }
    .story-text { padding: 40px 28px !important; }
  }
`;

export default About;