// 添加性能监控到主页面
import {
  DynamicFeaturesSection,
  DynamicFooter,
  DynamicHeroSection,
  DynamicStatsSection,
} from "@/components/DynamicImports";
import Navbar from "@/components/Navbar";
import { DevPerformanceWrapper } from "@/components/PerformanceDashboard";
import ScrollToTop from "@/components/ScrollToTop";
import TradingSection from "@/components/TradingSection";
import SpendingCardSection from "@/components/SpendingCardSection";
import MultiChannelSection from "@/components/MultiChannelSection";
import CommunitySection from "@/components/CommunitySection";

export default function Home() {
  return (
    <DevPerformanceWrapper componentName="HomePage">
      <div className="flex min-h-screen flex-col bg-black">
        <Navbar />
        <DynamicHeroSection />
        <DynamicStatsSection />
        <TradingSection />
        <SpendingCardSection />
        <MultiChannelSection />
        <DynamicFeaturesSection />
        <CommunitySection />
        <DynamicFooter />
        <ScrollToTop />
      </div>
    </DevPerformanceWrapper>
  );
}
