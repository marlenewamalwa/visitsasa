import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

/* ── SVG ICON COMPONENT ── */
function Icon({ d, size = 20, stroke = "currentColor", strokeWidth = 1.5, style = {} }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flexShrink: 0, display: "block", ...style }}
    >
      {Array.isArray(d)
        ? d.map((path, i) => <path key={i} d={path} />)
        : <path d={d} />}
    </svg>
  );
}

/* ── CONSTANTS ── */
const DESTINATIONS = [
  {
    id: "maasai_mara",
    name: "Maasai Mara",
    tag: "Wildlife Safari",
    icon: "M8.5 14c-1 0-2-.5-2.5-1.5S5.5 10 6.5 9s2.5-.5 3.5.5M15.5 14c1 0 2-.5 2.5-1.5s.5-2.5-.5-3.5-2.5-.5-3.5.5M12 16c-2 0-4-1.5-4-4s1-4 4-4 4 1.5 4 4-2 4-4 4z",
  },
  {
    id: "diani_beach",
    name: "Diani Beach",
    tag: "Coastal Escape",
    icon: "M2 12c2-3 4-3 6 0s4 3 6 0 4-3 6 0M2 17c2-3 4-3 6 0s4 3 6 0 4-3 6 0M2 7c2-3 4-3 6 0s4 3 6 0 4-3 6 0",
  },
  {
    id: "amboseli",
    name: "Amboseli",
    tag: "Elephant Country",
    icon: [
      "M7 20v-6c0-3 2-5 5-5s5 2 5 5v6",
      "M5 20v-4c0-1 .5-2 1.5-2.5",
      "M7 9c0-2 1-3.5 2.5-4",
      "M17 9c0-2-1-3.5-2.5-4",
      "M5 16h2M17 16h2",
    ],
  },
  {
    id: "naivasha",
    name: "Naivasha",
    tag: "Lake & Highlands",
    icon: "M12 22V12M12 12C12 7 7 3 3 3c0 5 3 9 9 9zM12 12c0-5 5-9 9-9-1 5-4 9-9 9",
  },
  {
    id: "samburu",
    name: "Samburu",
    tag: "Northern Frontier",
    icon: [
      "M13 22V8c0-3 1.5-5.5 4-6",
      "M13 12c-1.5-2-4-2.5-6-1",
      "M13 8c-.5-1.5-2-2.5-3.5-2",
      "M15 14l1.5-.5M15 17l2-.5",
    ],
  },
  {
    id: "tsavo",
    name: "Tsavo",
    tag: "Wilderness",
    icon: "M12 3L9 9h2L8 16h3v6h2v-6h3L13 9h2L12 3z",
  },
  {
    id: "watamu",
    name: "Watamu",
    tag: "Marine Paradise",
    icon: [
      "M2 12c2.5-4 7-6 12-4s8 6 6 10-7 5-12 3S.5 14 2 12z",
      "M20 8l2-2v8l-2-2",
      "M9.5 11.5a1 1 0 1 0 1 1",
    ],
  },
  {
    id: "mount_kenya",
    name: "Mount Kenya",
    tag: "Highlands",
    icon: "M3 20l5-9 2.5 4L14 6l4 5 3 9H3z",
  },
  {
    id: "lamu",
    name: "Lamu Island",
    tag: "Historic Coast",
    icon: [
      "M12 3v11",
      "M12 3L5 14h14L12 3z",
      "M3 18h18",
      "M6 18v1.5a1.5 1.5 0 0 0 3 0V18",
      "M15 18v1.5a1.5 1.5 0 0 0 3 0V18",
    ],
  },
];

