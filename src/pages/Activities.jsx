import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import TripWizard from "../components/TripWizard";
import heroBg from "../assets/lamu.jpg";

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
  // Wildlife — paw
  Wildlife: "M12 16c-2.5 0-5-2-5-5s1.5-5 5-5 5 2 5 5-2.5 5-5 5zM7.5 7.5c.5-1 1.5-1.5 2.5-1s1.5 1.5 1 2.5-1.5 1.5-2.5 1-1.5-1.5-1-3zM14.5 6.5c.5-1 1.5-1.5 2.5-1s1.5 1.5 1 2.5-1.5 1.5-2.5 1-1.5-1.5-1-3zM5 11c0-1 .5-2 1.5-2s2 1 2 2-.5 2-1.5 2-2-.9-2-2zM17 10.5c0-1 .5-2 1.5-2s2 1 2 2-.5 2-1.5 2-2-.9-2-2z",
  // Water — waves
  Water: "M2 12c2-3 4-3 6 0s4 3 6 0 4-3 6 0M2 17c2-3 4-3 6 0s4 3 6 0 4-3 6 0M2 7c2-3 4-3 6 0s4 3 6 0 4-3 6 0",
  // Culture — arch/columns
  Culture: ["M3 21h18M6 21V10M18 21V10M12 21V10M3 10l9-7 9 7", "M9 21v-5h6v5"],
  // Adventure — mountain
  Adventure: "M3 20l5-9 2.5 4L14 6l4 5 3 9H3z",
  // Wellness — leaf/lotus
  Wellness: ["M12 22V12", "M12 12C12 7 7 3 3 3c0 5 3 9 9 9z", "M12 12c0-5 5-9 9-9-1 5-4 9-9 9"],
  // Clock (duration)
  clock: "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM12 6v6l4 2",
  // Zap (difficulty)
  zap: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  // Calendar (season)
  calendar: ["M3 4h18v18H3zM16 2v4M8 2v4M3 10h18"],
  // Pin (location)
  pin: ["M12 2C8.7 2 6 4.7 6 8c0 5 6 14 6 14s6-9 6-14c0-3.3-2.7-6-6-6z", "M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"],
  // Plus
  plus: "M12 5v14M5 12h14",
  // Arrow right
  arrowRight: "M5 12h14M12 5l7 7-7 7",
  // Check circle
  checkCircle: "M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01l-3-3",
};

const CATEGORIES = ["All", "Wildlife", "Water", "Culture", "Adventure", "Wellness"];

const CATEGORY_META = {
  Wildlife:  { color: "#6b3a1f", bg: "#fdf6ee", imgQuery: "wildlife-safari-kenya"  },
  Water:     { color: "#0d4f8a", bg: "#eef4fd", imgQuery: "ocean-beach-kenya"      },
  Culture:   { color: "#4a1060", bg: "#f5eeff", imgQuery: "african-culture-tribe"  },
  Adventure: { color: "#1b4d20", bg: "#eef7ee", imgQuery: "mountain-hiking-kenya"  },
  Wellness:  { color: "#004d45", bg: "#eef7f6", imgQuery: "spa-wellness-nature"    },
};

/* ── PLACEHOLDER IMAGES ──
   Replace these URLs with your own images.
   Format: unsplash.com/photos/{id}/download?w={width}
*/
const IMAGES = {
  hero: heroBg,
  // Category card headers — replace each with a relevant photo
  Wildlife:  "https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=800&q=75&fit=crop",
  Water:     "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=75&fit=crop",
  Culture:   "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=75&fit=crop",
  Adventure: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=75&fit=crop",
  Wellness:  "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=75&fit=crop",
};

