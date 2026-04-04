import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useAuth } from "../context/AuthContext";
import TripWizard from "../components/TripWizard";

const STATUS_META = {
  pending:   { label: "Pending Review", color: "#7a5c1e", bg: "#fdf3e3", dot: "#f0a500" },
  reviewed:  { label: "Reviewed",       color: "#1565c0", bg: "#e3f0fd", dot: "#1976d2" },
  contacted: { label: "Contacted",      color: "#6a1b9a", bg: "#f3e5f5", dot: "#8e24aa" },
  confirmed: { label: "Confirmed",      color: "#2e7d32", bg: "#e8f5e9", dot: "#43a047" },
  cancelled: { label: "Cancelled",      color: "#c62828", bg: "#ffebee", dot: "#e53935" },
};

const TABS = ["My Trips", "Saved Destinations", "Saved Activities", "Account Settings"];

export default function Profile() {
  const { user, profile, signOut, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [activeTab,       setActiveTab]       = useState(0);
  const [trips,           setTrips]           = useState([]);
  const [savedDests,      setSavedDests]      = useState([]);
  const [savedActivities, setSavedActivities] = useState([]);
  const [loading,         setLoading]         = useState({ trips: true, dests: true, acts: true });
  const [expandedTrip,    setExpandedTrip]    = useState(null);
  const [wizardOpen,      setWizardOpen]      = useState(false);
  const [wizardDests,     setWizardDests]     = useState([]);

  // Account settings form
  const [settingsForm,  setSettingsForm]  = useState({ full_name: "", phone: "" });
  const [saving,        setSaving]        = useState(false);
  const [saveMsg,       setSaveMsg]       = useState("");
  const [pwForm,        setPwForm]        = useState({ password: "", confirm: "" });
  const [pwMsg,         setPwMsg]         = useState("");
  const [pwSaving,      setPwSaving]      = useState(false);

  const displayName = profile?.full_name || user?.user_metadata?.full_name || user?.email?.split("@")[0] || "";
  const initials    = displayName ? displayName.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2) : "?";
  const avatarUrl   = user?.user_metadata?.avatar_url;

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    setSettingsForm({ full_name: profile?.full_name || "", phone: profile?.phone || "" });
  }, [user, profile, navigate]);

  const fetchTrips = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase
      .from("custom_trips")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    setTrips(data || []);
    setLoading((l) => ({ ...l, trips: false }));
  }, [user]);

  const fetchSavedDests = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase
      .from("saved_destinations")
      .select("id, created_at, destinations(id, name, tag, region, image_url, description)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    setSavedDests(data || []);
    setLoading((l) => ({ ...l, dests: false }));
  }, [user]);

  const fetchSavedActivities = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase
      .from("saved_activities")
      .select("id, created_at, activities(id, name, category, description, duration, difficulty, image_url)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    setSavedActivities(data || []);
    setLoading((l) => ({ ...l, acts: false }));
  }, [user]);

  useEffect(() => { fetchTrips(); }, [fetchTrips]);
  useEffect(() => { if (activeTab === 1) fetchSavedDests(); }, [activeTab, fetchSavedDests]);
  useEffect(() => { if (activeTab === 2) fetchSavedActivities(); }, [activeTab, fetchSavedActivities]);

  const unsaveDest = async (savedId) => {
    await supabase.from("saved_destinations").delete().eq("id", savedId);
    setSavedDests((prev) => prev.filter((s) => s.id !== savedId));
  };

  const unsaveActivity = async (savedId) => {
    await supabase.from("saved_activities").delete().eq("id", savedId);
    setSavedActivities((prev) => prev.filter((s) => s.id !== savedId));
  };

  const saveSettings = async () => {
    setSaving(true); setSaveMsg("");
    const { error } = await updateProfile(settingsForm);
    setSaveMsg(error ? "Failed to save. Try again." : "Saved successfully.");
    setSaving(false);
    setTimeout(() => setSaveMsg(""), 3000);
  };

  const savePassword = async () => {
    if (pwForm.password !== pwForm.confirm) { setPwMsg("Passwords don't match."); return; }
    if (pwForm.password.length < 8) { setPwMsg("Password must be at least 8 characters."); return; }
    setPwSaving(true); setPwMsg("");
    const { error } = await supabase.auth.updateUser({ password: pwForm.password });
    setPwMsg(error ? "Failed to update password." : "Password updated.");
    setPwSaving(false);
    setPwForm({ password: "", confirm: "" });
    setTimeout(() => setPwMsg(""), 3000);
  };

  const handleSignOut = async () => { await signOut(); navigate("/"); };

  const formatDate = (d) => new Date(d).toLocaleDateString("en-KE", { day: "numeric", month: "short", year: "numeric" });
  const nights = (s, e) => Math.max(0, Math.round((new Date(e) - new Date(s)) / 86400000));

  if (!user) return null;

  return (
    <div style={S.page}>
      <style>{css}</style>

      {/* ── PROFILE HEADER ── */}
      <div style={S.profileHeader}>
        <div style={S.profileHeaderInner}>
          <div style={S.avatarWrap}>
            {avatarUrl
              ? <img src={avatarUrl} alt={displayName} style={S.avatar} />
              : <div style={S.avatarInitials}>{initials}</div>
            }
          </div>
          <div style={S.profileInfo}>
            <p style={S.profileEyebrow}>My Account</p>
            <h1 style={S.profileName}>{displayName}</h1>
            <p style={S.profileEmail}>{user.email}</p>
          </div>
          <div style={S.profileHeaderActions}>
            <button style={S.buildTripBtn} className="build-trip-btn" onClick={() => { setWizardDests([]); setWizardOpen(true); }}>
              + Build New Trip
            </button>
            <button style={S.signOutBtn} className="sign-out-btn" onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
        </div>

        {/* Stat pills */}
        <div style={S.statPills}>
          <div style={S.statPill}>
            <span style={S.statNum}>{trips.length}</span>
            <span style={S.statLabel}>Trips</span>
          </div>
          <div style={S.statDivider} />
          <div style={S.statPill}>
            <span style={S.statNum}>{savedDests.length || "—"}</span>
            <span style={S.statLabel}>Saved Destinations</span>
          </div>
          <div style={S.statDivider} />
          <div style={S.statPill}>
            <span style={S.statNum}>{savedActivities.length || "—"}</span>
            <span style={S.statLabel}>Saved Activities</span>
          </div>
        </div>
      </div>

      {/* ── TABS ── */}
      <div style={S.tabBar}>
        <div style={S.tabBarInner}>
          {TABS.map((t, i) => (
            <button
              key={t}
              style={{ ...S.tab, ...(activeTab === i ? S.tabActive : {}) }}
              className={`profile-tab${activeTab === i ? " profile-tab-active" : ""}`}
              onClick={() => setActiveTab(i)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div style={S.body}>

        {/* ── TAB 0: MY TRIPS ── */}
        {activeTab === 0 && (
          <div>
            {loading.trips ? (
              <div style={S.loadingList}>
                {[1,2,3].map((i) => <div key={i} style={S.shimmer} className="shimmer" />)}
              </div>
            ) : trips.length === 0 ? (
              <div style={S.emptyState}>
                <span style={S.emptyIcon}>✈️</span>
                <h3 style={S.emptyTitle}>No trips yet</h3>
                <p style={S.emptyText}>Build your first custom Kenya trip and it'll appear here.</p>
                <button style={S.emptyBtn} className="build-trip-btn" onClick={() => { setWizardDests([]); setWizardOpen(true); }}>
                  Build My First Trip →
                </button>
              </div>
            ) : (
              <div style={S.tripList}>
                {trips.map((trip) => {
                  const meta     = STATUS_META[trip.status] || STATUS_META.pending;
                  const expanded = expandedTrip === trip.id;
                  const n        = nights(trip.start_date, trip.end_date);
                  return (
                    <div key={trip.id} style={S.tripCard} className="trip-card">
                      {/* Trip card header */}
                      <div style={S.tripCardTop} onClick={() => setExpandedTrip(expanded ? null : trip.id)}>
                        <div style={S.tripCardLeft}>
                          <div style={{ ...S.statusDot, backgroundColor: meta.dot }} />
                          <div>
                            <h3 style={S.tripDests}>{trip.destinations.join(" · ")}</h3>
                            <p style={S.tripMeta}>
                              {formatDate(trip.start_date)} → {formatDate(trip.end_date)}
                              {n > 0 && <span style={S.tripNights}> · {n} nights</span>}
                              <span style={S.tripDot}>·</span>
                              {trip.adults} adult{trip.adults > 1 ? "s" : ""}
                              {trip.children > 0 && `, ${trip.children} children`}
                            </p>
                          </div>
                        </div>
                        <div style={S.tripCardRight}>
                          <span style={{ ...S.statusBadge, color: meta.color, backgroundColor: meta.bg }}>
                            {meta.label}
                          </span>
                          <span style={S.expandChevron}>{expanded ? "▴" : "▾"}</span>
                        </div>
                      </div>

                      {/* Expanded details */}
                      {expanded && (
                        <div style={S.tripExpanded}>
                          <div style={S.tripDetailGrid}>
                            <TripDetail label="Activities"     value={trip.activities.join(", ")} />
                            <TripDetail label="Accommodation"  value={trip.accommodation_type} />
                            <TripDetail label="Budget"         value={`${trip.currency} ${Number(trip.budget_min).toLocaleString()} – ${Number(trip.budget_max).toLocaleString()}`} />
                            <TripDetail label="Submitted"      value={formatDate(trip.created_at)} />
                            {trip.special_requests && <TripDetail label="Notes" value={trip.special_requests} full />}
                            {trip.admin_notes       && <TripDetail label="From Our Team" value={trip.admin_notes} full highlight />}
                          </div>
                          <div style={S.tripExpandedActions}>
                            <button
                              style={S.reTripBtn}
                              className="re-trip-btn"
                              onClick={() => { setWizardDests(trip.destinations); setWizardOpen(true); }}
                            >
                              Book Similar Trip →
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── TAB 1: SAVED DESTINATIONS ── */}
        {activeTab === 1 && (
          <div>
            {loading.dests ? (
              <div style={S.savedGrid}>
                {[1,2,3,4].map((i) => <div key={i} style={{ ...S.shimmer, height: 200 }} className="shimmer" />)}
              </div>
            ) : savedDests.length === 0 ? (
              <div style={S.emptyState}>
                <span style={S.emptyIcon}>🗺️</span>
                <h3 style={S.emptyTitle}>No saved destinations</h3>
                <p style={S.emptyText}>Browse destinations and tap + to save them here.</p>
                <Link to="/destinations" style={S.emptyBtn} className="build-trip-btn">Explore Destinations →</Link>
              </div>
            ) : (
              <>
                <div style={S.savedGrid}>
                  {savedDests.map((s) => {
                    const d = s.destinations;
                    if (!d) return null;
                    return (
                      <div key={s.id} style={S.savedCard} className="saved-card">
                        <div style={S.savedImgWrap}>
                          {d.image_url
                            ? <img src={d.image_url} alt={d.name} style={S.savedImg} />
                            : <div style={S.savedImgFallback} />
                          }
                          <span style={S.savedRegion}>{d.region}</span>
                          <button style={S.unsaveBtn} className="unsave-btn" onClick={() => unsaveDest(s.id)} title="Remove">✕</button>
                        </div>
                        <div style={S.savedBody}>
                          {d.tag && <span style={S.savedTag}>{d.tag}</span>}
                          <h3 style={S.savedName}>{d.name}</h3>
                          {d.description && <p style={S.savedDesc}>{d.description.slice(0, 80)}…</p>}
                          <button
                            style={S.savedPlanBtn}
                            className="saved-plan-btn"
                            onClick={() => { setWizardDests([d.name]); setWizardOpen(true); }}
                          >
                            Plan This Trip +
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {savedDests.length > 1 && (
                  <div style={{ textAlign: "center", marginTop: 32 }}>
                    <button
                      style={S.planAllBtn}
                      className="plan-all-btn"
                      onClick={() => { setWizardDests(savedDests.map((s) => s.destinations?.name).filter(Boolean)); setWizardOpen(true); }}
                    >
                      Plan All {savedDests.length} Destinations Together →
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* ── TAB 2: SAVED ACTIVITIES ── */}
        {activeTab === 2 && (
          <div>
            {loading.acts ? (
              <div style={S.actGrid}>
                {[1,2,3,4].map((i) => <div key={i} style={{ ...S.shimmer, height: 100 }} className="shimmer" />)}
              </div>
            ) : savedActivities.length === 0 ? (
              <div style={S.emptyState}>
                <span style={S.emptyIcon}>🦁</span>
                <h3 style={S.emptyTitle}>No saved activities</h3>
                <p style={S.emptyText}>Browse activities and save the ones you want to experience.</p>
                <Link to="/activities" style={S.emptyBtn} className="build-trip-btn">Explore Activities →</Link>
              </div>
            ) : (
              <div style={S.actGrid}>
                {savedActivities.map((s) => {
                  const a = s.activities;
                  if (!a) return null;
                  return (
                    <div key={s.id} style={S.actCard} className="act-card">
                      <div style={S.actCardLeft}>
                        {a.image_url
                          ? <img src={a.image_url} alt={a.name} style={S.actThumb} />
                          : <div style={S.actThumbFallback}><span style={{ fontSize: 24 }}>🌍</span></div>
                        }
                      </div>
                      <div style={S.actCardBody}>
                        <span style={S.actCategory}>{a.category}</span>
                        <h3 style={S.actName}>{a.name}</h3>
                        {a.description && <p style={S.actDesc}>{a.description.slice(0, 90)}…</p>}
                        <div style={S.actMeta}>
                          {a.duration   && <span style={S.actMetaPill}>⏱ {a.duration}</span>}
                          {a.difficulty && <span style={S.actMetaPill}>⚡ {a.difficulty}</span>}
                        </div>
                      </div>
                      <button style={S.unsaveActBtn} className="unsave-btn" onClick={() => unsaveActivity(s.id)} title="Remove">✕</button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── TAB 3: ACCOUNT SETTINGS ── */}
        {activeTab === 3 && (
          <div style={S.settingsWrap}>
            {/* Profile info */}
            <div style={S.settingsSection}>
              <h2 style={S.settingsSectionTitle}>Profile Information</h2>
              <div style={S.settingsGrid}>
                <div style={S.fieldGroup}>
                  <label style={S.label}>Full Name</label>
                  <input
                    type="text"
                    style={S.input}
                    className="settings-input"
                    value={settingsForm.full_name}
                    onChange={(e) => setSettingsForm((f) => ({ ...f, full_name: e.target.value }))}
                    placeholder="Your full name"
                  />
                </div>
                <div style={S.fieldGroup}>
                  <label style={S.label}>Phone Number</label>
                  <input
                    type="tel"
                    style={S.input}
                    className="settings-input"
                    value={settingsForm.phone}
                    onChange={(e) => setSettingsForm((f) => ({ ...f, phone: e.target.value }))}
                    placeholder="+254 700 000000"
                  />
                </div>
                <div style={S.fieldGroup}>
                  <label style={S.label}>Email Address</label>
                  <input type="email" style={{ ...S.input, backgroundColor: "#faf9f7", color: "#aaa" }} value={user.email} disabled />
                  <p style={S.fieldNote}>Email cannot be changed here.</p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 24 }}>
                <button style={S.saveBtn} className="save-btn" onClick={saveSettings} disabled={saving}>
                  {saving ? "Saving…" : "Save Changes"}
                </button>
                {saveMsg && <span style={{ fontSize: 13, fontFamily: "'Helvetica Neue', sans-serif", color: saveMsg.includes("success") ? "#2e7d32" : "#c62828" }}>{saveMsg}</span>}
              </div>
            </div>

            {/* Password */}
            <div style={S.settingsSection}>
              <h2 style={S.settingsSectionTitle}>Change Password</h2>
              <div style={S.settingsGrid}>
                <div style={S.fieldGroup}>
                  <label style={S.label}>New Password</label>
                  <input
                    type="password"
                    style={S.input}
                    className="settings-input"
                    value={pwForm.password}
                    onChange={(e) => setPwForm((f) => ({ ...f, password: e.target.value }))}
                    placeholder="Min. 8 characters"
                  />
                </div>
                <div style={S.fieldGroup}>
                  <label style={S.label}>Confirm Password</label>
                  <input
                    type="password"
                    style={S.input}
                    className="settings-input"
                    value={pwForm.confirm}
                    onChange={(e) => setPwForm((f) => ({ ...f, confirm: e.target.value }))}
                    placeholder="Repeat new password"
                  />
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 24 }}>
                <button style={S.saveBtn} className="save-btn" onClick={savePassword} disabled={pwSaving}>
                  {pwSaving ? "Updating…" : "Update Password"}
                </button>
                {pwMsg && <span style={{ fontSize: 13, fontFamily: "'Helvetica Neue', sans-serif", color: pwMsg.includes("updated") ? "#2e7d32" : "#c62828" }}>{pwMsg}</span>}
              </div>
            </div>

            {/* Danger zone */}
            <div style={{ ...S.settingsSection, borderColor: "#ffcdd2" }}>
              <h2 style={{ ...S.settingsSectionTitle, color: "#c62828" }}>Danger Zone</h2>
              <p style={{ fontSize: 13, fontFamily: "'Helvetica Neue', sans-serif", color: "#888", marginBottom: 20, lineHeight: 1.7 }}>
                Signing out will end your current session. To permanently delete your account, contact us at{" "}
                <a href="mailto:hello@safariyako.co.ke" style={{ color: "#c8a96e" }}>hello@safariyako.co.ke</a>.
              </p>
              <button style={S.signOutDangerBtn} className="sign-out-danger-btn" onClick={handleSignOut}>
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>

      {wizardOpen && (
        <TripWizard
          onClose={() => { setWizardOpen(false); setWizardDests([]); fetchTrips(); }}
          initialDestinations={wizardDests}
        />
      )}
    </div>
  );
}

function TripDetail({ label, value, full, highlight }) {
  return (
    <div style={{ gridColumn: full ? "1 / -1" : "auto" }}>
      <p style={{ fontSize: 10, fontFamily: "'Helvetica Neue', sans-serif", letterSpacing: "0.14em", textTransform: "uppercase", color: "#aaa", margin: "0 0 4px" }}>{label}</p>
      <p style={{ fontSize: 13, fontFamily: "'Helvetica Neue', sans-serif", color: highlight ? "#204E59" : "#333", margin: 0, lineHeight: 1.6, fontWeight: highlight ? 600 : 400, backgroundColor: highlight ? "#e8f1f3" : "transparent", padding: highlight ? "8px 12px" : 0 }}>{value || "—"}</p>
    </div>
  );
}

const S = {
  page: { minHeight: "100vh", backgroundColor: "#f7f4ef", fontFamily: "'Georgia', serif" },

  // Header
  profileHeader: { backgroundColor: "#0c1e14", padding: "48px 24px 0" },
  profileHeaderInner: { maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", gap: 24, paddingBottom: 32, flexWrap: "wrap" },
  avatarWrap: { flexShrink: 0 },
  avatar:        { width: 72, height: 72, borderRadius: "50%", objectFit: "cover", border: "3px solid #c8a96e" },
  avatarInitials: { width: 72, height: 72, borderRadius: "50%", backgroundColor: "#c8a96e", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontFamily: "'Georgia', serif", border: "3px solid rgba(255,255,255,0.2)" },
  profileInfo:   { flex: 1 },
  profileEyebrow: { fontSize: 10, fontFamily: "'Helvetica Neue', sans-serif", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", margin: "0 0 6px" },
  profileName:   { fontSize: 28, fontWeight: 400, color: "#fff", margin: "0 0 4px", letterSpacing: "-0.02em" },
  profileEmail:  { fontSize: 13, fontFamily: "'Helvetica Neue', sans-serif", color: "rgba(255,255,255,0.45)", margin: 0 },
  profileHeaderActions: { display: "flex", gap: 10, flexShrink: 0 },
  buildTripBtn:  { padding: "10px 22px", backgroundColor: "#c8a96e", color: "#fff", border: "none", cursor: "pointer", fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", transition: "background 0.2s" },
  signOutBtn:    { padding: "10px 18px", backgroundColor: "transparent", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.15)", cursor: "pointer", fontFamily: "'Helvetica Neue', sans-serif", fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", transition: "all 0.2s" },

  statPills: { maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", gap: 0, borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 0 },
  statPill:  { padding: "14px 32px 14px 0", display: "flex", flexDirection: "column", gap: 2 },
  statNum:   { fontSize: 22, fontWeight: 400, color: "#c8a96e", letterSpacing: "-0.02em" },
  statLabel: { fontSize: 10, fontFamily: "'Helvetica Neue', sans-serif", color: "rgba(255,255,255,0.35)", letterSpacing: "0.12em", textTransform: "uppercase" },
  statDivider: { width: 1, height: 32, backgroundColor: "rgba(255,255,255,0.08)", margin: "0 32px 0 0" },

  // Tabs
  tabBar:      { backgroundColor: "#fff", borderBottom: "1px solid #ece9e2", position: "sticky", top: 72, zIndex: 40 },
  tabBarInner: { maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "flex", gap: 0 },
  tab: {
    padding: "16px 20px", border: "none", background: "none", cursor: "pointer",
    fontFamily: "'Helvetica Neue', sans-serif", fontSize: 13, color: "#888",
    letterSpacing: "0.02em", borderBottom: "2px solid transparent",
    transition: "color 0.15s, border-color 0.15s", whiteSpace: "nowrap",
  },
  tabActive: { color: "#204E59", borderBottomColor: "#204E59", fontWeight: 600 },

  body: { maxWidth: 1100, margin: "0 auto", padding: "40px 24px 80px" },

  // Loading / empty
  loadingList: { display: "flex", flexDirection: "column", gap: 12 },
  shimmer:     { height: 80, backgroundColor: "#e8e4de", borderRadius: 2 },
  emptyState:  { textAlign: "center", padding: "72px 24px" },
  emptyIcon:   { fontSize: 44, display: "block", marginBottom: 16 },
  emptyTitle:  { fontSize: 22, fontWeight: 400, margin: "0 0 10px", color: "#1a1a1a" },
  emptyText:   { fontSize: 14, fontFamily: "'Helvetica Neue', sans-serif", color: "#888", margin: "0 0 24px", lineHeight: 1.7 },
  emptyBtn:    { display: "inline-block", padding: "12px 28px", backgroundColor: "#204E59", color: "#fff", border: "none", cursor: "pointer", fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", transition: "background 0.2s" },

  // Trips
  tripList: { display: "flex", flexDirection: "column", gap: 12 },
  tripCard: { backgroundColor: "#fff", border: "1px solid #ece9e2", overflow: "hidden", transition: "box-shadow 0.2s" },
  tripCardTop: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", cursor: "pointer", gap: 16 },
  tripCardLeft:  { display: "flex", alignItems: "center", gap: 16, flex: 1, minWidth: 0 },
  tripCardRight: { display: "flex", alignItems: "center", gap: 12, flexShrink: 0 },
  statusDot: { width: 8, height: 8, borderRadius: "50%", flexShrink: 0 },
  tripDests: { fontSize: 16, fontWeight: 400, margin: "0 0 4px", color: "#1a1a1a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  tripMeta:  { fontSize: 12, fontFamily: "'Helvetica Neue', sans-serif", color: "#888", margin: 0 },
  tripNights: { color: "#c8a96e" },
  tripDot:    { margin: "0 6px", color: "#ddd" },
  statusBadge: { fontSize: 10, fontFamily: "'Helvetica Neue', sans-serif", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700, padding: "4px 10px", borderRadius: 2 },
  expandChevron: { fontSize: 12, color: "#bbb" },
  tripExpanded:  { borderTop: "1px solid #f0ece6", padding: "20px 24px", backgroundColor: "#faf9f7" },
  tripDetailGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px 24px", marginBottom: 20 },
  tripExpandedActions: { display: "flex", justifyContent: "flex-end" },
  reTripBtn: { padding: "10px 22px", backgroundColor: "#204E59", color: "#fff", border: "none", cursor: "pointer", fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", transition: "background 0.2s" },

  // Saved destinations
  savedGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 },
  savedCard: { backgroundColor: "#fff", overflow: "hidden", boxShadow: "0 2px 16px rgba(0,0,0,0.07)", transition: "transform 0.2s, box-shadow 0.2s" },
  savedImgWrap: { position: "relative" },
  savedImg:     { width: "100%", height: 180, objectFit: "cover", display: "block" },
  savedImgFallback: { width: "100%", height: 180, backgroundColor: "#e8e4de" },
  savedRegion:  { position: "absolute", top: 12, left: 12, backgroundColor: "#c8a96e", color: "#fff", fontSize: 9, fontFamily: "'Helvetica Neue', sans-serif", letterSpacing: "0.14em", textTransform: "uppercase", padding: "3px 8px" },
  unsaveBtn:    { position: "absolute", top: 10, right: 10, width: 28, height: 28, borderRadius: "50%", border: "none", backgroundColor: "rgba(0,0,0,0.5)", color: "#fff", cursor: "pointer", fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.15s" },
  savedBody:    { padding: "16px 18px 18px" },
  savedTag:     { display: "block", fontSize: 9, fontFamily: "'Helvetica Neue', sans-serif", letterSpacing: "0.14em", textTransform: "uppercase", color: "#c8a96e", marginBottom: 6 },
  savedName:    { fontSize: 18, fontWeight: 400, margin: "0 0 8px", letterSpacing: "-0.01em" },
  savedDesc:    { fontSize: 12, fontFamily: "'Helvetica Neue', sans-serif", color: "#888", lineHeight: 1.65, margin: "0 0 14px" },
  savedPlanBtn: { padding: "8px 16px", backgroundColor: "#204E59", color: "#fff", border: "none", cursor: "pointer", fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", transition: "background 0.2s" },
  planAllBtn:   { padding: "12px 32px", border: "1px solid #204E59", color: "#204E59", backgroundColor: "transparent", cursor: "pointer", fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", transition: "all 0.2s" },

  // Saved activities
  actGrid: { display: "flex", flexDirection: "column", gap: 12 },
  actCard: { backgroundColor: "#fff", display: "flex", alignItems: "center", gap: 0, border: "1px solid #ece9e2", overflow: "hidden", position: "relative", transition: "box-shadow 0.2s" },
  actCardLeft: { flexShrink: 0 },
  actThumb:    { width: 100, height: 90, objectFit: "cover", display: "block" },
  actThumbFallback: { width: 100, height: 90, backgroundColor: "#e8e4de", display: "flex", alignItems: "center", justifyContent: "center" },
  actCardBody:  { flex: 1, padding: "14px 16px" },
  actCategory:  { display: "block", fontSize: 9, fontFamily: "'Helvetica Neue', sans-serif", letterSpacing: "0.14em", textTransform: "uppercase", color: "#c8a96e", marginBottom: 4 },
  actName:      { fontSize: 16, fontWeight: 400, margin: "0 0 4px", letterSpacing: "-0.01em" },
  actDesc:      { fontSize: 12, fontFamily: "'Helvetica Neue', sans-serif", color: "#888", margin: "0 0 8px", lineHeight: 1.6 },
  actMeta:      { display: "flex", gap: 8 },
  actMetaPill:  { fontSize: 10, fontFamily: "'Helvetica Neue', sans-serif", backgroundColor: "#f7f4ef", color: "#666", padding: "3px 8px", letterSpacing: "0.04em" },
  unsaveActBtn: { position: "absolute", top: 10, right: 10, width: 26, height: 26, borderRadius: "50%", border: "none", backgroundColor: "rgba(0,0,0,0.08)", color: "#aaa", cursor: "pointer", fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" },

  // Settings
  settingsWrap:    { display: "flex", flexDirection: "column", gap: 32 },
  settingsSection: { backgroundColor: "#fff", padding: "28px 32px", border: "1px solid #ece9e2" },
  settingsSectionTitle: { fontSize: 18, fontWeight: 400, margin: "0 0 24px", letterSpacing: "-0.01em", paddingBottom: 16, borderBottom: "1px solid #f0ece6" },
  settingsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 24px" },
  fieldGroup:   { display: "flex", flexDirection: "column", gap: 8 },
  label:        { fontSize: 11, fontFamily: "'Helvetica Neue', sans-serif", letterSpacing: "0.12em", textTransform: "uppercase", color: "#666" },
  input:        { padding: "11px 14px", border: "1px solid #ddd8d0", fontSize: 14, fontFamily: "'Helvetica Neue', sans-serif", color: "#1a1a1a", outline: "none", backgroundColor: "#fff", width: "100%", boxSizing: "border-box" },
  fieldNote:    { fontSize: 11, fontFamily: "'Helvetica Neue', sans-serif", color: "#bbb", margin: "4px 0 0" },
  saveBtn:      { padding: "11px 28px", backgroundColor: "#204E59", color: "#fff", border: "none", cursor: "pointer", fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", transition: "background 0.2s" },
  signOutDangerBtn: { padding: "11px 24px", backgroundColor: "transparent", color: "#c62828", border: "1px solid #ffcdd2", cursor: "pointer", fontFamily: "'Helvetica Neue', sans-serif", fontSize: 13, letterSpacing: "0.04em", transition: "all 0.2s" },
};

const css = `
  .build-trip-btn:hover     { background: #b8954f !important; }
  .sign-out-btn:hover       { border-color: rgba(255,255,255,0.4) !important; color: rgba(255,255,255,0.8) !important; }
  .profile-tab:hover        { color: #204E59 !important; }
  .trip-card:hover          { box-shadow: 0 4px 20px rgba(0,0,0,0.09) !important; }
  .re-trip-btn:hover        { background: #163640 !important; }
  .saved-card:hover         { transform: translateY(-3px); box-shadow: 0 8px 28px rgba(0,0,0,0.11) !important; }
  .unsave-btn:hover         { background: rgba(0,0,0,0.75) !important; }
  .unsave-btn:hover         { background: rgba(0,0,0,0.2) !important; color: #c62828 !important; }
  .saved-plan-btn:hover     { background: #163640 !important; }
  .plan-all-btn:hover       { background: #204E59 !important; color: #fff !important; }
  .act-card:hover           { box-shadow: 0 4px 20px rgba(0,0,0,0.09) !important; }
  .save-btn:hover           { background: #163640 !important; }
  .sign-out-danger-btn:hover { background: #fff5f5 !important; }
  .settings-input:focus     { border-color: #c8a96e !important; outline: none; }
  @keyframes shimmer {
    0%   { background-position: -600px 0; }
    100% { background-position:  600px 0; }
  }
  .shimmer {
    background: linear-gradient(90deg, #e8e4de 25%, #f0ece6 50%, #e8e4de 75%);
    background-size: 1200px 100%;
    animation: shimmer 1.5s infinite;
  }
  @media (max-width: 768px) {
    .settings-grid { grid-template-columns: 1fr !important; }
    .profile-header-inner { flex-direction: column; align-items: flex-start !important; }
    .tab-bar-inner { overflow-x: auto; }
  }
`;