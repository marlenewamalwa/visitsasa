import useScrollReveal from "../hooks/useScrollReveal";
import { WILDLIFE } from "../data/content";

export default function Wildlife() {
  const [ref, visible] = useScrollReveal();
  return (
    <section id="wildlife" ref={ref} style={{
      background: "#0D2B31", padding: "6rem 6%",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(32px)",
      transition: "opacity 0.7s ease, transform 0.7s ease",
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ marginBottom: "3rem" }}>
          <div style={{ fontFamily: "'Lato', sans-serif", color: "#4ECDC4", letterSpacing: "4px", fontSize: "0.72rem", textTransform: "uppercase", marginBottom: "0.8rem" }}>The Big & Beautiful</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 900, color: "#F4F9FA", maxWidth: "500px" }}>Kenya's Wildlife Wonders</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1px", background: "rgba(78,205,196,0.1)", borderRadius: "8px", overflow: "hidden" }}>
          {WILDLIFE.map((w) => (
            <div key={w.name} style={{ background: "#0D2B31", padding: "2.2rem 1.8rem", border: "1px solid rgba(255,255,255,0.06)", transition: "background 0.3s ease" }}
              onMouseOver={e => e.currentTarget.style.background = "#1D4F5A"}
              onMouseOut={e => e.currentTarget.style.background = "#0D2B31"}
            >
              <div style={{ fontSize: "2.2rem", marginBottom: "0.8rem" }}>{w.emoji}</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", fontWeight: 700, color: "#F4F9FA", marginBottom: "0.5rem" }}>{w.name}</h3>
              <p style={{ fontFamily: "'Lato', sans-serif", color: "rgba(244,249,250,0.58)", fontSize: "0.86rem", lineHeight: 1.7 }}>{w.fact}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "2.5rem", background: "rgba(78,205,196,0.07)", border: "1px solid rgba(78,205,196,0.2)", borderRadius: "8px", padding: "1.8rem 2rem", display: "flex", gap: "1.2rem", alignItems: "flex-start" }}>
          <span style={{ fontSize: "1.4rem", marginTop: "2px" }}>🌿</span>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", color: "#4ECDC4", fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.4rem" }}>Responsible Safari</div>
            <p style={{ fontFamily: "'Lato', sans-serif", color: "rgba(244,249,250,0.6)", fontSize: "0.86rem", lineHeight: 1.75 }}>
              Choose eco-certified operators, keep a respectful distance from wildlife, and support community conservancies. Kenya's wild places survive through mindful tourism.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}