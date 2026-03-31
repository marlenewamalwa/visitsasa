import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Destinations from "./pages/Destinations";
import Home from "./pages/Home";
import TravelTips from "./pages/TravelTips";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Activities from "./pages/Activities";
import HowItWorks from "./pages/HowItWorks";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/travel-tips" element={<TravelTips />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/howitworks" element={<HowItWorks />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;