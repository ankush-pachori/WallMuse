import React, { useState, useEffect } from 'react';
import DownloadPopup from './DownloadPopup';
import PreviewPopup from './PreviewPopup';
import './ImageGrid.css';

const ImageGrid = ({ images, onLoadMore }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleScroll = async () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const scrollThreshold = document.documentElement.scrollHeight - 800;

      if (scrollPosition > scrollThreshold && !loading) {
        setLoading(true);
        await onLoadMore();
        setLoading(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onLoadMore, loading]);

  return (
    <>
      <div className="masonry-grid">
        {images.map((image, index) => (
          <div className="masonry-item" key={index}>
            <img 
              src={image.url} 
              alt={image.title} 
              loading="lazy"
              onClick={() => setPreviewImage(image)}
            />
            <div className="image-overlay">
              <h3>{image.title}</h3>
              <button onClick={() => setSelectedImage(image)}>Download</button>
            </div>
          </div>
        ))}
      </div>
      {loading && (
        <div className="loading-container">
          <div className="loading-animation">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
      {selectedImage && (
        <DownloadPopup 
          image={selectedImage} 
          onClose={() => setSelectedImage(null)} 
        />
      )}
      {previewImage && (
        <PreviewPopup 
          image={previewImage}
          onClose={() => setPreviewImage(null)}
          onDownload={() => {
            setSelectedImage(previewImage);
            setPreviewImage(null);
          }}
        />
      )}
    </>
  );
};

export default ImageGrid;