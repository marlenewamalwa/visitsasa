import React, { useState } from "react";
import heroBg from "../assets/nairobi2.jpg";
import culture from "../assets/culture.jpg";
import planning from "../assets/planning.jpg";
import money from "../assets/money.jpg";
import health from "../assets/stethoscope.jpg";
import wildlife from "../assets/leopard.jpg";

const CATEGORIES = [
  {
    label: "Health & Safety",
    tag: "Stay Safe",
    img: health,
    tips: [
      {
        title: "Carry water at all times",
        body: "Dehydration sets in fast in Kenya's savannah heat. Bring at least 2 litres when visiting any wildlife park or doing outdoor activities.",
      },
      {
        title: "Get vaccinated before you travel",
        body: "Yellow fever vaccination is required for entry. Hepatitis A, Typhoid, and anti-malarial medication are strongly recommended.",
      },
      {
        title: "Use insect repellent",
        body: "Malaria is present in many regions, especially near water. Apply DEET-based repellent at dusk and sleep under a mosquito net.",
      },
      {
        title: "Travel with a basic first-aid kit",
        body: "Include antiseptic, bandages, rehydration salts, and any prescription medication. Pharmacies are limited outside major towns.",
      },
    ],
  },
  {
    label: "Culture & Etiquette",
    tag: "Respect & Connect",
    img: culture,
    tips: [
      {
        title: "Greet people warmly",
        body: "A handshake and 'Jambo' or 'Habari' goes a long way. Kenyans are warm and hospitable — take the time to greet before asking questions.",
      },
      {
        title: "Ask before photographing people",
        body: "Always seek permission before photographing individuals, especially members of Maasai, Samburu, or other communities.",
      },
      {
        title: "Dress modestly in coastal towns",
        body: "Mombasa and Lamu have significant Muslim populations. Cover shoulders and knees when visiting markets, mosques, or residential areas.",
      },
      {
        title: "Tipping is appreciated",
        body: "Tip guides, drivers, and lodge staff — typically 10–15% in restaurants and KES 500–1000/day for safari guides.",
      },
    ],
  },
  {
    label: "Planning & Booking",
    tag: "Travel Smart",
    img: planning,
    tips: [
      {
        title: "Book well in advance for peak season",
        body: "July–October (Great Migration) and December–January are extremely popular. Lodges fill up months ahead — plan early.",
      },
      {
        title: "Check visa requirements",
        body: "Kenya uses an e-Visa system at evisa.go.ke. Apply at least two weeks before travel. Citizens of some countries receive visas on arrival.",
      },
      {
        title: "Check weather before each leg",
        body: "Kenya has two rainy seasons: long rains (March–May) and short rains (October–November). Coast and highlands follow different patterns.",
      },
      {
        title: "Confirm all bookings 48 hours before",
        body: "Reconfirm lodges, transfers, and activities two days out. Communication can sometimes be slow in remote areas.",
      },
    ],
  },
  {
    label: "Money & Security",
    tag: "Stay Prepared",
    img: money,
    tips: [
      {
        title: "Keep your belongings secure",
        body: "Use hotel safes for passports and valuables. Avoid displaying expensive jewellery or electronics in crowded areas like Nairobi CBD.",
      },
      {
        title: "Carry local currency",
        body: "The Kenyan Shilling (KES) is widely used. USD is accepted at many lodges and parks. M-Pesa is Kenya's mobile money system — widely used everywhere.",
      },
      {
        title: "Use licensed taxis or ride-hailing apps",
        body: "Uber and Bolt operate in Nairobi and Mombasa. Avoid unmarked taxis — always agree on a fare before entering an unlicensed vehicle.",
      },
      {
        title: "Keep emergency contacts handy",
        body: "Kenya police: 999 or 112. Tourist helpline: 0800 723 151. Save your lodge, guide, and embassy numbers before departure.",
      },
    ],
  },
  {
    label: "Wildlife & Nature",
    tag: "Responsible Tourism",
    img: wildlife,
    tips: [
      {
        title: "Never feed or approach wild animals",
        body: "Feeding wildlife disrupts natural behaviour and can be dangerous. Keep at least 20 metres from predators and follow your guide's instructions at all times.",
      },
      {
        title: "Stay on designated trails",
        body: "Off-trail movement damages fragile ecosystems. In national parks, stay in your vehicle unless your guide explicitly says otherwise.",
      },
      {
        title: "Avoid single-use plastics",
        body: "Plastic bags are banned in Kenya. Bring a reusable bag and water bottle. Many parks and conservancies are plastic-free zones.",
      },
      {
        title: "Choose eco-certified accommodations",
        body: "Look for lodges certified by Ecotourism Kenya. Your stay directly supports conservation and local community livelihoods.",
      },
    ],
  },
];

