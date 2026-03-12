import useScrollReveal from "../hooks/useScrollReveal";
import { DESTINATIONS } from "../data/content";

export default function Destinations() {
  const [ref, visible] = useScrollReveal();
  return (
    <section id="destinations" ref={ref} style={{
      padding: "6rem 6%", background: "#F4F9FA",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(32px)",
      transition: "opacity 0.7s ease, transform 0.7s ease",
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div style={{ fontFamily: "'Lato', sans-serif", color: "#1D4F5A", letterSpacing: "4px", fontSize: "0.72rem", textTransform: "uppercase", marginBottom: "0.8rem" }}>Where to go</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 900 }}>Iconic Destinations</h2>
          <div style={{ width: "50px", height: "3px", background: "#1D4F5A", margin: "1.2rem auto 0", borderRadius: "2px" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))", gap: "1.5rem" }}>
          {DESTINATIONS.map((d) => (
            <div key={d.name} style={{
              background: "#fff", borderRadius: "8px", overflow: "hidden",
              boxShadow: "0 2px 16px rgba(29,79,90,0.08)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
              onMouseOver={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(29,79,90,0.18)"; }}
              onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 16px rgba(29,79,90,0.08)"; }}
            >
              <div style={{ height: "200px", position: "relative", overflow: "hidden" }}>
                <img src={d.img} alt={d.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                  onMouseOver={e => e.target.style.transform = "scale(1.06)"}
                  onMouseOut={e => e.target.style.transform = "scale(1)"}
                  onError={e => { e.target.style.display = "none"; e.target.parentNode.style.background = `linear-gradient(135deg, ${d.bg}, #2A6B79)`; }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.35), transparent)" }} />
                <div style={{
                  position: "absolute", top: "0.8rem", right: "0.8rem",
                  background: "rgba(244,249,250,0.92)", color: "#1D4F5A",
                  fontFamily: "'Lato', sans-serif", fontSize: "0.62rem", fontWeight: 700,
                  letterSpacing: "1.5px", textTransform: "uppercase",
                  padding: "0.2rem 0.5rem", borderRadius: "3px",
                }}>{d.tag}</div>
                <div style={{ position: "absolute", bottom: "0.8rem", left: "0.8rem", fontSize: "1.8rem" }}>{d.emoji}</div>
              </div>
              <div style={{ padding: "1.5rem" }}>
                <div style={{ fontFamily: "'Lato', sans-serif", color: "#1D4F5A", fontSize: "0.68rem", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "0.3rem" }}>{d.region}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 700, marginBottom: "0.6rem" }}>{d.name}</h3>
                <p style={{ fontFamily: "'Lato', sans-serif", color: "#3D6B74", fontSize: "0.88rem", lineHeight: 1.75, marginBottom: "1rem" }}>{d.desc}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <span style={{ fontSize: "0.8rem" }}>📅</span>
                  <span style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.75rem", color: "#1D4F5A", fontWeight: 700 }}>Best: {d.best}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}