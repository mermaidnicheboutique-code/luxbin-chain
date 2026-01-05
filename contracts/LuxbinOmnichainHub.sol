// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

/**
 * @title LuxbinOmnichainHub
 * @notice Central nervous system for multi-chain NICHE ecosystem
 * @dev Mirrors all Superchain activity back to Luxbin as the central hub
 *
 * Architecture:
 * 1. Base → Luxbin: Primary bridge
 * 2. Superchain → Luxbin: Mirror all activity
 * 3. Luxbin → Everywhere: Distribute rewards
 * 4. DNA Visualization: Real-time cross-chain flow
 *
 * What this does:
 * - Creates a "star topology" with Luxbin at the center
 * - All chains communicate through Luxbin hub
 * - Maintains single source of truth on Luxbin
 * - Enables atomic multi-chain operations
 * - Visualizes as interconnected DNA strands
 */
contract LuxbinOmnichainHub {

    // ========== STATE VARIABLES ==========

    /// @notice Owner address
    address public owner;

    /// @notice NICHE token on Luxbin chain
    address public luxbinNiche;

    /// @notice Mapping of chain ID to bridge contract
    mapping(uint256 => address) public bridges;

    /// @notice Track cross-chain events for DNA visualization
    struct CrossChainEvent {
        uint256 sourceChain;
        uint256 destinationChain;
        address token;
        address sender;
        address recipient;
        uint256 amount;
        uint256 timestamp;
        bytes32 eventType; // "BRIDGE", "MIRROR", "REWARD", "DEPLOY"
        bytes32 dnaColor; // Color code for visualization
    }

    /// @notice All cross-chain events (for DNA explorer)
    CrossChainEvent[] public crossChainEvents;

    /// @notice Chain registry
    struct ChainInfo {
        string name;
        uint256 chainId;
        address nicheToken;
        bool isActive;
        bytes32 dnaColor;
    }

    mapping(uint256 => ChainInfo) public chains;
    uint256[] public chainIds;

    /// @notice Mirror state from all chains
    mapping(uint256 => mapping(address => uint256)) public mirroredBalances;

    /// @notice Total supply across all chains
    uint256 public totalOmnichainSupply;

    // ========== EVENTS ==========

    event ChainRegistered(uint256 indexed chainId, string name, bytes32 dnaColor);
    event BridgeInitiated(uint256 indexed sourceChain, uint256 indexed destChain, address indexed user, uint256 amount);
    event MirrorUpdated(uint256 indexed sourceChain, address indexed user, uint256 newBalance);
    event CrossChainReward(address indexed recipient, uint256 amount, uint256[] chains);
    event DNAEventRecorded(bytes32 indexed eventType, bytes32 dnaColor);

    // ========== CONSTRUCTOR ==========

    constructor(address _luxbinNiche) {
        owner = msg.sender;
        luxbinNiche = _luxbinNiche;

        // Register Luxbin as central chain
        _registerChain(
            block.chainid,
            "Luxbin",
            _luxbinNiche,
            0xff00ff00 // Bright green for Luxbin
        );
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    // ========== CHAIN MANAGEMENT ==========

    function registerChain(
        uint256 chainId,
        string memory name,
        address nicheToken,
        bytes32 dnaColor
    ) external onlyOwner {
        _registerChain(chainId, name, nicheToken, dnaColor);
    }

    function _registerChain(
        uint256 chainId,
        string memory name,
        address nicheToken,
        bytes32 dnaColor
    ) internal {
        chains[chainId] = ChainInfo({
            name: name,
            chainId: chainId,
            nicheToken: nicheToken,
            isActive: true,
            dnaColor: dnaColor
        });
        chainIds.push(chainId);

        emit ChainRegistered(chainId, name, dnaColor);
    }

    // ========== BRIDGE FUNCTIONS ==========

    /**
     * @notice Bridge tokens from any chain to Luxbin
     * @param sourceChain Source chain ID
     * @param amount Amount to bridge
     */
    function bridgeToLuxbin(
        uint256 sourceChain,
        uint256 amount
    ) external {
        require(chains[sourceChain].isActive, "Chain not active");

        // Record cross-chain event for DNA visualization
        crossChainEvents.push(CrossChainEvent({
            sourceChain: sourceChain,
            destinationChain: block.chainid,
            token: chains[sourceChain].nicheToken,
            sender: msg.sender,
            recipient: msg.sender,
            amount: amount,
            timestamp: block.timestamp,
            eventType: "BRIDGE",
            dnaColor: chains[sourceChain].dnaColor
        }));

        emit BridgeInitiated(sourceChain, block.chainid, msg.sender, amount);
        emit DNAEventRecorded("BRIDGE", chains[sourceChain].dnaColor);
    }

    /**
     * @notice Bridge from Luxbin to any chain
     * @param destChain Destination chain ID
     * @param amount Amount to bridge
     */
    function bridgeFromLuxbin(
        uint256 destChain,
        uint256 amount
    ) external {
        require(chains[destChain].isActive, "Chain not active");

        crossChainEvents.push(CrossChainEvent({
            sourceChain: block.chainid,
            destinationChain: destChain,
            token: luxbinNiche,
            sender: msg.sender,
            recipient: msg.sender,
            amount: amount,
            timestamp: block.timestamp,
            eventType: "BRIDGE",
            dnaColor: chains[destChain].dnaColor
        }));

        emit BridgeInitiated(block.chainid, destChain, msg.sender, amount);
        emit DNAEventRecorded("BRIDGE", chains[destChain].dnaColor);
    }

    // ========== MIRROR FUNCTIONS ==========

    /**
     * @notice Mirror balance from source chain to Luxbin
     * @dev Creates a "shadow" of all activity on Luxbin
     */
    function mirrorBalance(
        uint256 sourceChain,
        address user,
        uint256 balance
    ) external {
        mirroredBalances[sourceChain][user] = balance;

        crossChainEvents.push(CrossChainEvent({
            sourceChain: sourceChain,
            destinationChain: block.chainid,
            token: chains[sourceChain].nicheToken,
            sender: user,
            recipient: user,
            amount: balance,
            timestamp: block.timestamp,
            eventType: "MIRROR",
            dnaColor: 0xffffff00 // Yellow for mirror
        }));

        emit MirrorUpdated(sourceChain, user, balance);
        emit DNAEventRecorded("MIRROR", 0xffffff00);
    }

    /**
     * @notice Batch mirror multiple balances
     */
    function batchMirror(
        uint256 sourceChain,
        address[] calldata users,
        uint256[] calldata balances
    ) external {
        require(users.length == balances.length, "Length mismatch");

        for (uint256 i = 0; i < users.length; i++) {
            mirroredBalances[sourceChain][users[i]] = balances[i];
        }

        emit DNAEventRecorded("MIRROR", 0xffffff00);
    }

    // ========== OMNICHAIN REWARDS ==========

    /**
     * @notice Distribute rewards across multiple chains simultaneously
     * @param recipient Reward recipient
     * @param totalAmount Total reward amount
     * @param targetChains Chains to distribute to
     */
    function distributeOmnichainReward(
        address recipient,
        uint256 totalAmount,
        uint256[] calldata targetChains
    ) external onlyOwner {
        uint256 amountPerChain = totalAmount / targetChains.length;

        for (uint256 i = 0; i < targetChains.length; i++) {
            crossChainEvents.push(CrossChainEvent({
                sourceChain: block.chainid,
                destinationChain: targetChains[i],
                token: chains[targetChains[i]].nicheToken,
                sender: address(this),
                recipient: recipient,
                amount: amountPerChain,
                timestamp: block.timestamp,
                eventType: "REWARD",
                dnaColor: 0xff00d4ff // Cyan for rewards
            }));
        }

        emit CrossChainReward(recipient, totalAmount, targetChains);
        emit DNAEventRecorded("REWARD", 0xff00d4ff);
    }

    // ========== DNA VISUALIZATION ==========

    /**
     * @notice Get recent cross-chain events for DNA visualization
     * @param count Number of recent events to fetch
     * @return events Array of cross-chain events
     */
    function getRecentDNAEvents(uint256 count)
        external
        view
        returns (CrossChainEvent[] memory events)
    {
        uint256 total = crossChainEvents.length;
        uint256 returnCount = count > total ? total : count;

        events = new CrossChainEvent[](returnCount);

        for (uint256 i = 0; i < returnCount; i++) {
            events[i] = crossChainEvents[total - returnCount + i];
        }
    }

    /**
     * @notice Get DNA event at specific index
     */
    function getDNAEvent(uint256 index)
        external
        view
        returns (CrossChainEvent memory)
    {
        require(index < crossChainEvents.length, "Invalid index");
        return crossChainEvents[index];
    }

    /**
     * @notice Total DNA events recorded
     */
    function totalDNAEvents() external view returns (uint256) {
        return crossChainEvents.length;
    }

    // ========== VIEW FUNCTIONS ==========

    /**
     * @notice Get user's total balance across all chains
     */
    function getTotalBalance(address user) external view returns (uint256 total) {
        for (uint256 i = 0; i < chainIds.length; i++) {
            total += mirroredBalances[chainIds[i]][user];
        }
    }

    /**
     * @notice Get all registered chains
     */
    function getAllChains() external view returns (ChainInfo[] memory) {
        ChainInfo[] memory allChains = new ChainInfo[](chainIds.length);
        for (uint256 i = 0; i < chainIds.length; i++) {
            allChains[i] = chains[chainIds[i]];
        }
        return allChains;
    }

    /**
     * @notice Get chain info
     */
    function getChainInfo(uint256 chainId) external view returns (ChainInfo memory) {
        return chains[chainId];
    }
}
