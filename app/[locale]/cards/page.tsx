"use client";

import Navbar from "@/components/Navbar";

export default function CardsPage() {
  const features = [
    {
      title: "Load Crypto",
      description: "Load any crypto to your Based Card instantly",
      icon: "💳",
    },
    {
      title: "Tap Visa",
      description: "Spend at 90M+ merchants worldwide",
      icon: "🌍",
    },
    {
      title: "Borderless",
      description: "Break free from traditional payment boundaries",
      icon: "🚀",
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Based Card</h1>
            <p className="text-lg text-gray-400">
              Load crypto. Tap Visa. 90M+ merchants.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center hover:border-based-orange/50 hover:bg-based-orange/5 transition-all duration-300"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Based Card Coming Soon</h2>
            <p className="text-gray-400 mb-8">
              Join our community to be first notified when Based Card launches
            </p>
            <div className="inline-block">
              <button className="bg-gradient-to-r from-based-orange to-orange-600 hover:from-based-orange hover:to-orange-700 px-8 py-3 rounded-lg text-white font-semibold transition-all duration-200">
                Notify Me
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
