import React, { useState, useEffect } from 'react';
import './GameStyles.css';

function WordGuess() {
  const words = [
    { word: 'REACT', clue: 'A JavaScript library' },
    { word: 'JAVASCRIPT', clue: 'Programming language' },
    { word: 'WEBSITE', clue: 'Online pages' },
    { word: 'CODING', clue: 'Writing programs' },
    { word: 'INTERNET', clue: 'Global network' },
    { word: 'COMPUTER', clue: 'Electronic device' },
  ];

  const [currentWord, setCurrentWord] = useState(0);
  const [guessed, setGuessed] = useState([]);
  const [wrong, setWrong] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [gameLost, setGameLost] = useState(false);

  useEffect(() => {
    checkWin();
  }, [guessed]);

  const word = words[currentWord].word;
  const maxWrong = 6;

  const checkWin = () => {
    if (word.split('').every(letter => guessed.includes(letter))) {
      setGameWon(true);
    }
  };

  const handleGuess = (letter) => {
    if (guessed.includes(letter)) return;
    
    const newGuessed = [...guessed, letter];
    setGuessed(newGuessed);

    if (!word.includes(letter)) {
      const newWrong = wrong + 1;
      setWrong(newWrong);
      if (newWrong >= maxWrong) {
        setGameLost(true);
      }
    }
  };

  const resetGame = () => {
    setGuessed([]);
    setWrong(0);
    setGameWon(false);
    setGameLost(false);
  };

  const nextWord = () => {
    if (currentWord + 1 < words.length) {
      setCurrentWord(currentWord + 1);
      resetGame();
    }
  };

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className="game-container">
      <h2 className="game-title">📝 Word Guess Game</h2>
      <div className="game-stats">
        <p>Wrong Guesses: <span className="stat-value">{wrong}/{maxWrong}</span></p>
      </div>

      <div className="word-guess-container">
        <p className="clue">Clue: {words[currentWord].clue}</p>
        <div className="word-display">
          {word.split('').map((letter, index) => (
            <span key={index} className="letter">
              {guessed.includes(letter) ? letter : '_'}
            </span>
          ))}
        </div>

        <div className="alphabet-grid">
          {alphabet.map(letter => (
            <button
              key={letter}
              className={`letter-btn ${
                guessed.includes(letter) ? (word.includes(letter) ? 'correct' : 'wrong') : ''
              }`}
              onClick={() => handleGuess(letter)}
              disabled={guessed.includes(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>

      {(gameWon || gameLost) && (
        <div className="game-modal">
          <div className="modal-content">
            <h3>{gameWon ? '🎉 You Won!' : '😢 Game Over!'}</h3>
            <p>The word was: <strong>{word}</strong></p>
            {currentWord + 1 < words.length ? (
              <button className="modal-btn" onClick={nextWord}>Next Word</button>
            ) : (
              <button className="modal-btn" onClick={() => { setCurrentWord(0); resetGame(); }}>Play Again</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default WordGuess;