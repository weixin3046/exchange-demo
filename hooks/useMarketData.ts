'use client';

import { useCallback, useEffect, useState } from 'react';
import { useHyperliquid } from '@/components/HyperliquidProvider';

interface MarketData {
  [coin: string]: string;
}

export function useMarketData() {
  const { subscribe, unsubscribe, isConnected } = useHyperliquid();
  const [mids, setMids] = useState<MarketData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isConnected) {
      setLoading(true);
      return;
    }

    const handleMarketData = (data: Record<string, unknown>) => {
      setMids(data as MarketData);
      setLoading(false);
    };

    try {
      subscribe('allMids', undefined, handleMarketData);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to subscribe to market data';
      setError(errorMsg);
      console.error('[useMarketData] Subscription error:', err);
    }

    return () => {
      unsubscribe('allMids');
    };
  }, [isConnected, subscribe, unsubscribe]);

  const getPrice = useCallback(
    (coin: string): string | null => {
      return mids[coin] || null;
    },
    [mids]
  );

  return {
    mids,
    getPrice,
    loading,
    error,
    isConnected,
  };
}
