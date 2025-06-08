import React, { useState } from 'react';
import Globe from './components/Globe';
import BulletinModal from './components/BulletinModal';
import SubmissionForm from './components/SubmissionForm';
import Menu from './components/Menu';
import './App.css';

function App() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [submissionFormOpen, setSubmissionFormOpen] = useState(false);

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedLocation(null);
  };

  const openSubmissionForm = () => {
    setSubmissionFormOpen(true);
  };

  const closeSubmissionForm = () => {
    setSubmissionFormOpen(false);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>✨~bulletin boards of the world!!!~✨</h1>
        <p>Click on markers to explore local bulletin boards from around the world! 
          Submit your own board here!</p>
      </header>
      
      <Menu onSubmitClick={openSubmissionForm} />
      
      <div className="globe-container">
        <Globe onLocationClick={handleLocationClick} />
      </div>

      {modalOpen && (
        <BulletinModal 
          location={selectedLocation} 
          onClose={closeModal} 
        />
      )}

      {submissionFormOpen && (
        <SubmissionForm onClose={closeSubmissionForm} />
      )}
    </div>
  );
}

export default App;
