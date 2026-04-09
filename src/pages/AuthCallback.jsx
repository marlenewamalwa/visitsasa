import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/profile", { replace: true });
      } else {
        // Session not ready yet, listen for it
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
          if (event === "SIGNED_IN" && session) {
            subscription.unsubscribe();
            navigate("/profile", { replace: true });
          } else if (event === "SIGNED_OUT" || !session) {
            subscription.unsubscribe();
            navigate("/login", { replace: true });
          }
        });
      }
    });
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