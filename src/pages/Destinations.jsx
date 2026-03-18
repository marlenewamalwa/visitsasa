import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  return (
    <div style={styles.page}>
      <style>{css}</style>

      {/* Page Header */}
      <section style={styles.pageHeader}>
        <span style={styles.eyebrow}>Where To Go</span>
        <h1 style={styles.pageTitle}>Explore Destinations</h1>
        <p style={styles.pageDesc}>
          From the wildlife-rich savannahs of the Rift Valley to the coral shores of the
          Indian Ocean — every corner of Kenya tells a different story.
        </p>
      </section>

      {/* Divider */}
      <div style={styles.divider} />

      {/* Grid */}
      <section style={styles.section}>
        {loading ? (
          <div style={styles.grid}>
            {[1, 2, 3, 4, 5, 6].map(n => (
              <div key={n} style={styles.skeleton} className="skeleton" />
            ))}
          </div>
        ) : destinations.length === 0 ? (
          <p style={styles.empty}>No destinations found.</p>
        ) : (
          <div style={styles.grid}>
            {destinations.map((dest, i) => (
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

  /* Header */
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
    fontSize: "clamp(34px, 5vw, 58px)",
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
    margin: "0 auto 16px",
  },

  /* Section */
  section: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "32px 24px 80px",
  },

  /* Grid */
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: 28,
  },

  /* Card */
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

  /* Skeleton */
  skeleton: {
    height: 300,
    backgroundColor: "#ece9e2",
    borderRadius: 2,
  },

  empty: {
    textAlign: "center",
    color: "#888",
    fontFamily: "'Helvetica Neue', sans-serif",
    fontSize: 15,
    padding: "40px 0",
  },

  /* Bottom note */
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
  .skeleton { animation: pulse 1.5s ease-in-out infinite; }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.45; }
  }
`;

export default Destinations;