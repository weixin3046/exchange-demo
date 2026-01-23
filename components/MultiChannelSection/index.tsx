"use client";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Globe, Monitor, Smartphone } from "lucide-react";

export default function MultiChannelSection() {
  const { ref: sectionRef, isIntersecting: sectionVisible } = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true,
  });

  const channels = [
    {
      icon: Globe,
      title: "Web",
      description: "Access Based anywhere with your browser",
    },
    {
      icon: Monitor,
      title: "Desktop",
      description: "Dedicated app for professional traders",
    },
    {
      icon: Smartphone,
      title: "Mobile",
      description: "Trade on the go with full features",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-black px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-based-orange/5 to-black" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
            Stay Based. Wherever You Need It.
          </h2>
          <p className="text-lg text-gray-400">
            Access Based across web, desktop app and mobile
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {channels.map((channel, idx) => (
            <div
              key={idx}
              className={`group flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-8 text-center transition-all duration-700 ease-out hover:border-based-orange/50 hover:bg-based-orange/5 hover:scale-105 ${
                sectionVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{
                transitionDelay: sectionVisible ? `${idx * 100}ms` : "0ms",
              }}
            >
              <div className="mb-4 rounded-lg bg-based-orange/10 p-3 group-hover:scale-110 transition-transform duration-300">
                <channel.icon className="h-6 w-6 text-based-orange" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">{channel.title}</h3>
              <p className="text-gray-400">{channel.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
