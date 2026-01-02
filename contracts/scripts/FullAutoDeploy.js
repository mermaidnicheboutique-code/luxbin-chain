const { ethers } = require("hardhat");
const fs = require('fs');

async function main() {
  console.log("🤖 FULLY AUTOMATED LUXBIN DEPLOYMENT STARTING...\n");

  // Auto-detect network from environment or use default
  const network = process.env.NETWORK || "optimisticSepolia";
  console.log(`🌐 Target Network: ${network}`);

  const [deployer] = await ethers.getSigners();
  console.log(`👤 Deployer: ${deployer.address}`);
  console.log(`💰 Balance: ${ethers.formatEther(await deployer.provider.getBalance(deployer.address))} ETH\n`);

  const contracts = {
    luxbinToken: null,
    luxbinStaking: null,
    luxbinSwap: null,
    luxbinEthSwap: null,
    lowMinStaking: null,
    ultraLowMinStaking: null
  };

  try {
    // Step 1: Deploy LuxbinToken
    console.log("📝 STEP 1: Deploying LuxbinToken...");
    const LuxbinToken = await ethers.getContractFactory("LuxbinToken");
    contracts.luxbinToken = await LuxbinToken.deploy(deployer.address);
    await contracts.luxbinToken.waitForDeployment();
    const tokenAddress = await contracts.luxbinToken.getAddress();
    console.log(`✅ LuxbinToken deployed: ${tokenAddress}`);

    // Step 2: Deploy LuxbinStaking
    console.log("\n📝 STEP 2: Deploying LuxbinStaking...");
    const LuxbinStaking = await ethers.getContractFactory("LuxbinStaking");
    contracts.luxbinStaking = await LuxbinStaking.deploy(tokenAddress);
    await contracts.luxbinStaking.waitForDeployment();
    const stakingAddress = await contracts.luxbinStaking.getAddress();
    console.log(`✅ LuxbinStaking deployed: ${stakingAddress}`);

    // Authorize staking contract
    console.log("🔑 Authorizing staking contract...");
    await contracts.luxbinToken.authorizeMinter(stakingAddress, ethers.parseEther("1000000"));
    console.log("✅ Staking contract authorized");

    // Step 3: Deploy LuxbinSwap (USDC peg)
    console.log("\n📝 STEP 3: Deploying LuxbinSwap...");
    const mockUsdc = deployer.address; // Mock USDC for testing
    const LuxbinSwap = await ethers.getContractFactory("LuxbinSwap");
    contracts.luxbinSwap = await LuxbinSwap.deploy(tokenAddress, mockUsdc);
    await contracts.luxbinSwap.waitForDeployment();
    const swapAddress = await contracts.luxbinSwap.getAddress();
    console.log(`✅ LuxbinSwap deployed: ${swapAddress}`);

    // Step 4: Deploy LuxbinEthSwap
    console.log("\n📝 STEP 4: Deploying LuxbinEthSwap...");
    const LuxbinEthSwap = await ethers.getContractFactory("LuxbinEthSwap");
    contracts.luxbinEthSwap = await LuxbinEthSwap.deploy(tokenAddress);
    await contracts.luxbinEthSwap.waitForDeployment();
    const ethSwapAddress = await contracts.luxbinEthSwap.getAddress();
    console.log(`✅ LuxbinEthSwap deployed: ${ethSwapAddress}`);

    // Step 5: Fund swap contracts
    console.log("\n💰 STEP 5: Funding swap contracts...");

    // Fund ETH swap with tokens
    console.log("Funding ETH swap with 10,000 LUXBIN...");
    await contracts.luxbinToken.transfer(ethSwapAddress, ethers.parseEther("10000"));
    console.log("✅ ETH swap funded with tokens");

    // Fund ETH swap with ETH
    console.log("Funding ETH swap with 1 ETH...");
    await deployer.sendTransaction({
      to: ethSwapAddress,
      value: ethers.parseEther("1")
    });
    console.log("✅ ETH swap funded with ETH");

    // Fund USDC swap with ETH
    console.log("Funding USDC swap with 1 ETH...");
    await deployer.sendTransaction({
      to: swapAddress,
      value: ethers.parseEther("1")
    });
    console.log("✅ USDC swap funded");

    // Step 6: Deploy additional staking variants
    console.log("\n📝 STEP 6: Deploying staking variants...");
    const LuxbinUSDCStaking_LowMin = await ethers.getContractFactory("LuxbinUSDCStaking_LowMin");
    contracts.lowMinStaking = await LuxbinUSDCStaking_LowMin.deploy(mockUsdc);
    await contracts.lowMinStaking.waitForDeployment();
    console.log(`✅ Low-min staking: ${await contracts.lowMinStaking.getAddress()}`);

    const LuxbinUSDCStaking_UltraLowMin = await ethers.getContractFactory("LuxbinUSDCStaking_UltraLowMin");
    contracts.ultraLowMinStaking = await LuxbinUSDCStaking_UltraLowMin.deploy(mockUsdc);
    await contracts.ultraLowMinStaking.waitForDeployment();
    console.log(`✅ Ultra-low-min staking: ${await contracts.ultraLowMinStaking.getAddress()}`);

    // Step 7: Auto-verification (if API key available)
    if (process.env.ETHERSCAN_API_KEY) {
      console.log("\n🔍 STEP 7: Verifying contracts...");
      try {
        await hre.run("verify:verify", {
          address: tokenAddress,
          constructorArguments: [deployer.address],
        });
        console.log("✅ LuxbinToken verified");

        await hre.run("verify:verify", {
          address: stakingAddress,
          constructorArguments: [tokenAddress],
        });
        console.log("✅ LuxbinStaking verified");

      } catch (error) {
        console.log("⚠️  Verification failed (manual verification may be needed)");
      }
    }

    // Step 8: Run basic tests
    console.log("\n🧪 STEP 8: Running basic tests...");

    // Test token balance
    const tokenBalance = await contracts.luxbinToken.balanceOf(deployer.address);
    console.log(`✅ Token balance: ${ethers.formatEther(tokenBalance)} LUXBIN`);

    // Test staking info
    const stakeInfo = await contracts.luxbinStaking.getStakeInfo(deployer.address);
    console.log(`✅ Stake info retrieved: ${stakeInfo}`);

    // Print final summary
    console.log("\n" + "=".repeat(60));
    console.log("🎉 LUXBIN ECOSYSTEM FULLY DEPLOYED & TESTED!");
    console.log("=".repeat(60));

    console.log(`\n🌐 Network: ${network}`);
    console.log(`👤 Deployer: ${deployer.address}`);

    console.log("\n📋 Deployed Contracts:");
    console.log(`🔹 LuxbinToken: ${tokenAddress}`);
    console.log(`🔹 LuxbinStaking: ${stakingAddress}`);
    console.log(`🔹 LuxbinSwap: ${swapAddress}`);
    console.log(`🔹 LuxbinEthSwap: ${ethSwapAddress}`);
    console.log(`🔹 LowMin Staking: ${await contracts.lowMinStaking.getAddress()}`);
    console.log(`🔹 UltraLowMin Staking: ${await contracts.ultraLowMinStaking.getAddress()}`);

    console.log("\n💰 Funded Contracts:");
    console.log("🔹 ETH Swap: 10,000 LUXBIN + 1 ETH");
    console.log("🔹 USDC Swap: 1 ETH (mock funds)");

    console.log("\n🚀 Ready to Use!");
    console.log("💡 Next: Stake ETH to earn LUXBIN, then swap for other assets");

    // Save deployment info to file
    const deploymentInfo = {
      network,
      deployer: deployer.address,
      contracts: {
        luxbinToken: tokenAddress,
        luxbinStaking: stakingAddress,
        luxbinSwap: swapAddress,
        luxbinEthSwap: ethSwapAddress,
        lowMinStaking: await contracts.lowMinStaking.getAddress(),
        ultraLowMinStaking: await contracts.ultraLowMinStaking.getAddress()
      },
      timestamp: new Date().toISOString()
    };

    fs.writeFileSync('./deployment.json', JSON.stringify(deploymentInfo, null, 2));
    console.log("\n💾 Deployment info saved to: ./deployment.json");

  } catch (error) {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Script failed:", error);
    process.exit(1);
  });