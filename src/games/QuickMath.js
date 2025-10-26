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

  const generateQuestion = () => {
    const ops = ['+', '-', '×'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    let n1, n2;
    
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
    
    setNum1(n1);
    setNum2(n2);
    setOperator(op);
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(20);
    setGameActive(true);
    setGameOver(false);
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
          <p>Solve as many equations as possible in 20 seconds!</p>
          <button className="btn-primary" onClick={startGame}>START GAME</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="quickmath-container">
      <div className="game-header">
        <div className="game-timer">
          <motion.div className="timer-circle" animate={{ rotate: [0, 360] }} transition={{ duration: 20, ease: "linear" }}>
            <div className="timer-text">{timeLeft}</div>
          </motion.div>
        </div>
        
        <div className="game-stats">
          <div className="stat">
            <span className="stat-label">Score</span>
            <span className="stat-value">{score}</span>
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

