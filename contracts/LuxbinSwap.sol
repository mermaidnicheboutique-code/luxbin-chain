// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title LuxbinSwap
 * @dev Simple ETH to LUX token swap contract
 * Users can buy LUX tokens by sending ETH at a fixed rate
 */
contract LuxbinSwap is Ownable, ReentrancyGuard {
    IERC20 public immutable luxToken;
    uint256 public ethToLuxRate; // How many LUX tokens per 1 ETH (e.g., 1000 = 1 ETH = 1000 LUX)

    event TokensPurchased(address indexed buyer, uint256 ethAmount, uint256 luxAmount);
    event RateUpdated(uint256 newRate);
    event TokensWithdrawn(address indexed owner, uint256 amount);

    constructor(address _luxToken, uint256 _initialRate, address initialOwner)
        Ownable(initialOwner)
    {
        require(_luxToken != address(0), "Invalid token address");
        require(_initialRate > 0, "Rate must be greater than 0");

        luxToken = IERC20(_luxToken);
        ethToLuxRate = _initialRate;
    }

    /**
     * @dev Buy LUX tokens by sending ETH
     * Uses the current ETH to LUX rate
     */
    function buyTokens() external payable nonReentrant {
        require(msg.value > 0, "Must send ETH to buy tokens");

        uint256 luxAmount = (msg.value * ethToLuxRate) / 1 ether;
        require(luxAmount > 0, "ETH amount too small for tokens");

        // Check if contract has enough tokens
        uint256 contractBalance = luxToken.balanceOf(address(this));
        require(contractBalance >= luxAmount, "Insufficient tokens in contract");

        // Transfer tokens to buyer
        bool success = luxToken.transfer(msg.sender, luxAmount);
        require(success, "Token transfer failed");

        emit TokensPurchased(msg.sender, msg.value, luxAmount);
    }

    /**
     * @dev Get the amount of LUX tokens for a given ETH amount
     */
    function getLuxAmount(uint256 ethAmount) external view returns (uint256) {
        return (ethAmount * ethToLuxRate) / 1 ether;
    }

    /**
     * @dev Get the amount of ETH needed for a given LUX amount
     */
    function getEthAmount(uint256 luxAmount) external view returns (uint256) {
        return (luxAmount * 1 ether) / ethToLuxRate;
    }

    /**
     * @dev Update the exchange rate (only owner)
     */
    function setRate(uint256 newRate) external onlyOwner {
        require(newRate > 0, "Rate must be greater than 0");
        ethToLuxRate = newRate;
        emit RateUpdated(newRate);
    }

    /**
     * @dev Withdraw ETH from contract (only owner)
     */
    function withdrawEth(uint256 amount) external onlyOwner {
        require(amount <= address(this).balance, "Insufficient ETH balance");
        payable(owner()).transfer(amount);
    }

    /**
     * @dev Withdraw remaining LUX tokens from contract (only owner)
     */
    function withdrawTokens(uint256 amount) external onlyOwner {
        require(amount <= luxToken.balanceOf(address(this)), "Insufficient token balance");
        bool success = luxToken.transfer(owner(), amount);
        require(success, "Token transfer failed");
        emit TokensWithdrawn(owner(), amount);
    }

    /**
     * @dev Get contract LUX balance
     */
    function getContractLuxBalance() external view returns (uint256) {
        return luxToken.balanceOf(address(this));
    }

    /**
     * @dev Get contract ETH balance
     */
    function getContractEthBalance() external view returns (uint256) {
        return address(this).balance;
    }

    // Receive function to accept ETH
    receive() external payable {
        buyTokens();
    }
}