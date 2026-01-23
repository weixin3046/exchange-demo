"use client";

import Navbar from "@/components/Navbar";

export default function PredictPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Predict Trading</h1>
            <p className="text-lg text-gray-400 mb-8">
              Predict market movements and compete with other traders for rewards
            </p>

            <div className="inline-block">
              <div className="rounded-lg bg-gradient-to-r from-based-orange/20 to-orange-600/20 border border-based-orange/50 px-8 py-4">
                <p className="text-gray-300">Coming soon...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
