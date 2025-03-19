import { CandlestickData, CandlestickSeries, createChart, IChartApi, ISeriesApi } from "lightweight-charts";
import { useEffect, useRef } from "react";

interface TradingViewChartProps {
  symbol: string;
  wsUrl: string;
}

export default function CandlestickChart({ symbol, wsUrl }: TradingViewChartProps) {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;
    // 创建 TradingView 图表
    chartRef.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 400,
      layout: { background: { color: "#222" }, textColor: "#DDD" },
      grid: { vertLines: { color: "#333" }, horzLines: { color: "#333" } },
      timeScale: { timeVisible: true, borderColor: "#555" },
    });
    // 创建蜡烛图数据
    candleSeriesRef.current = chartRef.current.addSeries(CandlestickSeries, {
      upColor: "#0f0",
      downColor: "#f00",
      borderUpColor: "#0f0",
      borderDownColor: "#f00",
      wickUpColor: "#0f0",
      wickDownColor: "#f00",
    });
    return () => {
      chartRef.current?.remove();
      wsRef.current?.close();
    };
  }, []);

  useEffect(() => {
    if (!wsUrl) return;
    wsRef.current = new WebSocket(wsUrl);
    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.symbol === symbol) {
        const candle: CandlestickData = {
          time: data.time,
          open: data.open,
          high: data.high,
          low: data.low,
          close: data.close,
        };
        candleSeriesRef.current?.update(candle);
      }
    };
    return () => {
      wsRef.current?.close();
    };
  }, [wsUrl, symbol]);

  return <div ref={chartContainerRef} className="h-96 w-full" />;
}
