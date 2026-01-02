// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

/**
 * @title GaslessForwarder
 * @dev Meta-transaction forwarder for gasless immune system operations (OpenZeppelin v5.x compatible)
 */
contract GaslessForwarder is Ownable, ReentrancyGuard {
    using ECDSA for bytes32;

    // Nonce for each user to prevent replay attacks
    mapping(address => uint256) public nonces;

    // Authorized relayers who can submit transactions
    mapping(address => bool) public authorizedRelayers;

    // Gas treasury balance
    uint256 public gasTreasury;

    // Maximum gas price willing to pay
    uint256 public maxGasPrice = 100 gwei;

    // Whitelisted target contracts
    mapping(address => bool) public whitelistedTargets;

    // Daily gas budget per user
    mapping(address => uint256) public dailyGasUsed;
    mapping(address => uint256) public lastGasDay;
    uint256 public dailyGasLimit = 0.1 ether;

    // Events
    event MetaTransactionExecuted(
        address indexed from,
        address indexed to,
        bytes data,
        uint256 gasUsed,
        bool success
    );
    event RelayerAuthorized(address indexed relayer);
    event RelayerRevoked(address indexed relayer);
    event TargetWhitelisted(address indexed target);
    event TargetBlacklisted(address indexed target);
    event GasTreasuryDeposited(address indexed from, uint256 amount);
    event GasTreasuryWithdrawn(address indexed to, uint256 amount);

    // Struct for forward request
    struct ForwardRequest {
        address from;
        address to;
        uint256 value;
        uint256 gas;
        uint256 nonce;
        bytes data;
    }

    constructor() Ownable(msg.sender) {
        authorizedRelayers[msg.sender] = true;
    }

    /**
     * @dev Deposit ETH to gas treasury
     */
    function depositGas() public payable {
        gasTreasury += msg.value;
        emit GasTreasuryDeposited(msg.sender, msg.value);
    }

    /**
     * @dev Withdraw from gas treasury
     */
    function withdrawGas(address payable to, uint256 amount) public onlyOwner {
        require(gasTreasury >= amount, "Insufficient treasury balance");
        gasTreasury -= amount;
        (bool success, ) = to.call{value: amount}("");
        require(success, "Transfer failed");
        emit GasTreasuryWithdrawn(to, amount);
    }

    /**
     * @dev Authorize a relayer
     */
    function authorizeRelayer(address relayer) public onlyOwner {
        authorizedRelayers[relayer] = true;
        emit RelayerAuthorized(relayer);
    }

    /**
     * @dev Revoke a relayer
     */
    function revokeRelayer(address relayer) public onlyOwner {
        authorizedRelayers[relayer] = false;
        emit RelayerRevoked(relayer);
    }

    /**
     * @dev Whitelist a target contract
     */
    function whitelistTarget(address target) public onlyOwner {
        whitelistedTargets[target] = true;
        emit TargetWhitelisted(target);
    }

    /**
     * @dev Blacklist a target contract
     */
    function blacklistTarget(address target) public onlyOwner {
        whitelistedTargets[target] = false;
        emit TargetBlacklisted(target);
    }

    /**
     * @dev Update max gas price
     */
    function setMaxGasPrice(uint256 newMaxGasPrice) public onlyOwner {
        maxGasPrice = newMaxGasPrice;
    }

    /**
     * @dev Update daily gas limit per user
     */
    function setDailyGasLimit(uint256 newLimit) public onlyOwner {
        dailyGasLimit = newLimit;
    }

    /**
     * @dev Execute a meta-transaction
     */
    function executeMetaTransaction(
        ForwardRequest calldata req,
        bytes calldata signature
    ) public nonReentrant returns (bool, bytes memory) {
        require(authorizedRelayers[msg.sender], "Not an authorized relayer");
        require(tx.gasprice <= maxGasPrice, "Gas price too high");
        require(whitelistedTargets[req.to], "Target not whitelisted");

        // Verify signature
        require(_verify(req, signature), "Invalid signature");

        // Check nonce
        require(nonces[req.from] == req.nonce, "Invalid nonce");
        nonces[req.from]++;

        // Check daily gas limit
        uint256 currentDay = block.timestamp / 1 days;
        if (lastGasDay[req.from] != currentDay) {
            lastGasDay[req.from] = currentDay;
            dailyGasUsed[req.from] = 0;
        }

        uint256 gasStart = gasleft();

        // Execute the transaction
        (bool success, bytes memory returndata) = req.to.call{
            gas: req.gas,
            value: req.value
        }(req.data);

        uint256 gasUsed = (gasStart - gasleft()) * tx.gasprice;

        require(
            dailyGasUsed[req.from] + gasUsed <= dailyGasLimit,
            "Daily gas limit exceeded"
        );

        dailyGasUsed[req.from] += gasUsed;

        // Reimburse relayer from treasury
        if (gasTreasury >= gasUsed) {
            gasTreasury -= gasUsed;
            (bool reimbursed, ) = msg.sender.call{value: gasUsed}("");
            require(reimbursed, "Reimbursement failed");
        }

        emit MetaTransactionExecuted(req.from, req.to, req.data, gasUsed, success);

        return (success, returndata);
    }

    /**
     * @dev Verify signature
     */
    function _verify(ForwardRequest calldata req, bytes calldata signature)
        internal
        view
        returns (bool)
    {
        bytes32 digest = _getTypedDataHash(req);
        address signer = digest.recover(signature);
        return signer == req.from;
    }

    /**
     * @dev Get typed data hash for EIP-712 signature
     */
    function _getTypedDataHash(ForwardRequest calldata req)
        internal
        view
        returns (bytes32)
    {
        return
            keccak256(
                abi.encodePacked(
                    "\x19\x01",
                    _getDomainSeparator(),
                    keccak256(
                        abi.encode(
                            keccak256(
                                "ForwardRequest(address from,address to,uint256 value,uint256 gas,uint256 nonce,bytes data)"
                            ),
                            req.from,
                            req.to,
                            req.value,
                            req.gas,
                            req.nonce,
                            keccak256(req.data)
                        )
                    )
                )
            );
    }

    /**
     * @dev Get domain separator for EIP-712
     */
    function _getDomainSeparator() internal view returns (bytes32) {
        return
            keccak256(
                abi.encode(
                    keccak256(
                        "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
                    ),
                    keccak256(bytes("GaslessForwarder")),
                    keccak256(bytes("1")),
                    block.chainid,
                    address(this)
                )
            );
    }

    /**
     * @dev Get nonce for user
     */
    function getNonce(address user) public view returns (uint256) {
        return nonces[user];
    }

    /**
     * @dev Get remaining daily gas for user
     */
    function getRemainingDailyGas(address user) public view returns (uint256) {
        uint256 currentDay = block.timestamp / 1 days;
        if (lastGasDay[user] != currentDay) {
            return dailyGasLimit;
        }
        if (dailyGasUsed[user] >= dailyGasLimit) {
            return 0;
        }
        return dailyGasLimit - dailyGasUsed[user];
    }

    /**
     * @dev Receive ETH deposits
     */
    receive() external payable {
        depositGas();
    }
}
