// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../LuxbinToken.sol";

contract DeployLuxbinToken is Script {
    function run() external {
        // Load private key from environment
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        // Ecosystem fund address (use deployer for now)
        address ecosystemFund = vm.addr(deployerPrivateKey);

        vm.startBroadcast(deployerPrivateKey);

        // Deploy the LuxbinToken contract
        LuxbinToken token = new LuxbinToken(ecosystemFund);

        vm.stopBroadcast();

        // Log the deployment
        console.log("LuxbinToken deployed to:", address(token));
        console.log("Token Name: LUXBIN");
        console.log("Token Symbol: LUX");
        console.log("Ecosystem Fund:", ecosystemFund);
        console.log("Initial Supply: 100,000,000 LUX (10% of max)");
        console.log("Max Supply: 1,000,000,000 LUX");
    }
}