import { create } from "zustand";

interface GlobalState {
  tokenList: string[];
  setTokenList: (tokens: string[]) => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
  tokenList: [],
  setTokenList: (tokens) => set({ tokenList: tokens }),
}));
