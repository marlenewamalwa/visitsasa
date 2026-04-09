import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import signupBg from "../assets/nairobi3.jpg";

export default function Signup() {
  const { signUpWithEmail, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm]   = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [success, setSuccess]   = useState(false);

  const handleEmail = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirm) { setError("Passwords do not match."); return; }
    if (password.length < 8)  { setError("Password must be at least 8 characters."); return; }
    setLoading(true);
    const { error: err } = await signUpWithEmail(email, password, name);
    setLoading(false);
    if (err) { setError(err.message); return; }
    setSuccess(true);
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    const { error: err } = await signInWithGoogle();
    if (err) { setError(err.message); setGoogleLoading(false); }
  };

  return (
    <div style={S.page} className="signup-page">
      <style>{css}</style>

      {/* Left panel */}
      <div style={S.leftPanel} className="auth-left-panel">
        <img src={signupBg} alt="Kenya landscape" style={S.leftBgImg} />
        <div style={S.leftOverlay} />
        <div style={S.leftContent}>
          <span style={S.leftMark}>✦</span>
          <h2 style={S.leftTitle}>Start Your Kenya Journey Today</h2>
          <p style={S.leftSub}>
            Create a free account to build and track custom trips, save your favourite
            destinations, and get personalised recommendations from our team.
          </p>
          <div style={S.benefitList}>
            {[
              "Build unlimited custom trip requests",
              "Track your trip status in real time",
              "Save destinations & activities for later",
              "Dedicated travel specialist assigned to you",
            ].map((b) => (
              <div key={b} style={S.benefit}>
                <span style={S.benefitCheck}>✓</span>
                <span style={S.benefitText}>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div style={S.rightPanel} className="auth-right-panel">
        <div style={S.formWrap}>

          <Link to="/" style={S.logoLink}>
            <span style={S.logoMark}>✦</span>
            <span style={S.logoName}>VisitSasa</span>
          </Link>

          {success ? (
            <div style={S.successBox}>
              <span style={S.successEmoji}>✉</span>
              <h2 style={S.successTitle}>Check your inbox</h2>
              <p style={S.successText}>
                We've sent a confirmation link to <strong>{email}</strong>.
                Click it to activate your account, then sign in.
              </p>
              <Link to="/login" style={S.successBtn} className="submit-btn-link">
                Go to Sign In →
              </Link>
            </div>
          ) : (
            <>
              <div style={S.formHeader}>
                <h1 style={S.formTitle}>Create your account</h1>
                <p style={S.formSub}>
                  Already have one?{" "}
                  <Link to="/login" style={S.authLink} className="auth-link">Sign in</Link>
                </p>
              </div>

              {/* Google */}
              <button
                style={S.googleBtn}
                className="google-btn"
                onClick={handleGoogle}
                disabled={googleLoading}
              >
                {googleLoading
                  ? <span style={S.btnSpinner} className="btn-spinner" />
                  : <GoogleIcon />
                }
                <span>Continue with Google</span>
              </button>

              <div style={S.divider}>
                <div style={S.dividerLine} />
                <span style={S.dividerText}>or sign up with email</span>
                <div style={S.dividerLine} />
              </div>

              <form onSubmit={handleEmail} style={S.form}>
                <div style={S.fieldGroup}>
                  <label style={S.label}>Full Name</label>
                  <input
                    type="text"
                    style={S.input}
                    className="auth-input"
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete="name"
                  />
                </div>

                <div style={S.fieldGroup}>
                  <label style={S.label}>Email Address</label>
                  <input
                    type="email"
                    style={S.input}
                    className="auth-input"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>

                <div style={S.row} className="signup-row">
                  <div style={S.fieldGroup}>
                    <label style={S.label}>Password</label>
                    <input
                      type="password"
                      style={S.input}
                      className="auth-input"
                      placeholder="Min. 8 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      autoComplete="new-password"
                    />
                  </div>
                  <div style={S.fieldGroup}>
                    <label style={S.label}>Confirm Password</label>
                    <input
                      type="password"
                      style={S.input}
                      className="auth-input"
                      placeholder="Repeat password"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      required
                      autoComplete="new-password"
                    />
                  </div>
                </div>

                {password.length > 0 && (
                  <PasswordStrength password={password} />
                )}

                {error && <div style={S.errorBox}>{error}</div>}

                <button
                  type="submit"
                  style={{ ...S.submitBtn, opacity: loading ? 0.7 : 1 }}
                  className="submit-btn"
                  disabled={loading}
                >
                  {loading
                    ? <><span style={S.btnSpinner} className="btn-spinner" /> Creating account…</>
                    : "Create Account →"
                  }
                </button>
              </form>

              <p style={S.footNote}>
                By signing up you agree to our{" "}
                <Link to="/terms" style={S.authLink} className="auth-link">Terms</Link>
                {" "}and{" "}
                <Link to="/privacy" style={S.authLink} className="auth-link">Privacy Policy</Link>.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function PasswordStrength({ password }) {
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];
  const score = checks.filter(Boolean).length;
  const labels = ["Weak", "Fair", "Good", "Strong"];
  const colors = ["#ef5350", "#ff9800", "#66bb6a", "#2e7d32"];

  return (
    <div style={PS.wrap}>
      <div style={PS.bars}>
        {[0,1,2,3].map((i) => (
          <div
            key={i}
            style={{
              ...PS.bar,
              backgroundColor: i < score ? colors[score - 1] : "#ece9e2",
            }}
          />
        ))}
      </div>
      <span style={{ ...PS.label, color: colors[score - 1] || "#aaa" }}>
        {score > 0 ? labels[score - 1] : "Too short"}
      </span>
    </div>
  );
}
const PS = {
  wrap: { display: "flex", alignItems: "center", gap: 10 },
  bars: { display: "flex", gap: 4, flex: 1 },
  bar: { height: 3, flex: 1, borderRadius: 2, transition: "background 0.2s" },
  label: { fontSize: 11, fontFamily: "'Helvetica Neue', sans-serif", letterSpacing: "0.08em", minWidth: 44 },
};

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18">
      <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
      <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
      <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
      <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
    </svg>
  );
}

const S = {
  page: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    minHeight: "100vh",
    fontFamily: "'Georgia', serif",
  },
  leftPanel: {
    position: "relative",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    padding: "60px 56px",
  },
  leftBgImg: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  leftOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(160deg, rgba(10,46,30,0.9) 0%, rgba(26,74,48,0.84) 50%, rgba(12,30,20,0.94) 100%)",
  },
  leftContent: { position: "relative", zIndex: 2, maxWidth: 400 },
  leftMark: { display: "block", fontSize: 32, color: "#c8a96e", marginBottom: 40 },
  leftTitle: {
    fontSize: "clamp(26px, 3.5vw, 42px)",
    fontWeight: 400,
    color: "#fff",
    lineHeight: 1.15,
    letterSpacing: "-0.02em",
    margin: "0 0 20px",
  },
  leftSub: {
    fontSize: 15,
    color: "rgba(255,255,255,0.55)",
    fontFamily: "'Helvetica Neue', sans-serif",
    lineHeight: 1.75,
    marginBottom: 36,
    fontWeight: 300,
  },
  benefitList: { display: "flex", flexDirection: "column", gap: 14 },
  benefit: { display: "flex", gap: 12, alignItems: "flex-start" },
  benefitCheck: { color: "#c8a96e", fontSize: 14, marginTop: 1, flexShrink: 0 },
  benefitText: {
    fontSize: 14,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "rgba(255,255,255,0.65)",
    lineHeight: 1.5,
  },

  rightPanel: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "48px 24px",
    backgroundColor: "#fff",
    overflowY: "auto",
  },
  formWrap: { width: "100%", maxWidth: 460 },

  logoLink: {
    display: "flex", alignItems: "center", gap: 10,
    textDecoration: "none", marginBottom: 40,
  },
  logoMark: { fontSize: 18, color: "#c8a96e" },
  logoName: { fontSize: 16, fontFamily: "'Georgia', serif", color: "#1a1a1a" },

  formHeader: { marginBottom: 28 },
  formTitle: {
    fontSize: 30, fontWeight: 400, margin: "0 0 10px",
    letterSpacing: "-0.02em", color: "#1a1a1a",
  },
  formSub: {
    fontSize: 14, fontFamily: "'Helvetica Neue', sans-serif",
    color: "#888", margin: 0,
  },

  googleBtn: {
    width: "100%", padding: "12px 20px",
    border: "1.5px solid #e0ddd6", backgroundColor: "#fff",
    cursor: "pointer", display: "flex", alignItems: "center",
    justifyContent: "center", gap: 12, fontSize: 14,
    fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 500,
    color: "#333", transition: "border-color 0.2s, background 0.2s",
    marginBottom: 24,
  },
  divider: { display: "flex", alignItems: "center", gap: 12, marginBottom: 24 },
  dividerLine: { flex: 1, height: 1, backgroundColor: "#ece9e2" },
  dividerText: {
    fontSize: 11, fontFamily: "'Helvetica Neue', sans-serif",
    color: "#bbb", letterSpacing: "0.08em", whiteSpace: "nowrap",
    textTransform: "uppercase",
  },

  form: { display: "flex", flexDirection: "column", gap: 18, marginBottom: 16 },
  row: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  fieldGroup: { display: "flex", flexDirection: "column", gap: 8 },
  label: {
    fontSize: 11, fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.12em", textTransform: "uppercase", color: "#888",
  },
  input: {
    padding: "12px 14px", border: "1.5px solid #ddd8d0",
    fontSize: 14, fontFamily: "'Helvetica Neue', sans-serif",
    color: "#1a1a1a", outline: "none", width: "100%",
    boxSizing: "border-box", transition: "border-color 0.2s",
    backgroundColor: "#fff",
  },
  errorBox: {
    padding: "12px 14px", backgroundColor: "#fff5f5",
    border: "1px solid #ffcdd2", color: "#c62828",
    fontSize: 13, fontFamily: "'Helvetica Neue', sans-serif",
  },
  submitBtn: {
    padding: "13px 24px", backgroundColor: "#1a2f2a", color: "#fff",
    border: "none", cursor: "pointer",
    fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 600,
    fontSize: 14, letterSpacing: "0.06em", textTransform: "uppercase",
    transition: "background 0.2s, transform 0.15s",
    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
  },
  btnSpinner: {
    display: "inline-block", width: 14, height: 14,
    border: "2px solid rgba(255,255,255,0.3)",
    borderTop: "2px solid #fff", borderRadius: "50%",
  },
  authLink: {
    color: "#c8a96e", textDecoration: "none",
    fontWeight: 500, transition: "color 0.15s",
  },
  footNote: {
    fontSize: 11, fontFamily: "'Helvetica Neue', sans-serif",
    color: "#bbb", lineHeight: 1.6, marginTop: 4,
  },

  successBox: {
    display: "flex", flexDirection: "column",
    alignItems: "flex-start", gap: 16, paddingTop: 20,
  },
  successEmoji: { fontSize: 44 },
  successTitle: { fontSize: 28, fontWeight: 400, margin: 0, letterSpacing: "-0.02em" },
  successText: {
    fontSize: 15, color: "#555", fontFamily: "'Helvetica Neue', sans-serif",
    lineHeight: 1.75, margin: 0,
  },
  successBtn: {
    display: "inline-block", marginTop: 8, padding: "13px 24px",
    backgroundColor: "#1a2f2a", color: "#fff", textDecoration: "none",
    fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 600,
    fontSize: 13, letterSpacing: "0.06em", textTransform: "uppercase",
    transition: "background 0.2s",
  },
};

const css = `
  .auth-input:focus { border-color: #c8a96e !important; }
  .auth-link:hover { color: #b8954f !important; }
  .google-btn:hover { border-color: #c8a96e !important; background: #fdf9f2 !important; }
  .submit-btn:hover, .submit-btn-link:hover { background-color: #c8a96e !important; transform: translateY(-1px); }
  .btn-spinner { animation: spin 0.8s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }

  @media (max-width: 768px) {
    .signup-page { grid-template-columns: 1fr !important; }
    .auth-left-panel { display: none !important; }
    .auth-right-panel { padding: 40px 24px !important; align-items: flex-start !important; padding-top: 56px !important; }
    .signup-row { grid-template-columns: 1fr !important; }
  }
  @media (max-width: 480px) {
    .auth-right-panel { padding: 36px 16px !important; }
  }
`;