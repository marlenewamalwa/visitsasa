import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate, useLocation } from "react-router-dom";

function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const locationHook = useLocation();

  // Pre-fill search from ?location= URL param (coming from Home "Explore")
  useEffect(() => {
    const params = new URLSearchParams(locationHook.search);
    const loc = params.get("location");
    if (loc) setSearch(loc);
  }, [locationHook.search]);

  useEffect(() => {
    const fetchDestinations = async () => {
      const { data, error } = await supabase
        .from("packages")
        .select("location, image_url");

      if (error) { console.error(error); setLoading(false); return; }

      const unique = [];
      const seen = new Set();
      data.forEach(item => {
        if (!seen.has(item.location)) {
          seen.add(item.location);
          unique.push(item);
        }
      });

      setDestinations(unique);
      setLoading(false);
    };

    fetchDestinations();
  }, []);

  // Filter by search term
  const filtered = destinations.filter(d =>
    d.location.toLowerCase().includes(search.toLowerCase())
  );

  const hasSearch = search.trim().length > 0;

  return (
    <div style={styles.page}>
      <style>{css}</style>

      {/* Page Header */}
      <section style={styles.pageHeader}>
        <span style={styles.eyebrow}>Where To Go</span>
        <h1 style={styles.pageTitle}>
          {hasSearch ? `"${search}"` : "Explore Destinations"}
        </h1>
        <p style={styles.pageDesc}>
          From the wildlife-rich savannahs of the Rift Valley to the coral shores of the
          Indian Ocean — every corner of Kenya tells a different story.
        </p>
      </section>

      <div style={styles.divider} />

      {/* Search bar */}
      <section style={styles.searchSection}>
        <div style={styles.searchWrap}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={styles.searchIcon}>
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="text"
            placeholder="Search destinations..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={styles.searchInput}
            className="search-input"
          />
          {hasSearch && (
            <button
              style={styles.clearBtn}
              className="clear-btn"
              onClick={() => {
                setSearch("");
                navigate("/destinations", { replace: true });
              }}
            >
              &times;
            </button>
          )}
        </div>

        {/* Result count */}
        {!loading && (
          <p style={styles.resultCount}>
            {filtered.length} destination{filtered.length !== 1 ? "s" : ""}
            {hasSearch ? ` matching "${search}"` : " available"}
          </p>
        )}
      </section>

      {/* Grid */}
      <section style={styles.section}>
        {loading ? (
          <div style={styles.grid}>
            {[1, 2, 3, 4, 5, 6].map(n => (
              <div key={n} style={styles.skeleton} className="skeleton" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div style={styles.empty}>
            <p style={styles.emptyTitle}>No destinations found for "{search}"</p>
            <button
              style={styles.emptyReset}
              className="clear-btn"
              onClick={() => { setSearch(""); navigate("/destinations", { replace: true }); }}
            >
              Clear search
            </button>
          </div>
        ) : (
          <div style={styles.grid}>
            {filtered.map((dest, i) => (
              <div
                key={i}
                style={styles.card}
                className="dest-card"
                onClick={() => navigate(`/packages?location=${dest.location}`)}
              >
                <div style={styles.imageWrap}>
                  <img
                    src={dest.image_url || `https://placehold.co/600x400/1a2f2a/c8a96e?text=${encodeURIComponent(dest.location)}`}
                    alt={dest.location}
                    style={styles.image}
                  />
                  <div style={styles.imageOverlay} className="card-overlay" />
                </div>
                <div style={styles.cardBody}>
                  <h3 style={styles.cardTitle}>{dest.location}</h3>
                  <span style={styles.cardCta} className="card-cta">
                    View Packages &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Bottom note */}
      <section style={styles.note}>
        <p style={styles.noteText}>
          Can't find what you're looking for?{" "}
          <a href="/contact" style={styles.noteLink}>Contact our team</a>{" "}
          and we'll build a custom itinerary for you.
        </p>
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

  pageHeader: {
    maxWidth: 680,
    margin: "0 auto",
    padding: "72px 24px 40px",
    textAlign: "center",
  },
  eyebrow: {
    display: "inline-block",
    fontSize: 11,
    fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "#c8a96e",
    marginBottom: 16,
    borderBottom: "1px solid #c8a96e",
    paddingBottom: 6,
  },
  pageTitle: {
    fontSize: "clamp(30px, 5vw, 52px)",
    fontWeight: 400,
    letterSpacing: "-0.02em",
    lineHeight: 1.1,
    margin: "0 0 20px",
  },
  pageDesc: {
    fontSize: 16,
    color: "#666",
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 300,
    lineHeight: 1.75,
    margin: 0,
  },

  divider: {
    width: 48,
    height: 1,
    backgroundColor: "#c8a96e",
    margin: "0 auto",
  },

  /* Search */
  searchSection: {
    maxWidth: 600,
    margin: "0 auto",
    padding: "36px 24px 0",
  },
  searchWrap: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    border: "1px solid #ddd",
    backgroundColor: "#fafaf8",
    transition: "border-color 0.2s",
  },
  searchIcon: {
    position: "absolute",
    left: 14,
    flexShrink: 0,
    pointerEvents: "none",
  },
  searchInput: {
    width: "100%",
    padding: "13px 44px",
    border: "none",
    backgroundColor: "transparent",
    fontFamily: "'Helvetica Neue', sans-serif",
    fontSize: 14,
    color: "#1a1a1a",
    outline: "none",
  },
  clearBtn: {
    position: "absolute",
    right: 12,
    background: "none",
    border: "none",
    fontSize: 20,
    color: "#aaa",
    cursor: "pointer",
    lineHeight: 1,
    padding: "0 4px",
    transition: "color 0.15s",
  },
  resultCount: {
    fontSize: 12,
    fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#aaa",
    marginTop: 12,
    marginBottom: 0,
    textAlign: "center",
  },

  section: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "32px 24px 80px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: 28,
  },

  card: {
    cursor: "pointer",
    overflow: "hidden",
    backgroundColor: "#fff",
    boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
    transition: "transform 0.25s, box-shadow 0.25s",
  },
  imageWrap: {
    position: "relative",
    overflow: "hidden",
    height: 230,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    transition: "transform 0.4s ease",
  },
  imageOverlay: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(10,25,18,0)",
    transition: "background-color 0.3s",
  },
  cardBody: {
    padding: "20px 22px 22px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderTop: "1px solid #f0ece5",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 400,
    margin: 0,
    letterSpacing: "-0.01em",
  },
  cardCta: {
    fontSize: 12,
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 600,
    color: "#c8a96e",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
    transition: "letter-spacing 0.2s",
  },

  skeleton: {
    height: 300,
    backgroundColor: "#ece9e2",
    borderRadius: 2,
  },

  empty: {
    textAlign: "center",
    padding: "60px 24px",
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 400,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#888",
    margin: "0 0 16px",
  },
  emptyReset: {
    background: "none",
    border: "1px solid #1a2f2a",
    color: "#1a2f2a",
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 600,
    fontSize: 12,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    padding: "10px 20px",
    cursor: "pointer",
    transition: "background 0.2s, color 0.2s",
  },

  note: {
    borderTop: "1px solid #ece9e2",
    padding: "32px 24px",
    textAlign: "center",
  },
  noteText: {
    fontSize: 14,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#888",
    margin: 0,
  },
  noteLink: {
    color: "#1a2f2a",
    fontWeight: 600,
    textDecoration: "none",
    borderBottom: "1px solid #1a2f2a",
    paddingBottom: 1,
  },
};

const css = `
  .dest-card:hover { transform: translateY(-4px); box-shadow: 0 10px 36px rgba(0,0,0,0.12) !important; }
  .dest-card:hover img { transform: scale(1.04); }
  .dest-card:hover .card-overlay { background-color: rgba(10,25,18,0.15) !important; }
  .dest-card:hover .card-cta { letter-spacing: 0.1em !important; }
  .search-input:focus { outline: none; }
  .search-input:focus + * { border-color: #c8a96e; }
  .clear-btn:hover { color: #1a2f2a !important; }
  .emptyReset:hover { background: #1a2f2a !important; color: #fff !important; }
  .skeleton { animation: pulse 1.5s ease-in-out infinite; }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.45; }
  }
`;

export default Destinations;