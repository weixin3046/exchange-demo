"use client";

import { Button } from "@/components/ui/button";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HeroSection() {
  const { ref: badgeRef, isIntersecting: badgeVisible } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.3,
    triggerOnce: true,
  });

  const { ref: titleRef, isIntersecting: titleVisible } = useIntersectionObserver<HTMLHeadingElement>({
    threshold: 0.3,
    triggerOnce: true,
  });

  const { ref: descriptionRef, isIntersecting: descriptionVisible } = useIntersectionObserver<HTMLParagraphElement>({
    threshold: 0.3,
    triggerOnce: true,
  });

  const { ref: buttonsRef, isIntersecting: buttonsVisible } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />

        <div className="bg-based-orange/10 absolute top-1/4 left-1/4 h-96 w-96 animate-pulse rounded-full blur-3xl" />
        <div className="bg-based-orange/5 absolute top-3/4 right-1/4 h-96 w-96 animate-pulse rounded-full blur-3xl delay-1000" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <div
          ref={badgeRef}
          className={`bg-based-orange/10 border-based-orange/20 mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-2 transition-all duration-1000 ease-out ${
            badgeVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <Sparkles className="text-based-orange h-4 w-4" />
          <span className="text-based-orange text-sm font-medium tracking-wide">THE FUTURE IS</span>
        </div>

        <h1
          ref={titleRef}
          className={`mb-6 text-5xl leading-tight font-bold tracking-tight text-white transition-all duration-1000 ease-out sm:text-6xl lg:text-7xl xl:text-8xl ${
            titleVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <span className="block">Trade everything</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-based-orange to-orange-400">
            spend everywhere
          </span>
        </h1>

        <p
          ref={descriptionRef}
          className={`mx-auto mb-12 max-w-3xl text-lg leading-relaxed text-gray-400 transition-all delay-300 duration-1000 ease-out ${
            descriptionVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          Your everyday advantage in every market. The future is Based.
        </p>

        <div
          ref={buttonsRef}
          className={`flex flex-col items-center justify-center gap-4 transition-all delay-500 duration-1000 ease-out sm:flex-row ${
            buttonsVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
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
