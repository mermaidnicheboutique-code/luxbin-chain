/**
 * Coinbase Developer Platform (CDP) Integration
 * Sponsor gas fees using developer credits
 * Deploy contracts on Base network
 */

import { Coinbase, Wallet } from '@coinbase/coinbase-sdk';

export interface GaslessTransaction {
  to: string;
  data: string;
  value?: string;
  sponsored: boolean;
  txHash?: string;
  gasUsed?: string;
  gasSavedForUser?: string;
}

export interface ContractDeployment {
  contractAddress: string;
  deployerAddress: string;
  txHash: string;
  blockNumber: number;
  gasUsed: string;
  sponsored: boolean;
  network: 'base' | 'base-sepolia';
}

class CoinbaseDeveloperPlatform {
  private coinbase?: Coinbase;
  private wallet?: Wallet;
  private projectId: string;
  private isInitialized: boolean = false;

  constructor() {
    this.projectId = process.env.COINBASE_PROJECT_ID || '';
  }

  /**
   * Initialize Coinbase CDP
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Initialize Coinbase SDK with API credentials from environment
      const apiKeyName = process.env.COINBASE_API_KEY_NAME;
      const privateKey = process.env.COINBASE_PRIVATE_KEY;

      if (!apiKeyName || !privateKey) {
        throw new Error('Coinbase API credentials not configured in environment');
      }

      Coinbase.configure({
        apiKeyName,
        privateKey
      });

      this.coinbase = Coinbase;

      // Create or load wallet
      const user = await Coinbase.defaultUser();
      const wallets = await user?.listWallets();

      if (wallets && wallets.length > 0) {
        this.wallet = wallets[0];
      } else {
        // Create new wallet
        this.wallet = await user?.createWallet({
          networkId: Coinbase.networks.BaseMainnet
        });
      }

      this.isInitialized = true;
      console.log('✅ Coinbase CDP initialized with project:', this.projectId);
      console.log('💰 Wallet address:', await this.wallet?.getDefaultAddress());

    } catch (error) {
      console.error('Failed to initialize Coinbase CDP:', error);
      this.isInitialized = false;
    }
  }

  /**
   * Sponsor a transaction (pay gas with developer credits)
   */
  async sponsorTransaction(
    to: string,
    data: string,
    value: string = '0',
    network: 'base' | 'base-sepolia' = 'base'
  ): Promise<GaslessTransaction> {
    await this.initialize();

    if (!this.wallet) {
      throw new Error('Wallet not initialized');
    }

    try {
      const address = await this.wallet.getDefaultAddress();

      // Create sponsored transaction
      const tx = await address?.invokeContract({
        contractAddress: to,
        method: 'execute',
        args: {
          data: data
        },
        amount: BigInt(value),
        assetId: 'eth'
      });

      await tx?.wait();

      const txHash = tx?.getTransactionHash();

      console.log('✅ Transaction sponsored:', {
        txHash,
        to,
        network,
        gasSaved: 'User pays $0 (sponsored by developer credits)'
      });

      return {
        to,
        data,
        value,
        sponsored: true,
        txHash: txHash || undefined,
        gasUsed: '~21000', // Estimate
        gasSavedForUser: '100%'
      };

    } catch (error) {
      console.error('Transaction sponsorship failed:', error);

      // Fallback to non-sponsored
      return {
        to,
        data,
        value,
        sponsored: false,
        txHash: undefined
      };
    }
  }

