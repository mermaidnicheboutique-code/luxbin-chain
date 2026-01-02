// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./LuxbinToken.sol";

/**
 * @title LuxbinEthSwap
 * @notice ETH ↔ LUXBIN swap mechanism
 *
 * LIQUIDITY AGAINST ETH:
 * - Swap ETH for LUXBIN tokens
 * - Swap LUXBIN tokens for ETH
 * - Provides liquidity for LUXBIN against ETH
 * - Helps establish LUXBIN market value
 */

contract LuxbinEthSwap {
    // LUXBIN token contract
    LuxbinToken public immutable luxbin;

    // Owner
    address public owner;

    // Swap parameters
    uint256 public ethToLuxbinRate = 1000 * 10**18; // 1000 LUXBIN per ETH (for testing)
    uint256 public luxbinToEthRate = 10**18 / 1000; // 0.001 ETH per LUXBIN

    // Swap stats
    uint256 public totalEthSwapped;
    uint256 public totalLuxbinSwapped;

    // Events
    event EthToLuxbinSwap(address indexed user, uint256 ethAmount, uint256 luxbinAmount);
    event LuxbinToEthSwap(address indexed user, uint256 luxbinAmount, uint256 ethAmount);
    event RatesUpdated(uint256 newEthToLuxbinRate, uint256 newLuxbinToEthRate);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor(address _luxbinToken) {
        luxbin = LuxbinToken(_luxbinToken);
        owner = msg.sender;
    }

    /**
     * @notice Swap ETH for LUXBIN tokens
     */
    function swapEthToLuxbin() external payable {
        require(msg.value > 0, "Must send ETH");

        // Calculate LUXBIN amount based on rate
        uint256 luxbinAmount = (msg.value * ethToLuxbinRate) / 10**18;
        require(luxbin.balanceOf(address(this)) >= luxbinAmount, "Insufficient LUXBIN reserves");

        // Transfer LUXBIN to user
        require(luxbin.transfer(msg.sender, luxbinAmount), "LUXBIN transfer failed");

        // Update stats
        totalEthSwapped += msg.value;
        totalLuxbinSwapped += luxbinAmount;

        emit EthToLuxbinSwap(msg.sender, msg.value, luxbinAmount);
    }

    /**
     * @notice Swap LUXBIN for ETH
     * @param luxbinAmount Amount of LUXBIN to swap
     */
    function swapLuxbinToEth(uint256 luxbinAmount) external {
        require(luxbinAmount > 0, "Amount must be positive");

        // Calculate ETH amount based on rate
        uint256 ethAmount = (luxbinAmount * luxbinToEthRate) / 10**18;
        require(address(this).balance >= ethAmount, "Insufficient ETH reserves");

        // Transfer LUXBIN from user to contract
        require(luxbin.transferFrom(msg.sender, address(this), luxbinAmount), "LUXBIN transfer failed");

        // Transfer ETH to user
        payable(msg.sender).transfer(ethAmount);

        // Update stats
        totalLuxbinSwapped += luxbinAmount;
        totalEthSwapped += ethAmount;

        emit LuxbinToEthSwap(msg.sender, luxbinAmount, ethAmount);
    }

    /**
     * @notice Swap exact ETH amount for LUXBIN
     * @param ethAmount Amount of ETH to spend
     */
    function swapExactEth(uint256 ethAmount) external payable {
        require(msg.value == ethAmount, "ETH amount mismatch");

        // Calculate LUXBIN amount based on rate
        uint256 luxbinAmount = (ethAmount * ethToLuxbinRate) / 10**18;
        require(luxbin.balanceOf(address(this)) >= luxbinAmount, "Insufficient LUXBIN reserves");

        // Transfer LUXBIN to user
        require(luxbin.transfer(msg.sender, luxbinAmount), "LUXBIN transfer failed");

        // Update stats
        totalEthSwapped += msg.value;
        totalLuxbinSwapped += luxbinAmount;

        emit EthToLuxbinSwap(msg.sender, msg.value, luxbinAmount);
    }

    /**
     * @notice Swap exact LUXBIN amount for ETH
     * @param luxbinAmount Amount of LUXBIN to spend
     */
    function swapExactLuxbin(uint256 luxbinAmount) external {
        require(luxbinAmount > 0, "Amount must be positive");

        // Calculate ETH amount based on rate
        uint256 ethAmount = (luxbinAmount * luxbinToEthRate) / 10**18;
        require(address(this).balance >= ethAmount, "Insufficient ETH reserves");

        // Transfer LUXBIN from user to contract
        require(luxbin.transferFrom(msg.sender, address(this), luxbinAmount), "LUXBIN transfer failed");

        // Transfer ETH to user
        payable(msg.sender).transfer(ethAmount);

        // Update stats
        totalLuxbinSwapped += luxbinAmount;
        totalEthSwapped += ethAmount;

        emit LuxbinToEthSwap(msg.sender, luxbinAmount, ethAmount);
    }

    /**
     * @notice Fund the contract with LUXBIN tokens
     * @param amount Amount of LUXBIN to add to reserves
     */
    function fundWithLuxbin(uint256 amount) external {
        require(luxbin.transferFrom(msg.sender, address(this), amount), "LUXBIN transfer failed");
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
     * @notice Withdraw excess ETH (only owner)
     * @param amount Amount to withdraw
     * @param recipient Where to send the ETH
     */
    function withdrawEth(uint256 amount, address payable recipient) external onlyOwner {
        require(address(this).balance >= amount, "Insufficient balance");
        recipient.transfer(amount);
    }

    /**
     * @notice Update exchange rates (only owner)
     * @param _ethToLuxbinRate New ETH to LUXBIN rate (LUXBIN per ETH)
     * @param _luxbinToEthRate New LUXBIN to ETH rate (ETH per LUXBIN)
     */
    function updateRates(uint256 _ethToLuxbinRate, uint256 _luxbinToEthRate) external onlyOwner {
        ethToLuxbinRate = _ethToLuxbinRate;
        luxbinToEthRate = _luxbinToEthRate;
        emit RatesUpdated(_ethToLuxbinRate, _luxbinToEthRate);
    }

    /**
     * @notice Get current exchange rates
     * @return ethToLuxbin LUXBIN received per ETH
     * @return luxbinToEth ETH received per LUXBIN
     */
    function getRates() external view returns (uint256 ethToLuxbin, uint256 luxbinToEth) {
        return (ethToLuxbinRate, luxbinToEthRate);
    }

    /**
     * @notice Calculate LUXBIN amount for ETH input
     * @param ethAmount Amount of ETH to swap
     * @return luxbinAmount Amount of LUXBIN user will receive
     */
    function previewEthToLuxbin(uint256 ethAmount) external view returns (uint256 luxbinAmount) {
        return (ethAmount * ethToLuxbinRate) / 10**18;
    }

    /**
     * @notice Calculate ETH amount for LUXBIN input
     * @param luxbinAmount Amount of LUXBIN to swap
     * @return ethAmount Amount of ETH user will receive
     */
    function previewLuxbinToEth(uint256 luxbinAmount) external view returns (uint256 ethAmount) {
        return (luxbinAmount * luxbinToEthRate) / 10**18;
    }

    /**
     * @notice Get reserve balances
     * @return luxbinBalance LUXBIN reserves
     * @return ethBalance ETH reserves
     */
    function getReserves() external view returns (uint256 luxbinBalance, uint256 ethBalance) {
        return (luxbin.balanceOf(address(this)), address(this).balance);
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