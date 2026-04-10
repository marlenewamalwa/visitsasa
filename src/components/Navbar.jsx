import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import TripWizard from "./TripWizard";
import { supabase } from "../supabaseClient";
import logo from "../assets/visitsasa.jpg";

const NAV_LINKS = [
  { label: "Destinations", to: "/destinations" },
  { label: "Activities",   to: "/activities"   },
];

const MORE_LINKS = [
  { label: "How It Works", to: "/howitworks"  },
  { label: "Travel Tips",  to: "/travel-tips" },
  { label: "Contact Us",   to: "/contact"     },
];

const STATIC_PAGES = [
  { id: "p1", type: "page", displayName: "How It Works", displayDesc: "Learn how our trip planning works.",    path: "/howitworks"  },
  { id: "p2", type: "page", displayName: "Travel Tips",  displayDesc: "Tips and guides for travelling Kenya.", path: "/travel-tips" },
  { id: "p3", type: "page", displayName: "Contact Us",   displayDesc: "Get in touch with our team.",           path: "/contact"     },
  { id: "p4", type: "page", displayName: "About Us",     displayDesc: "The story behind VisitSasa.",         path: "/about"       },
];

const TYPE_LABEL = { destination: "Destination", activity: "Activity", tip: "Travel Tip", page: "Page" };

function highlight(text = "", query = "") {
  if (!query.trim() || !text) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts   = text.split(new RegExp(`(${escaped})`, "gi"));
  return parts.map((p, i) =>
    p.toLowerCase() === query.toLowerCase()
      ? <mark key={i} style={{ background: "#c8a96e33", color: "#7a5c1e", fontWeight: 600, borderRadius: 2 }}>{p}</mark>
      : p
  );
}

