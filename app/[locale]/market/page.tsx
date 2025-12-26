"use client";
import { useMarketData } from "@/websocket/useMarketData";
import { useState } from "react";

export default function MarketPage() {
  const [selectedSymbol, setSelectedSymbol] = useState("btcusdt");
  //   const { tickerData, tradeData, klineData, loading, isConnected, changeKlineInterval } = useMarketData(selectedSymbol);

  const {
    tickerData,
    tradeData,
    // depthData,
    klineData,
    loading,
    isConnected,
    changeKlineInterval,
  } = useMarketData("btcusdt");

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">加载市场数据中...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">数字货币市场</h1>
        <div className="mt-2 flex items-center space-x-4">
          <div
            className={`rounded-full px-3 py-1 ${isConnected ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
          >
            {isConnected ? "已连接" : "未连接"}
          </div>
          <select
            value={selectedSymbol}
            onChange={(e) => setSelectedSymbol(e.target.value)}
            className="rounded border px-3 py-1"
          >
            <option value="btcusdt">BTC/USDT</option>
            <option value="ethusdt">ETH/USDT</option>
            <option value="bnbusdt">BNB/USDT</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* 行情信息 */}
        <div className="rounded-lg bg-amber-500 p-4 shadow lg:col-span-1">
          <h2 className="mb-4 text-xl font-semibold">行情信息</h2>
          {tickerData && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>最新价:</span>
                <span className="font-bold">${parseFloat(tickerData.close).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>涨跌幅:</span>
                <span className={parseFloat(tickerData.rose) > 0 ? "text-green-600" : "text-red-600"}>
                  {(parseFloat(tickerData.rose) * 100).toFixed(2)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span>24H高:</span>
                <span>${parseFloat(tickerData.high).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>24H低:</span>
                <span>${parseFloat(tickerData.low).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>24H成交量:</span>
                <span>{parseFloat(tickerData.vol).toLocaleString()} BTC</span>
              </div>
            </div>
          )}
        </div>

        {/* 实时成交 */}
        <div className="rounded-lg bg-amber-500 p-4 shadow lg:col-span-2">
          <h2 className="mb-4 text-xl font-semibold">实时成交</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">时间</th>
                  <th className="px-4 py-2 text-left">价格</th>
                  <th className="px-4 py-2 text-left">数量</th>
                  <th className="px-4 py-2 text-left">方向</th>
                </tr>
              </thead>
              <tbody>
                {tradeData.slice(0, 10).map((trade, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{trade.ds.split(" ")[1]}</td>
                    <td className="px-4 py-2">${parseFloat(trade.price).toLocaleString()}</td>
                    <td className="px-4 py-2">{parseFloat(trade.vol).toFixed(4)}</td>
                    <td className="px-4 py-2">
                      <span className={trade.side === "BUY" ? "text-green-600" : "text-red-600"}>
                        {trade.side === "BUY" ? "买入" : "卖出"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* K线周期选择 */}
        <div className="rounded-lg bg-amber-500 p-4 shadow lg:col-span-3">
          <h2 className="mb-4 text-xl font-semibold">K线图</h2>
          <div className="mb-4 flex space-x-2">
            {["1min", "5min", "15min", "1hour", "1day"].map((interval) => (
              <button
                key={interval}
                onClick={() => changeKlineInterval(interval)}
                className="rounded bg-gray-600 px-3 py-1 hover:bg-gray-200"
              >
                {interval}
              </button>
            ))}
          </div>
          {klineData && (
            <div>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="rounded bg-gray-700 p-3">
                  <div className="text-sm text-gray-500">开盘价</div>
                  <div className="font-semibold">${klineData.open.toLocaleString()}</div>
                </div>
                <div className="rounded bg-gray-700 p-3">
                  <div className="text-sm text-gray-500">收盘价</div>
                  <div className="font-semibold">${klineData.close.toLocaleString()}</div>
                </div>
                <div className="rounded bg-gray-700 p-3">
                  <div className="text-sm text-gray-500">最高价</div>
                  <div className="font-semibold">${klineData.high.toLocaleString()}</div>
                </div>
                <div className="rounded bg-gray-700 p-3">
                  <div className="text-sm text-gray-500">最低价</div>
                  <div className="font-semibold">${klineData.low.toLocaleString()}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
