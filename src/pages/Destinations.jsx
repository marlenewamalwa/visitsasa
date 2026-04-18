import React, { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../context/AuthContext";
import TripWizard from "../components/TripWizard";
import destinationsHero from "../assets/watamu.jpg";

const REGION_ORDER = ["Mara", "Coast", "Rift Valley", "Northern", "Central", "Western", "Nairobi"];

export default function Destinations() {
  const { user } = useAuth();
  const [destinations, setDestinations] = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [activeRegion, setActiveRegion] = useState("All");
  const [selected,     setSelected]     = useState(null);
  const [wizardOpen,   setWizardOpen]   = useState(false);
  const [savedIds,     setSavedIds]     = useState(new Set()); // destination_id set
  const [savingId,     setSavingId]     = useState(null);
  const [toastMsg,     setToastMsg]     = useState("");
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

  // Load saved destination IDs for current user
  const fetchSaved = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase
      .from("saved_destinations")
      .select("destination_id")
      .eq("user_id", user.id);
    if (data) setSavedIds(new Set(data.map((s) => s.destination_id)));
  }, [user]);

  useEffect(() => { fetchSaved(); }, [fetchSaved]);

  const toggleSave = async (dest) => {
    if (!user) { showToast("Sign in to save destinations"); return; }
    setSavingId(dest.id);
    if (savedIds.has(dest.id)) {
      await supabase.from("saved_destinations").delete()
        .eq("user_id", user.id).eq("destination_id", dest.id);
      setSavedIds((prev) => { const n = new Set(prev); n.delete(dest.id); return n; });
      showToast("Removed from saved");
    } else {
      await supabase.from("saved_destinations").insert({ user_id: user.id, destination_id: dest.id });
      setSavedIds((prev) => new Set([...prev, dest.id]));
      showToast("Saved to your profile ✓");
    }
    setSavingId(null);
  };

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 2800);
  };

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
            save the places that speak to you and build your trip when you're ready.
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
                style={{ ...S.filterTab, ...(activeRegion === r ? S.filterTabActive : {}) }}
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
                const isSaved    = savedIds.has(d.id);
                const isSaving   = savingId === d.id;
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

                      {/* Save button — same pattern as Activities */}
                      <button
                        style={{
                          ...S.saveBtn,
                          backgroundColor: isSaved ? "#c8a96e" : "rgba(0,0,0,0.45)",
                          color: "#fff",
                        }}
                        className="save-dest-btn"
                        onClick={(e) => { e.stopPropagation(); toggleSave(d); }}
                        disabled={isSaving}
                        title={isSaved ? "Unsave" : "Save destination"}
                      >
                        {isSaving ? "…" : isSaved ? "✓" : "♡"}
                      </button>
                    </div>

                    {/* Card body */}
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
                            ...S.saveTextBtn,
                            color: isSaved ? "#c8a96e" : "#204E59",
                            borderColor: isSaved ? "#c8a96e" : "#204E59",
                          }}
                          className="save-text-btn"
                          onClick={() => toggleSave(d)}
                          disabled={isSaving}
                        >
                          {isSaved ? "Saved ✓" : "Save Destination"}
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

      {/* ── CTA STRIP ── */}
      <section style={S.ctaStrip}>
        <div style={S.ctaInner}>
          <div>
            <h2 style={S.ctaTitle}>Ready to build your trip?</h2>
            <p style={S.ctaSub}>Save destinations to your profile, then build your custom itinerary — our team will handle the rest.</p>
          </div>
          <button style={S.ctaBtn} className="cta-main-btn" onClick={() => setWizardOpen(true)}>
            Start Building My Trip →
          </button>
        </div>
      </section>

      {/* ── TOAST ── */}
      {toastMsg && (
        <div style={S.toast} className="toast-anim">
          {toastMsg}
        </div>
      )}

      {wizardOpen && (
        <TripWizard onClose={() => setWizardOpen(false)} />
      )}
    </div>
  );
}

