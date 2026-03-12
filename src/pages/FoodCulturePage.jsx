import FoodCulture from "../components/FoodCulture";

export default function FoodCulturePage() {
  return (
    <div style={{ paddingTop: "68px" }}>
      <div style={{
        background: "linear-gradient(135deg, #0A1F24, #1D4F5A)",
        padding: "5rem 6% 3rem",
        textAlign: "center",
      }}>
        <div style={{ fontFamily: "'Lato', sans-serif", color: "#4ECDC4", letterSpacing: "4px", fontSize: "0.72rem", textTransform: "uppercase", marginBottom: "0.8rem" }}>
          Taste & Tradition
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, color: "#F4F9FA" }}>
          Food & Culture
        </h1>
      </div>
      <FoodCulture />
    </div>
  );
}