import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for auth state change first, before checking session
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        subscription.unsubscribe();
        navigate("/profile", { replace: true });
      }
      // Don't handle SIGNED_OUT here — it fires on initial load with no session
    });

    // Also check if session already exists (handles page refresh cases)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        subscription.unsubscribe();
        navigate("/profile", { replace: true });
      }
    });

    // Safety fallback — if nothing happens in 8 seconds, go to login
    const fallback = setTimeout(() => {
      subscription.unsubscribe();
      navigate("/login", { replace: true });
    }, 8000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#0c1e14" }}>
      <div style={{ textAlign: "center", color: "#fff", fontFamily: "'Helvetica Neue', sans-serif" }}>
        <div style={{ fontSize: 32, marginBottom: 16 }}>✦</div>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Signing you in…
        </p>
      </div>
    </div>
  );
}