function Activities() {
  const [activities, setActivities]     = useState([]);
  const [loading, setLoading]           = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [wizardOpen, setWizardOpen]     = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase
        .from("activities")
        .select("*")
        .order("category")
        .order("name");
      if (!error) setActivities(data || []);
      setLoading(false);
    };
    fetch();
  }, []);

  const filtered =
    activeCategory === "All"
      ? activities
      : activities.filter((a) => a.category === activeCategory);

  const grouped = CATEGORIES.filter((c) => c !== "All").reduce((acc, cat) => {
    const items = filtered.filter((a) => a.category === cat);
    if (items.length) acc[cat] = items;
    return acc;
  }, {});

  return (
    <div style={S.page}>
      <style>{css}</style>

      {/* ── HERO ── */}
      <section style={S.hero}>
        {/* Replace IMAGES.hero with your own photo */}
        <img
          src={IMAGES.hero}
          alt="Kenya safari landscape"
          style={S.heroBgImg}
        />
        <div style={S.heroOverlay} />

        <div style={S.heroContent}>
          <span style={S.eyebrow}>Make It Yours</span>
          <h1 style={S.heroTitle}>
            Every Experience<br />You Could Want
          </h1>
          <p style={S.heroSub}>
            From dawn game drives to moonlit dhow cruises — hand-pick the moments
            that will define your Kenya journey.
          </p>
          <button style={S.heroCta} className="btn-gold" onClick={() => setWizardOpen(true)}>
            <span>Add Activities to My Trip</span>
            <Icon d={ICONS.arrowRight} size={14} stroke="#fff" strokeWidth={2} style={{ marginLeft: 10 }} />
          </button>
        </div>

        {/* Category pills */}
        <div style={S.heroPills}>
          {Object.entries(CATEGORY_META).map(([cat]) => (
            <button
              key={cat}
              style={S.heroPill}
              className="hero-pill"
              onClick={() => {
                setActiveCategory(cat);
                document.getElementById("activities-main")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Icon d={ICONS[cat]} size={13} stroke="rgba(255,255,255,0.7)" strokeWidth={1.5} style={{ marginRight: 6 }} />
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ── CATEGORY FILTER ── */}
      <div style={S.filterBar}>
        <div style={S.filterInner}>
          <span style={S.filterLabel}>Browse by</span>
          <div style={S.filterPills}>
            {CATEGORIES.map((c) => {
              const meta = CATEGORY_META[c];
              const active = activeCategory === c;
              return (
                <button
                  key={c}
                  style={{
                    ...S.pill,
                    ...(active ? S.pillActive : {}),
                    ...(active && meta ? { backgroundColor: meta.color, borderColor: meta.color } : {}),
                  }}
                  className={active ? "pill-active" : "pill"}
                  onClick={() => setActiveCategory(c)}
                >
                  {meta && (
                    <Icon
                      d={ICONS[c]}
                      size={12}
                      stroke={active ? "#fff" : "#888"}
                      strokeWidth={1.8}
                      style={{ marginRight: 6 }}
                    />
                  )}
                  {c}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div id="activities-main" style={S.main}>
        {loading ? (
          <div style={S.skeletonGrid}>
            {[1,2,3,4,5,6,7,8].map((n) => (
              <div key={n} style={S.skeleton} className="skeleton" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div style={S.empty}>
            <p>No activities found in this category yet.</p>
          </div>
        ) : activeCategory !== "All" ? (
          <section style={S.catSection}>
            <CategoryHeader cat={activeCategory} count={filtered.length} />
            <div style={S.actGrid}>
              {filtered.map((a) => (
                <ActivityCard key={a.id} activity={a} onWizard={() => setWizardOpen(true)} />
              ))}
            </div>
          </section>
        ) : (
          Object.entries(grouped).map(([cat, items]) => (
            <section key={cat} style={S.catSection}>
              <CategoryHeader cat={cat} count={items.length} />
              <div style={S.actGrid}>
                {items.map((a) => (
                  <ActivityCard key={a.id} activity={a} onWizard={() => setWizardOpen(true)} />
                ))}
              </div>
            </section>
          ))
        )}
      </div>

      {/* ── BOTTOM BANNER ── */}
      <section style={S.bottomBanner}>
        {/* Replace with your own banner image */}
        <img
          src="https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1600&q=80&fit=crop"
          alt="Kenya landscape at sunset"
          style={S.bannerBgImg}
        />
        <div style={S.bannerOverlay} />
        <div style={S.bannerInner}>
          <div style={S.bannerLeft}>
            <h3 style={S.bannerTitle}>Mix & Match Your Perfect Day</h3>
            <p style={S.bannerDesc}>
              Morning game drive, afternoon sundowner, evening cultural feast —
              our team will sequence your chosen activities into a seamless itinerary.
            </p>
          </div>
          <button style={S.bannerBtn} className="btn-gold" onClick={() => setWizardOpen(true)}>
            Build My Itinerary
          </button>
        </div>
      </section>

      {wizardOpen && <TripWizard onClose={() => setWizardOpen(false)} />}
    </div>
  );
}

function CategoryHeader({ cat, count }) {
  const meta = CATEGORY_META[cat] || {};
  return (
    <div style={{ ...S.catHeader, borderLeftColor: meta.color || "#c8a96e" }}>
      <div style={S.catHeaderLeft}>
        <div style={{ ...S.catIconWrap, backgroundColor: meta.bg || "#f5f2ee" }}>
          <Icon
            d={ICONS[cat]}
            size={20}
            stroke={meta.color || "#c8a96e"}
            strokeWidth={1.5}
          />
        </div>
        <div>
          <h2 style={S.catName}>{cat}</h2>
          <span style={S.catCount}>{count} experience{count !== 1 ? "s" : ""}</span>
        </div>
      </div>
    </div>
  );
}

function ActivityCard({ activity, onWizard }) {
  const meta = CATEGORY_META[activity.category] || {};
  const destinations = Array.isArray(activity.best_for_destinations)
    ? activity.best_for_destinations
    : [];

  /* Per-card image: use activity.image_url from DB if available,
     otherwise fall back to the category placeholder image.
     Replace IMAGES[activity.category] with activity.image_url once you have real images. */
  const cardImg = activity.image_url || IMAGES[activity.category];

  return (
    <div style={S.card} className="act-card">
      {/* Card image */}
      <div style={S.cardImgWrap}>
        <img
          src={cardImg}
          alt={activity.name}
          style={S.cardImg}
          loading="lazy"
        />
        <div style={{ ...S.cardImgOverlay, background: `linear-gradient(to bottom, transparent 40%, ${meta.color || "#204E59"}dd 100%)` }} />
        <span style={{ ...S.cardCategoryBadge, backgroundColor: meta.color || "#204E59" }}>
          <Icon
            d={ICONS[activity.category]}
            size={11}
            stroke="rgba(255,255,255,0.9)"
            strokeWidth={2}
            style={{ marginRight: 5 }}
          />
          {activity.category}
        </span>
      </div>

      <div style={S.cardBody}>
        <h3 style={S.cardName}>{activity.name}</h3>
        <p style={S.cardDesc}>{activity.description}</p>

        {/* Meta row */}
        <div style={S.metaRow}>
          {activity.duration && (
            <span style={S.metaChip}>
              <Icon d={ICONS.clock} size={11} stroke="#888" strokeWidth={1.8} style={{ marginRight: 4 }} />
              {activity.duration}
            </span>
          )}
          {activity.difficulty && (
            <span style={S.metaChip}>
              <Icon d={ICONS.zap} size={11} stroke="#888" strokeWidth={1.8} style={{ marginRight: 4 }} />
              {activity.difficulty}
            </span>
          )}
          {activity.best_season && (
            <span style={S.metaChip}>
              <Icon d={ICONS.calendar} size={11} stroke="#888" strokeWidth={1.8} style={{ marginRight: 4 }} />
              {activity.best_season}
            </span>
          )}
        </div>

        {/* Destinations */}
        {destinations.length > 0 && (
          <div style={S.destRow}>
            <Icon d={ICONS.pin} size={11} stroke="#aaa" strokeWidth={1.8} style={{ marginRight: 4, flexShrink: 0 }} />
            {destinations.map((d, i) => (
              <span key={i} style={S.destTag}>{d}</span>
            ))}
          </div>
        )}

        <button style={S.addBtn} className="add-btn" onClick={onWizard}>
          <Icon d={ICONS.plus} size={13} stroke="#fff" strokeWidth={2.5} style={{ marginRight: 6 }} />
          Add to My Trip
        </button>
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
    minHeight: 560,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    padding: "100px 24px 60px",
  },
  heroBgImg: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center 40%",
  },
  heroOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to bottom, rgba(10,20,14,0.55) 0%, rgba(10,20,14,0.72) 60%, rgba(10,20,14,0.85) 100%)",
  },
  heroContent: {
    position: "relative",
    zIndex: 2,
    textAlign: "center",
    maxWidth: 660,
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
    fontSize: "clamp(36px, 5.5vw, 68px)",
    fontWeight: 400,
    color: "#fff",
    lineHeight: 1.1,
    letterSpacing: "-0.02em",
    margin: "0 0 18px",
  },
  heroSub: {
    fontSize: 16,
    color: "rgba(255,255,255,0.68)",
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
  heroPills: {
    position: "relative",
    zIndex: 2,
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 44,
  },
  heroPill: {
    display: "inline-flex",
    alignItems: "center",
    padding: "7px 16px",
    backgroundColor: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.14)",
    color: "rgba(255,255,255,0.6)",
    fontSize: 12,
    fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.06em",
    cursor: "pointer",
    transition: "background 0.18s, border-color 0.18s, color 0.18s",
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
  filterPills: { display: "flex", gap: 8, flexWrap: "wrap" },
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
    color: "#fff",
  },

  /* Main content */
  main: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "52px 24px 80px",
  },

  skeletonGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: 20,
  },
  skeleton: {
    height: 360,
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

  catSection: { marginBottom: 64 },
  catHeader: {
    borderLeft: "3px solid #c8a96e",
    paddingLeft: 18,
    marginBottom: 28,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  catHeaderLeft: { display: "flex", alignItems: "center", gap: 14 },
  catIconWrap: {
    width: 44,
    height: 44,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 0,
    flexShrink: 0,
  },
  catName: {
    fontSize: 26,
    fontWeight: 400,
    margin: "0 0 4px",
    letterSpacing: "-0.01em",
  },
  catCount: {
    fontSize: 12,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#aaa",
    letterSpacing: "0.06em",
  },

  actGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
    gap: 20,
  },

  /* Activity Card */
  card: {
    border: "1px solid #ece9e2",
    backgroundColor: "#fff",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.22s, box-shadow 0.22s",
  },
  cardImgWrap: {
    position: "relative",
    height: 180,
    overflow: "hidden",
  },
  cardImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
    display: "block",
    transition: "transform 0.4s ease",
  },
  cardImgOverlay: {
    position: "absolute",
    inset: 0,
  },
  cardCategoryBadge: {
    position: "absolute",
    bottom: 12,
    left: 14,
    display: "inline-flex",
    alignItems: "center",
    padding: "4px 10px",
    fontSize: 10,
    fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#fff",
    fontWeight: 600,
  },
  cardBody: {
    padding: "20px 20px 24px",
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  cardName: {
    fontSize: 19,
    fontWeight: 400,
    margin: "0 0 10px",
    letterSpacing: "-0.01em",
    lineHeight: 1.25,
  },
  cardDesc: {
    fontSize: 13,
    color: "#666",
    fontFamily: "'Helvetica Neue', sans-serif",
    lineHeight: 1.7,
    margin: "0 0 16px",
    flex: 1,
  },

  metaRow: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
    marginBottom: 14,
  },
  metaChip: {
    display: "inline-flex",
    alignItems: "center",
    fontSize: 11,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#666",
    backgroundColor: "#f5f2ee",
    padding: "4px 10px",
    letterSpacing: "0.04em",
  },

  destRow: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    flexWrap: "wrap",
    marginBottom: 18,
  },
  destTag: {
    fontSize: 11,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#204E59",
    border: "1px solid #c8e6c9",
    padding: "3px 8px",
    backgroundColor: "#f0f7f0",
    letterSpacing: "0.04em",
  },

  addBtn: {
    marginTop: "auto",
    display: "inline-flex",
    alignItems: "center",
    padding: "10px 18px",
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
    alignSelf: "flex-start",
  },

  /* Bottom banner */
  bottomBanner: {
    position: "relative",
    overflow: "hidden",
    minHeight: 240,
    display: "flex",
    alignItems: "center",
  },
  bannerBgImg: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center 60%",
  },
  bannerOverlay: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(10,25,16,0.78)",
  },
  bannerInner: {
    position: "relative",
    zIndex: 2,
    maxWidth: 1200,
    margin: "0 auto",
    padding: "52px 24px",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 32,
    flexWrap: "wrap",
    boxSizing: "border-box",
  },
  bannerLeft: { maxWidth: 560 },
  bannerTitle: {
    fontSize: 26,
    fontWeight: 400,
    color: "#fff",
    margin: "0 0 10px",
    letterSpacing: "-0.01em",
  },
  bannerDesc: {
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
    fontFamily: "'Helvetica Neue', sans-serif",
    lineHeight: 1.7,
    margin: 0,
  },
  bannerBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
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
  .btn-dark:hover { background-color: #b8954f !important; transform: translateY(-1px); }
  .pill:hover { border-color: #204E59 !important; color: #204E59 !important; }
  .pill:hover svg { stroke: #204E59 !important; }
  .act-card:hover { transform: translateY(-3px); box-shadow: 0 12px 40px rgba(0,0,0,0.12) !important; }
  .act-card:hover img { transform: scale(1.04); }
  .add-btn:hover { background-color: #c8a96e !important; }
  .hero-pill:hover { background-color: rgba(255,255,255,0.13) !important; border-color: rgba(255,255,255,0.28) !important; color: #fff !important; }
  .hero-pill:hover svg { stroke: #fff !important; }
  .skeleton { animation: pulse 1.5s ease-in-out infinite; }
  @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.45; } }
  @media (max-width: 640px) {
    .banner-inner { flex-direction: column; }
    .filter-inner { flex-direction: column; align-items: flex-start; }
  }
`;

export default Activities;