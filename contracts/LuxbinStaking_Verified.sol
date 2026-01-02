// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./LuxbinToken.sol";

/**
 * @title LuxbinStaking
 * @notice Stake to earn newly minted LUXBIN tokens
 *
 * TOKEN GENERATION STAKING:
 * - Stake and earn newly minted LUXBIN tokens
 * - Accumulate LUXBIN over time for future value
 * - No minimum stake requirements
 * - Rewards mint new tokens into circulation
 */

contract LuxbinStaking {
    // LUXBIN token contract
    LuxbinToken public immutable luxbin;

    // Owner
    address public owner;

    // Staking parameters
    uint256 public constant BASE_APY = 500; // 5% = 500 basis points
    uint256 public constant HCT_BONUS_APY = 1000; // 10% = 1000 basis points per 0.1 HCT

    // User staking info
    struct StakeInfo {
        uint256 amount;           // Staked amount (tracked for rewards)
        uint256 stakedAt;         // Timestamp of stake
        uint256 lastRewardClaim;  // Last reward claim timestamp
        uint256 hctScore;         // User's HCT score (scaled by 10000, so 8500 = 0.85)
        uint256 pendingRewards;   // Accumulated LUXBIN rewards
    }

    mapping(address => StakeInfo) public stakes;
    mapping(address => bool) public authorizedOracles;

    // Global stats
    uint256 public totalStaked;
    uint256 public totalRewardsDistributed;

    // Events
    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event RewardsClaimed(address indexed user, uint256 amount);
    event HCTUpdated(address indexed user, uint256 newScore);
    event OracleAuthorized(address indexed oracle);
    event OracleRevoked(address indexed oracle);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    modifier onlyOracle() {
        require(authorizedOracles[msg.sender] || msg.sender == owner, "Not authorized oracle");
        _;
    }

    constructor(address _luxbinToken) {
        luxbin = LuxbinToken(_luxbinToken);
        owner = msg.sender;
        authorizedOracles[msg.sender] = true;
    }

    /**
     * @notice Stake to earn LUXBIN rewards
     * @dev No minimum stake - anyone can stake any amount
     */
    function stake() external payable {
        require(msg.value > 0, "Must stake some ETH");

        StakeInfo storage userStake = stakes[msg.sender];

        // If user has existing stake, claim rewards first
        if (userStake.amount > 0) {
            _claimRewards(msg.sender);
        }

        // Update stake
        userStake.amount += msg.value;
        userStake.stakedAt = block.timestamp;
        userStake.lastRewardClaim = block.timestamp;

        totalStaked += msg.value;

        emit Staked(msg.sender, msg.value);
    }

    /**
     * @notice Unstake ETH
     * @param amount Amount of ETH to unstake
     */
    function unstake(uint256 amount) external {
        StakeInfo storage userStake = stakes[msg.sender];
        require(userStake.amount >= amount, "Insufficient staked amount");

        // Claim any pending rewards first
        _claimRewards(msg.sender);

        // Update stake
        userStake.amount -= amount;
        totalStaked -= amount;

        // Transfer ETH back to user
        payable(msg.sender).transfer(amount);

        emit Unstaked(msg.sender, amount);
    }

    /**
     * @notice Claim accumulated LUXBIN rewards
     */
    function claimRewards() external {
        _claimRewards(msg.sender);
    }

    /**
     * @notice Internal function to claim rewards
     * @param user Address of the user claiming rewards
     */
    function _claimRewards(address user) internal {
        StakeInfo storage userStake = stakes[user];

        // Calculate time-based rewards
        uint256 timeElapsed = block.timestamp - userStake.lastRewardClaim;
        uint256 baseReward = (userStake.amount * BASE_APY * timeElapsed) / (365 days * 10000);

        // HCT bonus calculation
        uint256 hctBonus = 0;
        if (userStake.hctScore > 8000) { // Above 0.8 HCT
            uint256 hctAboveThreshold = userStake.hctScore - 8000;
            hctBonus = (userStake.amount * HCT_BONUS_APY * hctAboveThreshold * timeElapsed) / (1000 * 365 days * 10000);
        }

        uint256 totalReward = baseReward + hctBonus + userStake.pendingRewards;

        if (totalReward > 0) {
            // Mint new LUXBIN tokens as rewards
            luxbin.mint(user, totalReward);

            userStake.pendingRewards = 0;
            userStake.lastRewardClaim = block.timestamp;
            totalRewardsDistributed += totalReward;

            emit RewardsClaimed(user, totalReward);
        }
    }

    /**
     * @notice Update user's HCT score (only oracle)
     * @param user User address
     * @param newScore New HCT score (scaled by 10000)
     */
    function updateHCTScore(address user, uint256 newScore) external onlyOracle {
        require(newScore <= 10000, "Invalid HCT score");
        stakes[user].hctScore = newScore;

        // Auto-claim rewards when HCT score updates to apply new bonus rate
        _claimRewards(user);

        emit HCTUpdated(user, newScore);
    }

    /**
     * @notice Distribute additional LUXBIN rewards (only oracle)
     * @param user User address
     * @param amount Amount of LUXBIN to reward
     */
    function distributeRewards(address user, uint256 amount) external onlyOracle {
        require(amount > 0, "Amount must be positive");

        // Add to pending rewards (will be minted when claimed)
        stakes[user].pendingRewards += amount;

        emit RewardsClaimed(user, amount); // Using same event for consistency
    }

    /**
     * @notice Authorize an oracle address
     * @param oracle Oracle address to authorize
     */
    function authorizeOracle(address oracle) external onlyOwner {
        require(oracle != address(0), "Invalid oracle address");
        authorizedOracles[oracle] = true;
        emit OracleAuthorized(oracle);
    }

    /**
     * @notice Revoke oracle authorization
     * @param oracle Oracle address to revoke
     */
    function revokeOracle(address oracle) external onlyOwner {
        authorizedOracles[oracle] = false;
        emit OracleRevoked(oracle);
    }

    /**
     * @notice Transfer ownership
     * @param newOwner New owner address
     */
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Invalid owner");
        owner = newOwner;
    }

    /**
     * @notice Get user's stake information
     * @param user User address
     * @return amount staked, hctScore, pendingRewards
     */
    function getStakeInfo(address user) external view returns (uint256, uint256, uint256) {
        StakeInfo memory userStake = stakes[user];
        return (userStake.amount, userStake.hctScore, userStake.pendingRewards);
    }

    /**
     * @notice Calculate current reward amount for a user
     * @param user User address
     * @return Current accumulated reward amount
     */
    function calculateRewards(address user) external view returns (uint256) {
        StakeInfo memory userStake = stakes[user];

        if (userStake.amount == 0) return 0;

        // Calculate time-based rewards
        uint256 timeElapsed = block.timestamp - userStake.lastRewardClaim;
        uint256 baseReward = (userStake.amount * BASE_APY * timeElapsed) / (365 days * 10000);

        // HCT bonus calculation
        uint256 hctBonus = 0;
        if (userStake.hctScore > 8000) {
            uint256 hctAboveThreshold = userStake.hctScore - 8000;
            hctBonus = (userStake.amount * HCT_BONUS_APY * hctAboveThreshold * timeElapsed) / (1000 * 365 days * 10000);
        }

        return baseReward + hctBonus + userStake.pendingRewards;
    }

    // Allow contract to receive ETH
    receive() external payable {}
}
