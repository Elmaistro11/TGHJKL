import React from 'react'
import '../styles/UIOverlay.css'

const SECTION_DATA = {
  reception: {
    title: 'Reception Area',
    description: 'Welcome your guests in style with our luxury reception designs',
  },
  master: {
    title: 'Master Bedroom',
    description: 'Premium bedroom designs for ultimate comfort and elegance',
  },
  kids: {
    title: 'Kids Rooms',
    description: 'Creative and safe spaces designed for children',
  },
  'bathroom-small': {
    title: 'Luxury Bathrooms',
    description: 'Sophisticated bathroom designs with modern amenities',
  },
  kitchen: {
    title: 'Contemporary Kitchens',
    description: 'Modern kitchen designs for sophisticated living',
  },
}

export default function UIOverlay({ section, onClose }) {
  const data = SECTION_DATA[section]

  if (!data) return null

  return (
    <>
      <div className="overlay-background" onClick={onClose} />
      <div className="gallery-panel">
        <button className="close-btn" onClick={onClose}>✕</button>
        
        <div className="panel-content">
          <h2>{data.title}</h2>
          <p>{data.description}</p>
          
          <div className="gallery">
            {[1, 2].map((idx) => (
              <div key={idx} className="gallery-item">
                <div className="placeholder-image" />
              </div>
            ))}
          </div>
          
          <button className="cta-button">Schedule Consultation</button>
        </div>
      </div>
    </>
  )
}