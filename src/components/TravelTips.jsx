import useScrollReveal from "../hooks/useScrollReveal";
import { TIPS } from "../data/content";

export default function TravelTips() {
  const [ref, visible] = useScrollReveal();
  return (
    <section id="traveltips" ref={ref} style={{
      background: "#1D4F5A", padding: "6rem 6%",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(32px)",
      transition: "opacity 0.7s ease, transform 0.7s ease",
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div style={{ fontFamily: "'Lato', sans-serif", color: "#4ECDC4", letterSpacing: "4px", fontSize: "0.72rem", textTransform: "uppercase", marginBottom: "0.8rem" }}>Before you go</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 900, color: "#F4F9FA" }}>Travel Tips & Visa</h2>
          <div style={{ width: "50px", height: "3px", background: "#4ECDC4", margin: "1.2rem auto 0", borderRadius: "2px" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: "1.2rem" }}>
          {TIPS.map((t) => (
            <div key={t.title} style={{
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "8px", padding: "2rem",
              transition: "background 0.3s ease",
            }}
              onMouseOver={e => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}
              onMouseOut={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
            >
              <div style={{ fontSize: "1.7rem", marginBottom: "0.8rem" }}>{t.icon}</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.15rem", fontWeight: 700, color: "#F4F9FA", marginBottom: "0.5rem" }}>{t.title}</h3>
              <p style={{ fontFamily: "'Lato', sans-serif", color: "rgba(244,249,250,0.62)", fontSize: "0.86rem", lineHeight: 1.75 }}>{t.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}