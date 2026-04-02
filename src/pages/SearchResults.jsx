import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import SearchBar from "../components/SearchBar";

const STATIC_PAGES = [
  { id: "p1", type: "page", name: "How It Works",  description: "Learn how our trip planning process works.", path: "/howitworks" },
  { id: "p2", type: "page", name: "About Us",       description: "The story behind Safari Yako.",             path: "/about"      },
  { id: "p3", type: "page", name: "Contact Us",     description: "Get in touch with our team.",               path: "/contact"    },
  { id: "p4", type: "page", name: "Travel Tips",    description: "Tips and guides for travelling Kenya.",      path: "/travel-tips"},
];

const TYPE_META = {
  destination: { label: "Destinations", icon: "🗺️",  color: "#204E59", bg: "#e8f1f3" },
  activity:    { label: "Activities",   icon: "🦁",  color: "#7a5c1e", bg: "#fdf3e3" },
  tip:         { label: "Travel Tips",  icon: "✍️",  color: "#3a5c2e", bg: "#eaf3e8" },
  page:        { label: "Pages",        icon: "📄",  color: "#555",    bg: "#f0f0f0" },
};

const FILTERS = ["all", "destination", "activity", "tip", "page"];

export default function SearchResults() {
  const [searchParams]  = useSearchParams();
  const navigate        = useNavigate();
  const query           = searchParams.get("q") || "";

  const [results,  setResults]  = useState([]);
  const [loading,  setLoading]  = useState(false);
  const [filter,   setFilter]   = useState("all");

  const doSearch = useCallback(async (q) => {
    if (!q.trim()) return;
    setLoading(true);

    const [destRes, actRes, tipRes] = await Promise.all([
      supabase.from("destinations").select("id, name, description, image_url").ilike("name", `%${q}%`),
      supabase.from("activities").select("id, name, description").ilike("name", `%${q}%`),
      supabase.from("travel_tips").select("id, title, excerpt").ilike("title", `%${q}%`),
    ]);

    const destinations = (destRes.data || []).map((d) => ({ ...d, type: "destination", displayName: d.name, displayDesc: d.description, path: `/destinations?q=${encodeURIComponent(d.name)}` }));
    const activities   = (actRes.data  || []).map((a) => ({ ...a, type: "activity",    displayName: a.name, displayDesc: a.description, path: `/activities?q=${encodeURIComponent(a.name)}` }));
    const tips         = (tipRes.data  || []).map((t) => ({ ...t, type: "tip",         displayName: t.title, displayDesc: t.excerpt,    path: `/travel-tips?q=${encodeURIComponent(t.title)}` }));
    const pages        = STATIC_PAGES.filter((p) => p.name.toLowerCase().includes(q.toLowerCase())).map((p) => ({ ...p, displayName: p.name, displayDesc: p.description }));

    setResults([...destinations, ...activities, ...tips, ...pages]);
    setLoading(false);
  }, []);

  useEffect(() => { doSearch(query); setFilter("all"); }, [query, doSearch]);

  const filtered = filter === "all" ? results : results.filter((r) => r.type === filter);
  const grouped  = ["destination", "activity", "tip", "page"].reduce((acc, type) => {
    const items = filter === "all" ? results.filter((r) => r.type === type) : (filter === type ? results.filter((r) => r.type === type) : []);
    if (items.length) acc[type] = items;
    return acc;
  }, {});

  return (
    <div style={S.page}>
      <style>{css}</style>

      {/* ── HEADER ── */}
      <div style={S.header}>
        <div style={S.headerInner}>
          <p style={S.headerEyebrow}>Search Results</p>
          <h1 style={S.headerTitle}>
            {query ? (<>Results for "<em style={{ color: "#c8a96e", fontStyle: "italic" }}>{query}</em>"</>) : "Search Kenya"}
          </h1>
          {!loading && query && (
            <p style={S.headerCount}>
              {results.length === 0 ? "No results found" : `${results.length} result${results.length !== 1 ? "s" : ""} found`}
            </p>
          )}
          <div style={S.searchBarWrap}>
            <SearchBar placeholder="Refine your search…" />
          </div>
        </div>
      </div>

      <div style={S.body}>
        {/* ── FILTER TABS ── */}
        <div style={S.filters}>
          {FILTERS.map((f) => {
            const count = f === "all" ? results.length : results.filter((r) => r.type === f).length;
            if (f !== "all" && count === 0) return null;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{ ...S.filterBtn, ...(filter === f ? S.filterBtnActive : {}) }}
                className={`filter-btn${filter === f ? " filter-btn-active" : ""}`}
              >
                {f === "all" ? "All" : TYPE_META[f].label}
                <span style={{ ...S.filterCount, backgroundColor: filter === f ? "#c8a96e" : "#ece9e2", color: filter === f ? "#fff" : "#888" }}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── LOADING ── */}
        {loading && (
          <div style={S.loadingWrap}>
            {[1,2,3,4,5,6].map((i) => (
              <div key={i} style={S.shimmer} className="shimmer" />
            ))}
          </div>
        )}

        {/* ── NO RESULTS ── */}
        {!loading && results.length === 0 && query && (
          <div style={S.emptyWrap}>
            <div style={S.emptyIcon}>🔍</div>
            <h2 style={S.emptyTitle}>No results for "{query}"</h2>
            <p style={S.emptyText}>Try searching for a destination like "Maasai Mara", an activity like "game drive", or a topic like "packing".</p>
            <div style={S.emptySuggestions}>
              {["Maasai Mara", "Diani Beach", "Game Drive", "Packing Tips"].map((s) => (
                <button key={s} style={S.suggestionChip} className="suggestion-chip" onClick={() => navigate(`/search?q=${encodeURIComponent(s)}`)}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── RESULTS ── */}
        {!loading && Object.entries(grouped).map(([type, items]) => (
          <section key={type} style={S.section}>
            <div style={S.sectionHeader}>
              <span style={S.sectionIcon}>{TYPE_META[type].icon}</span>
              <h2 style={S.sectionTitle}>{TYPE_META[type].label}</h2>
              <span style={{ ...S.sectionTag, color: TYPE_META[type].color, backgroundColor: TYPE_META[type].bg }}>
                {items.length}
              </span>
            </div>
            <div style={type === "destination" ? S.cardGrid : S.listGrid}>
              {items.map((item) =>
                type === "destination" ? (
                  <DestCard key={item.id} item={item} query={query} />
                ) : (
                  <ListRow key={item.id} item={item} query={query} type={type} />
                )
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

// ── sub-components ────────────────────────────────────────────────────────────
function DestCard({ item, query }) {
  return (
    <Link to={item.path} style={S.destCard} className="dest-card">
      {item.image_url && <img src={item.image_url} alt={item.displayName} style={S.destCardImg} />}
      <div style={S.destCardBody}>
        <h3 style={S.destCardName}>{highlightText(item.displayName, query)}</h3>
        <p style={S.destCardDesc}>{item.displayDesc?.slice(0, 100)}{item.displayDesc?.length > 100 ? "…" : ""}</p>
      </div>
      <span style={S.destCardArrow}>→</span>
    </Link>
  );
}

function ListRow({ item, query, type }) {
  return (
    <Link to={item.path} style={S.listRow} className="list-row">
      <div style={{ ...S.listRowDot, backgroundColor: TYPE_META[type].color }} />
      <div style={S.listRowText}>
        <h3 style={S.listRowName}>{highlightText(item.displayName, query)}</h3>
        {item.displayDesc && <p style={S.listRowDesc}>{item.displayDesc?.slice(0, 120)}{item.displayDesc?.length > 120 ? "…" : ""}</p>}
      </div>
      <span style={S.listRowArrow}>→</span>
    </Link>
  );
}

function highlightText(text = "", query = "") {
  if (!query.trim() || !text) return text;
  const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"));
  return parts.map((p, i) =>
    p.toLowerCase() === query.toLowerCase()
      ? <mark key={i} style={{ background: "#c8a96e33", color: "#7a5c1e", fontWeight: 600, borderRadius: 2 }}>{p}</mark>
      : p
  );
}

// ── styles ────────────────────────────────────────────────────────────────────
const S = {
  page: { minHeight: "100vh", backgroundColor: "#fff", fontFamily: "'Georgia', serif" },

  header: { backgroundColor: "#0c1e14", padding: "64px 24px 52px" },
  headerInner: { maxWidth: 800, margin: "0 auto", textAlign: "center" },
  headerEyebrow: { fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "'Helvetica Neue', sans-serif", color: "#c8a96e", margin: "0 0 12px" },
  headerTitle: { fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 400, color: "#fff", margin: "0 0 10px", letterSpacing: "-0.02em" },
  headerCount: { fontSize: 13, fontFamily: "'Helvetica Neue', sans-serif", color: "rgba(255,255,255,0.4)", margin: "0 0 32px" },
  searchBarWrap: { maxWidth: 600, margin: "0 auto" },

  body: { maxWidth: 1100, margin: "0 auto", padding: "40px 24px 80px" },

  filters: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40, paddingBottom: 24, borderBottom: "1px solid #ece9e2" },
  filterBtn: {
    display: "flex", alignItems: "center", gap: 8, padding: "8px 16px",
    border: "1px solid #ece9e2", backgroundColor: "#fff", cursor: "pointer",
    fontFamily: "'Helvetica Neue', sans-serif", fontSize: 13, color: "#555",
    transition: "all 0.15s", letterSpacing: "0.02em",
  },
  filterBtnActive: { borderColor: "#204E59", color: "#204E59", backgroundColor: "#f0f6f8" },
  filterCount: { fontSize: 11, padding: "1px 7px", borderRadius: 10, fontWeight: 700 },

  loadingWrap: { display: "flex", flexDirection: "column", gap: 12 },
  shimmer: { height: 72, backgroundColor: "#f0ece6", borderRadius: 2 },

  emptyWrap: { textAlign: "center", padding: "64px 24px" },
  emptyIcon: { fontSize: 48, marginBottom: 16 },
  emptyTitle: { fontSize: 24, fontWeight: 400, margin: "0 0 12px", color: "#1a1a1a" },
  emptyText: { fontSize: 15, fontFamily: "'Helvetica Neue', sans-serif", color: "#888", margin: "0 0 28px", maxWidth: 480, marginInline: "auto" },
  emptySuggestions: { display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" },
  suggestionChip: {
    padding: "8px 18px", border: "1px solid #ece9e2", backgroundColor: "#faf8f5",
    cursor: "pointer", fontFamily: "'Helvetica Neue', sans-serif", fontSize: 13, color: "#444",
    transition: "all 0.15s",
  },

  section: { marginBottom: 52 },
  sectionHeader: { display: "flex", alignItems: "center", gap: 10, marginBottom: 20, paddingBottom: 12, borderBottom: "1px solid #f0ece6" },
  sectionIcon: { fontSize: 18 },
  sectionTitle: { fontSize: 18, fontWeight: 400, margin: 0, letterSpacing: "-0.01em", flex: 1 },
  sectionTag: { fontSize: 11, fontWeight: 700, padding: "2px 10px", borderRadius: 2, fontFamily: "'Helvetica Neue', sans-serif" },

  cardGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 },
  destCard: {
    display: "flex", flexDirection: "column", textDecoration: "none", color: "inherit",
    border: "1px solid #ece9e2", overflow: "hidden", transition: "transform 0.2s, box-shadow 0.2s",
  },
  destCardImg: { width: "100%", height: 160, objectFit: "cover", display: "block" },
  destCardBody: { padding: "16px 16px 12px", flex: 1 },
  destCardName: { fontSize: 16, fontWeight: 400, margin: "0 0 6px", letterSpacing: "-0.01em" },
  destCardDesc: { fontSize: 12, fontFamily: "'Helvetica Neue', sans-serif", color: "#888", margin: 0, lineHeight: 1.6 },
  destCardArrow: { fontSize: 14, color: "#c8a96e", padding: "0 16px 14px", fontFamily: "'Helvetica Neue', sans-serif" },

  listGrid: { display: "flex", flexDirection: "column", gap: 2 },
  listRow: {
    display: "flex", alignItems: "center", gap: 16, padding: "14px 16px",
    textDecoration: "none", color: "inherit", borderBottom: "1px solid #faf8f5",
    transition: "background 0.15s",
  },
  listRowDot: { width: 6, height: 6, borderRadius: "50%", flexShrink: 0 },
  listRowText: { flex: 1 },
  listRowName: { fontSize: 15, fontFamily: "'Georgia', serif", fontWeight: 400, margin: "0 0 3px" },
  listRowDesc: { fontSize: 12, fontFamily: "'Helvetica Neue', sans-serif", color: "#888", margin: 0 },
  listRowArrow: { fontSize: 14, color: "#ccc", flexShrink: 0 },
};

const css = `
  .filter-btn:hover { border-color: #204E59 !important; color: #204E59 !important; }
  .dest-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.1) !important; }
  .list-row:hover { background: #fdf9f3 !important; }
  .suggestion-chip:hover { background: #204E59 !important; color: #fff !important; border-color: #204E59 !important; }
  @keyframes shimmer {
    0%   { background-position: -600px 0; }
    100% { background-position: 600px 0; }
  }
  .shimmer {
    background: linear-gradient(90deg, #f0ece6 25%, #f7f4ef 50%, #f0ece6 75%);
    background-size: 1200px 100%;
    animation: shimmer 1.5s infinite;
  }
`;