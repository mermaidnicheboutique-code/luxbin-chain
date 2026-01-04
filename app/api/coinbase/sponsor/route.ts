import { NextRequest, NextResponse } from 'next/server';
import { coinbaseCDP, shouldSponsorTransaction, formatGasSavings } from '@/lib/coinbaseCDP';

/**
 * Coinbase CDP Sponsored Transactions API
 * Use developer credits to pay gas fees for users
 */

export async function POST(request: NextRequest) {
  try {
    const { action, ...params } = await request.json();

    // Initialize CDP
    if (!coinbaseCDP.isReady()) {
      await coinbaseCDP.initialize();
    }

    switch (action) {
      case 'sponsor_transaction':
        const { to, data, value, network } = params;

        if (!to || !data) {
          return NextResponse.json(
            { error: 'Missing required fields: to, data' },
            { status: 400 }
          );
        }

        const tx = await coinbaseCDP.sponsorTransaction(
          to,
          data,
          value || '0',
          network || 'base'
        );

        return NextResponse.json({
          success: true,
          transaction: tx,
          message: tx.sponsored
            ? `✅ Gas fees sponsored! User pays $0`
            : '⚠️ Transaction not sponsored (fallback to regular tx)',
          savings: tx.sponsored ? formatGasSavings(tx.gasUsed || '21000') : null
        });

      case 'deploy_contract':
        const { contractCode, contractName, deployNetwork } = params;

        if (!contractCode || !contractName) {
          return NextResponse.json(
            { error: 'Missing required fields: contractCode, contractName' },
            { status: 400 }
          );
        }

        const deployment = await coinbaseCDP.deployContract(
          contractCode,
          contractName,
          deployNetwork || 'base'
        );

        return NextResponse.json({
          success: true,
          deployment,
          message: `🚀 Contract "${contractName}" deployed on ${deployment.network}!`,
          explorer: `https://${deployment.network === 'base-sepolia' ? 'sepolia.' : ''}basescan.org/address/${deployment.contractAddress}`,
          sponsoredByDevCredits: true
        });

      case 'transfer':
        const { recipient, amount, asset } = params;

        if (!recipient || !amount) {
          return NextResponse.json(
            { error: 'Missing required fields: recipient, amount' },
            { status: 400 }
          );
        }

        const transfer = await coinbaseCDP.sponsoredTransfer(
          recipient,
          amount,
          asset || 'eth'
        );

        return NextResponse.json({
          success: true,
          transfer,
          message: `💸 Sent ${amount} ${asset || 'ETH'} to ${recipient} (gas sponsored)`,
          savings: formatGasSavings(transfer.gasUsed || '21000')
        });

      case 'get_balance':
        const balance = await coinbaseCDP.getBalance();
        const walletAddress = await coinbaseCDP.getWalletAddress();

        return NextResponse.json({
          walletAddress,
          balance,
          network: 'base'
        });

      case 'get_credits':
        const credits = await coinbaseCDP.getDeveloperCredits();

        return NextResponse.json({
          developerCredits: credits,
          sponsorshipEnabled: true,
          message: 'All transactions are gasless for users! Powered by your Coinbase developer credits.'
        });

      default:
        return NextResponse.json(
          { error: 'Invalid action. Use: sponsor_transaction, deploy_contract, transfer, get_balance, get_credits' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('Coinbase CDP error:', error);
    return NextResponse.json(
      {
        error: 'Sponsorship failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        fallback: 'User will need to pay gas directly'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (!coinbaseCDP.isReady()) {
      await coinbaseCDP.initialize();
    }

    if (action === 'status') {
      const balance = await coinbaseCDP.getBalance();
      const credits = await coinbaseCDP.getDeveloperCredits();
      const walletAddress = await coinbaseCDP.getWalletAddress();

      return NextResponse.json({
        status: 'active',
        sponsorshipEnabled: true,
        walletAddress,
        balance,
        developerCredits: credits,
        network: 'base',
        projectId: process.env.COINBASE_PROJECT_ID ? 'configured' : 'not configured'
      });
    }

    if (action === 'wallet') {
      const walletAddress = await coinbaseCDP.getWalletAddress();
      const balance = await coinbaseCDP.getBalance();

      return NextResponse.json({
        address: walletAddress,
        balance,
        network: 'base'
      });
    }

    // Default: Return sponsorship info
    return NextResponse.json({
      message: 'Coinbase CDP Sponsorship Active',
      features: [
        'Gasless transactions for users',
        'AI can deploy contracts on Base',
        'Transfers sponsored by developer credits',
        'Zero gas fees for all users'
      ],
      usage: {
        endpoint: '/api/coinbase/sponsor',
        methods: ['POST', 'GET'],
        actions: {
          sponsor_transaction: 'Sponsor a transaction',
          deploy_contract: 'Deploy contract on Base',
          transfer: 'Send sponsored transfer',
          get_balance: 'Check wallet balance',
          get_credits: 'Check developer credits'
        }
      }
    });

  } catch (error) {
    console.error('CDP status error:', error);
    return NextResponse.json(
      { error: 'Failed to get status' },
      { status: 500 }
    );
  }
}
