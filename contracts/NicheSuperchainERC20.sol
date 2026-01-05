// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import { SuperchainERC20 } from "@contracts-bedrock/L2/SuperchainERC20.sol";

/**
 * @title NicheSuperchainERC20
 * @notice Interoperable NICHE token that works across all Superchain networks
 * @dev Extends SuperchainERC20 for cross-chain transfers via L2ToL2CrossDomainMessenger
 *
 * Features:
 * - Works on Base, Optimism, Mode, Zora, and all Superchain networks
 * - Automatic cross-chain transfers via interop
 * - Mint on one chain, burn on another (maintains total supply)
 * - Compatible with existing reward system
 *
 * Deployment:
 * - Must be deployed at SAME address on all chains (use Create2)
 * - Only SuperchainERC20Bridge can call crosschainMint/crosschainBurn
 */
contract NicheSuperchainERC20 is SuperchainERC20 {
    /// @notice Total supply cap: 21 million NICHE
    uint256 public constant MAX_SUPPLY = 21_000_000 * 10**18;

    /// @notice Owner address for minting permissions
    address public owner;

    /// @notice Reward distributor contract
    address public rewardDistributor;

    /// @notice Track total minted across all chains
    uint256 public totalMinted;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event RewardDistributorUpdated(address indexed oldDistributor, address indexed newDistributor);
    event Minted(address indexed to, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    modifier onlyRewardDistributor() {
        require(msg.sender == rewardDistributor, "Not reward distributor");
        _;
    }

    constructor() SuperchainERC20() {
        owner = msg.sender;
        rewardDistributor = msg.sender;
    }

    /**
     * @notice Initialize token details
     * @dev Must be called after deployment
     */
    function initialize(
        string memory _name,
        string memory _symbol,
        uint8 _decimals
    ) external onlyOwner {
        // Set token metadata
        // Note: SuperchainERC20 handles name/symbol/decimals internally
    }

    /**
     * @notice Mint tokens (only owner or reward distributor)
     * @param to Recipient address
     * @param amount Amount to mint
     */
    function mint(address to, uint256 amount) external onlyRewardDistributor {
        require(totalMinted + amount <= MAX_SUPPLY, "Exceeds max supply");
        totalMinted += amount;
        _mint(to, amount);
        emit Minted(to, amount);
    }

    /**
     * @notice Mint tokens for rewards
     * @param to Recipient address
     * @param amount Amount to mint
     */
    function mintReward(address to, uint256 amount) external onlyRewardDistributor {
        require(totalMinted + amount <= MAX_SUPPLY, "Exceeds max supply");
        totalMinted += amount;
        _mint(to, amount);
        emit Minted(to, amount);
    }

    /**
     * @notice Transfer ownership
     * @param newOwner New owner address
     */
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Zero address");
        address oldOwner = owner;
        owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }

    /**
     * @notice Update reward distributor
     * @param newDistributor New reward distributor address
     */
    function setRewardDistributor(address newDistributor) external onlyOwner {
        require(newDistributor != address(0), "Zero address");
        address oldDistributor = rewardDistributor;
        rewardDistributor = newDistributor;
        emit RewardDistributorUpdated(oldDistributor, newDistributor);
    }

    /**
     * @notice Get token name
     * @return Token name
     */
    function name() public pure override returns (string memory) {
        return "Niche Superchain Token";
    }

    /**
     * @notice Get token symbol
     * @return Token symbol
     */
    function symbol() public pure override returns (string memory) {
        return "NICHE";
    }

    /**
     * @notice Get token decimals
     * @return Number of decimals
     */
    function decimals() public pure override returns (uint8) {
        return 18;
    }

    /**
     * @notice Check remaining mintable supply
     * @return Remaining supply
     */
    function remainingSupply() external view returns (uint256) {
        return MAX_SUPPLY - totalMinted;
    }
}
