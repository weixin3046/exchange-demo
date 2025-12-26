import { useCallback, useEffect, useMemo, useState } from "react";
import { DepthCalculator } from "./depth-calculator";
import { DepthData, RawDepthData } from "./types/market";
import { useWebSocket } from "./useWebSocket";

interface MarketTicker {
  vol: string;
  rose: string;
  open: string;
  low: string;
  high: string;
  close: string;
  amount: string;
  bidPrice: string;
  bidVolume: string;
  askPrice: string;
  askVolume: string;
}

interface TradeData {
  amount: string;
  ds: string;
  price: string;
  side: string;
  ts: number;
  vol: string;
}

interface TradeTickData {
  data: TradeData[];
}

interface KlineData {
  amount: number;
  close: number;
  ds: string;
  high: number;
  low: number;
  open: number;
  vol: number;
  id: number;
}

export function useMarketData(symbol: string = "btcusdt") {
  const [tickerData, setTickerData] = useState<MarketTicker | null>(null);
  const [tradeData, setTradeData] = useState<TradeData[]>([]);
  //   const [depthData, setDepthData] = useState<DepthData | null>(null);
  const [klineData, setKlineData] = useState<KlineData | null>(null);
  const [loading, setLoading] = useState(true);
  const [rawDepthData, setRawDepthData] = useState<RawDepthData | null>(null);

  const { subscribe, unsubscribe, isConnected, switchTimezone } = useWebSocket({
    url: "wss://ws.coobit.cc/kline-api/ws",
    autoConnect: true,
  });

  // 订阅涨跌幅
  const subscribeTicker = useCallback(() => {
    subscribe(`market_${symbol}_ticker`, {}, (data) => {
      setTickerData(data.data);
      setLoading(false);
    });
  }, [symbol, subscribe]);

  // 订阅实时成交
  const subscribeTrade = useCallback(() => {
    subscribe(`market_${symbol}_trade_ticker`, { top: 100 }, (data) => {
      const tradeTick = data.data as TradeTickData;
      if (tradeTick?.data && Array.isArray(tradeTick.data)) {
        setTradeData((prev) => {
          const newTrades = [...tradeTick.data];
          // 只保留最新的100条交易记录
          return [...newTrades, ...prev].slice(0, 5);
        });
      }
    });
  }, [symbol, subscribe]);

  // 计算处理后的深度数据
  const depthData: DepthData | null = useMemo(() => {
    if (!rawDepthData) return null;

    try {
      return DepthCalculator.calculateDepthData(rawDepthData, 20);
    } catch (error) {
      console.error("Error calculating depth data:", error);
      return null;
    }
  }, [rawDepthData]);

  // 订阅盘口
  const subscribeDepth = useCallback(() => {
    subscribe(`market_${symbol}_depth_step0`, {}, (data) => {
      //   setDepthData(data.data);
      setRawDepthData(data.data);
    });
  }, [symbol, subscribe]);

  // 获取价格汇总信息
  const priceSummary = useMemo(() => {
    if (!depthData) return null;
    return DepthCalculator.getPriceSummary(depthData);
  }, [depthData]);

  // 获取累计深度（用于图表）
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

  // 订阅K线
  const subscribeKline = useCallback(
    (interval: string = "1min") => {
      subscribe(`market_${symbol}_kline_${interval}`, {}, (data) => {
        setKlineData(data.data);
      });
    },
    [symbol, subscribe]
  );

  // 取消所有订阅
  const unsubscribeAll = useCallback(() => {
    unsubscribe(`market_${symbol}_ticker`);
    unsubscribe(`market_${symbol}_trade_ticker`);
    unsubscribe(`market_${symbol}_depth_step0`);
    unsubscribe(`market_${symbol}_kline_1min`);
  }, [symbol, unsubscribe]);

  // 初始化订阅
  useEffect(() => {
    if (isConnected) {
      setLoading(true);
      subscribeTicker();
      subscribeTrade();
      subscribeDepth();
      subscribeKline("1min");
      switchTimezone("UTC+08");
    }

    return () => {
      unsubscribeAll();
    };
  }, [isConnected, subscribeTicker, subscribeTrade, subscribeDepth, subscribeKline, switchTimezone, unsubscribeAll]);

  // 切换K线周期
  const changeKlineInterval = useCallback(
    (interval: string) => {
      // 先取消当前的K线订阅
      unsubscribe(`market_${symbol}_kline_1min`);
      // 订阅新的K线周期
      subscribeKline(interval);
    },
    [symbol, subscribeKline, unsubscribe]
  );

  return {
    // 原始数据
    tickerData,
    tradeData,
    depthData, // 计算后的深度数据
    rawDepthData,
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
