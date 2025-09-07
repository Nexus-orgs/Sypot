import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Users, Calendar, Ticket } from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "Discover Local",
    description: "Find hidden gems and popular spots in your neighborhood",
    color: "text-vibrant-orange"
  },
  {
    icon: Calendar,
    title: "Easy Planning",
    description: "Create and manage events with our intuitive tools",
    color: "text-vibrant-purple"
  },
  {
    icon: Users,
    title: "Connect People",
    description: "Meet like-minded people and build lasting connections",
    color: "text-vibrant-yellow"
  },
  {
    icon: Ticket,
    title: "Simple Booking",
    description: "Secure ticketing and seamless check-in experience",
    color: "text-vibrant-orange"
  }
];

const FeatureSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-secondary to-accent/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            Why Choose Local Vibe?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to discover, create, and connect with your local community
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-soft transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-6">
                <div className="mb-4">
                  <feature.icon className={`h-12 w-12 mx-auto ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-card-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="bg-gradient-hero rounded-3xl p-8 md:p-12 text-center text-white">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Join the Community?
          </h3>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Start discovering amazing events and connect with people who share your interests
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="bg-white text-foreground hover:bg-white/90">
              Sign Up Free
            </Button>
            <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/20">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;