import { http, createConfig } from "wagmi";
import { base, baseSepolia, mainnet } from "wagmi/chains";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";

// Coinbase Developer Platform Paymaster URL (with $1250 credits)
const COINBASE_PAYMASTER_URL = process.env.NEXT_PUBLIC_COINBASE_PAYMASTER_URL ||
  "https://api.developer.coinbase.com/rpc/v1/base/uYtF7xHARvwtLeF4VG08Ozpp6HOqBEHM";

export const config = createConfig({
  chains: [base, baseSepolia, mainnet],
  connectors: [
    coinbaseWallet({
      appName: "LUXBIN",
      preference: "all",
    }),
    injected({ shimDisconnect: true }),
    walletConnect({
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "c5ca7a3d3e1c52b7abfbc0e7c1e8f1d4",
      showQrModal: true,
    }),
  ],
  ssr: true,
  transports: {
    // Use Coinbase Paymaster for Base network (gasless transactions!)
    [base.id]: http(COINBASE_PAYMASTER_URL),
    [baseSepolia.id]: http(),
    [mainnet.id]: http(),
  },
});
