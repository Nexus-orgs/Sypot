import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Target, Heart, Globe, Award, TrendingUp, Sparkles, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  const stats = [
    { label: "Active Users", value: "500K+", growth: "+45%" },
    { label: "Events Hosted", value: "10K+", growth: "+120%" },
    { label: "Cities Covered", value: "25", growth: "+8" },
    { label: "Happy Attendees", value: "2M+", growth: "+200%" }
  ];

  const values = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Community First",
      description: "We believe in bringing people together through shared experiences and memorable events."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Trust & Safety",
      description: "Your security is our priority. We ensure all events and transactions are safe and verified."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Local Impact",
      description: "Supporting local businesses and communities by connecting them with event-goers."
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Innovation",
      description: "Using cutting-edge technology to make event discovery and attendance seamless."
    }
  ];

  const team = [
    {
      name: "Sarah Kamau",
      role: "CEO & Founder",
      image: "https://api.dicebear.com/v2/avataaars/sarah.svg",
      bio: "Passionate about creating connections"
    },
    {
      name: "James Ochieng",
      role: "CTO",
      image: "https://api.dicebear.com/v2/avataaars/james.svg",
      bio: "Tech enthusiast and problem solver"
    },
    {
      name: "Grace Wanjiru",
      role: "Head of Community",
      image: "https://api.dicebear.com/v2/avataaars/grace.svg",
      bio: "Building vibrant communities"
    },
    {
      name: "David Njoroge",
      role: "Head of Growth",
      image: "https://api.dicebear.com/v2/avataaars/david.svg",
      bio: "Scaling experiences that matter"
    }
  ];

  return (
    <Layout>
      <SEO 
        title="About Us | Sypot" 
        description="Learn about Sypot's mission to connect people through amazing events and experiences."
        canonical="/about"
      />
      
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                Est. 2024
              </Badge>
              <h1 className="text-5xl font-bold mb-6">About Sypot</h1>
              <p className="text-xl opacity-90 leading-relaxed">
                We're on a mission to make event discovery and attendance simple, fun, and memorable. 
                Sypot connects people with experiences that matter, from intimate gatherings to massive festivals.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="container mx-auto px-4 -mt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <Card key={stat.label} className="text-center">
                <CardContent className="pt-6">
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="text-muted-foreground">{stat.label}</p>
                  <Badge variant="secondary" className="mt-2">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {stat.growth}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Mission Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                To democratize event discovery and make every experience accessible to everyone. 
                We believe that life's best moments happen when people come together.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Connect Communities</h3>
                    <p className="text-sm text-muted-foreground">
                      Bringing people together through shared interests and experiences
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Empower Organizers</h3>
                    <p className="text-sm text-muted-foreground">
                      Providing tools and insights to create successful events
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Celebrate Local Culture</h3>
                    <p className="text-sm text-muted-foreground">
                      Showcasing the best of what each city has to offer
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800" 
                alt="Team collaboration"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-primary text-white p-4 rounded-lg">
                <p className="text-2xl font-bold">5+ Years</p>
                <p className="text-sm">Of Innovation</p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-muted/50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => (
                <Card key={value.title} className="text-center">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                      {value.icon}
                    </div>
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{value.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-4">Meet Our Team</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            We're a diverse team of event enthusiasts, technologists, and community builders 
            working together to transform how people discover and experience events.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <Card key={member.name} className="text-center">
                <CardContent className="pt-6">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4"
                  />
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-sm text-primary mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-primary/5 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Whether you're an event-goer, organizer, or business owner, 
              there's a place for you in the Sypot community.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/auth">
                <Button size="lg">Get Started</Button>
              </Link>
              <Link to="/careers">
                <Button size="lg" variant="outline">Join Our Team</Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline">Contact Us</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;
