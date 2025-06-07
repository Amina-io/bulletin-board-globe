import React, { useState } from 'react';
import Globe from './components/Globe';
import BulletinModal from './components/BulletinModal';
import './App.css';

function App() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedLocation(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Global Bulletin Board Explorer</h1>
        <p>Click on markers to explore local bulletin boards from around the world</p>
      </header>
      
      <div className="globe-container">
        <Globe onLocationClick={handleLocationClick} />
      </div>

      {modalOpen && (
        <BulletinModal 
          location={selectedLocation} 
          onClose={closeModal} 
        />
      )}
    </div>
  );
}

export default App;
