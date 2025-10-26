import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ShuttleTableGame.css';

const ShuttleTableGame = ({ onComplete, soundEnabled }) => {
  const [numbers, setNumbers] = useState([]);
  const [currentNumber, setCurrentNumber] = useState(1);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [gameActive, setGameActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [feedback, setFeedback] = useState('');

  const generateNumbers = () => {
    const nums = Array.from({ length: 30 }, (_, i) => i + 1);
    for (let i = nums.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
    return nums;
  };

  const startGame = () => {
    setNumbers(generateNumbers());
    setCurrentNumber(1);
    setScore(0);
    setTimeLeft(20);
    setGameActive(true);
    setGameOver(false);
    setFeedback('');
  };

  const handleNumberClick = (num) => {
    if (!gameActive || gameOver) return;

    if (num === currentNumber) {
      setCurrentNumber(prev => prev + 1);
      setScore(prev => prev + 10);
      setFeedback('✓ Correct!');
      
      if (num === 30) {
        completeGame();
      }

      // Only reshuffle if not completing the game
      if (num % 5 === 0 && num < 30) {
        // No immediate reshuffle - numbers stay visible
      }
    } else {
      setScore(prev => Math.max(0, prev - 5));
      setFeedback('✗ Wrong!');
    }

    setTimeout(() => setFeedback(''), 500);
  };

  const completeGame = () => {
    setGameActive(false);
    setGameOver(true);
    const finalScore = calculateIQ(score, timeLeft);
    onComplete({
      game: 'Shuttle Table',
      score: score,
      iq: finalScore,
      time: 20 - timeLeft
    });
  };

  const calculateIQ = (score, timeLeft) => {
    const speedBonus = timeLeft * 5;
    return Math.floor((score + speedBonus) / 10);
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
          <h2>Shuttle Table Game</h2>
          <p>Click numbers from 1 to 30 as fast as possible!</p>
          <p className="game-instruction">Speed + Accuracy = High IQ</p>
          <button className="btn-primary" onClick={startGame}>START GAME</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="shuttle-game-container">
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
          <div className="stat">
            <span className="stat-label">Target</span>
            <span className="stat-value">{currentNumber}/30</span>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {feedback && (
          <motion.div className={`feedback ${feedback.includes('✓') ? 'correct' : 'wrong'}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {feedback}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="numbers-grid">
        {numbers.map((num, idx) => (
          <motion.button
            key={idx}
            className={`number-cell ${num === currentNumber ? 'active' : ''}`}
            onClick={() => handleNumberClick(num)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.02, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {num}
          </motion.button>
        ))}
      </div>

      {gameOver && (
        <motion.div className="game-over-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <motion.div className="game-over-card" initial={{ scale: 0.8, y: 50 }} animate={{ scale: 1, y: 0 }}>
            <h2>Game Complete!</h2>
            <p className="final-score">Score: {score}</p>
            <p className="iq-score">IQ Gain: +{calculateIQ(score, timeLeft)}</p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ShuttleTableGame;
