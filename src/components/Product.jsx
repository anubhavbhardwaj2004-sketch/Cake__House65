import { useEffect } from "react"
import { initProducts } from "../animations/animations"

function Products() {
  useEffect(() => {
    initProducts();
  }, [])

  return (
    <section className="products" id="cakes">
      <h2>Our Cakes</h2>
      <div className="product-grid">
        <div className="product-card">
          <img src="/assets/choclate cake.jpg" alt="Chocolate Cake" />
          <h3>Chocolate Cake</h3>
        </div>
        <div className="product-card">
          <img src="/assets/strawberry .jpg" alt="Strawberry Cake" />
          <h3>Strawberry Cake</h3>
        </div>
        <div className="product-card">
          <img src="/assets/vannila.jpg" alt="Vanilla Cake" />
          <h3>Vanilla Cake</h3>
        </div>
      </div>
    </section>
  )
}

export default Products