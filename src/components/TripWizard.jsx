import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useAuth } from "../context/AuthContext";

const ACTIVITIES_LIST = [
  { id: "game_drives",     name: "Game Drives",          icon: "🚙" },
  { id: "bush_walks",      name: "Bush Walks",            icon: "🥾" },
  { id: "snorkelling",     name: "Snorkelling",           icon: "🤿" },
  { id: "bird_watching",   name: "Bird Watching",         icon: "🐦" },
  { id: "cultural_visits", name: "Cultural Visits",       icon: "🎭" },
  { id: "boat_safaris",    name: "Boat Safaris",          icon: "🚣" },
  { id: "photography",     name: "Photography Tours",     icon: "📷" },
  { id: "hiking",          name: "Hiking",                icon: "⛰️" },
  { id: "sundowners",      name: "Sundowner Experiences", icon: "🌅" },
  { id: "fishing",         name: "Sport Fishing",         icon: "🎣" },
  { id: "hot_air_balloon", name: "Hot Air Balloon",       icon: "🎈" },
  { id: "community",       name: "Community Projects",    icon: "🤝" },
];

const ACCOMMODATION = [
  { id: "budget",       name: "Budget",       desc: "Comfortable guesthouses and campsites",           icon: "⛺", range: "~$50–$100/night"   },
  { id: "midrange",     name: "Mid-Range",    desc: "Quality lodges and tented camps",                 icon: "🏡", range: "~$100–$300/night"  },
  { id: "luxury",       name: "Luxury",       desc: "Premium lodges and exclusive camps",              icon: "🏨", range: "~$300–$800/night"  },
  { id: "ultra_luxury", name: "Ultra Luxury", desc: "Private conservancies & world-class experiences", icon: "✨", range: "$800+/night"        },
];

const STEPS = ["Destinations", "Dates & Travellers", "Activities", "Accommodation", "Budget", "Your Details", "Review"];

