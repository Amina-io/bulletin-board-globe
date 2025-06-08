import React, { useState } from 'react';
import '../styles/Menu.css';

export default function Menu() {
  const [activePanel, setActivePanel] = useState(null);

  const menuItems = [
    {
      id: 'what',
      title: 'what is this?',
      icon: '⭐',
      content: `Bulletin boards in cafés, universities, and community centers are filled with handwritten notes, local announcements, and personal ads. They're a global human phenomenon and an analog method of widely and easily exchanging bulletin.

I've always loved bulletin boards and started this so we could gather a collection of bulletin boards in cyberspace. hopefully we'll realize that we're all not so different!`
    },
    {
      id: 'submit',
      title: 'submit a board!',
      icon: '💖',
      content: `Please send images of boards in!

I want as many boards as possible from around the world! Biggest request is that they are community sourced !!!`
    },
    {
      id: 'question',
      title: 'question~?',
      icon: '✨',
      content: `Please email me here if you have any questions or if you notice any of the boards need corrections`
    }
  ];

  const handleItemClick = (itemId) => {
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