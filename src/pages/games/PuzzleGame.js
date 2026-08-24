import React, { useState, useEffect } from 'react';
import './GameStyles.css';

function PuzzleGame() {
  const [tiles, setTiles] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (tiles.length > 0 && checkWin()) {
      setGameWon(true);
    }
  }, [tiles]);

  const initializeGame = () => {
    const newTiles = Array.from({ length: 9 }, (_, i) => i + 1);
    newTiles[8] = null;
    shufflePuzzle(newTiles);
    setTiles(newTiles);
    setMoves(0);
    setGameWon(false);
  };

  const shufflePuzzle = (array) => {
    for (let i = 0; i < 100; i++) {
      const emptyIndex = array.indexOf(null);
      const neighbors = getNeighbors(emptyIndex);
      const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
      [array[emptyIndex], array[randomNeighbor]] = [array[randomNeighbor], array[emptyIndex]];
    }
  };

  const getNeighbors = (index) => {
    const neighbors = [];
    const row = Math.floor(index / 3);
    const col = index % 3;

    if (row > 0) neighbors.push(index - 3);
    if (row < 2) neighbors.push(index + 3);
    if (col > 0) neighbors.push(index - 1);
    if (col < 2) neighbors.push(index + 1);

    return neighbors;
  };

  const handleTileClick = (index) => {
    const emptyIndex = tiles.indexOf(null);
    const neighbors = getNeighbors(emptyIndex);

    if (neighbors.includes(index)) {
      const newTiles = [...tiles];
      [newTiles[emptyIndex], newTiles[index]] = [newTiles[index], newTiles[emptyIndex]];
      setTiles(newTiles);
      setMoves(m => m + 1);
    }
  };

  const checkWin = () => {
    for (let i = 0; i < 8; i++) {
      if (tiles[i] !== i + 1) return false;
    }
    return tiles[8] === null;
  };

  return (
    <div className="game-container">
      <h2 className="game-title">🧩 Sliding Puzzle Game</h2>
      <div className="game-stats">
        <p>Moves: <span className="stat-value">{moves}</span></p>
        <button className="reset-btn" onClick={initializeGame}>New Game</button>
      </div>

      <div className="puzzle-grid">
        {tiles.map((tile, index) => (
          <div
            key={index}
            className={`puzzle-tile ${tile === null ? 'empty' : ''}`}
            onClick={() => handleTileClick(index)}
          >
            {tile}
          </div>
        ))}
      </div>

      {gameWon && (
        <div className="game-modal">
          <div className="modal-content">
            <h3>🎉 You Won! 🎉</h3>
            <p>Solved in {moves} moves!</p>
            <button className="modal-btn" onClick={initializeGame}>Play Again</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PuzzleGame;