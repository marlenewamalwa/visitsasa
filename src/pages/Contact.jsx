import React, { useState } from "react";
import contactBg from "../assets/visitsasa.jpg";

const CONTACT_INFO = [
  {
    label: "Email",
    value: "visitsasake@gmail.co.ke",
    sub: "We reply within 24 hours",
  },
  {
    label: "Phone",
    value: "+254 700 000 000",
    sub: "Mon – Sat, 8am – 6pm EAT",
  },
  {
    label: "Location",
    value: "Nairobi, Kenya",
    sub: "East Africa Time (UTC+3)",
  },
];

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return;

    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    const subject = encodeURIComponent(form.subject || "Enquiry from TravelKenya");
    window.location.href = `mailto:wamalwamarlene@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <div style={styles.page}>
      <style>{css}</style>

      {/* Page Header */}
      <section style={styles.pageHeader}>
        <span style={styles.eyebrow}>We'd Love To Hear From You</span>
        <h1 style={styles.pageTitle}>Get In Touch</h1>
        <p style={styles.pageDesc}>
          Planning a trip, have a question about a package, or just want advice on where
          to go? Our team is here to help you every step of the way.
        </p>
      </section>
      <div style={styles.divider} />

      {/* Main grid */}
      <section style={styles.main}>

        {/* Left — contact info + image */}
        <div style={styles.infoCol}>
          <img src={contactBg} alt="contact" style={styles.heroBg} />
          <div style={styles.infoCards}>
            {CONTACT_INFO.map((c) => (
              <div key={c.label} style={styles.infoCard} className="info-card">
                <span style={styles.infoLabel}>{c.label}</span>
                <span style={styles.infoValue}>{c.value}</span>
                <span style={styles.infoSub}>{c.sub}</span>
              </div>
            ))}
          </div>
          <div style={styles.hours}>
            <h4 style={styles.hoursTitle}>Office Hours</h4>
            <div style={styles.hoursRow}><span>Monday – Friday</span><span>8:00am – 6:00pm</span></div>
            <div style={styles.hoursRow}><span>Saturday</span><span>9:00am – 2:00pm</span></div>
            <div style={{ ...styles.hoursRow, color: "#bbb" }}><span>Sunday</span><span>Closed</span></div>
          </div>
        </div>

        {/* Right — form */}
        <div style={styles.formCol}>
          {sent ? (
            <div style={styles.successBox}>
              <span style={styles.successMark}>&#10003;</span>
              <h2 style={styles.successTitle}>Your mail client is opening</h2>
              <p style={styles.successDesc}>
                Your message details have been pre-filled. Once you send the email,
                our team will get back to you within 24 hours.
              </p>
              <button
                style={styles.resetBtn}
                className="submit-btn"
                onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <>
              <h2 style={styles.formTitle}>Send Us a Message</h2>
              <p style={styles.formDesc}>
                Fill in your details below and we'll open your email client with everything
                pre-filled — ready to send in one click.
              </p>

              <div style={styles.fieldRow}>
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Full Name *</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Jane Mwangi"
                    style={styles.input}
                    className="form-input"
                  />
                </div>
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Email Address *</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="jane@example.com"
                    style={styles.input}
                    className="form-input"
                  />
                </div>
              </div>

              <div style={styles.fieldGroup}>
                <label style={styles.label}>Subject</label>
                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="e.g. Safari package enquiry"
                  style={styles.input}
                  className="form-input"
                />
              </div>

              <div style={styles.fieldGroup}>
                <label style={styles.label}>Message *</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your travel plans, dates, group size, or any questions you have..."
                  style={styles.textarea}
                  className="form-input"
                  rows={6}
                />
              </div>

              <div style={styles.formFooter}>
                <p style={styles.formNote}>
                  * Required fields. Your message opens your default email client.
                </p>
                <button
                  onClick={handleSubmit}
                  style={{
                    ...styles.submitBtn,
                    opacity: (!form.name || !form.email || !form.message) ? 0.5 : 1,
                    cursor: (!form.name || !form.email || !form.message) ? "not-allowed" : "pointer",
                  }}
                  className="submit-btn"
                  disabled={!form.name || !form.email || !form.message}
                >
                  Open Email Client &rarr;
                </button>
              </div>
            </>
          )}
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

  /* Main */
  main: {
    display: "grid",
    gridTemplateColumns: "1fr 1.3fr",
    gap: 64,
    maxWidth: 1100,
    margin: "0 auto",
    padding: "64px 24px 80px",
    alignItems: "start",
  },

  /* Info column */
  infoCol: {},
  infoImg: {
    width: "100%",
    height: 220,
    objectFit: "cover",
    display: "block",
    marginBottom: 28,
  },
  infoCards: {
    display: "flex",
    flexDirection: "column",
    gap: 1,
    marginBottom: 32,
  },
  infoCard: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
    padding: "18px 20px",
    backgroundColor: "#fafaf8",
    border: "1px solid #ece9e2",
    transition: "border-color 0.2s",
  },
  infoLabel: {
    fontSize: 10,
    fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: "#c8a96e",
  },
  infoValue: {
    fontSize: 15,
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 600,
    color: "#1a2f2a",
  },
  infoSub: {
    fontSize: 12,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#aaa",
  },

  hours: {
    padding: "20px 0",
    borderTop: "1px solid #ece9e2",
  },
  hoursTitle: {
    fontSize: 11,
    fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "#999",
    margin: "0 0 14px",
    fontWeight: 400,
  },
  hoursRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 13,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#444",
    padding: "6px 0",
    borderBottom: "1px solid #f0ece5",
  },

  /* Form column */
  formCol: {
    backgroundColor: "#fafaf8",
    border: "1px solid #ece9e2",
    padding: "40px 36px",
  },
  formTitle: {
    fontSize: 26,
    fontWeight: 400,
    margin: "0 0 10px",
    letterSpacing: "-0.01em",
  },
  formDesc: {
    fontSize: 13,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#888",
    lineHeight: 1.65,
    margin: "0 0 32px",
  },
  fieldRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 7,
    marginBottom: 20,
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
    padding: "11px 14px",
    border: "1px solid #ddd",
    backgroundColor: "#fff",
    fontFamily: "'Helvetica Neue', sans-serif",
    fontSize: 14,
    color: "#1a1a1a",
    outline: "none",
    borderRadius: 0,
    transition: "border-color 0.2s",
    width: "100%",
    boxSizing: "border-box",
  },
  textarea: {
    padding: "11px 14px",
    border: "1px solid #ddd",
    backgroundColor: "#fff",
    fontFamily: "'Helvetica Neue', sans-serif",
    fontSize: 14,
    color: "#1a1a1a",
    outline: "none",
    resize: "vertical",
    borderRadius: 0,
    transition: "border-color 0.2s",
    width: "100%",
    boxSizing: "border-box",
  },
  formFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
    flexWrap: "wrap",
    marginTop: 8,
  },
  formNote: {
    fontSize: 11,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#bbb",
    margin: 0,
  },
  submitBtn: {
    padding: "13px 28px",
    backgroundColor: "#1a2f2a",
    color: "#fff",
    border: "none",
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 600,
    fontSize: 13,
    letterSpacing: "0.07em",
    textTransform: "uppercase",
    transition: "background 0.2s",
    whiteSpace: "nowrap",
  },
  resetBtn: {
    padding: "13px 28px",
    backgroundColor: "#c8a96e",
    color: "#fff",
    border: "none",
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 600,
    fontSize: 13,
    letterSpacing: "0.07em",
    textTransform: "uppercase",
    cursor: "pointer",
    transition: "background 0.2s",
    marginTop: 20,
  },

  /* Success */
  successBox: {
    textAlign: "center",
    padding: "40px 20px",
  },
  successMark: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 52,
    height: 52,
    borderRadius: "50%",
    backgroundColor: "#e8f4e8",
    color: "#2d7a2d",
    fontSize: 24,
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: 400,
    margin: "0 0 12px",
  },
  successDesc: {
    fontSize: 14,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#666",
    lineHeight: 1.7,
    maxWidth: 360,
    margin: "0 auto",
  },

};

const css = `
  .form-input:focus { border-color: #c8a96e !important; }
  .info-card:hover { border-color: #c8a96e !important; }
  .submit-btn:hover:not(:disabled) { background-color: #2d4a3e !important; }
  @media (max-width: 768px) {
    .main { grid-template-columns: 1fr !important; gap: 40px !important; }
    .field-row { grid-template-columns: 1fr !important; }
  }
`;

export default Contact;