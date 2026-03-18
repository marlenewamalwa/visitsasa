import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import stripBg from "../assets/murima.jpg";

const ACTIVITY_DESCS = {
  "Safari": "Track the Big Five across Kenya's iconic national parks and private conservancies.",
  "Beach": "Unwind on pristine Indian Ocean coastline with white sand and warm turquoise water.",
  "Hiking": "Trek through highland forests, crater rims, and dramatic Rift Valley landscapes.",
  "Cultural Tour": "Connect with local communities, traditions, and stories that define Kenya.",
  "Bird Watching": "Spot over 1,000 species across wetlands, forests, and open savannah.",
  "Water Sports": "Dive, snorkel, kitesurf, or sail along Kenya's stunning coral coast.",
  "Mountain Climbing": "Challenge yourself on the slopes of Mount Kenya, Africa's second highest peak.",
  "Cycling": "Pedal through tea farms, national parks, and rural villages at your own pace.",
};

function getDesc(activity) {
  if (!activity) return "";
  const key = Object.keys(ACTIVITY_DESCS).find(
    k => k.toLowerCase() === activity.toLowerCase()
  );
  return key ? ACTIVITY_DESCS[key] : "Explore this unique Kenyan experience on your own terms.";
}

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActivities = async () => {
      const { data, error } = await supabase
        .from("packages")
        .select("activity, image_url");

      if (error) { console.error(error); setLoading(false); return; }

      const unique = [];
      const seen = new Set();
      data.forEach(item => {
        if (item.activity && !seen.has(item.activity)) {
          seen.add(item.activity);
          unique.push(item);
        }
      });

      setActivities(unique);
      setLoading(false);
    };

    fetchActivities();
  }, []);

  return (
    <div style={styles.page}>
      <style>{css}</style>

      {/* Page Header */}
      <section style={styles.pageHeader}>
        <span style={styles.eyebrow}>Things To Do</span>
        <h1 style={styles.pageTitle}>Explore by Activity</h1>
        <p style={styles.pageDesc}>
          From game drives at dawn to night dives off the coast — Kenya offers an
          extraordinary range of experiences for every kind of traveller.
        </p>
      </section>
      <div style={styles.divider} />

      {/* Grid */}
      <section style={styles.section}>
        {loading ? (
          <div style={styles.grid}>
            {[1, 2, 3, 4, 5, 6].map(n => (
              <div key={n} style={styles.skeleton} className="skeleton" />
            ))}
          </div>
        ) : activities.length === 0 ? (
          <p style={styles.empty}>No activities found.</p>
        ) : (
          <div style={styles.grid}>
            {activities.map((act, i) => (
              <div
                key={i}
                style={styles.card}
                className="act-card"
                onClick={() => navigate(`/packages?activity=${act.activity}`)}
              >
                {/* Image */}
                <div style={styles.imageWrap}>
                  <img
                    src={act.image_url || `https://placehold.co/600x400/1a2f2a/c8a96e?text=${encodeURIComponent(act.activity)}`}
                    alt={act.activity}
                    style={styles.image}
                    className="act-img"
                  />
                  <div style={styles.imageOverlay} className="act-overlay" />
                  <span style={styles.indexBadge}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Body */}
                <div style={styles.cardBody}>
                  <h3 style={styles.cardTitle}>{act.activity}</h3>
                  <p style={styles.cardDesc}>{getDesc(act.activity)}</p>
                  <span style={styles.cardCta} className="act-cta">
                    View Packages →
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Bottom strip */}
      <section style={styles.bottomStrip}>
        <img src={stripBg} alt="strip" style={styles.stripBg} />
        <div style={styles.stripOverlay} />
        <div style={styles.stripContent}>
          <h2 style={styles.stripTitle}>Not sure where to start?</h2>
          <p style={styles.stripSub}>
            Tell us what excites you and we'll craft the perfect Kenya itinerary.
          </p>
          <a href="/contact" style={styles.stripBtn} className="strip-btn">
            Talk to Our Team
          </a>
        </div>
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
    margin: "0 auto",
  },

  section: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "52px 24px 80px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: 28,
  },

  /* Card */
  card: {
    cursor: "pointer",
    backgroundColor: "#fff",
    overflow: "hidden",
    boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
    transition: "transform 0.25s, box-shadow 0.25s",
  },
  imageWrap: {
    position: "relative",
    overflow: "hidden",
    height: 220,
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
  indexBadge: {
    position: "absolute",
    top: 14,
    left: 14,
    fontSize: 11,
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 700,
    letterSpacing: "0.1em",
    color: "#c8a96e",
    backgroundColor: "rgba(10,25,18,0.68)",
    padding: "4px 10px",
    backdropFilter: "blur(4px)",
  },
  cardBody: {
    padding: "20px 22px 24px",
    borderTop: "1px solid #f0ece5",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 400,
    margin: "0 0 9px",
    letterSpacing: "-0.01em",
    fontFamily: "'Georgia', serif",
  },
  cardDesc: {
    fontSize: 13,
    color: "#777",
    fontFamily: "'Helvetica Neue', sans-serif",
    lineHeight: 1.68,
    margin: "0 0 16px",
  },
  cardCta: {
    fontSize: 11,
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 700,
    color: "#c8a96e",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    transition: "letter-spacing 0.2s",
    display: "inline-block",
  },

  /* Skeleton */
  skeleton: {
    height: 320,
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

  /* Bottom strip */
  bottomStrip: {
    position: "relative",
    minHeight: 220,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  stripBg: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  stripOverlay: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(8,22,14,0.7)",
  },
  stripContent: {
    position: "relative",
    zIndex: 2,
    textAlign: "center",
    padding: "52px 24px",
  },
  stripTitle: {
    fontSize: "clamp(22px, 3.5vw, 38px)",
    fontWeight: 400,
    color: "#fff",
    margin: "0 0 10px",
    letterSpacing: "-0.02em",
  },
  stripSub: {
    fontSize: 15,
    color: "rgba(255,255,255,0.7)",
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 300,
    marginBottom: 26,
  },
  stripBtn: {
    display: "inline-block",
    padding: "12px 30px",
    backgroundColor: "#c8a96e",
    color: "#fff",
    textDecoration: "none",
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 600,
    fontSize: 13,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    transition: "background 0.2s",
  },
};

const css = `
  .act-card:hover { transform: translateY(-4px); box-shadow: 0 10px 36px rgba(0,0,0,0.12) !important; }
  .act-card:hover .act-img { transform: scale(1.05); }
  .act-card:hover .act-overlay { background-color: rgba(10,25,18,0.15) !important; }
  .act-card:hover .act-cta { letter-spacing: 0.16em !important; }
  .strip-btn:hover { background-color: #b8954f !important; }
  .skeleton { animation: pulse 1.5s ease-in-out infinite; }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.45; }
  }
`;

export default Activities;