export default function TripWizard({ onClose, initialDestinations = [], initialActivities = [] }) {
  const { user, profile } = useAuth();

  const buildInit = () => ({
    destinations:       initialDestinations,
    start_date:         "",
    end_date:           "",
    adults:             2,
    children:           0,
    activities:         initialActivities,
    accommodation_type: "",
    budget_min:         "",
    budget_max:         "",
    currency:           "USD",
    name:               profile?.full_name || user?.user_metadata?.full_name || "",
    email:              user?.email || "",
    phone:              profile?.phone || "",
    special_requests:   "",
  });

  const [step,             setStep]             = useState(0);
  const [form,             setForm]             = useState(buildInit);
  const [submitted,        setSubmitted]        = useState(false);
  const [submitting,       setSubmitting]       = useState(false);
  const [error,            setError]            = useState("");
  // Auth gate now starts as false — it only shows at the end if the user isn't signed in
  const [showAuthGate,     setShowAuthGate]     = useState(false);
  const [destinationsList, setDestinationsList] = useState([]);
  const [destLoading,      setDestLoading]      = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const fetchDestinations = async () => {
      const { data, error } = await supabase
        .from("destinations")
        .select("id, name, tag, region, image_url")
        .order("name", { ascending: true });
      if (!error && data) setDestinationsList(data);
      setDestLoading(false);
    };
    fetchDestinations();
  }, []);

  useEffect(() => {
    if (user) {
      // If the user just signed in while the auth gate was showing, close it
      setShowAuthGate(false);
      setForm((f) => ({
        ...f,
        name:  f.name  || profile?.full_name || user?.user_metadata?.full_name || "",
        email: f.email || user?.email || "",
        phone: f.phone || profile?.phone || "",
      }));
    }
  }, [user, profile]);

  const toggle = (key, val) =>
    setForm((f) => ({
      ...f,
      [key]: f[key].includes(val) ? f[key].filter((x) => x !== val) : [...f[key], val],
    }));

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const canNext = () => {
    switch (step) {
      case 0: return form.destinations.length > 0;
      case 1: return form.start_date && form.end_date && form.adults >= 1;
      case 2: return form.activities.length > 0;
      case 3: return form.accommodation_type !== "";
      case 4: return form.budget_min !== "" && form.budget_max !== "";
      case 5: return form.name && form.email;
      default: return true;
    }
  };

  const handleNext = () => {
    if (!canNext()) return;
    setStep((s) => s + 1);
  };

  const handleSubmit = async () => {
    // If the user hasn't signed in yet, show the auth gate before submitting
    if (!user) {
      setShowAuthGate(true);
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      const payload = {
        destinations:       form.destinations,
        start_date:         form.start_date,
        end_date:           form.end_date,
        adults:             form.adults,
        children:           form.children,
        activities:         form.activities,
        accommodation_type: form.accommodation_type,
        budget_min:         Number(form.budget_min),
        budget_max:         Number(form.budget_max),
        currency:           form.currency,
        name:               form.name,
        email:              form.email,
        phone:              form.phone,
        special_requests:   form.special_requests,
        status:             "pending",
        user_id:            user.id,
      };

      const { data, error: sbError } = await supabase
        .from("custom_trips")
        .insert([payload])
        .select()
        .single();

      if (sbError) throw sbError;

      supabase.functions.invoke("send-trip-confirmation", {
        body: { ...payload, trip_id: data.id },
      }).catch((e) => console.warn("Email trigger failed:", e));

      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or contact us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const nights =
    form.start_date && form.end_date
      ? Math.max(0, Math.round((new Date(form.end_date) - new Date(form.start_date)) / 86400000))
      : null;

  // ── MAIN WIZARD ────────────────────────────────────────────────────────────
  return (
    <div style={S.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={S.modal}>
        <style>{wizardCss}</style>

        {/* Header */}
        <div style={S.header}>
          <div>
            <p style={S.headerEyebrow}>Trip Builder</p>
            <h2 style={S.headerTitle}>{submitted ? "Trip Submitted!" : STEPS[step]}</h2>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {!submitted && user && (
              <span style={S.authBadge}>
                ✓ {profile?.full_name?.split(" ")[0] || user?.email?.split("@")[0] || "Signed in"}
              </span>
            )}
            <button style={S.closeBtn} onClick={onClose} className="close-btn">✕</button>
          </div>
        </div>

        {/* Progress */}
        {!submitted && (
          <div style={S.progressWrap}>
            <div style={S.progressTrack}>
              <div style={{ ...S.progressFill, width: `${(step / (STEPS.length - 1)) * 100}%` }} />
            </div>
            <span style={S.progressLabel}>Step {step + 1} of {STEPS.length}</span>
          </div>
        )}

        {/* Body */}
        <div style={S.body}>

          {/* SUCCESS */}
          {submitted && (
            <div style={S.successWrap}>
              <div style={S.successIcon}>🎉</div>
              <h3 style={S.successTitle}>We've Got Your Dream Trip!</h3>
              <p style={S.successText}>
                Thank you, <strong>{form.name}</strong>. A confirmation email has been sent to{" "}
                <strong>{form.email}</strong>. Our team will reach out within 24 hours.
              </p>
              <div style={S.successSummary}>
                <SummaryLine label="Destinations" value={form.destinations.join(", ")} />
                <SummaryLine label="Dates"        value={`${form.start_date} → ${form.end_date}${nights ? ` · ${nights} nights` : ""}`} />
                <SummaryLine label="Travellers"   value={`${form.adults} adults${form.children > 0 ? `, ${form.children} children` : ""}`} />
                <SummaryLine label="Accommodation" value={form.accommodation_type} />
                <SummaryLine label="Budget"       value={`${form.currency} ${form.budget_min}–${form.budget_max}`} />
              </div>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <Link to="/profile" style={{ ...S.nextBtn, textDecoration: "none", display: "inline-block" }} className="wizard-btn-primary" onClick={onClose}>
                  View My Trips →
                </Link>
                <button style={{ ...S.submitBtn, backgroundColor: "transparent", color: "#1a2f2a", border: "1px solid #1a2f2a" }} onClick={onClose}>
                  Close
                </button>
              </div>
            </div>
          )}

          {/* STEP 0 — Destinations (from Supabase) */}
          {!submitted && step === 0 && (
            <div>
              <p style={S.stepHint}>Select one or more destinations for your trip.</p>
              {destLoading ? (
                <div style={S.destGrid}>
                  {[1,2,3,4,5,6,7,8,9].map((i) => (
                    <div key={i} style={S.destShimmer} className="shimmer" />
                  ))}
                </div>
              ) : (
                <div style={S.destGrid}>
                  {destinationsList.map((d) => {
                    const selected = form.destinations.includes(d.name);
                    return (
                      <button
                        key={d.id}
                        style={{
                          ...S.destCard,
                          ...(selected ? S.destCardSelected : {}),
                          backgroundImage: d.image_url ? `url(${d.image_url})` : "none",
                          backgroundColor: d.image_url ? "#1a2f2a" : "#f7f4ef",
                        }}
                        className={selected ? "dest-card-selected" : "dest-card-btn"}
                        onClick={() => toggle("destinations", d.name)}
                      >
                        {/* Dark overlay */}
                        <div style={{
                          ...S.destCardOverlay,
                          opacity: selected ? 0.45 : 0.55,
                        }} />
                        {/* Selected ring */}
                        {selected && <div style={S.destCardRing} />}
                        {/* Check */}
                        {selected && <span style={S.destCardCheck}>✓</span>}
                        {/* Text */}
                        <div style={S.destCardText}>
                          <span style={S.destCardName}>{d.name}</span>
                          <span style={S.destCardTag}>{d.tag || d.region}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
              {form.destinations.length > 0 && (
                <p style={S.selectionCount}>
                  {form.destinations.length} destination{form.destinations.length > 1 ? "s" : ""} selected: {form.destinations.join(", ")}
                </p>
              )}
            </div>
          )}

          {/* STEP 1 — Dates */}
          {!submitted && step === 1 && (
            <div style={S.formGrid}>
              <div style={S.fieldGroup}>
                <label style={S.label}>Start Date</label>
                <input type="date" style={S.input} className="wizard-input" value={form.start_date}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => set("start_date", e.target.value)} />
              </div>
              <div style={S.fieldGroup}>
                <label style={S.label}>End Date</label>
                <input type="date" style={S.input} className="wizard-input" value={form.end_date}
                  min={form.start_date || new Date().toISOString().split("T")[0]}
                  onChange={(e) => set("end_date", e.target.value)} />
              </div>
              {nights > 0 && (
                <div style={{ gridColumn: "1/-1" }}>
                  <div style={S.durationBadge}>🌙 {nights} night{nights !== 1 ? "s" : ""} · {nights + 1} days</div>
                </div>
              )}
              <div style={S.fieldGroup}>
                <label style={S.label}>Adults</label>
                <Counter value={form.adults} min={1} onChange={(v) => set("adults", v)} />
              </div>
              <div style={S.fieldGroup}>
                <label style={S.label}>Children (under 12)</label>
                <Counter value={form.children} min={0} onChange={(v) => set("children", v)} />
              </div>
            </div>
          )}

          {/* STEP 2 — Activities */}
          {!submitted && step === 2 && (
            <div>
              <p style={S.stepHint}>Pick all the activities you'd love to include.</p>
              <div style={S.actGrid}>
                {ACTIVITIES_LIST.map((a) => {
                  const selected = form.activities.includes(a.name);
                  return (
                    <button key={a.id}
                      style={{ ...S.actChip, ...(selected ? S.chipSelectedStyle : {}) }}
                      className={selected ? "chip-selected" : "chip"}
                      onClick={() => toggle("activities", a.name)}
                    >
                      <span style={S.actIcon}>{a.icon}</span>
                      <span style={S.actName}>{a.name}</span>
                      {selected && <span style={S.chipCheck}>✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3 — Accommodation */}
          {!submitted && step === 3 && (
            <div>
              <p style={S.stepHint}>Choose your preferred accommodation style.</p>
              <div style={S.accomGrid}>
                {ACCOMMODATION.map((a) => {
                  const sel = form.accommodation_type === a.name;
                  return (
                    <button key={a.id}
                      style={{ ...S.accomCard, ...(sel ? S.chipSelectedStyle : {}) }}
                      className={sel ? "accom-selected" : "accom-card"}
                      onClick={() => set("accommodation_type", a.name)}
                    >
                      <span style={{ fontSize: 26, marginBottom: 4 }}>{a.icon}</span>
                      <span style={{ fontSize: 16, fontFamily: "'Georgia', serif" }}>{a.name}</span>
                      <span style={{ fontSize: 12, fontFamily: "'Helvetica Neue', sans-serif", color: "#888", lineHeight: 1.5 }}>{a.desc}</span>
                      <span style={{ fontSize: 11, fontFamily: "'Helvetica Neue', sans-serif", color: "#c8a96e", marginTop: 4, fontWeight: 600, letterSpacing: "0.04em" }}>{a.range}</span>
                      {sel && <span style={{ position: "absolute", top: 12, right: 14, fontSize: 14, color: "#c8a96e", fontWeight: 700 }}>✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4 — Budget */}
          {!submitted && step === 4 && (
            <div style={S.formGrid}>
              <p style={{ ...S.stepHint, gridColumn: "1/-1" }}>Set your overall trip budget.</p>
              <div style={S.fieldGroup}>
                <label style={S.label}>Currency</label>
                <select style={S.input} className="wizard-input" value={form.currency} onChange={(e) => set("currency", e.target.value)}>
                  <option value="USD">USD — US Dollar</option>
                  <option value="KES">KES — Kenyan Shilling</option>
                  <option value="EUR">EUR — Euro</option>
                  <option value="GBP">GBP — British Pound</option>
                </select>
              </div>
              <div />
              <div style={S.fieldGroup}>
                <label style={S.label}>Minimum Budget ({form.currency})</label>
                <input type="number" style={S.input} className="wizard-input" placeholder="e.g. 2000"
                  value={form.budget_min} onChange={(e) => set("budget_min", e.target.value)} />
              </div>
              <div style={S.fieldGroup}>
                <label style={S.label}>Maximum Budget ({form.currency})</label>
                <input type="number" style={S.input} className="wizard-input" placeholder="e.g. 5000"
                  value={form.budget_max} onChange={(e) => set("budget_max", e.target.value)} />
              </div>
              <div style={{ gridColumn: "1/-1" }}>
                <p style={S.budgetNote}>💡 Budget is per person unless otherwise discussed with our team.</p>
              </div>
            </div>
          )}

          {/* STEP 5 — Details */}
          {!submitted && step === 5 && (
            <div style={S.formGrid}>
              <div style={{ ...S.fieldGroup, gridColumn: "1/-1" }}>
                <label style={S.label}>Full Name *</label>
                <input type="text" style={S.input} className="wizard-input" placeholder="Your full name"
                  value={form.name} onChange={(e) => set("name", e.target.value)} />
              </div>
              <div style={S.fieldGroup}>
                <label style={S.label}>Email Address *</label>
                <input type="email" style={S.input} className="wizard-input" placeholder="you@example.com"
                  value={form.email} onChange={(e) => set("email", e.target.value)} />
              </div>
              <div style={S.fieldGroup}>
                <label style={S.label}>Phone Number</label>
                <input type="tel" style={S.input} className="wizard-input" placeholder="+254 700 000000"
                  value={form.phone} onChange={(e) => set("phone", e.target.value)} />
              </div>
              <div style={{ ...S.fieldGroup, gridColumn: "1/-1" }}>
                <label style={S.label}>Special Requests or Notes</label>
                <textarea style={{ ...S.input, height: 100, resize: "vertical" }} className="wizard-input"
                  placeholder="Dietary requirements, accessibility needs, anniversary surprises..."
                  value={form.special_requests} onChange={(e) => set("special_requests", e.target.value)} />
              </div>
            </div>
          )}

          {/* STEP 6 — Review */}
          {!submitted && step === 6 && (
            <div>
              <p style={S.stepHint}>Review your trip before we send it to our team.</p>
              <div style={S.reviewGrid}>
                <ReviewRow label="Destinations"   value={form.destinations.join(", ")} />
                <ReviewRow label="Dates"          value={`${form.start_date} → ${form.end_date}${nights ? ` (${nights} nights)` : ""}`} />
                <ReviewRow label="Travellers"     value={`${form.adults} adult${form.adults !== 1 ? "s" : ""}${form.children > 0 ? `, ${form.children} children` : ""}`} />
                <ReviewRow label="Activities"     value={form.activities.join(", ")} />
                <ReviewRow label="Accommodation"  value={form.accommodation_type} />
                <ReviewRow label="Budget"         value={`${form.currency} ${form.budget_min} – ${form.budget_max}`} />
                <ReviewRow label="Name"           value={form.name} />
                <ReviewRow label="Email"          value={form.email} />
                {form.phone            && <ReviewRow label="Phone" value={form.phone} />}
                {form.special_requests && <ReviewRow label="Notes" value={form.special_requests} />}
              </div>
              {error && <p style={S.errorMsg}>{error}</p>}
            </div>
          )}
        </div>

        {/* Footer */}
        {!submitted && (
          <div style={S.footer}>
            <button style={S.backBtn} className="wizard-btn-back"
              onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
              ← Back
            </button>
            {step < STEPS.length - 1 ? (
              <button
                style={{ ...S.nextBtn, opacity: canNext() ? 1 : 0.4 }}
                className="wizard-btn-primary"
                onClick={handleNext}
                disabled={!canNext()}
              >
                Continue →
              </button>
            ) : (
              <button
                style={{ ...S.submitBtn, opacity: submitting ? 0.7 : 1 }}
                className="wizard-btn-primary"
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? "Submitting…" : "Submit My Trip ✓"}
              </button>
            )}
          </div>
        )}
      </div>

      {/* ── AUTH GATE OVERLAY — shown at the end if the user isn't signed in ── */}
      {showAuthGate && (
        <div
          style={{
            position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.55)",
            zIndex: 1100, display: "flex", alignItems: "center", justifyContent: "center",
            padding: "16px", backdropFilter: "blur(4px)",
          }}
          onClick={(e) => e.target === e.currentTarget && setShowAuthGate(false)}
        >
          <div style={{ ...S.modal, maxWidth: 460 }}>
            <div style={S.header}>
              <div>
                <p style={S.headerEyebrow}>One Last Step</p>
                <h2 style={S.headerTitle}>Sign In to Submit Your Trip</h2>
              </div>
              <button style={S.closeBtn} onClick={() => setShowAuthGate(false)} className="close-btn">✕</button>
            </div>
            <div style={{ padding: "40px 32px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 24 }}>
              <span style={{ fontSize: 52 }}>🔐</span>
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 400, margin: "0 0 10px", fontFamily: "'Georgia', serif" }}>
                  Almost there — sign in to continue
                </h3>
                <p style={{ fontSize: 14, color: "#888", fontFamily: "'Helvetica Neue', sans-serif", lineHeight: 1.75, margin: 0, maxWidth: 320 }}>
                  A free account lets you track your trip status, save destinations,
                  and manage everything from your profile. Your trip details are saved.
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", maxWidth: 300 }}>
                <Link
                  to="/login"
                  state={{ returnTo: "wizard" }}
                  style={{ ...S.nextBtn, display: "block", textAlign: "center", textDecoration: "none", padding: "14px 24px" }}
                  className="wizard-btn-primary"
                  onClick={onClose}
                >
                  Sign In →
                </Link>
                <Link
                  to="/signup"
                  state={{ returnTo: "wizard" }}
                  style={{ display: "block", textAlign: "center", textDecoration: "none", padding: "14px 24px", border: "1px solid #1a2f2a", color: "#1a2f2a", fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 600, fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", transition: "background 0.2s" }}
                  className="wizard-btn-outline"
                  onClick={onClose}
                >
                  Create Free Account →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────────
function Counter({ value, min, onChange }) {
  return (
    <div style={{ display: "flex", alignItems: "center", border: "1px solid #ddd8d0", width: "fit-content" }}>
      <button style={S.counterBtn} className="counter-btn" onClick={() => onChange(Math.max(min, value - 1))}>−</button>
      <span style={S.counterVal}>{value}</span>
      <button style={S.counterBtn} className="counter-btn" onClick={() => onChange(value + 1)}>+</button>
    </div>
  );
}

function ReviewRow({ label, value }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, padding: "14px 0", borderBottom: "1px solid #ece9e2" }}>
      <span style={{ fontSize: 12, fontFamily: "'Helvetica Neue', sans-serif", letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", minWidth: 120, paddingTop: 2 }}>{label}</span>
      <span style={{ fontSize: 15, color: "#1a1a1a", textAlign: "right", flex: 1, fontFamily: "'Helvetica Neue', sans-serif", lineHeight: 1.5 }}>{value || "—"}</span>
    </div>
  );
}

function SummaryLine({ label, value }) {
  return (
    <p style={{ margin: "0 0 6px", fontSize: 13, fontFamily: "'Helvetica Neue', sans-serif", color: "#555" }}>
      <strong>{label}:</strong> {value}
    </p>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────────
const S = {
  overlay:   { position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.6)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px", backdropFilter: "blur(4px)" },
  modal:     { backgroundColor: "#fff", width: "100%", maxWidth: 720, maxHeight: "92vh", display: "flex", flexDirection: "column", overflow: "hidden", boxShadow: "0 24px 80px rgba(0,0,0,0.25)" },
  header:    { display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "28px 32px 20px", borderBottom: "1px solid #ece9e2", flexShrink: 0 },
  headerEyebrow: { fontSize: 11, fontFamily: "'Helvetica Neue', sans-serif", letterSpacing: "0.16em", textTransform: "uppercase", color: "#c8a96e", margin: "0 0 6px" },
  headerTitle:   { fontSize: 24, fontWeight: 400, margin: 0, letterSpacing: "-0.01em", fontFamily: "'Georgia', serif" },
  closeBtn:      { background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#888", padding: "4px 8px", lineHeight: 1, marginTop: -4 },
  authBadge:     { fontSize: 11, fontFamily: "'Helvetica Neue', sans-serif", letterSpacing: "0.08em", color: "#2e7d32", backgroundColor: "#e8f5e9", padding: "4px 10px" },

  progressWrap:  { padding: "14px 32px", borderBottom: "1px solid #f0ede7", display: "flex", alignItems: "center", gap: 16, flexShrink: 0 },
  progressTrack: { flex: 1, height: 3, backgroundColor: "#ece9e2", borderRadius: 2, overflow: "hidden" },
  progressFill:  { height: "100%", backgroundColor: "#c8a96e", borderRadius: 2, transition: "width 0.35s ease" },
  progressLabel: { fontSize: 11, fontFamily: "'Helvetica Neue', sans-serif", color: "#aaa", letterSpacing: "0.06em", whiteSpace: "nowrap" },

  body:   { flex: 1, overflowY: "auto", padding: "28px 32px" },
  footer: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 32px", borderTop: "1px solid #ece9e2", flexShrink: 0, backgroundColor: "#faf9f7" },

  stepHint: { fontSize: 14, color: "#888", fontFamily: "'Helvetica Neue', sans-serif", marginBottom: 24, marginTop: 0, lineHeight: 1.6 },

  // Destination cards with image bg
  destGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 10 },
  destShimmer: { height: 120, borderRadius: 0 },
  destCard: {
    position: "relative", height: 120, border: "2px solid transparent",
    backgroundSize: "cover", backgroundPosition: "center",
    cursor: "pointer", padding: 0, overflow: "hidden",
    transition: "border-color 0.2s, transform 0.2s",
    display: "flex", alignItems: "flex-end",
  },
  destCardSelected: { borderColor: "#c8a96e", transform: "scale(1.02)" },
  destCardOverlay: {
    position: "absolute", inset: 0,
    background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0) 100%)",
    transition: "opacity 0.2s",
  },
  destCardRing: { position: "absolute", inset: 0, border: "2px solid #c8a96e", pointerEvents: "none" },
  destCardCheck: { position: "absolute", top: 10, right: 12, fontSize: 14, color: "#c8a96e", fontWeight: 700, zIndex: 2, backgroundColor: "rgba(0,0,0,0.4)", width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%" },
  destCardText: { position: "relative", zIndex: 1, padding: "10px 12px", width: "100%" },
  destCardName: { display: "block", fontSize: 14, fontFamily: "'Georgia', serif", color: "#fff", fontWeight: 400, lineHeight: 1.2, marginBottom: 3 },
  destCardTag:  { display: "block", fontSize: 9,  fontFamily: "'Helvetica Neue', sans-serif", color: "rgba(255,255,255,0.7)", letterSpacing: "0.1em", textTransform: "uppercase" },

  selectionCount: { marginTop: 14, fontSize: 12, fontFamily: "'Helvetica Neue', sans-serif", color: "#c8a96e", fontWeight: 600, letterSpacing: "0.04em" },

  // Activity chips
  chipSelectedStyle: { borderColor: "#c8a96e", backgroundColor: "#fdf9f2" },
  chipCheck: { position: "absolute", top: 10, right: 12, fontSize: 13, color: "#c8a96e", fontWeight: 700 },
  actGrid:  { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 10 },
  actChip:  { display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", border: "1px solid #e0ddd6", backgroundColor: "#fff", cursor: "pointer", textAlign: "left", position: "relative", transition: "border-color 0.18s, background 0.18s" },
  actIcon:  { fontSize: 20, flexShrink: 0 },
  actName:  { fontSize: 13, fontFamily: "'Helvetica Neue', sans-serif", color: "#1a1a1a", lineHeight: 1.3 },

  // Accommodation
  accomGrid: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 },
  accomCard: { display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6, padding: "22px 20px", border: "1px solid #e0ddd6", backgroundColor: "#fff", cursor: "pointer", textAlign: "left", position: "relative", transition: "border-color 0.18s, background 0.18s" },

  // Form
  formGrid:   { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px 24px" },
  fieldGroup: { display: "flex", flexDirection: "column", gap: 8 },
  label:      { fontSize: 11, fontFamily: "'Helvetica Neue', sans-serif", letterSpacing: "0.12em", textTransform: "uppercase", color: "#666" },
  input:      { padding: "11px 14px", border: "1px solid #ddd8d0", fontSize: 14, fontFamily: "'Helvetica Neue', sans-serif", color: "#1a1a1a", outline: "none", backgroundColor: "#fff", width: "100%", boxSizing: "border-box", appearance: "none" },
  counterBtn: { width: 40, height: 42, border: "none", backgroundColor: "#f7f4ef", cursor: "pointer", fontSize: 18, color: "#1a2f2a", lineHeight: 1, transition: "background 0.15s" },
  counterVal: { minWidth: 48, textAlign: "center", fontSize: 16, fontFamily: "'Georgia', serif", borderLeft: "1px solid #ddd8d0", borderRight: "1px solid #ddd8d0", padding: "0 8px", lineHeight: "42px" },
  durationBadge: { display: "inline-block", backgroundColor: "#f0f7f0", color: "#1a2f2a", padding: "10px 16px", fontSize: 14, fontFamily: "'Helvetica Neue', sans-serif", border: "1px solid #c8e6c9" },
  budgetNote:    { fontSize: 13, color: "#888", fontFamily: "'Helvetica Neue', sans-serif", backgroundColor: "#fdf9f2", padding: "14px 16px", borderLeft: "3px solid #c8a96e", margin: 0, lineHeight: 1.6 },

  // Review
  reviewGrid: { border: "1px solid #ece9e2", padding: "0 20px" },
  errorMsg:   { marginTop: 16, padding: "12px 16px", backgroundColor: "#fff5f5", border: "1px solid #ffcdd2", color: "#c62828", fontSize: 13, fontFamily: "'Helvetica Neue', sans-serif" },

  // Buttons
  backBtn:   { background: "none", border: "none", cursor: "pointer", fontSize: 13, fontFamily: "'Helvetica Neue', sans-serif", color: "#888", letterSpacing: "0.04em", padding: "10px 0", transition: "color 0.15s" },
  nextBtn:   { padding: "12px 28px", backgroundColor: "#1a2f2a", color: "#fff", border: "none", cursor: "pointer", fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 600, fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", transition: "background 0.2s" },
  submitBtn: { padding: "12px 28px", backgroundColor: "#c8a96e", color: "#fff", border: "none", cursor: "pointer", fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 600, fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", transition: "background 0.2s" },

  // Success
  successWrap:    { textAlign: "center", padding: "20px 0" },
  successIcon:    { fontSize: 52, marginBottom: 16 },
  successTitle:   { fontSize: 26, fontWeight: 400, fontFamily: "'Georgia', serif", margin: "0 0 14px" },
  successText:    { fontSize: 15, color: "#555", fontFamily: "'Helvetica Neue', sans-serif", lineHeight: 1.7, maxWidth: 480, margin: "0 auto 24px" },
  successSummary: { backgroundColor: "#f7f4ef", padding: "20px 24px", textAlign: "left", marginBottom: 28, maxWidth: 420, margin: "0 auto 28px" },
};

const wizardCss = `
  .close-btn:hover          { color: #1a1a1a !important; }
  .wizard-btn-primary:hover { opacity: 0.88; }
  .wizard-btn-back:hover    { color: #1a1a1a !important; }
  .wizard-btn-outline:hover { background: #f7f4ef !important; }
  .dest-card-btn:hover      { border-color: #c8a96e !important; transform: scale(1.02); }
  .dest-card-selected       { border-color: #c8a96e !important; }
  .chip:hover               { border-color: #c8a96e !important; background: #fdf9f2 !important; }
  .chip-selected            { border-color: #c8a96e !important; background: #fdf9f2 !important; }
  .accom-card:hover         { border-color: #c8a96e !important; background: #fdf9f2 !important; }
  .accom-selected           { border-color: #c8a96e !important; background: #fdf9f2 !important; }
  .counter-btn:hover        { background: #ece9e2 !important; }
  .wizard-input:focus       { border-color: #c8a96e !important; outline: none; }
  @keyframes shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position:  400px 0; }
  }
  .shimmer {
    background: linear-gradient(90deg, #f0ece6 25%, #f7f4ef 50%, #f0ece6 75%);
    background-size: 800px 100%;
    animation: shimmer 1.5s infinite;
  }
`;