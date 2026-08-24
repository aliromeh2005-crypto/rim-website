import React, { useState } from 'react';
import './GameStyles.css';

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || winner || gameOver) return;
    const newBoard = [...board];
    newBoard[index] = isXNext ? '❌' : '⭕';
    setBoard(newBoard);
    
    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setGameOver(true);
    } else if (newBoard.every(square => square !== null)) {
      setGameOver(true);
    }
    
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameOver(false);
    setWinner(null);
  };

  return (
    <div className="game-container">
      <h2 className="game-title">⭕ Tic Tac Toe</h2>
      <div className="game-stats">
        <p>Current Player: <span className="stat-value">{isXNext ? '❌' : '⭕'}</span></p>
        <button className="reset-btn" onClick={resetGame}>New Game</button>
      </div>

      <div className="tictactoe-board">
        {board.map((value, index) => (
          <button
            key={index}
            className="tictactoe-cell"
            onClick={() => handleClick(index)}
          >
            {value}
          </button>
        ))}
      </div>

      {gameOver && (
        <div className="game-modal">
          <div className="modal-content">
            <h3>{winner ? `${winner} Won! 🎉` : "It's a Draw! 🤝"}</h3>
            <button className="modal-btn" onClick={resetGame}>Play Again</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TicTacToe;