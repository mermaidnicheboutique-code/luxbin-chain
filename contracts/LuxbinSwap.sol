// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./LuxbinToken.sol";

/**
 * @title LuxbinSwap
 * @notice 1:1 LUXBIN to USDC conversion mechanism
 *
 * MAINTAINS 1:1 PEG:
 * - Swap LUXBIN for USDC at 1:1 rate
 * - Funded by staking rewards and treasury
 * - Ensures LUXBIN maintains USD value
 * - Decentralized exchange mechanism
 */

contract LuxbinSwap {
    // Token contracts
    LuxbinToken public immutable luxbin;
    IERC20 public immutable usdc;

    // Owner
    address public owner;

    // Swap stats
    uint256 public totalLuxbinSwapped;
    uint256 public totalUsdcDistributed;

    // Events
    event LuxbinToUsdcSwap(address indexed user, uint256 luxbinAmount, uint256 usdcAmount);
    event UsdcFunded(address indexed funder, uint256 amount);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor(address _luxbinToken, address _usdcToken) {
        luxbin = LuxbinToken(_luxbinToken);
        usdc = IERC20(_usdcToken);
        owner = msg.sender;
    }

    /**
     * @notice Swap LUXBIN for USDC at 1:1 rate
     * @param luxbinAmount Amount of LUXBIN to swap (18 decimals)
     */
    function swapLuxbinToUsdc(uint256 luxbinAmount) external {
        require(luxbinAmount > 0, "Amount must be positive");
        require(luxbin.balanceOf(address(this)) >= luxbinAmount, "Insufficient LUXBIN reserves");

        // Calculate USDC amount (1:1 ratio, convert from 18 to 6 decimals)
        uint256 usdcAmount = luxbinAmount / 10**12; // 18 decimals to 6 decimals
        require(usdc.balanceOf(address(this)) >= usdcAmount, "Insufficient USDC reserves");

        // Transfer LUXBIN from user to contract
        require(luxbin.transferFrom(msg.sender, address(this), luxbinAmount), "LUXBIN transfer failed");

        // Transfer USDC from contract to user
        require(usdc.transfer(msg.sender, usdcAmount), "USDC transfer failed");

        // Update stats
        totalLuxbinSwapped += luxbinAmount;
        totalUsdcDistributed += usdcAmount;

        emit LuxbinToUsdcSwap(msg.sender, luxbinAmount, usdcAmount);
    }

    /**
     * @notice Swap exact USDC amount (calculate LUXBIN needed)
     * @param usdcAmount Amount of USDC to receive (6 decimals)
     */
    function swapToExactUsdc(uint256 usdcAmount) external {
        require(usdcAmount > 0, "Amount must be positive");

        // Calculate LUXBIN amount needed (1:1 ratio, convert from 6 to 18 decimals)
        uint256 luxbinAmount = usdcAmount * 10**12; // 6 decimals to 18 decimals
        require(luxbin.balanceOf(address(this)) >= luxbinAmount, "Insufficient LUXBIN reserves");
        require(usdc.balanceOf(address(this)) >= usdcAmount, "Insufficient USDC reserves");

        // Transfer LUXBIN from user to contract
        require(luxbin.transferFrom(msg.sender, address(this), luxbinAmount), "LUXBIN transfer failed");

        // Transfer USDC from contract to user
        require(usdc.transfer(msg.sender, usdcAmount), "USDC transfer failed");

        // Update stats
        totalLuxbinSwapped += luxbinAmount;
        totalUsdcDistributed += usdcAmount;

        emit LuxbinToUsdcSwap(msg.sender, luxbinAmount, usdcAmount);
    }

    /**
     * @notice Fund the swap contract with USDC
     * @param amount Amount of USDC to add to reserves
     */
    function fundWithUsdc(uint256 amount) external {
        require(usdc.transferFrom(msg.sender, address(this), amount), "USDC transfer failed");
        emit UsdcFunded(msg.sender, amount);
    }

    /**
     * @notice Fund the swap contract with LUXBIN (for burning/exchange)
     * @param amount Amount of LUXBIN to add to reserves
     */
    function fundWithLuxbin(uint256 amount) external {
        require(luxbin.transferFrom(msg.sender, address(this), amount), "LUXBIN transfer failed");
    }

    /**
     * @notice Withdraw excess USDC (only owner)
     * @param amount Amount to withdraw
     * @param recipient Where to send the USDC
     */
    function withdrawUsdc(uint256 amount, address recipient) external onlyOwner {
        require(usdc.balanceOf(address(this)) >= amount, "Insufficient balance");
        require(usdc.transfer(recipient, amount), "Transfer failed");
    }

    /**
     * @notice Withdraw excess LUXBIN (only owner)
     * @param amount Amount to withdraw
     * @param recipient Where to send the LUXBIN
     */
    function withdrawLuxbin(uint256 amount, address recipient) external onlyOwner {
        require(luxbin.balanceOf(address(this)) >= amount, "Insufficient balance");
        require(luxbin.transfer(recipient, amount), "Transfer failed");
    }

    /**
     * @notice Get current exchange rate (always 1:1)
     * @return luxbinAmount Amount of LUXBIN needed for 1 USDC
     * @return usdcAmount Amount of USDC received for 1 LUXBIN (in 18 decimals)
     */
    function getExchangeRate() external pure returns (uint256 luxbinAmount, uint256 usdcAmount) {
        return (10**18, 10**6); // 1 LUXBIN = 1 USDC
    }

    /**
     * @notice Calculate how much USDC user will receive for LUXBIN amount
     * @param luxbinAmount Amount of LUXBIN to swap
     * @return usdcAmount Amount of USDC user will receive
     */
    function previewSwap(uint256 luxbinAmount) external pure returns (uint256 usdcAmount) {
        return luxbinAmount / 10**12; // Convert 18 to 6 decimals
    }

    /**
     * @notice Get reserve balances
     * @return luxbinBalance LUXBIN reserves
     * @return usdcBalance USDC reserves
     */
    function getReserves() external view returns (uint256 luxbinBalance, uint256 usdcBalance) {
        return (luxbin.balanceOf(address(this)), usdc.balanceOf(address(this)));
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

    // Allow contract to receive ETH (for potential future features)
    receive() external payable {}
}