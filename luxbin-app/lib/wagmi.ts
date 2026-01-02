import { http, createConfig } from "wagmi";
import { base, baseSepolia, mainnet } from "wagmi/chains";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";

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
    [base.id]: http(),
    [baseSepolia.id]: http(),
    [mainnet.id]: http(),
  },
});
