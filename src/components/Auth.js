import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Auth.css';

const Auth = ({ onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Demo credentials validation
    if (isLogin) {
      if (email === 'demo@iqbooster.com' && password === 'demo123') {
        onSuccess();
      } else {
        setError('Invalid credentials! Use demo@iqbooster.com / demo123');
      }
    } else {
      // For signup, just proceed
      if (email && password.length >= 6) {
        onSuccess();
      } else {
        setError('Password must be at least 6 characters');
      }
    }
  };

  return (
    <div className="auth-container">
      <motion.div 
        className="auth-card"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="auth-header">
          <h1 className="auth-logo">🧠 IQ BOOSTER</h1>
          <p className="auth-subtitle">
            {isLogin ? 'Welcome back, Genius!' : 'Join the Brain Revolution'}
          </p>
        </div>

        <div className="demo-credentials">
          <p>📧 Demo Login:</p>
          <p><strong>Email:</strong> demo@iqbooster.com</p>
          <p><strong>Password:</strong> demo123</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && (
            <div className="error-message">{error}</div>
          )}

          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="auth-input"
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="auth-input"
            />
          </div>

          <button type="submit" className="btn-primary">
            {isLogin ? 'LOGIN' : 'SIGN UP'}
          </button>
        </form>

        <div className="auth-toggle">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => setIsLogin(!isLogin)} className="auth-toggle-btn">
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;

