// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface ILuxbinToken is IERC20 {
    function mint(address to, uint256 amount) external;
}

interface IImmuneCell is IERC721 {
    enum CellType { DETECTOR, DEFENDER, MEMORY, REGULATORY }

    struct CellData {
        CellType cellType;
        uint256 reputation;
        uint256 truePositives;
        uint256 falsePositives;
        uint256 threatsDetected;
        uint256 responsesExecuted;
        uint256 createdAt;
        uint256 lastActiveAt;
        bool isActive;
        string quantumFingerprint;
    }

    function getCell(uint256 tokenId) external view returns (CellData memory);
    function recordThreatDetection(uint256 tokenId) external;
    function recordFalsePositive(uint256 tokenId) external;
    function recordResponse(uint256 tokenId) external;
}

/**
 * @title ImmuneStaking
 * @dev Staking contract for LUXBIN immune system (OpenZeppelin v5.x compatible)
 */
contract ImmuneStaking is Ownable, ReentrancyGuard {
    ILuxbinToken public luxbinToken;
    IImmuneCell public immuneCell;

    // Minimum stake required to be a validator
    uint256 public constant MIN_STAKE = 1000 * 10**18; // 1000 LUXBIN

    // Reward amounts
    uint256 public constant DETECTION_REWARD = 10 * 10**18;
    uint256 public constant MEMORY_REWARD = 5 * 10**18;
    uint256 public constant REGULATORY_REWARD = 2 * 10**18;
    uint256 public constant FALSE_POSITIVE_PENALTY = 50 * 10**18;

    // Validator information
    struct Validator {
        uint256 stakedAmount;
        uint256 stakedAt;
        uint256 rewardsEarned;
        uint256 penaltiesPaid;
        bool isActive;
        uint256[] stakedCells;
    }

    mapping(address => Validator) public validators;
    address[] public validatorList;

    // Track which cells are staked
    mapping(uint256 => address) public stakedCellOwner;

    // Events
    event Staked(address indexed validator, uint256 amount);
    event Unstaked(address indexed validator, uint256 amount);
    event CellStaked(address indexed validator, uint256 indexed tokenId);
    event CellUnstaked(address indexed validator, uint256 indexed tokenId);
    event RewardPaid(address indexed validator, uint256 amount, string reason);
    event PenaltyApplied(address indexed validator, uint256 amount, string reason);
    event ThreatReported(address indexed reporter, uint256 indexed cellId, bytes32 threatHash);
    event DefenseExecuted(address indexed executor, uint256 indexed cellId, bytes32 targetHash);

    constructor(address _luxbinToken, address _immuneCell) Ownable(msg.sender) {
        require(_luxbinToken != address(0), "Invalid token address");
        require(_immuneCell != address(0), "Invalid immune cell address");

        luxbinToken = ILuxbinToken(_luxbinToken);
        immuneCell = IImmuneCell(_immuneCell);
    }

    /**
     * @dev Stake LUXBIN tokens to become a validator
     */
    function stake(uint256 amount) public nonReentrant {
        require(amount >= MIN_STAKE, "Amount below minimum stake");
        require(
            luxbinToken.transferFrom(msg.sender, address(this), amount),
            "Token transfer failed"
        );

        Validator storage validator = validators[msg.sender];

        if (validator.stakedAmount == 0) {
            validatorList.push(msg.sender);
            validator.stakedAt = block.timestamp;
        }

        validator.stakedAmount += amount;
        validator.isActive = true;

        emit Staked(msg.sender, amount);
    }

    /**
     * @dev Stake an immune cell NFT
     */
    function stakeCell(uint256 tokenId) public {
        require(validators[msg.sender].stakedAmount >= MIN_STAKE, "Must stake tokens first");
        require(immuneCell.ownerOf(tokenId) == msg.sender, "Not the owner of this cell");
        require(stakedCellOwner[tokenId] == address(0), "Cell already staked");

        immuneCell.transferFrom(msg.sender, address(this), tokenId);

        validators[msg.sender].stakedCells.push(tokenId);
        stakedCellOwner[tokenId] = msg.sender;

        emit CellStaked(msg.sender, tokenId);
    }

    /**
     * @dev Unstake LUXBIN tokens
     */
    function unstake(uint256 amount) public nonReentrant {
        Validator storage validator = validators[msg.sender];
        require(validator.stakedAmount >= amount, "Insufficient staked amount");
        require(validator.stakedCells.length == 0, "Must unstake all cells first");

        validator.stakedAmount -= amount;

        if (validator.stakedAmount < MIN_STAKE) {
            validator.isActive = false;
        }

        require(luxbinToken.transfer(msg.sender, amount), "Token transfer failed");

        emit Unstaked(msg.sender, amount);
    }

    /**
     * @dev Unstake an immune cell NFT
     */
    function unstakeCell(uint256 tokenId) public {
        require(stakedCellOwner[tokenId] == msg.sender, "Not the staker of this cell");

        Validator storage validator = validators[msg.sender];

        // Remove from staked cells array
        for (uint256 i = 0; i < validator.stakedCells.length; i++) {
            if (validator.stakedCells[i] == tokenId) {
                validator.stakedCells[i] = validator.stakedCells[validator.stakedCells.length - 1];
                validator.stakedCells.pop();
                break;
            }
        }

        stakedCellOwner[tokenId] = address(0);
        immuneCell.transferFrom(address(this), msg.sender, tokenId);

        emit CellUnstaked(msg.sender, tokenId);
    }

    /**
     * @dev Report a threat detection
     */
    function reportThreat(uint256 cellId, bytes32 threatHash) public onlyOwner {
        address validator = stakedCellOwner[cellId];
        require(validator != address(0), "Cell not staked");
        require(validators[validator].isActive, "Validator not active");

        immuneCell.recordThreatDetection(cellId);

        validators[validator].rewardsEarned += DETECTION_REWARD;
        luxbinToken.mint(validator, DETECTION_REWARD);

        emit RewardPaid(validator, DETECTION_REWARD, "Threat detection");
        emit ThreatReported(validator, cellId, threatHash);
    }

    /**
     * @dev Record a false positive
     */
    function reportFalsePositive(uint256 cellId) public onlyOwner {
        address validator = stakedCellOwner[cellId];
        require(validator != address(0), "Cell not staked");

        immuneCell.recordFalsePositive(cellId);

        Validator storage val = validators[validator];

        if (val.stakedAmount >= FALSE_POSITIVE_PENALTY) {
            val.stakedAmount -= FALSE_POSITIVE_PENALTY;
            val.penaltiesPaid += FALSE_POSITIVE_PENALTY;

            // Burn the penalty
            luxbinToken.transfer(address(0), FALSE_POSITIVE_PENALTY);

            emit PenaltyApplied(validator, FALSE_POSITIVE_PENALTY, "False positive");

            if (val.stakedAmount < MIN_STAKE) {
                val.isActive = false;
            }
        }
    }

    /**
     * @dev Record memory storage
     */
    function recordMemoryStorage(uint256 cellId) public onlyOwner {
        address validator = stakedCellOwner[cellId];
        require(validator != address(0), "Cell not staked");

        validators[validator].rewardsEarned += MEMORY_REWARD;
        luxbinToken.mint(validator, MEMORY_REWARD);

        emit RewardPaid(validator, MEMORY_REWARD, "Memory storage");
    }

    /**
     * @dev Record regulatory approval
     */
    function recordRegulatoryApproval(uint256 cellId) public onlyOwner {
        address validator = stakedCellOwner[cellId];
        require(validator != address(0), "Cell not staked");

        validators[validator].rewardsEarned += REGULATORY_REWARD;
        luxbinToken.mint(validator, REGULATORY_REWARD);

        emit RewardPaid(validator, REGULATORY_REWARD, "Regulatory approval");
    }

    /**
     * @dev Record defense execution
     */
    function recordDefense(uint256 cellId, bytes32 targetHash) public onlyOwner {
        address validator = stakedCellOwner[cellId];
        require(validator != address(0), "Cell not staked");

        immuneCell.recordResponse(cellId);

        emit DefenseExecuted(validator, cellId, targetHash);
    }

    /**
     * @dev Get validator information
     */
    function getValidator(address validatorAddress)
        public
        view
        returns (
            uint256 stakedAmount,
            uint256 stakedAt,
            uint256 rewardsEarned,
            uint256 penaltiesPaid,
            bool isActive,
            uint256 cellCount
        )
    {
        Validator storage validator = validators[validatorAddress];
        return (
            validator.stakedAmount,
            validator.stakedAt,
            validator.rewardsEarned,
            validator.penaltiesPaid,
            validator.isActive,
            validator.stakedCells.length
        );
    }

    /**
     * @dev Get staked cells for a validator
     */
    function getStakedCells(address validatorAddress)
        public
        view
        returns (uint256[] memory)
    {
        return validators[validatorAddress].stakedCells;
    }

    /**
     * @dev Get total number of active validators
     */
    function getActiveValidatorCount() public view returns (uint256) {
        uint256 count = 0;
        for (uint256 i = 0; i < validatorList.length; i++) {
            if (validators[validatorList[i]].isActive) {
                count++;
            }
        }
        return count;
    }

    /**
     * @dev Get total staked amount across all validators
     */
    function getTotalStaked() public view returns (uint256) {
        uint256 total = 0;
        for (uint256 i = 0; i < validatorList.length; i++) {
            total += validators[validatorList[i]].stakedAmount;
        }
        return total;
    }

    /**
     * @dev Emergency withdraw (only owner, for upgrades)
     */
    function emergencyWithdraw(address to, uint256 amount) public onlyOwner {
        require(luxbinToken.transfer(to, amount), "Transfer failed");
    }
}