const ACTIVITIES = [
  {
    id: "game_drives",
    name: "Game Drives",
    icon: "M5 17H3v-5l2-5h14l2 5v5h-2M5 17a2 2 0 0 0 4 0M15 17a2 2 0 0 0 4 0M3 13h18M9 7v2M15 7v2",
  },
  {
    id: "bush_walks",
    name: "Bush Walks",
    icon: [
      "M13 4a1 1 0 1 0 2 0 1 1 0 0 0-2 0",
      "M14 6l-1 4-3 2-2 8",
      "M13 10l3 2 1 6",
      "M4 18l3-3",
      "M20 9l-4 3",
    ],
  },
  {
    id: "snorkelling",
    name: "Snorkelling",
    icon: [
      "M4 14a8 8 0 0 1 16 0",
      "M4 14a4 4 0 0 0 8 0",
      "M12 6V3h4",
      "M12 3c0 2-1 3-2 3",
    ],
  },
  {
    id: "bird_watching",
    name: "Bird Watching",
    icon: [
      "M2 8c3-3 7-3 9 0",
      "M13 8c3-3 7-3 9 0",
      "M7.5 8c0 3-2 5.5-4 7",
      "M16.5 8c0 3 2 5.5 4 7",
      "M7.5 15c2 2 7 2 9 0",
    ],
  },
  {
    id: "cultural_visits",
    name: "Cultural Visits",
    icon: [
      "M12 3C9 3 7 5 7 8a5 5 0 0 0 10 0c0-3-2-5-5-5z",
      "M7 13c0 3 2 5 5 6",
      "M17 13c0 3-2 5-5 6",
      "M9 8h.01M15 8h.01",
    ],
  },
  {
    id: "boat_safaris",
    name: "Boat Safaris",
    icon: [
      "M3 17l4-10h10l4 10H3z",
      "M12 7V4",
      "M9 4h6",
      "M2 20c3-2 5-2 10 0s7 2 10 0",
    ],
  },
  {
    id: "photography",
    name: "Photography Tours",
    icon: [
      "M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z",
      "M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
    ],
  },
  {
    id: "hiking",
    name: "Hiking",
    icon: [
      "M12 4a1 1 0 1 0 2 0 1 1 0 0 0-2 0",
      "M13 6l-1 5-2 2-2 7",
      "M12 11l3 2 2 7",
      "M4 15l4-3",
      "M21 10l-4 3",
    ],
  },
  {
    id: "sundowners",
    name: "Sundowner Experiences",
    icon: [
      "M12 5v2M5.3 7.3l1.4 1.4M3 14h2M19 14h2M17.3 8.7l1.4-1.4",
      "M7 14a5 5 0 0 1 10 0",
      "M3 18h18",
      "M6 21h12",
    ],
  },
  {
    id: "fishing",
    name: "Sport Fishing",
    icon: [
      "M4 4l16 8",
      "M20 12l1 7",
      "M20 12l-3 2",
      "M21 19a2 2 0 0 1-4 0v-2h4v2z",
      "M4 4l1 9",
      "M5 13c2 2 5 2 5-1",
    ],
  },
  {
    id: "hot_air_balloon",
    name: "Hot Air Balloon",
    icon: [
      "M12 2C8 2 5 5.5 5 9c0 4.5 4 8 7 8s7-3.5 7-8c0-3.5-3-7-7-7z",
      "M9 17l1.5 4h3L15 17",
      "M10 21h4",
      "M9 9c0 2 1 4 3 4s3-2 3-4",
    ],
  },
  {
    id: "community",
    name: "Community Projects",
    icon: [
      "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2",
      "M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
      "M23 21v-2a4 4 0 0 0-3-3.87",
      "M16 3.13a4 4 0 0 1 0 7.75",
    ],
  },
];

const ACCOMMODATION = [
  {
    id: "budget",
    name: "Budget",
    desc: "Comfortable guesthouses and campsites",
    icon: "M3 20l9-16 9 16H3zM12 4l-3 8h6l-3-8z",
    range: "~$50–$100/night",
  },
  {
    id: "midrange",
    name: "Mid-Range",
    desc: "Quality lodges and tented camps",
    icon: "M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5zM9 21V12h6v9",
    range: "~$100–$300/night",
  },
  {
    id: "luxury",
    name: "Luxury",
    desc: "Premium lodges and exclusive camps",
    icon: "M3 22V4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18M9 22v-6h6v6M6 7h2M10 7h2M14 7h2M6 11h2M10 11h2M14 11h2M6 15h2M10 15h2M14 15h2",
    range: "~$300–$800/night",
  },
  {
    id: "ultra_luxury",
    name: "Ultra Luxury",
    desc: "Private conservancies & world-class experiences",
    icon: "M6 3h12l4 6-10 12L2 9l4-6zM2 9h20M12 21V9M6 3l3 6M18 3l-3 6",
    range: "$800+/night",
  },
];

