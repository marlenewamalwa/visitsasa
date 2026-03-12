import useScrollReveal from "../hooks/useScrollReveal";
import { FOODS } from "../data/content";

const CULTURE = [
  ["🥁", "Music", "Benga, Ohangla, and coastal taarab rhythms fill every celebration"],
  ["💃", "Dance", "Each community has its own ceremonial dances — the Maasai adumu jump is iconic"],
  ["🪆", "Craft", "Hand-carved soapstone, beaded jewellery, and woven kiondo baskets"],
  ["📖", "Language", "Swahili poetry (utendi) is a centuries-old literary tradition"],
];

export default function FoodCulture() {
  const [ref, visible] = useScrollReveal();
  return (
    <section id="foodculture" ref={ref} style={{
      padding: "6rem 6%", background: "#F4F9FA",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(32px)",
      transition: "opacity 0.7s ease, transform 0.7s ease",
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div style={{ fontFamily: "'Lato', sans-serif", color: "#1D4F5A", letterSpacing: "4px", fontSize: "0.72rem", textTransform: "uppercase", marginBottom: "0.8rem" }}>Taste & Tradition</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 900 }}>Food & Culture</h2>
          <div style={{ width: "50px", height: "3px", background: "#1D4F5A", margin: "1.2rem auto 0", borderRadius: "2px" }} />
          <p style={{ fontFamily: "'Lato', sans-serif", color: "#3D6B74", fontSize: "0.95rem", lineHeight: 1.85, maxWidth: "560px", margin: "1.5rem auto 0" }}>
            Kenya's kitchen is a love letter to its 47 tribes, coastal Swahili traders, and generations of communal gathering.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: "1.2rem" }}>
          {FOODS.map((f) => (
            <div key={f.name} style={{
              background: "#fff", borderRadius: "8px", padding: "1.8rem",
              borderTop: "3px solid #1D4F5A",
              boxShadow: "0 2px 16px rgba(29,79,90,0.07)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
              onMouseOver={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(29,79,90,0.14)"; }}
              onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 16px rgba(29,79,90,0.07)"; }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "0.8rem" }}>{f.emoji}</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.5rem" }}>{f.name}</h3>
              <p style={{ fontFamily: "'Lato', sans-serif", color: "#3D6B74", fontSize: "0.86rem", lineHeight: 1.75 }}>{f.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "3.5rem", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1rem" }}>
          {CULTURE.map(([icon, title, desc]) => (
            <div key={title} style={{ background: "#fff", borderRadius: "8px", padding: "1.5rem", boxShadow: "0 2px 12px rgba(29,79,90,0.06)" }}>
              <div style={{ fontSize: "1.4rem", marginBottom: "0.6rem" }}>{icon}</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 700, marginBottom: "0.4rem" }}>{title}</div>
              <p style={{ fontFamily: "'Lato', sans-serif", color: "#3D6B74", fontSize: "0.82rem", lineHeight: 1.65 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}