import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturedEvents from "@/components/FeaturedEvents";
import FeatureSection from "@/components/FeatureSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <FeaturedEvents />
      <FeatureSection />
    </div>
  );
};

export default Index;
