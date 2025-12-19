// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/**
 * @title LuxbinToken
 * @dev LUXBIN token for immune system rewards and staking
 * Features:
 * - Mintable by authorized contracts (immune system, staking)
 * - Burnable for deflationary economics
 * - Pausable for emergency stops
 * - Ecosystem fund for sustainability
 */
contract LuxbinToken is ERC20, ERC20Burnable, Ownable, Pausable {
    // Maximum supply: 1 billion LUXBIN
    uint256 public constant MAX_SUPPLY = 1_000_000_000 * 10**18;

    // Ecosystem fund address
    address public ecosystemFund;

    // Authorized minters (immune system contracts, staking contracts)
    mapping(address => bool) public authorizedMinters;

    // Minting limits per minter per day
    mapping(address => uint256) public dailyMintLimit;
    mapping(address => uint256) public lastMintDay;
    mapping(address => uint256) public mintedToday;

    // Events
    event MinterAuthorized(address indexed minter, uint256 dailyLimit);
    event MinterRevoked(address indexed minter);
    event EcosystemFundUpdated(address indexed newFund);
    event TokensMinted(address indexed to, uint256 amount, address indexed minter);
    event DailyLimitUpdated(address indexed minter, uint256 newLimit);

    constructor(address _ecosystemFund) ERC20("LUXBIN", "LUX") {
        require(_ecosystemFund != address(0), "Invalid ecosystem fund address");
        ecosystemFund = _ecosystemFund;

        // Mint initial supply to ecosystem fund (10% of max supply)
        _mint(_ecosystemFund, (MAX_SUPPLY * 10) / 100);
    }

    /**
     * @dev Authorize a contract to mint tokens
     * @param minter Address of the minter contract
     * @param _dailyLimit Maximum tokens this minter can mint per day
     */
    function authorizeMinter(address minter, uint256 _dailyLimit) public onlyOwner {
        require(minter != address(0), "Invalid minter address");
        authorizedMinters[minter] = true;
        dailyMintLimit[minter] = _dailyLimit;
        emit MinterAuthorized(minter, _dailyLimit);
    }

    /**
     * @dev Revoke minting authorization
     * @param minter Address to revoke
     */
    function revokeMinter(address minter) public onlyOwner {
        authorizedMinters[minter] = false;
        emit MinterRevoked(minter);
    }

    /**
     * @dev Update daily mint limit for a minter
     * @param minter Address of the minter
     * @param newLimit New daily limit
     */
    function updateDailyLimit(address minter, uint256 newLimit) public onlyOwner {
        require(authorizedMinters[minter], "Not an authorized minter");
        dailyMintLimit[minter] = newLimit;
        emit DailyLimitUpdated(minter, newLimit);
    }

    /**
     * @dev Mint tokens (only callable by authorized minters)
     * @param to Address to receive tokens
     * @param amount Amount to mint
     */
    function mint(address to, uint256 amount) public whenNotPaused {
        require(authorizedMinters[msg.sender], "Not authorized to mint");
        require(totalSupply() + amount <= MAX_SUPPLY, "Exceeds max supply");

        // Check daily limit
        uint256 currentDay = block.timestamp / 1 days;
        if (lastMintDay[msg.sender] != currentDay) {
            // Reset daily counter
            lastMintDay[msg.sender] = currentDay;
            mintedToday[msg.sender] = 0;
        }

        require(
            mintedToday[msg.sender] + amount <= dailyMintLimit[msg.sender],
            "Exceeds daily mint limit"
        );

        mintedToday[msg.sender] += amount;
        _mint(to, amount);

        emit TokensMinted(to, amount, msg.sender);
    }

    /**
     * @dev Batch mint to multiple addresses
     * @param recipients Array of recipient addresses
     * @param amounts Array of amounts to mint
     */
    function batchMint(address[] memory recipients, uint256[] memory amounts)
        public
        whenNotPaused
    {
        require(recipients.length == amounts.length, "Arrays length mismatch");
        require(authorizedMinters[msg.sender], "Not authorized to mint");

        uint256 totalAmount = 0;
        for (uint256 i = 0; i < amounts.length; i++) {
            totalAmount += amounts[i];
        }

        require(totalSupply() + totalAmount <= MAX_SUPPLY, "Exceeds max supply");

        // Check daily limit
        uint256 currentDay = block.timestamp / 1 days;
        if (lastMintDay[msg.sender] != currentDay) {
            lastMintDay[msg.sender] = currentDay;
            mintedToday[msg.sender] = 0;
        }

        require(
            mintedToday[msg.sender] + totalAmount <= dailyMintLimit[msg.sender],
            "Exceeds daily mint limit"
        );

        mintedToday[msg.sender] += totalAmount;

        for (uint256 i = 0; i < recipients.length; i++) {
            _mint(recipients[i], amounts[i]);
            emit TokensMinted(recipients[i], amounts[i], msg.sender);
        }
    }

    /**
     * @dev Update ecosystem fund address
     * @param newFund New ecosystem fund address
     */
    function updateEcosystemFund(address newFund) public onlyOwner {
        require(newFund != address(0), "Invalid address");
        ecosystemFund = newFund;
        emit EcosystemFundUpdated(newFund);
    }

    /**
     * @dev Pause token transfers (emergency only)
     */
    function pause() public onlyOwner {
        _pause();
    }

    /**
     * @dev Unpause token transfers
     */
    function unpause() public onlyOwner {
        _unpause();
    }

    /**
     * @dev Get remaining mintable amount for today
     * @param minter Address of the minter
     */
    function getRemainingDailyMint(address minter) public view returns (uint256) {
        if (!authorizedMinters[minter]) {
            return 0;
        }

        uint256 currentDay = block.timestamp / 1 days;
        if (lastMintDay[minter] != currentDay) {
            return dailyMintLimit[minter];
        }

        if (mintedToday[minter] >= dailyMintLimit[minter]) {
            return 0;
        }

        return dailyMintLimit[minter] - mintedToday[minter];
    }

    /**
     * @dev Override transfer to add pause functionality
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override whenNotPaused {
        super._beforeTokenTransfer(from, to, amount);
    }
}
