// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "./GaslessForwarder.sol";

/**
 * @title NicheToken
 * @dev $Niche token with fixed supply of 21 million, tied to Luxbin chain
 * Gasless transactions via Luxbin's GaslessForwarder for no-fee experience
 * Inspired by Luxbin's Bitcoin-like scarcity model
 * Compatible with OpenZeppelin v5.x
 */
contract NicheToken is ERC20, ERC20Burnable {
    // Fixed supply: 21 million NICHE (mirroring Luxbin's LUX supply for consistency)
    uint256 public constant TOTAL_SUPPLY = 21_000_000 * 10**18;

    // Gasless forwarder for meta-transactions
    GaslessForwarder public forwarder;

    // Events
    event ForwarderUpdated(address indexed newForwarder);

    constructor(address _forwarder) ERC20("Niche", "NICHE") {
        require(_forwarder != address(0), "Invalid forwarder address");
        forwarder = GaslessForwarder(_forwarder);

        // Mint entire supply to deployer
        _mint(msg.sender, TOTAL_SUPPLY);
    }

    /**
     * @dev Execute meta-transaction via forwarder (gasless for users)
     */
    function executeMetaTransfer(
        address from,
        address to,
        uint256 amount,
        uint256 nonce,
        bytes memory signature
    ) external returns (bool) {
        require(forwarder.authorizedRelayers(msg.sender), "Not authorized relayer");

        // Verify signature and nonce via forwarder
        bytes memory data = abi.encodeWithSignature("transferFrom(address,address,uint256)", from, to, amount);
        (bool success, ) = forwarder.execute(from, address(this), data, nonce, signature);

        return success;
    }

    /**
     * @dev Update forwarder address (only owner)
     */
    function updateForwarder(address newForwarder) external {
        require(msg.sender == owner(), "Only owner");
        require(newForwarder != address(0), "Invalid forwarder");
        forwarder = GaslessForwarder(newForwarder);
        emit ForwarderUpdated(newForwarder);
    }

    // Override _update for any custom logic if needed
    function _update(address from, address to, uint256 value) internal override {
        super._update(from, to, value);
    }
}