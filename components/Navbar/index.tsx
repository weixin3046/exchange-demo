"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Trade", href: "/#trade" },
    { name: "Predict", href: "/#predict" },
    { name: "Cards", href: "/#cards" },
    { name: "Affiliate", href: "/#affiliate" },
    { name: "Resources", href: "/#resources" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-black/90 shadow-lg backdrop-blur-md"
          : "border-b border-transparent bg-black/0 backdrop-blur-none"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <Link href="/" className="group flex items-center transition-transform duration-300 hover:scale-105">
              <span className="group-hover:text-based-orange text-2xl font-bold text-white transition-all duration-300">
                Based
              </span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
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
            </div>
          </div>

          <div className="hidden md:block">
            <Button
              variant="default"
              className="group relative overflow-hidden rounded-full bg-white px-6 py-2 text-sm font-medium text-black shadow-md transition-all duration-300 hover:scale-105 hover:bg-gray-100 hover:shadow-lg"
            >
              <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5">
                Launch App
              </span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full"></div>
            </Button>
          </div>

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
          {navigation.map((item, index) => (
            <Link
              key={item.name}
              href={item.href}
              className="hover:text-based-orange block rounded-md px-3 py-2 text-base font-medium text-gray-300 transition-all duration-300 hover:translate-x-1 hover:bg-white/5 hover:text-white"
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
    </nav>
  );
}
