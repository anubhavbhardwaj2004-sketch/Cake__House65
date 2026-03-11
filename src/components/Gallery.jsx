import { useState, useEffect } from "react"
import { initGallery } from "../animations/animations"

function Gallery() {
  const [selectedMedia, setSelectedMedia] = useState(null);

  useEffect(() => {
    initGallery();
  }, [])

  const galleryItems = [
    { type: 'image', src: '/assets/Red-Velvet-Cake-12.jpg', alt: 'Red Velvet Cake' },
    { type: 'image', src: '/assets/Fruit.jpg', alt: 'Fruit Cake' },
    { type: 'video', src: '/assets/cake house tour.mp4', alt: 'Cake House Tour' }
  ];

  return (
    <section className="gallery" id="gallery">
      <h2>Our Creations</h2>
      <div className="gallery-grid">
        {galleryItems.map((item, i) => (
          item.type === 'image' ? (
            <img 
              key={i}
              className="gallery-item" 
              src={item.src} 
              alt={item.alt} 
              onClick={() => setSelectedMedia(item)}
            />
          ) : (
            <video 
              key={i}
              className="gallery-item" 
              src={item.src} 
              autoPlay loop muted playsInline 
              onClick={() => setSelectedMedia(item)}
            ></video>
          )
        ))}
      </div>

      {/* Gallery Modal */}
      {selectedMedia && (
        <div className="modal-overlay active" onClick={() => setSelectedMedia(null)}>
          <div className="modal-content" style={{ maxWidth: '90vw', maxHeight: '90vh', padding: 0, overflow: 'hidden' }} onClick={e => e.stopPropagation()}>
            <span className="close-modal" style={{ color: 'white', textShadow: '0 2px 10px rgba(0,0,0,0.5)', zIndex: 10 }} onClick={() => setSelectedMedia(null)}>&times;</span>
            {selectedMedia.type === 'image' ? (
              <img src={selectedMedia.src} style={{ width: '100%', height: 'auto', display: 'block' }} alt={selectedMedia.alt} />
            ) : (
              <video src={selectedMedia.src} controls autoPlay style={{ width: '100%', height: 'auto', display: 'block' }}></video>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

export default Gallery