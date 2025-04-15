import React, { useState } from 'react';
import './Navbar.css';

const Navbar = ({ onSearch, onCategoryChange, onHome }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const categories = [
    'Nature',
    'Architecture',
    'Abstract',
    'Animals',
    'Travel',
    'Space',
    'Minimalist',
    'Cityscape',
    'Landscape',
    'Ocean',
    'Mountains',
    'Forest',
    'Night Sky',
    'Vintage',
    'Technology',
    'Art',
    'Black & White',
    'Geometric',
    'Flowers',
    'Automotive'
  ];

  return (
    <nav className="navbar">
      <div className="nav-content">
        <div className="nav-left">
          <button className="home-button" onClick={onHome}>
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2z"/>
            </svg>
          </button>
          <h1 className="logo">WallMuse</h1>
        </div>
        
        <div className="nav-controls">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search wallpapers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && onSearch(searchTerm)}
            />
            <button onClick={() => onSearch(searchTerm)}>Search</button>
          </div>
          
          <select onChange={(e) => onCategoryChange(e.target.value)}>
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category.toLowerCase()}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;