"use client";

import { Globe, Lock, Shield, Smartphone, Wallet, Zap } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: Wallet,
      title: "Borderless Spending",
      description:
        "Spend your crypto anywhere in the world with our borderless Visa card. No hidden fees, instant conversion.",
      color: "based-orange",
    },
    {
      icon: Shield,
      title: "Secure by Default",
      description: "Military-grade encryption and multi-signature wallets keep your assets safe at all times.",
      color: "text-green-400",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Execute trades in milliseconds with our high-performance matching engine.",
      color: "text-yellow-400",
    },
    {
      icon: Globe,
      title: "Global Markets",
      description: "Access markets worldwide with instant settlement and competitive rates.",
      color: "text-blue-400",
    },
    {
      icon: Smartphone,
      title: "Mobile First",
      description: "Trade on the go with our native mobile app. Available on iOS and Android.",
      color: "text-purple-400",
    },
    {
      icon: Lock,
      title: "Your Keys, Your Crypto",
      description: "Maintain full control of your assets with non-custodial wallet integration.",
      color: "text-red-400",
    },
  ];

  return (
    <section id="features" className="bg-black px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold text-white sm:text-5xl">Everything you need</h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-400">Powerful features designed for the modern trader</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group transform rounded-2xl border border-white/10 bg-white/5 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-white/20 hover:bg-white/10"
            >
              <div className="mb-6 rounded-xl bg-white/10 p-4 transition-colors duration-300 group-hover:bg-white/15">
                <feature.icon
                  className={`h-8 w-8 ${feature.color === "based-orange" ? "text-based-orange" : feature.color}`}
                />
              </div>

              <h3 className="mb-4 text-xl font-semibold text-white">{feature.title}</h3>

              <p className="leading-relaxed text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
