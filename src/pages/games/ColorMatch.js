import React, { useState, useEffect } from 'react';
import './GameStyles.css';

function ColorMatch() {
  const colors = ['#ff1493', '#3a86ff', '#8338ec', '#ffbe0b', '#fb5607', '#ff006e'];
  const [gameBoard, setGameBoard] = useState([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [targetColor, setTargetColor] = useState('');
  const [gameActive, setGameActive] = useState(true);

  useEffect(() => {
    startNewLevel();
  }, []);

  const startNewLevel = () => {
    const pairs = level + 2;
    const selectedColors = colors.slice(0, pairs);
    const shuffled = [...selectedColors, ...selectedColors].sort(() => Math.random() - 0.5);
    setGameBoard(shuffled);
    const randomTarget = selectedColors[Math.floor(Math.random() * selectedColors.length)];
    setTargetColor(randomTarget);
    setGameActive(true);
  };

  const handleColorClick = (color) => {
    if (!gameActive) return;
    
    if (color === targetColor) {
      setScore(s => s + 10);
      if (score % 50 === 0 && score > 0) {
        setLevel(l => l + 1);
        startNewLevel();
      } else {
        startNewLevel();
      }
    } else {
      setGameActive(false);
    }
  };

  const resetGame = () => {
    setScore(0);
    setLevel(1);
    startNewLevel();
  };

  return (
    <div className="game-container">
      <h2 className="game-title">🌈 Color Match Game</h2>
      <div className="game-stats">
        <p>Score: <span className="stat-value">{score}</span></p>
        <p>Level: <span className="stat-value">{level}</span></p>
        <button className="reset-btn" onClick={resetGame}>New Game</button>
      </div>

      <div className="color-match-target">
        <p>Match this color:</p>
        <div className="target-color" style={{ backgroundColor: targetColor }}></div>
      </div>

      <div className="color-grid">
        {gameBoard.map((color, index) => (
          <button
            key={index}
            className="color-box"
            style={{ backgroundColor: color }}
            onClick={() => handleColorClick(color)}
            disabled={!gameActive}
          ></button>
        ))}
      </div>

      {!gameActive && (
        <div className="game-modal">
          <div className="modal-content">
            <h3>Game Over!</h3>
            <p>Final Score: <span className="stat-value">{score}</span></p>
            <button className="modal-btn" onClick={resetGame}>Play Again</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ColorMatch;