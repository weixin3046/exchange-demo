// hooks/useMarketData.ts
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useWebSocket } from "./useWebSocket";
// import { DepthCalculator } from '@/utils/market/depth-calculator';
import { DepthCalculator } from "./depth-calculator";
import { KlineData, MarketTicker, RawDepthData, TradeData, TradeTickData } from "./types/market";
// import { RawDepthData } from '@/types/market';

// 使用ref存储稳定的回调引用
export function useMarketData(symbol: string = "btcusdt") {
  const [tickerData, setTickerData] = useState<MarketTicker | null>(null);
  const [tradeData, setTradeData] = useState<TradeData[]>([]);
  const [rawDepthData, setRawDepthData] = useState<RawDepthData | null>(null);
  const [klineData, setKlineData] = useState<KlineData | null>(null);
  const [loading, setLoading] = useState(true);

  const { subscribe, unsubscribe, isConnected, switchTimezone } = useWebSocket({
    url: "wss://ws.coobit.cc/kline-api/ws  ",
    autoConnect: true,
  });

  // 使用ref存储回调函数，避免重新创建
  const callbacksRef = useRef({
    onTickerData: (data: any) => {
      setTickerData(data.data);
      setLoading(false);
    },
    onTradeData: (data: any) => {
      const tradeTick = data.data as TradeTickData;
      if (tradeTick?.data && Array.isArray(tradeTick.data)) {
        setTradeData((prev) => {
          const newTrades = [...tradeTick.data];
          return [...newTrades, ...prev].slice(0, 100);
        });
      }
    },
    onDepthData: (data: any) => {
      setRawDepthData(data.data);
    },
    onKlineData: (data: any) => {
      setKlineData(data.data);
    },
  });

  // 计算处理后的深度数据 - 使用useMemo避免每次重新计算
  const depthData = useMemo(() => {
    if (!rawDepthData) return null;
    try {
      return DepthCalculator.calculateDepthData(rawDepthData, 20);
    } catch (error) {
      console.error("Error calculating depth data:", error);
      return null;
    }
  }, [rawDepthData]);

  // 稳定的订阅函数 - 只在symbol变化时重新创建
  const subscribeTicker = useCallback(() => {
    subscribe(`market_${symbol}_ticker`, {}, callbacksRef.current.onTickerData);
  }, [symbol, subscribe]);

  const subscribeTrade = useCallback(() => {
    subscribe(`market_${symbol}_trade_ticker`, { top: 100 }, callbacksRef.current.onTradeData);
  }, [symbol, subscribe]);

  const subscribeDepth = useCallback(() => {
    subscribe(`market_${symbol}_depth_step0`, {}, callbacksRef.current.onDepthData);
  }, [symbol, subscribe]);

  const subscribeKline = useCallback(
    (interval: string = "1min") => {
      subscribe(`market_${symbol}_kline_${interval}`, {}, callbacksRef.current.onKlineData);
    },
    [symbol, subscribe]
  );

  // 取消所有订阅 - 只在symbol变化时重新创建
  const unsubscribeAll = useCallback(() => {
    unsubscribe(`market_${symbol}_ticker`);
    unsubscribe(`market_${symbol}_trade_ticker`);
    unsubscribe(`market_${symbol}_depth_step0`);
    unsubscribe(`market_${symbol}_kline_1min`);
  }, [symbol, unsubscribe]);

  // 切换K线周期
  const changeKlineInterval = useCallback(
    (interval: string) => {
      unsubscribe(`market_${symbol}_kline_1min`);
      subscribe(`market_${symbol}_kline_${interval}`, {}, callbacksRef.current.onKlineData);
    },
    [symbol, subscribe, unsubscribe]
  );

  // 主要的effect - 使用ref来避免依赖循环
  useEffect(() => {
    let mounted = true;

    if (isConnected && mounted) {
      setLoading(true);

      // 订阅所有频道
      subscribeTicker();
      subscribeTrade();
      subscribeDepth();
      // subscribeKline("1min");
      // switchTimezone("UTC+08");
    }

    return () => {
      mounted = false;
      unsubscribeAll();
    };
  }, [isConnected, subscribeTicker, subscribeTrade, subscribeDepth, subscribeKline, switchTimezone, unsubscribeAll]);

  // 价格汇总信息
  const priceSummary = useMemo(() => {
    if (!depthData) return null;
    return DepthCalculator.getPriceSummary(depthData);
  }, [depthData]);

  // 累计深度
  const cumulativeDepth = useMemo(() => {
    if (!depthData) return null;
    return DepthCalculator.getCumulativeDepth(depthData, 50);
  }, [depthData]);

  // 查找特定价格的深度
  const getDepthAtPrice = useCallback(
    (price: number) => {
      if (!depthData) return null;
      return DepthCalculator.findDepthAtPrice(depthData, price);
    },
    [depthData]
  );

  return {
    // 原始数据
    tickerData,
    tradeData,
    rawDepthData,
    depthData,
    klineData,

    // 计算数据
    priceSummary,
    cumulativeDepth,
    getDepthAtPrice,

    // 状态
    loading,
    isConnected,

    // 方法
    changeKlineInterval,
    unsubscribeAll,
  };
}
