import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import StatsSection from "@/components/StatsSection";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-black">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
}
