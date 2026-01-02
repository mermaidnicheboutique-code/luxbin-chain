// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../LuxbinUSDCStaking.sol";

contract DeployLuxbinUSDCStaking is Script {
    function run() external {
        // Load private key from environment
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        // Testnet USDC addresses
        address sepoliaUSDC = 0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238; // Ethereum Sepolia
        address optimismSepoliaUSDC = 0x5fd84259d66Cd46123540766Be93DFE6D43130D7; // Optimism Sepolia
        address goerliUSDC = 0x07865c6E87B9F70255377e024ace6630C1Eaa37F; // Ethereum Goerli
        address mumbaiUSDC = 0x0FA8781a83E46826621b3BC094Ea2A0212e71B23; // Polygon Mumbai

        // Get network from environment, default to optimism_sepolia
        string memory network = vm.envOr("NETWORK", string("optimism_sepolia"));
        address usdcAddress;

        if (keccak256(abi.encodePacked(network)) == keccak256(abi.encodePacked("sepolia"))) {
            usdcAddress = sepoliaUSDC;
        } else if (keccak256(abi.encodePacked(network)) == keccak256(abi.encodePacked("optimism_sepolia"))) {
            usdcAddress = optimismSepoliaUSDC;
        } else if (keccak256(abi.encodePacked(network)) == keccak256(abi.encodePacked("goerli"))) {
            usdcAddress = goerliUSDC;
        } else if (keccak256(abi.encodePacked(network)) == keccak256(abi.encodePacked("mumbai"))) {
            usdcAddress = mumbaiUSDC;
        } else {
            revert("Unsupported network");
        }

        // Oracle address (initially set to deployer)
        address oracleAddress = vm.addr(deployerPrivateKey);

        vm.startBroadcast(deployerPrivateKey);

        // Deploy the contract
        LuxbinUSDCStaking staking = new LuxbinUSDCStaking(usdcAddress, oracleAddress);

        vm.stopBroadcast();

        // Log the deployment
        console.log("LuxbinUSDCStaking deployed to:", address(staking));
        console.log("USDC Address:", usdcAddress);
        console.log("Oracle Address:", oracleAddress);
    }
}