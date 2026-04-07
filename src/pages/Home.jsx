import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import TripWizard from "../components/TripWizard";
import { supabase } from "../supabaseClient";
import coastal from "../assets/dianibeach2.jpg";
import migration from "../assets/migration.jpg";
import vasha from "../assets/amboseli.jpg";
import ctabanner from "../assets/transport.jpg";
import sunset from "../assets/sunset.jpg";
import hike from "../assets/murima.jpg";

const HERO_SLIDES = [
  {
    img: vasha,
    eyebrow: "YOUR TRIP. YOUR RULES",
    title: "Build Your\nPerfect Kenya Adventure",
    sub: "No fixed packages. No compromise. Choose your destinations, activities, and pace — we'll handle the rest.",
  },
  {
    img: coastal,
    eyebrow: "Coastal Escape",
    title: "Where the\nOcean Glows",
    sub: "Pristine white sands, coral reefs, and the warm turquoise waters of the Indian Ocean.",
  },
  {
    img: migration,
    eyebrow: "Wildlife Safari",
    title: "Chase the\nGreat Migration",
    sub: "Two million wildebeest. One endless savannah. A spectacle unlike anything on earth.",
  },
];

export default function Home() {
  const [wizardOpen,       setWizardOpen]       = useState(false);
  const [wizardDests,      setWizardDests]      = useState([]);
  const [activeSlide,      setActiveSlide]       = useState(0);
  const [animating,        setAnimating]         = useState(false);
  const [destinations,     setDestinations]      = useState([]);
  const [destLoading,      setDestLoading]       = useState(true);
  const [destinationsList, setDestinationsList]  = useState([]);
  const [activities,       setActivities]        = useState([]);
  const [actsLoading,      setActsLoading]       = useState(true);
  const intervalRef  = useRef(null);
  const touchStartX  = useRef(null);

  // ── Fetch destinations ──
  useEffect(() => {
    const fetchDest = async () => {
      const { data } = await supabase
        .from("destinations")
        .select("*")
        .order("created_at", { ascending: false });
      if (data) {
        setDestinationsList(data);
        setDestinations(data.slice(0, 3));
      }
      setDestLoading(false);
    };
    fetchDest();
  }, []);

  // ── Fetch 4 featured activities ──
  useEffect(() => {
    const fetchActs = async () => {
      const { data } = await supabase
        .from("activities")
        .select("id, name, category, description, duration, difficulty, image_url")
        .order("created_at", { ascending: false })
        .limit(4);
      if (data) setActivities(data);
      setActsLoading(false);
    };
    fetchActs();
  }, []);

  // ── Hero slider ──
  const startInterval = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => changeSlide("next"), 6000);
  };
  useEffect(() => { startInterval(); return () => clearInterval(intervalRef.current); }, []);

  const changeSlide = (dir) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveSlide((prev) =>
        dir === "next"
          ? (prev + 1) % HERO_SLIDES.length
          : (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length
      );
      setAnimating(false);
    }, 450);
    startInterval();
  };

  const goToSlide = (i) => {
    if (i === activeSlide || animating) return;
    setAnimating(true);
    setTimeout(() => { setActiveSlide(i); setAnimating(false); }, 450);
    startInterval();
  };

  // ── Touch / swipe handlers for hero ──
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) changeSlide(delta > 0 ? "next" : "prev");
    touchStartX.current = null;
  };

  const openWizard = (dests = []) => {
    setWizardDests(dests);
    setWizardOpen(true);
  };

  const slide = HERO_SLIDES[activeSlide];

  const DIFF_COLOR = {
    Easy:     "#2e7d32",
    Moderate: "#7a5c1e",
    Hard:     "#c62828",
  };

  return (
    <div style={styles.page}>
      <style>{css}</style>

      {/* ── HERO ── */}
      <section
        style={styles.hero}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {HERO_SLIDES.map((s, i) => (
          <img
            key={i}
            src={s.img}
            alt=""
            style={{
              ...styles.heroBg,
              opacity: i === activeSlide ? 1 : 0,
              transition: "opacity 1s ease",
            }}
          />
        ))}
        <div style={styles.heroOverlay} />

        <div
          style={{
            ...styles.heroContent,
            opacity: animating ? 0 : 1,
            transform: animating ? "translateY(14px)" : "translateY(0)",
            transition: "opacity 0.45s ease, transform 0.45s ease",
          }}
        >
          <span style={styles.heroEyebrow}>{slide.eyebrow}</span>
          <h1 style={styles.heroTitle}>
            {slide.title.split("\n").map((line, i) => (
              <span key={i}>{line}<br /></span>
            ))}
          </h1>
          <p style={styles.heroSub}>{slide.sub}</p>
          <div style={styles.heroActions}>
            <button
              onClick={() => openWizard()}
              style={styles.ctaPrimary}
              className="btn-primary"
            >
              Start Building Your Trip
            </button>
            <Link
              to="/destinations"
              style={styles.ctaSecondary}
              className="btn-secondary"
            >
              Explore Kenya
            </Link>
          </div>
          <div style={styles.heroTrust}>
            <span style={styles.trustItem}>✓ Free to plan</span>
            <span style={styles.trustItem}>✓ No commitment</span>
            <span style={styles.trustItem}>✓ Expert review within 24hrs</span>
          </div>
        </div>

        {/* Arrow buttons — hidden on mobile via CSS */}
        <button
          onClick={() => changeSlide("prev")}
          style={{ ...styles.arrowBtn, left: 24 }}
          className="arrow-btn"
          aria-label="Previous slide"
        >
          ‹
        </button>
        <button
          onClick={() => changeSlide("next")}
          style={{ ...styles.arrowBtn, right: 24 }}
          className="arrow-btn"
          aria-label="Next slide"
        >
          ›
        </button>

        <div style={styles.dots}>
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              style={{ ...styles.dot, ...(i === activeSlide ? styles.dotActive : {}) }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        <div style={styles.slideCounter} className="slide-counter">
          <span style={styles.slideCounterCurrent}>0{activeSlide + 1}</span>
          <span style={styles.slideCounterSep}> / </span>
          <span style={styles.slideCounterTotal}>0{HERO_SLIDES.length}</span>
        </div>
      </section>

      {/* ── EDITORIAL ── */}
      <section style={styles.editorial} className="editorial">
        <div style={styles.editorialLeft}>
          <span style={styles.sectionTag}>The Tamu Way</span>
          <h2 style={styles.editorialTitle}>
            Travel that<br />
            <em style={styles.editorialItalic}>fits you</em>
          </h2>
          <p style={styles.editorialBody}>
            We don't sell packages. We listen. Every trip is drawn from scratch — shaped
            around the places you've dreamed of, the pace you prefer, and the experiences
            only Kenya can offer. Our local fixers, guides, and partners have spent years
            on the ground so your journey feels effortless.
          </p>
          <div style={styles.editorialStats}>
            {[
              { num: "500+", label: "Bespoke trips crafted" },
              { num: "98%",  label: "Guest satisfaction"    },
              { num: "12+",  label: "Years in Kenya"        },
              { num: "24hr", label: "Itinerary turnaround"  },
            ].map((s) => (
              <div key={s.label} style={styles.editorialStat}>
                <span style={styles.editorialStatNum}>{s.num}</span>
                <span style={styles.editorialStatLabel}>{s.label}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => openWizard()}
            style={styles.ctaPrimaryDark}
            className="btn-primary-dark btn-full-mobile"
          >
            Build My Trip
          </button>
        </div>
        <div style={styles.editorialRight} className="editorial-right">
          <div style={styles.editorialImgStack}>
            <img src={hike}   alt="Hiking" style={styles.editorialImgBack}  />
            <img src={sunset} alt="Sunset" style={styles.editorialImgFront} />
            <div style={styles.editorialImgAccent} />
          </div>
        </div>
      </section>

      {/* ── POPULAR DESTINATIONS ── */}
      <section style={styles.destSection}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionTag}>Where To Go</span>
            <h2 style={styles.sectionTitle}>Popular Destinations</h2>
            <p style={styles.sectionDesc}>
              Hand-pick your stops — mix and match to build a multi-destination trip.
            </p>
          </div>

          {destLoading ? (
            <div style={styles.destGrid}>
              {[1, 2, 3].map((i) => (
                <div key={i} style={styles.shimmerCard} className="shimmer" />
              ))}
            </div>
          ) : destinations.length === 0 ? (
            <p style={{ textAlign: "center", color: "#999", fontFamily: "'Helvetica Neue', sans-serif" }}>
              No destinations found.
            </p>
          ) : (
            <div style={styles.destGrid}>
              {destinations.map((d) => (
                <div key={d.id} style={styles.destCard} className="dest-card">
                  <div style={styles.destImgWrap}>
                    <img src={d.image_url} alt={d.name} style={styles.destImg} className="dest-img" />
                    <div style={styles.destImgOverlay} />
                    {d.region    && <span style={styles.destRegionBadge}>{d.region}</span>}
                    {d.duration_days && <span style={styles.destDaysBadge}>{d.duration_days}</span>}
                  </div>
                  <div style={styles.destInfo}>
                    {d.tag && <span style={styles.destTag}>{d.tag}</span>}
                    <h3 style={styles.destName}>{d.name}</h3>
                    <p style={styles.destDesc}>
                      {d.description
                        ? d.description.slice(0, 100) + (d.description.length > 100 ? "…" : "")
                        : "Discover this remarkable destination."}
                    </p>
                    <div style={styles.destActions}>
                      <Link to="/destinations" style={styles.destLearnBtn} className="dest-learn-btn">
                        Learn more
                      </Link>
                      <button
                        style={styles.destCta}
                        className="dest-cta-btn"
                        onClick={() => openWizard([d.name])}
                      >
                        Add to My Trip +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={styles.destFooter}>
            <Link to="/destinations" style={styles.seeAllBtn} className="see-all-btn">
              See All Destinations →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURED ACTIVITIES ── */}
      <section style={styles.actsSection}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={styles.sectionHeader}>
            <span style={{ ...styles.sectionTag, color: "#c8a96e" }}>Things To Do</span>
            <h2 style={{ ...styles.sectionTitle, color: "#fff" }}>
              Experiences Worth<br />Travelling For
            </h2>
            <p style={{ ...styles.sectionDesc, color: "rgba(255,255,255,0.5)" }}>
              From dawn game drives to coral reef dives — Kenya delivers experiences that stay with you.
            </p>
          </div>

          {actsLoading ? (
            <div style={styles.actsGrid}>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} style={styles.actShimmer} className="shimmer-dark" />
              ))}
            </div>
          ) : (
            <div style={styles.actsGrid}>
              {activities.map((a, i) => (
                <div
                  key={a.id}
                  style={{ ...styles.actCard, animationDelay: `${i * 80}ms` }}
                  className="act-card"
                >
                  <div style={styles.actImgWrap}>
                    {a.image_url
                      ? <img src={a.image_url} alt={a.name} style={styles.actImg} />
                      : <div style={styles.actImgFallback} />
                    }
                    <div style={styles.actImgOverlay} />
                    <span style={styles.actCategoryBadge}>{a.category}</span>
                    {a.difficulty && (
                      <span style={{ ...styles.actDiffBadge, color: DIFF_COLOR[a.difficulty] || "#888" }}>
                        {a.difficulty}
                      </span>
                    )}
                  </div>
                  <div style={styles.actBody}>
                    <h3 style={styles.actName}>{a.name}</h3>
                    {a.description && (
                      <p style={styles.actDesc}>
                        {a.description.slice(0, 80)}{a.description.length > 80 ? "…" : ""}
                      </p>
                    )}
                    <div style={styles.actMeta}>
                      {a.duration && <span style={styles.actMetaPill}>⏱ {a.duration}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{ textAlign: "center", marginTop: 48 }}>
            <Link
              to="/activities"
              style={{ ...styles.seeAllBtn, borderColor: "rgba(255,255,255,0.3)", color: "#fff" }}
              className="see-all-acts-btn"
            >
              See All Activities →
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={styles.ctaBanner}>
        <img src={ctabanner} alt="cta" style={styles.ctaBannerBg} />
        <div style={styles.ctaBannerOverlay} />
        <div style={styles.ctaBannerContent}>
          <h2 style={styles.ctaBannerTitle}>Your Kenya Story Starts Here</h2>
          <p style={styles.ctaBannerSub}>
            Tell us your dream — we'll build the perfect itinerary, just for you.
          </p>
          <button
            onClick={() => openWizard()}
            style={styles.ctaPrimary}
            className="btn-primary btn-full-mobile"
          >
            Start Building Your Trip
          </button>
        </div>
      </section>

      {wizardOpen && (
        <TripWizard
          onClose={() => { setWizardOpen(false); setWizardDests([]); }}
          initialDestinations={wizardDests}
          destinationsList={destinationsList}
        />
      )}
    </div>
  );
}

const styles = {
  page: { fontFamily: "'Georgia', 'Times New Roman', serif", color: "#1a1a1a", backgroundColor: "#fff" },

  // HERO
  // Use 100svh so mobile browser chrome doesn't cause overflow; fall back to 100vh
  hero: { position: "relative", height: "100svh", minHeight: 600, display: "flex", alignItems: "center", overflow: "hidden" },
  heroBg: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" },
  heroOverlay: { position: "absolute", inset: 0, background: "linear-gradient(110deg, rgba(8,20,14,0.82) 0%, rgba(8,20,14,0.5) 65%, rgba(8,20,14,0.2) 100%)" },
  heroContent: { position: "relative", zIndex: 2, maxWidth: 680, width: "100%", padding: "0 20px 72px", margin: "0 auto", textAlign: "center" },
  heroEyebrow: { display: "inline-block", letterSpacing: "0.22em", textTransform: "uppercase", fontSize: 10, color: "#c8a96e", fontFamily: "'Helvetica Neue', sans-serif", marginBottom: 20, borderBottom: "1px solid rgba(200,169,110,0.5)", paddingBottom: 6 },
  heroTitle: { fontSize: "clamp(36px, 7vw, 84px)", fontWeight: 400, color: "#fff", lineHeight: 1.05, letterSpacing: "-0.03em", margin: "0 0 20px" },
  heroSub: { fontSize: 15, color: "rgba(255,255,255,0.72)", lineHeight: 1.75, fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 300, marginBottom: 36, maxWidth: 440, margin: "0 auto 36px" },
  heroActions: { display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24, justifyContent: "center" },
  heroTrust: { display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" },
  trustItem: { fontSize: 11, color: "rgba(255,255,255,0.55)", fontFamily: "'Helvetica Neue', sans-serif", letterSpacing: "0.05em" },
  arrowBtn: { position: "absolute", top: "50%", transform: "translateY(-50%)", zIndex: 4, background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff", width: 52, height: 52, fontSize: 30, cursor: "pointer", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s", lineHeight: 1 },
  dots: { position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 10, zIndex: 4 },
  dot: { width: 28, height: 3, backgroundColor: "rgba(255,255,255,0.3)", border: "none", cursor: "pointer", padding: 0, transition: "background 0.3s, width 0.3s" },
  dotActive: { width: 52, backgroundColor: "#c8a96e" },
  slideCounter: { position: "absolute", bottom: 22, right: 72, zIndex: 4, display: "flex", alignItems: "baseline", gap: 2, fontFamily: "'Helvetica Neue', sans-serif" },
  slideCounterCurrent: { fontSize: 22, color: "#fff", fontWeight: 300 },
  slideCounterSep:     { fontSize: 12, color: "rgba(255,255,255,0.35)" },
  slideCounterTotal:   { fontSize: 12, color: "rgba(255,255,255,0.35)" },

  // EDITORIAL
  editorial: { display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 560, overflow: "hidden" },
  editorialLeft: { padding: "80px 64px", backgroundColor: "#fff", display: "flex", flexDirection: "column", justifyContent: "center" },
  editorialTitle: { fontSize: "clamp(30px, 4vw, 52px)", fontWeight: 400, letterSpacing: "-0.03em", lineHeight: 1.1, margin: "12px 0 24px", color: "#111" },
  editorialItalic: { fontStyle: "italic", color: "#c8a96e" },
  editorialBody: { fontSize: 15, color: "#555", fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 300, lineHeight: 1.8, marginBottom: 40, maxWidth: 440 },
  editorialStats: { display: "grid", gridTemplateColumns: "1fr 1fr", borderTop: "1px solid #ece9e2", marginBottom: 40 },
  editorialStat: { padding: "20px 0", borderBottom: "1px solid #ece9e2", paddingRight: 24 },
  editorialStatNum: { display: "block", fontSize: 30, fontWeight: 400, color: "#204E59", letterSpacing: "-0.02em", lineHeight: 1.1 },
  editorialStatLabel: { display: "block", fontSize: 10, fontFamily: "'Helvetica Neue', sans-serif", letterSpacing: "0.1em", textTransform: "uppercase", color: "#999", marginTop: 4 },
  editorialRight: { backgroundColor: "#f7f4ef", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" },
  editorialImgStack: { position: "relative", width: "80%", height: "75%" },
  editorialImgBack:  { position: "absolute", top: 0, left: 0, width: "78%", height: "78%", objectFit: "cover" },
  editorialImgFront: { position: "absolute", bottom: 0, right: 0, width: "68%", height: "62%", objectFit: "cover", border: "5px solid #fff", boxShadow: "0 12px 40px rgba(0,0,0,0.14)" },
  editorialImgAccent:{ position: "absolute", top: "28%", left: "58%", width: 72, height: 72, border: "2px solid #c8a96e", zIndex: 0 },

  // DESTINATIONS
  destSection: { backgroundColor: "#f7f4ef", padding: "80px 24px" },
  sectionHeader: { textAlign: "center", marginBottom: 52 },
  sectionTag: { display: "inline-block", fontSize: 10, fontFamily: "'Helvetica Neue', sans-serif", letterSpacing: "0.18em", textTransform: "uppercase", color: "#c8a96e", marginBottom: 12 },
  sectionTitle: { fontSize: "clamp(26px, 4vw, 44px)", fontWeight: 400, letterSpacing: "-0.02em", margin: "0 0 14px", lineHeight: 1.15 },
  sectionDesc: { fontSize: 15, color: "#666", fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 300, lineHeight: 1.7, maxWidth: 500, margin: "0 auto" },
  destGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 },
  shimmerCard: { height: 420 },
  destCard: { backgroundColor: "#fff", overflow: "hidden", boxShadow: "0 2px 16px rgba(0,0,0,0.07)", transition: "transform 0.25s, box-shadow 0.25s" },
  destImgWrap: { position: "relative", overflow: "hidden" },
  destImg: { width: "100%", height: 220, objectFit: "cover", display: "block", transition: "transform 0.5s ease" },
  destImgOverlay: { position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.25) 0%, transparent 60%)", pointerEvents: "none" },
  destRegionBadge: { position: "absolute", top: 14, left: 14, backgroundColor: "#c8a96e", color: "#fff", fontSize: 9, fontFamily: "'Helvetica Neue', sans-serif", letterSpacing: "0.14em", textTransform: "uppercase", padding: "4px 10px" },
  destDaysBadge: { position: "absolute", top: 14, right: 14, backgroundColor: "rgba(0,0,0,0.65)", color: "#fff", fontSize: 9, fontFamily: "'Helvetica Neue', sans-serif", letterSpacing: "0.08em", padding: "4px 10px", backdropFilter: "blur(4px)" },
  destInfo: { padding: "18px 20px 20px" },
  destTag: { fontSize: 9, fontFamily: "'Helvetica Neue', sans-serif", letterSpacing: "0.16em", textTransform: "uppercase", color: "#c8a96e", display: "block", marginBottom: 8 },
  destName: { fontSize: 21, fontWeight: 400, margin: "0 0 10px", letterSpacing: "-0.01em" },
  destDesc: { fontSize: 13, color: "#666", fontFamily: "'Helvetica Neue', sans-serif", lineHeight: 1.65, margin: "0 0 18px" },
  destActions: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 },
  destLearnBtn: { fontSize: 12, fontFamily: "'Helvetica Neue', sans-serif", color: "#aaa", textDecoration: "none", letterSpacing: "0.04em", transition: "color 0.15s" },
  destCta: { fontSize: 11, fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 700, color: "#204E59", background: "none", border: "1px solid #204E59", padding: "10px 16px", cursor: "pointer", letterSpacing: "0.06em", textTransform: "uppercase", transition: "background 0.2s, color 0.2s" },
  destFooter: { textAlign: "center", marginTop: 52 },
  seeAllBtn: { display: "inline-block", padding: "14px 40px", border: "1px solid #204E59", color: "#204E59", fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 600, fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", transition: "background 0.2s, color 0.2s" },

  // ACTIVITIES
  actsSection: { backgroundColor: "#0c1e14", padding: "80px 24px" },
  actsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 2 },
  actShimmer: { height: 300 },
  actCard: { overflow: "hidden", position: "relative", cursor: "pointer", opacity: 0 },
  actImgWrap: { position: "relative", overflow: "hidden" },
  actImg: { width: "100%", height: 280, objectFit: "cover", display: "block", transition: "transform 0.5s ease" },
  actImgFallback: { width: "100%", height: 280, backgroundColor: "#1a3528" },
  actImgOverlay: { position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)" },
  actCategoryBadge: { position: "absolute", top: 14, left: 14, backgroundColor: "rgba(200,169,110,0.9)", color: "#fff", fontSize: 9, fontFamily: "'Helvetica Neue', sans-serif", letterSpacing: "0.14em", textTransform: "uppercase", padding: "4px 10px" },
  actDiffBadge: { position: "absolute", top: 14, right: 14, fontSize: 9, fontFamily: "'Helvetica Neue', sans-serif", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700, backgroundColor: "rgba(0,0,0,0.5)", padding: "4px 10px" },
  actBody: { position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 18px" },
  actName: { fontSize: 18, fontWeight: 400, color: "#fff", margin: "0 0 6px", letterSpacing: "-0.01em", lineHeight: 1.2 },
  actDesc: { fontSize: 12, fontFamily: "'Helvetica Neue', sans-serif", color: "rgba(255,255,255,0.65)", lineHeight: 1.6, margin: "0 0 10px" },
  actMeta: { display: "flex", gap: 6 },
  actMetaPill: { fontSize: 10, fontFamily: "'Helvetica Neue', sans-serif", color: "rgba(255,255,255,0.5)", letterSpacing: "0.04em" },

  // CTA BANNER
  ctaBanner: { position: "relative", minHeight: 320, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" },
  ctaBannerBg: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" },
  ctaBannerOverlay: { position: "absolute", inset: 0, backgroundColor: "rgba(8,22,14,0.72)" },
  ctaBannerContent: { position: "relative", zIndex: 2, textAlign: "center", padding: "60px 24px", width: "100%" },
  ctaBannerTitle: { fontSize: "clamp(24px, 4vw, 46px)", fontWeight: 400, color: "#fff", margin: "0 0 14px", letterSpacing: "-0.02em" },
  ctaBannerSub: { fontSize: 15, color: "rgba(255,255,255,0.72)", fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 300, marginBottom: 32 },

  // BUTTONS
  ctaPrimary: { display: "inline-block", padding: "15px 32px", backgroundColor: "#c8a96e", color: "#fff", border: "none", cursor: "pointer", fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 600, fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", transition: "background 0.2s, transform 0.15s", textDecoration: "none" },
  ctaPrimaryDark: { display: "inline-block", padding: "15px 32px", backgroundColor: "#204E59", color: "#fff", border: "none", cursor: "pointer", fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 600, fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", transition: "background 0.2s, transform 0.15s" },
  ctaSecondary: { display: "inline-block", padding: "15px 32px", backgroundColor: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.45)", textDecoration: "none", fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 400, fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", transition: "border-color 0.2s, background 0.2s" },
};

const css = `
  /* ── Hover states (desktop only) ── */
  .btn-primary:hover      { background-color: #b8954f !important; transform: translateY(-1px); }
  .btn-primary-dark:hover { background-color: #163640 !important; transform: translateY(-1px); }
  .btn-secondary:hover    { border-color: #fff !important; background: rgba(255,255,255,0.08) !important; }
  .arrow-btn:hover        { background: rgba(255,255,255,0.24) !important; }
  .dest-card:hover        { transform: translateY(-4px); box-shadow: 0 8px 32px rgba(0,0,0,0.13) !important; }
  .dest-card:hover .dest-img { transform: scale(1.04); }
  .dest-learn-btn:hover   { color: #204E59 !important; }
  .dest-cta-btn:hover     { background: #204E59 !important; color: #fff !important; }
  .see-all-btn:hover      { background: #204E59 !important; color: #fff !important; }
  .see-all-acts-btn:hover { background: rgba(255,255,255,0.1) !important; }
  .act-card               { animation: fadeUp 0.45s ease forwards; }
  .act-card:hover img     { transform: scale(1.06); }

  /* ── Animations ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  @keyframes shimmer {
    0%   { background-position: -600px 0; }
    100% { background-position:  600px 0; }
  }
  .shimmer {
    background: linear-gradient(90deg, #e8e4de 25%, #ede9e3 50%, #e8e4de 75%);
    background-size: 1200px 100%;
    animation: shimmer 1.6s infinite;
  }
  .shimmer-dark {
    background: linear-gradient(90deg, #0f2318 25%, #163028 50%, #0f2318 75%);
    background-size: 1200px 100%;
    animation: shimmer 1.6s infinite;
  }

  /* ── Tablet (≤1024px) ── */
  @media (max-width: 1024px) {
    .editorial                { grid-template-columns: 1fr !important; }
    .editorial-right          { display: none !important; }
  }

  /* ── Mobile (≤640px) ── */
  @media (max-width: 640px) {
    /* Hero */
    .arrow-btn                { display: none !important; }
    .slide-counter            { right: 16px !important; bottom: 16px !important; }

    /* Hero buttons — stack vertically, full width */
    .hero-actions             { flex-direction: column !important; align-items: stretch !important; }
    .btn-primary,
    .btn-secondary            { text-align: center; }

    /* Full-width button utility used in editorial & CTA */
    .btn-full-mobile          { width: 100% !important; text-align: center; box-sizing: border-box; }

    /* Editorial padding reduced */
    .editorial-left           { padding: 48px 20px !important; }

    /* Sections — tighter vertical padding */
    .dest-section             { padding: 52px 16px !important; }
    .acts-section             { padding: 52px 16px !important; }
    .cta-banner-content       { padding: 48px 20px !important; }

    /* Section headers */
    .section-header           { margin-bottom: 32px !important; }

    /* Dest grid — force single column below 400px */
    .dest-grid                { grid-template-columns: 1fr !important; gap: 16px !important; }

    /* Activities grid — 1 column on narrow phones */
    .acts-grid                { grid-template-columns: 1fr !important; gap: 2px !important; }

    /* Destination card image — slightly shorter on mobile */
    .dest-img                 { height: 200px !important; }

    /* Activity card image */
    .act-img,
    .act-img-fallback         { height: 240px !important; }

    /* Larger tap targets for destination CTA */
    .dest-cta-btn             { padding: 12px 18px !important; }

    /* See-all buttons full width on mobile */
    .see-all-btn,
    .see-all-acts-btn         { display: block !important; text-align: center; padding: 16px 24px !important; }

    /* Trust bar — smaller gap on narrow screens */
    .hero-trust               { gap: 10px !important; }

    /* Dots — slightly bigger tap area */
    .dots button              { min-height: 20px; }

    /* Disable hover lift on touch — avoids stuck state */
    .dest-card:hover          { transform: none !important; box-shadow: 0 2px 16px rgba(0,0,0,0.07) !important; }
    .btn-primary:hover,
    .btn-primary-dark:hover   { transform: none !important; }
  }

  /* ── Very small phones (≤380px) ── */
  @media (max-width: 380px) {
    .hero-trust span          { font-size: 10px !important; }
    .editorial-stats          { grid-template-columns: 1fr 1fr !important; }
    .dest-name                { font-size: 18px !important; }
  }
`;