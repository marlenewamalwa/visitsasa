import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import TripWizard from "../components/TripWizard";

/* ── DATA ── */
const STEPS = [
  {
    num: "01",
    phase: "Plan",
    title: "Build Your Trip",
    subtitle: "Tell us exactly what you want",
    desc: "Use our step-by-step trip builder to shape your Kenya journey from scratch. Pick your destinations, travel dates, number of travellers, preferred activities, accommodation style, and budget — all in one seamless flow.",
    details: [
      "Choose one or multiple destinations across Kenya",
      "Set your exact travel dates and group size",
      "Hand-pick activities from game drives to dhow cruises",
      "Select your accommodation tier — from bush camping to ultra-luxury",
      "Set a budget range so we can work within your means",
    ],
    icon: "✦",
    accent: "#c8a96e",
    timeframe: "Takes ~5 minutes",
  },
  {
    num: "02",
    phase: "Review",
    title: "We Craft Your Itinerary",
    subtitle: "Expert eyes on every detail",
    desc: "Once your trip request lands with us, a dedicated Kenya travel specialist reviews every selection. We cross-check availability, logistics, seasonal conditions, and value — then build a day-by-day itinerary tailored precisely to you.",
    details: [
      "Dedicated specialist assigned to your trip within hours",
      "Availability confirmed across all lodges and operators",
      "Seasonal conditions and travel advisories reviewed",
      "Logical routing planned to minimise travel fatigue",
      "Alternative options prepared where relevant",
    ],
    icon: "◈",
    accent: "#204E59",
    timeframe: "Within 24 hours",
  },
  {
    num: "03",
    phase: "Refine",
    title: "We Get In Touch",
    subtitle: "Your itinerary, perfected together",
    desc: "We reach out by email or phone to walk you through your personalised itinerary. This is a conversation, not a transaction — we refine, adjust, and answer every question until the trip feels exactly right.",
    details: [
      "Full itinerary delivered with day-by-day breakdown",
      "Pricing transparent — no hidden fees",
      "Unlimited revisions until you're completely satisfied",
      "Personal WhatsApp line to your specialist",
      "No pressure, no commitment at this stage",
    ],
    icon: "◇",
    accent: "#8b6914",
    timeframe: "Collaborative process",
  },
  {
    num: "04",
    phase: "Confirm",
    title: "Book With Confidence",
    subtitle: "Secure your journey",
    desc: "When you're happy, we confirm all reservations and handle every booking on your behalf. A deposit secures your dates while we lock in lodges, guides, transfers, and permits — every detail managed for you.",
    details: [
      "Secure deposit locks in your exact dates",
      "All lodges, guides and transfers confirmed",
      "National park permits arranged in advance",
      "Comprehensive trip documentation provided",
      "Travel insurance guidance included",
    ],
    icon: "◉",
    accent: "#2e5c3e",
    timeframe: "Fully secured",
  },
  {
    num: "05",
    phase: "Travel",
    title: "We're With You",
    subtitle: "On-the-ground support, every day",
    desc: "From the moment you land to your final departure, our team is reachable around the clock. Our guides are born and bred Kenyans — storytellers, trackers, and hosts who transform a good trip into an extraordinary one.",
    details: [
      "Airport welcome and seamless transfers",
      "24/7 emergency contact line throughout your trip",
      "All guides vetted, licensed and English-speaking",
      "Real-time itinerary adjustments if conditions change",
      "Post-trip debrief and future trip planning",
    ],
    icon: "❋",
    accent: "#c8a96e",
    timeframe: "Entire journey",
  },
];

