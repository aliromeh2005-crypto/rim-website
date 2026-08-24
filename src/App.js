import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import MemoryGame from './pages/games/MemoryGame';
import PuzzleGame from './pages/games/PuzzleGame';
import QuizGame from './pages/games/QuizGame';
import TicTacToe from './pages/games/TicTacToe';
import DrawingGame from './pages/games/DrawingGame';
import ColorMatch from './pages/games/ColorMatch';
import WordGuess from './pages/games/WordGuess';
import Questionnaire from './pages/Questionnaire';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      setIsDarkMode(JSON.parse(savedMode));
    }
    
    // Apply theme to body
    if (isDarkMode) {
      document.body.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <Home />;
      case 'memory':
        return <MemoryGame />;
      case 'puzzle':
        return <PuzzleGame />;
      case 'quiz':
        return <QuizGame />;
      case 'tictactoe':
        return <TicTacToe />;
      case 'drawing':
        return <DrawingGame />;
      case 'colormatch':
        return <ColorMatch />;
      case 'wordguess':
        return <WordGuess />;
      case 'questionnaire':
        return <Questionnaire />;
      default:
        return <Home />;
    }
  };

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
