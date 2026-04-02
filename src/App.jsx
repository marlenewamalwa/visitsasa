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
import Login from "./pages/Login";          
import Signup from "./pages/Signup";       
import Profile from "./pages/Profile";      
import ProtectedRoute from "./components/ProtectedRoute"; 
import { AuthProvider } from "./context/AuthContext";
import SearchResults from "./pages/SearchResults";

function App() {
  return (
    <AuthProvider>                         
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/travel-tips" element={<TravelTips />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/howitworks" element={<HowItWorks />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/profile" element={     
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;