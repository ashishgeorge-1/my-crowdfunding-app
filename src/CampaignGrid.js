import React, { useEffect, useState } from 'react';
import useCrowdfunding from './useCrowdfunding';
import { ethers } from 'ethers';

const CampaignGrid = () => {
  const { crowdfundingContract } = useCrowdfunding();
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        // Get the total number of campaigns in the contract
        const totalCampaigns = await crowdfundingContract.campaigns.length;
        const campaignList = [];

        // Loop through all campaigns in the contract
        for (let i = 0; i < totalCampaigns; i++) {
          const campaign = await crowdfundingContract.getCampaign(i);
          campaignList.push({
            creator: campaign[0],
            description: campaign[1],
            goal: ethers.formatUnits(campaign[2], 'ether'), // Convert from Wei to Ether
            amountRaised: ethers.formatUnits(campaign[3], 'ether'), // Convert from Wei to Ether
            index: i
          });
        }

        // Update the state with the fetched campaigns
        setCampaigns(campaignList);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };

    if (crowdfundingContract) {
      fetchCampaigns();
    }
  }, [crowdfundingContract]);

  return (
    <div className="campaign-grid">
      <h1>Campaigns</h1>
      <div className="grid">
        {campaigns.length > 0 ? (
          campaigns.map((campaign, index) => (
            <div key={index} className="campaign-card">
              <h2>{campaign.description}</h2>
              <p>Creator: {campaign.creator}</p>
              <p>Goal: {campaign.goal} ETH</p>
              <p>Amount Raised: {campaign.amountRaised} ETH</p>
            </div>
          ))
        ) : (
          <p>No campaigns available.</p>
        )}
      </div>
    </div>
  );
};

export default CampaignGrid;
