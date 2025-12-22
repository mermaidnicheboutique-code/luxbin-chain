// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../LuxbinToken.sol";
import "../LuxbinEthSwap.sol";

contract DeployLuxbinEthSwap is Script {
    function run() external {
        // Load private key from environment
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        // Token contract address
        address tokenAddress = vm.envAddress("TOKEN_CONTRACT");

        vm.startBroadcast(deployerPrivateKey);

        // Deploy the ETH swap contract
        LuxbinEthSwap ethSwap = new LuxbinEthSwap(tokenAddress);

        vm.stopBroadcast();

        // Log the deployment
        console.log("LuxbinEthSwap deployed to:", address(ethSwap));
        console.log("LuxbinToken address:", tokenAddress);
        console.log("Exchange rates:");
        console.log("- 1 ETH = 1000 LUXBIN");
        console.log("- 1 LUXBIN = 0.001 ETH");
        console.log("");
        console.log("NEXT STEPS:");
        console.log("1. Fund the contract with LUXBIN tokens");
        console.log("2. Fund the contract with ETH");
        console.log("3. Users can then swap ETH for LUXBIN and vice versa");
        console.log("4. Provides liquidity for LUXBIN against ETH");
    }
}