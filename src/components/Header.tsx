import { Button } from "@/components/ui/button";
import { MapPin, Search, User } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <MapPin className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Sypot
          </span>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-foreground hover:text-primary transition-colors">
            Discover
          </a>
          <a href="#" className="text-foreground hover:text-primary transition-colors">
            Events
          </a>
          <a href="#" className="text-foreground hover:text-primary transition-colors">
            Places
          </a>
          <a href="#" className="text-foreground hover:text-primary transition-colors">
            Create
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="outline">
            <User className="h-4 w-4 mr-2" />
            Sign In
          </Button>
          <Button variant="vibrant">Get Started</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;