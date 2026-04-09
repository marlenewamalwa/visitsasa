import React, { useState, useEffect, useRef } from "react";
import { supabase } from "../supabaseClient";
import TripWizard from "../components/TripWizard";
import destinationsHero from "../assets/watamu.jpg";

const REGION_ORDER = ["Mara", "Coast", "Rift Valley", "Northern", "Central", "Western", "Nairobi"];

export default function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [activeRegion, setActiveRegion] = useState("All");
  const [selected,     setSelected]     = useState(null);   // expanded card
  const [wizardOpen,   setWizardOpen]   = useState(false);
  const [wizardDests,  setWizardDests]  = useState([]);
  const [basket,       setBasket]       = useState([]);     // "add to trip" multi-select
  const heroRef = useRef(null);

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase
        .from("destinations")
        .select("*")
        .order("name", { ascending: true });
      if (!error && data) setDestinations(data);
      setLoading(false);
    };
    fetch();
  }, []);

  const regions = ["All", ...Array.from(new Set(
    destinations.map((d) => d.region).filter(Boolean)
  )).sort((a, b) => {
    const ai = REGION_ORDER.indexOf(a);
    const bi = REGION_ORDER.indexOf(b);
    if (ai === -1 && bi === -1) return a.localeCompare(b);
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  })];

  const filtered = activeRegion === "All"
    ? destinations
    : destinations.filter((d) => d.region === activeRegion);

  const toggleBasket = (name) => {
    setBasket((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const openWizardWith = (names) => {
    setWizardDests(names);
    setWizardOpen(true);
  };

  return (
    <div style={S.page}>
      <style>{css}</style>

      {/* ── HERO ── */}
      <section style={{ ...S.hero, backgroundImage: `url(${destinationsHero})` }} ref={heroRef}>
        <div style={S.heroOverlay} />
        <div style={S.heroContent}>
          <span style={S.eyebrow}>Explore Kenya</span>
          <h1 style={S.heroTitle}>Every Corner<br />of Kenya Awaits</h1>
          <p style={S.heroSub}>
            From the red dust of the Mara to the coral shores of the coast —
            hand-pick the places that speak to you.
          </p>
          <div style={S.heroStats}>
            {[
              { num: destinations.length || "12+", label: "Destinations" },
              { num: "8",   label: "Regions" },
              { num: "98%", label: "Guest Satisfaction" },
            ].map((s) => (
              <div key={s.label} style={S.heroStat}>
                <span style={S.heroStatNum}>{s.num}</span>
                <span style={S.heroStatLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Decorative diagonal */}
        <div style={S.heroDiag} />
      </section>

      {/* ── FILTER BAR ── */}
      <div style={S.filterBar}>
        <div style={S.filterInner}>
          <span style={S.filterLabel}>Filter by region</span>
          <div style={S.filterTabs}>
            {regions.map((r) => (
              <button
                key={r}
                onClick={() => { setActiveRegion(r); setSelected(null); }}
                style={{
                  ...S.filterTab,
                  ...(activeRegion === r ? S.filterTabActive : {}),
                }}
                className={`filter-tab${activeRegion === r ? " filter-tab-active" : ""}`}
              >
                {r}
                <span style={{
                  ...S.filterCount,
                  backgroundColor: activeRegion === r ? "#c8a96e" : "#ece9e2",
                  color: activeRegion === r ? "#fff" : "#888",
                }}>
                  {r === "All" ? destinations.length : destinations.filter((d) => d.region === r).length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── GRID ── */}
      <section style={S.gridSection}>
        <div style={S.gridInner}>

          {loading ? (
            <div style={S.grid}>
              {[1,2,3,4,5,6].map((i) => (
                <div key={i} style={S.shimmerCard} className="shimmer" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div style={S.empty}>
              <span style={{ fontSize: 40 }}>🗺️</span>
              <p>No destinations in this region yet.</p>
            </div>
          ) : (
            <div style={S.grid}>
              {filtered.map((d, i) => {
                const isSelected = selected?.id === d.id;
                const inBasket   = basket.includes(d.name);
                return (
                  <div
                    key={d.id}
                    style={{
                      ...S.card,
                      animationDelay: `${i * 60}ms`,
                      gridRow: isSelected ? "span 2" : "span 1",
                    }}
                    className="dest-card-anim"
                  >
                    {/* Image */}
                    <div style={S.cardImgWrap}>
                      {d.image_url ? (
                        <img src={d.image_url} alt={d.name} style={S.cardImg} />
                      ) : (
                        <div style={S.cardImgFallback} />
                      )}
                      <div style={S.cardImgOverlay} />

                      {/* Region badge */}
                      <span style={S.regionBadge}>{d.region}</span>

                      {/* Duration badge */}
                      {d.duration_days && (
                        <span style={S.durationBadge}>{d.duration_days}</span>
                      )}

                      {/* Basket toggle (heart-style) */}
                      <button
                        style={{
                          ...S.basketBtn,
                          backgroundColor: inBasket ? "#c8a96e" : "rgba(0,0,0,0.45)",
                          color: inBasket ? "#fff" : "rgba(255,255,255,0.8)",
                        }}
                        className="basket-btn"
                        onClick={(e) => { e.stopPropagation(); toggleBasket(d.name); }}
                        title={inBasket ? "Remove from trip" : "Save to trip"}
                      >
                        {inBasket ? "✓" : "+"}
                      </button>
                    </div>

                    {/* Info */}
                    <div style={S.cardBody}>
                      {d.tag && <span style={S.cardTag}>{d.tag}</span>}
                      <h3 style={S.cardName}>{d.name}</h3>
                      {d.description && (
                        <p style={S.cardDesc}>
                          {isSelected ? d.description : d.description.slice(0, 90) + (d.description.length > 90 ? "…" : "")}
                        </p>
                      )}

                      {/* Expanded content */}
                      {isSelected && (
                        <div style={S.expandedContent}>
                          {d.best_season && (
                            <div style={S.metaRow}>
                              <span style={S.metaLabel}>Best Season</span>
                              <span style={S.metaValue}>{d.best_season}</span>
                            </div>
                          )}
                          {d.highlights && d.highlights.length > 0 && (
                            <div style={S.highlightsWrap}>
                              <span style={S.metaLabel}>Highlights</span>
                              <div style={S.highlights}>
                                {d.highlights.map((h, i) => (
                                  <span key={i} style={S.highlight}>✦ {h}</span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      <div style={S.cardActions}>
                        <button
                          style={S.detailsBtn}
                          className="details-btn"
                          onClick={() => setSelected(isSelected ? null : d)}
                        >
                          {isSelected ? "Show less ↑" : "Learn more ↓"}
                        </button>
                        <button
                          style={{
                            ...S.addTripBtn,
                            backgroundColor: inBasket ? "#f0f7f0" : "#204E59",
                            color: inBasket ? "#204E59" : "#fff",
                            border: inBasket ? "1px solid #204E59" : "none",
                          }}
                          className="add-trip-btn"
                          onClick={() => openWizardWith([d.name])}
                        >
                          {inBasket ? "Plan This Trip →" : "Add to My Trip +"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── FLOATING BASKET ── */}
      {basket.length > 0 && (
        <div style={S.basket} className="basket-bar">
          <div style={S.basketLeft}>
            <span style={S.basketIcon}>✦</span>
            <div>
              <p style={S.basketTitle}>{basket.length} destination{basket.length > 1 ? "s" : ""} saved</p>
              <p style={S.basketNames}>{basket.join(" · ")}</p>
            </div>
          </div>
          <div style={S.basketActions}>
            <button style={S.basketClear} className="basket-clear" onClick={() => setBasket([])}>Clear</button>
            <button style={S.basketPlan} className="basket-plan" onClick={() => openWizardWith(basket)}>
              Plan This Trip →
            </button>
          </div>
        </div>
      )}

      {/* ── CTA STRIP ── */}
      <section style={S.ctaStrip}>
        <div style={S.ctaInner}>
          <div>
            <h2 style={S.ctaTitle}>Can't decide? Let us help.</h2>
            <p style={S.ctaSub}>Tell us what you're looking for and we'll build the perfect multi-destination itinerary.</p>
          </div>
          <button style={S.ctaBtn} className="cta-main-btn" onClick={() => openWizardWith([])}>
            Start Building My Trip →
          </button>
        </div>
      </section>

      {wizardOpen && (
        <TripWizard
          onClose={() => { setWizardOpen(false); setWizardDests([]); }}
          initialDestinations={wizardDests}
        />
      )}
    </div>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────────
const S = {
  page: { fontFamily: "'Georgia', 'Times New Roman', serif", color: "#1a1a1a", backgroundColor: "#fff", minHeight: "100vh" },

  // Hero
  hero: {
    position: "relative", height: 440, display: "flex", alignItems: "center",
    backgroundColor: "#0c1e14", backgroundSize: "cover", backgroundPosition: "center", overflow: "hidden",
  },
  heroOverlay: {
    position: "absolute", inset: 0,
    background: "radial-gradient(ellipse at 30% 50%, rgba(200,169,110,0.12) 0%, transparent 70%), linear-gradient(135deg, rgba(12,30,20,0.82) 0%, rgba(26,53,40,0.75) 100%)",
  },
  heroContent: { position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto", padding: "0 72px", width: "100%" },
  eyebrow: {
    display: "inline-block", fontSize: 10, letterSpacing: "0.22em",
    textTransform: "uppercase", color: "#c8a96e", fontFamily: "'Helvetica Neue', sans-serif",
    marginBottom: 20, borderBottom: "1px solid rgba(200,169,110,0.4)", paddingBottom: 6,
  },
  heroTitle: {
    fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 400, color: "#fff",
    lineHeight: 1.08, letterSpacing: "-0.03em", margin: "0 0 20px",
  },
  heroSub: {
    fontSize: 15, color: "rgba(255,255,255,0.6)", fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 300, lineHeight: 1.75, maxWidth: 480, marginBottom: 40,
  },
  heroStats: { display: "flex", gap: 48 },
  heroStat:  { display: "flex", flexDirection: "column", gap: 4 },
  heroStatNum:   { fontSize: 28, color: "#c8a96e", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1 },
  heroStatLabel: { fontSize: 10, fontFamily: "'Helvetica Neue', sans-serif", color: "rgba(255,255,255,0.4)", letterSpacing: "0.14em", textTransform: "uppercase" },
  heroDiag: {
    position: "absolute", bottom: -2, right: -2, width: 0, height: 0,
    borderStyle: "solid", borderWidth: "0 0 80px 100vw",
    borderColor: "transparent transparent #fff transparent",
  },

  // Filter bar
  filterBar: { borderBottom: "1px solid #ece9e2", backgroundColor: "#fff", position: "sticky", top: 72, zIndex: 50 },
  filterInner: { maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", gap: 20, overflowX: "auto", height: 56 },
  filterLabel: { fontSize: 10, fontFamily: "'Helvetica Neue', sans-serif", letterSpacing: "0.16em", textTransform: "uppercase", color: "#bbb", whiteSpace: "nowrap", flexShrink: 0 },
  filterTabs:  { display: "flex", gap: 4, alignItems: "center" },
  filterTab: {
    display: "flex", alignItems: "center", gap: 6, padding: "6px 14px",
    border: "1px solid transparent", backgroundColor: "transparent",
    fontFamily: "'Helvetica Neue', sans-serif", fontSize: 12, color: "#666",
    cursor: "pointer", whiteSpace: "nowrap", letterSpacing: "0.02em",
    transition: "all 0.15s",
  },
  filterTabActive: { borderColor: "#204E59", color: "#204E59", backgroundColor: "#f0f6f8" },
  filterCount: { fontSize: 10, padding: "1px 6px", borderRadius: 10, fontWeight: 700, transition: "all 0.15s" },

  // Grid
  gridSection: { padding: "56px 24px 80px" },
  gridInner:   { maxWidth: 1200, margin: "0 auto" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: 24,
    alignItems: "start",
  },

  shimmerCard: { height: 380, backgroundColor: "#f0ece6" },
  empty: { textAlign: "center", padding: "80px 24px", color: "#aaa", fontFamily: "'Helvetica Neue', sans-serif", fontSize: 15 },

  // Card
  card: {
    backgroundColor: "#fff", overflow: "hidden",
    boxShadow: "0 2px 20px rgba(0,0,0,0.07)",
    transition: "box-shadow 0.25s",
    opacity: 0,
  },
  cardImgWrap: { position: "relative", overflow: "hidden" },
  cardImg:     { width: "100%", height: 240, objectFit: "cover", display: "block", transition: "transform 0.5s ease" },
  cardImgFallback: { width: "100%", height: 240, backgroundColor: "#e8e4de" },
  cardImgOverlay: {
    position: "absolute", inset: 0,
    background: "linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 60%)",
    pointerEvents: "none",
  },
  regionBadge: {
    position: "absolute", top: 14, left: 14,
    backgroundColor: "#c8a96e", color: "#fff",
    fontSize: 9, fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.14em", textTransform: "uppercase",
    padding: "4px 10px",
  },
  durationBadge: {
    position: "absolute", top: 14, right: 52,
    backgroundColor: "rgba(0,0,0,0.6)", color: "#fff",
    fontSize: 9, fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.08em", padding: "4px 10px",
    backdropFilter: "blur(4px)",
  },
  basketBtn: {
    position: "absolute", top: 12, right: 12,
    width: 32, height: 32, borderRadius: "50%",
    border: "none", cursor: "pointer", fontSize: 14, fontWeight: 700,
    display: "flex", alignItems: "center", justifyContent: "center",
    transition: "background 0.2s, transform 0.15s",
  },

  // Card body
  cardBody: { padding: "20px 22px 22px" },
  cardTag:  { display: "block", fontSize: 9, fontFamily: "'Helvetica Neue', sans-serif", letterSpacing: "0.16em", textTransform: "uppercase", color: "#c8a96e", marginBottom: 8 },
  cardName: { fontSize: 22, fontWeight: 400, margin: "0 0 10px", letterSpacing: "-0.01em", lineHeight: 1.2 },
  cardDesc: { fontSize: 13, color: "#666", fontFamily: "'Helvetica Neue', sans-serif", lineHeight: 1.7, margin: "0 0 18px" },

  // Expanded
  expandedContent: { borderTop: "1px solid #f0ece6", paddingTop: 16, marginBottom: 18 },
  metaRow:    { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  metaLabel:  { fontSize: 10, fontFamily: "'Helvetica Neue', sans-serif", letterSpacing: "0.14em", textTransform: "uppercase", color: "#bbb" },
  metaValue:  { fontSize: 13, fontFamily: "'Helvetica Neue', sans-serif", color: "#444" },
  highlightsWrap: { marginTop: 8 },
  highlights: { display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 },
  highlight:  { fontSize: 11, fontFamily: "'Helvetica Neue', sans-serif", backgroundColor: "#f7f4ef", color: "#555", padding: "4px 10px", letterSpacing: "0.04em" },

  cardActions: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 },
  detailsBtn: {
    background: "none", border: "none", cursor: "pointer", padding: 0,
    fontSize: 12, fontFamily: "'Helvetica Neue', sans-serif",
    color: "#aaa", letterSpacing: "0.04em", transition: "color 0.15s",
  },
  addTripBtn: {
    padding: "9px 18px", border: "none", cursor: "pointer",
    fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 700,
    fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase",
    transition: "all 0.2s",
  },

  // Floating basket
  basket: {
    position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)",
    backgroundColor: "#0c1e14", color: "#fff",
    padding: "16px 20px", zIndex: 90,
    display: "flex", alignItems: "center", gap: 24,
    boxShadow: "0 8px 40px rgba(0,0,0,0.3)",
    minWidth: 480, maxWidth: "90vw",
    animation: "slideUp 0.3s ease",
  },
  basketLeft:    { display: "flex", alignItems: "center", gap: 14, flex: 1 },
  basketIcon:    { fontSize: 16, color: "#c8a96e", flexShrink: 0 },
  basketTitle:   { fontSize: 13, fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 700, margin: "0 0 2px", letterSpacing: "0.02em" },
  basketNames:   { fontSize: 11, fontFamily: "'Helvetica Neue', sans-serif", color: "rgba(255,255,255,0.5)", margin: 0, letterSpacing: "0.04em" },
  basketActions: { display: "flex", gap: 10, flexShrink: 0 },
  basketClear: {
    background: "none", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.6)",
    padding: "8px 16px", cursor: "pointer", fontSize: 12,
    fontFamily: "'Helvetica Neue', sans-serif", letterSpacing: "0.06em", textTransform: "uppercase",
    transition: "all 0.15s",
  },
  basketPlan: {
    backgroundColor: "#c8a96e", color: "#fff", border: "none",
    padding: "8px 20px", cursor: "pointer", fontSize: 12,
    fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 700,
    letterSpacing: "0.08em", textTransform: "uppercase", transition: "background 0.2s",
  },

  // CTA strip
  ctaStrip: { backgroundColor: "#0c1e14", padding: "56px 24px" },
  ctaInner: { maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 40, flexWrap: "wrap" },
  ctaTitle: { fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 400, color: "#fff", margin: "0 0 10px", letterSpacing: "-0.02em" },
  ctaSub:   { fontSize: 14, color: "rgba(255,255,255,0.5)", fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 300, margin: 0, lineHeight: 1.7 },
  ctaBtn: {
    padding: "14px 36px", backgroundColor: "#c8a96e", color: "#fff", border: "none",
    cursor: "pointer", fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 700,
    fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase",
    transition: "background 0.2s, transform 0.15s", whiteSpace: "nowrap", flexShrink: 0,
  },
};

const css = `
  .filter-tab:hover     { border-color: #204E59 !important; color: #204E59 !important; }
  .dest-card-anim       { animation: fadeUp 0.45s ease forwards; }
  .dest-card-anim:hover { box-shadow: 0 8px 40px rgba(0,0,0,0.13) !important; }
  .dest-card-anim:hover img { transform: scale(1.04); }
  .basket-btn:hover     { transform: scale(1.12) !important; }
  .details-btn:hover    { color: #204E59 !important; }
  .add-trip-btn:hover   { opacity: 0.88; transform: translateY(-1px); }
  .basket-clear:hover   { border-color: rgba(255,255,255,0.5) !important; color: #fff !important; }
  .basket-plan:hover    { background: #b8954f !important; }
  .cta-main-btn:hover   { background: #b8954f !important; transform: translateY(-1px); }
  @keyframes fadeUp  { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes slideUp { from { opacity: 0; transform: translateX(-50%) translateY(20px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
  @keyframes shimmer {
    0%   { background-position: -600px 0; }
    100% { background-position:  600px 0; }
  }
  .shimmer {
    background: linear-gradient(90deg, #ede9e3 25%, #f5f2ed 50%, #ede9e3 75%);
    background-size: 1200px 100%;
    animation: shimmer 1.6s infinite;
  }
  @media (max-width: 768px) {
    .basket-bar { min-width: unset !important; flex-direction: column !important; align-items: flex-start !important; gap: 14px !important; }
    .filter-inner { padding: 0 16px !important; }
  }
`;