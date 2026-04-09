import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

// ── helpers ──────────────────────────────────────────────────────────────────
const STATIC_PAGES = [
  { id: "p1", type: "page", name: "How It Works",  desc: "Learn how our trip planning process works.", path: "/howitworks" },
  { id: "p2", type: "page", name: "About Us",       desc: "The story behind 204E59.",             path: "/about"      },
  { id: "p3", type: "page", name: "Contact Us",     desc: "Get in touch with our team.",               path: "/contact"    },
];

const TYPE_META = {
  destination: { label: "Destination", color: "#204E59", bg: "#e8f1f3" },
  activity:    { label: "Activity",    color: "#7a5c1e", bg: "#fdf3e3" },
  tip:         { label: "Travel Tip",  color: "#3a5c2e", bg: "#eaf3e8" },
  page:        { label: "Page",        color: "#555",    bg: "#f0f0f0" },
};

function highlight(text = "", query = "") {
  if (!query.trim() || !text) return text;
  const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"));
  return parts.map((p, i) =>
    p.toLowerCase() === query.toLowerCase()
      ? <mark key={i} style={{ background: "#c8a96e33", color: "#7a5c1e", fontWeight: 600, borderRadius: 2 }}>{p}</mark>
      : p
  );
}

// ── component ─────────────────────────────────────────────────────────────────
export default function SearchBar({ placeholder = "Search destinations, activities, tips…", autoFocus = false }) {
  const navigate   = useNavigate();
  const inputRef   = useRef(null);
  const wrapRef    = useRef(null);

  const [query,    setQuery]    = useState("");
  const [results,  setResults]  = useState([]);
  const [loading,  setLoading]  = useState(false);
  const [open,     setOpen]     = useState(false);
  const [active,   setActive]   = useState(-1);   // keyboard nav index

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Debounced search
  const doSearch = useCallback(async (q) => {
    if (!q.trim()) { setResults([]); setLoading(false); return; }
    setLoading(true);

    const [destRes, actRes, tipRes] = await Promise.all([
      supabase.from("destinations").select("id, name, description, image_url").ilike("name", `%${q}%`).limit(4),
      supabase.from("activities").select("id, name, description").ilike("name", `%${q}%`).limit(4),
      supabase.from("travel_tips").select("id, title, excerpt").ilike("title", `%${q}%`).limit(3),
    ]);

    const destinations = (destRes.data || []).map((d) => ({ ...d, type: "destination", displayName: d.name, displayDesc: d.description, path: `/destinations?q=${encodeURIComponent(d.name)}` }));
    const activities   = (actRes.data  || []).map((a) => ({ ...a, type: "activity",    displayName: a.name, displayDesc: a.description, path: `/activities?q=${encodeURIComponent(a.name)}` }));
    const tips         = (tipRes.data  || []).map((t) => ({ ...t, type: "tip",         displayName: t.title, displayDesc: t.excerpt,    path: `/travel-tips?q=${encodeURIComponent(t.title)}` }));
    const pages        = STATIC_PAGES.filter((p) => p.name.toLowerCase().includes(q.toLowerCase())).map((p) => ({ ...p, displayName: p.name, displayDesc: p.desc }));

    setResults([...destinations, ...activities, ...tips, ...pages]);
    setLoading(false);
  }, []);

  useEffect(() => {
    setActive(-1);
    if (!query.trim()) { setResults([]); setOpen(false); return; }
    setOpen(true);
    const timer = setTimeout(() => doSearch(query), 280);
    return () => clearTimeout(timer);
  }, [query, doSearch]);

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (!open) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((v) => Math.min(v + 1, results.length)); }
    if (e.key === "ArrowUp")   { e.preventDefault(); setActive((v) => Math.max(v - 1, -1)); }
    if (e.key === "Escape")    { setOpen(false); inputRef.current?.blur(); }
    if (e.key === "Enter") {
      e.preventDefault();
      if (active >= 0 && active < results.length) {
        navigate(results[active].path);
        setOpen(false); setQuery("");
      } else {
        goToFullResults();
      }
    }
  };

  const goToFullResults = () => {
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    setOpen(false);
  };

  const handleSelect = (item) => {
    navigate(item.path);
    setOpen(false);
    setQuery("");
  };

  // Group results by type for dropdown display
  const grouped = ["destination", "activity", "tip", "page"].reduce((acc, type) => {
    const items = results.filter((r) => r.type === type);
    if (items.length) acc[type] = items;
    return acc;
  }, {});

  const totalResults = results.length;

  return (
    <>
      <style>{css}</style>
      <div ref={wrapRef} style={S.wrap} className="search-wrap">
        <div style={{ ...S.inputWrap, boxShadow: open ? "0 0 0 2px #c8a96e" : "0 2px 16px rgba(0,0,0,0.1)" }}>
          {/* Search icon */}
          <svg style={S.icon} viewBox="0 0 20 20" fill="none">
            <circle cx="8.5" cy="8.5" r="5.5" stroke="#aaa" strokeWidth="1.5" />
            <path d="M13 13l3.5 3.5" stroke="#aaa" strokeWidth="1.5" strokeLinecap="round" />
          </svg>

          <input
            ref={inputRef}
            autoFocus={autoFocus}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => query.trim() && setOpen(true)}
            placeholder={placeholder}
            style={S.input}
            aria-label="Search"
            aria-expanded={open}
            aria-autocomplete="list"
          />

          {/* Loading spinner */}
          {loading && (
            <div style={S.spinner} className="search-spinner" />
          )}

          {/* Clear */}
          {query && !loading && (
            <button style={S.clearBtn} onClick={() => { setQuery(""); setResults([]); setOpen(false); inputRef.current?.focus(); }} aria-label="Clear">
              ✕
            </button>
          )}

          {/* Search button */}
          <button style={S.searchBtn} className="search-submit-btn" onClick={goToFullResults} disabled={!query.trim()}>
            Search
          </button>
        </div>

        {/* ── DROPDOWN ── */}
        {open && (
          <div style={S.dropdown} role="listbox">
            {totalResults === 0 && !loading && (
              <div style={S.emptyState}>
                <span style={S.emptyIcon}>🔍</span>
                <p style={S.emptyText}>No results for "<strong>{query}</strong>"</p>
                <p style={S.emptyHint}>Try a destination name, activity, or travel topic.</p>
              </div>
            )}

            {Object.entries(grouped).map(([type, items]) => (
              <div key={type}>
                <div style={S.groupLabel}>
                  <span style={{ ...S.groupTag, color: TYPE_META[type].color, backgroundColor: TYPE_META[type].bg }}>
                    {TYPE_META[type].label}s
                  </span>
                </div>
                {items.map((item, i) => {
                  const globalIdx = results.indexOf(item);
                  const isActive  = globalIdx === active;
                  return (
                    <div
                      key={item.id}
                      role="option"
                      aria-selected={isActive}
                      style={{ ...S.resultItem, backgroundColor: isActive ? "#fdf9f3" : "transparent" }}
                      className="search-result-item"
                      onMouseEnter={() => setActive(globalIdx)}
                      onMouseLeave={() => setActive(-1)}
                      onClick={() => handleSelect(item)}
                    >
                      {item.image_url && (
                        <img src={item.image_url} alt={item.displayName} style={S.resultThumb} />
                      )}
                      <div style={S.resultText}>
                        <p style={S.resultName}>{highlight(item.displayName, query)}</p>
                        {item.displayDesc && (
                          <p style={S.resultDesc}>{highlight(item.displayDesc?.slice(0, 80) + (item.displayDesc?.length > 80 ? "…" : ""), query)}</p>
                        )}
                      </div>
                      <span style={S.resultArrow}>→</span>
                    </div>
                  );
                })}
              </div>
            ))}

            {/* See all results CTA */}
            {totalResults > 0 && (
              <button
                style={{ ...S.seeAllRow, backgroundColor: active === results.length ? "#fdf9f3" : "#faf8f5" }}
                className="search-see-all"
                onMouseEnter={() => setActive(results.length)}
                onMouseLeave={() => setActive(-1)}
                onClick={goToFullResults}
              >
                <svg style={{ width: 14, height: 14, flexShrink: 0 }} viewBox="0 0 20 20" fill="none">
                  <circle cx="8.5" cy="8.5" r="5.5" stroke="#c8a96e" strokeWidth="1.5" />
                  <path d="M13 13l3.5 3.5" stroke="#c8a96e" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                See all results for "<strong style={{ color: "#1a1a1a" }}>{query}</strong>"
                <span style={S.seeAllCount}>{totalResults}+</span>
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}

// ── styles ────────────────────────────────────────────────────────────────────
const S = {
  wrap: { position: "relative", width: "100%", maxWidth: 640, margin: "0 auto" },

  inputWrap: {
    display: "flex", alignItems: "center", gap: 0,
    backgroundColor: "#fff", border: "1px solid #e8e4de",
    transition: "box-shadow 0.2s",
    overflow: "hidden",
  },

  icon: { width: 18, height: 18, flexShrink: 0, marginLeft: 16 },

  input: {
    flex: 1, border: "none", outline: "none", padding: "14px 12px",
    fontSize: 15, fontFamily: "'Helvetica Neue', sans-serif", color: "#1a1a1a",
    backgroundColor: "transparent",
    "::placeholder": { color: "#bbb" },
  },

  spinner: {
    width: 16, height: 16, flexShrink: 0, marginRight: 8,
    border: "2px solid #ece9e2", borderTop: "2px solid #c8a96e",
    borderRadius: "50%",
  },

  clearBtn: {
    background: "none", border: "none", cursor: "pointer",
    color: "#bbb", fontSize: 12, padding: "0 8px",
    flexShrink: 0, transition: "color 0.15s",
  },

  searchBtn: {
    padding: "0 22px", height: 50, backgroundColor: "#204E59",
    color: "#fff", border: "none", cursor: "pointer",
    fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 600,
    fontSize: 13, letterSpacing: "0.06em", textTransform: "uppercase",
    flexShrink: 0, transition: "background 0.2s",
    ":disabled": { opacity: 0.5 },
  },

  dropdown: {
    position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0,
    backgroundColor: "#fff", border: "1px solid #ece9e2",
    boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
    zIndex: 300, maxHeight: 480, overflowY: "auto",
  },

  groupLabel: { padding: "10px 16px 4px", },
  groupTag: {
    fontSize: 9, fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.14em", textTransform: "uppercase",
    fontWeight: 700, padding: "2px 8px", borderRadius: 2,
  },

  resultItem: {
    display: "flex", alignItems: "center", gap: 12,
    padding: "10px 16px", cursor: "pointer",
    transition: "background 0.12s", borderBottom: "1px solid #faf8f5",
  },
  resultThumb: { width: 44, height: 36, objectFit: "cover", flexShrink: 0 },
  resultText: { flex: 1, minWidth: 0 },
  resultName: { fontSize: 14, fontFamily: "'Georgia', serif", margin: "0 0 2px", color: "#1a1a1a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  resultDesc: { fontSize: 12, fontFamily: "'Helvetica Neue', sans-serif", color: "#888", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  resultArrow: { fontSize: 14, color: "#ccc", flexShrink: 0 },

  seeAllRow: {
    display: "flex", alignItems: "center", gap: 8, width: "100%",
    padding: "13px 16px", border: "none", borderTop: "1px solid #ece9e2",
    cursor: "pointer", fontSize: 13, fontFamily: "'Helvetica Neue', sans-serif",
    color: "#666", textAlign: "left", transition: "background 0.12s",
  },
  seeAllCount: {
    marginLeft: "auto", fontSize: 11, backgroundColor: "#c8a96e",
    color: "#fff", padding: "2px 8px", borderRadius: 10,
    fontFamily: "'Helvetica Neue', sans-serif",
  },

  emptyState: { padding: "32px 24px", textAlign: "center" },
  emptyIcon: { fontSize: 28, display: "block", marginBottom: 8 },
  emptyText: { fontSize: 14, fontFamily: "'Helvetica Neue', sans-serif", color: "#444", margin: "0 0 6px" },
  emptyHint: { fontSize: 12, fontFamily: "'Helvetica Neue', sans-serif", color: "#aaa", margin: 0 },
};

const css = `
  .search-result-item:hover { background: #fdf9f3 !important; }
  .search-see-all:hover { background: #fdf9f3 !important; }
  .search-submit-btn:hover:not(:disabled) { background: #163640 !important; }
  .search-spinner { animation: spin 0.7s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }
`;