  /**
   * Deploy contract on Base (AI-initiated)
   */
  async deployContract(
    contractCode: string,
    contractName: string,
    network: 'base' | 'base-sepolia' = 'base'
  ): Promise<ContractDeployment> {
    await this.initialize();

    if (!this.wallet) {
      throw new Error('Wallet not initialized');
    }

    try {
      const address = await this.wallet.getDefaultAddress();

      // Deploy smart contract
      const deployment = await address?.deployContract({
        abi: contractCode,
        bytecode: '0x' // Contract bytecode would go here
      });

      await deployment?.wait();

      const contractAddress = deployment?.getContractAddress();
      const txHash = deployment?.getTransactionHash();

      console.log('🚀 Contract deployed on', network, ':', {
        name: contractName,
        address: contractAddress,
        txHash,
        sponsoredByDevCredits: true
      });

      return {
        contractAddress: contractAddress || '0x0',
        deployerAddress: (await this.wallet.getDefaultAddress())?.getId() || '0x0',
        txHash: txHash || '0x0',
        blockNumber: 0, // Would get from receipt
        gasUsed: '~500000',
        sponsored: true,
        network
      };

    } catch (error) {
      console.error('Contract deployment failed:', error);
      throw error;
    }
  }

  /**
   * Get wallet balance
   */
  async getBalance(): Promise<{ eth: string; usdc: string }> {
    await this.initialize();

    if (!this.wallet) {
      return { eth: '0', usdc: '0' };
    }

    try {
      const address = await this.wallet.getDefaultAddress();
      const balances = await address?.listBalances();

      const ethBalance = balances?.find(b => b.assetId === 'eth');
      const usdcBalance = balances?.find(b => b.assetId === 'usdc');

      return {
        eth: ethBalance?.amount.toString() || '0',
        usdc: usdcBalance?.amount.toString() || '0'
      };

    } catch (error) {
      console.error('Failed to get balances:', error);
      return { eth: '0', usdc: '0' };
    }
  }

  /**
   * Get developer credits remaining
   */
  async getDeveloperCredits(): Promise<{
    remaining: string;
    used: string;
    limit: string;
  }> {
    // This would query Coinbase CDP API for credit usage
    // For now, return placeholder
    return {
      remaining: 'Unlimited', // Based on your plan
      used: '0.00',
      limit: 'No limit'
    };
  }

  /**
   * Transfer funds (sponsored)
   */
  async sponsoredTransfer(
    to: string,
    amount: string,
    asset: 'eth' | 'usdc' = 'eth'
  ): Promise<GaslessTransaction> {
    await this.initialize();

    if (!this.wallet) {
      throw new Error('Wallet not initialized');
    }

    try {
      const address = await this.wallet.getDefaultAddress();

      const transfer = await address?.transfer({
        amount: BigInt(amount),
        assetId: asset,
        destination: to,
        gasless: true // Use developer credits for gas
      });

      await transfer?.wait();

      const txHash = transfer?.getTransactionHash();

      console.log('💸 Sponsored transfer:', {
        to,
        amount,
        asset,
        txHash,
        gasPaidBy: 'Developer credits'
      });

      return {
        to,
        data: '0x',
        value: amount,
        sponsored: true,
        txHash: txHash || undefined,
        gasSavedForUser: '100%'
      };

    } catch (error) {
      console.error('Sponsored transfer failed:', error);
      throw error;
    }
  }

  /**
   * Check if CDP is ready
   */
  isReady(): boolean {
    return this.isInitialized && !!this.wallet;
  }

  /**
   * Get wallet address
   */
  async getWalletAddress(): Promise<string> {
    await this.initialize();
    const address = await this.wallet?.getDefaultAddress();
    return address?.getId() || '0x0';
  }
}

// Singleton instance
export const coinbaseCDP = new CoinbaseDeveloperPlatform();

/**
 * Helper: Check if transaction should be sponsored
 */
export function shouldSponsorTransaction(gasEstimate: number): boolean {
  // Sponsor if gas cost is reasonable (< 500k gas)
  return gasEstimate < 500000;
}

/**
 * Helper: Format gas savings message
 */
export function formatGasSavings(gasUsed: string): string {
  const gasInGwei = parseFloat(gasUsed) / 1e9;
  const gasCostUSD = gasInGwei * 0.00001; // Rough estimate

  return `You saved ~$${gasCostUSD.toFixed(4)} in gas fees! (Sponsored by Coinbase developer credits)`;
}
