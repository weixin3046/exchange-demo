"use client";

import Navbar from "@/components/Navbar";
import { useHyperliquidAuth } from "@/hooks/useHyperliquidAuth";
import { useMarketData } from "@/hooks/useMarketData";
import { usePositions } from "@/hooks/usePositions";
import { useAuthStore } from "@/store/authStore";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { useState } from "react";

export default function TradingPage() {
  const { mids, loading: marketLoading, getPrice } = useMarketData();
  const { totalMarginUsed, accountValue, positions } = usePositions();
  const { login, isAuthenticated, walletAddress } = useHyperliquidAuth();
  const { isTestnet } = useAuthStore();
  const [selectedCoin, setSelectedCoin] = useState("BTC");

  const topCoins = Object.keys(mids)
    .slice(0, 10)
    .map((coin) => ({
      coin,
      price: mids[coin],
    }));

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="px-4 pt-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="mb-2 text-4xl font-bold text-white">Trade</h1>
            <p className="text-gray-400">
              Perpetual and Spot Trading on Hyperliquid {isTestnet ? "(Testnet)" : "(Mainnet)"}
            </p>
          </div>

          {!isAuthenticated ? (
            <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
              <h2 className="mb-4 text-2xl font-bold text-white">Connect Your Wallet to Trade</h2>
              <button
                onClick={login}
                className="from-based-orange hover:from-based-orange rounded-lg bg-gradient-to-r to-orange-600 px-8 py-3 font-semibold text-white transition-all duration-200 hover:to-orange-700"
              >
                Sign In
              </button>
            </div>
          ) : (
            <>
              {/* Account Info */}
              <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <p className="mb-2 text-sm text-gray-400">Account Value</p>
                  <p className="text-2xl font-bold text-white">${parseFloat(accountValue).toFixed(2)}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <p className="mb-2 text-sm text-gray-400">Margin Used</p>
                  <p className="text-2xl font-bold text-white">${parseFloat(totalMarginUsed).toFixed(2)}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <p className="mb-2 text-sm text-gray-400">Wallet</p>
                  <p className="font-mono text-sm text-gray-300">{walletAddress?.slice(0, 10)}...</p>
                </div>
              </div>

              {/* Markets */}
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Market List */}
                <div className="lg:col-span-1">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <h3 className="mb-4 text-lg font-semibold text-white">Top Markets</h3>
                    {marketLoading ? (
                      <p className="text-gray-400">Loading...</p>
                    ) : (
                      <div className="space-y-2">
                        {topCoins.map((item) => (
                          <button
                            key={item.coin}
                            onClick={() => setSelectedCoin(item.coin)}
                            className={`w-full rounded-lg px-4 py-2 text-left transition-all duration-200 ${
                              selectedCoin === item.coin
                                ? "bg-based-orange/20 border-based-orange/50 border"
                                : "border border-transparent hover:bg-white/10"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-white">{item.coin}</span>
                              <span className="text-sm text-gray-400">${parseFloat(item.price).toFixed(2)}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Trading Panel */}
                <div className="lg:col-span-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <h3 className="mb-6 text-lg font-semibold text-white">{selectedCoin} Trading</h3>

                    {/* Tabs */}
                    <div className="mb-6 flex gap-4 border-b border-white/10">
                      <button className="border-based-orange border-b-2 px-4 py-2 font-semibold text-white">
                        Limit
                      </button>
                      <button className="px-4 py-2 text-gray-400 transition-colors hover:text-white">Market</button>
                    </div>

                    {/* Buy/Sell Tabs */}
                    <div className="mb-6 grid grid-cols-2 gap-4">
                      <div className="cursor-pointer rounded-lg border border-green-500/30 bg-green-500/10 p-4 transition-all duration-200 hover:bg-green-500/20">
                        <div className="mb-3 flex items-center gap-2">
                          <ArrowUpRight className="h-5 w-5 text-green-400" />
                          <span className="font-semibold text-white">Buy</span>
                        </div>
                        <p className="text-sm text-gray-400">Market price: ${getPrice(selectedCoin)}</p>
                      </div>
                      <div className="cursor-pointer rounded-lg border border-red-500/30 bg-red-500/10 p-4 transition-all duration-200 hover:bg-red-500/20">
                        <div className="mb-3 flex items-center gap-2">
                          <ArrowDownLeft className="h-5 w-5 text-red-400" />
                          <span className="font-semibold text-white">Sell</span>
                        </div>
                        <p className="text-sm text-gray-400">Market price: ${getPrice(selectedCoin)}</p>
                      </div>
                    </div>

                    {/* Order Form */}
                    <div className="space-y-4">
                      <div>
                        <label className="mb-2 block text-sm text-gray-400">Size</label>
                        <input
                          type="number"
                          placeholder="0.00"
                          className="focus:border-based-orange w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-gray-500 transition-colors focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm text-gray-400">Price</label>
                        <input
                          type="number"
                          placeholder={getPrice(selectedCoin) || "0"}
                          className="focus:border-based-orange w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-gray-500 transition-colors focus:outline-none"
                        />
                      </div>
                      <button className="from-based-orange hover:from-based-orange mt-6 w-full rounded-lg bg-gradient-to-r to-orange-600 px-6 py-3 font-semibold text-white transition-all duration-200 hover:to-orange-700">
                        Place Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Open Positions */}
              {positions.length > 0 && (
                <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="mb-4 text-lg font-semibold text-white">Open Positions ({positions.length})</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="border-b border-white/10">
                        <tr>
                          <th className="px-4 py-3 text-left font-semibold text-gray-400">Asset</th>
                          <th className="px-4 py-3 text-right font-semibold text-gray-400">Size</th>
                          <th className="px-4 py-3 text-right font-semibold text-gray-400">Entry Price</th>
                          <th className="px-4 py-3 text-right font-semibold text-gray-400">PnL</th>
                          <th className="px-4 py-3 text-right font-semibold text-gray-400">ROE</th>
                        </tr>
                      </thead>
                      <tbody>
                        {positions.map((pos) => (
                          <tr key={pos.coin} className="border-b border-white/5 transition-colors hover:bg-white/5">
                            <td className="px-4 py-4 font-semibold text-white">{pos.coin}</td>
                            <td className="px-4 py-4 text-right text-gray-300">{parseFloat(pos.szi).toFixed(4)}</td>
                            <td className="px-4 py-4 text-right text-gray-300">
                              ${pos.entryPrice ? parseFloat(pos.entryPrice).toFixed(2) : "-"}
                            </td>
                            <td
                              className={`px-4 py-4 text-right font-semibold ${
                                parseFloat(pos.unrealizedPnl) >= 0 ? "text-green-400" : "text-red-400"
                              }`}
                            >
                              ${parseFloat(pos.unrealizedPnl).toFixed(2)}
                            </td>
                            <td
                              className={`px-4 py-4 text-right font-semibold ${
                                parseFloat(pos.returnOnEquity) >= 0 ? "text-green-400" : "text-red-400"
                              }`}
                            >
                              {(parseFloat(pos.returnOnEquity) * 100).toFixed(2)}%
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
