import React from 'react';
import '../styles/BulletinBoard.css';

export default function BulletinModal({ location, onClose }) {
  if (!location) return null;

  // Debug logging
  console.log('BulletinModal rendering with location:', location);
  console.log('Image path:', location.image);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="bulletin-modal modern" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="location-header">
            <div className="title-row">
              <h2>{location.name}</h2>
              {location.year && <span className="year-badge">{location.year}</span>}
            </div>
            <div className="location-meta">
              <span className="context">{location.context}</span>
              <span className="country">{location.country}</span>
            </div>
          </div>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        {location.image && (
          <img 
            src={location.image} 
            alt={location.name}
            style={{
              width: "100%",
              maxHeight: "300px",
              objectFit: "cover",
              borderRadius: "12px",
              marginBottom: "20px"
            }}
            onLoad={() => console.log('Image loaded successfully:', location.image)}
            onError={(e) => console.error('Image failed to load:', location.image, e)}
          />
        )}
        
        <div className="bulletin-content">
          <h3 className="content-title">Local Bulletin Board</h3>
          <div className="bulletin-items">
            {location.bulletinBoard.items.map((item, index) => (
              <div key={item.id} className="bulletin-item-modern">
                <div className="item-header">
                  <h4 className="item-title">{item.title}</h4>
                  <span className="item-type">{item.type}</span>
                </div>
                <p className="item-content">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}