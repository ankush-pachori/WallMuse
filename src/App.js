import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ImageGrid from './components/ImageGrid';
import './App.css';
import { Helmet } from 'react-helmet';

function App() {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');

  const fetchImages = async (searchTerm = '', category = '') => {
    setLoading(true);
    setError(null);
    
    try {
      const baseUrl = 'https://api.unsplash.com';
      let url = `${baseUrl}/photos/random?count=30`;
      
      if (searchTerm || category) {
        const query = searchTerm || category;
        url = `${baseUrl}/search/photos?query=${query}&per_page=30`;
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: {

          'Accept-Version': 'v1',
          'Authorization': `Client-ID w54MdR61TSN9s1r6-9xTqDwUnV7vdnxOHCvwktE1k-w`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // In the formattedImages mapping:
      const formattedImages = (searchTerm || category ? data.results : data).map(img => ({
        url: img.urls.regular,
        title: img.alt_description || 'Untitled',
        creator: img.user?.name || 'Unknown Artist',
        downloadUrl: img.links.download,
        urls: {
          raw: img.urls.raw,
          regular: img.urls.regular,
          small: img.urls.small,
          thumb: img.urls.thumb
        }
      }));

      setImages(formattedImages);
    } catch (error) {
      setError(error.message);
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    setPage(1);
    fetchImages(searchTerm);
  };

  const handleCategoryChange = (category) => {
    setCategory(category);
    setPage(1);
    fetchImages('', category);
  };

  const handleHome = () => {
    setSearchTerm('');
    setCategory('');
    setPage(1);
    fetchImages();
  };

  const loadMoreImages = async () => {
    try {
      const baseUrl = 'https://api.unsplash.com';
      let url = `${baseUrl}/photos/random?count=30`;
      
      if (searchTerm || category) {
        const query = searchTerm || category;
        url = `${baseUrl}/search/photos?query=${query}&per_page=30&page=${page + 1}`;
      }

      const response = await fetch(url, {
        headers: {
          'Accept-Version': 'v1',
          'Authorization': `Client-ID w54MdR61TSN9s1r6-9xTqDwUnV7vdnxOHCvwktE1k-w`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const newImages = (searchTerm || category ? data.results : data).map(img => ({
        url: img.urls.regular,
        title: img.alt_description || 'Untitled',
        creator: img.user?.name || 'Unknown Artist',
        downloadUrl: img.links.download,
        urls: {
          raw: img.urls.raw,
          regular: img.urls.regular,
          small: img.urls.small,
          thumb: img.urls.thumb
        }
      }));

      setImages(prevImages => [...prevImages, ...newImages]);
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      setError(error.message);
      console.error('Error fetching more images:', error);
    }
  };

  return (
    <div className="App">
      <Helmet>
        <title>WallMuse</title>
        <meta name="description" content="Beautiful wallpapers for your desktop" />
      </Helmet>
      <Navbar 
        onSearch={handleSearch} 
        onCategoryChange={handleCategoryChange} 
        onHome={handleHome}
      />
      {error && <div className="error-message">Error: {error}</div>}
      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        <ImageGrid images={images} onLoadMore={loadMoreImages} />
      )}
    </div>
  );
}

export default App;
