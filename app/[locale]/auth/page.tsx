"use client";

import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { Lock, Wallet } from "lucide-react";

export default function AuthModal() {
  // Reown AppKit hooks
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();

  const handleWalletAuth = () => {
    if (isConnected) {
      // 用户已连接钱包，直接认证
      alert(`Wallet authenticated: ${address}`);
      // 这里可以调用钱包认证API
      // 例如：redirect to dashboard or set auth state
    } else {
      // 打开钱包连接模态框
      open();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4">
      <div className="w-full max-w-md">
        {/* 认证卡片 */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-md">
          {/* 标题 */}
          <div className="mb-8 text-center">
            <div className="bg-based-orange/20 mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full">
              <Lock className="text-based-orange h-8 w-8" />
            </div>
            <h1 className="mb-2 text-2xl font-bold text-white">Connect Your Wallet</h1>
            <p className="text-gray-400">Connect your Web3 wallet to access the trading platform</p>
          </div>

          {/* 钱包连接状态 */}
          <div className="mb-6">
            {isConnected ? (
              <div className="rounded-lg border border-green-500/20 bg-green-500/10 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500">
                    <Wallet className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-400">Wallet Connected</p>
                    <p className="text-xs text-gray-400">
                      {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Unknown address"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleWalletAuth}
                  className="w-full transform rounded-lg bg-gradient-to-r from-green-500 to-green-600 px-4 py-3 font-medium text-white transition-all duration-200 hover:scale-105 hover:from-green-600 hover:to-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
                >
                  Continue to Trading
                </button>
              </div>
            ) : (
              <button
                onClick={handleWalletAuth}
                className="w-full transform rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-3 font-medium text-white transition-all duration-200 hover:scale-105 hover:from-purple-600 hover:to-blue-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
              >
                <Wallet className="mr-2 inline h-5 w-5" />
                Connect Wallet
              </button>
            )}
          </div>

          {/* 支持的钱包列表 */}
          {!isConnected && (
            <div className="mb-6">
              <p className="mb-4 text-center text-sm text-gray-400">Supported Wallets</p>
              <div className="grid grid-cols-2 gap-3 text-xs text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500">
                    <span className="text-xs text-white">M</span>
                  </div>
                  MetaMask
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500">
                    <span className="text-xs text-white">W</span>
                  </div>
                  WalletConnect
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600">
                    <span className="text-xs text-white">C</span>
                  </div>
                  Coinbase
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-500">
                    <span className="text-xs text-white">R</span>
                  </div>
                  Rainbow
                </div>
              </div>
            </div>
          )}

          {/* 页脚 */}
          <div className="text-center">
            <p className="text-xs text-gray-500">
              By connecting your wallet, you agree to our{" "}
              <a href="#" className="text-based-orange hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-based-orange hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
