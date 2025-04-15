import React from 'react';
import './PreviewPopup.css';

const PreviewPopup = ({ image, onClose, onDownload }) => {
  return (
    <div className="preview-popup-overlay" onClick={onClose}>
      <div className="preview-popup" onClick={e => e.stopPropagation()}>
        <button className="close-preview" onClick={onClose}>×</button>
        <div className="preview-content">
          <img src={image.url} alt={image.title} />
          <div className="preview-info">
            <h2>{image.title}</h2>
            <p className="creator">By {image.creator || 'Unknown Artist'}</p>
            <button className="download-btn" onClick={onDownload}>
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPopup;