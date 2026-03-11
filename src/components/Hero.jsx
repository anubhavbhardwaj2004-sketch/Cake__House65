import { useEffect } from "react"
import { initHero } from "../animations/animations"

function Hero({ onOpenStock }) {
  useEffect(() => {
    initHero();
  }, [])

  const sendDesign = () => {
    const phone = '919289282269';
    const message = encodeURIComponent("Can you make a cake like this?");
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  return (
    <section className="hero" id="home">
      {/* Decorative Floating Elements */}
      <img src="/assets/choclate 2.jpg" className="floating-item" style={{ top: '15%', left: '10%' }} alt="floating ingredient" />
      <img src="/assets/Fruit.jpg" className="floating-item" style={{ top: '20%', right: '15%' }} alt="floating ingredient" />
      <img src="/assets/logo-modified.png" className="floating-item" style={{ bottom: '20%', left: '15%' }} alt="floating ingredient" />
      <img src="/assets/cake.gif" className="floating-item" style={{ bottom: '15%', right: '10%', width: '150px' }} alt="floating cake" />

      <h1 className="hero-title">
        Delicious Cakes For Every Celebration
      </h1>

      <p className="hero-text">
        Freshly baked cakes made with love
      </p>

      <div style={{ display: 'flex', gap: '20px' }}>
        <button className="hero-btn" onClick={() => document.getElementById('order').scrollIntoView({ behavior: 'smooth' })}>
          Order Now
        </button>
        <button className="hero-btn" onClick={onOpenStock} style={{ backgroundColor: '#2d3436' }}>
          Check Stock
        </button>
        <button className="hero-btn" onClick={sendDesign} style={{ backgroundColor: '#4ecdc4' }}>
          Custom Design
        </button>
      </div>

    </section>
  )
}

export default Hero