// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title LuxbinUSDCStaking (Low Minimum Version)
 * @notice Stake USDC and earn rewards - MINIMUM ONLY $10!
 */

interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract LuxbinUSDCStaking_LowMin {
    IERC20 public immutable usdc;
    address public owner;
    address public oracle;

    // MODIFIED: Lower minimum stake to $10!
    uint256 public constant MIN_STAKE = 10 * 10**6; // $10 USDC (was $100)
    uint256 public constant BASE_APY = 500; // 5%
    uint256 public constant HCT_BONUS_APY = 1000; // 10% per 0.1 HCT

    // Cell values
    uint256 public constant DETECTOR_VALUE = 10 * 10**6;    // $10
    uint256 public constant DEFENDER_VALUE = 15 * 10**6;    // $15
    uint256 public constant MEMORY_VALUE = 5 * 10**6;       // $5
    uint256 public constant REGULATORY_VALUE = 20 * 10**6;  // $20

    struct StakeInfo {
        uint256 amount;
        uint256 stakedAt;
        uint256 lastRewardClaim;
        uint256 hctScore;
        uint256 cellRewards;
        uint256 threatRewards;
    }

    mapping(address => StakeInfo) public stakes;
    uint256 public totalStaked;
    uint256 public totalRewardsDistributed;

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

    function stake(uint256 amount) external {
        require(amount >= MIN_STAKE, "Below minimum stake ($10)");
        require(usdc.transferFrom(msg.sender, address(this), amount), "Transfer failed");

        StakeInfo storage userStake = stakes[msg.sender];

        if (userStake.amount > 0) {
            _claimRewards(msg.sender);
        }

        userStake.amount += amount;
        userStake.stakedAt = block.timestamp;
        userStake.lastRewardClaim = block.timestamp;

        if (userStake.hctScore == 0) {
            userStake.hctScore = 8000; // Default 0.8 HCT
        }

        totalStaked += amount;
        emit Staked(msg.sender, amount);
    }

    function unstake(uint256 amount) external {
        StakeInfo storage userStake = stakes[msg.sender];
        require(userStake.amount > 0, "No stake");

        _claimRewards(msg.sender);

        uint256 unstakeAmount = amount == 0 ? userStake.amount : amount;
        require(unstakeAmount <= userStake.amount, "Insufficient stake");

        userStake.amount -= unstakeAmount;
        totalStaked -= unstakeAmount;

        require(usdc.transfer(msg.sender, unstakeAmount), "Transfer failed");
        emit Unstaked(msg.sender, unstakeAmount);
    }

    function claimRewards() external {
        _claimRewards(msg.sender);
    }

    function _claimRewards(address user) internal {
        StakeInfo storage userStake = stakes[user];
        require(userStake.amount > 0, "No stake");

        uint256 stakingRewards = calculateStakingRewards(user);
        uint256 totalRewards = stakingRewards + userStake.cellRewards + userStake.threatRewards;

        if (totalRewards > 0) {
            userStake.cellRewards = 0;
            userStake.threatRewards = 0;
            userStake.lastRewardClaim = block.timestamp;

            totalRewardsDistributed += totalRewards;

            require(usdc.transfer(user, totalRewards), "Reward transfer failed");
            emit RewardsClaimed(user, totalRewards);
        }
    }

    function calculateStakingRewards(address user) public view returns (uint256) {
        StakeInfo storage userStake = stakes[user];
        if (userStake.amount == 0) return 0;

        uint256 timeStaked = block.timestamp - userStake.lastRewardClaim;
        uint256 apy = calculateAPY(userStake.hctScore);
        uint256 rewards = (userStake.amount * apy * timeStaked) / (365 days * 10000);

        return rewards;
    }

    function calculateAPY(uint256 hctScore) public pure returns (uint256) {
        if (hctScore < 5000) return 0;

        uint256 apy = BASE_APY;

        if (hctScore > 8000) {
            uint256 bonusHCT = hctScore - 8000;
            uint256 bonusMultiplier = bonusHCT / 100;
            apy += (HCT_BONUS_APY * bonusMultiplier) / 10;
        }

        return apy;
    }

    function updateHCTScore(address user, uint256 newScore) external onlyOracle {
        require(newScore <= 10000, "Invalid score");
        StakeInfo storage userStake = stakes[user];
        if (userStake.amount > 0) {
            userStake.hctScore = newScore;
            emit HCTUpdated(user, newScore);
        }
    }

    function addCellSpawnReward(address user, uint8 cellType, uint256 count) external onlyOracle {
        require(cellType < 4, "Invalid cell type");
        StakeInfo storage userStake = stakes[user];
        if (userStake.amount == 0) return;

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

    function addThreatReward(address user, uint256 threatScore) external onlyOracle {
        require(threatScore <= 100, "Invalid threat score");
        StakeInfo storage userStake = stakes[user];
        if (userStake.amount == 0) return;

        uint256 minReward = 1 * 10**6;
        uint256 maxReward = 100 * 10**6;
        uint256 reward = minReward + ((maxReward - minReward) * threatScore) / 100;

        userStake.threatRewards += reward;
        emit ThreatReward(user, threatScore, reward);
    }

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

    function setOracle(address newOracle) external onlyOwner {
        oracle = newOracle;
    }

    function fundRewards(uint256 amount) external {
        require(usdc.transferFrom(msg.sender, address(this), amount), "Transfer failed");
    }

    function emergencyWithdraw(uint256 amount) external onlyOwner {
        require(usdc.transfer(owner, amount), "Transfer failed");
    }
}
