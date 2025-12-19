// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title ImmuneCell
 * @dev NFT contract for LUXBIN immune system cells
 * Each NFT represents a specific immune cell type with unique properties
 */
contract ImmuneCell is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

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

    constructor() ERC721("LUXBIN Immune Cell", "IMMUNE") {}

    /**
     * @dev Mint a new immune cell NFT
     * @param to Address to receive the NFT
     * @param cellType Type of immune cell
     * @param uri Metadata URI for the cell
     */
    function mintCell(
        address to,
        CellType cellType,
        string memory uri
    ) public onlyOwner returns (uint256) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();

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
     * @param to Address to receive the NFTs
     * @param cellType Type of immune cell
     * @param count Number of cells to mint
     * @param baseUri Base URI for metadata
     */
    function batchMintCells(
        address to,
        CellType cellType,
        uint256 count,
        string memory baseUri
    ) public onlyOwner returns (uint256[] memory) {
        uint256[] memory tokenIds = new uint256[](count);

        for (uint256 i = 0; i < count; i++) {
            string memory uri = string(abi.encodePacked(baseUri, "/", Strings.toString(i)));
            tokenIds[i] = mintCell(to, cellType, uri);
        }

        return tokenIds;
    }

    /**
     * @dev Record a successful threat detection
     * @param tokenId Token ID of the detector cell
     */
    function recordThreatDetection(uint256 tokenId) public onlyOwner {
        require(_exists(tokenId), "Cell does not exist");
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
     * @param tokenId Token ID of the detector cell
     */
    function recordFalsePositive(uint256 tokenId) public onlyOwner {
        require(_exists(tokenId), "Cell does not exist");

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
     * @param tokenId Token ID of the defender cell
     */
    function recordResponse(uint256 tokenId) public onlyOwner {
        require(_exists(tokenId), "Cell does not exist");
        require(cells[tokenId].cellType == CellType.DEFENDER, "Only defender cells can execute responses");

        CellData storage cell = cells[tokenId];
        cell.responsesExecuted++;
        cell.lastActiveAt = block.timestamp;
    }

    /**
     * @dev Set quantum fingerprint for a cell
     * @param tokenId Token ID
     * @param fingerprint Quantum fingerprint hash
     */
    function setQuantumFingerprint(uint256 tokenId, string memory fingerprint) public onlyOwner {
        require(_exists(tokenId), "Cell does not exist");
        cells[tokenId].quantumFingerprint = fingerprint;
    }

    /**
     * @dev Activate a cell
     * @param tokenId Token ID
     */
    function activateCell(uint256 tokenId) public onlyOwner {
        require(_exists(tokenId), "Cell does not exist");
        cells[tokenId].isActive = true;
        emit CellActivated(tokenId);
    }

    /**
     * @dev Deactivate a cell
     * @param tokenId Token ID
     */
    function deactivateCell(uint256 tokenId) public onlyOwner {
        require(_exists(tokenId), "Cell does not exist");
        cells[tokenId].isActive = false;
        emit CellDeactivated(tokenId);
    }

    /**
     * @dev Get all active cells of a specific type owned by an address
     * @param owner Address to query
     * @param cellType Type of cell to filter
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
     * @param tokenId Token ID
     */
    function getCell(uint256 tokenId) public view returns (CellData memory) {
        require(_exists(tokenId), "Cell does not exist");
        return cells[tokenId];
    }

    /**
     * @dev Get total count of cells by type
     * @param cellType Type of cell
     */
    function getCellTypeCount(CellType cellType) public view returns (uint256) {
        return cellTypeCounts[cellType];
    }

    // Required overrides
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        CellType cellType = cells[tokenId].cellType;
        cellTypeCounts[cellType]--;
        super._burn(tokenId);
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
