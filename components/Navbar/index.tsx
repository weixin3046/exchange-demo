"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      setScrolled(scrollTop > 10);

      // 检测是否滚动到底部（距离底部100px内）
      const isNearBottom = scrollTop + windowHeight >= docHeight - 100;
      setIsAtBottom(isNearBottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Trade", href: "/trade" },
    { name: "Predict", href: "/predict" },
    { name: "Cards", href: "/cards" },
    { name: "Affiliate", href: "/affiliate" },
    { name: "Resources", href: "/resources" },
  ];

  const hiringLink = { name: "We're Hiring!", href: "/careers" };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          isAtBottom
            ? "border-based-orange/50 border-b-2 bg-black/95 shadow-2xl backdrop-blur-lg"
            : scrolled
              ? "border-b border-white/10 bg-black/90 shadow-lg backdrop-blur-md"
              : "border-b border-transparent bg-black/0 backdrop-blur-none"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative h-16">
            <div className="absolute top-1/2 left-0 flex-shrink-0 -translate-y-1/2">
              <Link href="/" className="group flex items-center transition-transform duration-300 hover:scale-105">
                <span
                  className={`text-2xl font-bold text-white transition-all duration-500 ${
                    isAtBottom ? "text-based-orange scale-110 drop-shadow-lg" : "group-hover:text-based-orange"
                  }`}
                >
                  Based
                </span>
                {isAtBottom && (
                  <div className="bg-based-orange/20 absolute -inset-2 animate-pulse rounded-lg blur-lg" />
                )}
              </Link>
            </div>

            <div className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center md:flex">
              <div className="flex items-baseline space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="hover:text-based-orange group relative px-3 py-2 text-sm font-medium text-gray-300 transition-all duration-300 hover:text-white"
                  >
                    {item.name}
                    <span className="bg-based-orange absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                ))}
                <Link
                  href={hiringLink.href}
                  className="hover:text-based-orange group relative px-3 py-2 text-sm font-medium text-orange-400 transition-all duration-300 hover:text-orange-300"
                >
                  {hiringLink.name}
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-orange-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </div>
            </div>

            <div
              className={`absolute top-1/2 right-0 flex -translate-y-1/2 items-center gap-4 transition-all duration-300 ${
                scrolled ? "" : "opacity-80"
              }`}
            >
              <div
                className={`hidden items-center gap-3 transition-all duration-300 md:flex ${
                  scrolled ? "-translate-x-20 opacity-0" : "translate-x-0 opacity-100"
                }`}
              >
                <a
                  href="https://x.com/BasedOneX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full p-2 text-gray-400 transition-all duration-300 hover:bg-white/10 hover:text-white"
                  aria-label="Follow us on X (Twitter)"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://discord.gg/basedapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full p-2 text-gray-400 transition-all duration-300 hover:bg-white/10 hover:text-white"
                  aria-label="Join our Discord"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0189 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                  </svg>
                </a>
                <a
                  href="https://t.me/BasedOneX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full p-2 text-gray-400 transition-all duration-300 hover:bg-white/10 hover:text-white"
                  aria-label="Follow us on Telegram"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                </a>
              </div>

              <Button
                className={`group relative overflow-hidden rounded-full px-6 py-2 text-sm font-medium shadow-md transition-all duration-300 hover:scale-105 ${
                  isAtBottom
                    ? "from-based-orange animate-pulse bg-gradient-to-r to-orange-500 text-white shadow-orange-500/25 hover:shadow-orange-500/40"
                    : "bg-white text-black hover:bg-gray-100 hover:shadow-lg"
                }`}
              >
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5">
                  Launch App
                </span>
                <div
                  className={`absolute inset-0 transition-transform duration-500 ${
                    isAtBottom
                      ? "animate-pulse bg-gradient-to-r from-transparent via-orange-200/30 to-transparent"
                      : "-translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full"
                  }`}
                ></div>
              </Button>

              <div className="md:hidden">
                <button
                  onClick={toggleMenu}
                  className={`relative rounded-md p-2 transition-all duration-300 ${
                    scrolled
                      ? "text-gray-300 hover:bg-white/10 hover:text-white"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <div className={`transition-all duration-300 ${isMenuOpen ? "scale-90 rotate-90" : ""}`}>
                    <Menu className="h-6 w-6" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          isMenuOpen ? "max-h-96 border-b border-white/10 bg-black/95 backdrop-blur-md" : "max-h-0"
        }`}
      >
        <div
          className={`transform transition-all duration-300 ${
            isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          } space-y-1 px-2 pt-2 pb-3 sm:px-3`}
        >
          {[...navigation, hiringLink].map((item, index) => (
            <Link
              key={item.name}
              href={item.href}
              className={`block rounded-md px-3 py-2 text-base font-medium transition-all duration-300 hover:translate-x-1 hover:bg-white/5 hover:text-white ${
                item.name === hiringLink.name
                  ? "text-orange-400 hover:text-orange-300"
                  : "hover:text-based-orange text-gray-300"
              }`}
              style={{
                animationDelay: isMenuOpen ? `${index * 50}ms` : "0ms",
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="inline-block transition-transform duration-300">{item.name}</span>
            </Link>
          ))}
          <div className="border-t border-white/10 pt-4 pb-3">
            <Button
              variant="default"
              className="w-full rounded-full bg-white px-4 py-2 text-sm font-medium text-black shadow-md transition-all duration-300 hover:scale-105 hover:bg-gray-100 hover:shadow-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Launch App
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
