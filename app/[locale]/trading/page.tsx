"use client";

import { BarChart3, TrendingDown, TrendingUp } from "lucide-react";
import { useState } from "react";

interface TradeData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
}

export default function TradingInterface() {
  const [selectedPair, setSelectedPair] = useState("BTC/USDT");
  const [orderType, setOrderType] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState("");

  // 模拟交易数据
  const tradeData: TradeData[] = [
    { symbol: "BTC/USDT", price: 43250.75, change: 1250.3, changePercent: 2.98, volume: "2.8B" },
    { symbol: "ETH/USDT", price: 2650.45, change: -85.2, changePercent: -3.11, volume: "1.2B" },
    { symbol: "BNB/USDT", price: 315.8, change: 12.45, changePercent: 4.1, volume: "450M" },
    { symbol: "ADA/USDT", price: 0.485, change: -0.015, changePercent: -3.0, volume: "180M" },
  ];

  const currentPair = tradeData.find((pair) => pair.symbol === selectedPair) || tradeData[0];

  const handleTrade = () => {
    if (!amount) return;

    // 模拟交易逻辑
    alert(`${orderType.toUpperCase()} ${amount} ${selectedPair.split("/")[0]} at $${currentPair.price}`);
    setAmount("");
  };

  return (
    <div className="min-h-screen bg-black p-6 text-white">
      <div className="mx-auto max-w-7xl">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">Trading Dashboard</h1>
          <p className="text-gray-400">Real-time trading interface with live market data</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* 左侧 - 市场概览 */}
          <div className="space-y-6 lg:col-span-2">
            {/* 交易对选择器 */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                <BarChart3 className="text-based-orange h-5 w-5" />
                Market Overview
              </h2>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {tradeData.map((pair) => (
                  <button
                    key={pair.symbol}
                    onClick={() => setSelectedPair(pair.symbol)}
                    className={`rounded-lg border p-4 transition-all ${
                      selectedPair === pair.symbol
                        ? "border-based-orange bg-based-orange/10"
                        : "border-white/10 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <div className="text-sm font-medium">{pair.symbol}</div>
                    <div className="text-lg font-bold">${pair.price.toLocaleString()}</div>
                    <div
                      className={`flex items-center gap-1 text-sm ${
                        pair.change >= 0 ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {pair.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {pair.change >= 0 ? "+" : ""}
                      {pair.changePercent.toFixed(2)}%
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 价格图表占位符 */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h2 className="mb-4 text-xl font-semibold">{selectedPair} Price Chart</h2>
              <div className="from-based-orange/20 flex h-64 items-center justify-center rounded-lg bg-gradient-to-r to-blue-500/20">
                <div className="text-center">
                  <BarChart3 className="mx-auto mb-2 h-12 w-12 text-gray-400" />
                  <p className="text-gray-400">Chart visualization would go here</p>
                  <p className="mt-1 text-sm text-gray-500">Integration with trading chart library needed</p>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧 - 交易面板 */}
          <div className="space-y-6">
            {/* 当前价格卡片 */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h2 className="mb-4 text-xl font-semibold">Current Price</h2>
              <div className="text-center">
                <div className="text-based-orange mb-2 text-3xl font-bold">${currentPair.price.toLocaleString()}</div>
                <div
                  className={`flex items-center justify-center gap-2 text-lg ${
                    currentPair.change >= 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {currentPair.change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  {currentPair.change >= 0 ? "+" : ""}${Math.abs(currentPair.change).toFixed(2)}(
                  {currentPair.changePercent >= 0 ? "+" : ""}
                  {currentPair.changePercent.toFixed(2)}%)
                </div>
                <div className="mt-2 text-sm text-gray-400">24h Volume: {currentPair.volume}</div>
              </div>
            </div>

            {/* 交易表单 */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h2 className="mb-4 text-xl font-semibold">Place Order</h2>

              {/* 订单类型选择 */}
              <div className="mb-4 flex gap-2">
                <button
                  onClick={() => setOrderType("buy")}
                  className={`flex-1 rounded-lg px-4 py-2 font-medium transition-all ${
                    orderType === "buy" ? "bg-green-500 text-white" : "bg-white/10 text-gray-300 hover:bg-white/20"
                  }`}
                >
                  Buy
                </button>
                <button
                  onClick={() => setOrderType("sell")}
                  className={`flex-1 rounded-lg px-4 py-2 font-medium transition-all ${
                    orderType === "sell" ? "bg-red-500 text-white" : "bg-white/10 text-gray-300 hover:bg-white/20"
                  }`}
                >
                  Sell
                </button>
              </div>

              {/* 交易对显示 */}
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-gray-300">Trading Pair</label>
                <div className="rounded-lg bg-white/10 px-3 py-2 font-medium text-white">{selectedPair}</div>
              </div>

              {/* 数量输入 */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-300">Amount</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="focus:border-based-orange w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-white placeholder-gray-400 focus:outline-none"
                />
                <div className="mt-1 text-xs text-gray-400">
                  ≈ ${(parseFloat(amount) * currentPair.price || 0).toLocaleString()}
                </div>
              </div>

              {/* 交易按钮 */}
              <button
                onClick={handleTrade}
                disabled={!amount}
                className={`w-full rounded-lg px-4 py-3 font-medium transition-all ${
                  orderType === "buy"
                    ? "bg-green-500 hover:bg-green-600 disabled:bg-gray-600"
                    : "bg-red-500 hover:bg-red-600 disabled:bg-gray-600"
                } disabled:cursor-not-allowed`}
              >
                {orderType === "buy" ? "Buy" : "Sell"} {selectedPair.split("/")[0]}
              </button>
            </div>

            {/* 账户余额（模拟） */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h2 className="mb-4 text-xl font-semibold">Account Balance</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">USDT</span>
                  <span className="font-medium">10,000.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">BTC</span>
                  <span className="font-medium">0.250000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">ETH</span>
                  <span className="font-medium">2.500000</span>
                </div>
                <div className="mt-3 border-t border-white/10 pt-3">
                  <div className="flex justify-between font-semibold">
                    <span>Total Value</span>
                    <span className="text-based-orange">$25,625.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
