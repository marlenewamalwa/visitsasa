import React, { useState } from "react";
import { Link } from "react-router-dom";
import ctaBanner from "../assets/leopard.jpg";
import booking from "../assets/bookpackage.png";
import browse from "../assets/browse.png";
import contact from "../assets/contactus.jpg";
import pack from "../assets/flagkenya.jpg";

const STEPS = [
  {
    num: "01",
    title: "Browse & Discover",
    sub: "Find your perfect Kenya experience",
    body: "Explore our curated collection of safaris, beach retreats, cultural tours, and highland adventures. Filter by destination, activity, duration, or budget to find packages that match exactly what you're looking for.",
    img: browse,
    action: { label: "View All Packages", to: "/packages" },
  },
  {
    num: "02",
    title: "Submit a Booking",
    sub: "Reserve your spot in seconds",
    body: "Found a package you love? Fill in your name, phone number, preferred travel date, and number of guests. No payment is required at this stage — we just need your details to hold your spot.",
    img: booking,
    action: null,
  },
  {
    num: "03",
    title: "We Get In Touch",
    sub: "Personal confirmation within 24 hours",
    body: "One of our local travel experts will call or WhatsApp you within 24 hours to confirm availability, walk you through the full itinerary, answer any questions, and finalise the details of your trip.",
    img: contact,
    action: { label: "Contact Us", to: "/contact" },
  },
  {
    num: "04",
    title: "Pack & Go",
    sub: "We handle the rest",
    body: "Once your booking is confirmed, we take care of everything — accommodation, transport, park fees, and guided activities. All you need to do is pack, show up, and enjoy Kenya.",
    img: pack,
    action: null,
  },
];

const FAQS = [
  {
    q: "Do I need to pay upfront to book?",
    a: "No. Submitting a booking request is completely free. A deposit is only required after our team has confirmed your booking and you are happy with the full itinerary.",
  },
  {
    q: "How far in advance should I book?",
    a: "We recommend booking at least 4–6 weeks ahead for peak season (July–October and December–January). For other periods, 2 weeks is usually sufficient, though earlier is always better.",
  },
  {
    q: "Can I customise a package?",
    a: "Absolutely. Every package can be tailored — we can adjust the duration, accommodation level, group size, or add extra activities. Just mention this when we call to confirm.",
  },
  {
    q: "What is included in the package price?",
    a: "Each package listing states exactly what is included. Typically this covers accommodation, transport, guided tours, and park fees. Flights and personal expenses are not included unless specified.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept M-Pesa, bank transfer, and major credit/debit cards. Full payment details are shared during the confirmation call.",
  },
];

