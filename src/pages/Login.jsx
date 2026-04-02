import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { signInWithEmail, signInWithGoogle } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();
  const from      = location.state?.from?.pathname || "/profile";

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleEmail = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error: err } = await signInWithEmail(email, password);
    setLoading(false);
    if (err) {
      setError(friendlyError(err.message));
    } else {
      navigate(from, { replace: true });
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    const { error: err } = await signInWithGoogle();
    if (err) { setError(err.message); setGoogleLoading(false); }
    // On success Supabase redirects automatically
  };

  return (
    <div style={S.page}>
      <style>{css}</style>

      {/* Left panel — decorative */}
      <div style={S.leftPanel}>
        <div style={S.leftOverlay} />
        <div style={S.leftContent}>
          <span style={S.leftMark}>✦</span>
          <h2 style={S.leftTitle}>Kenya's Most Extraordinary Journeys</h2>
          <p style={S.leftSub}>Sign in to manage your trips, save destinations, and pick up where you left off.</p>
          <div style={S.leftQuote}>
            <p style={S.quoteText}>"Not all those who wander are lost — but the ones with a plan have a better time."</p>
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div style={S.rightPanel}>
        <div style={S.formWrap}>

          {/* Logo */}
          <Link to="/" style={S.logoLink}>
            <span style={S.logoMark}>✦</span>
            <span style={S.logoName}>Safari Yako</span>
          </Link>

          <div style={S.formHeader}>
            <h1 style={S.formTitle}>Welcome back</h1>
            <p style={S.formSub}>
              Don't have an account?{" "}
              <Link to="/signup" style={S.authLink} className="auth-link">
                Sign up free
              </Link>
            </p>
          </div>

          {/* Google */}
          <button
            style={S.googleBtn}
            className="google-btn"
            onClick={handleGoogle}
            disabled={googleLoading}
          >
            {googleLoading ? (
              <span style={S.btnSpinner} className="btn-spinner" />
            ) : (
              <GoogleIcon />
            )}
            <span>Continue with Google</span>
          </button>

          {/* Divider */}
          <div style={S.divider}>
            <div style={S.dividerLine} />
            <span style={S.dividerText}>or sign in with email</span>
            <div style={S.dividerLine} />
          </div>

          {/* Form */}
          <form onSubmit={handleEmail} style={S.form}>
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

            <div style={S.fieldGroup}>
              <div style={S.labelRow}>
                <label style={S.label}>Password</label>
                <Link to="/forgot-password" style={S.forgotLink} className="auth-link">
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                style={S.input}
                className="auth-input"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>

            {error && <div style={S.errorBox}>{error}</div>}

            <button
              type="submit"
              style={{ ...S.submitBtn, opacity: loading ? 0.7 : 1 }}
              className="submit-btn"
              disabled={loading}
            >
              {loading
                ? <><span style={S.btnSpinner} className="btn-spinner" /> Signing in…</>
                : "Sign In →"
              }
            </button>
          </form>

          <p style={S.footNote}>
            By signing in you agree to our{" "}
            <Link to="/terms" style={S.authLink} className="auth-link">Terms</Link>
            {" "}and{" "}
            <Link to="/privacy" style={S.authLink} className="auth-link">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}

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

function friendlyError(msg) {
  if (msg.includes("Invalid login")) return "Incorrect email or password. Please try again.";
  if (msg.includes("Email not confirmed")) return "Please verify your email address first.";
  return msg;
}

