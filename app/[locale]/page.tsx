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

export default function Home() {
  return (
    <DevPerformanceWrapper componentName="HomePage">
      <div className="flex min-h-screen flex-col bg-black">
        <Navbar />
        <DynamicHeroSection />
        <DynamicStatsSection />
        <DynamicFeaturesSection />
        <DynamicFooter />
        <ScrollToTop />
      </div>
    </DevPerformanceWrapper>
  );
}