function HowItWorks() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div style={styles.page}>
      <style>{css}</style>

      {/* Page Header */}
      <section style={styles.pageHeader}>
        <span style={styles.eyebrow}>Simple by Design</span>
        <h1 style={styles.pageTitle}>How It Works</h1>
        <p style={styles.pageDesc}>
          Booking a Kenya trip with us takes less than five minutes.
          Here's exactly what happens from browsing to boarding.
        </p>
      </section>
      <div style={styles.divider} />

      {/* Steps */}
      <section style={styles.stepsSection}>
        {STEPS.map((step, i) => {
          const isEven = i % 2 === 1;
          return (
            <div
              key={step.num}
              style={{
                ...styles.stepRow,
                ...(isEven ? styles.stepRowReverse : {}),
              }}
              className="step-row"
            >
              {/* Image side */}
              <div style={styles.stepImgWrap}>
                <img
                  src={step.img}
                  alt={step.title}
                  style={styles.stepImg}
                  className="step-img"
                />
                <span style={styles.stepNumOverlay}>{step.num}</span>
              </div>

              {/* Text side */}
              <div style={styles.stepText}>
                <span style={styles.stepTag}>{step.sub}</span>
                <h2 style={styles.stepTitle}>{step.title}</h2>
                <p style={styles.stepBody}>{step.body}</p>
                {step.action && (
                  <Link to={step.action.to} style={styles.stepBtn} className="step-btn">
                    {step.action.label} →
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </section>

      {/* Progress indicator strip */}
      <section style={styles.progressStrip}>
        <div style={styles.progressInner}>
          {STEPS.map((step, i) => (
            <React.Fragment key={step.num}>
              <div style={styles.progressItem}>
                <div style={styles.progressCircle}>
                  <span style={styles.progressNum}>{step.num}</span>
                </div>
                <span style={styles.progressLabel}>{step.title}</span>
              </div>
              {i < STEPS.length - 1 && <div style={styles.progressLine} />}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={styles.faqSection}>
        <div style={styles.faqHeader}>
          <span style={styles.eyebrow}>Common Questions</span>
          <h2 style={styles.faqTitle}>Frequently Asked Questions</h2>
        </div>
        <div style={styles.faqList}>
          {FAQS.map((faq, i) => (
            <div key={i} style={styles.faqItem} className="faq-item">
              <button
                style={styles.faqQuestion}
                className="faq-btn"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span>{faq.q}</span>
                <span style={{
                  ...styles.faqIcon,
                  transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)",
                }}>+</span>
              </button>
              {openFaq === i && (
                <div style={styles.faqAnswer}>
                  <p style={styles.faqAnswerText}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={styles.cta}>
        <img src={ctaBanner} alt="cta" style={styles.ctaBannerBg} />
        <div style={styles.ctaOverlay} />
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaTitle}>Ready to Start?</h2>
          <p style={styles.ctaSub}>Browse our packages and submit a booking in under 5 minutes.</p>
          <div style={styles.ctaBtns}>
            <Link to="/packages" style={styles.ctaBtnPrimary} className="cta-btn-primary">
              Browse Packages
            </Link>
            <Link to="/contact" style={styles.ctaBtnSecondary} className="cta-btn-secondary">
              Talk to Us First
            </Link>
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

  /* Steps */
  stepsSection: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "72px 24px 48px",
    display: "flex",
    flexDirection: "column",
    gap: 80,
  },
  stepRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 64,
    alignItems: "center",
  },
  stepRowReverse: {
    direction: "rtl",
  },
  stepImgWrap: {
    position: "relative",
    direction: "ltr",
  },
  stepImg: {
    width: "100%",
    height: 340,
    objectFit: "cover",
    display: "block",
  },
  stepNumOverlay: {
    position: "absolute",
    bottom: -18,
    left: -18,
    fontSize: 96,
    fontFamily: "'Georgia', serif",
    fontWeight: 400,
    color: "rgba(200,169,110,0.18)",
    lineHeight: 1,
    userSelect: "none",
    pointerEvents: "none",
  },
  stepText: {
    direction: "ltr",
    padding: "8px 0",
  },
  stepTag: {
    display: "block",
    fontSize: 11,
    fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: "#c8a96e",
    marginBottom: 12,
  },
  stepTitle: {
    fontSize: "clamp(24px, 3vw, 36px)",
    fontWeight: 400,
    letterSpacing: "-0.02em",
    margin: "0 0 16px",
    lineHeight: 1.15,
  },
  stepBody: {
    fontSize: 15,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#555",
    lineHeight: 1.82,
    margin: "0 0 24px",
  },
  stepBtn: {
    display: "inline-block",
    padding: "11px 26px",
    backgroundColor: "#1a2f2a",
    color: "#fff",
    textDecoration: "none",
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 600,
    fontSize: 12,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    transition: "background 0.2s",
  },

  /* Progress strip */
  progressStrip: {
    backgroundColor: "#f7f4ef",
    borderTop: "1px solid #ece9e2",
    borderBottom: "1px solid #ece9e2",
    padding: "40px 24px",
  },
  progressInner: {
    maxWidth: 900,
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  progressItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },
  progressCircle: {
    width: 48,
    height: 48,
    borderRadius: "50%",
    border: "1px solid #c8a96e",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  progressNum: {
    fontSize: 11,
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 700,
    color: "#c8a96e",
    letterSpacing: "0.06em",
  },
  progressLabel: {
    fontSize: 11,
    fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#888",
    textAlign: "center",
    maxWidth: 80,
    lineHeight: 1.4,
  },
  progressLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#ddd",
    margin: "0 12px",
    marginBottom: 30,
  },

  /* FAQ */
  faqSection: {
    maxWidth: 760,
    margin: "0 auto",
    padding: "72px 24px 80px",
  },
  faqHeader: {
    textAlign: "center",
    marginBottom: 48,
  },
  faqTitle: {
    fontSize: "clamp(26px, 3.5vw, 40px)",
    fontWeight: 400,
    letterSpacing: "-0.02em",
    margin: "12px 0 0",
  },
  faqList: {
    display: "flex",
    flexDirection: "column",
    gap: 0,
  },
  faqItem: {
    borderBottom: "1px solid #ece9e2",
  },
  faqQuestion: {
    width: "100%",
    background: "none",
    border: "none",
    padding: "20px 0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    fontFamily: "'Georgia', serif",
    fontSize: 16,
    color: "#1a1a1a",
    textAlign: "left",
    gap: 16,
  },
  faqIcon: {
    fontSize: 22,
    color: "#c8a96e",
    fontWeight: 300,
    flexShrink: 0,
    transition: "transform 0.2s ease",
    display: "inline-block",
    fontFamily: "'Helvetica Neue', sans-serif",
  },
  faqAnswer: {
    paddingBottom: 20,
  },
  faqAnswerText: {
    fontSize: 14,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#666",
    lineHeight: 1.78,
    margin: 0,
  },

  /* CTA */
  cta: {
    position: "relative",
    minHeight: 280,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  ctaBg: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  ctaBannerBg: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  ctaOverlay: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(8,22,14,0.7)",
  },
  ctaContent: {
    position: "relative",
    zIndex: 2,
    textAlign: "center",
    padding: "60px 24px",
  },
  ctaTitle: {
    fontSize: "clamp(26px, 4vw, 44px)",
    fontWeight: 400,
    color: "#fff",
    margin: "0 0 12px",
    letterSpacing: "-0.02em",
  },
  ctaSub: {
    fontSize: 15,
    color: "rgba(255,255,255,0.7)",
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 300,
    marginBottom: 30,
  },
  ctaBtns: {
    display: "flex",
    gap: 14,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  ctaBtnPrimary: {
    display: "inline-block",
    padding: "13px 30px",
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
  ctaBtnSecondary: {
    display: "inline-block",
    padding: "13px 30px",
    backgroundColor: "transparent",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.45)",
    textDecoration: "none",
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 400,
    fontSize: 13,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    transition: "border-color 0.2s, background 0.2s",
  },
  heroBg: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
  },
};

const css = `
  .step-btn:hover { background-color: #2d4a3e !important; }
  .step-img { transition: transform 0.4s ease; }
  .step-row:hover .step-img { transform: scale(1.02); }
  .faq-btn:hover { color: #1a2f2a; }
  .cta-btn-primary:hover { background-color: #b8954f !important; }
  .cta-btn-secondary:hover { border-color: #fff !important; background: rgba(255,255,255,0.08) !important; }
  @media (max-width: 768px) {
    .step-row { grid-template-columns: 1fr !important; direction: ltr !important; gap: 28px !important; }
    .progress-inner { flex-wrap: wrap; gap: 20px; }
  }
`;

export default HowItWorks;