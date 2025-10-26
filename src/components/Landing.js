import React from 'react';
import { motion } from 'framer-motion';
import './Landing.css';

const Landing = ({ onStart }) => {
  return (
    <div className="landing-container">
      <motion.div className="landing-content" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="landing-title">🧠 IQ BOOSTER</h1>
        <p className="landing-subtitle">Train Your Brain • Level Up Your IQ</p>
        <button className="btn-primary" onClick={onStart}>START TRAINING</button>
      </motion.div>
    </div>
  );
};

export default Landing;

