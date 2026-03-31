import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import TripWizard from "../components/TripWizard";
import heroBg from "../assets/sunset3.jpg";

/* ── SVG ICON COMPONENT ── */
function Icon({ d, size = 20, stroke = "currentColor", strokeWidth = 1.5, style = {} }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0, display: "block", ...style }}
    >
      {Array.isArray(d)
        ? d.map((path, i) => <path key={i} d={path} />)
        : <path d={d} />}
    </svg>
  );
}

/* ── ICON PATHS ── */
const ICONS = {
  // Check / highlight tick
  check: "M20 6L9 17l-5-5",
  // Arrow right
  arrowRight: "M5 12h14M12 5l7 7-7 7",
  // Scroll down chevron
  chevronDown: "M6 9l6 6 6-6",
  // Map pin
  pin: ["M12 2C8.7 2 6 4.7 6 8c0 5 6 14 6 14s6-9 6-14c0-3.3-2.7-6-6-6z", "M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"],
  // Clock
  clock: "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM12 6v6l4 2",
  // Globe / region
  globe: ["M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z", "M2 12h20", "M12 2a15 15 0 0 1 0 20A15 15 0 0 1 12 2z"],
  // Calendar / season
  calendar: ["M3 4h18v18H3z", "M16 2v4M8 2v4", "M3 10h18"],
  // Plus
  plus: "M12 5v14M5 12h14",
  // Expand (chevrons)
  expand: "M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7",
  collapse: "M4 14h6v6M14 4h6v6M4 14l7-7M14 10l7-7",
  // Region icons
  Savannah: "M3 20l5-9 2.5 4L14 6l4 5 3 9H3z",
  Coast: "M2 12c2-3 4-3 6 0s4 3 6 0 4-3 6 0M2 17c2-3 4-3 6 0s4 3 6 0 4-3 6 0",
  Highlands: ["M3 20l5-8 2 3 4-9 4 6 3-3 3 11H3z", "M12 3v2"],
  Northern: ["M12 2C8.7 2 6 4.7 6 8c0 5 6 14 6 14s6-9 6-14c0-3.3-2.7-6-6-6z", "M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"],
  Lakes: ["M2 14c2.5-4 7-5 10-2s8 3 10-1", "M2 19c2.5-4 7-5 10-2s8 3 10-1", "M12 2C10 6 8 9 8 11a4 4 0 0 0 8 0c0-2-2-5-4-9z"],
};

const REGIONS = ["All", "Savannah", "Coast", "Highlands", "Northern", "Lakes"];

const SEASON_COLOR = {
  "Year-round": "#1b4d20",
  "Jun–Oct":    "#8b3a00",
  "Jul–Sep":    "#8b0000",
  "Oct–Apr":    "#0d4f8a",
  "Dec–Mar":    "#4a1060",
};

/* ── PLACEHOLDER IMAGES ──
   Replace these URLs with your own. One per destination region + hero.
   For per-destination images, add an image_url column in Supabase —
   the card will use it automatically and fall back to the region image.
*/
const IMAGES = {
  hero:     heroBg,
  Savannah:  "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=900&q=75&fit=crop",
  Coast:     "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=900&q=75&fit=crop",
  Highlands: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=75&fit=crop",
  Northern:  "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=900&q=75&fit=crop",
  Lakes:     "https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=900&q=75&fit=crop",
  fallback:  "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=900&q=75&fit=crop",
};

