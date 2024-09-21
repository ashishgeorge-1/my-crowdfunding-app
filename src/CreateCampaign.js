import { useState } from 'react';
import { ethers } from 'ethers';
import useCrowdfunding from './useCrowdfunding';

const CreateCampaign = () => {
  const { crowdfundingContract } = useCrowdfunding();
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState('');

  const createCampaign = async () => {
    try {
      const transaction = await crowdfundingContract.createCampaign(description, ethers.parseUnits(goal, 'ether')
    );
      await transaction.wait();
      alert('Campaign Created!');
    } catch (error) {
      console.error("Error creating campaign:", error);
    }
  };

  return (
    <div>
      <h1>Create a Campaign</h1>
      <input
        type="text"
        placeholder="Campaign Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Goal in ETH"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      />
      <button onClick={createCampaign}>Create Campaign</button>
    </div>
  );
};

export default CreateCampaign;
