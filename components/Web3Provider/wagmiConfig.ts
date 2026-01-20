import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { AppKitNetwork, arbitrum, mainnet } from "@reown/appkit/networks";
import { QueryClient } from "@tanstack/react-query";
import { cookieStorage, createStorage } from "@wagmi/core";

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) {
  throw new Error("Project ID is not defined");
}

export const networks = [mainnet, arbitrum] as [AppKitNetwork, ...AppKitNetwork[]];

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  projectId,
  networks,
  ssr: true,
});

export const queryClient = new QueryClient();
