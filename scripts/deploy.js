// Import ethers from Hardhat
const hre = require("hardhat");

async function main() {
  // Get the contract factory for Crowdfunding
  const Crowdfunding = await hre.ethers.getContractFactory("Crowdfunding");
  
  // Deploy the contract
  const crowdfunding = await Crowdfunding.deploy();

  // Wait for the transaction to be mined
  const deploymentReceipt = await crowdfunding.deploymentTransaction().wait();

  // Log the contract address
  console.log("Crowdfunding contract deployed to:", crowdfunding.target);
  console.log("Deployment transaction receipt:", deploymentReceipt);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
