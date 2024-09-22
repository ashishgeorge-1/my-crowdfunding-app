import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import CrowdfundingABI from './abi/Crowdfunding.json';

const crowdfundingAddress = '0x5e1Bd3326bd6c327be8EA2A43F85CC503CA1B1C2';

const useCrowdfunding = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [crowdfundingContract, setCrowdfundingContract] = useState(null);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(true);

  useEffect(() => {
    const loadProvider = async () => {
      if (typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask) {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });

          const _provider = new ethers.BrowserProvider(window.ethereum);
          setProvider(_provider);

          const _signer = await _provider.getSigner();
          setSigner(_signer);

          const _crowdfundingContract = new ethers.Contract(crowdfundingAddress, CrowdfundingABI.abi, _signer);
          setCrowdfundingContract(_crowdfundingContract);
        } catch (error) {
          console.error("Error requesting MetaMask account access:", error);
        }
      } else {
        console.error("MetaMask is not detected. Please install MetaMask.");
        setIsMetaMaskInstalled(false);
      }
    };

    loadProvider();
  }, []);

  return { provider, signer, crowdfundingContract, isMetaMaskInstalled };
};

export default useCrowdfunding;