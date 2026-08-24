import React, { useState, useEffect } from 'react';
import './GameStyles.css';

function MemoryGame() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  const emojis = ['🎮', '🎨', '🎵', '🎭', '🎪', '🎯', '🎲', '🎳'];

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0) {
      setGameWon(true);
    }
  }, [matched, cards]);

  const initializeGame = () => {
    const shuffled = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameWon(false);
  };

  const handleCardClick = (index) => {
    if (flipped.includes(index) || matched.includes(index) || flipped.length === 2) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      if (cards[newFlipped[0]] === cards[newFlipped[1]]) {
        setMatched([...matched, ...newFlipped]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <div className="game-container">
      <h2 className="game-title">🧠 Memory Game</h2>
      <div className="game-stats">
        <p>Moves: <span className="stat-value">{moves}</span></p>
        <button className="reset-btn" onClick={initializeGame}>New Game</button>
      </div>

      <div className="memory-grid">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`memory-card ${flipped.includes(index) || matched.includes(index) ? 'flipped' : ''}`}
            onClick={() => handleCardClick(index)}
          >
            <div className="card-inner">
              <div className="card-front">?</div>
              <div className="card-back">{card}</div>
            </div>
          </div>
        ))}
      </div>

      {gameWon && (
        <div className="game-modal">
          <div className="modal-content">
            <h3>🎉 You Won! 🎉</h3>
            <p>Completed in {moves} moves!</p>
            <button className="modal-btn" onClick={initializeGame}>Play Again</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MemoryGame;