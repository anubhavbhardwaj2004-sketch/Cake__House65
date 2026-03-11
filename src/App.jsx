import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Products from "./components/Product"
import Gallery from "./components/Gallery"
import Testimonials from "./components/Testimonials"
import Footer from "./components/Footer"
import Order from "./components/Order"
import { useEffect, useState } from "react"
import { initCursor, initScrollReveal } from "./animations/animations"

import "./App.css"

function App() {
  const [showStock, setShowStock] = useState(false);

  useEffect(() => {
    initCursor();
    initScrollReveal();

    const handleScroll = () => {
      const nav = document.querySelector(".navbar");
      if (window.scrollY > 50) {
        nav.classList.add("scrolled");
      } else {
        nav.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="app-container">
      <div className="custom-cursor"></div>
      <div className="cursor-follower"></div>
      <Navbar />
      <Hero onOpenStock={() => setShowStock(true)} />
      <Products />
      <Gallery />
      <Testimonials />
      <Order />
      <Footer />

      {/* Stock Modal */}
      <div className={`modal-overlay ${showStock ? 'active' : ''}`} onClick={() => setShowStock(false)}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <span className="close-modal" onClick={() => setShowStock(false)}>&times;</span>
          <h2 style={{ color: '#ff6b6b', marginBottom: '20px' }}>Available Stock</h2>
          <div style={{ lineHeight: '1.8' }}>
            <p><b>Cookies:</b></p>
            <ul>
              <li>Chocolate Chip Cookie: 50 packs</li>
              <li>Oatmeal Raisin Cookie: 40 packs</li>
              <li>Butter Shortbread: 60 packs</li>
              <li>Double Chocolate Cookie: 30 packs</li>
            </ul>
            <p style={{ marginTop: '15px' }}><b>Cakes:</b></p>
            <ul>
              <li>Classic Chocolate Cake: 20 kg</li>
              <li>Vanilla Dream Cake: 25 kg</li>
              <li>Red Velvet Cake: 15 kg</li>
              <li>Black Forest Cake: 10 kg</li>
            </ul>
            <p style={{ marginTop: '20px', fontSize: '0.9rem', color: '#666' }}>
              Note: Stock levels are updated daily. Please place your order soon!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App