const QUICK_FACTS = [
  { label: "Currency", value: "Kenyan Shilling (KES)" },
  { label: "Language", value: "Swahili & English" },
  { label: "Time Zone", value: "EAT — UTC+3" },
  { label: "Dialling Code", value: "+254" },
  { label: "Voltage", value: "240V / Type G plug" },
  { label: "Best Time", value: "Jul–Oct, Jan–Feb" },
];

function TravelTips() {
  const [active, setActive] = useState(0);

  return (
    <div style={styles.page}>
      <style>{css}</style>

      {/* ── HERO ── */}
      <section style={styles.hero} className="tips-hero">
        <img src={heroBg} alt="Kenya travel" style={styles.heroBgImg} />
        <div style={styles.heroOverlay} />
        <div style={styles.heroContent}>
          <span style={styles.eyebrow}>Before You Go</span>
          <h1 style={styles.heroTitle}>Kenya Travel Guide</h1>
          <p style={styles.heroDesc}>
            Everything you need to know to travel Kenya safely, respectfully, and
            unforgettably — from your first vaccine to your last safari sunrise.
          </p>
        </div>
      </section>

      {/* Quick Facts Bar */}
      <section style={styles.factsBar} className="facts-bar">
        {QUICK_FACTS.map(f => (
          <div key={f.label} style={styles.factItem} className="fact-item">
            <span style={styles.factLabel}>{f.label}</span>
            <span style={styles.factValue}>{f.value}</span>
          </div>
        ))}
      </section>

      {/* Category Tabs + Tips */}
      <section style={styles.main} className="main-grid">
        {/* Sidebar */}
        <nav style={styles.sidebar} className="tips-sidebar">
          {CATEGORIES.map((cat, i) => (
            <button
              key={cat.label}
              style={{
                ...styles.tabBtn,
                ...(active === i ? styles.tabBtnActive : {}),
              }}
              className="tab-btn"
              onClick={() => setActive(i)}
            >
              <span style={styles.tabTag}>{cat.tag}</span>
              <span style={styles.tabLabel}>{cat.label}</span>
            </button>
          ))}
        </nav>

        {/* Content */}
        <div style={styles.content} className="tips-content">
          <img
            src={CATEGORIES[active].img}
            alt={CATEGORIES[active].label}
            style={styles.catImg}
          />
          <div style={styles.tipsGrid} className="tips-grid">
            {CATEGORIES[active].tips.map((tip, i) => (
              <div key={i} style={styles.tipCard} className="tip-card">
                <span style={styles.tipNum}>0{i + 1}</span>
                <div>
                  <h3 style={styles.tipTitle}>{tip.title}</h3>
                  <p style={styles.tipBody}>{tip.body}</p>
                </div>
              </div>
            ))}
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

  /* Hero */
  hero: {
    position: "relative",
    minHeight: 460,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  heroBgImg: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  heroOverlay: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(8,22,14,0.65)",
  },
  heroContent: {
    position: "relative",
    zIndex: 2,
    maxWidth: 680,
    padding: "80px 24px",
    textAlign: "center",
    width: "100%",
    margin: "0 auto",
  },
  eyebrow: {
    display: "inline-block",
    fontSize: 11,
    fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "#c8a96e",
    marginBottom: 16,
    borderBottom: "1px solid rgba(200,169,110,0.5)",
    paddingBottom: 6,
  },
  heroTitle: {
    fontSize: "clamp(34px, 5vw, 58px)",
    fontWeight: 400,
    letterSpacing: "-0.02em",
    lineHeight: 1.1,
    margin: "0 0 20px",
    color: "#fff",
  },
  heroDesc: {
    fontSize: 16,
    color: "rgba(255,255,255,0.72)",
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 300,
    lineHeight: 1.75,
    margin: 0,
  },

  /* Quick Facts */
  factsBar: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    borderTop: "1px solid #ece9e2",
    borderBottom: "1px solid #ece9e2",
  },
  factItem: {
    padding: "24px 36px",
    borderRight: "1px solid #ece9e2",
    textAlign: "center",
    flex: "1 1 140px",
  },
  factLabel: {
    display: "block",
    fontSize: 10,
    fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: "#aaa",
    marginBottom: 6,
  },
  factValue: {
    display: "block",
    fontSize: 14,
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 600,
    color: "#204E59",
  },

  /* Main layout */
  main: {
    display: "grid",
    gridTemplateColumns: "240px 1fr",
    gap: 0,
    maxWidth: 1200,
    margin: "0 auto",
    padding: "56px 24px 80px",
  },

  /* Sidebar */
  sidebar: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    borderRight: "1px solid #ece9e2",
    paddingRight: 32,
    paddingTop: 4,
  },
  tabBtn: {
    background: "none",
    border: "none",
    textAlign: "left",
    cursor: "pointer",
    padding: "14px 16px",
    borderRadius: 2,
    transition: "background 0.15s",
    display: "flex",
    flexDirection: "column",
    gap: 3,
  },
  tabBtnActive: {
    backgroundColor: "#f7f4ef",
    borderLeft: "2px solid #c8a96e",
  },
  tabTag: {
    fontSize: 10,
    fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "#c8a96e",
  },
  tabLabel: {
    fontSize: 14,
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 600,
    color: "#204E59",
  },

  /* Content pane */
  content: {
    paddingLeft: 48,
  },
  catImg: {
    width: "100%",
    height: 220,
    objectFit: "cover",
    display: "block",
    marginBottom: 36,
  },
  tipsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 28,
  },
  tipCard: {
    display: "flex",
    gap: 18,
    alignItems: "flex-start",
    padding: "22px 20px",
    backgroundColor: "#fafaf8",
    border: "1px solid #ece9e2",
    transition: "border-color 0.2s, box-shadow 0.2s",
  },
  tipNum: {
    fontSize: 11,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#c8a96e",
    letterSpacing: "0.1em",
    minWidth: 24,
    paddingTop: 2,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 400,
    margin: "0 0 8px",
    letterSpacing: "-0.01em",
  },
  tipBody: {
    fontSize: 13,
    color: "#666",
    fontFamily: "'Helvetica Neue', sans-serif",
    lineHeight: 1.7,
    margin: 0,
  },
};