const FAQS = [
  {
    q: "Is there any cost to use the trip builder?",
    a: "Absolutely none. Building and submitting your trip is completely free with zero obligation. We only earn when you confirm a booking — our incentive is always to get you the best possible trip.",
  },
  {
    q: "How quickly will I hear back after submitting?",
    a: "Our specialists review every submission within 24 hours on business days. For trips less than 4 weeks away we prioritise same-day responses. You'll always receive an acknowledgement email immediately after submitting.",
  },
  {
    q: "Can I change my trip after submitting?",
    a: "Yes — completely. The submission is the start of a conversation, not a commitment. We expect to refine the itinerary with you. Nothing is confirmed or charged until you explicitly approve the final plan.",
  },
  {
    q: "What if I don't know which destinations to choose?",
    a: "That's exactly what we're here for. Submit your rough interests, budget, and dates — even if vague — and our specialists will propose a custom combination of destinations and experiences that suits you.",
  },
  {
    q: "Do you handle international flights?",
    a: "We specialise in ground arrangements — lodges, guides, transfers, and activities within Kenya. We can recommend trusted flight partners and advise on the best routing into Nairobi or Mombasa, but we don't book international flights directly.",
  },
  {
    q: "What's your deposit and payment structure?",
    a: "Typically a 30% deposit confirms your booking, with the balance due 60 days before travel. We accept bank transfer, card, and M-Pesa. Exact terms are confirmed in writing before any payment is taken.",
  },
  {
    q: "Is Kenya safe to visit?",
    a: "Kenya is one of Africa's most established and well-visited safari destinations, welcoming hundreds of thousands of travellers each year. We stay current on all regional advisories and will never confirm a trip to any area we have concerns about.",
  },
];

const TRUST = [
  { icon: "🔒", title: "No Payment Until You're Ready", body: "Submit your trip and refine it freely. We only ask for a deposit when you're completely happy." },
  { icon: "🧭", title: "Real Local Experts", body: "Every specialist on our team has lived and worked in Kenya. Your trip is built by people who know every trail, lodge, and border crossing." },
  { icon: "📞", title: "Always Reachable", body: "WhatsApp, email or phone — before, during, and after your trip. A real person, not a chatbot." },
  { icon: "♻️", title: "Responsible Tourism", body: "We only work with eco-certified operators and community-owned conservancies. Every booking puts money directly into local hands." },
];

