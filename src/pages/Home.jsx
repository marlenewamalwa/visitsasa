import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import PackageCard from "../components/PackageCard";
import { Link } from "react-router-dom";
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
  },
  {
    name: "Diani Beach",
    tag: "Coastal Escape",
    desc: "Pristine white sands and turquoise waters of the Indian Ocean.",
    img: coastal,
  },
  {
    name: "Naivasha",
    tag: "Lake & Highlands",
    desc: "Flamingo-filled shores, Hell's Gate, and fresh highland air.",
    img: vasha,
  },
];

const STATS = [
  { value: "50+", label: "Curated Packages" },
  { value: "12K+", label: "Happy Travellers" },
  { value: "30+", label: "Destinations" },
  { value: "8 Yrs", label: "Of Experience" },
];

const WHY = [
  {
    title: "Local Expertise",
    body: "Our guides are born and bred Kenyans who know every trail, lodge, and hidden gem the country has to offer.",
  },
  {
    title: "Flexible Itineraries",
    body: "Whether you have 3 days or 3 weeks, we build a trip that fits your pace, budget, and travel style.",
  },
  {
    title: "Sustainable Travel",
    body: "We partner only with eco-certified lodges and community conservancies to protect Kenya's wilderness.",
  },
];

function Home() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      const { data, error } = await supabase.from("packages").select("*").limit(3);
      if (error) console.error(error);
      else setPackages(data);
      setLoading(false);
    };
    fetchPackages();
  }, []);

  return (
    <div style={styles.page}>
      <style>{css}</style>

      {/* ── HERO ── */}
      <section style={styles.hero}>
       <img src={heroBg} alt="Hero" style={styles.heroBg} />
        <div style={styles.heroOverlay} />
        <div style={styles.heroContent}>
          <span style={styles.heroEyebrow}>Discover East Africa</span>
          <h1 style={styles.heroTitle}>
            Kenya's Most<br />Extraordinary<br />Journeys
          </h1>
          <p style={styles.heroSub}>
            Handpicked safaris, coastal retreats, and highland adventures —<br />
            crafted for travellers who want more than a holiday.
          </p>
          <div style={styles.heroActions}>
            <Link to="/packages" style={styles.ctaPrimary} className="btn-primary">
              Browse Packages
            </Link>
            <Link to="/howitworks" style={styles.ctaSecondary} className="btn-secondary">
              How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section style={styles.statsBar}>
        {STATS.map((s) => (
          <div key={s.label} style={styles.statItem}>
            <span style={styles.statValue}>{s.value}</span>
            <span style={styles.statLabel}>{s.label}</span>
          </div>
        ))}
      </section>

      {/* ── FEATURED PACKAGES ── */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <span style={styles.sectionTag}>Handpicked For You</span>
          <h2 style={styles.sectionTitle}>Featured Packages</h2>
          <p style={styles.sectionDesc}>
            A selection of our most-loved trips, ready to book today.
          </p>
        </div>
        {loading ? (
          <div style={styles.loadingRow}>
            {[1, 2, 3].map((n) => (
              <div key={n} style={styles.skeleton} className="skeleton" />
            ))}
          </div>
        ) : packages.length === 0 ? (
          <p style={{ color: "#888", textAlign: "center" }}>No packages available at the moment.</p>
        ) : (
          <div style={styles.grid}>
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        )}
        <div style={{ textAlign: "center", marginTop: 36 }}>
          <Link to="/packages" style={styles.outlineBtn} className="btn-outline">
            View All Packages
          </Link>
        </div>
      </section>

      {/* ── TOP DESTINATIONS ── */}
      <section style={{ ...styles.section, backgroundColor: "#f7f4ef" }}>
        <div style={styles.sectionHeader}>
          <span style={styles.sectionTag}>Where To Go</span>
          <h2 style={styles.sectionTitle}>Top Destinations</h2>
          <p style={styles.sectionDesc}>
            From savannah to shoreline — Kenya holds an entire world within its borders.
          </p>
        </div>
        <div style={styles.destGrid}>
          {DESTINATIONS.map((d) => (
            <div key={d.name} style={styles.destCard} className="dest-card">
              <img src={d.img} alt={d.name} style={styles.destImg} />
              <div style={styles.destInfo}>
                <span style={styles.destTag}>{d.tag}</span>
                <h3 style={styles.destName}>{d.name}</h3>
                <p style={styles.destDesc}>{d.desc}</p>
               <Link to={`/destinations?location=${encodeURIComponent(d.name)}`} style={styles.destLink}>Explore &rarr;</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY US ── */}
      <section style={styles.section}>
        <div style={styles.whyGrid}>
          <div style={styles.whyLeft}>
            <span style={styles.sectionTag}>Why Travel With Us</span>
            <h2 style={{ ...styles.sectionTitle, textAlign: "left", marginBottom: 16 }}>
              We Know Kenya<br />Like No One Else
            </h2>
            <p style={{ color: "#666", lineHeight: 1.75, maxWidth: 400 }}>
              From the red dust of Tsavo to the coral reefs of Watamu, we've spent years
              building relationships with the people and places that make Kenya special.
            </p>
          </div>
          <div style={styles.whyRight}>
            {WHY.map((w, i) => (
              <div key={w.title} style={styles.whyCard} className="why-card">
                <span style={styles.whyNum}>0{i + 1}</span>
                <div>
                  <h4 style={styles.whyTitle}>{w.title}</h4>
                  <p style={styles.whyBody}>{w.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={styles.ctaBanner}>
        <img src={ctabanner} alt="cta" style={styles.ctaBannerBg} />
        <div style={styles.ctaBannerOverlay} />
        <div style={styles.ctaBannerContent}>
          <h2 style={styles.ctaBannerTitle}>Ready to Start Your Journey?</h2>
          <p style={styles.ctaBannerSub}>
            Tell us your dream trip and we'll build the perfect itinerary.
          </p>
          <Link to="/contact" style={styles.ctaPrimary} className="btn-primary">
            Get In Touch
          </Link>
        </div>
      </section>
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

  /* Hero */
  hero: {
    position: "relative",
    minHeight: 680,
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
    backgroundColor: "rgba(10, 25, 18, 0.62)",
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
  },
  ctaPrimary: {
    display: "inline-block",
    padding: "14px 32px",
    backgroundColor: "#c8a96e",
    color: "#fff",
    textDecoration: "none",
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

  /* Stats */
  statsBar: {
    display: "flex",
    justifyContent: "center",
    gap: 0,
    borderBottom: "1px solid #e8e4de",
    flexWrap: "wrap",
  },
  statItem: {
    padding: "32px 48px",
    textAlign: "center",
    borderRight: "1px solid #e8e4de",
    flex: "1 1 160px",
  },
  statValue: {
    display: "block",
    fontSize: 34,
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

  /* Sections */
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

  /* Packages grid */
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 28,
    marginTop: 8,
  },

  /* Skeleton loader */
  loadingRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 28,
  },
  skeleton: {
    height: 320,
    borderRadius: 4,
    backgroundColor: "#ece9e2",
  },

  /* Destinations */
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
  destImg: {
    width: "100%",
    height: 220,
    objectFit: "cover",
    display: "block",
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
  destLink: {
    fontSize: 13,
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 600,
    color: "#1a2f2a",
    textDecoration: "none",
    letterSpacing: "0.04em",
    borderBottom: "1px solid #1a2f2a",
    paddingBottom: 2,
  },

  /* Why us */
  whyGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1.4fr",
    gap: 80,
    alignItems: "center",
  },
  whyLeft: {},
  whyRight: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  whyCard: {
    display: "flex",
    gap: 24,
    alignItems: "flex-start",
    padding: "28px 0",
    borderBottom: "1px solid #ece9e2",
    transition: "padding-left 0.2s",
  },
  whyNum: {
    fontSize: 11,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#c8a96e",
    letterSpacing: "0.1em",
    minWidth: 28,
    paddingTop: 3,
  },
  whyTitle: {
    fontSize: 17,
    fontWeight: 400,
    margin: "0 0 8px",
    letterSpacing: "-0.01em",
  },
  whyBody: {
    fontSize: 14,
    color: "#666",
    fontFamily: "'Helvetica Neue', sans-serif",
    lineHeight: 1.7,
    margin: 0,
  },

  /* Outline button */
  outlineBtn: {
    display: "inline-block",
    padding: "12px 28px",
    border: "1px solid #1a2f2a",
    color: "#1a2f2a",
    textDecoration: "none",
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 600,
    fontSize: 13,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    transition: "background 0.2s, color 0.2s",
  },

  /* CTA Banner */
  ctaBanner: {
    position: "relative",
    minHeight: 300,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    margin: "0",
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
    backgroundColor: "rgba(8, 22, 14, 0.7)",
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
  .btn-secondary:hover { border-color: #fff !important; background: rgba(255,255,255,0.08) !important; }
  .btn-outline:hover { background: #1a2f2a !important; color: #fff !important; }
  .dest-card:hover { transform: translateY(-4px); box-shadow: 0 8px 32px rgba(0,0,0,0.13) !important; }
  .why-card:hover { padding-left: 8px; }
  .skeleton { animation: pulse 1.5s ease-in-out infinite; }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.45; }
  }
  @media (max-width: 768px) {
    .why-grid { grid-template-columns: 1fr !important; }
  }
`;

export default Home;