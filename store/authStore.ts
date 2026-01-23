import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  email: string;
  token: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  walletAddress: string | null;
  agentAddress: string | null;
  agentPrivateKey: string | null; // Note: 加密存储，生产环境必须加密
  signature: string | null;
  token: string | null;
  isTestnet: boolean;
  login: (user: User) => void;
  logout: () => void;
  setWalletAuth: (walletAddress: string, signature: string, token: string) => void;
  setAgentAccount: (agentAddress: string, agentPrivateKey: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      walletAddress: null,
      agentAddress: null,
      agentPrivateKey: null,
      signature: null,
      token: null,
      isTestnet: true,

      login: (user) => set({ user, isAuthenticated: true }),

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
          walletAddress: null,
          agentAddress: null,
          agentPrivateKey: null,
          signature: null,
          token: null,
        }),

      setWalletAuth: (walletAddress, signature, token) =>
        set({
          walletAddress,
          signature,
          token,
          isAuthenticated: true,
        }),

      setAgentAccount: (agentAddress, agentPrivateKey) =>
        set({ agentAddress, agentPrivateKey }),

      clearAuth: () =>
        set({
          user: null,
          isAuthenticated: false,
          walletAddress: null,
          agentAddress: null,
          agentPrivateKey: null,
          signature: null,
          token: null,
        }),
    }),
    {
      name: "auth-storage", // ✅ 本地存储 key
    }
  )
);
