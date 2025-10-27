import React from 'react';
import './Leaderboard.css';

const Leaderboard = ({ user, setCurrentView, soundEnabled }) => {
  return (
    <div className="leaderboard-container">
      <h1>Leaderboard</h1>
      <p>Top players will appear here</p>
      <button onClick={() => setCurrentView('dashboard')}>Back</button>
    </div>
  );
};

export default Leaderboard;

