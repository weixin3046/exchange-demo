'use client';

import { useCallback, useEffect, useState } from 'react';
import { useHyperliquid } from '@/components/HyperliquidProvider';
import { useAuthStore } from '@/store/authStore';

interface Position {
  coin: string;
  szi: string;
  entryPrice: string | null;
  positionValue: string;
  unrealizedPnl: string;
  returnOnEquity: string;
  leverage: { cross: number; isolated: number | null };
}

interface PositionsData {
  totalMarginUsed: string;
  accountValue: string;
  totalNtlPos: string;
  positions: Position[];
}

export function usePositions() {
  const { client, isConnected } = useHyperliquid();
  const { walletAddress } = useAuthStore();
  const [positions, setPositions] = useState<PositionsData>({
    totalMarginUsed: '0',
    accountValue: '0',
    totalNtlPos: '0',
    positions: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPositions = useCallback(async () => {
    if (!walletAddress || !isConnected) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const state = await client.getUserState(walletAddress);

      const formattedPositions: Position[] = state.assetPositions
        .filter((p: Record<string, unknown>) => parseFloat((p.szi as string) || '0') !== 0)
        .map((p: Record<string, unknown>) => ({
          coin: p.coin as string,
          szi: p.szi as string,
          entryPrice: p.entryPrice as string | null,
          positionValue: p.positionValue as string,
          unrealizedPnl: p.unrealizedPnl as string,
          returnOnEquity: p.returnOnEquity as string,
          leverage: p.leverage as { cross: number; isolated: number | null },
        }));

      setPositions({
        totalMarginUsed: state.marginSummary.totalMarginUsed,
        accountValue: state.marginSummary.accountValue,
        totalNtlPos: state.marginSummary.totalNtlPos,
        positions: formattedPositions,
      });
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to fetch positions';
      setError(errorMsg);
      console.error('[usePositions] Fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [walletAddress, isConnected, client]);

  useEffect(() => {
    if (walletAddress && isConnected) {
      fetchPositions();
      const interval = setInterval(fetchPositions, 5000); // Poll every 5 seconds
      return () => clearInterval(interval);
    }
  }, [walletAddress, isConnected, fetchPositions]);

  return {
    ...positions,
    loading,
    error,
    refetch: fetchPositions,
  };
}
