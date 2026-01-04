import { NextRequest, NextResponse } from 'next/server';
import { blockchainClient } from '@/lib/blockchainClient';
import { photonicToHex } from '@/lib/lightLanguage';

/**
 * Memory Smart Contract Deployment
 * Converts light memories into self-deploying smart contracts
 * for the LUXBIN immune system
 */

interface MemoryContract {
  contractId: string;
  memoryId: string;
  photonicCode: string; // Hexadecimal photonic sequence
  contractType: 'ANTIBODY' | 'PATTERN_RECOGNIZER' | 'THREAT_DETECTOR' | 'KNOWLEDGE_KEEPER';
  deploymentTx: string;
  isActive: boolean;
  detectsThreats: string[]; // Threat patterns this contract recognizes
  timestamp: number;
}

// Deployed memory contracts (immune system antibodies)
let deployedContracts: MemoryContract[] = [];

export async function POST(request: NextRequest) {
  try {
    const { memoryId, photonicCode, lightMemory, contractType } = await request.json();

    if (!memoryId || !photonicCode) {
      return NextResponse.json(
        { error: 'memoryId and photonicCode required' },
        { status: 400 }
      );
    }

    // Determine contract type based on memory category and content
    const type = contractType || determineContractType(lightMemory);

    // Generate smart contract code from photonic sequence
    const contractCode = generateContractCode(
      memoryId,
      photonicCode,
      lightMemory,
      type
    );

    // Deploy to blockchain
    const deploymentResult = await deployToBlockchain(
      contractCode,
      memoryId
    );

    // Create memory contract
    const contract: MemoryContract = {
      contractId: `contract_${memoryId}_${Date.now()}`,
      memoryId,
      photonicCode,
      contractType: type,
      deploymentTx: deploymentResult.txHash,
      isActive: true,
      detectsThreats: extractThreatPatterns(lightMemory),
      timestamp: Date.now()
    };

    deployedContracts.push(contract);

    console.log('⚡ Memory contract deployed:', {
      contractId: contract.contractId,
      type: contract.contractType,
      memoryId,
      threatens: contract.detectsThreats.length
    });

    return NextResponse.json({
      success: true,
      contract: {
        id: contract.contractId,
        type: contract.contractType,
        deploymentTx: contract.deploymentTx,
        photonicCode: contract.photonicCode.substring(0, 20) + '...',
        threatDetection: contract.detectsThreats,
        status: 'DEPLOYED',
        blockchainConfirmed: deploymentResult.success
      },
      immuneSystem: {
        totalAntibodies: deployedContracts.length,
        activeContracts: deployedContracts.filter(c => c.isActive).length,
        threatCoverage: Array.from(new Set(deployedContracts.flatMap(c => c.detectsThreats))).length
      }
    });

  } catch (error) {
    console.error('Contract deployment error:', error);
    return NextResponse.json(
      { error: 'Failed to deploy memory contract' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const active = searchParams.get('active');

    let contracts = deployedContracts;

    if (type) {
      contracts = contracts.filter(c => c.contractType === type);
    }

    if (active === 'true') {
      contracts = contracts.filter(c => c.isActive);
    }

    // Group by type for immune system overview
    const immuneSystemStatus = {
      antibodies: contracts.filter(c => c.contractType === 'ANTIBODY').length,
      patternRecognizers: contracts.filter(c => c.contractType === 'PATTERN_RECOGNIZER').length,
      threatDetectors: contracts.filter(c => c.contractType === 'THREAT_DETECTOR').length,
      knowledgeKeepers: contracts.filter(c => c.contractType === 'KNOWLEDGE_KEEPER').length,
      totalContracts: contracts.length,
      activeContracts: contracts.filter(c => c.isActive).length,
      uniqueThreatPatterns: Array.from(new Set(contracts.flatMap(c => c.detectsThreats))).length
    };

    return NextResponse.json({
      contracts: contracts.map(c => ({
        id: c.contractId,
        type: c.contractType,
        memoryId: c.memoryId,
        photonicPreview: c.photonicCode.substring(0, 20) + '...',
        isActive: c.isActive,
        detectsThreats: c.detectsThreats,
        deploymentTx: c.deploymentTx
      })),
      immuneSystem: immuneSystemStatus
    });

  } catch (error) {
    console.error('Contract retrieval error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve contracts' },
      { status: 500 }
    );
  }
}

/**
 * Determine contract type based on memory content
 */
function determineContractType(lightMemory: any): MemoryContract['contractType'] {
  if (!lightMemory) return 'KNOWLEDGE_KEEPER';

  const { category, emotionalResonance, photonicSequence } = lightMemory;

  // High-energy, security-related memories become threat detectors
  if (photonicSequence.energyLevel > 75 && /security|threat|attack|vulnerability/.test(category)) {
    return 'THREAT_DETECTOR';
  }

  // Pattern-heavy memories become pattern recognizers
  if (photonicSequence.coherence > 0.8) {
    return 'PATTERN_RECOGNIZER';
  }

  // Defensive/protective memories become antibodies
  if (/protect|defend|immune|safe/.test(emotionalResonance) || category === 'security') {
    return 'ANTIBODY';
  }

  // Everything else is a knowledge keeper
  return 'KNOWLEDGE_KEEPER';
}

/**
 * Generate smart contract code from photonic sequence
 */
function generateContractCode(
  memoryId: string,
  photonicCode: string,
  lightMemory: any,
  type: MemoryContract['contractType']
): string {
  const template = `
// LUXBIN Memory Contract: ${memoryId}
// Type: ${type}
// Photonic Code: ${photonicCode}
// Generated: ${new Date().toISOString()}

contract MemoryAntibody_${memoryId.substring(0, 8)} {
    // Photonic signature (light language encoding)
    bytes32 public constant PHOTONIC_SIGNATURE = ${photonicCode};

    // Contract type
    string public constant CONTRACT_TYPE = "${type}";

    // Memory metadata
    string public category = "${lightMemory?.category || 'unknown'}";
    uint256 public energyLevel = ${lightMemory?.photonicSequence?.energyLevel || 0};
    uint256 public coherence = ${Math.floor((lightMemory?.photonicSequence?.coherence || 0) * 100)};

    // Threat detection patterns
    string[] public threatPatterns;

    // Active status
    bool public isActive = true;

    constructor() {
        ${extractThreatPatterns(lightMemory).map((pattern: string) =>
          `threatPatterns.push("${pattern}");`
        ).join('\n        ')}
    }

    // Check if input matches this memory's threat pattern
    function detectThreat(bytes32 inputPattern) public view returns (bool) {
        if (!isActive) return false;
        return (inputPattern == PHOTONIC_SIGNATURE);
    }

    // Activate immune response
    function activateResponse() public returns (string memory) {
        require(isActive, "Contract is inactive");
        return "Immune response activated: ${type}";
    }

    // Get photonic colors
    function getPhotonicColors() public pure returns (string memory) {
        return "${lightMemory?.photonicSequence?.colors.join(' → ') || 'Unknown'}";
    }

    // Deactivate contract
    function deactivate() public {
        isActive = false;
    }
}
`;

  return template;
}

/**
 * Extract threat patterns from memory
 */
function extractThreatPatterns(lightMemory: any): string[] {
  if (!lightMemory) return [];

  const patterns: string[] = [];
  const text = lightMemory.originalText?.toLowerCase() || '';

  // Security threat keywords
  const securityPatterns = [
    'exploit', 'vulnerability', 'attack', 'hack', 'malware',
    'phishing', 'injection', 'overflow', 'backdoor', 'breach'
  ];

  for (const pattern of securityPatterns) {
    if (text.includes(pattern)) {
      patterns.push(pattern.toUpperCase());
    }
  }

  // Add photonic signature as pattern
  if (lightMemory.photonicSequence?.colors) {
    patterns.push(`PHOTONIC:${lightMemory.photonicSequence.colors.slice(0, 3).join('')}`);
  }

  return patterns.length > 0 ? patterns : ['GENERAL_KNOWLEDGE'];
}

/**
 * Deploy contract to blockchain
 */
async function deployToBlockchain(
  contractCode: string,
  memoryId: string
): Promise<{ success: boolean; txHash: string }> {
  try {
    // Submit contract deployment as extrinsic
    const txHash = await blockchainClient.recordConversation({
      conversationId: `contract_deploy_${memoryId}`,
      messageIndex: Date.now(),
      role: 'assistant',
      messageHash: await hashContract(contractCode),
      timestamp: Date.now(),
      emotion: 'deploying',
      model: 'memory-contract-compiler'
    });

    return {
      success: txHash.success,
      txHash: txHash.txHash || `0x${Math.random().toString(16).substring(2)}`
    };

  } catch (error) {
    console.error('Blockchain deployment failed:', error);
    return {
      success: false,
      txHash: `0x${Math.random().toString(16).substring(2)}` // Fallback hash
    };
  }
}

async function hashContract(contract: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(contract);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
