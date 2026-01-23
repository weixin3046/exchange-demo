'use client';

import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import hlWsPool, { HLSubscriptionType } from '@/lib/hyperliquidWsPool';
import hlClient from '@/lib/hyperliquidClient';

interface HyperliquidContextType {
  isConnected: boolean;
  subscribe: (type: string, coin?: string, callback?: (data: Record<string, unknown>) => void) => void;
  unsubscribe: (type: string, coin?: string) => void;
  client: typeof hlClient;
  isTestnet: boolean;
}

const HyperliquidContext = createContext<HyperliquidContextType | undefined>(undefined);

export function HyperliquidProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const initializeWebSocket = async () => {
      try {
        await hlWsPool.connect();
        setIsConnected(true);
      } catch (error) {
        console.error('[HyperliquidProvider] Failed to connect WebSocket:', error);
        setIsConnected(false);
      }
    };

    initializeWebSocket();

    hlWsPool.on('connected', () => setIsConnected(true));
    hlWsPool.on('error', () => setIsConnected(false));

    return () => {
      hlWsPool.disconnect();
    };
  }, []);

  const value: HyperliquidContextType = {
    isConnected,
    subscribe: (type, coin, callback) => hlWsPool.subscribe(type as HLSubscriptionType, coin, callback),
    unsubscribe: (type, coin) => hlWsPool.unsubscribe(type as HLSubscriptionType, coin),
    client: hlClient,
    isTestnet: hlClient.getIsTestnet(),
  };

  return (
    <HyperliquidContext.Provider value={value}>
      {children}
    </HyperliquidContext.Provider>
  );
}

export function useHyperliquid(): HyperliquidContextType {
  const context = useContext(HyperliquidContext);
  if (!context) {
    throw new Error('useHyperliquid must be used within HyperliquidProvider');
  }
  return context;
}