/* ── COMPONENT ── */
function HowItWorks() {
  const [wizardOpen, setWizardOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef([]);

  // Highlight the step closest to viewport center on scroll
  useEffect(() => {
    const onScroll = () => {
      const mid = window.innerHeight / 2;
      let closest = 0;
      let minDist = Infinity;
      stepRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const dist = Math.abs(rect.top + rect.height / 2 - mid);
        if (dist < minDist) { minDist = dist; closest = i; }
      });
      setActiveStep(closest);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={S.page}>
      <style>{css}</style>

      {/* ── HERO ── */}
      <section style={S.hero}>
        <div style={S.heroNoise} />
        <div style={S.heroContent}>
          <div style={S.heroInner}>
            <span style={S.eyebrow}>The Process</span>
            <h1 style={S.heroTitle}>
              Your Dream Trip,<br />
              <em style={S.heroItalic}>Without the Stress</em>
            </h1>
            <p style={S.heroSub}>
              No agency jargon. No fixed packages. No back-and-forth emails
              that go nowhere. Just a simple, transparent process that puts
              you in control from the very first click.
            </p>
            <div style={S.heroMeta}>
              <div style={S.heroMetaItem}>
                <span style={S.heroMetaNum}>5 min</span>
                <span style={S.heroMetaLabel}>to build your trip</span>
              </div>
              <div style={S.heroMetaDivider} />
              <div style={S.heroMetaItem}>
                <span style={S.heroMetaNum}>24 hr</span>
                <span style={S.heroMetaLabel}>to receive your itinerary</span>
              </div>
              <div style={S.heroMetaDivider} />
              <div style={S.heroMetaItem}>
                <span style={S.heroMetaNum}>0 cost</span>
                <span style={S.heroMetaLabel}>to plan and enquire</span>
              </div>
            </div>
            <button style={S.heroCta} className="btn-gold" onClick={() => setWizardOpen(true)}>
              Start Building My Trip
            </button>
          </div>
          {/* Vertical step preview */}
          <div style={S.heroStepList}>
            {STEPS.map((s, i) => (
              <div key={s.num} style={S.heroStepItem}>
                <span style={{ ...S.heroStepNum, color: s.accent }}>{s.num}</span>
                <span style={S.heroStepTitle}>{s.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STEPS — sticky sidebar layout ── */}
      <section style={S.stepsSection}>
        {/* Sticky progress sidebar */}
        <div style={S.sidebar}>
          <div style={S.sidebarInner}>
            <p style={S.sidebarLabel}>Your journey</p>
            {STEPS.map((s, i) => (
              <div key={s.num} style={S.sidebarItem}>
                <div style={S.sidebarDotWrap}>
                  <div style={{
                    ...S.sidebarDot,
                    backgroundColor: activeStep === i ? s.accent : "transparent",
                    borderColor: activeStep === i ? s.accent : "#ddd8d0",
                  }} />
                  {i < STEPS.length - 1 && <div style={S.sidebarLine} />}
                </div>
                <div style={S.sidebarText}>
                  <span style={{
                    ...S.sidebarNum,
                    color: activeStep === i ? s.accent : "#ccc",
                  }}>{s.num}</span>
                  <span style={{
                    ...S.sidebarName,
                    color: activeStep === i ? "#1a1a1a" : "#bbb",
                    fontWeight: activeStep === i ? 600 : 400,
                  }}>{s.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main step content */}
        <div style={S.stepsMain}>
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              ref={(el) => (stepRefs.current[i] = el)}
              style={{
                ...S.stepBlock,
                borderTopColor: step.accent,
              }}
              className="step-block"
            >
              {/* Step header */}
              <div style={S.stepHeader}>
                <div style={S.stepHeaderLeft}>
                  <span style={{ ...S.stepPhase, color: step.accent }}>
                    {step.phase}
                  </span>
                  <span style={{ ...S.stepNumLarge, color: step.accent }}>
                    {step.num}
                  </span>
                </div>
                <div style={S.stepHeaderRight}>
                  <span style={S.stepTimeframe}>{step.timeframe}</span>
                </div>
              </div>

              <h2 style={S.stepTitle}>{step.title}</h2>
              <p style={S.stepSubtitle}>{step.subtitle}</p>
              <p style={S.stepDesc}>{step.desc}</p>

              {/* Detail list */}
              <div style={S.detailList}>
                {step.details.map((d, di) => (
                  <div key={di} style={S.detailItem}>
                    <span style={{ ...S.detailBullet, color: step.accent }}>→</span>
                    <span style={S.detailText}>{d}</span>
                  </div>
                ))}
              </div>

              {/* CTA on last step */}
              {i === STEPS.length - 1 && (
                <button
                  style={{ ...S.stepCta, backgroundColor: step.accent }}
                  className="btn-step"
                  onClick={() => setWizardOpen(true)}
                >
                  Start My Trip Builder
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── TRUST PILLARS ── */}
      <section style={S.trustSection}>
        <div style={S.trustInner}>
          <div style={S.trustHeader}>
            <span style={S.sectionTag}>Our Promises</span>
            <h2 style={S.trustTitle}>What You Can Always Count On</h2>
          </div>
          <div style={S.trustGrid}>
            {TRUST.map((t) => (
              <div key={t.title} style={S.trustCard} className="trust-card">
                <span style={S.trustIcon}>{t.icon}</span>
                <h3 style={S.trustCardTitle}>{t.title}</h3>
                <p style={S.trustCardBody}>{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={S.faqSection}>
        <div style={S.faqInner}>
          <div style={S.faqLeft}>
            <span style={S.sectionTag}>Questions</span>
            <h2 style={S.faqTitle}>
              Everything You<br />Need to Know
            </h2>
            <p style={S.faqDesc}>
              Still unsure about something? Drop us a message and a
              specialist will come back to you within a few hours.
            </p>
            <Link to="/contact" style={S.faqContactLink} className="link-underline">
              Contact us directly →
            </Link>
          </div>
          <div style={S.faqRight}>
            {FAQS.map((faq, i) => (
              <div
                key={i}
                style={{
                  ...S.faqItem,
                  borderBottomColor: openFaq === i ? "#c8a96e" : "#ece9e2",
                }}
                className="faq-item"
              >
                <button
                  style={S.faqQuestion}
                  className="faq-btn"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span style={S.faqQText}>{faq.q}</span>
                  <span style={{
                    ...S.faqToggle,
                    transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)",
                    color: openFaq === i ? "#c8a96e" : "#999",
                  }}>+</span>
                </button>
                <div style={{
                  ...S.faqAnswer,
                  maxHeight: openFaq === i ? 300 : 0,
                  opacity: openFaq === i ? 1 : 0,
                  paddingBottom: openFaq === i ? 20 : 0,
                }}>
                  <p style={S.faqAnswerText}>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={S.finalCta}>
        <div style={S.finalCtaInner}>
          <span style={{ ...S.eyebrow, color: "#c8a96e", marginBottom: 20, display: "block" }}>
            Ready?
          </span>
          <h2 style={S.finalCtaTitle}>
            Five minutes from now,<br />your Kenya trip could be in motion.
          </h2>
          <p style={S.finalCtaDesc}>
            Free to plan. No commitment. Expert advice within 24 hours.
          </p>
          <div style={S.finalCtaActions}>
            <button style={S.finalCtaBtn} className="btn-gold" onClick={() => setWizardOpen(true)}>
              Build My Trip Now
            </button>
            <Link to="/destinations" style={S.finalCtaSecondary} className="link-ghost">
              Browse Destinations First
            </Link>
          </div>
        </div>
      </section>

      {wizardOpen && <TripWizard onClose={() => setWizardOpen(false)} />}
    </div>
  );
}

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
    padding: "0",
  },
  heroNoise: {
    position: "absolute",
    inset: 0,
    backgroundImage: `
      radial-gradient(ellipse at 0% 100%, rgba(200,169,110,0.15) 0%, transparent 50%),
      radial-gradient(ellipse at 100% 0%, rgba(26,47,42,0.6) 0%, transparent 60%),
      url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")
    `,
  },
  heroContent: {
    position: "relative",
    zIndex: 2,
    maxWidth: 1200,
    margin: "0 auto",
    padding: "100px 24px 90px",
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gap: 80,
    alignItems: "center",
  },
  heroInner: {},
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
    fontSize: "clamp(40px, 6vw, 76px)",
    fontWeight: 400,
    color: "#fff",
    lineHeight: 1.06,
    letterSpacing: "-0.025em",
    margin: "0 0 22px",
  },
  heroItalic: {
    fontStyle: "italic",
    color: "#c8a96e",
    fontWeight: 400,
  },
  heroSub: {
    fontSize: 16,
    color: "rgba(255,255,255,0.62)",
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 300,
    lineHeight: 1.8,
    maxWidth: 520,
    marginBottom: 40,
  },
  heroMeta: {
    display: "flex",
    alignItems: "center",
    gap: 0,
    marginBottom: 40,
    borderTop: "1px solid rgba(255,255,255,0.1)",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    padding: "20px 0",
  },
  heroMetaItem: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    paddingRight: 32,
  },
  heroMetaNum: {
    fontSize: 26,
    fontWeight: 400,
    color: "#c8a96e",
    letterSpacing: "-0.02em",
    lineHeight: 1,
  },
  heroMetaLabel: {
    fontSize: 11,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "rgba(255,255,255,0.4)",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  heroMetaDivider: {
    width: 1,
    height: 36,
    backgroundColor: "rgba(255,255,255,0.12)",
    marginRight: 32,
  },
  heroCta: {
    padding: "14px 32px",
    backgroundColor: "#c8a96e",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 600,
    fontSize: 13,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    transition: "background 0.2s, transform 0.15s",
  },

  /* Hero step list (right column) */
  heroStepList: {
    display: "flex",
    flexDirection: "column",
    gap: 0,
    borderLeft: "1px solid rgba(255,255,255,0.1)",
    paddingLeft: 40,
  },
  heroStepItem: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    padding: "14px 0",
    borderBottom: "1px solid rgba(255,255,255,0.07)",
  },
  heroStepNum: {
    fontSize: 11,
    fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.1em",
    minWidth: 28,
    fontWeight: 600,
  },
  heroStepTitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.55)",
    fontFamily: "'Helvetica Neue', sans-serif",
    whiteSpace: "nowrap",
  },

  /* Steps section */
  stepsSection: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "80px 24px",
    display: "grid",
    gridTemplateColumns: "220px 1fr",
    gap: 80,
    alignItems: "start",
  },

  /* Sidebar */
  sidebar: {
    position: "sticky",
    top: 80,
  },
  sidebarInner: {
    paddingTop: 8,
  },
  sidebarLabel: {
    fontSize: 10,
    fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: "#ccc",
    marginBottom: 20,
    margin: "0 0 20px 32px",
  },
  sidebarItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: 0,
  },
  sidebarDotWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: 24,
    flexShrink: 0,
  },
  sidebarDot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    border: "2px solid",
    flexShrink: 0,
    transition: "all 0.3s ease",
    marginTop: 4,
  },
  sidebarLine: {
    width: 1,
    flex: 1,
    minHeight: 44,
    backgroundColor: "#ece9e2",
  },
  sidebarText: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    paddingLeft: 12,
    paddingBottom: 24,
  },
  sidebarNum: {
    fontSize: 10,
    fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.1em",
    transition: "color 0.3s",
  },
  sidebarName: {
    fontSize: 13,
    fontFamily: "'Helvetica Neue', sans-serif",
    lineHeight: 1.3,
    transition: "all 0.3s",
  },

  /* Step blocks */
  stepsMain: {
    display: "flex",
    flexDirection: "column",
    gap: 0,
  },
  stepBlock: {
    borderTop: "3px solid",
    paddingTop: 48,
    paddingBottom: 72,
    position: "relative",
  },
  stepHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  stepHeaderLeft: {
    display: "flex",
    alignItems: "baseline",
    gap: 16,
  },
  stepPhase: {
    fontSize: 11,
    fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    fontWeight: 700,
  },
  stepNumLarge: {
    fontSize: 56,
    fontWeight: 400,
    lineHeight: 1,
    letterSpacing: "-0.04em",
    opacity: 0.2,
  },
  stepHeaderRight: {},
  stepTimeframe: {
    display: "inline-block",
    fontSize: 11,
    fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#aaa",
    backgroundColor: "#f7f4ef",
    padding: "6px 14px",
    border: "1px solid #ece9e2",
  },
  stepTitle: {
    fontSize: "clamp(28px, 4vw, 44px)",
    fontWeight: 400,
    margin: "0 0 6px",
    letterSpacing: "-0.02em",
    lineHeight: 1.1,
  },
  stepSubtitle: {
    fontSize: 14,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#aaa",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    margin: "0 0 20px",
  },
  stepDesc: {
    fontSize: 16,
    color: "#444",
    fontFamily: "'Helvetica Neue', sans-serif",
    lineHeight: 1.8,
    maxWidth: 620,
    margin: "0 0 32px",
    fontWeight: 300,
  },
  detailList: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    marginBottom: 32,
  },
  detailItem: {
    display: "flex",
    gap: 14,
    alignItems: "flex-start",
  },
  detailBullet: {
    fontSize: 14,
    fontFamily: "'Helvetica Neue', sans-serif",
    flexShrink: 0,
    marginTop: 2,
    fontWeight: 700,
  },
  detailText: {
    fontSize: 14,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#555",
    lineHeight: 1.6,
  },
  stepCta: {
    padding: "13px 28px",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 600,
    fontSize: 13,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    transition: "opacity 0.2s, transform 0.15s",
    marginTop: 8,
  },

  /* Trust section */
  trustSection: {
    backgroundColor: "#f7f4ef",
    borderTop: "1px solid #ece9e2",
    borderBottom: "1px solid #ece9e2",
  },
  trustInner: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "72px 24px",
  },
  trustHeader: {
    textAlign: "center",
    marginBottom: 52,
  },
  sectionTag: {
    display: "inline-block",
    fontSize: 11,
    fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: "#c8a96e",
    marginBottom: 12,
  },
  trustTitle: {
    fontSize: "clamp(26px, 4vw, 42px)",
    fontWeight: 400,
    margin: "12px 0 0",
    letterSpacing: "-0.02em",
    textAlign: "center",
  },
  trustGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 2,
  },
  trustCard: {
    backgroundColor: "#fff",
    padding: "36px 32px",
    borderBottom: "2px solid transparent",
    transition: "border-color 0.2s, transform 0.2s",
  },
  trustIcon: { fontSize: 28, display: "block", marginBottom: 16 },
  trustCardTitle: {
    fontSize: 17,
    fontWeight: 400,
    margin: "0 0 10px",
    letterSpacing: "-0.01em",
  },
  trustCardBody: {
    fontSize: 13,
    color: "#666",
    fontFamily: "'Helvetica Neue', sans-serif",
    lineHeight: 1.7,
    margin: 0,
  },

  /* FAQ */
  faqSection: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "80px 24px",
  },
  faqInner: {
    display: "grid",
    gridTemplateColumns: "1fr 1.6fr",
    gap: 80,
    alignItems: "start",
  },
  faqLeft: {
    position: "sticky",
    top: 80,
  },
  faqTitle: {
    fontSize: "clamp(26px, 3.5vw, 40px)",
    fontWeight: 400,
    margin: "12px 0 16px",
    letterSpacing: "-0.02em",
    lineHeight: 1.2,
  },
  faqDesc: {
    fontSize: 14,
    color: "#666",
    fontFamily: "'Helvetica Neue', sans-serif",
    lineHeight: 1.75,
    marginBottom: 24,
  },
  faqContactLink: {
    fontSize: 13,
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 600,
    color: "#204E59",
    textDecoration: "none",
    letterSpacing: "0.04em",
    borderBottom: "1px solid #204E59",
    paddingBottom: 2,
    transition: "color 0.15s",
  },
  faqRight: {},
  faqItem: {
    borderBottom: "1px solid",
    transition: "border-color 0.25s",
  },
  faqQuestion: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
    padding: "20px 0",
    background: "none",
    border: "none",
    cursor: "pointer",
    textAlign: "left",
  },
  faqQText: {
    fontSize: 16,
    fontFamily: "'Georgia', serif",
    color: "#1a1a1a",
    lineHeight: 1.4,
    fontWeight: 400,
  },
  faqToggle: {
    fontSize: 22,
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 300,
    flexShrink: 0,
    lineHeight: 1,
    transition: "transform 0.25s, color 0.25s",
  },
  faqAnswer: {
    overflow: "hidden",
    transition: "max-height 0.35s ease, opacity 0.3s ease, padding-bottom 0.3s ease",
  },
  faqAnswerText: {
    fontSize: 14,
    color: "#666",
    fontFamily: "'Helvetica Neue', sans-serif",
    lineHeight: 1.8,
    margin: "0 0 4px",
    paddingRight: 32,
  },

  /* Final CTA */
  finalCta: {
    backgroundColor: "#0c1e14",
    position: "relative",
    overflow: "hidden",
  },
  finalCtaInner: {
    maxWidth: 760,
    margin: "0 auto",
    padding: "100px 24px",
    textAlign: "center",
    position: "relative",
    zIndex: 2,
  },
  finalCtaTitle: {
    fontSize: "clamp(28px, 4.5vw, 56px)",
    fontWeight: 400,
    color: "#fff",
    lineHeight: 1.12,
    letterSpacing: "-0.025em",
    margin: "0 0 18px",
  },
  finalCtaDesc: {
    fontSize: 15,
    color: "rgba(255,255,255,0.55)",
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 300,
    marginBottom: 44,
    lineHeight: 1.7,
  },
  finalCtaActions: {
    display: "flex",
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  finalCtaBtn: {
    padding: "15px 36px",
    backgroundColor: "#c8a96e",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 600,
    fontSize: 14,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    transition: "background 0.2s, transform 0.15s",
  },
  finalCtaSecondary: {
    fontSize: 13,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "rgba(255,255,255,0.5)",
    textDecoration: "none",
    letterSpacing: "0.06em",
    borderBottom: "1px solid rgba(255,255,255,0.2)",
    paddingBottom: 2,
    transition: "color 0.2s, border-color 0.2s",
  },
};

