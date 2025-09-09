import { Link } from "react-router-dom";
import { 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  Mail,
  Phone,
  Heart,
  Sparkles,
  Globe,
  Shield,
  Users,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const currentYear = new Date().getFullYear();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
      });
      setEmail("");
    }
  };

  const footerSections = [
    {
      title: "Discover",
      links: [
        { label: "Trending Events", path: "/events?filter=trending" },
        { label: "This Weekend", path: "/events?filter=weekend" },
        { label: "Free Events", path: "/events?filter=free" },
        { label: "Virtual Events", path: "/events?filter=virtual" },
        { label: "Places Near You", path: "/map" },
        { label: "Hidden Gems", path: "/explore?category=hidden-gems" },
      ],
    },
    {
      title: "For Organizers",
      links: [
        { label: "Create Event", path: "/create-event" },
        { label: "Pricing", path: "/pricing" },
        { label: "Event Tools", path: "/organizer" },
        { label: "Success Stories", path: "/success-stories" },
        { label: "Resources", path: "/resources" },
        { label: "API Access", path: "/developers" },
      ],
    },
    {
      title: "For Businesses",
      links: [
        { label: "Register Business", path: "/register-business" },
        { label: "Business Solutions", path: "/business-solutions" },
        { label: "Advertising", path: "/advertise" },
        { label: "Analytics", path: "/business-dashboard" },
        { label: "Partner Program", path: "/partners" },
        { label: "Case Studies", path: "/case-studies" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", path: "/about" },
        { label: "Careers", path: "/careers" },
        { label: "Press", path: "/press" },
        { label: "Blog", path: "/blog" },
        { label: "Contact", path: "/contact" },
        { label: "Support", path: "/help" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Terms of Service", path: "/terms" },
        { label: "Privacy Policy", path: "/privacy" },
        { label: "Cookie Policy", path: "/cookies" },
        { label: "Safety", path: "/safety" },
        { label: "Accessibility", path: "/accessibility" },
        { label: "Guidelines", path: "/guidelines" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com/sypot", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com/sypot", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com/sypot", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com/company/sypot", label: "LinkedIn" },
    { icon: Youtube, href: "https://youtube.com/sypot", label: "YouTube" },
  ];

  const stats = [
    { icon: Users, value: "50K+", label: "Active Users" },
    { icon: Calendar, value: "10K+", label: "Monthly Events" },
    { icon: Globe, value: "25+", label: "Cities" },
    { icon: Shield, value: "100%", label: "Secure" },
  ];

  return (
    <footer className="bg-background border-t mt-auto">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="h-8 w-8 text-primary mr-2" />
              <h3 className="text-2xl font-bold">Stay in the Loop</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Get weekly updates on the hottest events, exclusive deals, and insider tips
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                required
              />
              <Button type="submit" size="lg">
                Subscribe
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-3">
              No spam, unsubscribe anytime. By subscribing you agree to our Privacy Policy.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="border-b py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Logo and Description */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
                <MapPin className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold">Sypot</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Your smart social discovery engine for events, places, and connections.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Email Us</p>
                <a href="mailto:hello@sypot.com" className="text-sm text-muted-foreground hover:text-foreground">
                  hello@sypot.com
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Call Us</p>
                <a href="tel:+254700000000" className="text-sm text-muted-foreground hover:text-foreground">
                  +254 700 000 000
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Visit Us</p>
                <p className="text-sm text-muted-foreground">
                  Nairobi, Kenya
                </p>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>© {currentYear} Sypot. All rights reserved.</span>
            <span>•</span>
            <span className="flex items-center">
              Made with <Heart className="h-3 w-3 mx-1 text-red-500" /> in Kenya
            </span>
          </div>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link to="/sitemap" className="text-muted-foreground hover:text-foreground">
              Sitemap
            </Link>
            <Link to="/security" className="text-muted-foreground hover:text-foreground">
              Security
            </Link>
            <Link to="/status" className="text-muted-foreground hover:text-foreground">
              Status
            </Link>
            <Button variant="outline" size="sm" asChild>
              <Link to="/download">
                Download App
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};