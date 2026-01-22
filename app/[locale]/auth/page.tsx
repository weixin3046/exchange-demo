"use client";

import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { Eye, EyeOff, Lock, Mail, User, Wallet } from "lucide-react";
import { useState } from "react";

export default function AuthModal() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [authMethod, setAuthMethod] = useState<"email" | "wallet">("email");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });

  // Reown AppKit hooks
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (authMethod === "email") {
      if (isLogin) {
        // 模拟登录逻辑
        if (formData.email && formData.password) {
          alert(`Logged in as ${formData.email}`);
          // 这里可以调用实际的认证API
        }
      } else {
        // 模拟注册逻辑
        if (formData.email && formData.password && formData.confirmPassword && formData.username) {
          if (formData.password === formData.confirmPassword) {
            alert(`Account created for ${formData.username}`);
            // 这里可以调用实际的注册API
          } else {
            alert("Passwords don't match");
          }
        }
      }
    } else if (authMethod === "wallet") {
      if (isConnected) {
        alert(`Wallet authenticated: ${address}`);
        // 这里可以调用钱包认证API
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
            <h1 className="mb-2 text-2xl font-bold text-white">{isLogin ? "Welcome Back" : "Create Account"}</h1>
            <p className="text-gray-400">
              {isLogin ? "Sign in to access your trading dashboard" : "Join the future of cryptocurrency trading"}
            </p>
          </div>

          {/* 认证方式选择 */}
          <div className="mb-6 flex gap-2">
            <button
              onClick={() => setAuthMethod("email")}
              className={`flex-1 rounded-lg px-4 py-2 font-medium transition-all ${
                authMethod === "email" ? "bg-based-orange text-white" : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              Email & Password
            </button>
            <button
              onClick={() => setAuthMethod("wallet")}
              className={`flex-1 rounded-lg px-4 py-2 font-medium transition-all ${
                authMethod === "wallet" ? "bg-based-orange text-white" : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              <Wallet className="mr-2 inline h-4 w-4" />
              Wallet
            </button>
          </div>

          {/* 钱包连接状态 */}
          {authMethod === "wallet" && (
            <div className="mb-6">
              {isConnected ? (
                <div className="rounded-lg border border-green-500/20 bg-green-500/10 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
                      <Wallet className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-400">Wallet Connected</p>
                      <p className="text-xs text-gray-400">
                        {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Unknown address"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => handleSubmit(e)}
                    className="mt-4 w-full transform rounded-lg bg-gradient-to-r from-green-500 to-green-600 px-4 py-3 font-medium text-white transition-all duration-200 hover:scale-105 hover:from-green-600 hover:to-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
                  >
                    Continue with Wallet
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => open()}
                  className="w-full transform rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-3 font-medium text-white transition-all duration-200 hover:scale-105 hover:from-purple-600 hover:to-blue-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
                >
                  <Wallet className="mr-2 inline h-5 w-5" />
                  Connect Wallet
                </button>
              )}
            </div>
          )}

          {/* 邮箱密码表单 */}
          {authMethod === "email" && (
            <>
              <form onSubmit={handleSubmit} className="space-y-6">
                {!isLogin && (
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-300">Username</label>
                    <div className="relative">
                      <User className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                      <input
                        type="text"
                        value={formData.username}
                        onChange={(e) => handleInputChange("username", e.target.value)}
                        className="focus:border-based-orange w-full rounded-lg border border-white/20 bg-white/10 py-3 pr-4 pl-10 text-white placeholder-gray-400 transition-all focus:bg-white/15 focus:outline-none"
                        placeholder="Enter your username"
                        required={!isLogin}
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="focus:border-based-orange w-full rounded-lg border border-white/20 bg-white/10 py-3 pr-4 pl-10 text-white placeholder-gray-400 transition-all focus:bg-white/15 focus:outline-none"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className="focus:border-based-orange w-full rounded-lg border border-white/20 bg-white/10 py-3 pr-12 pl-4 text-white placeholder-gray-400 transition-all focus:bg-white/15 focus:outline-none"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400 transition-colors hover:text-white"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {!isLogin && (
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-300">Confirm Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        className="focus:border-based-orange w-full rounded-lg border border-white/20 bg-white/10 py-3 pr-12 pl-4 text-white placeholder-gray-400 transition-all focus:bg-white/15 focus:outline-none"
                        placeholder="Confirm your password"
                        required={!isLogin}
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="bg-based-orange hover:bg-based-orange/90 focus:ring-based-orange w-full transform rounded-lg px-4 py-3 font-medium text-white transition-all duration-200 hover:scale-105 focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
                >
                  {isLogin ? "Sign In" : "Create Account"}
                </button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/20" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-black px-2 text-gray-400">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button className="inline-flex w-full justify-center rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-white transition-all hover:bg-white/10">
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    <span className="ml-2">Google</span>
                  </button>

                  <button className="inline-flex w-full justify-center rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-white transition-all hover:bg-white/10">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                    <span className="ml-2">Twitter</span>
                  </button>
                </div>
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                </button>
              </div>
            </>
          )}

          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              By signing in, you agree to our{" "}
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
