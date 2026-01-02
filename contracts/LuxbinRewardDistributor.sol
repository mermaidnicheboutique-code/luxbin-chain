// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title LuxbinRewardDistributor
 * @notice Distributes test ETH rewards to Luxbin ecosystem participants
 *
 * REWARD DISTRIBUTION:
 * - Distributes test ETH rewards to stakers and participants
 * - Funded by protocol treasury or community contributions
 * - Tracks reward distributions and balances
 * - Emergency withdrawal for owner
 */

contract LuxbinRewardDistributor {
    // Owner
    address public owner;

    // Reward tracking
    mapping(address => uint256) public pendingRewards;
    mapping(address => uint256) public totalRewardsReceived;

    // Statistics
    uint256 public totalRewardsDistributed;
    uint256 public totalParticipants;

    // Events
    event RewardDistributed(address indexed recipient, uint256 amount);
    event RewardClaimed(address indexed recipient, uint256 amount);
    event OwnerWithdrawn(address indexed owner, uint256 amount);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    /**
     * @notice Distribute ETH rewards to a single recipient
     * @param recipient Address to receive rewards
     * @param amount Amount of ETH to distribute
     */
    function distributeReward(address recipient, uint256 amount) external onlyOwner {
        require(recipient != address(0), "Invalid recipient");
        require(amount > 0, "Amount must be positive");
        require(address(this).balance >= amount, "Insufficient contract balance");

        // Transfer ETH to recipient
        payable(recipient).transfer(amount);

        // Update statistics
        totalRewardsDistributed += amount;
        totalRewardsReceived[recipient] += amount;

        // Track unique participants
        if (totalRewardsReceived[recipient] == amount) {
            totalParticipants += 1;
        }

        emit RewardDistributed(recipient, amount);
    }

    /**
     * @notice Distribute ETH rewards to multiple recipients
     * @param recipients Array of addresses to receive rewards
     * @param amounts Array of ETH amounts to distribute
     */
    function distributeBatchRewards(address[] calldata recipients, uint256[] calldata amounts) external onlyOwner {
        require(recipients.length == amounts.length, "Arrays length mismatch");
        require(recipients.length > 0, "Empty arrays");

        uint256 totalAmount = 0;
        for (uint256 i = 0; i < amounts.length; i++) {
            require(recipients[i] != address(0), "Invalid recipient");
            require(amounts[i] > 0, "Amount must be positive");
            totalAmount += amounts[i];
        }

        require(address(this).balance >= totalAmount, "Insufficient contract balance");

        for (uint256 i = 0; i < recipients.length; i++) {
            payable(recipients[i]).transfer(amounts[i]);

            totalRewardsDistributed += amounts[i];
            totalRewardsReceived[recipients[i]] += amounts[i];

            emit RewardDistributed(recipients[i], amounts[i]);
        }

        // Count new participants
        for (uint256 i = 0; i < recipients.length; i++) {
            if (totalRewardsReceived[recipients[i]] == amounts[i]) {
                totalParticipants += 1;
            }
        }
    }

    /**
     * @notice Fund the distributor with ETH
     */
    function fundDistributor() external payable {
        require(msg.value > 0, "Must send ETH");
        // Contract automatically receives ETH
    }

    /**
     * @notice Emergency withdrawal (only owner)
     * @param amount Amount to withdraw
     */
    function emergencyWithdraw(uint256 amount) external onlyOwner {
        require(amount > 0, "Amount must be positive");
        require(address(this).balance >= amount, "Insufficient balance");

        payable(owner).transfer(amount);
        emit OwnerWithdrawn(owner, amount);
    }

    /**
     * @notice Get contract ETH balance
     * @return Contract's ETH balance
     */
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    /**
     * @notice Get reward statistics
     * @return totalDistributed Total ETH distributed
     * @return participants Total unique participants
     */
    function getStats() external view returns (uint256 totalDistributed, uint256 participants) {
        return (totalRewardsDistributed, totalParticipants);
    }

    /**
     * @notice Check pending rewards for an address
     * @param user Address to check
     * @return pending Pending rewards (always 0 in this simple version)
     * @return received Total rewards received
     */
    function checkRewards(address user) external view returns (uint256 pending, uint256 received) {
        return (pendingRewards[user], totalRewardsReceived[user]);
    }

    /**
     * @notice Transfer ownership
     * @param newOwner New owner address
     */
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Invalid owner");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }

    // Allow contract to receive ETH
    receive() external payable {}
}