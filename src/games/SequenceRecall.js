import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './SequenceRecall.css';

const SequenceRecall = ({ onComplete, soundEnabled }) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [gameActive, setGameActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [showingSequence, setShowingSequence] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [difficulty, setDifficulty] = useState(null);
  const [showDifficultySelect, setShowDifficultySelect] = useState(true);

  const generateSequence = () => {
    const length = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 4 : 5;
    const newSequence = [];
    for (let i = 0; i < length; i++) {
      newSequence.push(Math.floor(Math.random() * 9) + 1);
    }
    setSequence(newSequence);
    setUserSequence([]);
    setShowingSequence(true);
    
    // Hide sequence after showing it
    const displayTime = difficulty === 'easy' ? 3000 : difficulty === 'medium' ? 2000 : 1500;
    setTimeout(() => {
      setShowingSequence(false);
    }, displayTime);
  };

  const startGame = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    setScore(0);
    setTimeLeft(selectedDifficulty === 'easy' ? 45 : selectedDifficulty === 'medium' ? 30 : 20);
    setGameActive(true);
    setGameOver(false);
    setShowDifficultySelect(false);
    generateSequence();
  };

  const handleNumberClick = (number) => {
    if (!gameActive || gameOver || showingSequence) return;

    const newUserSequence = [...userSequence, number];
    setUserSequence(newUserSequence);

    // Check if sequence matches
    if (newUserSequence.length === sequence.length) {
      const isCorrect = newUserSequence.every((num, index) => num === sequence[index]);
      
      if (isCorrect) {
        setScore(prev => prev + 10);
        setFeedback('✓ Correct!');
        setTimeout(() => {
          setFeedback('');
          generateSequence();
        }, 1000);
      } else {
        setFeedback('✗ Wrong Sequence!');
        setTimeout(() => setFeedback(''), 1000);
      }
    }
  };

  const completeGame = () => {
    setGameActive(false);
    setGameOver(true);
    const finalIQ = Math.floor((score * 2) / 10);
    onComplete({
      game: 'Sequence Recall',
      score: score,
      iq: finalIQ,
      time: 30 - timeLeft
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
          <h2>Sequence Recall</h2>
          <p>Choose your difficulty level:</p>
          <div className="difficulty-buttons">
            <button className="difficulty-btn easy" onClick={() => startGame('easy')}>
              <h3>Easy</h3>
              <p>45 seconds<br/>3 numbers</p>
            </button>
            <button className="difficulty-btn medium" onClick={() => startGame('medium')}>
              <h3>Medium</h3>
              <p>30 seconds<br/>4 numbers</p>
            </button>
            <button className="difficulty-btn hard" onClick={() => startGame('hard')}>
              <h3>Hard</h3>
              <p>20 seconds<br/>5 numbers</p>
            </button>
          </div>
          <button className="btn-secondary" onClick={() => onComplete({ game: 'Sequence Recall', score: 0, iq: 0, time: 0, action: 'back' })}>
            ← Back to Games
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="sequencerecall-container">
      <div className="game-header">
        <button className="back-btn" onClick={() => onComplete({ game: 'Sequence Recall', score: 0, iq: 0, time: 0, action: 'back' })}>
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
        <div className="sequence-display">
          <h3>{showingSequence ? 'Watch the Sequence!' : 'Repeat the Sequence'}</h3>
          <div className="sequence-numbers">
            {sequence.map((number, index) => (
              <motion.div
                key={index}
                className="sequence-number"
                animate={showingSequence ? { scale: [1, 1.2, 1] } : {}}
                transition={{ delay: index * 0.5, duration: 0.3 }}
              >
                {number}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="number-grid">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
            <motion.button
              key={number}
              className="number-button"
              onClick={() => handleNumberClick(number)}
              disabled={showingSequence || gameOver}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {number}
            </motion.button>
          ))}
        </div>
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

export default SequenceRecall;