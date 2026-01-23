"use client";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { MessageCircle, Twitter, Send, Briefcase } from "lucide-react";

export default function CommunitySection() {
  const { ref: sectionRef, isIntersecting: sectionVisible } = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true,
  });

  const communities = [
    {
      icon: MessageCircle,
      title: "Discord",
      description: "6.35k+ members",
      url: "https://discord.gg/basedapp",
    },
    {
      icon: Twitter,
      title: "X / Twitter",
      description: "31.6k followers",
      url: "https://x.com/BasedOneX",
    },
    {
      icon: Send,
      title: "Telegram",
      description: "Community updates",
      url: "https://t.me/BasedOneX",
    },
    {
      icon: Briefcase,
      title: "Careers",
      description: "We're hiring",
      url: "https://based.one/careers",
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
            Stay in the loop
          </h2>
          <p className="text-lg text-gray-400">
            Join the community and learn how other people get the most out of Based.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {communities.map((community, idx) => (
            <a
              key={idx}
              href={community.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-6 text-center transition-all duration-700 ease-out hover:border-based-orange/50 hover:bg-based-orange/5 ${
                sectionVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{
                transitionDelay: sectionVisible ? `${idx * 100}ms` : "0ms",
              }}
            >
              <div className="mb-3 rounded-lg bg-based-orange/10 p-3 group-hover:scale-110 transition-transform duration-300">
                <community.icon className="h-6 w-6 text-based-orange" />
              </div>
              <h3 className="mb-1 text-lg font-semibold text-white">{community.title}</h3>
              <p className="text-sm text-gray-400">{community.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
