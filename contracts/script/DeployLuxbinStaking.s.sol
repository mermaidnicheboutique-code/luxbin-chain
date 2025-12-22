// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../LuxbinToken.sol";
import "../LuxbinStaking.sol";

contract DeployLuxbinStaking is Script {
    function run() external {
        // Load private key from environment
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        // Token contract address (deployed previously)
        address tokenAddress = vm.envAddress("TOKEN_CONTRACT");

        vm.startBroadcast(deployerPrivateKey);

        // First, authorize the staking contract as a minter (we'll deploy it first to get the address)
        // For now, we'll authorize the deployer, then deploy staking, then authorize staking contract

        // Deploy the staking contract
        LuxbinStaking staking = new LuxbinStaking(tokenAddress);

        // Now authorize the staking contract as a minter in the token contract
        LuxbinToken token = LuxbinToken(tokenAddress);
        token.authorizeMinter(address(staking), 1000000 * 10**18); // 1M LUX per day limit

        vm.stopBroadcast();

        // Log the deployment
        console.log("LuxbinStaking deployed to:", address(staking));
        console.log("LuxbinToken address:", tokenAddress);
        console.log("Staking contract authorized as minter with 1M LUX/day limit");
        console.log("Ready to accumulate LUXBIN tokens through staking!");
    }
}