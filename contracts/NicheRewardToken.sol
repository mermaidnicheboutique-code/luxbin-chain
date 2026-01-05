// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title NicheRewardToken
 * @dev Enhanced Niche Token with deployment rewards, airdrops, and validator rewards
 * - 1 billion total supply
 * - 70% reserved for rewards (deployment, airdrop, validators)
 * - 30% for team/operations
 * - Earn tokens for deploying contracts on the chain
 * - Claim free airdrop tokens
 * - Validator rewards for network participation
 */
contract NicheRewardToken {
    string public constant name = "Niche Reward Token";
    string public constant symbol = "NICHE";
    uint8 public constant decimals = 18;

    uint256 public totalSupply;
    uint256 public constant MAX_SUPPLY = 1_000_000_000 * 10**18; // 1 billion tokens
    uint256 public constant REWARD_POOL = (MAX_SUPPLY * 70) / 100; // 70% for rewards
    uint256 public rewardsDistributed;

    address public owner;
    address public rewardDistributor;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    // Deployment tracking
    mapping(address => uint256) public deploymentsCount;
    mapping(address => uint256) public totalDeploymentRewards;

    // Airdrop tracking
    mapping(address => bool) public hasClaimed;
    uint256 public constant AIRDROP_AMOUNT = 1000 * 10**18; // 1000 NICHE per claim
    uint256 public totalAirdropsClaimed;

    // Validator rewards
    mapping(address => uint256) public validatorRewards;
    mapping(address => bool) public isValidator;
    uint256 public totalValidatorRewards;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event DeploymentReward(address indexed deployer, uint256 amount, uint256 deploymentCount);
    event AirdropClaimed(address indexed claimer, uint256 amount);
    event ValidatorReward(address indexed validator, uint256 amount);
    event RewardDistributorChanged(address indexed oldDistributor, address indexed newDistributor);

    constructor() {
        owner = msg.sender;
        rewardDistributor = msg.sender;

        // Mint initial supply to owner (30%)
        uint256 ownerSupply = (MAX_SUPPLY * 30) / 100;
        totalSupply = ownerSupply;
        balanceOf[owner] = ownerSupply;
        emit Transfer(address(0), owner, ownerSupply);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    modifier onlyRewardDistributor() {
        require(msg.sender == rewardDistributor, "Not reward distributor");
        _;
    }

    function setRewardDistributor(address _distributor) external onlyOwner {
        address oldDistributor = rewardDistributor;
        rewardDistributor = _distributor;
        emit RewardDistributorChanged(oldDistributor, _distributor);
    }

    function transfer(address to, uint256 amount) external returns (bool) {
        require(balanceOf[msg.sender] >= amount, "Insufficient balance");
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        emit Transfer(msg.sender, to, amount);
        return true;
    }

    function approve(address spender, uint256 amount) external returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(address from, address to, uint256 amount) external returns (bool) {
        require(balanceOf[from] >= amount, "Insufficient balance");
        require(allowance[from][msg.sender] >= amount, "Insufficient allowance");

        balanceOf[from] -= amount;
        balanceOf[to] += amount;
        allowance[from][msg.sender] -= amount;

        emit Transfer(from, to, amount);
        return true;
    }

    /**
     * @dev Reward a user for deploying a contract
     * Base reward: 500 NICHE
     * Bonus: +50 NICHE per previous deployment
     * Max reward per deployment: 5000 NICHE
     */
    function rewardDeployment(address deployer) external onlyRewardDistributor returns (uint256) {
        require(rewardsDistributed < REWARD_POOL, "Reward pool exhausted");

        // Calculate reward based on deployment count
        uint256 baseReward = 500 * 10**18; // 500 NICHE base
        uint256 bonus = deploymentsCount[deployer] * 50 * 10**18; // +50 NICHE per previous deployment
        uint256 reward = baseReward + bonus;

        // Cap individual reward
        if (reward > 5000 * 10**18) {
            reward = 5000 * 10**18; // Max 5000 NICHE per deployment
        }

        // Check if reward exceeds remaining pool
        if (rewardsDistributed + reward > REWARD_POOL) {
            reward = REWARD_POOL - rewardsDistributed;
        }

        if (reward > 0) {
            totalSupply += reward;
            balanceOf[deployer] += reward;
            rewardsDistributed += reward;
            deploymentsCount[deployer]++;
            totalDeploymentRewards[deployer] += reward;

            emit Transfer(address(0), deployer, reward);
            emit DeploymentReward(deployer, reward, deploymentsCount[deployer]);
        }

        return reward;
    }

    /**
     * @dev Claim free airdrop tokens (once per address)
     * Amount: 1000 NICHE
     */
    function claimAirdrop() external returns (uint256) {
        require(!hasClaimed[msg.sender], "Already claimed");
        require(rewardsDistributed < REWARD_POOL, "Reward pool exhausted");
        require(rewardsDistributed + AIRDROP_AMOUNT <= REWARD_POOL, "Insufficient rewards remaining");

        hasClaimed[msg.sender] = true;
        totalSupply += AIRDROP_AMOUNT;
        balanceOf[msg.sender] += AIRDROP_AMOUNT;
        rewardsDistributed += AIRDROP_AMOUNT;
        totalAirdropsClaimed++;

        emit Transfer(address(0), msg.sender, AIRDROP_AMOUNT);
        emit AirdropClaimed(msg.sender, AIRDROP_AMOUNT);

        return AIRDROP_AMOUNT;
    }

    /**
     * @dev Add a validator to the network
     */
    function addValidator(address validator) external onlyOwner {
        isValidator[validator] = true;
    }

    /**
     * @dev Remove a validator from the network
     */
    function removeValidator(address validator) external onlyOwner {
        isValidator[validator] = false;
    }

    /**
     * @dev Reward a validator for network participation
     */
    function rewardValidator(address validator, uint256 amount) external onlyRewardDistributor returns (bool) {
        require(isValidator[validator], "Not a validator");
        require(rewardsDistributed < REWARD_POOL, "Reward pool exhausted");
        require(rewardsDistributed + amount <= REWARD_POOL, "Insufficient rewards remaining");

        totalSupply += amount;
        balanceOf[validator] += amount;
        validatorRewards[validator] += amount;
        rewardsDistributed += amount;
        totalValidatorRewards += amount;

        emit Transfer(address(0), validator, amount);
        emit ValidatorReward(validator, amount);

        return true;
    }

    // ========== VIEW FUNCTIONS ==========

    function remainingRewards() external view returns (uint256) {
        return REWARD_POOL - rewardsDistributed;
    }

    function rewardPoolPercentageDistributed() external view returns (uint256) {
        if (REWARD_POOL == 0) return 0;
        return (rewardsDistributed * 100) / REWARD_POOL;
    }

    function canClaimAirdrop(address account) external view returns (bool) {
        return !hasClaimed[account] && rewardsDistributed < REWARD_POOL;
    }

    function getDeploymentRewardAmount(address deployer) external view returns (uint256) {
        if (rewardsDistributed >= REWARD_POOL) return 0;

        uint256 baseReward = 500 * 10**18;
        uint256 bonus = deploymentsCount[deployer] * 50 * 10**18;
        uint256 reward = baseReward + bonus;

        if (reward > 5000 * 10**18) {
            reward = 5000 * 10**18;
        }

        if (rewardsDistributed + reward > REWARD_POOL) {
            reward = REWARD_POOL - rewardsDistributed;
        }

        return reward;
    }

    function getStats() external view returns (
        uint256 _totalSupply,
        uint256 _maxSupply,
        uint256 _rewardPool,
        uint256 _rewardsDistributed,
        uint256 _remainingRewards,
        uint256 _percentDistributed,
        uint256 _totalAirdropsClaimed,
        uint256 _totalValidatorRewards
    ) {
        _totalSupply = totalSupply;
        _maxSupply = MAX_SUPPLY;
        _rewardPool = REWARD_POOL;
        _rewardsDistributed = rewardsDistributed;
        _remainingRewards = REWARD_POOL - rewardsDistributed;
        _percentDistributed = REWARD_POOL > 0 ? (rewardsDistributed * 100) / REWARD_POOL : 0;
        _totalAirdropsClaimed = totalAirdropsClaimed;
        _totalValidatorRewards = totalValidatorRewards;
    }
}
