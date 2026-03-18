import React from "react";
import { Link } from "react-router-dom";

function PackageCard({ pkg }) {
  return (
    <>
      <style>{css}</style>
      <Link to={`/packages/${pkg.id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <div style={styles.card} className="pkg-card">

          {/* Image */}
          <div style={styles.imageWrap}>
            <img
              src={pkg.image_url || `https://placehold.co/600x400/1a2f2a/c8a96e?text=${encodeURIComponent(pkg.title)}`}
              alt={pkg.title}
              style={styles.image}
              className="pkg-img"
            />
            <div style={styles.imageOverlay} className="pkg-overlay" />
            {pkg.duration && (
              <span style={styles.durationBadge}>{pkg.duration}</span>
            )}
          </div>

          {/* Body */}
          <div style={styles.body}>
            <span style={styles.location}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#c8a96e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 4, flexShrink: 0 }}>
                <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              {pkg.location}
            </span>
            <h3 style={styles.title}>{pkg.title}</h3>
            {pkg.description && (
              <p style={styles.desc}>{pkg.description}</p>
            )}
          </div>

          {/* Footer */}
          <div style={styles.footer}>
            <div>
              <span style={styles.priceLabel}>From</span>
              <span style={styles.price}>
                KES {Number(pkg.price).toLocaleString()}
              </span>
            </div>
            <span style={styles.cta} className="pkg-cta">View Details →</span>
          </div>

        </div>
      </Link>
    </>
  );
}

const styles = {
  card: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    overflow: "hidden",
    boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
    transition: "transform 0.25s, box-shadow 0.25s",
    height: "100%",
    cursor: "pointer",
  },

  /* Image */
  imageWrap: {
    position: "relative",
    overflow: "hidden",
    height: 210,
    flexShrink: 0,
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
  durationBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(10,25,18,0.72)",
    color: "#fff",
    fontFamily: "'Helvetica Neue', sans-serif",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    padding: "5px 10px",
    backdropFilter: "blur(4px)",
  },

  /* Body */
  body: {
    padding: "18px 20px 14px",
    flex: 1,
  },
  location: {
    display: "inline-flex",
    alignItems: "center",
    fontSize: 11,
    fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#c8a96e",
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontFamily: "'Georgia', 'Times New Roman', serif",
    fontWeight: 400,
    margin: "0 0 10px",
    letterSpacing: "-0.01em",
    lineHeight: 1.25,
    color: "#1a1a1a",
  },
  desc: {
    fontSize: 13,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#888",
    lineHeight: 1.65,
    margin: 0,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },

  /* Footer */
  footer: {
    padding: "14px 20px 18px",
    borderTop: "1px solid #f0ece5",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  priceLabel: {
    display: "block",
    fontSize: 10,
    fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#bbb",
    marginBottom: 2,
  },
  price: {
    display: "block",
    fontSize: 17,
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 700,
    color: "#1a2f2a",
    letterSpacing: "-0.01em",
  },
  cta: {
    fontSize: 12,
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 600,
    color: "#c8a96e",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    transition: "letter-spacing 0.2s",
  },
};

const css = `
  .pkg-card:hover { transform: translateY(-4px); box-shadow: 0 12px 36px rgba(0,0,0,0.12) !important; }
  .pkg-card:hover .pkg-img { transform: scale(1.04); }
  .pkg-card:hover .pkg-overlay { background-color: rgba(10,25,18,0.12) !important; }
  .pkg-card:hover .pkg-cta { letter-spacing: 0.1em !important; }
`;

export default PackageCard;