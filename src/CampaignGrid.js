import React, { useState, useEffect } from 'react';
import useCrowdfunding from './useCrowdfunding';
import { ethers } from 'ethers';

const CampaignGrid = ({ campaigns }) => {
  const { crowdfundingContract } = useCrowdfunding();
  const [depositAmounts, setDepositAmounts] = useState({});
  const [campaignBalances, setCampaignBalances] = useState({});

  // Load balances from localStorage when the component mounts
  useEffect(() => {
    const storedBalances = localStorage.getItem('campaignBalances');
    if (storedBalances) {
      setCampaignBalances(JSON.parse(storedBalances));
    }
  }, []);

  const handleDepositChange = (index, amount) => {
    setDepositAmounts({ ...depositAmounts, [index]: amount });
  };

  const handleDeposit = async (index) => {
    try {
      const amount = ethers.parseEther(depositAmounts[index] || '0');
      
      // Send the deposit transaction
      const transaction = await crowdfundingContract.deposit(index, { value: amount });
      await transaction.wait(); // Wait for the transaction to be mined
      
      alert('Deposit successful!');
      
      // Update the campaign balance after deposit
      const newBalance = (parseFloat(campaignBalances[index] || 0) + parseFloat(depositAmounts[index])).toFixed(8);

      // Update the balance in the UI and in localStorage
      const updatedBalances = { ...campaignBalances, [index]: newBalance };
      setCampaignBalances(updatedBalances);

      // Save updated balances to localStorage so that all users can see it
      localStorage.setItem('campaignBalances', JSON.stringify(updatedBalances));

      // Clear the deposit input after successful deposit
      setDepositAmounts({ ...depositAmounts, [index]: '' });
    } catch (error) {
      console.error('Error depositing:', error);
      alert('Error depositing. Please try again.');
    }
  };

  const styles = {
    gridContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      padding: '20px',
    },
    campaignCard: {
      backgroundColor: '#f9f9f9',
      borderRadius: '10px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      padding: '20px',
      width: '300px',
      margin: '10px',
      display: 'flex',
      flexDirection: 'column',
    },
    cardTitle: {},
    input: {
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ddd',
      width: '92%',
      marginBottom: '10px',
    },
    button: {
      padding: '10px 15px',
      backgroundColor: '#4caf50',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      width: '100%',
      cursor: 'pointer',
    },
  };

  return (
    <div className="campaign-grid" style={styles.gridContainer}>
      {campaigns.map((campaign, index) => (
        <div key={index} style={styles.campaignCard}>
          <h2 style={styles.cardTitle}>{campaign.description}</h2>
          <p>Goal: {campaign.goal} ETH</p>
          <p>
            Deposited: {campaignBalances[index]
              ? `${campaignBalances[index]} ETH`
              : '0.00 ETH'} {/* Shows updated balance for all users */}
          </p>
          <input
            type="number"
            placeholder="Amount to deposit (ETH)"
            value={depositAmounts[index] || ''}
            onChange={(e) => handleDepositChange(index, e.target.value)}
            min="0"
            step="0.00000001"
            style={styles.input}
          />
          <button onClick={() => handleDeposit(index)} style={styles.button}>
            Deposit
          </button>
        </div>
      ))}
    </div>
  );
};

export default CampaignGrid;
