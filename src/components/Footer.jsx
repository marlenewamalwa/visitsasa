export default function Footer() {
  return (
    <footer style={{ background: "#0A1F24", padding: "3rem 6%", textAlign: "center" }}>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 900, color: "#F4F9FA", marginBottom: "0.4rem" }}>
        Visit<span style={{ color: "#4ECDC4" }}>Sasa</span>
      </div>
      <p style={{ fontFamily: "'Lato', sans-serif", color: "rgba(244,249,250,0.35)", fontSize: "0.72rem", letterSpacing: "3px", textTransform: "uppercase" }}>
        Kenya · East Africa · The Time Is Now
      </p>
      <div style={{ marginTop: "2rem", paddingTop: "2rem", borderTop: "1px solid rgba(78,205,196,0.1)" }}>
        <p style={{ fontFamily: "'Lato', sans-serif", color: "rgba(244,249,250,0.2)", fontSize: "0.72rem" }}>
          © 2026 VisitSasa · A travel guide to the magic of Kenya
        </p>
      </div>
    </footer>
  );
}