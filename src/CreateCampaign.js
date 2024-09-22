import React, { useState } from 'react';
import useCrowdfunding from './useCrowdfunding';
import { ethers } from 'ethers';

const CreateCampaign = ({ onCampaignCreated, campaigns }) => {
  const { crowdfundingContract } = useCrowdfunding();
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState('');
  const [loading, setLoading] = useState(false);

  const createCampaign = async () => {
    if (!description || !goal) {
      alert('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      const transaction = await crowdfundingContract.createCampaign(
        description,
        ethers.parseUnits(goal, 'ether')
      );
      await transaction.wait();

      setLoading(false);

      const newCampaign = { description, goal };
      onCampaignCreated(newCampaign);
      setDescription('');
      setGoal('');
      alert('Campaign Created!');
    } catch (error) {
      console.error('Error creating campaign:', error);
      setLoading(false);
      alert('Error creating campaign. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Create a Campaign</h1>
        <input
          type="text"
          placeholder="Campaign Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Goal in ETH"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          style={styles.input}
        />
        <button
          onClick={createCampaign}
          style={styles.button}
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Campaign'}
        </button>
      </div>

      {campaigns.length > 0 && (
        <div style={styles.campaignList}>
          <h2 style={styles.subtitle}>Your Created Campaigns</h2>
          <ul style={styles.list}>
            {campaigns.map((campaign, index) => (
              <li key={index} style={styles.campaignItem}>
                <strong>Description:</strong> {campaign.description} <br />
                <strong>Goal:</strong> {campaign.goal} ETH
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  card: {
    background: 'linear-gradient(135deg, #ADD8E6 0%, #8fd3f4 100%)',
    padding: '30px 20px',
    borderRadius: '10px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    width: '100%',
    maxWidth: '350px',
    marginBottom: '20px',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    width: '90%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '14px',
    outline: 'none',
    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)',
  },
  button: {
    width: '60%',
    padding: '12px',
    backgroundColor: '#ff5851',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  campaignList: {
    textAlign: 'left',
    width: '100%',
    maxWidth: '350px',
  },
  subtitle: {
    fontSize: '20px',
    marginBottom: '15px',
    fontWeight: 'bold',
    color: '#333',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  campaignItem: {
    background: '#f0f8ff',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
};

export default CreateCampaign;
