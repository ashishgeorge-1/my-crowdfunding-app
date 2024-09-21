import React, { useState, useEffect } from 'react';
import useCrowdfunding from './useCrowdfunding';
import { ethers } from 'ethers';

const CampaignGrid = ({ campaigns }) => {
  const { crowdfundingContract } = useCrowdfunding();
  const [depositAmounts, setDepositAmounts] = useState({});
  const [campaignBalances, setCampaignBalances] = useState({});

  useEffect(() => {
    const fetchCampaignBalances = async () => {
      if (crowdfundingContract) {
        const balances = {};
        for (let i = 0; i < campaigns.length; i++) {
          try {
            const balance = await crowdfundingContract.getCampaignBalance(i);
            balances[i] = ethers.formatEther(balance);
          } catch (error) {
            console.error(`Error fetching balance for campaign ${i}:`, error);
            balances[i] = '0';
          }
        }
        setCampaignBalances(balances);
      }
    };

    fetchCampaignBalances();
  }, [campaigns, crowdfundingContract]);

  const handleDepositChange = (index, amount) => {
    setDepositAmounts({...depositAmounts, [index]: amount});
  };

  const handleDeposit = async (index) => {
    try {
      const amount = ethers.parseEther(depositAmounts[index] || '0');
      const transaction = await crowdfundingContract.deposit(index, { value: amount });
      await transaction.wait();
      alert('Deposit successful!');
      // Update the campaign balance
      const newBalance = await crowdfundingContract.getCampaignBalance(index);
      setCampaignBalances({...campaignBalances, [index]: ethers.formatEther(newBalance)});
      // Clear deposit amount after successful deposit
      setDepositAmounts({...depositAmounts, [index]: ''});
    } catch (error) {
      console.error('Error depositing:', error);
      alert('Error depositing. Please try again.');
    }
  };

  return (
    <div className="campaign-grid">
      <div className="grid">
        {campaigns.map((campaign, index) => (
          <div key={index} className="campaign-card">
            <h2>{campaign.description}</h2>
            <p>Goal: {campaign.goal} ETH</p>
            <p>Deposited: {campaignBalances[index] || '0'} ETH</p>
            <input
              type="number"
              placeholder="Amount to deposit (ETH)"
              value={depositAmounts[index] || ''}
              onChange={(e) => handleDepositChange(index, e.target.value)}
              min="0"
              step="0.01"
            />
            <button onClick={() => handleDeposit(index)}>Deposit</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampaignGrid;