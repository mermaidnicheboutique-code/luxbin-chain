const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Simple Hardhat Test...\n");

  const [deployer] = await ethers.getSigners();
  console.log(`👤 Deployer: ${deployer.address}`);
  console.log(`💰 Balance: ${ethers.formatEther(await deployer.provider.getBalance(deployer.address))} ETH\n`);

  console.log("✅ Hardhat is working!");
  console.log("🎉 Ready to deploy your Luxbin contracts!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Test failed:", error);
    process.exit(1);
  });