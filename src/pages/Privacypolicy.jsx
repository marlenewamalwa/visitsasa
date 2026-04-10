import React from "react";
import { Link } from "react-router-dom";

const SECTIONS = [
  {
    title: "Information We Collect",
    content: [
      {
        subtitle: "Information you provide",
        body: "When you create an account, we collect your name, email address, and password. If you sign in with Google, we receive your name, email, and profile photo from Google. When you submit a trip request, we collect your travel preferences, dates, group size, budget range, and any additional notes you provide.",
      },
      {
        subtitle: "Information we collect automatically",
        body: "When you use VisitSasa, we collect information about your activity such as destinations and activities you save, trips you create, and pages you visit. We also collect device information including your browser type, operating system, and IP address.",
      },
    ],
  },
  {
    title: "How We Use Your Information",
    content: [
      {
        body: "We use your information to provide and improve our services — specifically to process your trip requests, match you with a travel specialist, send you updates about your trip status, and personalise your experience by remembering saved destinations and activities.",
      },
      {
        body: "We may also send you occasional emails about new destinations, travel tips, or offers we think may interest you. You can opt out of these at any time from your account settings or via the unsubscribe link in any email.",
      },
    ],
  },
  {
    title: "How We Share Your Information",
    content: [
      {
        subtitle: "With our travel partners",
        body: "To fulfil your trip requests, we share relevant details with our vetted network of Kenyan guides, lodges, and operators. We only share what is necessary to plan and deliver your experience.",
      },
      {
        subtitle: "We do not sell your data",
        body: "VisitSasa does not sell, rent, or trade your personal information to third parties for their own marketing purposes.",
      },
      {
        subtitle: "Service providers",
        body: "We use trusted third-party services to operate our platform, including Supabase for database and authentication, and Google OAuth for sign-in. These providers are contractually bound to protect your data.",
      },
    ],
  },
  {
    title: "Data Storage & Security",
    content: [
      {
        body: "Your data is stored securely using Supabase, which is hosted on AWS infrastructure. We use industry-standard encryption for data in transit (HTTPS/TLS) and at rest. Access to your personal data is restricted to authorised VisitSasa team members who need it to assist you.",
      },
      {
        body: "While we take reasonable steps to protect your information, no method of transmission over the internet is 100% secure. We encourage you to use a strong, unique password for your account.",
      },
    ],
  },
  {
    title: "Your Rights",
    content: [
      {
        body: "You have the right to access, correct, or delete your personal information at any time. You can update your name and phone number directly from Account Settings in your profile. To request a full export or deletion of your data, please contact us at privacy@visitsasa.com and we will respond within 30 days.",
      },
    ],
  },
  {
    title: "Cookies",
    content: [
      {
        body: "We use essential cookies and local storage to keep you signed in and remember your preferences. We do not use third-party advertising cookies. You can clear cookies at any time via your browser settings, but doing so will sign you out of your account.",
      },
    ],
  },
  {
    title: "Changes to This Policy",
    content: [
      {
        body: "We may update this Privacy Policy from time to time. When we do, we will update the date at the top of this page. If the changes are significant, we will notify you by email. Continued use of VisitSasa after changes are posted constitutes your acceptance of the updated policy.",
      },
    ],
  },
  {
    title: "Contact Us",
    content: [
      {
        body: "If you have questions about this Privacy Policy or how we handle your data, please email us at privacy@visitsasa.com or write to us at VisitSasa, Nairobi, Kenya.",
      },
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <div style={S.page}>
      <style>{css}</style>

      {/* Hero */}
      <div style={S.hero}>
        <div style={S.heroInner}>
          <p style={S.heroEyebrow}>Legal</p>
          <h1 style={S.heroTitle}>Privacy Policy</h1>
          <p style={S.heroSub}>
            Last updated: 10 April 2026
          </p>
        </div>
      </div>

      {/* Body */}
      <div style={S.body}>
        <div style={S.layout}>

          {/* Sidebar nav */}
          <aside style={S.sidebar} className="policy-sidebar">
            <p style={S.sidebarLabel}>On this page</p>
            {SECTIONS.map((s) => (
              <a
                key={s.title}
                href={`#${slug(s.title)}`}
                style={S.sidebarLink}
                className="sidebar-link"
              >
                {s.title}
              </a>
            ))}
            <div style={S.sidebarDivider} />
            <Link to="/terms" style={S.sidebarLink} className="sidebar-link">
              Terms of Service →
            </Link>
          </aside>

          {/* Content */}
          <main style={S.content}>
            <div style={S.intro}>
              <p style={S.introText}>
                VisitSasa is committed to protecting your privacy.
                This policy explains what information we collect when you use our website and
                services, how we use it, and your rights regarding your personal data.
                By using VisitSasa, you agree to the practices described here.
              </p>
            </div>

            {SECTIONS.map((s) => (
              <section key={s.title} id={slug(s.title)} style={S.section}>
                <h2 style={S.sectionTitle}>{s.title}</h2>
                {s.content.map((c, i) => (
                  <div key={i} style={S.block}>
                    {c.subtitle && <h3 style={S.blockSubtitle}>{c.subtitle}</h3>}
                    <p style={S.blockText}>{c.body}</p>
                  </div>
                ))}
              </section>
            ))}

            {/* Footer note */}
            <div style={S.footerNote}>
              <span style={S.footerMark}>✦</span>
              <p style={S.footerText}>
                Questions? Email us at{" "}
                <a href="mailto:privacy@visitsasa.com" style={S.footerLink}>
                  privacy@visitsasa.com
                </a>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function slug(str) {
  return str.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

const S = {
  page: {
    fontFamily: "'Georgia', serif",
    backgroundColor: "#faf9f7",
    minHeight: "100vh",
  },

  hero: {
    backgroundColor: "#0c1e14",
    padding: "72px 24px 56px",
  },
  heroInner: {
    maxWidth: 900,
    margin: "0 auto",
  },
  heroEyebrow: {
    fontSize: 11,
    fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: "#c8a96e",
    margin: "0 0 16px",
  },
  heroTitle: {
    fontSize: "clamp(32px, 5vw, 52px)",
    fontWeight: 400,
    color: "#fff",
    margin: "0 0 16px",
    letterSpacing: "-0.02em",
    lineHeight: 1.1,
  },
  heroSub: {
    fontSize: 14,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "rgba(255,255,255,0.4)",
    margin: 0,
    letterSpacing: "0.02em",
  },

  body: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "56px 24px 96px",
  },

  layout: {
    display: "grid",
    gridTemplateColumns: "220px 1fr",
    gap: "0 64px",
    alignItems: "start",
  },

  sidebar: {
    position: "sticky",
    top: 96,
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  sidebarLabel: {
    fontSize: 10,
    fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "#aaa",
    margin: "0 0 12px",
  },
  sidebarLink: {
    fontSize: 13,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#888",
    textDecoration: "none",
    padding: "6px 0",
    lineHeight: 1.4,
    transition: "color 0.15s",
    borderLeft: "2px solid transparent",
    paddingLeft: 10,
  },
  sidebarDivider: {
    height: 1,
    backgroundColor: "#e8e4de",
    margin: "16px 0",
  },

  content: {
    maxWidth: 680,
  },

  intro: {
    borderLeft: "3px solid #c8a96e",
    paddingLeft: 24,
    marginBottom: 48,
  },
  introText: {
    fontSize: 16,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#555",
    lineHeight: 1.85,
    margin: 0,
    fontWeight: 300,
  },

  section: {
    marginBottom: 48,
    paddingBottom: 48,
    borderBottom: "1px solid #ece9e2",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 400,
    color: "#1a1a1a",
    margin: "0 0 24px",
    letterSpacing: "-0.02em",
  },

  block: {
    marginBottom: 20,
  },
  blockSubtitle: {
    fontSize: 13,
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 600,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: "#555",
    margin: "0 0 10px",
  },
  blockText: {
    fontSize: 15,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#444",
    lineHeight: 1.85,
    margin: 0,
    fontWeight: 300,
  },

  footerNote: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    padding: "28px 0 0",
  },
  footerMark: {
    fontSize: 20,
    color: "#c8a96e",
    flexShrink: 0,
  },
  footerText: {
    fontSize: 14,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#888",
    margin: 0,
  },
  footerLink: {
    color: "#c8a96e",
    textDecoration: "none",
  },
};

const css = `
  .sidebar-link:hover { color: #1a1a1a !important; border-left-color: #c8a96e !important; }
  @media (max-width: 768px) {
    .policy-sidebar { display: none !important; }
  }
  @media (max-width: 768px) {
    [style*="grid-template-columns: 220px"] { grid-template-columns: 1fr !important; }
  }
`;