const css = `
  .tab-btn:hover { background-color: #f7f4ef; }
  .tip-card:hover { border-color: #c8a96e !important; box-shadow: 0 4px 16px rgba(0,0,0,0.07); }

  @media (max-width: 900px) {
    .main-grid {
      grid-template-columns: 1fr !important;
      padding: 40px 24px 60px !important;
    }
    .tips-sidebar {
      flex-direction: row !important;
      flex-wrap: wrap !important;
      border-right: none !important;
      border-bottom: 1px solid #ece9e2 !important;
      padding-right: 0 !important;
      padding-bottom: 20px !important;
      gap: 8px !important;
    }
    .tab-btn { padding: 10px 14px !important; }
    .tips-content { padding-left: 0 !important; padding-top: 32px; }
    .tips-grid { grid-template-columns: 1fr 1fr !important; }
  }
  @media (max-width: 640px) {
    .tips-hero { min-height: 360px !important; }
    .tips-grid { grid-template-columns: 1fr !important; }
    .facts-bar { gap: 0; }
    .fact-item { flex: 1 1 45% !important; padding: 18px 16px !important; }
    .main-grid { padding: 32px 16px 48px !important; }
  }
  @media (max-width: 420px) {
    .fact-item { flex: 1 1 100% !important; border-right: none !important; border-bottom: 1px solid #ece9e2; }
  }
`;

export default TravelTips;