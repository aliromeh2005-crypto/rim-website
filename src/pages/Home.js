import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <div className="welcome-section">
        <h2 className="welcome-title">Welcome! 👋</h2>
        <p className="welcome-text">
          Hey! Welcome to this special interactive universe created just for you! 
          Here you can play amazing games, have fun, and share some things about yourself 
          through our fun questionnaire.
        </p>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">🧠</div>
          <h3>Memory Game</h3>
          <p>Test your memory skills by matching pairs of cards!</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🧩</div>
          <h3>Puzzle Game</h3>
          <p>Solve sliding puzzles and challenge your brain!</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">❓</div>
          <h3>Quiz Game</h3>
          <p>Answer trivia questions and test your knowledge!</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">⭕</div>
          <h3>Tic Tac Toe</h3>
          <p>Classic strategy game - play against the computer!</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🎨</div>
          <h3>Drawing Game</h3>
          <p>Express your creativity on a digital canvas!</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🌈</div>
          <h3>Color Match</h3>
          <p>Match colors and improve your perception skills!</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">📝</div>
          <h3>Word Guess</h3>
          <p>Guess the word based on clever clues!</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">💭</div>
          <h3>Questionnaire</h3>
          <p>Share interesting things about yourself!</p>
        </div>
      </div>

      <div className="cta-section">
        <h3>Ready to have fun?</h3>
        <p>Pick a game from the menu and let's go! 🚀</p>
      </div>
    </div>
  );
}

export default Home;