const STEPS = [
  "Destinations",
  "Dates & Travellers",
  "Activities",
  "Accommodation",
  "Budget",
  "Your Details",
  "Review",
];

/* ── INITIAL STATE ── */
const INIT = {
  destinations: [],
  start_date: "",
  end_date: "",
  adults: 2,
  children: 0,
  activities: [],
  accommodation_type: "",
  budget_min: "",
  budget_max: "",
  currency: "USD",
  name: "",
  email: "",
  phone: "",
  special_requests: "",
};

function TripWizard({ onClose }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(INIT);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const toggle = (key, val) => {
    setForm((f) => {
      const arr = f[key];
      return {
        ...f,
        [key]: arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val],
      };
    });
  };

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

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");
    try {
      const { error: sbError } = await supabase.from("custom_trips").insert([
        {
          destinations: form.destinations,
          start_date: form.start_date,
          end_date: form.end_date,
          adults: form.adults,
          children: form.children,
          activities: form.activities,
          accommodation_type: form.accommodation_type,
          budget_min: Number(form.budget_min),
          budget_max: Number(form.budget_max),
          currency: form.currency,
          name: form.name,
          email: form.email,
          phone: form.phone,
          special_requests: form.special_requests,
          status: "pending",
        },
      ]);
      if (sbError) throw sbError;
      setSubmitted(true);
    } catch (e) {
      setError("Something went wrong. Please try again or contact us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const nights =
    form.start_date && form.end_date
      ? Math.max(0, Math.round((new Date(form.end_date) - new Date(form.start_date)) / 86400000))
      : null;

  /* icon stroke colours */
  const GOLD = "#c8a96e";
  const DARK = "#1a2f2a";

  return (
    <div style={S.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={S.modal}>
        <style>{wizardCss}</style>

        {/* Header */}
        <div style={S.header}>
          <div>
            <p style={S.headerEyebrow}>Trip Builder</p>
            <h2 style={S.headerTitle}>
              {submitted ? "Trip Submitted!" : STEPS[step]}
            </h2>
          </div>
          <button style={S.closeBtn} onClick={onClose} className="close-btn">✕</button>
        </div>

        {/* Progress bar */}
        {!submitted && (
          <div style={S.progressWrap}>
            <div style={S.progressTrack}>
              <div
                style={{
                  ...S.progressFill,
                  width: `${((step) / (STEPS.length - 1)) * 100}%`,
                }}
              />
            </div>
            <span style={S.progressLabel}>Step {step + 1} of {STEPS.length}</span>
          </div>
        )}

        {/* Body */}
        <div style={S.body}>

          {/* ── SUCCESS ── */}
          {submitted && (
            <div style={S.successWrap}>
              <div style={S.successIconWrap}>
                <Icon
                  d="M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01l-3-3"
                  size={48}
                  stroke={GOLD}
                  strokeWidth={1.5}
                />
              </div>
              <h3 style={S.successTitle}>We've Got Your Dream Trip!</h3>
              <p style={S.successText}>
                Thank you, <strong>{form.name}</strong>. Our team will review your selections
                and reach out to you at <strong>{form.email}</strong> within 24 hours with
                a personalised itinerary.
              </p>
              <div style={S.successSummary}>
                <p><strong>Destinations:</strong> {form.destinations.join(", ")}</p>
                <p><strong>Dates:</strong> {form.start_date} → {form.end_date} ({nights} nights)</p>
                <p><strong>Travellers:</strong> {form.adults} adults{form.children > 0 ? `, ${form.children} children` : ""}</p>
                <p><strong>Accommodation:</strong> {form.accommodation_type}</p>
                <p><strong>Budget:</strong> {form.currency} {form.budget_min}–{form.budget_max}</p>
              </div>
              <button style={S.submitBtn} onClick={onClose} className="wizard-btn-primary">
                Close
              </button>
            </div>
          )}

          {/* ── STEP 0: Destinations ── */}
          {!submitted && step === 0 && (
            <div>
              <p style={S.stepHint}>Select one or more destinations for your trip.</p>
              <div style={S.destGrid}>
                {DESTINATIONS.map((d) => {
                  const selected = form.destinations.includes(d.name);
                  return (
                    <button
                      key={d.id}
                      style={{ ...S.destChip, ...(selected ? S.destChipSelected : {}) }}
                      className={selected ? "chip-selected" : "chip"}
                      onClick={() => toggle("destinations", d.name)}
                    >
                      <Icon
                        d={d.icon}
                        size={22}
                        stroke={selected ? DARK : GOLD}
                        strokeWidth={1.5}
                        style={{ marginBottom: 2 }}
                      />
                      <span style={S.chipName}>{d.name}</span>
                      <span style={S.chipTag}>{d.tag}</span>
                      {selected && (
                        <span style={S.chipCheck}>
                          <Icon d="M20 6L9 17l-5-5" size={12} stroke={GOLD} strokeWidth={2.5} />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── STEP 1: Dates & Travellers ── */}
          {!submitted && step === 1 && (
            <div style={S.formGrid}>
              <div style={S.fieldGroup}>
                <label style={S.label}>Start Date</label>
                <input
                  type="date"
                  style={S.input}
                  value={form.start_date}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => set("start_date", e.target.value)}
                  className="wizard-input"
                />
              </div>
              <div style={S.fieldGroup}>
                <label style={S.label}>End Date</label>
                <input
                  type="date"
                  style={S.input}
                  value={form.end_date}
                  min={form.start_date || new Date().toISOString().split("T")[0]}
                  onChange={(e) => set("end_date", e.target.value)}
                  className="wizard-input"
                />
              </div>
              {nights !== null && nights > 0 && (
                <div style={{ gridColumn: "1 / -1" }}>
                  <div style={S.durationBadge}>
                    <Icon d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0zM12 7v5l3 3" size={15} stroke="#1a2f2a" strokeWidth={1.8} style={{ marginRight: 8 }} />
                    {nights} night{nights !== 1 ? "s" : ""} · {nights + 1} day{nights + 1 !== 1 ? "s" : ""}
                  </div>
                </div>
              )}
              <div style={S.fieldGroup}>
                <label style={S.label}>Adults</label>
                <div style={S.counter}>
                  <button
                    style={S.counterBtn}
                    className="counter-btn"
                    onClick={() => set("adults", Math.max(1, form.adults - 1))}
                  >−</button>
                  <span style={S.counterVal}>{form.adults}</span>
                  <button
                    style={S.counterBtn}
                    className="counter-btn"
                    onClick={() => set("adults", form.adults + 1)}
                  >+</button>
                </div>
              </div>
              <div style={S.fieldGroup}>
                <label style={S.label}>Children (under 12)</label>
                <div style={S.counter}>
                  <button
                    style={S.counterBtn}
                    className="counter-btn"
                    onClick={() => set("children", Math.max(0, form.children - 1))}
                  >−</button>
                  <span style={S.counterVal}>{form.children}</span>
                  <button
                    style={S.counterBtn}
                    className="counter-btn"
                    onClick={() => set("children", form.children + 1)}
                  >+</button>
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 2: Activities ── */}
          {!submitted && step === 2 && (
            <div>
              <p style={S.stepHint}>Pick all the activities you'd love to include.</p>
              <div style={S.actGrid}>
                {ACTIVITIES.map((a) => {
                  const selected = form.activities.includes(a.name);
                  return (
                    <button
                      key={a.id}
                      style={{ ...S.actChip, ...(selected ? S.actChipSelected : {}) }}
                      className={selected ? "chip-selected" : "chip"}
                      onClick={() => toggle("activities", a.name)}
                    >
                      <Icon
                        d={a.icon}
                        size={18}
                        stroke={selected ? DARK : GOLD}
                        strokeWidth={1.5}
                        style={{ flexShrink: 0 }}
                      />
                      <span style={S.actName}>{a.name}</span>
                      {selected && (
                        <span style={S.chipCheck}>
                          <Icon d="M20 6L9 17l-5-5" size={11} stroke={GOLD} strokeWidth={2.5} />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── STEP 3: Accommodation ── */}
          {!submitted && step === 3 && (
            <div>
              <p style={S.stepHint}>Choose your preferred accommodation style.</p>
              <div style={S.accomGrid}>
                {ACCOMMODATION.map((a) => {
                  const selected = form.accommodation_type === a.name;
                  return (
                    <button
                      key={a.id}
                      style={{ ...S.accomCard, ...(selected ? S.accomCardSelected : {}) }}
                      className={selected ? "accom-selected" : "accom-card"}
                      onClick={() => set("accommodation_type", a.name)}
                    >
                      <Icon
                        d={a.icon}
                        size={26}
                        stroke={selected ? DARK : GOLD}
                        strokeWidth={1.4}
                        style={{ marginBottom: 6 }}
                      />
                      <span style={S.accomName}>{a.name}</span>
                      <span style={S.accomDesc}>{a.desc}</span>
                      <span style={S.accomRange}>{a.range}</span>
                      {selected && (
                        <span style={S.accomCheck}>
                          <Icon d="M20 6L9 17l-5-5" size={13} stroke={GOLD} strokeWidth={2.5} />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── STEP 4: Budget ── */}
          {!submitted && step === 4 && (
            <div style={S.formGrid}>
              <p style={{ ...S.stepHint, gridColumn: "1/-1" }}>
                Set your overall trip budget. This helps us tailor the best options for you.
              </p>
              <div style={S.fieldGroup}>
                <label style={S.label}>Currency</label>
                <select
                  style={S.input}
                  value={form.currency}
                  onChange={(e) => set("currency", e.target.value)}
                  className="wizard-input"
                >
                  <option value="USD">USD — US Dollar</option>
                  <option value="KES">KES — Kenyan Shilling</option>
                  <option value="EUR">EUR — Euro</option>
                  <option value="GBP">GBP — British Pound</option>
                </select>
              </div>
              <div />
              <div style={S.fieldGroup}>
                <label style={S.label}>Minimum Budget ({form.currency})</label>
                <input
                  type="number"
                  style={S.input}
                  placeholder="e.g. 2000"
                  value={form.budget_min}
                  onChange={(e) => set("budget_min", e.target.value)}
                  className="wizard-input"
                />
              </div>
              <div style={S.fieldGroup}>
                <label style={S.label}>Maximum Budget ({form.currency})</label>
                <input
                  type="number"
                  style={S.input}
                  placeholder="e.g. 5000"
                  value={form.budget_max}
                  onChange={(e) => set("budget_max", e.target.value)}
                  className="wizard-input"
                />
              </div>
              <div style={{ gridColumn: "1/-1" }}>
                <div style={S.budgetNote}>
                  <Icon d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zM12 16v-4M12 8h.01" size={15} stroke={GOLD} strokeWidth={1.8} style={{ marginRight: 10, flexShrink: 0 }} />
                  Budget is per person unless otherwise discussed with our team.
                  We'll always work within your range.
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 5: Personal Details ── */}
          {!submitted && step === 5 && (
            <div style={S.formGrid}>
              <div style={{ ...S.fieldGroup, gridColumn: "1/-1" }}>
                <label style={S.label}>Full Name *</label>
                <input
                  type="text"
                  style={S.input}
                  placeholder="Your full name"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  className="wizard-input"
                />
              </div>
              <div style={S.fieldGroup}>
                <label style={S.label}>Email Address *</label>
                <input
                  type="email"
                  style={S.input}
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  className="wizard-input"
                />
              </div>
              <div style={S.fieldGroup}>
                <label style={S.label}>Phone Number</label>
                <input
                  type="tel"
                  style={S.input}
                  placeholder="+254 700 000000"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  className="wizard-input"
                />
              </div>
              <div style={{ ...S.fieldGroup, gridColumn: "1/-1" }}>
                <label style={S.label}>Special Requests or Notes</label>
                <textarea
                  style={{ ...S.input, height: 100, resize: "vertical" }}
                  placeholder="Dietary requirements, accessibility needs, anniversary surprises..."
                  value={form.special_requests}
                  onChange={(e) => set("special_requests", e.target.value)}
                  className="wizard-input"
                />
              </div>
            </div>
          )}

          {/* ── STEP 6: Review ── */}
          {!submitted && step === 6 && (
            <div>
              <p style={S.stepHint}>Review your trip before we send it to our team.</p>
              <div style={S.reviewGrid}>
                <ReviewRow label="Destinations" value={form.destinations.join(", ")} />
                <ReviewRow
                  label="Dates"
                  value={`${form.start_date} → ${form.end_date}${nights ? ` (${nights} nights)` : ""}`}
                />
                <ReviewRow
                  label="Travellers"
                  value={`${form.adults} adult${form.adults !== 1 ? "s" : ""}${form.children > 0 ? `, ${form.children} child${form.children !== 1 ? "ren" : ""}` : ""}`}
                />
                <ReviewRow label="Activities" value={form.activities.join(", ")} />
                <ReviewRow label="Accommodation" value={form.accommodation_type} />
                <ReviewRow label="Budget" value={`${form.currency} ${form.budget_min} – ${form.budget_max}`} />
                <ReviewRow label="Name" value={form.name} />
                <ReviewRow label="Email" value={form.email} />
                {form.phone && <ReviewRow label="Phone" value={form.phone} />}
                {form.special_requests && <ReviewRow label="Notes" value={form.special_requests} />}
              </div>
              {error && <p style={S.errorMsg}>{error}</p>}
            </div>
          )}

        </div>

        {/* Footer nav */}
        {!submitted && (
          <div style={S.footer}>
            <button
              style={S.backBtn}
              className="wizard-btn-back"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
            >
              ← Back
            </button>
            <div style={S.footerRight}>
              {step < STEPS.length - 1 ? (
                <button
                  style={{ ...S.nextBtn, opacity: canNext() ? 1 : 0.45 }}
                  className="wizard-btn-primary"
                  onClick={() => canNext() && setStep((s) => s + 1)}
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
          </div>
        )}
      </div>
    </div>
  );
}

function ReviewRow({ label, value }) {
  return (
    <div style={RS.row}>
      <span style={RS.label}>{label}</span>
      <span style={RS.value}>{value || "—"}</span>
    </div>
  );
}

const RS = {
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
    padding: "14px 0",
    borderBottom: "1px solid #ece9e2",
  },
  label: {
    fontSize: 12,
    fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#888",
    minWidth: 120,
    paddingTop: 2,
  },
  value: {
    fontSize: 15,
    color: "#1a1a1a",
    textAlign: "right",
    flex: 1,
    fontFamily: "'Helvetica Neue', sans-serif",
    lineHeight: 1.5,
  },
};

/* ── STYLES ── */
const S = {
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "16px",
    backdropFilter: "blur(4px)",
  },
  modal: {
    backgroundColor: "#fff",
    width: "100%",
    maxWidth: 720,
    maxHeight: "92vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    boxShadow: "0 24px 80px rgba(0,0,0,0.25)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "28px 32px 20px",
    borderBottom: "1px solid #ece9e2",
    flexShrink: 0,
  },
  headerEyebrow: {
    fontSize: 11,
    fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: "#c8a96e",
    margin: "0 0 6px",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 400,
    margin: 0,
    letterSpacing: "-0.01em",
    fontFamily: "'Georgia', serif",
  },
  closeBtn: {
    background: "none",
    border: "none",
    fontSize: 18,
    cursor: "pointer",
    color: "#888",
    padding: "4px 8px",
    lineHeight: 1,
    marginTop: -4,
  },
  progressWrap: {
    padding: "14px 32px",
    borderBottom: "1px solid #f0ede7",
    display: "flex",
    alignItems: "center",
    gap: 16,
    flexShrink: 0,
  },
  progressTrack: {
    flex: 1,
    height: 3,
    backgroundColor: "#ece9e2",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#c8a96e",
    borderRadius: 2,
    transition: "width 0.35s ease",
  },
  progressLabel: {
    fontSize: 11,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#aaa",
    letterSpacing: "0.06em",
    whiteSpace: "nowrap",
  },
  body: {
    flex: 1,
    overflowY: "auto",
    padding: "28px 32px",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 32px",
    borderTop: "1px solid #ece9e2",
    flexShrink: 0,
    backgroundColor: "#faf9f7",
  },
  footerRight: {},

  stepHint: {
    fontSize: 14,
    color: "#888",
    fontFamily: "'Helvetica Neue', sans-serif",
    marginBottom: 24,
    marginTop: 0,
    lineHeight: 1.6,
  },

  /* Destination chips */
  destGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
    gap: 10,
  },
  destChip: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 4,
    padding: "16px 16px",
    border: "1px solid #e0ddd6",
    backgroundColor: "#fff",
    cursor: "pointer",
    textAlign: "left",
    position: "relative",
    transition: "border-color 0.18s, background 0.18s",
  },
  destChipSelected: {
    borderColor: "#c8a96e",
    backgroundColor: "#fdf9f2",
  },
  chipName: {
    fontSize: 14,
    fontFamily: "'Georgia', serif",
    color: "#1a1a1a",
    fontWeight: 400,
  },
  chipTag: {
    fontSize: 10,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#aaa",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  chipCheck: {
    position: "absolute",
    top: 10,
    right: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  /* Activities */
  actGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
    gap: 10,
  },
  actChip: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "14px 16px",
    border: "1px solid #e0ddd6",
    backgroundColor: "#fff",
    cursor: "pointer",
    textAlign: "left",
    position: "relative",
    transition: "border-color 0.18s, background 0.18s",
  },
  actChipSelected: {
    borderColor: "#c8a96e",
    backgroundColor: "#fdf9f2",
  },
  actName: {
    fontSize: 13,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#1a1a1a",
    lineHeight: 1.3,
    flex: 1,
  },

  /* Accommodation */
  accomGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 12,
  },
  accomCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 6,
    padding: "22px 20px",
    border: "1px solid #e0ddd6",
    backgroundColor: "#fff",
    cursor: "pointer",
    textAlign: "left",
    position: "relative",
    transition: "border-color 0.18s, background 0.18s",
  },
  accomCardSelected: {
    borderColor: "#c8a96e",
    backgroundColor: "#fdf9f2",
  },
  accomName: {
    fontSize: 16,
    fontFamily: "'Georgia', serif",
    color: "#1a1a1a",
  },
  accomDesc: {
    fontSize: 12,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#888",
    lineHeight: 1.5,
  },
  accomRange: {
    fontSize: 11,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#c8a96e",
    letterSpacing: "0.04em",
    marginTop: 4,
    fontWeight: 600,
  },
  accomCheck: {
    position: "absolute",
    top: 12,
    right: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  /* Form */
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px 24px",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  label: {
    fontSize: 11,
    fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#666",
  },
  input: {
    padding: "11px 14px",
    border: "1px solid #ddd8d0",
    fontSize: 14,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#1a1a1a",
    outline: "none",
    backgroundColor: "#fff",
    width: "100%",
    boxSizing: "border-box",
    appearance: "none",
  },

  /* Counter */
  counter: {
    display: "flex",
    alignItems: "center",
    gap: 0,
    border: "1px solid #ddd8d0",
    width: "fit-content",
  },
  counterBtn: {
    width: 40,
    height: 42,
    border: "none",
    backgroundColor: "#f7f4ef",
    cursor: "pointer",
    fontSize: 18,
    color: "#1a2f2a",
    lineHeight: 1,
    transition: "background 0.15s",
  },
  counterVal: {
    minWidth: 48,
    textAlign: "center",
    fontSize: 16,
    fontFamily: "'Georgia', serif",
    borderLeft: "1px solid #ddd8d0",
    borderRight: "1px solid #ddd8d0",
    padding: "0 8px",
    lineHeight: "42px",
  },

  durationBadge: {
    display: "inline-flex",
    alignItems: "center",
    backgroundColor: "#f0f7f0",
    color: "#1a2f2a",
    padding: "10px 16px",
    fontSize: 14,
    fontFamily: "'Helvetica Neue', sans-serif",
    border: "1px solid #c8e6c9",
  },

  budgetNote: {
    fontSize: 13,
    color: "#666",
    fontFamily: "'Helvetica Neue', sans-serif",
    backgroundColor: "#fdf9f2",
    padding: "14px 16px",
    borderLeft: "3px solid #c8a96e",
    margin: 0,
    lineHeight: 1.6,
    display: "flex",
    alignItems: "flex-start",
  },

  reviewGrid: {
    border: "1px solid #ece9e2",
    padding: "0 20px",
  },

  errorMsg: {
    marginTop: 16,
    padding: "12px 16px",
    backgroundColor: "#fff5f5",
    border: "1px solid #ffcdd2",
    color: "#c62828",
    fontSize: 13,
    fontFamily: "'Helvetica Neue', sans-serif",
  },

  /* Nav buttons */
  backBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: 13,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#888",
    letterSpacing: "0.04em",
    padding: "10px 0",
    transition: "color 0.15s",
  },
  nextBtn: {
    padding: "12px 28px",
    backgroundColor: "#1a2f2a",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 600,
    fontSize: 13,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    transition: "background 0.2s",
  },
  submitBtn: {
    padding: "12px 28px",
    backgroundColor: "#c8a96e",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 600,
    fontSize: 13,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    transition: "background 0.2s",
  },

  /* Success */
  successWrap: {
    textAlign: "center",
    padding: "20px 0",
  },
  successIconWrap: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 26,
    fontWeight: 400,
    fontFamily: "'Georgia', serif",
    margin: "0 0 14px",
  },
  successText: {
    fontSize: 15,
    color: "#555",
    fontFamily: "'Helvetica Neue', sans-serif",
    lineHeight: 1.7,
    maxWidth: 480,
    margin: "0 auto 24px",
  },
  successSummary: {
    backgroundColor: "#f7f4ef",
    padding: "20px 24px",
    textAlign: "left",
    marginBottom: 28,
    fontSize: 13,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#555",
    lineHeight: 2,
    maxWidth: 400,
    margin: "0 auto 28px",
  },
};

const wizardCss = `
  .close-btn:hover { color: #1a1a1a !important; }
  .wizard-btn-primary:hover { opacity: 0.88; }
  .wizard-btn-back:hover { color: #1a1a1a !important; }
  .chip:hover { border-color: #c8a96e !important; background: #fdf9f2 !important; }
  .chip-selected { border-color: #c8a96e !important; background: #fdf9f2 !important; }
  .accom-card:hover { border-color: #c8a96e !important; background: #fdf9f2 !important; }
  .accom-selected { border-color: #c8a96e !important; background: #fdf9f2 !important; }
  .counter-btn:hover { background: #ece9e2 !important; }
  .wizard-input:focus { border-color: #c8a96e !important; outline: none; }
  @media (max-width: 600px) {
    .accom-grid { grid-template-columns: 1fr !important; }
    .form-grid { grid-template-columns: 1fr !important; }
  }
`;

export default TripWizard;