import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

function PackageDetails() {
  const { id } = useParams();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("1");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPackage = async () => {
      const { data, error } = await supabase
        .from("packages")
        .select("*")
        .eq("id", id)
        .single();
      if (error) console.error(error);
      else setPkg(data);
      setLoading(false);
    };
    fetchPackage();
  }, [id]);

  const handleSubmit = async () => {
    if (!name || !phone) { setError("Please fill in all required fields."); return; }
    setError("");
    setSubmitting(true);

    const { error: insertError } = await supabase.from("bookings").insert({
      name,
      phone,
      package_id: pkg.id,
    });

    setSubmitting(false);
    if (insertError) {
      setError("Something went wrong. Please try again.");
    } else {
      setSubmitted(true);
      setName(""); setPhone(""); setEmail(""); setDate(""); setGuests("1");
    }
  };

  if (loading) return (
    <div style={styles.loadingPage}>
      <div style={styles.loadingInner}>
        {[1, 2, 3].map(n => <div key={n} style={styles.skeleton} className="skeleton" />)}
      </div>
      <style>{css}</style>
    </div>
  );

  if (!pkg) return (
    <div style={styles.notFound}>
      <style>{css}</style>
      <h2 style={styles.notFoundTitle}>Package not found</h2>
      <Link to="/packages" style={styles.backLink}>← Back to Packages</Link>
    </div>
  );

  return (
    <div style={styles.page}>
      <style>{css}</style>

      {/* Hero image */}
      <section style={styles.hero}>
        <img
          src={pkg.image_url || `https://placehold.co/1400x560/1a2f2a/c8a96e?text=${encodeURIComponent(pkg.title)}`}
          alt={pkg.title}
          style={styles.heroBg}
        />
        <div style={styles.heroOverlay} />
        <div style={styles.heroContent}>
          <Link to="/packages" style={styles.heroBack}>← All Packages</Link>
          <span style={styles.heroLocation}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c8a96e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 5 }}>
              <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            {pkg.location}
          </span>
          <h1 style={styles.heroTitle}>{pkg.title}</h1>
          <div style={styles.heroBadges}>
            {pkg.duration && <span style={styles.badge}>{pkg.duration}</span>}
            <span style={styles.badge}>KES {Number(pkg.price).toLocaleString()}</span>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section style={styles.main}>

        {/* Left — details */}
        <div style={styles.detailsCol}>

          {/* Quick info bar */}
          <div style={styles.quickBar}>
            <div style={styles.quickItem}>
              <span style={styles.quickLabel}>Location</span>
              <span style={styles.quickValue}>{pkg.location}</span>
            </div>
            <div style={styles.quickDivider} />
            <div style={styles.quickItem}>
              <span style={styles.quickLabel}>Duration</span>
              <span style={styles.quickValue}>{pkg.duration || "—"}</span>
            </div>
            <div style={styles.quickDivider} />
            <div style={styles.quickItem}>
              <span style={styles.quickLabel}>Price</span>
              <span style={styles.quickValue}>KES {Number(pkg.price).toLocaleString()}</span>
            </div>
          </div>

          {/* Description */}
          <div style={styles.descSection}>
            <span style={styles.sectionTag}>About This Package</span>
            <h2 style={styles.descTitle}>Overview</h2>
            <p style={styles.descBody}>
              {pkg.description || "A carefully curated travel experience designed to show you the very best of Kenya. Contact us for the full itinerary and inclusions."}
            </p>
          </div>

          {/* What's included */}
          <div style={styles.includesSection}>
            <span style={styles.sectionTag}>What's Included</span>
            <div style={styles.includesGrid}>
              {["Accommodation", "Transport", "Guided Tours", "Park Fees"].map((item, i) => (
                <div key={i} style={styles.includeItem}>
                  <span style={styles.includeCheck}>✓</span>
                  <span style={styles.includeText}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA to scroll on mobile */}
          <div style={styles.mobileBookCta}>
            <a href="#booking-form" style={styles.mobileBookBtn} className="mobile-book-btn">
              Book This Package →
            </a>
          </div>
        </div>

        {/* Right — booking form */}
        <div style={styles.formCol} id="booking-form">
          <div style={styles.formCard}>
            <div style={styles.formHeader}>
              <span style={styles.sectionTag}>Reserve Your Spot</span>
              <h3 style={styles.formTitle}>Book This Package</h3>
              <p style={styles.formDesc}>
                Fill in your details and our team will confirm your booking within 24 hours.
              </p>
            </div>

            {submitted ? (
              <div style={styles.successBox}>
                <div style={styles.successIcon}>✓</div>
                <h4 style={styles.successTitle}>Booking Received!</h4>
                <p style={styles.successDesc}>
                  Thank you, {name || "traveller"}! We'll reach out to confirm your booking shortly.
                </p>
                <button
                  style={styles.submitBtn}
                  className="submit-btn"
                  onClick={() => setSubmitted(false)}
                >
                  Make Another Booking
                </button>
              </div>
            ) : (
              <>
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Full Name *</label>
                  <input
                    type="text"
                    placeholder="Jane Mwangi"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    style={styles.input}
                    className="form-input"
                  />
                </div>

                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Phone Number *</label>
                  <input
                    type="tel"
                    placeholder="+254 7XX XXX XXX"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    style={styles.input}
                    className="form-input"
                  />
                </div>

                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Email Address</label>
                  <input
                    type="email"
                    placeholder="jane@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={styles.input}
                    className="form-input"
                  />
                </div>

                <div style={styles.fieldRow}>
                  <div style={styles.fieldGroup}>
                    <label style={styles.label}>Travel Date</label>
                    <input
                      type="date"
                      value={date}
                      onChange={e => setDate(e.target.value)}
                      style={styles.input}
                      className="form-input"
                    />
                  </div>
                  <div style={styles.fieldGroup}>
                    <label style={styles.label}>Guests</label>
                    <select
                      value={guests}
                      onChange={e => setGuests(e.target.value)}
                      style={styles.input}
                      className="form-input"
                    >
                      {[1,2,3,4,5,6,7,8].map(n => (
                        <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {error && <p style={styles.errorMsg}>{error}</p>}

                <button
                  onClick={handleSubmit}
                  disabled={submitting || !name || !phone}
                  style={{
                    ...styles.submitBtn,
                    opacity: (!name || !phone) ? 0.5 : 1,
                    cursor: (!name || !phone) ? "not-allowed" : "pointer",
                  }}
                  className="submit-btn"
                >
                  {submitting ? "Submitting..." : "Confirm Booking →"}
                </button>

                <p style={styles.formNote}>* Required fields. No payment needed at this stage.</p>
              </>
            )}
          </div>
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

  /* Loading */
  loadingPage: { maxWidth: 1100, margin: "60px auto", padding: "0 24px" },
  loadingInner: { display: "flex", flexDirection: "column", gap: 20 },
  skeleton: { height: 180, backgroundColor: "#ece9e2", borderRadius: 2 },

  /* Not found */
  notFound: { textAlign: "center", padding: "120px 24px" },
  notFoundTitle: { fontSize: 28, fontWeight: 400, margin: "0 0 20px" },
  backLink: { color: "#1a2f2a", fontFamily: "'Helvetica Neue', sans-serif", fontSize: 14, fontWeight: 600 },

  /* Hero */
  hero: {
    position: "relative",
    minHeight: 480,
    display: "flex",
    alignItems: "flex-end",
    overflow: "hidden",
  },
  heroBg: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  heroOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(8,22,14,0.82) 0%, rgba(8,22,14,0.2) 60%, transparent 100%)",
  },
  heroContent: {
    position: "relative",
    zIndex: 2,
    padding: "40px 48px",
    width: "100%",
    maxWidth: 900,
  },
  heroBack: {
    display: "inline-block",
    fontSize: 12,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "rgba(255,255,255,0.65)",
    textDecoration: "none",
    letterSpacing: "0.06em",
    marginBottom: 16,
    transition: "color 0.2s",
  },
  heroLocation: {
    display: "flex",
    alignItems: "center",
    fontSize: 11,
    fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: "#c8a96e",
    marginBottom: 10,
  },
  heroTitle: {
    fontSize: "clamp(28px, 4vw, 52px)",
    fontWeight: 400,
    color: "#fff",
    letterSpacing: "-0.02em",
    lineHeight: 1.1,
    margin: "0 0 16px",
  },
  heroBadges: { display: "flex", gap: 10, flexWrap: "wrap" },
  badge: {
    display: "inline-block",
    padding: "5px 14px",
    backgroundColor: "rgba(10,25,18,0.7)",
    border: "1px solid rgba(200,169,110,0.4)",
    color: "#c8a96e",
    fontFamily: "'Helvetica Neue', sans-serif",
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.08em",
    backdropFilter: "blur(4px)",
  },

  /* Main layout */
  main: {
    display: "grid",
    gridTemplateColumns: "1fr 380px",
    gap: 48,
    maxWidth: 1100,
    margin: "0 auto",
    padding: "56px 24px 80px",
    alignItems: "start",
  },

  /* Details col */
  detailsCol: {},
  quickBar: {
    display: "flex",
    alignItems: "center",
    gap: 0,
    border: "1px solid #ece9e2",
    marginBottom: 48,
    backgroundColor: "#fafaf8",
  },
  quickItem: {
    flex: 1,
    padding: "18px 20px",
    textAlign: "center",
  },
  quickDivider: {
    width: 1,
    height: 40,
    backgroundColor: "#ece9e2",
  },
  quickLabel: {
    display: "block",
    fontSize: 10,
    fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "#aaa",
    marginBottom: 5,
  },
  quickValue: {
    display: "block",
    fontSize: 15,
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 600,
    color: "#1a2f2a",
  },

  sectionTag: {
    display: "block",
    fontSize: 11,
    fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: "#c8a96e",
    marginBottom: 10,
  },

  descSection: { marginBottom: 40 },
  descTitle: {
    fontSize: 26,
    fontWeight: 400,
    letterSpacing: "-0.01em",
    margin: "0 0 16px",
  },
  descBody: {
    fontSize: 15,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#555",
    lineHeight: 1.82,
    margin: 0,
  },

  includesSection: { marginBottom: 40 },
  includesGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
    marginTop: 4,
  },
  includeItem: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "12px 16px",
    backgroundColor: "#fafaf8",
    border: "1px solid #ece9e2",
  },
  includeCheck: {
    fontSize: 13,
    color: "#c8a96e",
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 700,
  },
  includeText: {
    fontSize: 13,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#444",
  },

  mobileBookCta: { display: "none" },
  mobileBookBtn: {
    display: "inline-block",
    padding: "13px 28px",
    backgroundColor: "#1a2f2a",
    color: "#fff",
    textDecoration: "none",
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 600,
    fontSize: 13,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },

  /* Form col */
  formCol: {},
  formCard: {
    position: "sticky",
    top: 88,
    backgroundColor: "#fafaf8",
    border: "1px solid #ece9e2",
    padding: "32px 28px",
  },
  formHeader: { marginBottom: 24 },
  formTitle: {
    fontSize: 22,
    fontWeight: 400,
    margin: "0 0 8px",
    letterSpacing: "-0.01em",
  },
  formDesc: {
    fontSize: 13,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#888",
    lineHeight: 1.6,
    margin: 0,
  },

  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 7,
    marginBottom: 16,
  },
  fieldRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 14,
  },
  label: {
    fontSize: 11,
    fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#888",
    fontWeight: 500,
  },
  input: {
    padding: "10px 13px",
    border: "1px solid #ddd",
    backgroundColor: "#fff",
    fontFamily: "'Helvetica Neue', sans-serif",
    fontSize: 13,
    color: "#1a1a1a",
    outline: "none",
    borderRadius: 0,
    transition: "border-color 0.2s",
    width: "100%",
    boxSizing: "border-box",
  },

  submitBtn: {
    width: "100%",
    padding: "13px",
    backgroundColor: "#1a2f2a",
    color: "#fff",
    border: "none",
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 600,
    fontSize: 13,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginTop: 4,
    transition: "background 0.2s",
  },
  formNote: {
    fontSize: 11,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#bbb",
    margin: "10px 0 0",
    textAlign: "center",
  },
  errorMsg: {
    fontSize: 12,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#c0392b",
    margin: "0 0 12px",
    padding: "10px 14px",
    backgroundColor: "#fdf3f2",
    border: "1px solid #f5c6c2",
  },

  /* Success */
  successBox: { textAlign: "center", padding: "20px 0" },
  successIcon: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 48,
    height: 48,
    borderRadius: "50%",
    backgroundColor: "#e8f4e8",
    color: "#2d7a2d",
    fontSize: 22,
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: 400,
    margin: "0 0 10px",
  },
  successDesc: {
    fontSize: 13,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#666",
    lineHeight: 1.65,
    margin: "0 0 24px",
  },
};

const css = `
  .form-input:focus { border-color: #c8a96e !important; }
  .submit-btn:hover:not(:disabled) { background-color: #2d4a3e !important; }
  .mobile-book-btn:hover { background-color: #2d4a3e !important; }
  .skeleton { animation: pulse 1.5s ease-in-out infinite; }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.45; }
  }
  @media (max-width: 900px) {
    .main { grid-template-columns: 1fr !important; }
    .mobile-book-cta { display: block !important; margin-bottom: 40px; }
    .form-col { position: static !important; }
  }
`;

export default PackageDetails;