import React, { useState } from 'react';
import '../styles/Menu.css';

export default function Menu({ onSubmitClick }) {
  const [activePanel, setActivePanel] = useState(null);

  const menuItems = [
    {
      id: 'what',
      title: 'WHAT IS THIS?',
      icon: '⭐',
      content: `Bulletin boards in cafés, universities, and community centers are filled with handwritten notes, local announcements, and personal ads. They're a global human phenomenon and an analog method of widely and easily exchanging bulletin.

I've always loved bulletin boards and started this so we could gather a collection of bulletin boards in cyberspace. hopefully we'll realize that we're all not so different!`
    },
    {
      id: 'submit',
      title: 'submit a board!',
      icon: '💖',
      action: () => onSubmitClick(),
      content: `Found an interesting bulletin board? Click to submit it for review!`
    },
    {
      id: 'question',
      title: 'QUESTION~?',
      icon: '✨',
      content: `Please email me here if you have any questions or if you notice any of the boards need corrections`
    }
  ];

  const handleItemClick = (itemId) => {
    const item = menuItems.find(item => item.id === itemId);
    
    if (item.action) {
      // Execute the action function
      item.action();
      return;
    }
    
    if (activePanel === itemId) {
      setActivePanel(null); // Collapse if same item clicked
    } else {
      setActivePanel(itemId); // Expand new item
    }
  };

  return (
    <div className="menu-container">
      <div className={`menu-panel ${activePanel ? 'expanded' : ''}`}>
        {activePanel ? (
          // Show expanded content
          <div className="menu-content">
            <div className="content-header">
              <h3>
                {menuItems.find(item => item.id === activePanel)?.title}
                <span className="content-icon">
                  {menuItems.find(item => item.id === activePanel)?.icon}
                </span>
              </h3>
              <button 
                className="close-content-btn"
                onClick={() => setActivePanel(null)}
              >
                ×
              </button>
            </div>
            <div className="content-text">
              {menuItems.find(item => item.id === activePanel)?.content}
            </div>
          </div>
        ) : (
          // Show menu buttons
          <div className="menu-buttons">
            {menuItems.map((item) => (
              <button
                key={item.id}
                className="menu-button"
                onClick={() => handleItemClick(item.id)}
              >
                <span className="menu-title">{item.title}</span>
                <span className="menu-icon">{item.icon}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}