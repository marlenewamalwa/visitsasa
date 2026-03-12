export default function Hero({ onNav }) {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, rgba(10,31,36,0.85) 0%, rgba(29,79,90,0.75) 100%), url('https://source.unsplash.com/1600x900/?kenya,savanna,landscape') center/cover no-repeat",
      display: "flex", alignItems: "center",
      position: "relative", overflow: "hidden",
      padding: "0 6%",
    }}>
      <div style={{ position: "relative", zIndex: 2, maxWidth: "820px" }}>
        <div style={{ fontFamily: "'Lato', sans-serif", color: "#4ECDC4", letterSpacing: "4px", fontSize: "0.75rem", textTransform: "uppercase", marginBottom: "1.5rem", fontWeight: 700 }}>
          🌍 East Africa's Finest
        </div>
        <h1 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(3.5rem, 8vw, 7rem)",
          fontWeight: 900, lineHeight: 1.0,
          color: "#F4F9FA", marginBottom: "1.5rem",
        }}>
          Kenya<br />
          <em style={{ color: "#4ECDC4" }}>Awaits</em><br />
          You.
        </h1>
        <p style={{
          fontFamily: "'Lato', sans-serif",
          color: "rgba(244,249,250,0.72)", fontSize: "1.1rem",
          lineHeight: 1.9, maxWidth: "500px", marginBottom: "2.5rem", fontWeight: 300,
        }}>
          From the sweeping savannas of the Mara to dhow-sailed shores of Lamu — discover the raw, unhurried beauty of Kenya. <em>Sasa</em> means now. The time to go is now.
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <button onClick={() => onNav("Destinations")} style={{
            background: "#4ECDC4", color: "#0D2B31", border: "none",
            padding: "0.9rem 2rem", fontFamily: "'Lato', sans-serif",
            fontSize: "0.85rem", fontWeight: 700, letterSpacing: "1.5px",
            textTransform: "uppercase", cursor: "pointer", borderRadius: "4px",
          }}>Explore Kenya</button>
          <button onClick={() => onNav("Wildlife")} style={{
            background: "transparent", color: "#F4F9FA",
            border: "1.5px solid rgba(244,249,250,0.4)",
            padding: "0.9rem 2rem", fontFamily: "'Lato', sans-serif",
            fontSize: "0.85rem", fontWeight: 700, letterSpacing: "1.5px",
            textTransform: "uppercase", cursor: "pointer", borderRadius: "4px",
          }}>Safari Guide →</button>
        </div>
        <div style={{ marginTop: "3.5rem", display: "flex", gap: "3rem", flexWrap: "wrap" }}>
          {[["47+", "Tribes"], ["58K km²", "Protected Land"], ["1.5M", "Wildebeest"]].map(([num, label]) => (
            <div key={label}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.9rem", fontWeight: 700, color: "#4ECDC4" }}>{num}</div>
              <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.72rem", color: "rgba(244,249,250,0.5)", letterSpacing: "2px", textTransform: "uppercase", marginTop: "0.2rem" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
        <div style={{ fontFamily: "'Lato', sans-serif", color: "rgba(244,249,250,0.35)", fontSize: "0.68rem", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "0.6rem" }}>Scroll</div>
        <div style={{ width: "1px", height: "36px", background: "linear-gradient(to bottom, rgba(78,205,196,0.5), transparent)", margin: "0 auto" }} />
      </div>
    </div>
  );
}