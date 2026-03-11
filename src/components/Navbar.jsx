import { useState } from "react"

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false); // Close menu on click
    }
  };

  return (
    <nav className={`navbar ${isOpen ? 'nav-open' : ''}`}>
      <h2 className="logo" onClick={() => scrollTo('home')} style={{ cursor: 'pointer' }}>CakeHouse</h2>
      
      <div className={`nav-toggle ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
        <li className="nav-item" onClick={() => scrollTo('home')}>Home</li>
        <li className="nav-item" onClick={() => scrollTo('cakes')}>Cakes</li>
        <li className="nav-item" onClick={() => scrollTo('gallery')}>Gallery</li>
        <li className="nav-item" onClick={() => scrollTo('reviews')}>Reviews</li>
        <li className="nav-item" onClick={() => scrollTo('order')}>Order</li>
        <li className="nav-item" onClick={() => scrollTo('contact')}>Contact</li>
      </ul>
    </nav>
  )
}

export default Navbar