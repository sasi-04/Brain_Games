import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import './App.css';

import Landing from './components/Landing';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import GameHub from './components/GameHub';
import Profile from './components/Profile';
import Leaderboard from './components/Leaderboard';

function App() {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('landing');
  const [loading, setLoading] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        setCurrentView('dashboard');
      }
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <motion.div className="loading-spinner" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
          <div className="spinner-ring"></div>
        </motion.div>
        <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          Initializing Neural Network...
        </motion.h2>
      </div>
    );
  }

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        {currentView === 'landing' && <Landing key="landing" onStart={() => setCurrentView(user ? 'dashboard' : 'auth')} />}
        {currentView === 'auth' && <Auth key="auth" onSuccess={() => setCurrentView('dashboard')} />}
        {currentView === 'dashboard' && <Dashboard key="dashboard" user={user} setCurrentView={setCurrentView} soundEnabled={soundEnabled} setSoundEnabled={setSoundEnabled} />}
        {currentView === 'gamehub' && <GameHub key="gamehub" user={user} setCurrentView={setCurrentView} soundEnabled={soundEnabled} />}
        {currentView === 'profile' && <Profile key="profile" user={user} setCurrentView={setCurrentView} soundEnabled={soundEnabled} />}
        {currentView === 'leaderboard' && <Leaderboard key="leaderboard" user={user} setCurrentView={setCurrentView} soundEnabled={soundEnabled} />}
      </AnimatePresence>
    </div>
  );
}

export default App;

