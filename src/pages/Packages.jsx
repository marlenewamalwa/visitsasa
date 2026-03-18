import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import PackageCard from "../components/PackageCard";
import { useLocation, useNavigate } from "react-router-dom";

function Packages() {
  const [packages, setPackages] = useState([]);
  const [allLocations, setAllLocations] = useState([]);
  const [allDurations, setAllDurations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterDuration, setFilterDuration] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const locationHook = useLocation();
  const navigate = useNavigate();

  // On mount: read ?location= from URL and pre-fill the filter
  useEffect(() => {
    const params = new URLSearchParams(locationHook.search);
    const loc = params.get("location");
    if (loc) setFilterLocation(loc);
  }, [locationHook.search]);

  // Fetch all packages once for dropdown options
  useEffect(() => {
    const fetchMeta = async () => {
      const { data } = await supabase.from("packages").select("location, duration");
      if (data) {
        setAllLocations([...new Set(data.map(p => p.location).filter(Boolean))]);
        setAllDurations([...new Set(data.map(p => p.duration).filter(Boolean))]);
      }
    };
    fetchMeta();
  }, []);

  // Fetch filtered packages
  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      let query = supabase.from("packages").select("*");

      if (search) query = query.ilike("title", `%${search}%`).or(`location.ilike.%${search}%`);
      if (filterLocation) query = query.eq("location", filterLocation);
      if (filterDuration) query = query.eq("duration", filterDuration);
      if (minPrice) query = query.gte("price", Number(minPrice));
      if (maxPrice) query = query.lte("price", Number(maxPrice));

      const { data, error } = await query;
      if (error) console.error(error);
      else setPackages(data);
      setLoading(false);
    };

    fetchPackages();
  }, [search, filterLocation, filterDuration, minPrice, maxPrice]);

  const hasActiveFilters = search || filterLocation || filterDuration || minPrice || maxPrice;

  const handleReset = () => {
    setSearch("");
    setFilterLocation("");
    setFilterDuration("");
    setMinPrice("");
    setMaxPrice("");
    navigate("/packages", { replace: true }); // clear URL param too
  };

  return (
    <div style={styles.page}>
      <style>{css}</style>

      {/* Page Header */}
      <section style={styles.pageHeader}>
        <span style={styles.eyebrow}>Plan Your Trip</span>
        <h1 style={styles.pageTitle}>
          {filterLocation ? filterLocation : "All Packages"}
        </h1>
        <p style={styles.pageDesc}>
          {filterLocation
            ? `Showing travel packages available in ${filterLocation}.`
            : "Browse our full collection of curated Kenya travel experiences."}
        </p>
      </section>

      <div style={styles.divider} />

      {/* Filters */}
      <section style={styles.filterSection}>
        <div style={styles.filterBar}>
          <input
            type="text"
            placeholder="Search title or location..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={styles.input}
            className="filter-input"
          />
          <select
            value={filterLocation}
            onChange={e => setFilterLocation(e.target.value)}
            style={styles.input}
            className="filter-input"
          >
            <option value="">All Locations</option>
            {allLocations.map((loc, i) => (
              <option key={i} value={loc}>{loc}</option>
            ))}
          </select>
          <select
            value={filterDuration}
            onChange={e => setFilterDuration(e.target.value)}
            style={styles.input}
            className="filter-input"
          >
            <option value="">All Durations</option>
            {allDurations.map((dur, i) => (
              <option key={i} value={dur}>{dur}</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={e => setMinPrice(e.target.value)}
            style={{ ...styles.input, maxWidth: 120 }}
            className="filter-input"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={e => setMaxPrice(e.target.value)}
            style={{ ...styles.input, maxWidth: 120 }}
            className="filter-input"
          />
          {hasActiveFilters && (
            <button onClick={handleReset} style={styles.resetBtn} className="reset-btn">
              Clear Filters
            </button>
          )}
        </div>

        {/* Active filter pill */}
        {filterLocation && (
          <div style={styles.activePills}>
            <span style={styles.pill}>
              {filterLocation}
              <button
                style={styles.pillRemove}
                onClick={() => { setFilterLocation(""); navigate("/packages", { replace: true }); }}
              >
                &times;
              </button>
            </span>
          </div>
        )}
      </section>

      {/* Results */}
      <section style={styles.resultsSection}>
        {!loading && (
          <p style={styles.resultCount}>
            {packages.length} package{packages.length !== 1 ? "s" : ""} found
          </p>
        )}

        {loading ? (
          <div style={styles.grid}>
            {[1, 2, 3, 4, 5, 6].map(n => (
              <div key={n} style={styles.skeleton} className="skeleton" />
            ))}
          </div>
        ) : packages.length === 0 ? (
          <div style={styles.empty}>
            <p style={styles.emptyTitle}>No packages found</p>
            <p style={styles.emptyDesc}>Try adjusting your filters or{" "}
              <button onClick={handleReset} style={styles.inlineLink}>clear all filters</button>.
            </p>
          </div>
        ) : (
          <div style={styles.grid}>
            {packages.map(pkg => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        )}
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
    fontSize: "clamp(32px, 5vw, 54px)",
    fontWeight: 400,
    letterSpacing: "-0.02em",
    lineHeight: 1.1,
    margin: "0 0 18px",
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
    margin: "0 auto 0",
  },

  /* Filters */
  filterSection: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "36px 24px 0",
  },
  filterBar: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    alignItems: "center",
  },
  input: {
    padding: "10px 14px",
    border: "1px solid #ddd",
    borderRadius: 2,
    fontFamily: "'Helvetica Neue', sans-serif",
    fontSize: 13,
    color: "#1a1a1a",
    backgroundColor: "#fafaf8",
    outline: "none",
    minWidth: 140,
    flex: "1 1 140px",
    transition: "border-color 0.2s",
  },
  resetBtn: {
    padding: "10px 20px",
    backgroundColor: "transparent",
    border: "1px solid #1a2f2a",
    color: "#1a2f2a",
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 600,
    fontSize: 12,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    cursor: "pointer",
    transition: "background 0.2s, color 0.2s",
    whiteSpace: "nowrap",
  },

  /* Active filter pills */
  activePills: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
    marginTop: 14,
  },
  pill: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "5px 12px",
    backgroundColor: "#f0ece5",
    border: "1px solid #ddd",
    borderRadius: 2,
    fontSize: 12,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#1a2f2a",
    fontWeight: 500,
  },
  pillRemove: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: 14,
    color: "#888",
    padding: 0,
    lineHeight: 1,
  },

  /* Results */
  resultsSection: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "28px 24px 80px",
  },
  resultCount: {
    fontSize: 12,
    fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#999",
    marginBottom: 24,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: 28,
  },
  skeleton: {
    height: 320,
    backgroundColor: "#ece9e2",
    borderRadius: 2,
  },

  /* Empty state */
  empty: {
    textAlign: "center",
    padding: "60px 24px",
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 400,
    margin: "0 0 10px",
  },
  emptyDesc: {
    fontSize: 14,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#888",
    margin: 0,
  },
  inlineLink: {
    background: "none",
    border: "none",
    borderBottom: "1px solid #888",
    color: "#1a2f2a",
    cursor: "pointer",
    fontFamily: "'Helvetica Neue', sans-serif",
    fontSize: 14,
    padding: 0,
    fontWeight: 600,
  },
};

const css = `
  .filter-input:focus { border-color: #c8a96e !important; background: #fff !important; }
  .reset-btn:hover { background: #1a2f2a !important; color: #fff !important; }
  .skeleton { animation: pulse 1.5s ease-in-out infinite; }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.45; }
  }
`;

export default Packages;