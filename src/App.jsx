import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Destinations from "./pages/Destinations";
import Home from "./pages/Home";
import Packages from "./pages/Packages";
import TravelTips from "./pages/TravelTips";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PackageDetails from "./pages/PackageDetails";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/packages" element={<Packages />} />
         <Route path="/travel-tips" element={<TravelTips />} />
        <Route path="/packages/:id" element={<PackageDetails />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;