const S = {
  page: { fontFamily: "'Georgia', 'Times New Roman', serif", color: "#1a1a1a", backgroundColor: "#fff", minHeight: "100vh" },

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

  filterBar:   { borderBottom: "1px solid #ece9e2", backgroundColor: "#fff", position: "sticky", top: 72, zIndex: 50 },
  filterInner: { maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", gap: 20, overflowX: "auto", height: 56 },
  filterLabel: { fontSize: 10, fontFamily: "'Helvetica Neue', sans-serif", letterSpacing: "0.16em", textTransform: "uppercase", color: "#bbb", whiteSpace: "nowrap", flexShrink: 0 },
  filterTabs:  { display: "flex", gap: 4, alignItems: "center" },
  filterTab: {
    display: "flex", alignItems: "center", gap: 6, padding: "6px 14px",
    border: "1px solid transparent", backgroundColor: "transparent",
    fontFamily: "'Helvetica Neue', sans-serif", fontSize: 12, color: "#666",
    cursor: "pointer", whiteSpace: "nowrap", letterSpacing: "0.02em", transition: "all 0.15s",
  },
  filterTabActive: { borderColor: "#204E59", color: "#204E59", backgroundColor: "#f0f6f8" },
  filterCount: { fontSize: 10, padding: "1px 6px", borderRadius: 10, fontWeight: 700, transition: "all 0.15s" },

  gridSection: { padding: "56px 24px 80px" },
  gridInner:   { maxWidth: 1200, margin: "0 auto" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24, alignItems: "start" },

  shimmerCard: { height: 380, backgroundColor: "#f0ece6" },
  empty: { textAlign: "center", padding: "80px 24px", color: "#aaa", fontFamily: "'Helvetica Neue', sans-serif", fontSize: 15 },

  card: { backgroundColor: "#fff", overflow: "hidden", boxShadow: "0 2px 20px rgba(0,0,0,0.07)", transition: "box-shadow 0.25s", opacity: 0 },
  cardImgWrap:     { position: "relative", overflow: "hidden" },
  cardImg:         { width: "100%", height: 240, objectFit: "cover", display: "block", transition: "transform 0.5s ease" },
  cardImgFallback: { width: "100%", height: 240, backgroundColor: "#e8e4de" },
  cardImgOverlay:  { position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 60%)", pointerEvents: "none" },

  regionBadge: {
    position: "absolute", top: 14, left: 14,
    backgroundColor: "#c8a96e", color: "#fff",
    fontSize: 9, fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.14em", textTransform: "uppercase", padding: "4px 10px",
  },
  durationBadge: {
    position: "absolute", top: 14, right: 52,
    backgroundColor: "rgba(0,0,0,0.6)", color: "#fff",
    fontSize: 9, fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.08em", padding: "4px 10px", backdropFilter: "blur(4px)",
  },
  saveBtn: {
    position: "absolute", top: 12, right: 12,
    width: 32, height: 32, borderRadius: "50%",
    border: "none", cursor: "pointer", fontSize: 14,
    display: "flex", alignItems: "center", justifyContent: "center",
    transition: "background 0.2s, transform 0.15s",
  },

  cardBody:    { padding: "20px 22px 22px" },
  cardTag:     { display: "block", fontSize: 9, fontFamily: "'Helvetica Neue', sans-serif", letterSpacing: "0.16em", textTransform: "uppercase", color: "#c8a96e", marginBottom: 8 },
  cardName:    { fontSize: 22, fontWeight: 400, margin: "0 0 10px", letterSpacing: "-0.01em", lineHeight: 1.2 },
  cardDesc:    { fontSize: 13, color: "#666", fontFamily: "'Helvetica Neue', sans-serif", lineHeight: 1.7, margin: "0 0 18px" },

  expandedContent: { borderTop: "1px solid #f0ece6", paddingTop: 16, marginBottom: 18 },
  metaRow:     { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  metaLabel:   { fontSize: 10, fontFamily: "'Helvetica Neue', sans-serif", letterSpacing: "0.14em", textTransform: "uppercase", color: "#bbb" },
  metaValue:   { fontSize: 13, fontFamily: "'Helvetica Neue', sans-serif", color: "#444" },
  highlightsWrap: { marginTop: 8 },
  highlights:  { display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 },
  highlight:   { fontSize: 11, fontFamily: "'Helvetica Neue', sans-serif", backgroundColor: "#f7f4ef", color: "#555", padding: "4px 10px", letterSpacing: "0.04em" },

  cardActions: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 },
  detailsBtn:  { background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: 12, fontFamily: "'Helvetica Neue', sans-serif", color: "#aaa", letterSpacing: "0.04em", transition: "color 0.15s" },
  saveTextBtn: { padding: "8px 16px", backgroundColor: "transparent", border: "1px solid", cursor: "pointer", fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", transition: "all 0.2s" },

  ctaStrip: { backgroundColor: "#0c1e14", padding: "56px 24px" },
  ctaInner: { maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 40, flexWrap: "wrap" },
  ctaTitle: { fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 400, color: "#fff", margin: "0 0 10px", letterSpacing: "-0.02em" },
  ctaSub:   { fontSize: 14, color: "rgba(255,255,255,0.5)", fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 300, margin: 0, lineHeight: 1.7 },
  ctaBtn:   { padding: "14px 36px", backgroundColor: "#c8a96e", color: "#fff", border: "none", cursor: "pointer", fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", transition: "background 0.2s, transform 0.15s", whiteSpace: "nowrap", flexShrink: 0 },

  toast: { position: "fixed", bottom: 32, left: "50%", transform: "translateX(-50%)", backgroundColor: "#1a2f2a", color: "#fff", padding: "12px 24px", fontSize: 13, fontFamily: "'Helvetica Neue', sans-serif", letterSpacing: "0.04em", zIndex: 500, boxShadow: "0 8px 32px rgba(0,0,0,0.2)" },
};

const css = `
  .filter-tab:hover      { border-color: #204E59 !important; color: #204E59 !important; }
  .dest-card-anim        { animation: fadeUp 0.45s ease forwards; }
  .dest-card-anim:hover  { box-shadow: 0 8px 40px rgba(0,0,0,0.13) !important; }
  .dest-card-anim:hover img { transform: scale(1.04); }
  .save-dest-btn:hover   { transform: scale(1.12) !important; }
  .details-btn:hover     { color: #204E59 !important; }
  .save-text-btn:hover   { opacity: 0.75; }
  .cta-main-btn:hover    { background: #b8954f !important; transform: translateY(-1px); }
  .toast-anim            { animation: slideUp 0.3s ease; }
  @keyframes fadeUp  { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes slideUp { from { opacity: 0; transform: translateX(-50%) translateY(16px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
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
    .filter-inner { padding: 0 16px !important; }
    .hero-content { padding: 0 24px !important; }
  }
`;