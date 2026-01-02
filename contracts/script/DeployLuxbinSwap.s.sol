// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../LuxbinToken.sol";
import "../LuxbinSwap.sol";

contract DeployLuxbinSwap is Script {
    function run() external {
        // Load private key from environment
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        // Contract addresses
        address tokenAddress = vm.envAddress("TOKEN_CONTRACT");
        address usdcAddress = 0x5fd84259d66Cd46123540766Be93DFE6D43130D7; // Optimism Sepolia USDC

        vm.startBroadcast(deployerPrivateKey);

        // Deploy the swap contract
        LuxbinSwap swap = new LuxbinSwap(tokenAddress, usdcAddress);

        vm.stopBroadcast();

        // Log the deployment
        console.log("LuxbinSwap deployed to:", address(swap));
        console.log("LuxbinToken address:", tokenAddress);
        console.log("USDC address:", usdcAddress);
        console.log("Exchange rate: 1 LUXBIN = 1 USDC (1:1 peg)");
        console.log("");
        console.log("NEXT STEPS:");
        console.log("1. Fund the swap contract with USDC reserves");
        console.log("2. Users can then swap LUXBIN for USDC at 1:1 rate");
        console.log("3. This maintains LUXBIN's USD value");
    }
}