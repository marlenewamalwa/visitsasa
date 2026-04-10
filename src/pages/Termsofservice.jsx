import React from "react";
import { Link } from "react-router-dom";

const SECTIONS = [
  {
    title: "Acceptance of Terms",
    content: [
      {
        body: "By accessing or using the VisitSasa website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. We may update these terms from time to time — continued use of the platform after updates are posted constitutes acceptance of the revised terms.",
      },
    ],
  },
  {
    title: "Description of Services",
    content: [
      {
        body: "VisitSasa is a Kenya travel planning platform that allows users to browse destinations and activities, build custom trip requests, and connect with a dedicated travel specialist who will design and coordinate their experience. VisitSasa acts as an intermediary between travellers and our vetted network of local guides, lodges, and operators.",
      },
      {
        body: "We reserve the right to modify, suspend, or discontinue any part of our services at any time, with or without notice.",
      },
    ],
  },
  {
    title: "User Accounts",
    content: [
      {
        subtitle: "Registration",
        body: "To access certain features such as saving destinations or submitting trip requests, you must create an account. You agree to provide accurate, complete information and to keep your account details up to date.",
      },
      {
        subtitle: "Account security",
        body: "You are responsible for maintaining the confidentiality of your password and for all activity that occurs under your account. Notify us immediately at support@visitsasa.com if you suspect unauthorised use of your account.",
      },
      {
        subtitle: "Account termination",
        body: "We reserve the right to suspend or terminate accounts that violate these terms, provide false information, or engage in activity that we determine, in our sole discretion, to be harmful to VisitSasa, our partners, or other users.",
      },
    ],
  },
  {
    title: "Trip Requests & Bookings",
    content: [
      {
        subtitle: "Nature of trip requests",
        body: "Submitting a trip request through VisitSasa is an expression of interest, not a confirmed booking. A trip is only confirmed once you have received written confirmation from your assigned travel specialist and any required deposit has been received.",
      },
      {
        subtitle: "Pricing & payments",
        body: "All pricing provided through the platform is indicative and subject to change based on availability, seasonality, and specific requirements. Final pricing will be confirmed by your travel specialist before any payment is taken.",
      },
      {
        subtitle: "Cancellations & refunds",
        body: "Cancellation and refund terms vary depending on your trip specifics and third-party supplier policies. Your travel specialist will provide full cancellation terms in writing before you confirm your booking.",
      },
    ],
  },
  {
    title: "User Conduct",
    content: [
      {
        body: "You agree not to use VisitSasa to submit false or misleading trip requests, impersonate another person, scrape or harvest data from the platform, attempt to gain unauthorised access to any part of the website, or engage in any activity that could harm VisitSasa, our partners, or other users.",
      },
    ],
  },
  {
    title: "Intellectual Property",
    content: [
      {
        body: "All content on the VisitSasa platform — including text, images, logos, destination descriptions, and travel guides — is owned by or licensed to VisitSasa and is protected by copyright law. You may not reproduce, distribute, or use our content without prior written permission.",
      },
    ],
  },
  {
    title: "Third-Party Services",
    content: [
      {
        body: "VisitSasa works with third-party guides, lodges, and operators to deliver travel experiences. While we carefully vet our partners, VisitSasa is not liable for the acts, omissions, or negligence of any third-party service providers. Any disputes regarding on-the-ground services should be directed to us at support@visitsasa.com and we will work to resolve them in good faith.",
      },
    ],
  },
  {
    title: "Limitation of Liability",
    content: [
      {
        body: "To the fullest extent permitted by law, VisitSasa shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of our services, including but not limited to loss of profits, data, or goodwill, even if we have been advised of the possibility of such damages.",
      },
      {
        body: "Our total liability to you for any claim arising from these terms or your use of our services shall not exceed the amount paid by you to VisitSasa in the twelve months preceding the claim.",
      },
    ],
  },
  {
    title: "Disclaimer of Warranties",
    content: [
      {
        body: "VisitSasa provides its platform and services on an \"as is\" and \"as available\" basis without warranties of any kind, either express or implied. We do not warrant that the platform will be uninterrupted, error-free, or free of viruses or other harmful components.",
      },
    ],
  },
  {
    title: "Governing Law",
    content: [
      {
        body: "These Terms of Service are governed by the laws of Kenya. Any disputes arising from these terms or your use of VisitSasa shall be subject to the exclusive jurisdiction of the courts of Nairobi, Kenya.",
      },
    ],
  },
  {
    title: "Contact",
    content: [
      {
        body: "For questions about these Terms of Service, please email us at legal@visitsasa.com or write to us at VisitSasa, Nairobi, Kenya.",
      },
    ],
  },
];

export default function TermsOfService() {
  return (
    <div style={S.page}>
      <style>{css}</style>

      {/* Hero */}
      <div style={S.hero}>
        <div style={S.heroInner}>
          <p style={S.heroEyebrow}>Legal</p>
          <h1 style={S.heroTitle}>Terms of Service</h1>
          <p style={S.heroSub}>Last updated: 1 January 2025</p>
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
            <Link to="/privacy" style={S.sidebarLink} className="sidebar-link">
              Privacy Policy →
            </Link>
          </aside>

          {/* Content */}
          <main style={S.content}>
            <div style={S.intro}>
              <p style={S.introText}>
                Please read these Terms of Service carefully before using VisitSasa.
                These terms govern your access to and use of our website, trip planning
                tools, and travel services. By creating an account or submitting a trip
                request, you agree to be bound by these terms.
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
                <a href="mailto:legal@visitsasa.com" style={S.footerLink}>
                  legal@visitsasa.com
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
    padding: "6px 0 6px 10px",
    lineHeight: 1.4,
    transition: "color 0.15s",
    borderLeft: "2px solid transparent",
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
    [style*="grid-template-columns: 220px"] { grid-template-columns: 1fr !important; }
  }
`;