import React, { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import TripWizard from "../components/TripWizard";

const ENQUIRY_TYPES = [
  "Planning a new trip",
  "Question about an existing booking",
  "Group or corporate travel",
  "Press or media enquiry",
  "Partnership or trade enquiry",
  "Something else",
];

const CONTACT_DETAILS = [
  {
    icon: "✉",
    label: "Email",
    value: "hello@visitsasa.co.ke",
    href: "mailto:hello@visitsasa.com",
  },
  {
    icon: "📱",
    label: "WhatsApp",
    value: "+254 778 389 333",
    href: "https://wa.me/254700000000",
  },
  {
    icon: "📞",
    label: "Phone",
    value: "+254 778 389 333",
    href: "tel:+254700000000",
  },
  {
    icon: "📍",
    label: "Office",
    value: "Nairobi, Kenya",
  },
];

const INIT = {
  name: "",
  email: "",
  phone: "",
  enquiry_type: "",
  message: "",
};

function Contact() {
  const [form, setForm] = useState(INIT);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [wizardOpen, setWizardOpen] = useState(false);

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const canSubmit =
    form.name.trim() &&
    form.email.trim() &&
    form.message.trim() &&
    form.enquiry_type;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    setError("");
    try {
      const { error: sbError } = await supabase.from("contacts").insert([
        {
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim() || null,
          enquiry_type: form.enquiry_type,
          message: form.message.trim(),
          status: "new",
        },
      ]);
      if (sbError) throw sbError;
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={S.page}>
      <style>{css}</style>

      {/* ── HERO ── */}
      <section style={S.hero}>
        <div style={S.heroBg} />
        <div style={S.heroContent}>
          <span style={S.eyebrow}>Get In Touch</span>
          <h1 style={S.heroTitle}>
            We're Here<br />
            <em style={S.heroItalic}>Whenever You Need Us</em>
          </h1>
          <p style={S.heroSub}>
            Whether you're ready to plan, have a question, or just want to talk
            through ideas — a real person is on the other end of every message.
          </p>
        </div>
      </section>

      {/* ── MAIN SPLIT ── */}
      <div style={S.split}>

        {/* ── LEFT — Form ── */}
        <div style={S.formSide}>
          {submitted ? (
            <div style={S.successBox}>
              <span style={S.successEmoji}>🌿</span>
              <h2 style={S.successTitle}>Message Received</h2>
              <p style={S.successText}>
                Thank you, <strong>{form.name}</strong>. We've received your message
                and a specialist will be in touch at{" "}
                <strong>{form.email}</strong> within 24 hours.
              </p>
              <div style={S.successActions}>
                <button
                  style={S.successBtn}
                  className="btn-gold"
                  onClick={() => setWizardOpen(true)}
                >
                  Start Building Your Trip
                </button>
                <Link to="/" style={S.successSecondary} className="link-muted">
                  Back to Home
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div style={S.formHeader}>
                <span style={S.formEyebrow}>Send a Message</span>
                <h2 style={S.formTitle}>Tell Us How We Can Help</h2>
                <p style={S.formDesc}>
                  Fill in the form and we'll respond within 24 hours on business days.
                  For urgent travel queries, WhatsApp us directly.
                </p>
              </div>

              <div style={S.formBody}>
                {/* Name + Email */}
                <div style={S.row}>
                  <Field label="Full Name *">
                    <input
                      type="text"
                      style={S.input}
                      placeholder="Your full name"
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                      className="field-input"
                    />
                  </Field>
                  <Field label="Email Address *">
                    <input
                      type="email"
                      style={S.input}
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      className="field-input"
                    />
                  </Field>
                </div>

                {/* Phone + Enquiry type */}
                <div style={S.row}>
                  <Field label="Phone / WhatsApp">
                    <input
                      type="tel"
                      style={S.input}
                      placeholder="+254 700 000 000"
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      className="field-input"
                    />
                  </Field>
                  <Field label="What's this about? *">
                    <select
                      style={S.input}
                      value={form.enquiry_type}
                      onChange={(e) => set("enquiry_type", e.target.value)}
                      className="field-input"
                    >
                      <option value="">Select a type…</option>
                      {ENQUIRY_TYPES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </Field>
                </div>

                {/* Message */}
                <Field label="Your Message *">
                  <textarea
                    style={{ ...S.input, height: 160, resize: "vertical" }}
                    placeholder="Tell us what's on your mind — the more detail the better. No question is too small."
                    value={form.message}
                    onChange={(e) => set("message", e.target.value)}
                    className="field-input"
                  />
                </Field>

                {/* Notice */}
                <div style={S.notice}>
                  <span style={S.noticeIcon}>💡</span>
                  <span style={S.noticeText}>
                    Planning a specific trip?{" "}
                    <button
                      style={S.noticeLink}
                      className="notice-link"
                      onClick={() => setWizardOpen(true)}
                    >
                      Use our trip builder instead
                    </button>{" "}
                    — it gives our team all the detail they need to prepare a full itinerary for you.
                  </span>
                </div>

                {error && <div style={S.errorBox}>{error}</div>}

                <button
                  style={{
                    ...S.submitBtn,
                    opacity: canSubmit && !submitting ? 1 : 0.45,
                    cursor: canSubmit && !submitting ? "pointer" : "not-allowed",
                  }}
                  className="btn-submit"
                  onClick={handleSubmit}
                  disabled={!canSubmit || submitting}
                >
                  {submitting ? "Sending…" : "Send Message →"}
                </button>
              </div>
            </>
          )}
        </div>

        {/* ── RIGHT — Details panel ── */}
        <div style={S.detailSide}>
          <div style={S.detailInner}>

            {/* Contact methods */}
            <div style={S.detailSection}>
              <span style={S.detailSectionLabel}>Reach Us Directly</span>
              <div style={S.contactList}>
                {CONTACT_DETAILS.map((c) => (
                  <div key={c.label} style={S.contactItem}>
                    <span style={S.contactIcon}>{c.icon}</span>
                    <div>
                      <span style={S.contactLabel}>{c.label}</span>
                      {c.href ? (
                        <a
                          href={c.href}
                          style={S.contactValue}
                          className="contact-link"
                          target={c.href.startsWith("http") ? "_blank" : undefined}
                          rel="noreferrer"
                        >
                          {c.value}
                        </a>
                      ) : (
                        <span style={S.contactValuePlain}>{c.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Office hours */}
            <div style={S.detailSection}>
              <span style={S.detailSectionLabel}>Office Hours</span>
              <div style={S.hoursList}>
                {[
                  { days: "Monday – Friday", hours: "8:00am – 6:00pm EAT" },
                  { days: "Saturday", hours: "9:00am – 2:00pm EAT" },
                  { days: "Sunday", hours: "WhatsApp only" },
                ].map((h) => (
                  <div key={h.days} style={S.hoursRow}>
                    <span style={S.hoursDays}>{h.days}</span>
                    <span style={S.hoursTime}>{h.hours}</span>
                  </div>
                ))}
              </div>
              <p style={S.hoursNote}>
                Outside hours? WhatsApp messages are monitored for urgent travel matters.
              </p>
            </div>

            {/* Response promise */}
            <div style={S.promiseBox}>
              <div style={S.promiseTop}>
                <span style={S.promiseIcon}>⏱</span>
                <span style={S.promiseTitle}>Our Response Promise</span>
              </div>
              <p style={S.promiseText}>
                Every message receives a personal reply — not an automated response.
                We guarantee a reply within 24 hours on business days, typically much sooner.
              </p>
            </div>

            {/* Trip builder nudge */}
            <div style={S.wizardNudge}>
              <p style={S.wizardNudgeText}>
                Planning a trip? Our builder gives us everything we need to craft
                your itinerary in one go.
              </p>
              <button
                style={S.wizardNudgeBtn}
                className="btn-nudge"
                onClick={() => setWizardOpen(true)}
              >
                Open Trip Builder ✦
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* ── BOTTOM STRIP ── */}
      <div style={S.bottomStrip}>
        <div style={S.bottomStripInner}>
          {[
            { icon: "🔒", text: "Your details are never shared or sold" },
            { icon: "✉", text: "Every message read by a real person" },
            { icon: "🇰🇪", text: "Kenya-based team, local knowledge" },
          ].map((item) => (
            <div key={item.text} style={S.bottomStripItem}>
              <span>{item.icon}</span>
              <span style={S.bottomStripText}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {wizardOpen && <TripWizard onClose={() => setWizardOpen(false)} />}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div style={FS.wrap}>
      <label style={FS.label}>{label}</label>
      {children}
    </div>
  );
}
const FS = {
  wrap: { display: "flex", flexDirection: "column", gap: 8 },
  label: {
    fontSize: 11,
    fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#888",
  },
};

/* ── STYLES ── */
const S = {
  page: {
    fontFamily: "'Georgia', 'Times New Roman', serif",
    color: "#1a1a1a",
    backgroundColor: "#fff",
  },

  /* Hero */
  hero: {
    position: "relative",
    backgroundColor: "#1E4D56",
    overflow: "hidden",
    padding: "100px 24px 80px",
    textAlign: "center",
  },
  heroBg: {
    position: "absolute",
    inset: 0,
    backgroundImage: `
      radial-gradient(ellipse at 30% 70%, rgba(200,169,110,0.1) 0%, transparent 55%),
      radial-gradient(ellipse at 70% 30%, rgba(26,47,42,0.7) 0%, transparent 60%)
    `,
  },
  heroContent: {
    position: "relative",
    zIndex: 2,
    maxWidth: 640,
    margin: "0 auto",
  },
  eyebrow: {
    display: "inline-block",
    fontSize: 11,
    fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "#c8a96e",
    marginBottom: 20,
    borderBottom: "1px solid rgba(200,169,110,0.35)",
    paddingBottom: 6,
  },
  heroTitle: {
    fontSize: "clamp(36px, 5.5vw, 68px)",
    fontWeight: 400,
    color: "#fff",
    lineHeight: 1.08,
    letterSpacing: "-0.025em",
    margin: "0 0 20px",
  },
  heroItalic: {
    fontStyle: "italic",
    color: "#c8a96e",
  },
  heroSub: {
    fontSize: 16,
    color: "rgba(255,255,255,0.62)",
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 300,
    lineHeight: 1.8,
    margin: 0,
  },

  /* Split layout */
  split: {
    display: "grid",
    gridTemplateColumns: "1.1fr 0.9fr",
    minHeight: "calc(100vh - 260px)",
  },

  /* Form side */
  formSide: {
    padding: "64px 56px 80px",
    borderRight: "1px solid #ece9e2",
  },
  formHeader: {
    marginBottom: 44,
  },
  formEyebrow: {
    display: "inline-block",
    fontSize: 11,
    fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: "#c8a96e",
    marginBottom: 12,
  },
  formTitle: {
    fontSize: "clamp(24px, 3vw, 36px)",
    fontWeight: 400,
    margin: "0 0 12px",
    letterSpacing: "-0.02em",
    lineHeight: 1.2,
  },
  formDesc: {
    fontSize: 14,
    color: "#888",
    fontFamily: "'Helvetica Neue', sans-serif",
    lineHeight: 1.75,
    margin: 0,
  },
  formBody: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 20,
  },
  input: {
    padding: "12px 14px",
    border: "1px solid #ddd8d0",
    fontSize: 14,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#1a1a1a",
    outline: "none",
    backgroundColor: "#fff",
    width: "100%",
    boxSizing: "border-box",
    appearance: "none",
    transition: "border-color 0.2s",
  },
  notice: {
    display: "flex",
    gap: 12,
    alignItems: "flex-start",
    backgroundColor: "#fdf9f2",
    border: "1px solid #f0e4c0",
    padding: "14px 16px",
  },
  noticeIcon: { fontSize: 14, flexShrink: 0, marginTop: 1 },
  noticeText: {
    fontSize: 13,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#666",
    lineHeight: 1.6,
  },
  noticeLink: {
    background: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
    fontSize: 13,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#1E4D56",
    fontWeight: 600,
    textDecoration: "underline",
    textUnderlineOffset: 2,
  },
  errorBox: {
    padding: "12px 16px",
    backgroundColor: "#fff5f5",
    border: "1px solid #ffcdd2",
    color: "#c62828",
    fontSize: 13,
    fontFamily: "'Helvetica Neue', sans-serif",
  },
  submitBtn: {
    padding: "14px 32px",
    backgroundColor: "#204E59",
    color: "#fff",
    border: "none",
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 600,
    fontSize: 14,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    transition: "background 0.2s, transform 0.15s",
    alignSelf: "flex-start",
  },

  /* Success state */
  successBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    minHeight: 480,
    gap: 16,
  },
  successEmoji: { fontSize: 48 },
  successTitle: {
    fontSize: 34,
    fontWeight: 400,
    margin: 0,
    letterSpacing: "-0.02em",
  },
  successText: {
    fontSize: 15,
    color: "#555",
    fontFamily: "'Helvetica Neue', sans-serif",
    lineHeight: 1.75,
    maxWidth: 460,
    margin: 0,
  },
  successActions: {
    display: "flex",
    gap: 20,
    alignItems: "center",
    marginTop: 12,
    flexWrap: "wrap",
  },
  successBtn: {
    padding: "13px 28px",
    backgroundColor: "#c8a96e",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 600,
    fontSize: 13,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    transition: "background 0.2s",
  },
  successSecondary: {
    fontSize: 13,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#aaa",
    textDecoration: "none",
    borderBottom: "1px solid #ddd",
    paddingBottom: 2,
  },

  /* Detail side */
  detailSide: {
    backgroundColor: "#faf9f7",
  },
  detailInner: {
    padding: "64px 48px 80px",
    display: "flex",
    flexDirection: "column",
    gap: 40,
    position: "sticky",
    top: 0,
    maxHeight: "100vh",
    overflowY: "auto",
  },
  detailSection: {},
  detailSectionLabel: {
    display: "block",
    fontSize: 10,
    fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "#c8a96e",
    marginBottom: 20,
    borderBottom: "1px solid #ece9e2",
    paddingBottom: 10,
  },

  /* Contact list */
  contactList: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  contactItem: {
    display: "flex",
    gap: 16,
    alignItems: "flex-start",
  },
  contactIcon: {
    fontSize: 18,
    width: 28,
    flexShrink: 0,
    marginTop: 2,
  },
  contactLabel: {
    display: "block",
    fontSize: 10,
    fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#aaa",
    marginBottom: 4,
  },
  contactValue: {
    display: "block",
    fontSize: 15,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#204E59",
    textDecoration: "none",
    fontWeight: 500,
    transition: "color 0.15s",
  },
  contactValuePlain: {
    display: "block",
    fontSize: 15,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#333",
    fontWeight: 400,
  },

  /* Hours */
  hoursList: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginBottom: 14,
  },
  hoursRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 13,
    fontFamily: "'Helvetica Neue', sans-serif",
    paddingBottom: 10,
    borderBottom: "1px solid #ece9e2",
  },
  hoursDays: { color: "#444" },
  hoursTime: { color: "#888", fontStyle: "italic" },
  hoursNote: {
    fontSize: 12,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#aaa",
    lineHeight: 1.6,
    margin: 0,
  },

  /* Promise box */
  promiseBox: {
    backgroundColor: "#fff",
    border: "1px solid #ece9e2",
    borderLeft: "3px solid #c8a96e",
    padding: "20px 22px",
  },
  promiseTop: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  promiseIcon: { fontSize: 16 },
  promiseTitle: {
    fontSize: 14,
    fontWeight: 600,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#1a1a1a",
  },
  promiseText: {
    fontSize: 13,
    color: "#666",
    fontFamily: "'Helvetica Neue', sans-serif",
    lineHeight: 1.7,
    margin: 0,
  },

  /* Wizard nudge */
  wizardNudge: {
    backgroundColor: "#204E59",
    padding: "24px 24px",
  },
  wizardNudgeText: {
    fontSize: 13,
    color: "rgba(255,255,255,0.65)",
    fontFamily: "'Helvetica Neue', sans-serif",
    lineHeight: 1.7,
    margin: "0 0 16px",
  },
  wizardNudgeBtn: {
    padding: "10px 20px",
    backgroundColor: "#c8a96e",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 600,
    fontSize: 12,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    transition: "background 0.2s",
    width: "100%",
  },

  /* Bottom strip */
  bottomStrip: {
    borderTop: "1px solid #ece9e2",
    backgroundColor: "#f7f4ef",
  },
  bottomStripInner: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "20px 24px",
    display: "flex",
    justifyContent: "center",
    gap: 48,
    flexWrap: "wrap",
  },
  bottomStripItem: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  bottomStripText: {
    fontSize: 12,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#888",
    letterSpacing: "0.04em",
  },
};

const css = `
  .btn-gold:hover { background-color: #b8954f !important; transform: translateY(-1px); }
  .btn-submit:hover:not(:disabled) { background-color: #c8a96e !important; transform: translateY(-1px); }
  .btn-nudge:hover { background-color: #b8954f !important; }
  .field-input:focus { border-color: #c8a96e !important; }
  .contact-link:hover { color: #c8a96e !important; }
  .notice-link:hover { color: #c8a96e !important; }
  .link-muted:hover { color: #666 !important; }

  @media (max-width: 1024px) {
    .split { grid-template-columns: 1fr !important; }
    .detail-inner { position: static !important; max-height: none !important; }
    .form-side { padding: 48px 32px !important; border-right: none !important; border-bottom: 1px solid #ece9e2; }
    .detail-side { background: #faf9f7; }
  }
  @media (max-width: 640px) {
    .form-side { padding: 40px 20px !important; }
    .detail-inner { padding: 40px 20px !important; }
    .row { grid-template-columns: 1fr !important; }
    .hero { padding: 72px 20px 60px !important; }
  }
`;

export default Contact;