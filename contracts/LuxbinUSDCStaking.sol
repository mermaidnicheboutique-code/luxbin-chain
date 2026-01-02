// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title LuxbinUSDCStaking
 * @notice Stake USDC and earn rewards based on LUXBIN immune system activity and HCT score
 *
 * Tokenomics:
 * - Base APY: 5%
 * - HCT Bonus: +10% APY per 0.1 HCT above 0.8
 * - Immune cell spawning generates rewards
 * - Threat detection generates bonus rewards
 */

interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
}

contract LuxbinUSDCStaking {
    // USDC token (6 decimals)
    IERC20 public immutable usdc;

    // Owner and oracle
    address public owner;
    address public oracle; // Updates HCT scores and rewards

    // Staking parameters
    uint256 public constant MIN_STAKE = 100 * 10**6; // $100 USDC (6 decimals)
    uint256 public constant BASE_APY = 500; // 5% = 500 basis points
    uint256 public constant HCT_BONUS_APY = 1000; // 10% = 1000 basis points per 0.1 HCT

    // Cell spawn rewards (in USDC, 6 decimals)
    uint256 public constant DETECTOR_VALUE = 10 * 10**6;    // $10
    uint256 public constant DEFENDER_VALUE = 15 * 10**6;    // $15
    uint256 public constant MEMORY_VALUE = 5 * 10**6;       // $5
    uint256 public constant REGULATORY_VALUE = 20 * 10**6;  // $20

    // User staking info
    struct StakeInfo {
        uint256 amount;           // Staked USDC amount
        uint256 stakedAt;         // Timestamp of stake
        uint256 lastRewardClaim;  // Last reward claim timestamp
        uint256 hctScore;         // User's HCT score (scaled by 10000, so 8500 = 0.85)
        uint256 cellRewards;      // Accumulated cell spawn rewards
        uint256 threatRewards;    // Accumulated threat detection rewards
    }

    mapping(address => StakeInfo) public stakes;

    // Global stats
    uint256 public totalStaked;
    uint256 public totalRewardsDistributed;

    // Events
    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event RewardsClaimed(address indexed user, uint256 amount);
    event HCTUpdated(address indexed user, uint256 newScore);
    event CellSpawnReward(address indexed user, string cellType, uint256 count, uint256 reward);
    event ThreatReward(address indexed user, uint256 threatScore, uint256 reward);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    modifier onlyOracle() {
        require(msg.sender == oracle, "Not oracle");
        _;
    }

    constructor(address _usdc, address _oracle) {
        usdc = IERC20(_usdc);
        owner = msg.sender;
        oracle = _oracle;
    }

    /**
     * @notice Stake USDC to earn rewards
     * @param amount Amount of USDC to stake (6 decimals)
     */
    function stake(uint256 amount) external {
        require(amount >= MIN_STAKE, "Below minimum stake");

        // Transfer USDC from user
        require(usdc.transferFrom(msg.sender, address(this), amount), "Transfer failed");

        StakeInfo storage userStake = stakes[msg.sender];

        // If user has existing stake, claim rewards first
        if (userStake.amount > 0) {
            _claimRewards(msg.sender);
        }

        // Update stake
        userStake.amount += amount;
        userStake.stakedAt = block.timestamp;
        userStake.lastRewardClaim = block.timestamp;

        // Initialize HCT score if new staker
        if (userStake.hctScore == 0) {
            userStake.hctScore = 8000; // Default 0.8 HCT
        }

        totalStaked += amount;

        emit Staked(msg.sender, amount);
    }

    /**
     * @notice Unstake USDC and claim all rewards
     * @param amount Amount to unstake (0 = all)
     */
    function unstake(uint256 amount) external {
        StakeInfo storage userStake = stakes[msg.sender];
        require(userStake.amount > 0, "No stake");

        // Claim all pending rewards first
        _claimRewards(msg.sender);

        // Determine unstake amount
        uint256 unstakeAmount = amount == 0 ? userStake.amount : amount;
        require(unstakeAmount <= userStake.amount, "Insufficient stake");

        // Update stake
        userStake.amount -= unstakeAmount;
        totalStaked -= unstakeAmount;

        // Transfer USDC back to user
        require(usdc.transfer(msg.sender, unstakeAmount), "Transfer failed");

        emit Unstaked(msg.sender, unstakeAmount);
    }

    /**
     * @notice Claim all pending rewards
     */
    function claimRewards() external {
        _claimRewards(msg.sender);
    }

    /**
     * @notice Internal reward claiming logic
     */
    function _claimRewards(address user) internal {
        StakeInfo storage userStake = stakes[user];
        require(userStake.amount > 0, "No stake");

        // Calculate time-based staking rewards
        uint256 stakingRewards = calculateStakingRewards(user);

        // Total rewards = staking + cell spawns + threat detection
        uint256 totalRewards = stakingRewards + userStake.cellRewards + userStake.threatRewards;

        if (totalRewards > 0) {
            // Reset reward counters
            userStake.cellRewards = 0;
            userStake.threatRewards = 0;
            userStake.lastRewardClaim = block.timestamp;

            // Update global stats
            totalRewardsDistributed += totalRewards;

            // Transfer rewards
            require(usdc.transfer(user, totalRewards), "Reward transfer failed");

            emit RewardsClaimed(user, totalRewards);
        }
    }

    /**
     * @notice Calculate time-based staking rewards
     * @param user User address
     * @return Rewards earned from staking
     */
    function calculateStakingRewards(address user) public view returns (uint256) {
        StakeInfo storage userStake = stakes[user];

        if (userStake.amount == 0) {
            return 0;
        }

        // Time staked since last claim
        uint256 timeStaked = block.timestamp - userStake.lastRewardClaim;

        // Calculate APY based on HCT score
        uint256 apy = calculateAPY(userStake.hctScore);

        // Calculate rewards: (stake * APY * time) / (365 days * 10000)
        // APY is in basis points (1% = 100)
        uint256 rewards = (userStake.amount * apy * timeStaked) / (365 days * 10000);

        return rewards;
    }

    /**
     * @notice Calculate APY based on HCT score
     * @param hctScore HCT score (scaled by 10000, so 8500 = 0.85)
     * @return APY in basis points (500 = 5%)
     */
    function calculateAPY(uint256 hctScore) public pure returns (uint256) {
        if (hctScore < 5000) {
            return 0; // No rewards if HCT < 0.5
        }

        // Base APY
        uint256 apy = BASE_APY;

        // Add bonus for HCT > 0.8
        if (hctScore > 8000) {
            uint256 bonusHCT = hctScore - 8000; // e.g., 8500 - 8000 = 500 (0.05)
            uint256 bonusMultiplier = bonusHCT / 100; // 500 / 100 = 5 (0.05 HCT = 5 * 0.01)
            apy += (HCT_BONUS_APY * bonusMultiplier) / 10; // (1000 * 5) / 10 = 500 (5%)
        }

        return apy;
    }

    /**
     * @notice Oracle updates user's HCT score
     * @param user User address
     * @param newScore New HCT score (scaled by 10000)
     */
    function updateHCTScore(address user, uint256 newScore) external onlyOracle {
        require(newScore <= 10000, "Invalid score");

        StakeInfo storage userStake = stakes[user];
        if (userStake.amount > 0) {
            userStake.hctScore = newScore;
            emit HCTUpdated(user, newScore);
        }
    }

    /**
     * @notice Oracle adds cell spawn rewards
     * @param user User address
     * @param cellType Cell type (0=DETECTOR, 1=DEFENDER, 2=MEMORY, 3=REGULATORY)
     * @param count Number of cells spawned
     */
    function addCellSpawnReward(address user, uint8 cellType, uint256 count) external onlyOracle {
        require(cellType < 4, "Invalid cell type");

        StakeInfo storage userStake = stakes[user];
        if (userStake.amount == 0) {
            return; // Only reward stakers
        }

        uint256 cellValue;
        string memory cellName;

        if (cellType == 0) {
            cellValue = DETECTOR_VALUE;
            cellName = "DETECTOR";
        } else if (cellType == 1) {
            cellValue = DEFENDER_VALUE;
            cellName = "DEFENDER";
        } else if (cellType == 2) {
            cellValue = MEMORY_VALUE;
            cellName = "MEMORY";
        } else {
            cellValue = REGULATORY_VALUE;
            cellName = "REGULATORY";
        }

        uint256 reward = cellValue * count;
        userStake.cellRewards += reward;

        emit CellSpawnReward(user, cellName, count, reward);
    }

    /**
     * @notice Oracle adds threat detection rewards
     * @param user User address
     * @param threatScore Threat score (0-100)
     */
    function addThreatReward(address user, uint256 threatScore) external onlyOracle {
        require(threatScore <= 100, "Invalid threat score");

        StakeInfo storage userStake = stakes[user];
        if (userStake.amount == 0) {
            return; // Only reward stakers
        }

        // Calculate reward: $1 - $100 based on threat score
        uint256 minReward = 1 * 10**6; // $1
        uint256 maxReward = 100 * 10**6; // $100

        uint256 reward = minReward + ((maxReward - minReward) * threatScore) / 100;
        userStake.threatRewards += reward;

        emit ThreatReward(user, threatScore, reward);
    }

    /**
     * @notice Get user's complete stake info
     */
    function getStakeInfo(address user) external view returns (
        uint256 stakedAmount,
        uint256 pendingStakingRewards,
        uint256 pendingCellRewards,
        uint256 pendingThreatRewards,
        uint256 totalPendingRewards,
        uint256 hctScore,
        uint256 currentAPY
    ) {
        StakeInfo storage userStake = stakes[user];

        stakedAmount = userStake.amount;
        pendingStakingRewards = calculateStakingRewards(user);
        pendingCellRewards = userStake.cellRewards;
        pendingThreatRewards = userStake.threatRewards;
        totalPendingRewards = pendingStakingRewards + pendingCellRewards + pendingThreatRewards;
        hctScore = userStake.hctScore;
        currentAPY = calculateAPY(userStake.hctScore);
    }

    /**
     * @notice Update oracle address
     */
    function setOracle(address newOracle) external onlyOwner {
        oracle = newOracle;
    }

    /**
     * @notice Emergency withdraw (owner only, for testing)
     */
    function emergencyWithdraw(uint256 amount) external onlyOwner {
        require(usdc.transfer(owner, amount), "Transfer failed");
    }

    /**
     * @notice Fund the contract with USDC for rewards
     */
    function fundRewards(uint256 amount) external {
        require(usdc.transferFrom(msg.sender, address(this), amount), "Transfer failed");
    }
}
