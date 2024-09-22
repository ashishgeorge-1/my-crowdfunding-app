import React, { useState, useEffect } from 'react';
import CampaignGrid from './CampaignGrid';
import CreateCampaign from './CreateCampaign';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    // Load campaigns from local storage on component mount
    const storedCampaigns = localStorage.getItem('campaigns');
    if (storedCampaigns) {
      setCampaigns(JSON.parse(storedCampaigns));
    }
  }, []);

  const handleLogin = () => {
    if (email === 'ashishgeorge2003@gmail.com' && password === 'Ashish@2003') {
      setIsLoggedIn(true);
      setIsAdmin(true);
      alert('Logged in as Admin');
    } else if ((email === 'abhi@gmail.com' || email === 'alan@gmail.com') && password === '12345') {
      setIsLoggedIn(true);
      setIsAdmin(false);
      alert('Logged in as Regular User');
    } else {
      alert('Invalid credentials');
    }
  };

  const handleCampaignCreated = (newCampaign) => {
    const updatedCampaigns = [...campaigns, newCampaign];
    setCampaigns(updatedCampaigns);
    // Store updated campaigns in local storage
    localStorage.setItem('campaigns', JSON.stringify(updatedCampaigns));
  };

  // Updated styles from the new code
  const appStyles = {
    fontFamily: 'Poppins, sans-serif',
    padding: '20px',
    backgroundColor: '#f0f8ff',
    minHeight: '100vh',
    position: 'relative',
  };

  const contentStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const columnStyles = {
    flex: 1,
    padding: '20px',
  };

  const titleStyles = {
    fontWeight: '900',
    color: '#333',
    marginBottom: '20px',
    textAlign: 'center',
  };

  const logoutButtonStyles = {
    position: 'absolute',
    top: '20px',
    right: '20px',
    padding: '10px 20px',
    backgroundColor: '#ff5851',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
  };

  const loginFormStyles = {
    width: '400px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const inputStyles = {
    display: 'block',
    margin: '10px auto',
    padding: '12px',
    width: '90%',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontFamily: 'Poppins, sans-serif',
  };

  const buttonStyles = {
    padding: '12px 20px',
    backgroundColor: '#4caf50',
    color: 'white',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '30%',
    marginTop: '10px',
    fontFamily: 'Poppins, sans-serif',
  };

  return (
    <div style={appStyles}>
      {isLoggedIn && (
        <button style={logoutButtonStyles} onClick={() => {
          setIsLoggedIn(false);
          setEmail('');
          setPassword('');
          alert('Logged out successfully');
        }}>
          Logout
        </button>
      )}
      {!isLoggedIn ? (
        <div style={loginFormStyles}>
          <h2 style={titleStyles}>Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyles}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyles}
          />
          <button onClick={handleLogin} style={buttonStyles}>
            Login
          </button>
        </div>
      ) : (
        <div>
          <h1 style={{ ...titleStyles, fontSize: '30px', fontWeight: '1000' }}>
            Welcome {isAdmin ? 'Admin!' : 'User'}
          </h1>
          <div style={contentStyles}>
            <div style={columnStyles}>
              {isAdmin && (
                <div>
                  <h2 style={titleStyles}>Create a Campaign</h2>
                  <CreateCampaign onCampaignCreated={handleCampaignCreated} campaigns={campaigns} />
                </div>
              )}
            </div>
            <div style={columnStyles}>
              <h2 style={{ ...titleStyles, marginTop: '0' }}>Available Campaigns</h2>
              <CampaignGrid campaigns={campaigns} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
