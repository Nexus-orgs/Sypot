import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger, DrawerClose } from "@/components/ui/drawer";
import { MapPin, Search, User, Menu } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to="/" className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center" aria-label="Sypot home">
            <MapPin className="h-5 w-5 text-white" />
          </Link>
          <Link to="/" className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Sypot
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/explore" className="text-foreground hover:text-primary transition-colors">
            Discover
          </Link>
          <Link to="/events" className="text-foreground hover:text-primary transition-colors">
            Events
          </Link>
          <Link to="/map" className="text-foreground hover:text-primary transition-colors">
            Places
          </Link>
          <Link to="/create-event" className="text-foreground hover:text-primary transition-colors">
            Create
          </Link>
        </nav>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search className="h-5 w-5" />
          </Button>

          <div className="hidden md:flex items-center space-x-2">
            <Button variant="outline" asChild>
              <Link to="/auth">
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Link>
            </Button>
            <Button variant="vibrant" asChild>
              <Link to="/auth">Get Started</Link>
            </Button>
          </div>

          <div className="md:hidden">
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <nav className="px-4 py-6 space-y-4">
                  <Link to="/explore" className="block text-foreground hover:text-primary transition-colors">
                    Discover
                  </Link>
                  <Link to="/events" className="block text-foreground hover:text-primary transition-colors">
                    Events
                  </Link>
                  <Link to="/map" className="block text-foreground hover:text-primary transition-colors">
                    Places
                  </Link>
                  <Link to="/create-event" className="block text-foreground hover:text-primary transition-colors">
                    Create
                  </Link>
                  <div className="pt-4 border-t border-border">
                    <Button variant="outline" className="w-full mb-2" asChild>
                      <Link to="/auth">
                        <User className="h-4 w-4 mr-2" />
                        Sign In
                      </Link>
                    </Button>
                    <Button variant="vibrant" className="w-full" asChild>
                      <Link to="/auth">Get Started</Link>
                    </Button>
                  </div>
                  <DrawerClose asChild>
                    <Button variant="ghost" className="w-full">Close</Button>
                  </DrawerClose>
                </nav>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
