"use client";

import { CardPlaceholder, SVGPlaceholder } from "@/components/Icons";
import { useEffect, useState } from "react";

export default function RealWorldExamples() {
  const [isLoading, setIsLoading] = useState(true);

  // 模拟数据加载
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-4xl font-bold text-white">Real World Usage Examples</h1>

        {/* Example 1: User Profile Card */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-white">User Profile Loading</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {isLoading ? (
              <CardPlaceholder variant="profile" />
            ) : (
              <div className="flex items-center space-x-4 rounded-lg border border-white/10 bg-white/5 p-4">
                <div className="from-based-orange h-16 w-16 rounded-full bg-gradient-to-r to-blue-500" />
                <div>
                  <h3 className="text-lg font-semibold text-white">John Doe</h3>
                  <p className="text-gray-400">Crypto Trader</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Example 2: Product Grid */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-white">Product Grid Loading</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item}>
                {isLoading ? (
                  <CardPlaceholder variant="product" />
                ) : (
                  <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                    <div className="from-based-orange mb-4 h-32 rounded-lg bg-gradient-to-r to-purple-500" />
                    <h3 className="mb-2 text-lg font-semibold text-white">Product {item}</h3>
                    <p className="text-gray-400">$99.99</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Example 3: News Feed */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-white">News Feed Loading</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((post) => (
              <div key={post}>
                {isLoading ? (
                  <CardPlaceholder variant="post" />
                ) : (
                  <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                    <h3 className="mb-2 text-lg font-semibold text-white">News Article {post}</h3>
                    <p className="text-gray-400">Lorem ipsum dolor sit amet consectetur...</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Example 4: Stats Dashboard */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-white">Stats Dashboard</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {[1, 2, 3, 4].map((stat) => (
              <div key={stat}>
                {isLoading ? (
                  <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                    <div className="bg-based-orange/20 mb-2 h-8 w-8 rounded" />
                    <div className="mb-1 h-6 w-20 rounded bg-white/20" />
                    <div className="h-4 w-32 rounded bg-white/10" />
                  </div>
                ) : (
                  <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                    <div className="bg-based-orange mb-2 h-8 w-8 rounded" />
                    <div className="mb-1 text-2xl font-bold text-white">$1.2M</div>
                    <div className="text-sm text-gray-400">Total Volume</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Example 5: Icon Placeholders */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-white">Icon Placeholders</h2>
          <div className="flex space-x-4">
            <SVGPlaceholder variant="circle" size="lg" color="primary" />
            <SVGPlaceholder variant="square" size="lg" color="secondary" />
            <SVGPlaceholder variant="avatar" size="lg" color="muted" />
            <SVGPlaceholder variant="logo" size="lg" color="accent" />
          </div>
        </section>

        <div className="mt-8">
          <button
            onClick={() => setIsLoading(!isLoading)}
            className="bg-based-orange hover:bg-based-orange/80 rounded-lg px-6 py-3 text-white transition-colors"
          >
            {isLoading ? "Stop Loading" : "Start Loading"}
          </button>
        </div>
      </div>
    </div>
  );
}