export default function Navbar() {
  const { pathname }               = useLocation();
  const navigate                   = useNavigate();
  const { user, profile, signOut } = useAuth();

  const [menuOpen,     setMenuOpen]     = useState(false);
  const [wizardOpen,   setWizardOpen]   = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [moreOpen,     setMoreOpen]     = useState(false);
  const [searchOpen,   setSearchOpen]   = useState(false);
  const [searchQuery,  setSearchQuery]  = useState("");
  const [searchResults,setSearchResults]= useState([]);
  const [searchLoading,setSearchLoading]= useState(false);
  const [activeIdx,    setActiveIdx]    = useState(-1);

  const drawerRef   = useRef(null);
  const userMenuRef = useRef(null);
  const moreRef     = useRef(null);
  const searchRef   = useRef(null);
  const searchInput = useRef(null);

  const displayName  = profile?.full_name || user?.user_metadata?.full_name || user?.email?.split("@")[0] || "";
  const initials     = displayName ? displayName.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2) : "?";
  const avatarUrl    = user?.user_metadata?.avatar_url;
  const isMoreActive = MORE_LINKS.some((l) => l.to === pathname);

  useEffect(() => {
    setMenuOpen(false); setUserMenuOpen(false); setMoreOpen(false);
    setSearchOpen(false); setSearchQuery("");
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen || wizardOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, wizardOpen]);

  useEffect(() => {
    const handler = (e) => {
      if (menuOpen     && drawerRef.current   && !drawerRef.current.contains(e.target))   setMenuOpen(false);
      if (userMenuOpen && userMenuRef.current && !userMenuRef.current.contains(e.target)) setUserMenuOpen(false);
      if (moreOpen     && moreRef.current     && !moreRef.current.contains(e.target))     setMoreOpen(false);
      if (searchOpen   && searchRef.current   && !searchRef.current.contains(e.target))   { setSearchOpen(false); setSearchQuery(""); }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen, userMenuOpen, moreOpen, searchOpen]);

  const handleSignOut = async () => { await signOut(); navigate("/"); };
  // ── Search ────────────────────────────────────────────────────────────────
  const doSearch = useCallback(async (q) => {
    if (!q.trim()) { setSearchResults([]); setSearchLoading(false); return; }
    setSearchLoading(true);
    const [destRes, actRes, tipRes] = await Promise.all([
      supabase.from("destinations").select("id, name, description, image_url").ilike("name", `%${q}%`).limit(3),
      supabase.from("activities").select("id, name, description").ilike("name", `%${q}%`).limit(3),
      supabase.from("travel_tips").select("id, title, excerpt").ilike("title", `%${q}%`).limit(2),
    ]);
    const destinations = (destRes.data || []).map((d) => ({ ...d, type: "destination", displayName: d.name,  displayDesc: d.description, path: `/destinations?q=${encodeURIComponent(d.name)}`  }));
    const activities   = (actRes.data  || []).map((a) => ({ ...a, type: "activity",    displayName: a.name,  displayDesc: a.description, path: `/activities?q=${encodeURIComponent(a.name)}`   }));
    const tips         = (tipRes.data  || []).map((t) => ({ ...t, type: "tip",         displayName: t.title, displayDesc: t.excerpt,     path: `/travel-tips?q=${encodeURIComponent(t.title)}` }));
    const pages        = STATIC_PAGES.filter((p) => p.displayName.toLowerCase().includes(q.toLowerCase()));
    setSearchResults([...destinations, ...activities, ...tips, ...pages]);
    setSearchLoading(false);
  }, []);

  useEffect(() => {
    setActiveIdx(-1);
    if (!searchQuery.trim()) { setSearchResults([]); return; }
    const t = setTimeout(() => doSearch(searchQuery), 260);
    return () => clearTimeout(t);
  }, [searchQuery, doSearch]);

  const goToFullResults = () => {
    if (!searchQuery.trim()) return;
    navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    setSearchOpen(false); setSearchQuery("");
  };

  const handleSearchKey = (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActiveIdx((v) => Math.min(v + 1, searchResults.length)); }
    if (e.key === "ArrowUp")   { e.preventDefault(); setActiveIdx((v) => Math.max(v - 1, -1)); }
    if (e.key === "Escape")    { setSearchOpen(false); setSearchQuery(""); }
    if (e.key === "Enter") {
      e.preventDefault();
      if (activeIdx >= 0 && activeIdx < searchResults.length) { navigate(searchResults[activeIdx].path); setSearchOpen(false); setSearchQuery(""); }
      else goToFullResults();
    }
  };

  const openSearch = () => {
    setSearchOpen(true); setMoreOpen(false); setUserMenuOpen(false);
    setTimeout(() => searchInput.current?.focus(), 60);
  };

  return (
    <>
      <style>{css}</style>

      <header style={S.header}>
        <div style={S.inner}>

          {/* LOGO */}
          <Link to="/" style={S.logo}>
            <img src={logo} alt="VisitSasa" style={S.logoImg} />
          </Link>

          {/* DESKTOP NAV */}
          <nav style={S.desktopNav} className="desktop-nav">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.to;
              return (
                <Link key={link.to} to={link.to}
                  style={{ ...S.navLink, color: active ? "#c8a96e" : "rgba(255,255,255,0.82)" }}
                  className="nav-link"
                >
                  {link.label}
                  {active && <span style={S.activeDot} />}
                </Link>
              );
            })}
            <div style={S.moreWrap} ref={moreRef}>
              <button
                style={{ ...S.navLink, ...S.moreBtn, color: isMoreActive ? "#c8a96e" : "rgba(255,255,255,0.82)" }}
                className="nav-link more-btn"
                onClick={() => setMoreOpen((v) => !v)}
              >
                More
                <span style={{ ...S.moreChevron, transform: moreOpen ? "rotate(180deg)" : "rotate(0deg)" }}>▾</span>
                {isMoreActive && <span style={S.activeDot} />}
              </button>
              {moreOpen && (
                <div style={S.moreDropdown}>
                  {MORE_LINKS.map((link) => (
                    <Link key={link.to} to={link.to}
                      style={{ ...S.moreDropdownItem, color: pathname === link.to ? "#c8a96e" : "#333" }}
                      className="more-dropdown-item"
                      onClick={() => setMoreOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* SEARCH */}
          <div style={S.searchArea} ref={searchRef} className="search-area">
            {searchOpen ? (
              <div style={S.searchBox}>
                <svg style={S.searchIcon} viewBox="0 0 20 20" fill="none">
                  <circle cx="8.5" cy="8.5" r="5.5" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
                  <path d="M13 13l3.5 3.5" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <input
                  ref={searchInput}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearchKey}
                  placeholder="Search destinations, activities…"
                  style={S.searchInput}
                />
                {searchLoading && <div style={S.searchSpinner} className="search-spinner" />}
                {searchQuery && !searchLoading && (
                  <button style={S.searchClear} onClick={() => { setSearchQuery(""); setSearchResults([]); searchInput.current?.focus(); }}>✕</button>
                )}
                <button style={S.searchClose} className="search-close-btn" onClick={() => { setSearchOpen(false); setSearchQuery(""); }}>✕</button>

                {searchOpen && (searchResults.length > 0 || (searchQuery && !searchLoading)) && (
                  <div style={S.searchDropdown}>
                    {searchResults.length === 0 ? (
                      <div style={S.searchEmpty}>No results for "<strong>{searchQuery}</strong>"</div>
                    ) : (
                      <>
                        {searchResults.map((item, i) => (
                          <div key={item.id}
                            style={{ ...S.searchResult, backgroundColor: i === activeIdx ? "#fdf9f3" : "transparent" }}
                            className="search-result-item"
                            onMouseEnter={() => setActiveIdx(i)}
                            onMouseLeave={() => setActiveIdx(-1)}
                            onClick={() => { navigate(item.path); setSearchOpen(false); setSearchQuery(""); }}
                          >
                            {item.image_url && <img src={item.image_url} alt="" style={S.searchThumb} />}
                            <div style={S.searchResultText}>
                              <p style={S.searchResultName}>{highlight(item.displayName, searchQuery)}</p>
                              {item.displayDesc && <p style={S.searchResultDesc}>{item.displayDesc.slice(0, 70)}{item.displayDesc.length > 70 ? "…" : ""}</p>}
                            </div>
                            <span style={S.searchResultTag}>{TYPE_LABEL[item.type]}</span>
                          </div>
                        ))}
                        <button
                          style={{ ...S.searchSeeAll, backgroundColor: activeIdx === searchResults.length ? "#fdf9f3" : "#faf8f5" }}
                          onMouseEnter={() => setActiveIdx(searchResults.length)}
                          onMouseLeave={() => setActiveIdx(-1)}
                          onClick={goToFullResults}
                        >
                          See all results for "<strong style={{ color: "#1a1a1a" }}>{searchQuery}</strong>" →
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <button style={S.searchToggle} className="search-toggle" onClick={openSearch} aria-label="Search">
                <svg viewBox="0 0 20 20" fill="none" style={{ width: 18, height: 18 }}>
                  <circle cx="8.5" cy="8.5" r="5.5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
                  <path d="M13 13l3.5 3.5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </div>

          {/* DESKTOP ACTIONS */}
          <div style={S.desktopActions} className="desktop-actions">
            {user ? (
              <>
                <button style={S.ctaBtn} className="nav-cta" onClick={() => setWizardOpen(true)}>Build My Trip</button>
                <div style={S.userMenuWrap} ref={userMenuRef}>
                  <button style={S.avatarBtn} className="avatar-btn" onClick={() => setUserMenuOpen((v) => !v)}>
                    {avatarUrl ? <img src={avatarUrl} alt={displayName} style={S.avatarImg} /> : <div style={S.avatarInitials}>{initials}</div>}
                  </button>
                  {userMenuOpen && (
                    <div style={S.userDropdown}>
                      <div style={S.dropdownHeader}>
                        <p style={S.dropdownName}>{displayName}</p>
                        <p style={S.dropdownEmail}>{user.email}</p>
                      </div>
                      <Link to="/profile" style={S.dropdownItem} className="dropdown-item" onClick={() => setUserMenuOpen(false)}>My Profile</Link>
                      <div style={S.dropdownDivider} />
                      <button style={S.dropdownSignOut} className="dropdown-sign-out" onClick={handleSignOut}>Sign Out</button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login" style={S.loginLink} className="nav-login">Sign In</Link>
                <button style={S.ctaBtn} className="nav-cta" onClick={() => setWizardOpen(true)}>Build My Trip</button>
              </>
            )}
          </div>

          {/* HAMBURGER */}
          <button style={S.hamburger} className="hamburger" onClick={() => setMenuOpen((v) => !v)}>
            <span style={{ ...S.hamburgerBar, transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none" }} />
            <span style={{ ...S.hamburgerBar, opacity: menuOpen ? 0 : 1 }} />
            <span style={{ ...S.hamburgerBar, transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none" }} />
          </button>
        </div>
      </header>

      {/* OVERLAY */}
      <div style={{ ...S.drawerOverlay, opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? "all" : "none" }} onClick={() => setMenuOpen(false)} />

      {/* MOBILE DRAWER */}
      <div ref={drawerRef} style={{ ...S.drawer, transform: menuOpen ? "translateX(0)" : "translateX(100%)" }}>
        <div style={S.drawerHeader}>
          <img src={logo} alt="VisitSasa" style={S.drawerLogo} />
          <button style={S.drawerClose} className="drawer-close" onClick={() => setMenuOpen(false)}>✕</button>
        </div>

        {/* Mobile search */}
        <div style={S.drawerSearch}>
          <svg style={{ width: 14, height: 14, flexShrink: 0 }} viewBox="0 0 20 20" fill="none">
            <circle cx="8.5" cy="8.5" r="5.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
            <path d="M13 13l3.5 3.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            placeholder="Search…"
            style={S.drawerSearchInput}
            onKeyDown={(e) => { if (e.key === "Enter" && e.target.value.trim()) { setMenuOpen(false); navigate(`/search?q=${encodeURIComponent(e.target.value.trim())}`); } }}
          />
        </div>

        {user && (
          <Link to="/profile" style={S.drawerUserStrip} className="drawer-user-strip" onClick={() => setMenuOpen(false)}>
            <div>{avatarUrl ? <img src={avatarUrl} alt={displayName} style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover" }} /> : <div style={{ ...S.avatarInitials, width: 32, height: 32, fontSize: 12 }}>{initials}</div>}</div>
            <div>
              <p style={S.drawerUserName}>{displayName}</p>
              <p style={S.drawerUserLabel}>View profile →</p>
            </div>
          </Link>
        )}

        <nav style={S.drawerNav}>
          {[...NAV_LINKS, ...MORE_LINKS].map((link, i) => {
            const active = pathname === link.to;
            return (
              <Link key={link.to} to={link.to}
                style={{ ...S.drawerLink, color: active ? "#c8a96e" : "#fff", animationDelay: `${i * 50}ms` }}
                className={menuOpen ? "drawer-link-animate" : ""}
                onClick={() => setMenuOpen(false)}
              >
                <span style={S.drawerLinkNum}>0{i + 1}</span>
                <span style={S.drawerLinkLabel}>{link.label}</span>
                {active && <span style={{ fontSize: 7, color: "#c8a96e" }}>●</span>}
                <span style={S.drawerArrow}>→</span>
              </Link>
            );
          })}
        </nav>

        <div style={S.drawerCta}>
          <button style={S.drawerCtaBtn} className="drawer-cta-btn" onClick={() => { setMenuOpen(false); setWizardOpen(true); }}>
            ✦ &nbsp; Start Building My Trip
          </button>
          <p style={S.drawerCtaNote}>Free to plan · No commitment · 24hr response</p>
        </div>

        <div style={S.drawerFooter}>
          {user ? (
            <button style={S.drawerSignOut} className="drawer-footer-link" onClick={handleSignOut}>Sign Out</button>
          ) : (
            <>
              <Link to="/login"  style={S.drawerFooterLink} className="drawer-footer-link" onClick={() => setMenuOpen(false)}>Sign In</Link>
              <Link to="/signup" style={S.drawerFooterLink} className="drawer-footer-link" onClick={() => setMenuOpen(false)}>Create Account</Link>
            </>
          )}
          <a href="mailto:hello@VisitSasa.co.ke" style={S.drawerFooterLink} className="drawer-footer-link">hello@VisitSasa.co.ke</a>
        </div>
      </div>

      {wizardOpen && <TripWizard onClose={() => setWizardOpen(false)} />}
    </>
  );
}

const S = {
  header: {
    position: "", top: 0, left: 0, right: 0, zIndex: 100,
    backgroundColor: "#1E4D56",
    boxShadow: "0 1px 0 rgba(255,255,255,0.06)",
    
  },
  inner: {
    maxWidth: 1200, margin: "0 auto", padding: "0 24px",
    height: 72, display: "flex", alignItems: "center",
    justifyContent: "space-between", gap: 20,
  },
  logo:    { display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0 },
  logoImg: { height: 70, width: "auto", display: "block" },

  desktopNav: { display: "flex", alignItems: "center", gap: 4, flex: 1, justifyContent: "center" },
  navLink: {
    position: "relative", padding: "8px 14px", fontSize: 13, 
    fontFamily: "'Helvetica Neue', sans-serif", letterSpacing: "0.04em",
    textDecoration: "none", transition: "color 0.2s", background: "none", border: "none", cursor: "pointer",
  },
  activeDot: {
    position: "absolute", bottom: 2, left: "50%", transform: "translateX(-50%)",
    width: 4, height: 4, borderRadius: "50%", backgroundColor: "#c8a96e",
  },
  moreWrap:      { position: "relative" },
  moreBtn:       { display: "flex", alignItems: "center", gap: 5 },
  moreChevron:   { fontSize: 11, color: "rgba(255,255,255,0.5)", display: "inline-block", transition: "transform 0.2s ease", marginTop: 1 },
  moreDropdown: {
    position: "absolute", top: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)",
    backgroundColor: "#fff", border: "1px solid #ece9e2",
    boxShadow: "0 8px 32px rgba(0,0,0,0.12)", minWidth: 180, zIndex: 200,
    animation: "fadeDown 0.18s ease",
  },
  moreDropdownItem: {
    display: "block", padding: "13px 20px", textDecoration: "none", fontSize: 13,
    fontFamily: "'Helvetica Neue', sans-serif", letterSpacing: "0.02em",
    borderBottom: "1px solid #f5f2ee", transition: "background 0.15s, color 0.15s",
  },

  // Search
  searchArea:   { position: "relative", display: "flex", alignItems: "center" },
  searchToggle: { background: "none", border: "none", cursor: "pointer", padding: 8, display: "flex", alignItems: "center", justifyContent: "center" },
  searchBox: {
    position: "relative", display: "flex", alignItems: "center", gap: 6,
    backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
    padding: "0 10px", height: 38, width: 260,
  },
  searchIcon:    { width: 15, height: 15, flexShrink: 0 },
  searchInput: {
    flex: 1, background: "none", border: "none", outline: "none",
    color: "#fff", fontSize: 13, fontFamily: "'Helvetica Neue', sans-serif",
  },
  searchSpinner: { width: 13, height: 13, flexShrink: 0, border: "2px solid rgba(255,255,255,0.15)", borderTop: "2px solid #c8a96e", borderRadius: "50%" },
  searchClear:   { background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.4)", fontSize: 11, padding: "0 2px", flexShrink: 0 },
  searchClose:   { background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.5)", fontSize: 14, padding: "0 2px 0 8px", flexShrink: 0, borderLeft: "1px solid rgba(255,255,255,0.1)", marginLeft: 4 },
  searchDropdown: {
    position: "absolute", top: "calc(100% + 8px)", left: 0,
    backgroundColor: "#fff", border: "1px solid #ece9e2",
    boxShadow: "0 12px 40px rgba(0,0,0,0.14)", zIndex: 300,
    maxHeight: 400, overflowY: "auto", minWidth: 320,
  },
  searchResult: { display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", cursor: "pointer", borderBottom: "1px solid #faf8f5", transition: "background 0.12s" },
  searchThumb:  { width: 38, height: 30, objectFit: "cover", flexShrink: 0 },
  searchResultText: { flex: 1, minWidth: 0 },
  searchResultName: { fontSize: 13, fontFamily: "'Georgia', serif", margin: "0 0 2px", color: "#1a1a1a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  searchResultDesc: { fontSize: 11, fontFamily: "'Helvetica Neue', sans-serif", color: "#aaa", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  searchResultTag:  { fontSize: 9, fontFamily: "'Helvetica Neue', sans-serif", letterSpacing: "0.1em", textTransform: "uppercase", color: "#bbb", flexShrink: 0 },
  searchEmpty:  { padding: "20px 16px", fontSize: 13, fontFamily: "'Helvetica Neue', sans-serif", color: "#888", textAlign: "center" },
  searchSeeAll: { display: "block", width: "100%", padding: "12px 14px", border: "none", borderTop: "1px solid #ece9e2", cursor: "pointer", fontSize: 12, fontFamily: "'Helvetica Neue', sans-serif", color: "#666", textAlign: "left", transition: "background 0.12s" },

  desktopActions: { display: "flex", alignItems: "center", gap: 12, flexShrink: 0 },
  loginLink:      { fontSize: 13, fontFamily: "'Helvetica Neue', sans-serif", color: "rgba(255,255,255,0.7)", textDecoration: "none", letterSpacing: "0.04em", padding: "8px 4px", transition: "color 0.2s" },
  ctaBtn:         { padding: "9px 20px", backgroundColor: "#c8a96e", color: "#fff", border: "none", cursor: "pointer", fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 600, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", transition: "background 0.2s, transform 0.15s", whiteSpace: "nowrap" },
  userMenuWrap:   { position: "relative" },
  avatarBtn:      { background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center" },
  avatarImg:      { width: 34, height: 34, borderRadius: "50%", objectFit: "cover", border: "2px solid #c8a96e" },
  avatarInitials: { width: 34, height: 34, borderRadius: "50%", backgroundColor: "#c8a96e", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontFamily: "'Georgia', serif", border: "2px solid rgba(255,255,255,0.2)", cursor: "pointer" },
  userDropdown:   { position: "absolute", top: "calc(100% + 12px)", right: 0, backgroundColor: "#fff", border: "1px solid #ece9e2", boxShadow: "0 8px 32px rgba(0,0,0,0.12)", minWidth: 210, zIndex: 200, animation: "fadeDown 0.18s ease" },
  dropdownHeader: { padding: "14px 16px 12px", borderBottom: "1px solid #f0ede7", backgroundColor: "#faf9f7" },
  dropdownName:   { fontSize: 14, fontFamily: "'Georgia', serif", margin: "0 0 3px", color: "#1a1a1a" },
  dropdownEmail:  { fontSize: 11, fontFamily: "'Helvetica Neue', sans-serif", color: "#aaa", margin: 0 },
  dropdownItem:   { display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", textDecoration: "none", fontSize: 13, fontFamily: "'Helvetica Neue', sans-serif", color: "#333", transition: "background 0.15s", borderBottom: "1px solid #f7f4ef" },
  dropdownDivider:  { height: 1, backgroundColor: "#f0ede7" },
  dropdownSignOut:  { display: "block", width: "100%", padding: "11px 16px", background: "none", border: "none", cursor: "pointer", textAlign: "left", fontSize: 13, fontFamily: "'Helvetica Neue', sans-serif", color: "#888", transition: "color 0.15s, background 0.15s" },

  hamburger:    { display: "none", flexDirection: "column", gap: 5, padding: "8px 4px", background: "none", border: "none", cursor: "pointer", flexShrink: 0 },
  hamburgerBar: { display: "block", width: 22, height: 1.5, backgroundColor: "#fff", transition: "transform 0.3s, opacity 0.3s", transformOrigin: "center" },

  drawerOverlay: { position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 150, transition: "opacity 0.3s ease", backdropFilter: "blur(3px)" },
  drawer:        { position: "fixed", top: 0, right: 0, bottom: 0, width: "min(280px, 88vw)", backgroundColor: "#0c1e14", zIndex: 200, transition: "transform 0.38s cubic-bezier(0.4,0,0.2,1)", display: "flex", flexDirection: "column", overflowY: "auto" },
  drawerHeader:  { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)", flexShrink: 0 },
  drawerLogo:    { height: 32, width: "auto" },
  drawerClose:   { background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: 16, cursor: "pointer", padding: "4px 6px", lineHeight: 1, transition: "color 0.2s" },
  drawerSearch:  { display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", backgroundColor: "rgba(255,255,255,0.04)" },
  drawerSearchInput: { flex: 1, background: "none", border: "none", outline: "none", color: "#fff", fontSize: 13, fontFamily: "'Helvetica Neue', sans-serif", padding: "4px 0" },
  drawerUserStrip: { display: "flex", alignItems: "center", gap: 12, padding: "12px 20px", backgroundColor: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.07)", textDecoration: "none", transition: "background 0.18s" },
  drawerUserName:  { fontSize: 13, fontFamily: "'Georgia', serif", color: "#fff", margin: "0 0 2px" },
  drawerUserLabel: { fontSize: 10, fontFamily: "'Helvetica Neue', sans-serif", color: "rgba(255,255,255,0.35)", margin: 0, letterSpacing: "0.04em" },
  drawerNav:       { display: "flex", flexDirection: "column", padding: "6px 0", flex: 1 },
  drawerLink:      { display: "flex", alignItems: "center", gap: 12, padding: "14px 20px", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.05)", transition: "background 0.18s, padding-left 0.18s", opacity: 0 },
  drawerLinkNum:   { fontSize: 9, fontFamily: "'Helvetica Neue', sans-serif", color: "rgba(255,255,255,0.22)", letterSpacing: "0.1em", minWidth: 18 },
  drawerLinkLabel: { fontSize: 16, fontFamily: "'Georgia', serif", fontWeight: 400, flex: 1 },
  drawerArrow:     { fontSize: 13, color: "rgba(255,255,255,0.2)" },
  drawerCta:       { padding: "20px 20px 16px", borderTop: "1px solid rgba(255,255,255,0.08)", flexShrink: 0 },
  drawerCtaBtn:    { width: "100%", padding: "13px 16px", backgroundColor: "#c8a96e", color: "#fff", border: "none", cursor: "pointer", fontFamily: "'Helvetica Neue', sans-serif", fontWeight: 600, fontSize: 13, letterSpacing: "0.06em", textTransform: "uppercase", transition: "background 0.2s", marginBottom: 10 },
  drawerCtaNote:   { fontSize: 10, fontFamily: "'Helvetica Neue', sans-serif", color: "rgba(255,255,255,0.28)", letterSpacing: "0.07em", textAlign: "center", margin: 0 },
  drawerFooter:    { padding: "16px 20px 28px", display: "flex", flexDirection: "column", gap: 10, borderTop: "1px solid rgba(255,255,255,0.06)", flexShrink: 0 },
  drawerFooterLink:{ fontSize: 12, fontFamily: "'Helvetica Neue', sans-serif", color: "rgba(255,255,255,0.32)", textDecoration: "none", letterSpacing: "0.04em", transition: "color 0.2s" },
  drawerSignOut:   { fontSize: 12, fontFamily: "'Helvetica Neue', sans-serif", color: "rgba(255,255,255,0.32)", background: "none", border: "none", cursor: "pointer", textAlign: "left", padding: 0, letterSpacing: "0.04em", transition: "color 0.2s" },
};

const css = `
  .nav-link:hover           { color: #fff !important; }
  .nav-cta:hover            { background-color: #b8954f !important; transform: translateY(-1px); }
  .nav-login:hover          { color: #fff !important; }
  .more-btn:hover           { color: #fff !important; }
  .more-dropdown-item:hover { background: #fdf9f2 !important; color: #c8a96e !important; }
  .dropdown-item:hover      { background: #fdf9f2 !important; }
  .dropdown-sign-out:hover  { color: #c62828 !important; background: #fff5f5 !important; }
  .search-toggle:hover      { opacity: 0.7; }
  .search-close-btn:hover   { color: #fff !important; }
  .search-result-item:hover { background: #fdf9f3 !important; }
  .drawer a:hover           { background: rgba(255,255,255,0.04) !important; padding-left: 28px !important; }
  .drawer-user-strip:hover  { background: rgba(255,255,255,0.07) !important; }
  .drawer-close:hover       { color: #fff !important; }
  .drawer-cta-btn:hover     { background-color: #b8954f !important; }
  .drawer-footer-link:hover { color: rgba(255,255,255,0.65) !important; }
  .drawer-link-animate      { animation: slideInRight 0.32s ease forwards; }
  .search-spinner           { animation: spin 0.7s linear infinite; }
  @keyframes slideInRight   { from { opacity:0; transform:translateX(14px); } to { opacity:1; transform:translateX(0); } }
  @keyframes fadeDown       { from { opacity:0; transform:translateY(-6px); } to { opacity:1; transform:translateY(0); } }
  @keyframes spin           { to { transform: rotate(360deg); } }
  @media (max-width: 860px) {
    .desktop-nav     { display: none !important; }
    .desktop-actions { display: none !important; }
    .search-area     { display: none !important; }
    .hamburger       { display: flex !important; }
  }
  
`;