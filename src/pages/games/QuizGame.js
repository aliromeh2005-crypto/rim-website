import React, { useState } from 'react';
import './GameStyles.css';

function QuizGame() {
  const quizQuestions = [
    {
      question: 'What is the capital of France?',
      options: ['London', 'Paris', 'Berlin', 'Madrid'],
      correct: 1
    },
    {
      question: 'Which planet is closest to the Sun?',
      options: ['Venus', 'Mercury', 'Earth', 'Mars'],
      correct: 1
    },
    {
      question: 'What is the largest ocean?',
      options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'],
      correct: 3
    },
    {
      question: 'Who painted the Mona Lisa?',
      options: ['Michelangelo', 'Leonardo da Vinci', 'Raphael', 'Donatello'],
      correct: 1
    },
    {
      question: 'What is 2 + 2?',
      options: ['3', '4', '5', '6'],
      correct: 1
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleAnswer = (index) => {
    if (answered) return;
    setSelectedAnswer(index);
    setAnswered(true);
    if (index === quizQuestions[currentQuestion].correct) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswered(false);
      setSelectedAnswer(null);
    } else {
      setQuizComplete(true);
    }
  };

  const restart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setAnswered(false);
    setSelectedAnswer(null);
    setQuizComplete(false);
  };

  if (quizComplete) {
    return (
      <div className="game-container">
        <div className="game-modal">
          <div className="modal-content">
            <h3>🎉 Quiz Complete! 🎉</h3>
            <p>Your Score: <span className="stat-value">{score}/{quizQuestions.length}</span></p>
            <p>Percentage: {Math.round((score / quizQuestions.length) * 100)}%</p>
            <button className="modal-btn" onClick={restart}>Play Again</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="game-container">
      <h2 className="game-title">❓ Quiz Game</h2>
      <div className="game-stats">
        <p>Question: <span className="stat-value">{currentQuestion + 1}/{quizQuestions.length}</span></p>
        <p>Score: <span className="stat-value">{score}</span></p>
      </div>

      <div className="quiz-container">
        <h3 className="quiz-question">{quizQuestions[currentQuestion].question}</h3>
        <div className="quiz-options">
          {quizQuestions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              className={`quiz-option ${
                selectedAnswer === index
                  ? index === quizQuestions[currentQuestion].correct
                    ? 'correct'
                    : 'incorrect'
                  : ''
              }`}
              onClick={() => handleAnswer(index)}
              disabled={answered}
            >
              {option}
            </button>
          ))}
        </div>

        {answered && (
          <button className="modal-btn" onClick={nextQuestion}>
            {currentQuestion + 1 === quizQuestions.length ? 'See Results' : 'Next Question'}
          </button>
        )}
      </div>
    </div>
  );
}

export default QuizGame;