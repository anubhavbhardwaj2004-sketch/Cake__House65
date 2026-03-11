import { useEffect } from "react"
import { initTestimonials } from "../animations/animations"

function Testimonials() {
  useEffect(() => {
    initTestimonials();
  }, [])

  const reviews = [
    {
      img: "/assets/customer1.jpg",
      text: "Amazing cake and fast delivery!",
    
    },
    {
      img: "/assets/customer2.jpg",
      text: "Best bakery in town! Love the texture.",

    },
    {
      img: "/assets/customer3.jpg",
      text: "Loved the chocolate cake! Highly recommend."
    }
  ];

  return (
    <section className="testimonials" id="reviews">
      <h2>Customer Reviews</h2>
      <div className="testimonials-container">
        {reviews.map((review, index) => (
          <div key={index} className="testimonial-card">
            <div className="customer-img-wrapper">
              <img src={review.img} alt={review.name} className="customer-img" />
            </div>
            <p className="testimonial-text">
              {review.text}
            </p>
            <h4 className="customer-name">- {review.name}</h4>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Testimonials