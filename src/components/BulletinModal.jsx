import React from 'react';
import '../styles/BulletinBoard.css';

export default function BulletinModal({ location, onClose }) {
  if (!location) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="bulletin-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{location.name}</h2>
          <div className="location-info">
            <span className="context">{location.context}</span>
            <span className="country">{location.country}</span>
          </div>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="bulletin-board">
          <div className="cork-background">
            {location.bulletinBoard.items.map((item, index) => (
              <div
                key={item.id}
                className={`bulletin-item ${item.type}`}
                style={{
                  transform: `rotate(${item.style.rotation}deg)`,
                  backgroundColor: item.style.color,
                  left: `${15 + (index % 3) * 30}%`,
                  top: `${20 + Math.floor(index / 3) * 35}%`
                }}
              >
                <div className="thumbtack"></div>
                <div className="item-content">
                  <h3 className="item-title">{item.title}</h3>
                  <p className="item-text">{item.content}</p>
                </div>
                <div className="tape"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}