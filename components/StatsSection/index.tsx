"use client";

import { DollarSign, TrendingUp, Users, Zap } from "lucide-react";

export default function StatsSection() {
  const stats = [
    {
      icon: TrendingUp,
      value: "$2.8B+",
      label: "Volume Traded",
      description: "Across all markets",
      color: "text-green-400",
    },
    {
      icon: Users,
      value: "50K+",
      label: "Active Users",
      description: "Trading daily",
      color: "text-blue-400",
    },
    {
      icon: DollarSign,
      value: "$150M+",
      label: "Total Volume",
      description: "All time volume",
      color: "text-purple-400",
    },
    {
      icon: Zap,
      value: "0.01%",
      label: "Fees",
      description: "Trading fees",
      color: "text-based-orange",
    },
  ];

  return (
    <section className="bg-black px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-8 text-center transition-all duration-300 hover:border-white/20"
            >
              <div
                className={`mb-4 rounded-full bg-white/10 p-3 transition-colors duration-300 group-hover:bg-white/15`}
              >
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>

              <div className="mb-2 text-3xl font-bold text-white sm:text-4xl">{stat.value}</div>

              <h3 className="mb-1 text-lg font-semibold text-white">{stat.label}</h3>

              <p className="text-sm text-gray-400">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
