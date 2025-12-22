// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/**
 * @title ImmuneCell
 * @dev NFT contract for LUXBIN immune system cells (OpenZeppelin v5.x compatible)
 */
contract ImmuneCell is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    using Strings for uint256;

    uint256 private _nextTokenId;

    // Immune cell types
    enum CellType { DETECTOR, DEFENDER, MEMORY, REGULATORY }

    // Cell properties
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

    // Mapping from token ID to cell data
    mapping(uint256 => CellData) public cells;

    // Mapping from cell type to count
    mapping(CellType => uint256) public cellTypeCounts;

    // Events
    event CellMinted(uint256 indexed tokenId, address indexed owner, CellType cellType);
    event CellActivated(uint256 indexed tokenId);
    event CellDeactivated(uint256 indexed tokenId);
    event ReputationUpdated(uint256 indexed tokenId, uint256 newReputation);
    event ThreatDetected(uint256 indexed tokenId, uint256 threatCount);
    event FalsePositiveRecorded(uint256 indexed tokenId, uint256 falsePositiveCount);

    constructor() ERC721("LUXBIN Immune Cell", "IMMUNE") Ownable(msg.sender) {}

    /**
     * @dev Mint a new immune cell NFT
     */
    function mintCell(
        address to,
        CellType cellType,
        string memory uri
    ) public onlyOwner returns (uint256) {
        uint256 tokenId = _nextTokenId++;

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);

        cells[tokenId] = CellData({
            cellType: cellType,
            reputation: 100,
            truePositives: 0,
            falsePositives: 0,
            threatsDetected: 0,
            responsesExecuted: 0,
            createdAt: block.timestamp,
            lastActiveAt: block.timestamp,
            isActive: true,
            quantumFingerprint: ""
        });

        cellTypeCounts[cellType]++;

        emit CellMinted(tokenId, to, cellType);

        return tokenId;
    }

    /**
     * @dev Batch mint multiple cells
     */
    function batchMintCells(
        address to,
        CellType cellType,
        uint256 count,
        string memory baseUri
    ) public onlyOwner returns (uint256[] memory) {
        uint256[] memory tokenIds = new uint256[](count);

        for (uint256 i = 0; i < count; i++) {
            string memory uri = string(abi.encodePacked(baseUri, "/", i.toString()));
            tokenIds[i] = mintCell(to, cellType, uri);
        }

        return tokenIds;
    }

    /**
     * @dev Record a successful threat detection
     */
    function recordThreatDetection(uint256 tokenId) public onlyOwner {
        require(_ownerOf(tokenId) != address(0), "Cell does not exist");
        require(cells[tokenId].cellType == CellType.DETECTOR, "Only detector cells can detect threats");

        CellData storage cell = cells[tokenId];
        cell.truePositives++;
        cell.threatsDetected++;
        cell.reputation += 1;
        cell.lastActiveAt = block.timestamp;

        emit ThreatDetected(tokenId, cell.threatsDetected);
        emit ReputationUpdated(tokenId, cell.reputation);
    }

    /**
     * @dev Record a false positive
     */
    function recordFalsePositive(uint256 tokenId) public onlyOwner {
        require(_ownerOf(tokenId) != address(0), "Cell does not exist");

        CellData storage cell = cells[tokenId];
        cell.falsePositives++;

        if (cell.reputation >= 5) {
            cell.reputation -= 5;
        } else {
            cell.reputation = 0;
        }

        cell.lastActiveAt = block.timestamp;

        // Burn cell if reputation drops too low
        if (int256(cell.reputation) <= -20) {
            _burn(tokenId);
        }

        emit FalsePositiveRecorded(tokenId, cell.falsePositives);
        emit ReputationUpdated(tokenId, cell.reputation);
    }

    /**
     * @dev Record a defense response execution
     */
    function recordResponse(uint256 tokenId) public onlyOwner {
        require(_ownerOf(tokenId) != address(0), "Cell does not exist");
        require(cells[tokenId].cellType == CellType.DEFENDER, "Only defender cells can execute responses");

        CellData storage cell = cells[tokenId];
        cell.responsesExecuted++;
        cell.lastActiveAt = block.timestamp;
    }

    /**
     * @dev Set quantum fingerprint for a cell
     */
    function setQuantumFingerprint(uint256 tokenId, string memory fingerprint) public onlyOwner {
        require(_ownerOf(tokenId) != address(0), "Cell does not exist");
        cells[tokenId].quantumFingerprint = fingerprint;
    }

    /**
     * @dev Activate a cell
     */
    function activateCell(uint256 tokenId) public onlyOwner {
        require(_ownerOf(tokenId) != address(0), "Cell does not exist");
        cells[tokenId].isActive = true;
        emit CellActivated(tokenId);
    }

    /**
     * @dev Deactivate a cell
     */
    function deactivateCell(uint256 tokenId) public onlyOwner {
        require(_ownerOf(tokenId) != address(0), "Cell does not exist");
        cells[tokenId].isActive = false;
        emit CellDeactivated(tokenId);
    }

    /**
     * @dev Get all active cells of a specific type owned by an address
     */
    function getActiveCellsByType(address owner, CellType cellType)
        public
        view
        returns (uint256[] memory)
    {
        uint256 balance = balanceOf(owner);
        uint256[] memory tempIds = new uint256[](balance);
        uint256 count = 0;

        for (uint256 i = 0; i < balance; i++) {
            uint256 tokenId = tokenOfOwnerByIndex(owner, i);
            if (cells[tokenId].cellType == cellType && cells[tokenId].isActive) {
                tempIds[count] = tokenId;
                count++;
            }
        }

        // Create properly sized array
        uint256[] memory result = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = tempIds[i];
        }

        return result;
    }

    /**
     * @dev Get cell data
     */
    function getCell(uint256 tokenId) public view returns (CellData memory) {
        require(_ownerOf(tokenId) != address(0), "Cell does not exist");
        return cells[tokenId];
    }

    /**
     * @dev Get total count of cells by type
     */
    function getCellTypeCount(CellType cellType) public view returns (uint256) {
        return cellTypeCounts[cellType];
    }

    // Required overrides
    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
