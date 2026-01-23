"use client";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { CreditCard, Globe, Zap } from "lucide-react";

export default function SpendingCardSection() {
  const { ref: sectionRef, isIntersecting: sectionVisible } = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true,
  });

  const benefits = [
    {
      icon: CreditCard,
      title: "Load Crypto",
      description: "Load any crypto to your Based Card instantly",
    },
    {
      icon: Globe,
      title: "Tap Visa",
      description: "Spend at 90M+ merchants worldwide",
    },
    {
      icon: Zap,
      title: "Borderless",
      description: "Break free from traditional payment boundaries",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-transparent via-based-orange/5 to-transparent px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
            Borderless Spending
          </h2>
          <p className="text-lg text-gray-400">
            Load crypto. Tap Visa. 90M+ merchants.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className={`group flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-8 text-center transition-all duration-700 ease-out hover:border-based-orange/50 hover:bg-based-orange/5 ${
                sectionVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{
                transitionDelay: sectionVisible ? `${idx * 100}ms` : "0ms",
              }}
            >
              <div className="mb-4 rounded-lg bg-based-orange/10 p-3 group-hover:scale-110 transition-transform duration-300">
                <benefit.icon className="h-6 w-6 text-based-orange" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">{benefit.title}</h3>
              <p className="text-gray-400">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
