"use client";

import dynamic from "next/dynamic";

// 动态导入大型组件
export const DynamicHeroSection = dynamic(() => import("@/components/HeroSection"), {
  loading: () => <div className="min-h-screen animate-pulse bg-black" />,
  ssr: true,
});

export const DynamicStatsSection = dynamic(() => import("@/components/StatsSection"), {
  loading: () => <div className="h-96 animate-pulse bg-black" />,
  ssr: true,
});

export const DynamicFeaturesSection = dynamic(() => import("@/components/FeaturesSection"), {
  loading: () => <div className="h-96 animate-pulse bg-black" />,
  ssr: true,
});

export const DynamicFooter = dynamic(() => import("@/components/Footer"), {
  loading: () => <div className="h-48 animate-pulse bg-black" />,
  ssr: true,
});

// 动态导入演示页面
export const DynamicPlaceholderDemo = dynamic(() => import("@/app/[locale]/placeholder-demo/page"), {
  loading: () => (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">Loading demo...</div>
  ),
});

export const DynamicRealWorldExamples = dynamic(() => import("@/app/[locale]/real-world-examples/page"), {
  loading: () => (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">Loading examples...</div>
  ),
});