/* ── STYLES ── */
const S = {
  page: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    minHeight: "100vh",
    fontFamily: "'Georgia', serif",
  },

  leftPanel: {
    position: "relative",
    background: "linear-gradient(160deg, #0a2e1e 0%, #1a4a30 50%, #0c1e14 100%)",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    padding: "60px 56px",
  },
  leftOverlay: {
    position: "absolute",
    inset: 0,
    backgroundImage: `radial-gradient(ellipse at 80% 20%, rgba(200,169,110,0.12) 0%, transparent 60%),
      radial-gradient(ellipse at 20% 80%, rgba(200,169,110,0.06) 0%, transparent 50%)`,
  },
  leftContent: {
    position: "relative",
    zIndex: 2,
    maxWidth: 400,
  },
  leftMark: {
    display: "block",
    fontSize: 32,
    color: "#c8a96e",
    marginBottom: 40,
  },
  leftTitle: {
    fontSize: "clamp(28px, 3.5vw, 44px)",
    fontWeight: 400,
    color: "#fff",
    lineHeight: 1.15,
    letterSpacing: "-0.02em",
    margin: "0 0 20px",
  },
  leftSub: {
    fontSize: 15,
    color: "rgba(255,255,255,0.58)",
    fontFamily: "'Helvetica Neue', sans-serif",
    lineHeight: 1.75,
    marginBottom: 48,
    fontWeight: 300,
  },
  leftQuote: {
    borderLeft: "2px solid #c8a96e",
    paddingLeft: 20,
  },
  quoteText: {
    fontSize: 13,
    color: "rgba(255,255,255,0.4)",
    fontFamily: "'Georgia', serif",
    fontStyle: "italic",
    lineHeight: 1.7,
    margin: 0,
  },

  rightPanel: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 24px",
    backgroundColor: "#fff",
    overflowY: "auto",
  },
  formWrap: {
    width: "100%",
    maxWidth: 400,
    display: "flex",
    flexDirection: "column",
    gap: 0,
  },

  logoLink: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    textDecoration: "none",
    marginBottom: 48,
  },
  logoMark: { fontSize: 18, color: "#c8a96e" },
  logoName: {
    fontSize: 16,
    fontFamily: "'Georgia', serif",
    color: "#1a1a1a",
    letterSpacing: "0.01em",
  },

  formHeader: { marginBottom: 32 },
  formTitle: {
    fontSize: 32,
    fontWeight: 400,
    margin: "0 0 10px",
    letterSpacing: "-0.02em",
    color: "#1a1a1a",
  },
  formSub: {
    fontSize: 14,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#888",
    margin: 0,
  },

  googleBtn: {
    width: "100%",
    padding: "12px 20px",
    border: "1.5px solid #e0ddd6",
    backgroundColor: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    fontSize: 14,
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 500,
    color: "#333",
    transition: "border-color 0.2s, background 0.2s",
    marginBottom: 24,
  },

  divider: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 28,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: "#ece9e2" },
  dividerText: {
    fontSize: 11,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#bbb",
    letterSpacing: "0.08em",
    whiteSpace: "nowrap",
    textTransform: "uppercase",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    marginBottom: 20,
  },
  fieldGroup: { display: "flex", flexDirection: "column", gap: 8 },
  labelRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 11,
    fontFamily: "'Helvetica Neue', sans-serif",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#888",
  },
  forgotLink: {
    fontSize: 12,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#aaa",
    textDecoration: "none",
    transition: "color 0.15s",
  },
  input: {
    padding: "12px 14px",
    border: "1.5px solid #ddd8d0",
    fontSize: 14,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#1a1a1a",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
    backgroundColor: "#fff",
  },

  errorBox: {
    padding: "12px 14px",
    backgroundColor: "#fff5f5",
    border: "1px solid #ffcdd2",
    color: "#c62828",
    fontSize: 13,
    fontFamily: "'Helvetica Neue', sans-serif",
    lineHeight: 1.5,
  },

  submitBtn: {
    padding: "13px 24px",
    backgroundColor: "#1a2f2a",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 600,
    fontSize: 14,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    transition: "background 0.2s, transform 0.15s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  btnSpinner: {
    display: "inline-block",
    width: 14,
    height: 14,
    border: "2px solid rgba(255,255,255,0.3)",
    borderTop: "2px solid #fff",
    borderRadius: "50%",
  },

  authLink: {
    color: "#c8a96e",
    textDecoration: "none",
    fontWeight: 500,
    transition: "color 0.15s",
  },
  footNote: {
    fontSize: 11,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#bbb",
    lineHeight: 1.6,
    marginTop: 4,
  },
};

const css = `
  .auth-input:focus { border-color: #c8a96e !important; }
  .auth-link:hover { color: #b8954f !important; }
  .google-btn:hover { border-color: #c8a96e !important; background: #fdf9f2 !important; }
  .submit-btn:hover { background-color: #c8a96e !important; transform: translateY(-1px); }
  .btn-spinner { animation: spin 0.8s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }

  @media (max-width: 768px) {
    .login-page { grid-template-columns: 1fr !important; }
    .left-panel { display: none !important; }
    .right-panel { padding: 40px 24px !important; }
  }
`;