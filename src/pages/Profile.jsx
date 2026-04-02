import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useAuth } from "../context/AuthContext";

const TABS = [
  { id: "trips",        label: "My Trips",          icon: "✦" },
  { id: "destinations", label: "Saved Destinations", icon: "📍" },
  { id: "activities",  label: "Saved Activities",   icon: "⚡" },
  { id: "account",     label: "Account",            icon: "⚙" },
];

const STATUS_META = {
  pending:   { label: "Pending Review", color: "#e65100", bg: "#fff3e0" },
  reviewed:  { label: "Under Review",   color: "#1565c0", bg: "#e3f2fd" },
  contacted: { label: "In Discussion",  color: "#6a1b9a", bg: "#f3e5f5" },
  confirmed: { label: "Confirmed",      color: "#2e7d32", bg: "#e8f5e9" },
  cancelled: { label: "Cancelled",      color: "#757575", bg: "#f5f5f5" },
};

export default function Profile() {
  const { user, profile, signOut, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("trips");

  // Data states
  const [trips, setTrips]               = useState([]);
  const [savedDests, setSavedDests]     = useState([]);
  const [savedActs, setSavedActs]       = useState([]);
  const [loadingTrips, setLoadingTrips] = useState(true);
  const [loadingDests, setLoadingDests] = useState(true);
  const [loadingActs, setLoadingActs]   = useState(true);

  // Account form
  const [accountForm, setAccountForm]   = useState({ full_name: "", phone: "", nationality: "", travel_style: "" });
  const [saving, setSaving]             = useState(false);
  const [saveMsg, setSaveMsg]           = useState("");

  const displayName = profile?.full_name || user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Traveller";
  const initials    = displayName.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
  const avatarUrl   = user?.user_metadata?.avatar_url;

  // Populate account form from profile
  useEffect(() => {
    if (profile) {
      setAccountForm({
        full_name:     profile.full_name     || "",
        phone:         profile.phone         || "",
        nationality:   profile.nationality   || "",
        travel_style:  profile.travel_style  || "",
      });
    }
  }, [profile]);

  // Fetch trips
  useEffect(() => {
    if (activeTab !== "trips") return;
    setLoadingTrips(true);
    supabase
      .from("custom_trips")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => { setTrips(data || []); setLoadingTrips(false); });
  }, [activeTab, user.id]);

  // Fetch saved destinations
  useEffect(() => {
    if (activeTab !== "destinations") return;
    setLoadingDests(true);
    supabase
      .from("saved_destinations")
      .select("*, destinations(*)")
      .eq("user_id", user.id)
      .then(({ data }) => { setSavedDests(data || []); setLoadingDests(false); });
  }, [activeTab, user.id]);

  // Fetch saved activities
  useEffect(() => {
    if (activeTab !== "activities") return;
    setLoadingActs(true);
    supabase
      .from("saved_activities")
      .select("*, activities(*)")
      .eq("user_id", user.id)
      .then(({ data }) => { setSavedActs(data || []); setLoadingActs(false); });
  }, [activeTab, user.id]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleUnsaveDest = async (id) => {
    await supabase.from("saved_destinations").delete().eq("id", id);
    setSavedDests((prev) => prev.filter((s) => s.id !== id));
  };

  const handleUnsaveAct = async (id) => {
    await supabase.from("saved_activities").delete().eq("id", id);
    setSavedActs((prev) => prev.filter((s) => s.id !== id));
  };

  const handleSaveAccount = async () => {
    setSaving(true);
    setSaveMsg("");
    const { error } = await updateProfile(accountForm);
    setSaving(false);
    setSaveMsg(error ? "Something went wrong. Please try again." : "Changes saved.");
    setTimeout(() => setSaveMsg(""), 3000);
  };

  return (
    <div style={S.page}>
      <style>{css}</style>

      {/* ── PROFILE HEADER ── */}
      <div style={S.profileHeader}>
        <div style={S.profileHeaderInner}>
          <div style={S.avatarWrap}>
            {avatarUrl
              ? <img src={avatarUrl} alt={displayName} style={S.avatarImg} />
              : <div style={S.avatarInitials}>{initials}</div>
            }
          </div>
          <div style={S.profileMeta}>
            <h1 style={S.profileName}>{displayName}</h1>
            <p style={S.profileEmail}>{user.email}</p>
            {profile?.nationality && (
              <span style={S.profileBadge}>🌍 {profile.nationality}</span>
            )}
          </div>
          <div style={S.profileActions}>
            <button style={S.signOutBtn} className="sign-out-btn" onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* ── TABS ── */}
      <div style={S.tabBar}>
        <div style={S.tabBarInner}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              style={{
                ...S.tabBtn,
                ...(activeTab === tab.id ? S.tabBtnActive : {}),
              }}
              className={activeTab === tab.id ? "tab-active" : "tab-btn"}
              onClick={() => setActiveTab(tab.id)}
            >
              <span style={S.tabIcon}>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── TAB CONTENT ── */}
      <div style={S.content}>

        {/* ── MY TRIPS ── */}
        {activeTab === "trips" && (
          <div>
            <div style={S.contentHeader}>
              <h2 style={S.contentTitle}>My Trip Requests</h2>
              <Link to="/" style={S.newTripBtn} className="new-trip-btn">
                + New Trip
              </Link>
            </div>
            {loadingTrips ? (
              <SkeletonList count={3} />
            ) : trips.length === 0 ? (
              <EmptyState
                icon="🗺️"
                title="No trips yet"
                desc="Build your first custom trip — it takes less than 5 minutes."
                cta="Start Building"
                ctaTo="/"
              />
            ) : (
              <div style={S.tripList}>
                {trips.map((trip) => <TripCard key={trip.id} trip={trip} />)}
              </div>
            )}
          </div>
        )}

        {/* ── SAVED DESTINATIONS ── */}
        {activeTab === "destinations" && (
          <div>
            <div style={S.contentHeader}>
              <h2 style={S.contentTitle}>Saved Destinations</h2>
              <Link to="/destinations" style={S.newTripBtn} className="new-trip-btn">
                Browse More
              </Link>
            </div>
            {loadingDests ? (
              <SkeletonGrid count={4} />
            ) : savedDests.length === 0 ? (
              <EmptyState
                icon="📍"
                title="No saved destinations"
                desc="Browse destinations and save the ones that excite you."
                cta="Browse Destinations"
                ctaTo="/destinations"
              />
            ) : (
              <div style={S.savedGrid}>
                {savedDests.map((s) => (
                  <SavedDestCard
                    key={s.id}
                    item={s.destinations}
                    onRemove={() => handleUnsaveDest(s.id)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── SAVED ACTIVITIES ── */}
        {activeTab === "activities" && (
          <div>
            <div style={S.contentHeader}>
              <h2 style={S.contentTitle}>Saved Activities</h2>
              <Link to="/activities" style={S.newTripBtn} className="new-trip-btn">
                Browse More
              </Link>
            </div>
            {loadingActs ? (
              <SkeletonGrid count={4} />
            ) : savedActs.length === 0 ? (
              <EmptyState
                icon="⚡"
                title="No saved activities"
                desc="Explore activities and save the ones you'd love to experience."
                cta="Browse Activities"
                ctaTo="/activities"
              />
            ) : (
              <div style={S.savedGrid}>
                {savedActs.map((s) => (
                  <SavedActCard
                    key={s.id}
                    item={s.activities}
                    onRemove={() => handleUnsaveAct(s.id)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── ACCOUNT SETTINGS ── */}
        {activeTab === "account" && (
          <div style={S.accountWrap}>
            <h2 style={S.contentTitle}>Account Settings</h2>

            <div style={S.accountSection}>
              <h3 style={S.accountSectionTitle}>Personal Details</h3>
              <div style={S.accountGrid}>
                <Field label="Full Name">
                  <input
                    style={S.input}
                    className="auth-input"
                    type="text"
                    value={accountForm.full_name}
                    onChange={(e) => setAccountForm((f) => ({ ...f, full_name: e.target.value }))}
                    placeholder="Your full name"
                  />
                </Field>
                <Field label="Phone / WhatsApp">
                  <input
                    style={S.input}
                    className="auth-input"
                    type="tel"
                    value={accountForm.phone}
                    onChange={(e) => setAccountForm((f) => ({ ...f, phone: e.target.value }))}
                    placeholder="+254 700 000 000"
                  />
                </Field>
                <Field label="Nationality">
                  <input
                    style={S.input}
                    className="auth-input"
                    type="text"
                    value={accountForm.nationality}
                    onChange={(e) => setAccountForm((f) => ({ ...f, nationality: e.target.value }))}
                    placeholder="e.g. Kenyan, British"
                  />
                </Field>
                <Field label="Travel Style">
                  <select
                    style={S.input}
                    className="auth-input"
                    value={accountForm.travel_style}
                    onChange={(e) => setAccountForm((f) => ({ ...f, travel_style: e.target.value }))}
                  >
                    <option value="">Select a style…</option>
                    <option value="Budget">Budget Explorer</option>
                    <option value="Mid-Range">Mid-Range Comfort</option>
                    <option value="Luxury">Luxury</option>
                    <option value="Ultra Luxury">Ultra Luxury</option>
                    <option value="Adventure">Adventure First</option>
                    <option value="Family">Family-Focused</option>
                  </select>
                </Field>
              </div>
              <div style={S.accountActions}>
                <button
                  style={{ ...S.saveBtn, opacity: saving ? 0.7 : 1 }}
                  className="save-btn"
                  onClick={handleSaveAccount}
                  disabled={saving}
                >
                  {saving ? "Saving…" : "Save Changes"}
                </button>
                {saveMsg && (
                  <span style={{
                    ...S.saveMsg,
                    color: saveMsg.includes("wrong") ? "#c62828" : "#2e7d32",
                  }}>
                    {saveMsg}
                  </span>
                )}
              </div>
            </div>

            {/* Auth info */}
            <div style={S.accountSection}>
              <h3 style={S.accountSectionTitle}>Login & Security</h3>
              <div style={S.authInfo}>
                <div style={S.authInfoRow}>
                  <span style={S.authInfoLabel}>Email</span>
                  <span style={S.authInfoValue}>{user.email}</span>
                </div>
                <div style={S.authInfoRow}>
                  <span style={S.authInfoLabel}>Sign-in method</span>
                  <span style={S.authInfoValue}>
                    {user.app_metadata?.provider === "google" ? "Google" : "Email & Password"}
                  </span>
                </div>
                <div style={S.authInfoRow}>
                  <span style={S.authInfoLabel}>Member since</span>
                  <span style={S.authInfoValue}>
                    {new Date(user.created_at).toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
                  </span>
                </div>
              </div>
            </div>

            {/* Danger zone */}
            <div style={{ ...S.accountSection, borderColor: "#ffcdd2" }}>
              <h3 style={{ ...S.accountSectionTitle, color: "#c62828" }}>Danger Zone</h3>
              <p style={S.dangerDesc}>
                Once you delete your account, all your trips and saved data will be permanently removed.
              </p>
              <button style={S.dangerBtn} className="danger-btn">
                Delete My Account
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── SUB-COMPONENTS ── */

function TripCard({ trip }) {
  const meta    = STATUS_META[trip.status] || STATUS_META.pending;
  const nights  = trip.start_date && trip.end_date
    ? Math.round((new Date(trip.end_date) - new Date(trip.start_date)) / 86400000)
    : null;
  const dests   = Array.isArray(trip.destinations) ? trip.destinations : [];
  const acts    = Array.isArray(trip.activities)   ? trip.activities   : [];

  return (
    <div style={TC.card} className="trip-card">
      <div style={TC.cardTop}>
        <div>
          <p style={TC.destList}>{dests.join(" · ") || "Custom Trip"}</p>
          <p style={TC.dates}>
            {trip.start_date} → {trip.end_date}
            {nights ? ` · ${nights} nights` : ""}
          </p>
        </div>
        <span style={{ ...TC.statusBadge, color: meta.color, backgroundColor: meta.bg }}>
          {meta.label}
        </span>
      </div>
      <div style={TC.cardMeta}>
        <span style={TC.metaChip}>👤 {trip.adults} adult{trip.adults !== 1 ? "s" : ""}{trip.children > 0 ? ` + ${trip.children} child` : ""}</span>
        <span style={TC.metaChip}>🏨 {trip.accommodation_type}</span>
        <span style={TC.metaChip}>💰 {trip.currency} {trip.budget_min}–{trip.budget_max}</span>
      </div>
      {acts.length > 0 && (
        <p style={TC.acts}>{acts.slice(0, 4).join(", ")}{acts.length > 4 ? ` +${acts.length - 4} more` : ""}</p>
      )}
      <div style={TC.cardFooter}>
        <span style={TC.submittedOn}>
          Submitted {new Date(trip.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
        </span>
        {trip.status === "pending" && (
          <span style={TC.pendingNote}>Our team will be in touch within 24 hours.</span>
        )}
      </div>
    </div>
  );
}
const TC = {
  card: {
    border: "1px solid #ece9e2",
    padding: "24px 28px",
    backgroundColor: "#fff",
    transition: "box-shadow 0.2s",
  },
  cardTop: {
    display: "flex", justifyContent: "space-between",
    alignItems: "flex-start", gap: 16, marginBottom: 14,
  },
  destList: {
    fontSize: 18, fontFamily: "'Georgia', serif",
    fontWeight: 400, margin: "0 0 6px", letterSpacing: "-0.01em",
  },
  dates: {
    fontSize: 13, fontFamily: "'Helvetica Neue', sans-serif",
    color: "#888", margin: 0,
  },
  statusBadge: {
    fontSize: 11, fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.08em", textTransform: "uppercase",
    fontWeight: 700, padding: "5px 12px", whiteSpace: "nowrap",
    flexShrink: 0,
  },
  cardMeta: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 },
  metaChip: {
    fontSize: 12, fontFamily: "'Helvetica Neue', sans-serif",
    color: "#666", backgroundColor: "#f7f4ef",
    padding: "4px 10px",
  },
  acts: {
    fontSize: 12, fontFamily: "'Helvetica Neue', sans-serif",
    color: "#aaa", margin: "0 0 16px", lineHeight: 1.5,
  },
  cardFooter: {
    display: "flex", justifyContent: "space-between",
    alignItems: "center", paddingTop: 14,
    borderTop: "1px solid #f0ede7", flexWrap: "wrap", gap: 8,
  },
  submittedOn: {
    fontSize: 11, fontFamily: "'Helvetica Neue', sans-serif",
    color: "#ccc", letterSpacing: "0.04em",
  },
  pendingNote: {
    fontSize: 11, fontFamily: "'Helvetica Neue', sans-serif",
    color: "#c8a96e", letterSpacing: "0.04em",
  },
};

function SavedDestCard({ item, onRemove }) {
  if (!item) return null;
  return (
    <div style={SC.card} className="saved-card">
      <div style={SC.cardTop}>
        <span style={SC.tag}>{item.region}</span>
        <button style={SC.removeBtn} className="remove-btn" onClick={onRemove}>✕</button>
      </div>
      <h3 style={SC.name}>{item.name}</h3>
      <p style={SC.tagLine}>{item.tag}</p>
      <p style={SC.desc}>{item.description?.slice(0, 90)}…</p>
      <Link to="/destinations" style={SC.viewLink} className="view-link">View →</Link>
    </div>
  );
}

function SavedActCard({ item, onRemove }) {
  if (!item) return null;
  return (
    <div style={SC.card} className="saved-card">
      <div style={SC.cardTop}>
        <span style={SC.tag}>{item.category}</span>
        <button style={SC.removeBtn} className="remove-btn" onClick={onRemove}>✕</button>
      </div>
      <h3 style={SC.name}>{item.icon} {item.name}</h3>
      <p style={SC.tagLine}>{item.duration} · {item.difficulty}</p>
      <p style={SC.desc}>{item.description?.slice(0, 90)}…</p>
      <Link to="/activities" style={SC.viewLink} className="view-link">View →</Link>
    </div>
  );
}
const SC = {
  card: {
    border: "1px solid #ece9e2", padding: "20px 22px",
    backgroundColor: "#fff", transition: "box-shadow 0.2s, transform 0.2s",
    display: "flex", flexDirection: "column", gap: 6,
  },
  cardTop: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  tag: {
    fontSize: 10, fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.14em", textTransform: "uppercase",
    color: "#c8a96e",
  },
  removeBtn: {
    background: "none", border: "none", cursor: "pointer",
    fontSize: 13, color: "#ccc", padding: "2px 4px",
    transition: "color 0.15s",
  },
  name: { fontSize: 17, fontWeight: 400, margin: 0, letterSpacing: "-0.01em" },
  tagLine: {
    fontSize: 11, fontFamily: "'Helvetica Neue', sans-serif",
    color: "#aaa", letterSpacing: "0.06em", margin: 0,
  },
  desc: {
    fontSize: 12, fontFamily: "'Helvetica Neue', sans-serif",
    color: "#888", lineHeight: 1.6, margin: 0, flex: 1,
  },
  viewLink: {
    fontSize: 12, fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 600, color: "#1a2f2a", textDecoration: "none",
    letterSpacing: "0.04em", marginTop: 4, transition: "color 0.15s",
  },
};

function EmptyState({ icon, title, desc, cta, ctaTo }) {
  return (
    <div style={ES.wrap}>
      <span style={ES.icon}>{icon}</span>
      <h3 style={ES.title}>{title}</h3>
      <p style={ES.desc}>{desc}</p>
      <Link to={ctaTo} style={ES.cta} className="new-trip-btn">{cta} →</Link>
    </div>
  );
}
const ES = {
  wrap: {
    textAlign: "center", padding: "72px 24px",
    border: "1px dashed #ddd8d0", backgroundColor: "#faf9f7",
    display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
  },
  icon: { fontSize: 40 },
  title: { fontSize: 20, fontWeight: 400, margin: 0, letterSpacing: "-0.01em" },
  desc: {
    fontSize: 14, fontFamily: "'Helvetica Neue', sans-serif",
    color: "#888", maxWidth: 320, lineHeight: 1.6, margin: 0,
  },
  cta: {
    display: "inline-block", marginTop: 8, padding: "10px 22px",
    backgroundColor: "#1a2f2a", color: "#fff", textDecoration: "none",
    fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 600,
    fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase",
    transition: "background 0.2s",
  },
};

function SkeletonList({ count }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{ height: 120, backgroundColor: "#f0ede7" }} className="skeleton" />
      ))}
    </div>
  );
}
function SkeletonGrid({ count }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px,1fr))", gap: 16 }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{ height: 180, backgroundColor: "#f0ede7" }} className="skeleton" />
      ))}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <label style={{
        fontSize: 11, fontFamily: "'Helvetica Neue', sans-serif",
        letterSpacing: "0.12em", textTransform: "uppercase", color: "#888",
      }}>{label}</label>
      {children}
    </div>
  );
}

/* ── PAGE STYLES ── */
const S = {
  page: {
    fontFamily: "'Georgia', 'Times New Roman', serif",
    color: "#1a1a1a",
    backgroundColor: "#f7f4ef",
    minHeight: "100vh",
  },

  profileHeader: {
    backgroundColor: "#0c1e14",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },
  profileHeaderInner: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "36px 24px",
    display: "flex",
    alignItems: "center",
    gap: 24,
    flexWrap: "wrap",
  },
  avatarWrap: { flexShrink: 0 },
  avatarImg: {
    width: 64, height: 64, borderRadius: "50%",
    objectFit: "cover", border: "2px solid #c8a96e",
  },
  avatarInitials: {
    width: 64, height: 64, borderRadius: "50%",
    backgroundColor: "#c8a96e", color: "#fff",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 22, fontFamily: "'Georgia', serif", fontWeight: 400,
    border: "2px solid rgba(255,255,255,0.1)",
  },
  profileMeta: { flex: 1 },
  profileName: {
    fontSize: 24, fontWeight: 400, color: "#fff",
    margin: "0 0 4px", letterSpacing: "-0.01em",
  },
  profileEmail: {
    fontSize: 13, fontFamily: "'Helvetica Neue', sans-serif",
    color: "rgba(255,255,255,0.45)", margin: "0 0 8px",
  },
  profileBadge: {
    display: "inline-block",
    fontSize: 11, fontFamily: "'Helvetica Neue', sans-serif",
    color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em",
  },
  profileActions: {},
  signOutBtn: {
    padding: "8px 20px",
    border: "1px solid rgba(255,255,255,0.2)",
    backgroundColor: "transparent",
    color: "rgba(255,255,255,0.55)",
    cursor: "pointer", fontSize: 12,
    fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.06em", textTransform: "uppercase",
    transition: "border-color 0.2s, color 0.2s",
  },

  tabBar: {
    backgroundColor: "#fff",
    borderBottom: "1px solid #ece9e2",
    position: "sticky",
    top: 68,
    zIndex: 40,
  },
  tabBarInner: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "0 24px",
    display: "flex",
    gap: 0,
    overflowX: "auto",
  },
  tabBtn: {
    display: "flex", alignItems: "center", gap: 8,
    padding: "16px 20px",
    border: "none", borderBottom: "2px solid transparent",
    backgroundColor: "transparent", cursor: "pointer",
    fontSize: 13, fontFamily: "'Helvetica Neue', sans-serif",
    color: "#888", letterSpacing: "0.04em",
    whiteSpace: "nowrap", transition: "color 0.2s, border-color 0.2s",
  },
  tabBtnActive: {
    color: "#1a2f2a",
    borderBottomColor: "#c8a96e",
  },
  tabIcon: { fontSize: 14 },

  content: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "40px 24px 80px",
  },

  contentHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 28,
    flexWrap: "wrap",
    gap: 12,
  },
  contentTitle: {
    fontSize: 26, fontWeight: 400, margin: 0, letterSpacing: "-0.01em",
  },
  newTripBtn: {
    display: "inline-block",
    padding: "9px 20px", backgroundColor: "#1a2f2a", color: "#fff",
    textDecoration: "none", fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 600, fontSize: 12, letterSpacing: "0.08em",
    textTransform: "uppercase", transition: "background 0.2s",
  },

  tripList: { display: "flex", flexDirection: "column", gap: 12 },

  savedGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: 16,
  },

  accountWrap: { maxWidth: 640 },
  accountSection: {
    border: "1px solid #ece9e2",
    backgroundColor: "#fff",
    padding: "28px 32px",
    marginBottom: 20,
  },
  accountSectionTitle: {
    fontSize: 16, fontWeight: 400, margin: "0 0 24px",
    letterSpacing: "-0.01em", paddingBottom: 16,
    borderBottom: "1px solid #f0ede7",
  },
  accountGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px 24px",
    marginBottom: 24,
  },
  input: {
    padding: "11px 14px", border: "1.5px solid #ddd8d0",
    fontSize: 14, fontFamily: "'Helvetica Neue', sans-serif",
    color: "#1a1a1a", outline: "none", width: "100%",
    boxSizing: "border-box", transition: "border-color 0.2s",
    backgroundColor: "#fff", appearance: "none",
  },
  accountActions: { display: "flex", alignItems: "center", gap: 16 },
  saveBtn: {
    padding: "10px 24px", backgroundColor: "#1a2f2a", color: "#fff",
    border: "none", cursor: "pointer",
    fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 600,
    fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase",
    transition: "background 0.2s",
  },
  saveMsg: { fontSize: 13, fontFamily: "'Helvetica Neue', sans-serif" },

  authInfo: { display: "flex", flexDirection: "column", gap: 0 },
  authInfoRow: {
    display: "flex", justifyContent: "space-between",
    padding: "12px 0", borderBottom: "1px solid #f0ede7",
  },
  authInfoLabel: {
    fontSize: 12, fontFamily: "'Helvetica Neue', sans-serif",
    color: "#aaa", letterSpacing: "0.06em", textTransform: "uppercase",
  },
  authInfoValue: {
    fontSize: 14, fontFamily: "'Helvetica Neue', sans-serif", color: "#333",
  },

  dangerDesc: {
    fontSize: 13, fontFamily: "'Helvetica Neue', sans-serif",
    color: "#888", lineHeight: 1.6, marginBottom: 20,
  },
  dangerBtn: {
    padding: "10px 20px", backgroundColor: "transparent",
    border: "1px solid #ef9a9a", color: "#c62828",
    cursor: "pointer", fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 600, fontSize: 12, letterSpacing: "0.06em",
    textTransform: "uppercase", transition: "background 0.2s, color 0.2s",
  },
};

const css = `
  .tab-btn:hover { color: #1a2f2a !important; }
  .trip-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.07) !important; }
  .saved-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.08) !important; transform: translateY(-2px); }
  .remove-btn:hover { color: #ef5350 !important; }
  .view-link:hover { color: #c8a96e !important; }
  .new-trip-btn:hover { background-color: #c8a96e !important; }
  .save-btn:hover { background-color: #c8a96e !important; }
  .sign-out-btn:hover { border-color: rgba(255,255,255,0.5) !important; color: #fff !important; }
  .danger-btn:hover { background: #ffebee !important; }
  .auth-input:focus { border-color: #c8a96e !important; }
  .skeleton { animation: pulse 1.5s ease-in-out infinite; }
  @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.45; } }

  @media (max-width: 768px) {
    .account-grid { grid-template-columns: 1fr !important; }
    .profile-header-inner { flex-direction: column; align-items: flex-start; }
  }
  @media (max-width: 480px) {
    .tab-bar-inner { gap: 0; }
    .tab-btn { padding: 14px 12px !important; font-size: 12px !important; }
  }
`;