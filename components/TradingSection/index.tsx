"use client";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { TrendingUp, Zap, BarChart3 } from "lucide-react";

export default function TradingSection() {
  const { ref: sectionRef, isIntersecting: sectionVisible } = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true,
  });

  const features = [
    {
      icon: TrendingUp,
      title: "Perpetual Trading",
      description: "24/7 unlimited leverage trading with real-time execution",
    },
    {
      icon: BarChart3,
      title: "Spot Trading",
      description: "Trade spot assets with low fees and high liquidity",
    },
    {
      icon: Zap,
      title: "Advanced Orders",
      description: "Scale, scalp, TWAP orders with trailing stop loss",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-black px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-based-orange/5 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
            Trade Crypto 24/7
          </h2>
          <p className="text-lg text-gray-400">
            Clarity in the Chaos. Perpetual and Spot Trading at your Fingertips.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`group rounded-2xl border border-white/10 bg-white/5 p-8 transition-all duration-700 ease-out hover:border-based-orange/50 hover:bg-based-orange/5 ${
                sectionVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{
                transitionDelay: sectionVisible ? `${idx * 100}ms` : "0ms",
              }}
            >
              <div className="mb-4 rounded-lg bg-based-orange/10 p-3 w-fit group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="h-6 w-6 text-based-orange" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
