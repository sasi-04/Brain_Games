import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGamepad, FaTrophy, FaUser, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = ({ user, setCurrentView, soundEnabled, setSoundEnabled }) => {
  const [stats] = useState({
    level: 5,
    xp: 750,
    nextLevelXP: 1000,
    streak: 7,
    gamesPlayed: 23,
    totalIQ: 1245
  });

  const xpProgress = (stats.xp / stats.nextLevelXP) * 100;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <motion.h1 className="dashboard-title" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
          Welcome back, Genius! 🧠
        </motion.h1>
        <button className="sound-toggle" onClick={() => setSoundEnabled(!soundEnabled)}>
          {soundEnabled ? <FaVolumeUp /> : <FaVolumeMute />}
        </button>
      </div>

      <div className="dashboard-grid">
        {/* Level & XP Card */}
        <motion.div className="dashboard-card stats-card" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="level-display">
            <h2 className="level-number">LVL {stats.level}</h2>
            <div className="xp-bar-container">
              <div className="xp-bar">
                <motion.div className="xp-fill" initial={{ width: 0 }} animate={{ width: `${xpProgress}%` }} transition={{ duration: 1 }} />
              </div>
              <span className="xp-text">{stats.xp}/{stats.nextLevelXP} XP</span>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon">🔥</div>
              <div className="stat-info">
                <p className="stat-label">Streak</p>
                <p className="stat-value">{stats.streak} days</p>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">🎮</div>
              <div className="stat-info">
                <p className="stat-label">Games</p>
                <p className="stat-value">{stats.gamesPlayed}</p>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">🧠</div>
              <div className="stat-info">
                <p className="stat-label">IQ Score</p>
                <p className="stat-value">{stats.totalIQ}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Brain Games Card */}
        <motion.div className="dashboard-card" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} onClick={() => setCurrentView('gamehub')}>
          <div className="card-icon"><FaGamepad /></div>
          <h3>Brain Games</h3>
          <p>Train your brain with 10+ challenging games</p>
          <button className="card-button">Start Training →</button>
        </motion.div>

        {/* Leaderboard Card */}
        <motion.div className="dashboard-card" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} onClick={() => setCurrentView('leaderboard')}>
          <div className="card-icon"><FaTrophy /></div>
          <h3>Leaderboard</h3>
          <p>Compete with players worldwide</p>
          <button className="card-button">View Rankings →</button>
        </motion.div>

        {/* Profile Card */}
        <motion.div className="dashboard-card" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} onClick={() => setCurrentView('profile')}>
          <div className="card-icon"><FaUser /></div>
          <h3>Profile</h3>
          <p>View your stats and achievements</p>
          <button className="card-button">View Profile →</button>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
