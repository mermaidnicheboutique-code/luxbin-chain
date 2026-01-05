// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

/**
 * @title DeploymentRewardDistributor
 * @dev Distributes NICHE tokens as rewards for:
 * - Deploying smart contracts
 * - Claiming airdrops
 * - Validator participation
 *
 * Works with existing deployed NICHE token
 */
contract DeploymentRewardDistributor {
    IERC20 public nicheToken;
    address public owner;

    uint256 public constant MAX_REWARD_PERCENTAGE = 70; // 70% of supply for rewards
    uint256 public rewardsDistributed;
    uint256 public maxRewardsToDistribute;

    // Deployment rewards
    mapping(address => uint256) public deploymentsCount;
    mapping(address => uint256) public totalDeploymentRewards;
    uint256 public constant BASE_DEPLOYMENT_REWARD = 500 * 10**18; // 500 NICHE
    uint256 public constant DEPLOYMENT_BONUS_PER_DEPLOY = 50 * 10**18; // +50 NICHE per deploy
    uint256 public constant MAX_DEPLOYMENT_REWARD = 5000 * 10**18; // Max 5000 NICHE

    // Airdrop
    mapping(address => bool) public hasClaimed;
    uint256 public constant AIRDROP_AMOUNT = 1000 * 10**18; // 1000 NICHE
    uint256 public totalAirdropsClaimed;

    // Validator rewards
    mapping(address => bool) public isValidator;
    mapping(address => uint256) public validatorRewards;
    uint256 public totalValidatorRewards;

    // Events
    event DeploymentRewarded(address indexed deployer, uint256 amount, uint256 totalDeployments);
    event AirdropClaimed(address indexed claimer, uint256 amount);
    event ValidatorRewarded(address indexed validator, uint256 amount);
    event ValidatorAdded(address indexed validator);
    event ValidatorRemoved(address indexed validator);

    constructor(address _nicheToken, uint256 _maxRewardsToDistribute) {
        nicheToken = IERC20(_nicheToken);
        owner = msg.sender;
        maxRewardsToDistribute = _maxRewardsToDistribute;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    /**
     * @dev Reward a user for deploying a contract
     * Can be called by anyone (or set up with access control)
     */
    function rewardDeployment(address deployer) external returns (uint256) {
        require(rewardsDistributed < maxRewardsToDistribute, "Max rewards distributed");

        // Calculate reward
        uint256 reward = BASE_DEPLOYMENT_REWARD + (deploymentsCount[deployer] * DEPLOYMENT_BONUS_PER_DEPLOY);

        // Cap reward
        if (reward > MAX_DEPLOYMENT_REWARD) {
            reward = MAX_DEPLOYMENT_REWARD;
        }

        // Check if exceeds max
        if (rewardsDistributed + reward > maxRewardsToDistribute) {
            reward = maxRewardsToDistribute - rewardsDistributed;
        }

        if (reward > 0) {
            require(nicheToken.transfer(deployer, reward), "Transfer failed");

            deploymentsCount[deployer]++;
            totalDeploymentRewards[deployer] += reward;
            rewardsDistributed += reward;

            emit DeploymentRewarded(deployer, reward, deploymentsCount[deployer]);
        }

        return reward;
    }

    /**
     * @dev Claim airdrop (once per address)
     */
    function claimAirdrop() external returns (uint256) {
        require(!hasClaimed[msg.sender], "Already claimed airdrop");
        require(rewardsDistributed + AIRDROP_AMOUNT <= maxRewardsToDistribute, "Insufficient rewards");

        hasClaimed[msg.sender] = true;
        require(nicheToken.transfer(msg.sender, AIRDROP_AMOUNT), "Transfer failed");

        rewardsDistributed += AIRDROP_AMOUNT;
        totalAirdropsClaimed++;

        emit AirdropClaimed(msg.sender, AIRDROP_AMOUNT);

        return AIRDROP_AMOUNT;
    }

    /**
     * @dev Add validator
     */
    function addValidator(address validator) external onlyOwner {
        isValidator[validator] = true;
        emit ValidatorAdded(validator);
    }

    /**
     * @dev Remove validator
     */
    function removeValidator(address validator) external onlyOwner {
        isValidator[validator] = false;
        emit ValidatorRemoved(validator);
    }

    /**
     * @dev Reward validator
     */
    function rewardValidator(address validator, uint256 amount) external onlyOwner returns (bool) {
        require(isValidator[validator], "Not a validator");
        require(rewardsDistributed + amount <= maxRewardsToDistribute, "Insufficient rewards");

        require(nicheToken.transfer(validator, amount), "Transfer failed");

        validatorRewards[validator] += amount;
        totalValidatorRewards += amount;
        rewardsDistributed += amount;

        emit ValidatorRewarded(validator, amount);

        return true;
    }

    /**
     * @dev Emergency withdrawal (owner only)
     */
    function withdrawTokens(uint256 amount) external onlyOwner {
        require(nicheToken.transfer(owner, amount), "Transfer failed");
    }

    // ========== VIEW FUNCTIONS ==========

    function canClaimAirdrop(address account) external view returns (bool) {
        return !hasClaimed[account] && rewardsDistributed + AIRDROP_AMOUNT <= maxRewardsToDistribute;
    }

    function getNextDeploymentReward(address deployer) external view returns (uint256) {
        if (rewardsDistributed >= maxRewardsToDistribute) return 0;

        uint256 reward = BASE_DEPLOYMENT_REWARD + (deploymentsCount[deployer] * DEPLOYMENT_BONUS_PER_DEPLOY);

        if (reward > MAX_DEPLOYMENT_REWARD) {
            reward = MAX_DEPLOYMENT_REWARD;
        }

        if (rewardsDistributed + reward > maxRewardsToDistribute) {
            reward = maxRewardsToDistribute - rewardsDistributed;
        }

        return reward;
    }

    function getRemainingRewards() external view returns (uint256) {
        if (rewardsDistributed >= maxRewardsToDistribute) return 0;
        return maxRewardsToDistribute - rewardsDistributed;
    }

    function getPercentageDistributed() external view returns (uint256) {
        if (maxRewardsToDistribute == 0) return 0;
        return (rewardsDistributed * 100) / maxRewardsToDistribute;
    }

    function getStats() external view returns (
        uint256 _rewardsDistributed,
        uint256 _maxRewards,
        uint256 _remainingRewards,
        uint256 _percentDistributed,
        uint256 _totalAirdropsClaimed,
        uint256 _totalValidatorRewards,
        uint256 _contractBalance
    ) {
        _rewardsDistributed = rewardsDistributed;
        _maxRewards = maxRewardsToDistribute;
        _remainingRewards = maxRewardsToDistribute > rewardsDistributed ? maxRewardsToDistribute - rewardsDistributed : 0;
        _percentDistributed = maxRewardsToDistribute > 0 ? (rewardsDistributed * 100) / maxRewardsToDistribute : 0;
        _totalAirdropsClaimed = totalAirdropsClaimed;
        _totalValidatorRewards = totalValidatorRewards;
        _contractBalance = nicheToken.balanceOf(address(this));
    }

    function getUserInfo(address user) external view returns (
        uint256 deploymentCount,
        uint256 totalRewards,
        bool hasClaimedAirdrop,
        bool isValidatorStatus,
        uint256 validatorRewardTotal,
        uint256 nextDeploymentReward
    ) {
        deploymentCount = deploymentsCount[user];
        totalRewards = totalDeploymentRewards[user];
        hasClaimedAirdrop = hasClaimed[user];
        isValidatorStatus = isValidator[user];
        validatorRewardTotal = validatorRewards[user];

        // Calculate next reward
        if (rewardsDistributed < maxRewardsToDistribute) {
            uint256 reward = BASE_DEPLOYMENT_REWARD + (deploymentsCount[user] * DEPLOYMENT_BONUS_PER_DEPLOY);
            if (reward > MAX_DEPLOYMENT_REWARD) reward = MAX_DEPLOYMENT_REWARD;
            if (rewardsDistributed + reward > maxRewardsToDistribute) {
                reward = maxRewardsToDistribute - rewardsDistributed;
            }
            nextDeploymentReward = reward;
        }
    }
}
