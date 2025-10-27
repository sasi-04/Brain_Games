import React from 'react';
import './Profile.css';

const Profile = ({ user, setCurrentView, soundEnabled }) => {
  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <p>Your profile information</p>
      <button onClick={() => setCurrentView('dashboard')}>Back</button>
    </div>
  );
};

export default Profile;

