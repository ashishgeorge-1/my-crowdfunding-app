import React, { useState } from 'react';
import CampaignGrid from './CampaignGrid';
import CreateCampaign from './CreateCampaign';
import './App.css';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Hardcoded login check
    if (email === 'ashishgeorge2003@gmail.com' && password === 'Ashish@2003') {
      setIsLoggedIn(true);
      setIsAdmin(true);
      alert('Logged in as Admin');
    } else {
      setIsLoggedIn(true);
      setIsAdmin(false);
      alert('Logged in as Regular User');
    }
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <div className="login-form">
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <div>
          <h1>Welcome {isAdmin ? 'Admin' : 'User'}</h1>
          {isAdmin && (
            <div>
              <h2>Create a Campaign</h2>
              <CreateCampaign />
            </div>
          )}
          <h2>Available Campaigns</h2>
          <CampaignGrid />
        </div>
      )}
    </div>
  );
};

export default App;
