// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../NicheToken.sol";

contract DeployNicheToken is Script {
    function run() external {
        // Load private key from environment
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        // Start broadcasting transactions
        vm.startBroadcast(deployerPrivateKey);

        // Deploy NicheToken
        NicheToken nicheToken = new NicheToken();

        // Log the deployed contract address
        console.log("NicheToken deployed at:", address(nicheToken));

        // Stop broadcasting
        vm.stopBroadcast();
    }
}