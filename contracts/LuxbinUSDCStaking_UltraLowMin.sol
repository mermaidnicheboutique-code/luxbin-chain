// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title LuxbinUSDCStaking_UltraLowMin
 * @notice Ultra low minimum version for testing - stake USDC and earn rewards
 *
 * ULTRA LOW MINIMUM VERSION FOR TESTING ONLY
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

contract LuxbinUSDCStaking_UltraLowMin {
    // USDC token (6 decimals)
    IERC20 public immutable usdc;

    // Owner and oracle
    address public owner;
    address public oracle; // Updates HCT scores and rewards

    // Staking parameters - ULTRA LOW FOR TESTING
    uint256 public constant MIN_STAKE = 1 * 10**6; // $1 USDC (6 decimals) - FOR TESTING ONLY
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
     * @notice Stake USDC to earn rewards - ULTRA LOW MINIMUM FOR TESTING
     * @param amount Amount of USDC to stake (6 decimals)
     */
    function stake(uint256 amount) external {
        require(amount >= MIN_STAKE, "Below minimum stake ($1) - TESTING VERSION");

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

        totalStaked += amount;

        emit Staked(msg.sender, amount);
    }

    /**
     * @notice Unstake USDC
     * @param amount Amount of USDC to unstake (6 decimals)
     */
    function unstake(uint256 amount) external {
        StakeInfo storage userStake = stakes[msg.sender];
        require(userStake.amount >= amount, "Insufficient staked amount");

        // Claim any pending rewards first
        _claimRewards(msg.sender);

        // Update stake
        userStake.amount -= amount;
        totalStaked -= amount;

        // Transfer USDC back to user
        require(usdc.transfer(msg.sender, amount), "Transfer failed");

        emit Unstaked(msg.sender, amount);
    }

    /**
     * @notice Claim accumulated rewards
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

        uint256 totalReward = baseReward + hctBonus + userStake.cellRewards + userStake.threatRewards;

        if (totalReward > 0) {
            // Transfer rewards from contract (assuming contract has USDC)
            require(usdc.transfer(user, totalReward), "Reward transfer failed");

            userStake.cellRewards = 0;
            userStake.threatRewards = 0;
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
        emit HCTUpdated(user, newScore);
    }

    /**
     * @notice Distribute cell spawn rewards (only oracle)
     * @param user User address
     * @param cellType Type of immune cell
     * @param count Number of cells spawned
     */
    function distributeCellRewards(address user, string calldata cellType, uint256 count) external onlyOracle {
        uint256 rewardPerCell;

        if (keccak256(abi.encodePacked(cellType)) == keccak256(abi.encodePacked("detector"))) {
            rewardPerCell = DETECTOR_VALUE;
        } else if (keccak256(abi.encodePacked(cellType)) == keccak256(abi.encodePacked("defender"))) {
            rewardPerCell = DEFENDER_VALUE;
        } else if (keccak256(abi.encodePacked(cellType)) == keccak256(abi.encodePacked("memory"))) {
            rewardPerCell = MEMORY_VALUE;
        } else if (keccak256(abi.encodePacked(cellType)) == keccak256(abi.encodePacked("regulatory"))) {
            rewardPerCell = REGULATORY_VALUE;
        } else {
            revert("Invalid cell type");
        }

        uint256 totalReward = rewardPerCell * count;
        stakes[user].cellRewards += totalReward;

        emit CellSpawnReward(user, cellType, count, totalReward);
    }

    /**
     * @notice Distribute threat detection rewards (only oracle)
     * @param user User address
     * @param threatScore Threat detection score
     */
    function distributeThreatRewards(address user, uint256 threatScore) external onlyOracle {
        uint256 reward = (threatScore * 10**6) / 100; // 0.01 USDC per threat point
        stakes[user].threatRewards += reward;

        emit ThreatReward(user, threatScore, reward);
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
     * @notice Update oracle address
     * @param newOracle New oracle address
     */
    function updateOracle(address newOracle) external onlyOwner {
        require(newOracle != address(0), "Invalid oracle");
        oracle = newOracle;
    }
}