import React, { useState, useEffect, useCallback } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../context/AuthContext";
import TripWizard from "../components/TripWizard";
import acthero from "../assets/girlsnorkeling.jpg";

const DIFFICULTY_COLOR = {
  Easy:     { color: "#2e7d32", bg: "#e8f5e9" },
  Moderate: { color: "#7a5c1e", bg: "#fdf3e3" },
  Hard:     { color: "#c62828", bg: "#ffebee" },
};

export default function Activities() {
  const { user } = useAuth();

  const [activities,     setActivities]     = useState([]);
  const [loading,        setLoading]        = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [savedIds,       setSavedIds]       = useState(new Set());
  const [savingId,       setSavingId]       = useState(null);
  const [selected,       setSelected]       = useState(null);
  const [wizardOpen,     setWizardOpen]     = useState(false);
  const [toastMsg,       setToastMsg]       = useState("");

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase
        .from("activities")
        .select("*")
        .order("category", { ascending: true })
        .order("name",     { ascending: true });
      if (!error && data) setActivities(data);
      setLoading(false);
    };
    fetch();
  }, []);

  const fetchSaved = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase
      .from("saved_activities")
      .select("activity_id")
      .eq("user_id", user.id);
    if (data) setSavedIds(new Set(data.map((s) => s.activity_id)));
  }, [user]);

  useEffect(() => { fetchSaved(); }, [fetchSaved]);

  const toggleSave = async (activity) => {
    if (!user) { showToast("Sign in to save activities"); return; }
    setSavingId(activity.id);
    if (savedIds.has(activity.id)) {
      await supabase.from("saved_activities").delete()
        .eq("user_id", user.id).eq("activity_id", activity.id);
      setSavedIds((prev) => { const n = new Set(prev); n.delete(activity.id); return n; });
      showToast("Removed from saved");
    } else {
      await supabase.from("saved_activities").insert({ user_id: user.id, activity_id: activity.id });
      setSavedIds((prev) => new Set([...prev, activity.id]));
      showToast("Saved to your profile ✓");
    }
    setSavingId(null);
  };

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 2800);
  };

  const categories = ["All", ...Array.from(new Set(activities.map((a) => a.category).filter(Boolean))).sort()];
  const filtered   = activeCategory === "All" ? activities : activities.filter((a) => a.category === activeCategory);

  return (
    <div style={S.page}>
      <style>{css}</style>

      {/* ── HERO ── */}
      <section style={{ ...S.hero, backgroundImage: `url(${acthero})` }}>
        <div style={S.heroOverlay} />
        <div style={S.heroContent}>
          <span style={S.eyebrow}>Things To Do</span>
          <h1 style={S.heroTitle}>Experiences<br />Worth Travelling For</h1>
          <p style={S.heroSub}>
            Handpicked activities across Kenya — save the ones that excite you and build your trip from your profile.
          </p>
          <div style={S.heroStats}>
            {[
              { num: activities.length || "20+", label: "Activities" },
              { num: categories.length - 1 || "6", label: "Categories" },
              { num: "All", label: "Skill Levels" },
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

      {/* ── CATEGORY FILTER ── */}
      <div style={S.filterBar}>
        <div style={S.filterInner}>
          <span style={S.filterLabel}>Category</span>
          <div style={S.filterTabs}>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => { setActiveCategory(c); setSelected(null); }}
                style={{ ...S.filterTab, ...(activeCategory === c ? S.filterTabActive : {}) }}
                className={`filter-tab${activeCategory === c ? " filter-tab-active" : ""}`}
              >
                {c}
                <span style={{ ...S.filterCount, backgroundColor: activeCategory === c ? "#c8a96e" : "#ece9e2", color: activeCategory === c ? "#fff" : "#888" }}>
                  {c === "All" ? activities.length : activities.filter((a) => a.category === c).length}
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
              {[1,2,3,4,5,6].map((i) => <div key={i} style={S.shimmerCard} className="shimmer" />)}
            </div>
          ) : filtered.length === 0 ? (
            <div style={S.empty}>
              <span style={{ fontSize: 40 }}>🌍</span>
              <p style={{ fontFamily: "'Helvetica Neue', sans-serif", color: "#aaa" }}>No activities in this category yet.</p>
            </div>
          ) : (
            <div style={S.grid}>
              {filtered.map((a, i) => {
                const isSaved    = savedIds.has(a.id);
                const isSaving   = savingId === a.id;
                const isExpanded = selected?.id === a.id;
                const diffMeta   = DIFFICULTY_COLOR[a.difficulty] || DIFFICULTY_COLOR["Easy"];

                return (
                  <div
                    key={a.id}
                    style={{ ...S.card, animationDelay: `${i * 55}ms` }}
                    className="act-card-anim"
                  >
                    {/* Image */}
                    <div style={S.cardImgWrap}>
                      {a.image_url
                        ? <img src={a.image_url} alt={a.name} style={S.cardImg} />
                        : <div style={S.cardImgFallback}><span style={{ fontSize: 36 }}>🌍</span></div>
                      }
                      <div style={S.cardImgOverlay} />

                      <span style={S.categoryBadge}>{a.category}</span>

                      {a.difficulty && (
                        <span style={{ ...S.diffBadge, color: diffMeta.color, backgroundColor: diffMeta.bg }}>
                          {a.difficulty}
                        </span>
                      )}

                      {/* Save button */}
                      <button
                        style={{
                          ...S.saveBtn,
                          backgroundColor: isSaved ? "#c8a96e" : "rgba(0,0,0,0.45)",
                          color: "#fff",
                        }}
                        className="save-act-btn"
                        onClick={() => toggleSave(a)}
                        disabled={isSaving}
                        title={isSaved ? "Unsave" : "Save activity"}
                      >
                        {isSaving ? "…" : isSaved ? "✓" : "♡"}
                      </button>
                    </div>

                    {/* Body */}
                    <div style={S.cardBody}>
                      <h3 style={S.cardName}>{a.name}</h3>

                      <div style={S.metaPills}>
                        {a.duration    && <span style={S.metaPill}>⏱ {a.duration}</span>}
                        {a.best_season && <span style={S.metaPill}>🌤 {a.best_season}</span>}
                      </div>

                      {a.description && (
                        <p style={S.cardDesc}>
                          {isExpanded ? a.description : a.description.slice(0, 100) + (a.description.length > 100 ? "…" : "")}
                        </p>
                      )}

                      {isExpanded && a.best_for_destinations && a.best_for_destinations.length > 0 && (
                        <div style={S.bestForWrap}>
                          <span style={S.bestForLabel}>Best at</span>
                          <div style={S.bestForChips}>
                            {a.best_for_destinations.map((dest, i) => (
                              <span key={i} style={S.bestForChip}>📍 {dest}</span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div style={S.cardActions}>
                        <button
                          style={S.detailsBtn}
                          className="details-btn"
                          onClick={() => setSelected(isExpanded ? null : a)}
                        >
                          {isExpanded ? "Show less ↑" : "Learn more ↓"}
                        </button>
                        <button
                          style={{
                            ...S.saveTextBtn,
                            color: isSaved ? "#c8a96e" : "#204E59",
                            borderColor: isSaved ? "#c8a96e" : "#204E59",
                          }}
                          className="save-text-btn"
                          onClick={() => toggleSave(a)}
                          disabled={isSaving}
                        >
                          {isSaved ? "Saved ✓" : "Save Activity"}
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
            <h2 style={S.ctaTitle}>Ready to experience Kenya?</h2>
            <p style={S.ctaSub}>Save activities to your profile, then build your custom trip — our team will handle everything else.</p>
          </div>
          <button style={S.ctaBtn} className="cta-main-btn" onClick={() => setWizardOpen(true)}>
            Build My Trip →
          </button>
        </div>
      </section>

      {/* ── TOAST ── */}
      {toastMsg && (
        <div style={S.toast} className="toast-anim">
          {toastMsg}
        </div>
      )}

      {wizardOpen && <TripWizard onClose={() => setWizardOpen(false)} />}
    </div>
  );
}

const S = {
  page: { fontFamily: "'Georgia', serif", color: "#1a1a1a", backgroundColor: "#fff", minHeight: "100vh" },

  hero:        { position: "relative", height: 420, display: "flex", alignItems: "center", backgroundColor: "#0c1e14", backgroundSize: "cover", backgroundPosition: "center", overflow: "hidden" },
  heroOverlay: { position: "absolute", inset: 0, background: "radial-gradient(ellipse at 70% 40%, rgba(200,169,110,0.1) 0%, transparent 65%), linear-gradient(135deg, rgba(12,30,20,0.82) 0%, rgba(26,53,40,0.75) 100%)" },
  heroContent: { position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto", padding: "0 72px", width: "100%" },
  eyebrow:     { display: "inline-block", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#c8a96e", fontFamily: "'Helvetica Neue', sans-serif", marginBottom: 20, borderBottom: "1px solid rgba(200,169,110,0.4)", paddingBottom: 6 },
  heroTitle:   { fontSize: "clamp(34px, 5vw, 60px)", fontWeight: 400, color: "#fff", lineHeight: 1.08, letterSpacing: "-0.03em", margin: "0 0 18px" },
  heroSub:     { fontSize: 15, color: "rgba(255,255,255,0.6)", fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 300, lineHeight: 1.75, maxWidth: 480, marginBottom: 36 },
  heroStats:   { display: "flex", gap: 48 },
  heroStat:    { display: "flex", flexDirection: "column", gap: 4 },
  heroStatNum:   { fontSize: 26, color: "#c8a96e", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1 },
  heroStatLabel: { fontSize: 10, fontFamily: "'Helvetica Neue', sans-serif", color: "rgba(255,255,255,0.4)", letterSpacing: "0.14em", textTransform: "uppercase" },
  heroDiag:    { position: "absolute", bottom: -2, right: -2, width: 0, height: 0, borderStyle: "solid", borderWidth: "0 0 70px 100vw", borderColor: "transparent transparent #fff transparent" },

  filterBar:       { borderBottom: "1px solid #ece9e2", backgroundColor: "#fff", position: "sticky", top: 72, zIndex: 50 },
  filterInner:     { maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", gap: 20, overflowX: "auto", height: 56 },
  filterLabel:     { fontSize: 10, fontFamily: "'Helvetica Neue', sans-serif", letterSpacing: "0.16em", textTransform: "uppercase", color: "#bbb", whiteSpace: "nowrap", flexShrink: 0 },
  filterTabs:      { display: "flex", gap: 4 },
  filterTab:       { display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", border: "1px solid transparent", backgroundColor: "transparent", fontFamily: "'Helvetica Neue', sans-serif", fontSize: 12, color: "#666", cursor: "pointer", whiteSpace: "nowrap", letterSpacing: "0.02em", transition: "all 0.15s" },
  filterTabActive: { borderColor: "#204E59", color: "#204E59", backgroundColor: "#f0f6f8" },
  filterCount:     { fontSize: 10, padding: "1px 6px", borderRadius: 10, fontWeight: 700, transition: "all 0.15s" },

  gridSection: { padding: "52px 24px 80px" },
  gridInner:   { maxWidth: 1200, margin: "0 auto" },
  grid:        { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24, alignItems: "start" },
  shimmerCard: { height: 360, backgroundColor: "#f0ece6" },
  empty:       { textAlign: "center", padding: "80px 24px" },

  card:            { backgroundColor: "#fff", overflow: "hidden", boxShadow: "0 2px 20px rgba(0,0,0,0.07)", transition: "box-shadow 0.25s", opacity: 0 },
  cardImgWrap:     { position: "relative", overflow: "hidden" },
  cardImg:         { width: "100%", height: 220, objectFit: "cover", display: "block", transition: "transform 0.5s ease" },
  cardImgFallback: { width: "100%", height: 220, backgroundColor: "#e8e4de", display: "flex", alignItems: "center", justifyContent: "center" },
  cardImgOverlay:  { position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.25) 0%, transparent 60%)", pointerEvents: "none" },

  categoryBadge: { position: "absolute", top: 14, left: 14, backgroundColor: "#204E59", color: "#fff", fontSize: 9, fontFamily: "'Helvetica Neue', sans-serif", letterSpacing: "0.14em", textTransform: "uppercase", padding: "4px 10px" },
  diffBadge:     { position: "absolute", top: 14, right: 52, fontSize: 9, fontFamily: "'Helvetica Neue', sans-serif", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700, padding: "4px 10px" },
  saveBtn:       { position: "absolute", top: 12, right: 12, width: 32, height: 32, borderRadius: "50%", border: "none", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s, transform 0.15s" },

  cardBody:  { padding: "18px 20px 20px" },
  cardName:  { fontSize: 20, fontWeight: 400, margin: "0 0 10px", letterSpacing: "-0.01em", lineHeight: 1.2 },
  metaPills: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 },
  metaPill:  { fontSize: 10, fontFamily: "'Helvetica Neue', sans-serif", backgroundColor: "#f7f4ef", color: "#666", padding: "3px 10px", letterSpacing: "0.04em" },
  cardDesc:  { fontSize: 13, color: "#666", fontFamily: "'Helvetica Neue', sans-serif", lineHeight: 1.7, margin: "0 0 14px" },

  bestForWrap:  { borderTop: "1px solid #f0ece6", paddingTop: 14, marginBottom: 14 },
  bestForLabel: { fontSize: 10, fontFamily: "'Helvetica Neue', sans-serif", letterSpacing: "0.14em", textTransform: "uppercase", color: "#bbb", display: "block", marginBottom: 8 },
  bestForChips: { display: "flex", flexWrap: "wrap", gap: 6 },
  bestForChip:  { fontSize: 11, fontFamily: "'Helvetica Neue', sans-serif", backgroundColor: "#f0f6f8", color: "#204E59", padding: "4px 10px", letterSpacing: "0.02em" },

  cardActions:  { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 },
  detailsBtn:   { background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: 12, fontFamily: "'Helvetica Neue', sans-serif", color: "#aaa", letterSpacing: "0.04em", transition: "color 0.15s" },
  saveTextBtn:  { padding: "8px 16px", backgroundColor: "transparent", border: "1px solid", cursor: "pointer", fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", transition: "all 0.2s" },

  ctaStrip: { backgroundColor: "#0c1e14", padding: "56px 24px" },
  ctaInner: { maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 40, flexWrap: "wrap" },
  ctaTitle: { fontSize: "clamp(20px, 3vw, 34px)", fontWeight: 400, color: "#fff", margin: "0 0 10px", letterSpacing: "-0.02em" },
  ctaSub:   { fontSize: 14, color: "rgba(255,255,255,0.5)", fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 300, margin: 0, lineHeight: 1.7 },
  ctaBtn:   { padding: "14px 36px", backgroundColor: "#c8a96e", color: "#fff", border: "none", cursor: "pointer", fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", transition: "background 0.2s, transform 0.15s", whiteSpace: "nowrap", flexShrink: 0 },

  toast: { position: "fixed", bottom: 32, left: "50%", transform: "translateX(-50%)", backgroundColor: "#1a2f2a", color: "#fff", padding: "12px 24px", fontSize: 13, fontFamily: "'Helvetica Neue', sans-serif", letterSpacing: "0.04em", zIndex: 500, boxShadow: "0 8px 32px rgba(0,0,0,0.2)" },
};

const css = `
  .filter-tab:hover      { border-color: #204E59 !important; color: #204E59 !important; }
  .act-card-anim         { animation: fadeUp 0.42s ease forwards; }
  .act-card-anim:hover   { box-shadow: 0 8px 36px rgba(0,0,0,0.12) !important; }
  .act-card-anim:hover img { transform: scale(1.04); }
  .save-act-btn:hover    { transform: scale(1.12) !important; }
  .details-btn:hover     { color: #204E59 !important; }
  .save-text-btn:hover   { opacity: 0.75; }
  .cta-main-btn:hover    { background: #b8954f !important; transform: translateY(-1px); }
  .toast-anim            { animation: slideUp 0.3s ease; }
  @keyframes fadeUp  { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
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
    .hero-content { padding: 0 24px !important; }
  }
`;