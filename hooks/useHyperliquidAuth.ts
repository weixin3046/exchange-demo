'use client';

import { useState } from 'react';
import { useAccount, useSignMessage } from 'wagmi';
import { useAuthStore } from '@/store/authStore';

export function useHyperliquidAuth() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const authStore = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async () => {
    if (!address) {
      setError('Wallet address not available');
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      // EIP-712 签名消息
      const timestamp = Date.now();
      const message = `Sign this message to authenticate\nTimestamp: ${timestamp}`;

      // 签名
      const signature = await signMessageAsync({ message });

      // 模拟令牌生成（实际上需要后端验证）
      const token = `token_${address}_${timestamp}_${signature.slice(0, 10)}`;

      // 存储到 Zustand
      authStore.setWalletAuth(address, signature, token);

      console.log('[useHyperliquidAuth] Authentication successful:', {
        address,
        signatureLength: signature.length,
      });

      return true;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMsg);
      console.error('[useHyperliquidAuth] Authentication failed:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const initializeAgentAccount = async (agentPrivateKey: string) => {
    if (!address) {
      setError('Wallet address not available');
      return false;
    }

    try {
      // 衍生代理地址（简化示例，实际需要使用 ethers）
      const agentAddress = `0x${Math.random().toString(16).slice(2).padStart(40, '0')}`;

      authStore.setAgentAccount(agentAddress, agentPrivateKey);

      console.log('[useHyperliquidAuth] Agent account initialized:', {
        masterAddress: address,
        agentAddress,
      });

      return true;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMsg);
      console.error('[useHyperliquidAuth] Agent initialization failed:', err);
      return false;
    }
  };

  const logout = () => {
    authStore.clearAuth();
    setError(null);
  };

  return {
    login,
    logout,
    initializeAgentAccount,
    isAuthenticated: authStore.isAuthenticated,
    walletAddress: authStore.walletAddress,
    loading,
    error,
    isTestnet: authStore.isTestnet,
  };
}
