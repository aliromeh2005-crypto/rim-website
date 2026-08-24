import React, { useState } from 'react';
import './Navigation.css';

function Navigation({ currentPage, setCurrentPage }) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: '🏠 Home' },
    { id: 'memory', label: '🧠 Memory Game' },
    { id: 'puzzle', label: '🧩 Puzzle Game' },
    { id: 'quiz', label: '❓ Quiz Game' },
    { id: 'tictactoe', label: '⭕ Tic Tac Toe' },
    { id: 'drawing', label: '🎨 Drawing' },
    { id: 'colormatch', label: '🎨 Color Match' },
    { id: 'wordguess', label: '📝 Word Guess' },
    { id: 'questionnaire', label: '💭 Questions' },
  ];

  const handleNavClick = (pageId) => {
    setCurrentPage(pageId);
    setIsOpen(false);
  };

  return (
    <nav className="navigation">
      <button 
        className="menu-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        ☰
      </button>
      <ul className={`nav-list ${isOpen ? 'open' : ''}`}>
        {navItems.map(item => (
          <li key={item.id}>
            <button
              className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
