const { ethers } = require("hardhat");

async function main() {
  console.log("🎁 Deploying LuxbinRewardDistributor...\n");

  const [deployer] = await ethers.getSigners();
  console.log(`👤 Deployer: ${deployer.address}`);
  console.log(`💰 Balance: ${ethers.formatEther(await deployer.provider.getBalance(deployer.address))} ETH\n`);

  // Deploy the reward distributor
  console.log("📝 Deploying LuxbinRewardDistributor...");
  const LuxbinRewardDistributor = await ethers.getContractFactory("LuxbinRewardDistributor");
  const distributor = await LuxbinRewardDistributor.deploy();
  await distributor.waitForDeployment();

  const distributorAddress = await distributor.getAddress();
  console.log(`✅ LuxbinRewardDistributor deployed: ${distributorAddress}`);

  // Fund the distributor with some ETH for testing
  console.log("\n💰 Funding distributor with 0.1 ETH...");
  const fundAmount = ethers.parseEther("0.1");

  await deployer.sendTransaction({
    to: distributorAddress,
    value: fundAmount
  });

  console.log("✅ Distributor funded with 0.1 ETH");

  // Check balance
  const balance = await distributor.getBalance();
  console.log(`💰 Distributor balance: ${ethers.formatEther(balance)} ETH`);

  // Test distribution
  console.log("\n🎯 Testing reward distribution...");
  const testAmount = ethers.parseEther("0.01");

  await distributor.distributeReward(deployer.address, testAmount);
  console.log(`✅ Distributed ${ethers.formatEther(testAmount)} ETH reward to deployer`);

  // Check stats
  const [totalDistributed, participants] = await distributor.getStats();
  console.log(`📊 Total distributed: ${ethers.formatEther(totalDistributed)} ETH`);
  console.log(`👥 Total participants: ${participants}`);

  console.log("\n🎉 Reward distributor deployed and tested successfully!");
  console.log(`🌐 Contract address: ${distributorAddress}`);

  console.log("\n📖 Usage:");
  console.log(`- Fund with ETH: Send ETH to ${distributorAddress}`);
  console.log(`- Distribute rewards: Call distributeReward(recipient, amount)`);
  console.log(`- Batch distribute: Call distributeBatchRewards(recipients[], amounts[])`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });