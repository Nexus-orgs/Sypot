import { Layout } from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import FeaturedEvents from "@/components/FeaturedEvents";
import FeatureSection from "@/components/FeatureSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturedEvents />
      <FeatureSection />
    </Layout>
  );
};

export default Index;
