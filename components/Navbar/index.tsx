"use client";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <nav className="fixed top-0 right-0 left-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-white">Based</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 transition-colors duration-200 hover:text-white"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:block">
            <Button
              variant="default"
              className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-all duration-200 hover:bg-gray-100"
            >
              Launch App
            </Button>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-300 hover:text-white focus:ring-2 focus:ring-white focus:outline-none focus:ring-inset"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t border-white/10 bg-black md:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 transition-colors duration-200 hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="border-t border-white/10 pt-4 pb-3">
              <Button
                variant="default"
                className="w-full rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-all duration-200 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Launch App
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
