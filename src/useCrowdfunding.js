import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import CrowdfundingABI from './abi/Crowdfunding.json';

const crowdfundingAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const useCrowdfunding = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [crowdfundingContract, setCrowdfundingContract] = useState(null);

  useEffect(() => {
    const loadProvider = async () => {
      if (typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask) {
        try {
          // Request MetaMask account access
          await window.ethereum.request({ method: 'eth_requestAccounts' });

          // Initialize the MetaMask provider and signer
          const _provider = new ethers.BrowserProvider(window.ethereum);
          setProvider(_provider);

          const _signer = await _provider.getSigner();
          setSigner(_signer);

          // Connect to the crowdfunding contract
          const _crowdfundingContract = new ethers.Contract(crowdfundingAddress, CrowdfundingABI.abi, _signer);
          setCrowdfundingContract(_crowdfundingContract);

        } catch (error) {
          console.error("Error requesting MetaMask account access:", error);
        }
      } else {
        console.error("MetaMask is not detected. Please install MetaMask.");
      }
    };

    loadProvider();
  }, []);

  return { provider, signer, crowdfundingContract };
};

export default useCrowdfunding;
