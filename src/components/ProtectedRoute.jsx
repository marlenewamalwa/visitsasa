import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={S.wrap}>
        <style>{css}</style>
        <div style={S.spinner} className="auth-spinner" />
        <p style={S.text}>Loading…</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

const S = {
  wrap: {
    minHeight: "60vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    backgroundColor: "#fff",
  },
  spinner: {
    width: 32,
    height: 32,
    border: "2px solid #ece9e2",
    borderTop: "2px solid #c8a96e",
    borderRadius: "50%",
  },
  text: {
    fontSize: 13,
    fontFamily: "'Helvetica Neue', sans-serif",
    color: "#aaa",
    letterSpacing: "0.06em",
  },
};

const css = `
  .auth-spinner { animation: spin 0.8s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }
`;