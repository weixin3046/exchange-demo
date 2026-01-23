"use client";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Globe, Lock, Shield, Smartphone, Wallet, Zap } from "lucide-react";

export default function FeaturesSection() {
  const { ref: headerRef, isIntersecting: headerVisible } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.3,
    triggerOnce: true,
  });

  const { ref: gridRef, isIntersecting: gridVisible } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true,
  });

  const features = [
    {
      icon: Wallet,
      title: "Self-Custodial Wallet",
      description:
        "Your Keys, Your Crypto, Your Freedom. Your wallet is yours alone. We don't hold your keys.",
      color: "based-orange",
      delay: 0,
    },
    {
      icon: Shield,
      title: "Security First",
      description: "Military-grade encryption and EIP-712 signing keep your assets safe at all times.",
      color: "text-green-400",
      delay: 100,
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Execute trades in milliseconds on Hyperliquid's high-performance blockchain.",
      color: "text-yellow-400",
      delay: 200,
    },
    {
      icon: Globe,
      title: "Borderless Access",
      description: "Trade and spend anywhere in the world without banking constraints.",
      color: "text-blue-400",
      delay: 300,
    },
    {
      icon: Smartphone,
      title: "Multi-Channel",
      description: "Access Based across web, desktop app and mobile. Stay connected anywhere.",
      color: "text-purple-400",
      delay: 400,
    },
    {
      icon: Lock,
      title: "Email/Social Login",
      description: "Seamless authentication via Privy. Email, Google, and Web3 wallet support.",
      color: "text-red-400",
      delay: 500,
    },
  ];

  return (
    <section id="features" className="bg-black px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div
          ref={headerRef}
          className={`mb-16 text-center transition-all duration-1000 ease-out ${
            headerVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <h2 className="mb-6 text-4xl font-bold text-white transition-all delay-200 duration-700 sm:text-5xl">
            Everything you need
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-400 transition-all delay-300 duration-700">
            Powerful features designed for the modern trader
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`group transform rounded-2xl border border-white/10 bg-white/5 p-8 transition-all duration-700 ease-out hover:-translate-y-2 hover:border-white/20 hover:bg-white/10 ${
                gridVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{
                transitionDelay: gridVisible ? `${feature.delay}ms` : "0ms",
              }}
            >
              <div className="mb-6 rounded-xl bg-white/10 p-4 transition-all duration-500 group-hover:scale-105 group-hover:bg-white/15">
                <feature.icon
                  className={`h-8 w-8 transition-transform duration-300 group-hover:scale-110 ${
                    feature.color === "based-orange" ? "text-based-orange" : feature.color
                  }`}
                />
              </div>

              <h3 className="mb-4 text-xl font-semibold text-white transition-colors duration-300 group-hover:text-gray-100">
                {feature.title}
              </h3>

              <p className="leading-relaxed text-gray-400 transition-colors duration-300 group-hover:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
