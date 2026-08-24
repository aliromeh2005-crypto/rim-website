import React from 'react';
import './Header.css';

function Header({ isDarkMode, toggleDarkMode }) {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="title">✨ Rim's Interactive Universe ✨</h1>
        <button 
          className={`theme-toggle ${isDarkMode ? 'dark' : 'light'}`}
          onClick={toggleDarkMode}
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
}

export default Header;
