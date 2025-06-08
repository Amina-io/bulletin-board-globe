import React, { useState } from 'react';
import '../styles/SubmissionForm.css';

export default function SubmissionForm({ onClose }) {
  const [formData, setFormData] = useState({
    location: '',
    country: '',
    year: '',
    name: '',
    email: '',
    description: '',
    bulletinItems: '',
    image: null
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({ ...prev, image: file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create email content
    const subject = `New Bulletin Board Submission: ${formData.location}, ${formData.country}`;
    
    const emailBody = `
NEW BULLETIN BOARD SUBMISSION
=============================

LOCATION INFO:
- Location: ${formData.location}
- Country: ${formData.country}
- Year: ${formData.year || 'Not specified'}

SUBMITTER:
- Name: ${formData.name || 'Not provided'}
- Email: ${formData.email}

TELL ME MORE:
${formData.description || 'Not provided'}

WHAT'S BEING POSTED:
${formData.bulletinItems || 'Not provided'}

IMAGE:
${formData.image ? `Image attached: ${formData.image.name}` : 'No image attached - please ask submitter to reply with image'}

=============================
To add this location, copy the following format:
{
  id: "${formData.location.toLowerCase().replace(/\s+/g, '')}_${Date.now()}",
  name: "${formData.location}",
  country: "${formData.country}",
  coordinates: { lat: 0, lng: 0 }, // Update with actual coordinates
  context: "${formData.location}",
  year: "${formData.year || '2025'}",
  image: "/images/[IMAGE_FILENAME]",
  bulletinBoard: {
    items: [
      // Add items based on description above
    ]
  }
}
    `.trim();

    // Create mailto link
    const mailtoLink = `mailto:hello@amina-io.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Open email client
    window.open(mailtoLink);
    
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="submission-modal" onClick={(e) => e.stopPropagation()}>
          <div className="success-message">
            <h2>📧 Email Prepared!</h2>
            <p>
              Your submission has been prepared in your email client. 
              <br /><br />
              <strong>Next steps:</strong>
              <br />
              1. Send the email that just opened
              <br />
              2. Reply with or attach your bulletin board image
              <br />
              3. I'll review and add it to the globe!
            </p>
            <button onClick={onClose} className="close-btn">Got it!</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="submission-modal" onClick={(e) => e.stopPropagation()}>
        <div className="form-header">
          <h2>📋 Submit a Bulletin Board!</h2>
          <p className="form-subtitle">I'll review your submission and add it to the globe</p>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="submission-form">
          <div className="form-row">
            <div className="form-group">
              <label>Location *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g., blah blah bookstore, Townsville, etc"
                required
              />
            </div>
            <div className="form-group">
              <label>Country *</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                placeholder="e.g., USA"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Year (optional)</label>
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                placeholder="e.g., 2024"
              />
            </div>
            <div className="form-group">
              <label>Your Name (optional)</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your name"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Your Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="your-email@example.com"
              required
            />
            <small>in case I have questions</small>
          </div>

          <div className="form-group">
            <label>Tell me more (optional)</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Any additional details about this bulletin board"
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>whats being posted (optional)</label>
            <textarea
              name="bulletinItems"
              value={formData.bulletinItems}
              onChange={handleInputChange}
              placeholder="Describe what you see on the board"
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Upload Image *</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
            <small>Please attach a photo of the bulletin board</small>
          </div>

          <button type="submit" className="submit-btn">
            📧 Send Submission Email
          </button>
        </form>
      </div>
    </div>
  );
} 