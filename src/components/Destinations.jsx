import { useState } from "react";
import useScrollReveal from "../hooks/useScrollReveal";
import { DESTINATIONS } from "../data/content";

const TAGS = ["All", "Safari", "Beach", "Culture", "Adventure", "Wildlife"];

export default function Destinations() {
  const [ref, visible] = useScrollReveal();
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("All");

  const filtered = DESTINATIONS.filter((d) => {
    const matchesTag = activeTag === "All" || d.tag === activeTag;
    const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.region.toLowerCase().includes(search.toLowerCase()) ||
      d.desc.toLowerCase().includes(search.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <section id="destinations" ref={ref} style={{
      padding: "6rem 6%", background: "#F4F9FA",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(32px)",
      transition: "opacity 0.7s ease, transform 0.7s ease",
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{ fontFamily: "'Lato', sans-serif", color: "#1D4F5A", letterSpacing: "4px", fontSize: "0.72rem", textTransform: "uppercase", marginBottom: "0.8rem" }}>
            Where to go
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 900 }}>
            Iconic Destinations
          </h2>
          <div style={{ width: "50px", height: "3px", background: "#1D4F5A", margin: "1.2rem auto 0", borderRadius: "2px" }} />
        </div>

        {/* Search bar */}
        <div style={{ maxWidth: "480px", margin: "0 auto 2rem", position: "relative" }}>
          <span style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", fontSize: "1rem" }}>🔍</span>
          <input
            type="text"
            placeholder="Search destinations, regions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "0.85rem 1rem 0.85rem 2.8rem",
              fontFamily: "'Lato', sans-serif",
              fontSize: "0.92rem",
              border: "2px solid #e0eeef",
              borderRadius: "8px",
              outline: "none",
              color: "#0D2B31",
              background: "#fff",
              transition: "border-color 0.3s ease",
            }}
            onFocus={e => e.target.style.borderColor = "#1D4F5A"}
            onBlur={e => e.target.style.borderColor = "#e0eeef"}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              style={{
                position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)",
                background: "none", border: "none", cursor: "pointer",
                color: "#1D4F5A", fontSize: "1.1rem", lineHeight: 1,
              }}
            >×</button>
          )}
        </div>

        {/* Filter tags */}
        <div style={{ display: "flex", gap: "0.6rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "3rem" }}>
          {TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: "0.78rem", fontWeight: 700,
                letterSpacing: "1.2px", textTransform: "uppercase",
                padding: "0.5rem 1.2rem",
                borderRadius: "100px",
                border: "2px solid",
                cursor: "pointer",
                transition: "all 0.25s ease",
                borderColor: activeTag === tag ? "#1D4F5A" : "#d0e8eb",
                background: activeTag === tag ? "#1D4F5A" : "#fff",
                color: activeTag === tag ? "#F4F9FA" : "#1D4F5A",
              }}
            >{tag}</button>
          ))}
        </div>

        {/* Results count */}
        <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.82rem", color: "#3D6B74", marginBottom: "1.5rem", textAlign: "center" }}>
          {filtered.length === 0
            ? "No destinations found"
            : `Showing ${filtered.length} destination${filtered.length !== 1 ? "s" : ""}`}
        </div>

        {/* Cards grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem 0" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🗺️</div>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", color: "#1D4F5A", marginBottom: "0.5rem" }}>No results found</p>
            <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.88rem", color: "#3D6B74" }}>Try a different search or filter</p>
            <button
              onClick={() => { setSearch(""); setActiveTag("All"); }}
              style={{
                marginTop: "1.5rem", fontFamily: "'Lato', sans-serif",
                fontSize: "0.82rem", fontWeight: 700, letterSpacing: "1.2px",
                textTransform: "uppercase", padding: "0.7rem 1.5rem",
                background: "#1D4F5A", color: "#F4F9FA",
                border: "none", borderRadius: "6px", cursor: "pointer",
              }}
            >Clear filters</button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))", gap: "1.5rem" }}>
            {filtered.map((d) => (
              <div key={d.name} style={{
                background: "#fff", borderRadius: "8px", overflow: "hidden",
                boxShadow: "0 2px 16px rgba(29,79,90,0.08)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
                onMouseOver={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(29,79,90,0.18)"; }}
                onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 16px rgba(29,79,90,0.08)"; }}
              >
                <div style={{ height: "200px", position: "relative", overflow: "hidden" }}>
                  <img
                    src={d.img} alt={d.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
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
        )}
      </div>
    </section>
  );
}