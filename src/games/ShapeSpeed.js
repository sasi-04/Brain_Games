import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './QuickMath.css';

const QuickMath = ({ onComplete, soundEnabled }) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [gameActive, setGameActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operator, setOperator] = useState('+');
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [difficulty, setDifficulty] = useState(null);
  const [showDifficultySelect, setShowDifficultySelect] = useState(true);

  const generateQuestion = () => {
    const ops = ['+', '-', '×'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    let n1, n2;
    
    if (difficulty === 'easy') {
      if (op === '+') {
        n1 = Math.floor(Math.random() * 20) + 1;
        n2 = Math.floor(Math.random() * 20) + 1;
      } else if (op === '-') {
        n1 = Math.floor(Math.random() * 30) + 10;
        n2 = Math.floor(Math.random() * n1);
      } else {
        n1 = Math.floor(Math.random() * 5) + 1;
        n2 = Math.floor(Math.random() * 5) + 1;
      }
    } else if (difficulty === 'medium') {
      if (op === '+') {
        n1 = Math.floor(Math.random() * 50) + 1;
        n2 = Math.floor(Math.random() * 50) + 1;
      } else if (op === '-') {
        n1 = Math.floor(Math.random() * 50) + 25;
        n2 = Math.floor(Math.random() * n1);
      } else {
        n1 = Math.floor(Math.random() * 10) + 1;
        n2 = Math.floor(Math.random() * 10) + 1;
      }
    } else if (difficulty === 'hard') {
      if (op === '+') {
        n1 = Math.floor(Math.random() * 200) + 50;
        n2 = Math.floor(Math.random() * 200) + 50;
      } else if (op === '-') {
        n1 = Math.floor(Math.random() * 200) + 100;
        n2 = Math.floor(Math.random() * n1);
      } else {
        n1 = Math.floor(Math.random() * 20) + 5;
        n2 = Math.floor(Math.random() * 20) + 5;
      }
    }
    
    setNum1(n1);
    setNum2(n2);
    setOperator(op);
  };

  const startGame = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    setScore(0);
    setTimeLeft(selectedDifficulty === 'easy' ? 30 : selectedDifficulty === 'medium' ? 20 : 15);
    setGameActive(true);
    setGameOver(false);
    setShowDifficultySelect(false);
    setUserAnswer('');
    generateQuestion();
  };

  const getCorrectAnswer = () => {
    if (operator === '+') return num1 + num2;
    if (operator === '-') return num1 - num2;
    if (operator === '×') return num1 * num2;
    return 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!gameActive || gameOver) return;

    const answer = parseInt(userAnswer);
    const correct = getCorrectAnswer();

    if (answer === correct) {
      setScore(prev => prev + 10);
      setFeedback('✓ Correct!');
      setTimeout(() => {
        setFeedback('');
        setUserAnswer('');
        generateQuestion();
      }, 500);
    } else {
      setFeedback('✗ Wrong!');
      setTimeout(() => setFeedback(''), 500);
    }
  };

  const completeGame = () => {
    setGameActive(false);
    setGameOver(true);
    const finalIQ = Math.floor((score * 2) / 10);
    onComplete({
      game: 'Quick Math',
      score: score,
      iq: finalIQ,
      time: 20 - timeLeft
    });
  };

  useEffect(() => {
    if (gameActive && !gameOver && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            completeGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [gameActive, gameOver, timeLeft]);

  if (!gameActive && !gameOver) {
    return (
      <div className="game-start-screen">
        <motion.div className="game-start-card" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <h2>Quick Math</h2>
          <p>Choose your difficulty level:</p>
          <div className="difficulty-buttons">
            <button className="difficulty-btn easy" onClick={() => startGame('easy')}>
              <h3>Easy</h3>
              <p>30 seconds<br/>Small numbers</p>
            </button>
            <button className="difficulty-btn medium" onClick={() => startGame('medium')}>
              <h3>Medium</h3>
              <p>20 seconds<br/>Medium numbers</p>
            </button>
            <button className="difficulty-btn hard" onClick={() => startGame('hard')}>
              <h3>Hard</h3>
              <p>15 seconds<br/>Large numbers</p>
            </button>
          </div>
          <button className="btn-secondary" onClick={() => onComplete({ game: 'Quick Math', score: 0, iq: 0, time: 0, action: 'back' })}>
            ← Back to Games
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="quickmath-container">
      <div className="game-header">
        <button className="back-btn" onClick={() => onComplete({ game: 'Quick Math', score: 0, iq: 0, time: 0, action: 'back' })}>
          ← Back
        </button>
        <div className="game-timer">
          <motion.div className="timer-circle" animate={{ rotate: [0, 360] }} transition={{ duration: timeLeft, ease: "linear" }}>
            <div className="timer-text">{timeLeft}</div>
          </motion.div>
        </div>
        
        <div className="game-stats">
          <div className="stat">
            <span className="stat-label">Score</span>
            <span className="stat-value">{score}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Level</span>
            <span className="stat-value">{difficulty?.charAt(0).toUpperCase() + difficulty?.slice(1)}</span>
          </div>
        </div>
      </div>

      {feedback && (
        <motion.div className={`feedback ${feedback.includes('✓') ? 'correct' : 'wrong'}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {feedback}
        </motion.div>
      )}

      <div className="question-container">
        <motion.div 
          className="question"
          key={`${num1}-${num2}-${operator}`}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <span className="number">{num1}</span>
          <span className="operator">{operator}</span>
          <span className="number">{num2}</span>
          <span className="equals">=</span>
        </motion.div>

        <form onSubmit={handleSubmit} className="answer-form">
          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Your answer"
            className="answer-input"
            autoFocus
            disabled={gameOver}
          />
          <button type="submit" className="submit-btn" disabled={gameOver}>
            Submit
          </button>
        </form>
      </div>

      {gameOver && (
        <motion.div className="game-over-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <motion.div className="game-over-card" initial={{ scale: 0.8, y: 50 }} animate={{ scale: 1, y: 0 }}>
            <h2>Game Complete!</h2>
            <p className="final-score">Score: {score}</p>
            <p className="iq-score">IQ Gain: +{Math.floor((score * 2) / 10)}</p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default QuickMath;






