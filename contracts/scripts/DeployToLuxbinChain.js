const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Deploying Luxbin Ecosystem to Your Custom Blockchain...\n");

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());

  // Step 1: Deploy LuxbinToken
  console.log("\n📝 Step 1: Deploying LuxbinToken...");
  const LuxbinToken = await ethers.getContractFactory("LuxbinToken");
  const token = await LuxbinToken.deploy(deployer.address);
  await token.waitForDeployment();
  const tokenAddress = await token.getAddress();
  console.log("✅ LuxbinToken deployed to:", tokenAddress);

  // Step 2: Deploy LuxbinStaking (token generation)
  console.log("\n📝 Step 2: Deploying LuxbinStaking...");
  const LuxbinStaking = await ethers.getContractFactory("LuxbinStaking");
  const staking = await LuxbinStaking.deploy(tokenAddress);
  await staking.waitForDeployment();
  const stakingAddress = await staking.getAddress();
  console.log("✅ LuxbinStaking deployed to:", stakingAddress);

  // Authorize staking contract as minter
  console.log("🔑 Authorizing staking contract as token minter...");
  await token.authorizeMinter(stakingAddress, ethers.parseEther("1000000")); // 1M LUX per day limit
  console.log("✅ Staking contract authorized as minter");

  // Step 3: Deploy LuxbinSwap (1:1 USDC peg)
  console.log("\n📝 Step 3: Deploying LuxbinSwap...");
  // For local testing, we'll use a mock USDC address (deployer's address)
  const mockUsdcAddress = deployer.address; // In production, use real USDC
  const LuxbinSwap = await ethers.getContractFactory("LuxbinSwap");
  const swap = await LuxbinSwap.deploy(tokenAddress, mockUsdcAddress);
  await swap.waitForDeployment();
  const swapAddress = await swap.getAddress();
  console.log("✅ LuxbinSwap deployed to:", swapAddress);

  // Step 4: Deploy LuxbinEthSwap (ETH liquidity)
  console.log("\n📝 Step 4: Deploying LuxbinEthSwap...");
  const LuxbinEthSwap = await ethers.getContractFactory("LuxbinEthSwap");
  const ethSwap = await LuxbinEthSwap.deploy(tokenAddress);
  await ethSwap.waitForDeployment();
  const ethSwapAddress = await ethSwap.getAddress();
  console.log("✅ LuxbinEthSwap deployed to:", ethSwapAddress);

  // Step 5: Fund the swap contracts
  console.log("\n💰 Step 5: Funding swap contracts...");

  // Fund LuxbinEthSwap with LUXBIN tokens
  console.log("Funding ETH swap with 10,000 LUXBIN...");
  await token.transfer(ethSwapAddress, ethers.parseEther("10000"));
  console.log("✅ ETH swap funded with 10,000 LUXBIN");

  // Fund LuxbinEthSwap with ETH
  console.log("Funding ETH swap with 1 ETH...");
  await deployer.sendTransaction({
    to: ethSwapAddress,
    value: ethers.parseEther("1")
  });
  console.log("✅ ETH swap funded with 1 ETH");

  // Fund LuxbinSwap with mock USDC (ETH for testing)
  console.log("Funding USDC swap with 1 ETH (mock USDC)...");
  await deployer.sendTransaction({
    to: swapAddress,
    value: ethers.parseEther("1")
  });
  console.log("✅ USDC swap funded with 1 ETH");

  // Step 6: Deploy additional staking contracts
  console.log("\n📝 Step 6: Deploying additional staking contracts...");

  // Low minimum USDC staking
  const LuxbinUSDCStaking_LowMin = await ethers.getContractFactory("LuxbinUSDCStaking_LowMin");
  const lowMinStaking = await LuxbinUSDCStaking_LowMin.deploy(mockUsdcAddress);
  await lowMinStaking.waitForDeployment();
  console.log("✅ Low-min USDC staking deployed to:", await lowMinStaking.getAddress());

  // Ultra low minimum USDC staking
  const LuxbinUSDCStaking_UltraLowMin = await ethers.getContractFactory("LuxbinUSDCStaking_UltraLowMin");
  const ultraLowMinStaking = await LuxbinUSDCStaking_UltraLowMin.deploy(mockUsdcAddress);
  await ultraLowMinStaking.waitForDeployment();
  console.log("✅ Ultra-low-min USDC staking deployed to:", await ultraLowMinStaking.getAddress());

  // Print summary
  console.log("\n" + "=".repeat(60));
  console.log("🎉 LUXBIN ECOSYSTEM DEPLOYMENT COMPLETE!");
  console.log("=".repeat(60));

  console.log("\n📋 Deployed Contracts:");
  console.log(`🔹 LuxbinToken: ${tokenAddress}`);
  console.log(`🔹 LuxbinStaking: ${stakingAddress}`);
  console.log(`🔹 LuxbinSwap (USDC): ${swapAddress}`);
  console.log(`🔹 LuxbinEthSwap: ${ethSwapAddress}`);
  console.log(`🔹 LowMin USDC Staking: ${await lowMinStaking.getAddress()}`);
  console.log(`🔹 UltraLowMin USDC Staking: ${await ultraLowMinStaking.getAddress()}`);

  console.log("\n💰 Funded Contracts:");
  console.log("🔹 ETH Swap: 10,000 LUXBIN + 1 ETH");
  console.log("🔹 USDC Swap: 1 ETH (mock USDC)");

  console.log("\n🚀 Your Luxbin Blockchain is Ready!");
  console.log("🌐 RPC URL: http://127.0.0.1:8545");
  console.log("🔗 Chain ID: 31337");
  console.log("💳 Deployer Account:", deployer.address);

  console.log("\n📖 Next Steps:");
  console.log("1. Keep Hardhat node running: npx hardhat node");
  console.log("2. Connect MetaMask to localhost:8545");
  console.log("3. Import account with private key from Hardhat");
  console.log("4. Start using your Luxbin blockchain!");

  console.log("\n" + "=".repeat(60));
}

// Handle errors
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});