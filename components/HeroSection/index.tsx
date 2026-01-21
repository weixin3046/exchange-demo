"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />

        <div className="bg-based-orange/10 absolute top-1/4 left-1/4 h-96 w-96 animate-pulse rounded-full blur-3xl" />
        <div className="bg-based-orange/5 absolute top-3/4 right-1/4 h-96 w-96 animate-pulse rounded-full blur-3xl delay-1000" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <div className="bg-based-orange/10 border-based-orange/20 mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-2">
          <Sparkles className="text-based-orange h-4 w-4" />
          <span className="text-based-orange text-sm font-medium tracking-wide">THE FUTURE IS</span>
        </div>

        <h1 className="mb-6 text-5xl leading-tight font-bold tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl">
          <span className="block">Based</span>
        </h1>

        <p className="mx-auto mb-12 max-w-2xl text-xl leading-relaxed text-gray-300 sm:text-2xl lg:text-3xl">
          Trade everything, spend everywhere
        </p>

        <p className="mx-auto mb-12 max-w-3xl text-lg leading-relaxed text-gray-400">
          Your everyday advantage in every market. The future is Based.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            variant="default"
            size="lg"
            className="transform rounded-full bg-white px-8 py-4 text-lg font-medium text-black shadow-lg transition-all duration-200 hover:scale-105 hover:bg-gray-100 hover:shadow-xl"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="rounded-full border-white/20 px-8 py-4 text-lg font-medium text-white transition-all duration-200 hover:border-white/40 hover:bg-white/10"
          >
            Learn More
          </Button>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform animate-bounce text-white/50">
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm">Scroll down</span>
            <div className="flex h-10 w-6 justify-center rounded-full border-2 border-white/30">
              <div className="animate-scroll mt-2 h-3 w-1 rounded-full bg-white/50" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-based-orange absolute top-20 left-10 h-2 w-2 animate-ping rounded-full" />
      <div className="bg-based-orange absolute right-10 bottom-20 h-1 w-1 animate-ping rounded-full delay-1000" />
      <div className="absolute top-1/2 right-20 h-1.5 w-1.5 animate-pulse rounded-full bg-white/30" />
    </section>
  );
}
