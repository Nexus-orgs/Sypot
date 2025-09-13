import { Button } from "@/components/ui/button";
import { Search, MapPin, Calendar } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Local events and venues" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Discover Your
          <span className="block bg-gradient-hero bg-clip-text text-transparent">
            Sypot
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
          Find amazing events, connect with your community, and experience the best your city has to offer
        </p>
        
        {/* Search Bar */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 bg-white/20 rounded-lg px-4 py-3">
              <Search className="h-5 w-5 text-white/70" />
              <input 
                type="text" 
                placeholder="What are you looking for?"
                className="bg-transparent text-white placeholder-white/70 flex-1 outline-none"
              />
            </div>
            
            <div className="flex items-center space-x-3 bg-white/20 rounded-lg px-4 py-3">
              <MapPin className="h-5 w-5 text-white/70" />
              <input 
                type="text" 
                placeholder="Where?"
                className="bg-transparent text-white placeholder-white/70 flex-1 outline-none"
              />
            </div>
            
            <div className="flex items-center space-x-3 bg-white/20 rounded-lg px-4 py-3">
              <Calendar className="h-5 w-5 text-white/70" />
              <input 
                type="text" 
                placeholder="When?"
                className="bg-transparent text-white placeholder-white/70 flex-1 outline-none"
              />
            </div>
          </div>
          
          <Button variant="hero" size="hero" className="w-full mt-4">
            Explore Events
          </Button>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="hero" size="lg">
            Start Exploring
          </Button>
          <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/20">
            Create Event
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
