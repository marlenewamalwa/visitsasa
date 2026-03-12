import Hero from "../components/Hero";
import Destinations from "../components/Destinations";
import Wildlife from "../components/Wildlife";
import FoodCulture from "../components/FoodCulture";


const scrollTo = (id) => {
  const elId = id.toLowerCase().replace(/[^a-z]/g, "");
  document.getElementById(elId)?.scrollIntoView({ behavior: "smooth" });
};

export default function Home() {
  return (
    <>
      <Hero onNav={scrollTo} />
      <Destinations />
      <div style={{
        background: "#0D2B31", padding: "1rem 6%",
        display: "flex", alignItems: "center", gap: "1.5rem"
      }}>
        <div style={{ flex: 1, height: "1px", background: "rgba(78,205,196,0.2)" }} />
        <span style={{ fontFamily: "'Lato', sans-serif", color: "#4ECDC4", fontSize: "0.7rem", letterSpacing: "4px", textTransform: "uppercase", whiteSpace: "nowrap" }}>
          Safari & Wildlife
        </span>
        <div style={{ flex: 1, height: "1px", background: "rgba(78,205,196,0.2)" }} />
      </div>
      <Wildlife />
      <FoodCulture />
     
    </>
  );
}