import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';
import ShuttleTableGame from '../games/ShuttleTableGame';
import QuickMath from '../games/QuickMath';
import PatternMatch from '../games/PatternMatch';
import NumberShuffle from '../games/NumberShuffle';
import MemoryFlip from '../games/MemoryFlip';
import SequenceRecall from '../games/SequenceRecall';
import ShapeSpeed from '../games/ShapeSpeed';
import WordLogic from '../games/WordLogic';
import ColorSwitch from '../games/ColorSwitch';
import OddOneOut from '../games/OddOneOut';
import './GameHub.css';

const games = [
  { id: 'shuttle', name: 'Shuttle Table', icon: '🔢', description: 'Tap numbers 1-30 in order', difficulty: 'Medium', color: '#ff6b35' },
  { id: 'number-shuffle', name: 'Number Shuffle', icon: '📊', description: 'Arrange numbers in sequence', difficulty: 'Easy', color: '#00ff88' },
  { id: 'memory-flip', name: 'Memory Flip', icon: '🎴', description: 'Match hidden symbols', difficulty: 'Hard', color: '#ff006e' },
  { id: 'color-switch', name: 'Color Switch', icon: '🎨', description: 'Choose matching colors', difficulty: 'Medium', color: '#f7931e' },
  { id: 'quick-math', name: 'Quick Math', icon: '➕', description: 'Solve equations fast', difficulty: 'Medium', color: '#ff6b35' },
  { id: 'pattern-match', name: 'Pattern Match', icon: '🌀', description: 'Remember patterns', difficulty: 'Hard', color: '#ff4757' },
  { id: 'sequence-recall', name: 'Sequence Recall', icon: '📝', description: 'Remember sequences', difficulty: 'Hard', color: '#f946ff' },
  { id: 'shape-speed', name: 'Shape Speed', icon: '🔷', description: 'Tap matching shapes', difficulty: 'Easy', color: '#00ff88' },
  { id: 'word-logic', name: 'Word Logic', icon: '📚', description: 'Find synonyms/antonyms', difficulty: 'Medium', color: '#f7931e' },
  { id: 'odd-one-out', name: 'Odd One Out', icon: '🔍', description: 'Find the different item', difficulty: 'Medium', color: '#ff6b35' },
];

const GameHub = ({ user, setCurrentView, soundEnabled }) => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [gameResult, setGameResult] = useState(null);

  const handleGameComplete = (result) => {
    if (result.action === 'back') {
      setSelectedGame(null);
      return;
    }
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
    if (selectedGame === 'pattern-match') {
      return <PatternMatch onComplete={handleGameComplete} soundEnabled={soundEnabled} />;
    }
    if (selectedGame === 'number-shuffle') {
      return <NumberShuffle onComplete={handleGameComplete} soundEnabled={soundEnabled} />;
    }
    if (selectedGame === 'memory-flip') {
      return <MemoryFlip onComplete={handleGameComplete} soundEnabled={soundEnabled} />;
    }
    if (selectedGame === 'sequence-recall') {
      return <SequenceRecall onComplete={handleGameComplete} soundEnabled={soundEnabled} />;
    }
    if (selectedGame === 'shape-speed') {
      return <ShapeSpeed onComplete={handleGameComplete} soundEnabled={soundEnabled} />;
    }
    if (selectedGame === 'word-logic') {
      return <WordLogic onComplete={handleGameComplete} soundEnabled={soundEnabled} />;
    }
    if (selectedGame === 'color-switch') {
      return <ColorSwitch onComplete={handleGameComplete} soundEnabled={soundEnabled} />;
    }
    if (selectedGame === 'odd-one-out') {
      return <OddOneOut onComplete={handleGameComplete} soundEnabled={soundEnabled} />;
    }
    // All games are now implemented!
    return (
      <div className="game-start-screen">
        <motion.div className="game-start-card" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <h2>All Games Complete!</h2>
          <p>All 10 games are now fully playable!</p>
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
            <span className="game-badge">✓ Play Now</span>
          </motion.div>
        ))}
      </div>

      <div className="coming-soon-notice">
        <p>🎮 All 10 games are fully playable! Every single game is ready to play with unique challenges and scoring systems. Enjoy the complete brain training experience!</p>
      </div>
    </div>
  );
};

export default GameHub;
