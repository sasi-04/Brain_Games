import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';
import ShuttleTableGame from '../games/ShuttleTableGame';
import QuickMath from '../games/QuickMath';
import './GameHub.css';

const games = [
  { id: 'shuttle', name: 'Shuttle Table', icon: '🔢', description: 'Tap numbers 1-30 in order', difficulty: 'Medium', color: '#00f3ff' },
  { id: 'number-shuffle', name: 'Number Shuffle', icon: '📊', description: 'Arrange numbers in sequence', difficulty: 'Easy', color: '#00ff88' },
  { id: 'memory-flip', name: 'Memory Flip', icon: '🎴', description: 'Match hidden symbols', difficulty: 'Hard', color: '#ff006e' },
  { id: 'color-switch', name: 'Color Switch', icon: '🎨', description: 'Choose matching colors', difficulty: 'Medium', color: '#8b5cf6' },
  { id: 'quick-math', name: 'Quick Math', icon: '➕', description: 'Solve equations fast', difficulty: 'Medium', color: '#00f3ff' },
  { id: 'pattern-match', name: 'Pattern Match', icon: '🌀', description: 'Remember patterns', difficulty: 'Hard', color: '#ff4757' },
  { id: 'sequence-recall', name: 'Sequence Recall', icon: '📝', description: 'Remember sequences', difficulty: 'Hard', color: '#f946ff' },
  { id: 'shape-speed', name: 'Shape Speed', icon: '🔷', description: 'Tap matching shapes', difficulty: 'Easy', color: '#00ff88' },
  { id: 'word-logic', name: 'Word Logic', icon: '📚', description: 'Find synonyms/antonyms', difficulty: 'Medium', color: '#8b5cf6' },
  { id: 'odd-one-out', name: 'Odd One Out', icon: '🔍', description: 'Find the different item', difficulty: 'Medium', color: '#00f3ff' },
];

const GameHub = ({ user, setCurrentView, soundEnabled }) => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [gameResult, setGameResult] = useState(null);

  const handleGameComplete = (result) => {
    setGameResult(result);
    setSelectedGame(null);
    // Return to game hub after a delay
    setTimeout(() => {
      setGameResult(null);
    }, 3000);
  };

  // Generic placeholder game component
  const renderGame = () => {
    if (selectedGame === 'shuttle') {
      return <ShuttleTableGame onComplete={handleGameComplete} soundEnabled={soundEnabled} />;
    }
    if (selectedGame === 'quick-math') {
      return <QuickMath onComplete={handleGameComplete} soundEnabled={soundEnabled} />;
    }
    // Placeholder for other games
    return (
      <div className="game-start-screen">
        <motion.div className="game-start-card" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <h2>{games.find(g => g.id === selectedGame)?.name || 'Game'}</h2>
          <p>Coming soon! This game is under development.</p>
          <button className="btn-primary" onClick={() => setSelectedGame(null)}>Back to Games</button>
        </motion.div>
      </div>
    );
  };

  // If playing a game, show the game component
  if (selectedGame) {
    return renderGame();
  }

  return (
    <div className="gamehub-container">
      <div className="gamehub-header">
        <button className="back-button" onClick={() => setCurrentView('dashboard')}>
          <FaArrowLeft /> Back
        </button>
        <h1 className="gamehub-title">Brain Games</h1>
      </div>

      {gameResult && (
        <motion.div className="game-result-banner" initial={{ y: -100 }} animate={{ y: 0 }}>
          <p>🎉 You earned {gameResult.iq} IQ points!</p>
        </motion.div>
      )}

      <div className="games-grid">
        {games.map((game, index) => (
          <motion.div
            key={game.id}
            className="game-card"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setSelectedGame(game.id)}
            style={{ borderColor: game.color }}
          >
            <div className="game-icon" style={{ filter: `drop-shadow(0 0 20px ${game.color}80)` }}>{game.icon}</div>
            <h3>{game.name}</h3>
            <p>{game.description}</p>
            <div className="game-difficulty" style={{ color: game.color }}>{game.difficulty}</div>
            <span className="game-badge">{game.id === 'shuttle' || game.id === 'quick-math' ? '✓ Play Now' : '✓ Click to Open'}</span>
          </motion.div>
        ))}
      </div>

      <div className="coming-soon-notice">
        <p>🎮 All games are now clickable! Shuttle Table and Quick Math are fully playable. Other games show placeholder screens.</p>
      </div>
    </div>
  );
};

export default GameHub;
