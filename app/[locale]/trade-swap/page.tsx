"use client";
import { TVChartContainer } from "@/components/TVChartContainer";
// import { useWebSocketContext } from "@/components/WebSocketProvider";
import { SUPPORTED_RESOLUTIONS } from "@/constants";
import { wsService } from "@/lib/socket";
import { ChartingLibraryWidgetOptions, ResolutionString } from "@/public/charting_library/charting_library";
import { useEffect, useState } from "react";

export default function SwapPage() {
  // const { connectionState, sendMessage, subscribe, unsubscribe } = useWebSocketContext();
  const [selectedSymbol, setSelectedSymbol] = useState("btcusdt");
  const [widgetProps, setWidgetProps] = useState<Partial<ChartingLibraryWidgetOptions>>({});
  const [interval, setInterval] = useState(SUPPORTED_RESOLUTIONS[0].value);

  useEffect(() => {
    wsService.onopen = function () {
      // TODO: 这里要改为动态
      wsService.send(`{"event":"req","params":{"channel":"market_btcusdt_kline_1min","cb_id":"btcusdt"}}`);
    };
  }, []);

  useEffect(() => {
    if (selectedSymbol) {
      setWidgetProps({
        symbol: selectedSymbol,
        interval: interval as ResolutionString,
      });
    }
  }, [interval, selectedSymbol]);

  return (
    <div>
      {/* <div>{connectionState ? "已连接" : "未连接"}</div> */}
      <select
        value={selectedSymbol}
        onChange={(e) => setSelectedSymbol(e.target.value)}
        className="rounded border px-3 py-1"
      >
        <option value="btcusdt">BTC/USDT</option>
        <option value="ethusdt">ETH/USDT</option>
        <option value="bnbusdt">BNB/USDT</option>
      </select>
      <select value={interval} onChange={(e) => setInterval(e.target.value)} className="rounded border px-3 py-1">
        {SUPPORTED_RESOLUTIONS.map((interval) => (
          <option value="btcusdt" key={interval.value}>
            {interval.label}
          </option>
        ))}
      </select>
      <div className="h-[500px]">
        <TVChartContainer {...widgetProps} />
      </div>
    </div>
  );
}
