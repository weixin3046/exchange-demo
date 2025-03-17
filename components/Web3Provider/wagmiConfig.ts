import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  coinbaseWallet,
  injectedWallet,
  metaMaskWallet,
  safeWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { QueryClient } from "@tanstack/react-query";
import { createConfig, http } from "wagmi";
import { mainnet, polygon, sepolia } from "wagmi/chains";

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [injectedWallet, metaMaskWallet, walletConnectWallet, safeWallet, coinbaseWallet],
    },
  ],
  { appName: "My RainbowKit App", projectId: "YOUR_PROJECT_ID" }
);

export const wagmiConfig = createConfig({
  chains: [mainnet, polygon, ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [sepolia] : [])],
  connectors,
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [sepolia.id]: http(),
  },
  ssr: true,
  //   client({ chain }) {
  //     return createClient({
  //       chain,
  //       batch: { multicall: true },
  //       pollingInterval: 12_000,
  //       transport: fallback(
  //         orderedTransportUrls(chain).map((url) =>
  //           http(url, {
  //             onFetchResponse: (response) =>
  //               onFetchResponse(response, chain, url),
  //           })
  //         )
  //       ),
  //     });
  //   },
});

export const queryClient = new QueryClient();
