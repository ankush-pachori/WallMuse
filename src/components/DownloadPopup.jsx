import React from 'react';
import './DownloadPopup.css';

const DownloadPopup = ({ image, onClose }) => {
  const resolutions = [
    { label: 'Original Quality', size: 'raw', width: 'Full Resolution' },
    { label: 'High Quality (1920x1080)', size: 'regular' },
    { label: 'Medium Quality (1280x720)', size: 'small' },
    { label: 'Low Quality (640x360)', size: 'thumb' }
  ];

  const handleDownload = async (size) => {
    try {
      const imageUrl = image.urls[size];
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `wallpaper_${size}_${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      onClose();
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download image. Please try again.');
    }
  };

  return (
    <div className="download-popup-overlay" onClick={onClose}>
      <div className="download-popup" onClick={e => e.stopPropagation()}>
        <h3>Choose Download Resolution</h3>
        <div className="resolution-options">
          {resolutions.map((res) => (
            <button
              key={res.size}
              onClick={() => handleDownload(res.size)}
              className="resolution-button"
            >
              {res.label}
            </button>
          ))}
        </div>
        <button className="close-button" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default DownloadPopup;