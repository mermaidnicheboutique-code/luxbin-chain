const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Simple Luxbin Deployment Test...\n");

  const [deployer] = await ethers.getSigners();
  console.log(`👤 Deployer: ${deployer.address}`);

  // Deploy LuxbinToken
  console.log("📝 Deploying LuxbinToken...");
  const LuxbinToken = await ethers.getContractFactory("LuxbinToken");
  const token = await LuxbinToken.deploy(deployer.address);
  await token.waitForDeployment();

  const tokenAddress = await token.getAddress();
  console.log(`✅ LuxbinToken deployed: ${tokenAddress}`);

  console.log("\n🎉 Test deployment successful!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });