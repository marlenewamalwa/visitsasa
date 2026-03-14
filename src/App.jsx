import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import DestinationsPage from "./pages/DestinationsPage";
import WildlifePage from "./pages/WildlifePage";
import FoodCulturePage from "./pages/FoodCulturePage";
import TravelTipsPage from "./pages/TravelTipsPage";

export default function App() {
  useEffect(() => {
    document.title = "VisitSasa — Discover Kenya";
  }, []);
  return (
    <BrowserRouter>
      <div style={{ fontFamily: "'Georgia', serif", background: "#F4F9FA", color: "#0D2B31", overflowX: "hidden" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=Lato:wght@300;400;700&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          ::-webkit-scrollbar { width: 6px; }
          ::-webkit-scrollbar-track { background: #F4F9FA; }
          ::-webkit-scrollbar-thumb { background: #1D4F5A; border-radius: 3px; }
        `}</style>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route path="/wildlife" element={<WildlifePage />} />
          <Route path="/food-culture" element={<FoodCulturePage />} />
          <Route path="/travel-tips" element={<TravelTipsPage />} />
          
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}