function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [activeRegion, setActiveRegion] = useState("All");
  const [expanded, setExpanded]         = useState(null);
  const [wizardOpen, setWizardOpen]     = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase
        .from("destinations")
        .select("*")
        .order("name");
      if (!error) setDestinations(data || []);
      setLoading(false);
    };
    fetch();
  }, []);

  const filtered =
    activeRegion === "All"
      ? destinations
      : destinations.filter((d) => d.region === activeRegion);

  return (
    <div style={S.page}>
      <style>{css}</style>

      {/* ── HERO ── */}
      <section style={S.hero}>
        {/* Replace IMAGES.hero with your own photo */}
        <img
          src={IMAGES.hero}
          alt="Kenya landscape"
          style={S.heroBgImg}
        />
        <div style={S.heroOverlay} />
        <div style={S.heroContent}>
          <span style={S.eyebrow}>Where Will You Go?</span>
          <h1 style={S.heroTitle}>Kenya's Most<br />Remarkable Places</h1>
          <p style={S.heroSub}>
            From the sun-scorched plains of the north to the coral-fringed coast —
            every corner of Kenya holds something extraordinary.
          </p>
          <button style={S.heroCta} className="btn-gold" onClick={() => setWizardOpen(true)}>
            <span>Build My Trip</span>
            <Icon d={ICONS.arrowRight} size={14} stroke="#fff" strokeWidth={2} style={{ marginLeft: 10 }} />
          </button>
        </div>

      </section>

      {/* ── REGION FILTERS ── */}
      <div style={S.filterBar}>
        <div style={S.filterInner}>
          <span style={S.filterLabel}>Filter by region</span>
          <div style={S.filterPills}>
            {REGIONS.map((r) => {
              const active = activeRegion === r;
              return (
                <button
                  key={r}
                  style={{ ...S.pill, ...(active ? S.pillActive : {}) }}
                  className={active ? "pill-active" : "pill"}
                  onClick={() => { setActiveRegion(r); setExpanded(null); }}
                >
                  {ICONS[r] && (
                    <Icon
                      d={ICONS[r]}
                      size={12}
                      stroke={active ? "#fff" : "#888"}
                      strokeWidth={1.8}
                      style={{ marginRight: 6 }}
                    />
                  )}
                  {r}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── DESTINATIONS GRID ── */}
      <section style={S.section}>
        {loading ? (
          <div style={S.skeletonGrid}>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} style={S.skeleton} className="skeleton" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div style={S.empty}>
            <p>No destinations found for this region yet.</p>
          </div>
        ) : (
          <>
            <p style={S.resultCount}>
              {filtered.length} destination{filtered.length !== 1 ? "s" : ""}
              {activeRegion !== "All" ? ` in ${activeRegion}` : " across Kenya"}
            </p>
            <div style={S.grid}>
              {filtered.map((d) => (
                <DestCard
                  key={d.id}
                  dest={d}
                  expanded={expanded === d.id}
                  onToggle={() => setExpanded(expanded === d.id ? null : d.id)}
                  onWizard={() => setWizardOpen(true)}
                />
              ))}
            </div>
          </>
        )}
      </section>

      {/* ── BOTTOM CTA STRIP ── */}
      <section style={S.ctaStrip}>
        <div style={S.ctaStripInner}>
          <div>
            <h3 style={S.ctaTitle}>Can't decide? We'll help.</h3>
            <p style={S.ctaDesc}>
              Tell us your interests and let our team suggest the perfect combination of stops.
            </p>
          </div>
          <button style={S.ctaBtn} className="btn-gold" onClick={() => setWizardOpen(true)}>
            Start Your Trip Builder
            <Icon d={ICONS.arrowRight} size={13} stroke="#fff" strokeWidth={2} style={{ marginLeft: 10 }} />
          </button>
        </div>
      </section>

      {wizardOpen && <TripWizard onClose={() => setWizardOpen(false)} />}
    </div>
  );
}

function DestCard({ dest, expanded, onToggle, onWizard }) {
  const highlights  = Array.isArray(dest.highlights) ? dest.highlights : [];
  const seasonColor = SEASON_COLOR[dest.best_season] || "#555";

  /* Use per-destination image if available, otherwise fall back to region image */
  const cardImg = dest.image_url || IMAGES[dest.region] || IMAGES.fallback;

  return (
    <div style={S.card} className="dest-card">

      {/* Image */}
      <div style={S.cardImgWrap}>
        <img src={cardImg} alt={dest.name} style={S.cardImg} loading="lazy" />
        <div style={S.cardImgOverlay} />

        {/* Region badge */}
        <span style={S.regionBadge}>
          {ICONS[dest.region] && (
            <Icon
              d={ICONS[dest.region]}
              size={10}
              stroke="#c8a96e"
              strokeWidth={2}
              style={{ marginRight: 5 }}
            />
          )}
          {dest.region}
        </span>

        {/* Season badge */}
        {dest.best_season && (
          <span style={{ ...S.seasonBadge, backgroundColor: seasonColor }}>
            <Icon d={ICONS.calendar} size={10} stroke="rgba(255,255,255,0.85)" strokeWidth={1.8} style={{ marginRight: 5 }} />
            {dest.best_season}
          </span>
        )}
      </div>

      {/* Content */}
      <div style={S.cardBody}>
        <div style={S.cardTop}>
          <div>
            <span style={S.cardTag}>{dest.tag}</span>
            <h3 style={S.cardName}>{dest.name}</h3>
          </div>
          {dest.duration_days && (
            <span style={S.durationChip}>
              <Icon d={ICONS.clock} size={11} stroke="#888" strokeWidth={1.8} style={{ marginRight: 4 }} />
              {dest.duration_days}d
            </span>
          )}
        </div>

        <p style={S.cardDesc}>{dest.description}</p>

        {/* Highlights */}
        {highlights.length > 0 && (
          <div style={S.highlights}>
            {highlights.slice(0, expanded ? highlights.length : 3).map((h, i) => (
              <span key={i} style={S.highlight}>
                <Icon d={ICONS.check} size={11} stroke="#c8a96e" strokeWidth={2.5} style={{ marginRight: 8, flexShrink: 0 }} />
                {h}
              </span>
            ))}
          </div>
        )}

        <div style={S.cardActions}>
          {highlights.length > 3 && (
            <button style={S.expandBtn} className="expand-btn" onClick={onToggle}>
              <Icon
                d={expanded ? ICONS.chevronDown : ICONS.chevronDown}
                size={12}
                stroke="#888"
                strokeWidth={2}
                style={{ marginRight: 5, transform: expanded ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
              />
              {expanded ? "Show less" : `+${highlights.length - 3} more`}
            </button>
          )}
          <button style={S.addBtn} className="add-btn" onClick={onWizard}>
            <Icon d={ICONS.plus} size={13} stroke="#fff" strokeWidth={2.5} style={{ marginRight: 6 }} />
            Add to Trip
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── STYLES ── */
const S = {
  page: {
    fontFamily: "'Georgia', 'Times New Roman', serif",
    color: "#1a1a1a",
    backgroundColor: "#fff",
  },

  /* Hero */
  hero: {
    position: "relative",
    minHeight: 580,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  heroBgImg: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center 35%",
  },
  heroOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to bottom, rgba(8,20,12,0.5) 0%, rgba(8,20,12,0.7) 55%, rgba(8,20,12,0.88) 100%)",
  },
  heroContent: {
    position: "relative",
    zIndex: 2,
    textAlign: "center",
    padding: "80px 24px 80px",
    maxWidth: 700,
  },
  eyebrow: {
    display: "inline-block",
    fontSize: 11,
    fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "#c8a96e",
    marginBottom: 20,
    borderBottom: "1px solid rgba(200,169,110,0.4)",
    paddingBottom: 6,
  },
  heroTitle: {
    fontSize: "clamp(38px, 6vw, 72px)",
    fontWeight: 400,
    color: "#fff",
    lineHeight: 1.08,
    letterSpacing: "-0.02em",
    margin: "0 0 20px",
  },
  heroSub: {
    fontSize: 16,
    color: "rgba(255,255,255,0.7)",
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 300,
    lineHeight: 1.75,
    marginBottom: 36,
  },
  heroCta: {
    display: "inline-flex",
    alignItems: "center",
    padding: "13px 30px",
    backgroundColor: "#c8a96e",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 600,
    fontSize: 13,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    transition: "background 0.2s, transform 0.15s",
  },
  heroScroll: {
    position: "absolute",
    bottom: 28,
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
    zIndex: 2,
  },
  scrollLine: {
    display: "block",
    width: 1,
    height: 28,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  scrollLabel: {
    fontSize: 10,
    fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.35)",
    marginTop: 2,
  },

  /* Filter bar */
  filterBar: {
    borderBottom: "1px solid #ece9e2",
    backgroundColor: "#faf9f7",
    position: "sticky",
    top: 0,
    zIndex: 50,
  },
  filterInner: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "14px 24px",
    display: "flex",
    alignItems: "center",
    gap: 20,
    flexWrap: "wrap",
  },
  filterLabel: {
    fontSize: 11,
    fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#aaa",
    whiteSpace: "nowrap",
  },
  filterPills: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
  },
  pill: {
    display: "inline-flex",
    alignItems: "center",
    padding: "7px 16px",
    border: "1px solid #ddd8d0",
    backgroundColor: "#fff",
    cursor: "pointer",
    fontSize: 12,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#555",
    letterSpacing: "0.04em",
    transition: "all 0.18s",
  },
  pillActive: {
    backgroundColor: "#204E59",
    borderColor: "#204E59",
    color: "#fff",
  },

  /* Section */
  section: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "52px 24px 80px",
  },
  resultCount: {
    fontSize: 13,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#aaa",
    letterSpacing: "0.04em",
    marginBottom: 28,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: 28,
  },
  skeletonGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: 28,
  },
  skeleton: {
    height: 440,
    backgroundColor: "#ece9e2",
    borderRadius: 2,
  },
  empty: {
    textAlign: "center",
    padding: "80px 0",
    color: "#aaa",
    fontFamily: "'Helvetica Neue', sans-serif",
    fontSize: 15,
  },

  /* Card */
  card: {
    backgroundColor: "#fff",
    border: "1px solid #ece9e2",
    overflow: "hidden",
    transition: "transform 0.25s, box-shadow 0.25s",
    display: "flex",
    flexDirection: "column",
  },
  cardImgWrap: {
    position: "relative",
    height: 230,
    overflow: "hidden",
    flexShrink: 0,
  },
  cardImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    transition: "transform 0.4s ease",
  },
  cardImgOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "45%",
    background: "linear-gradient(to top, rgba(0,0,0,0.38), transparent)",
  },
  regionBadge: {
    position: "absolute",
    top: 14,
    left: 14,
    display: "inline-flex",
    alignItems: "center",
    backgroundColor: "rgba(20,40,30,0.82)",
    color: "#c8a96e",
    fontSize: 10,
    fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    padding: "5px 10px",
    backdropFilter: "blur(4px)",
  },
  seasonBadge: {
    position: "absolute",
    top: 14,
    right: 14,
    display: "inline-flex",
    alignItems: "center",
    color: "#fff",
    fontSize: 10,
    fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.08em",
    padding: "5px 10px",
  },

  cardBody: {
    padding: "24px 24px 28px",
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  cardTag: {
    display: "block",
    fontSize: 10,
    fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "#c8a96e",
    marginBottom: 6,
  },
  cardName: {
    fontSize: 22,
    fontWeight: 400,
    margin: 0,
    letterSpacing: "-0.01em",
    lineHeight: 1.2,
  },
  durationChip: {
    display: "inline-flex",
    alignItems: "center",
    fontSize: 12,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#888",
    backgroundColor: "#f0ede7",
    padding: "4px 10px",
    whiteSpace: "nowrap",
    marginLeft: 12,
    marginTop: 4,
  },
  cardDesc: {
    fontSize: 14,
    color: "#666",
    fontFamily: "'Helvetica Neue', sans-serif",
    lineHeight: 1.7,
    margin: "0 0 16px",
  },

  highlights: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginBottom: 20,
  },
  highlight: {
    display: "flex",
    alignItems: "flex-start",
    fontSize: 13,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#444",
    letterSpacing: "0.02em",
    lineHeight: 1.4,
  },

  cardActions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "auto",
    paddingTop: 14,
    borderTop: "1px solid #f0ede7",
  },
  expandBtn: {
    display: "inline-flex",
    alignItems: "center",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: 12,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#888",
    letterSpacing: "0.04em",
    padding: 0,
    transition: "color 0.15s",
  },
  addBtn: {
    display: "inline-flex",
    alignItems: "center",
    padding: "9px 18px",
    backgroundColor: "#204E59",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontSize: 12,
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    transition: "background 0.2s",
    marginLeft: "auto",
  },

  /* Bottom CTA strip */
  ctaStrip: {
    backgroundColor: "#f7f4ef",
    borderTop: "1px solid #ece9e2",
  },
  ctaStripInner: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "48px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 32,
    flexWrap: "wrap",
  },
  ctaTitle: {
    fontSize: 22,
    fontWeight: 400,
    margin: "0 0 8px",
    letterSpacing: "-0.01em",
  },
  ctaDesc: {
    fontSize: 14,
    color: "#666",
    fontFamily: "'Helvetica Neue', sans-serif",
    margin: 0,
    lineHeight: 1.6,
  },
  ctaBtn: {
    display: "inline-flex",
    alignItems: "center",
    padding: "13px 28px",
    backgroundColor: "#c8a96e",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 600,
    fontSize: 13,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
    transition: "background 0.2s, transform 0.15s",
  },
};

const css = `
  .btn-gold:hover { background-color: #b8954f !important; transform: translateY(-1px); }
  .pill:hover { border-color: #204E59 !important; color: #204E59 !important; }
  .pill:hover svg { stroke: #204E59 !important; }
  .dest-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.1) !important; }
  .dest-card:hover img { transform: scale(1.04); }
  .add-btn:hover { background-color: #c8a96e !important; }
  .expand-btn:hover { color: #204E59 !important; }
  .expand-btn:hover svg { stroke: #204E59 !important; }
  .skeleton { animation: pulse 1.5s ease-in-out infinite; }
  @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.45; } }
  @media (max-width: 640px) {
    .filter-inner { flex-direction: column; align-items: flex-start; }
    .cta-strip-inner { flex-direction: column; }
  }
`;

export default Destinations;