const css = `
  .btn-gold:hover { background-color: #b8954f !important; transform: translateY(-1px); }
  .btn-step:hover { opacity: 0.85 !important; transform: translateY(-1px); }
  .trust-card:hover { border-bottom-color: #c8a96e !important; transform: translateY(-2px); }
  .link-underline:hover { color: #c8a96e !important; border-bottom-color: #c8a96e !important; }
  .link-ghost:hover { color: rgba(255,255,255,0.8) !important; border-bottom-color: rgba(255,255,255,0.5) !important; }
  .faq-btn:hover .faq-q-text { color: #c8a96e; }
  .step-block:last-child { border-bottom: none; }

  @media (max-width: 1024px) {
    .steps-section { grid-template-columns: 1fr !important; }
    .sidebar { display: none; }
    .hero-content { grid-template-columns: 1fr !important; }
    .hero-step-list { display: none; }
  }
  @media (max-width: 768px) {
    .faq-inner { grid-template-columns: 1fr !important; }
    .faq-left { position: static !important; }
    .hero-meta { flex-direction: column; align-items: flex-start; gap: 16px; }
    .hero-meta-divider { display: none; }
  }
  @media (max-width: 640px) {
    .trust-grid { grid-template-columns: 1fr !important; }
    .final-cta-actions { flex-direction: column; }
  }
`;

export default HowItWorks;