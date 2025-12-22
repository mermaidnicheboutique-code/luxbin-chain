// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../LuxbinUSDCStaking.sol";

contract TestLuxbinUSDCStaking is Script {
    function run() external {
        // Get deployed contract address from environment
        address stakingAddress = vm.envAddress("STAKING_CONTRACT");

        // Test basic functionality
        LuxbinUSDCStaking staking = LuxbinUSDCStaking(stakingAddress);

        // Check owner
        address owner = staking.owner();
        console.log("Contract owner:", owner);

        // Check total staked (should be 0 initially)
        uint256 totalStaked = staking.totalStaked();
        console.log("Total staked:", totalStaked);

        // Check minimum stake
        uint256 minStake = staking.MIN_STAKE();
        console.log("Minimum stake:", minStake);

        console.log("Basic contract test completed successfully!");
    }
}