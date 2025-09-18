import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, Users, Ticket, BarChart3, QrCode, Mail, 
  FileText, Download, Share2, Settings, Zap, Shield,
  Clock, CheckCircle, TrendingUp, DollarSign
} from "lucide-react";
import { Link } from "react-router-dom";

const EventTools = () => {
  const tools = [
    {
      category: "Planning & Management",
      items: [
        {
          icon: <Calendar className="w-8 h-8" />,
          title: "Event Calendar",
          description: "Manage your event schedule with our intuitive calendar interface",
          features: ["Drag & drop scheduling", "Recurring events", "Multi-day events"],
          cta: "Manage Calendar",
          link: "/organizer/manage-events"
        },
        {
          icon: <Users className="w-8 h-8" />,
          title: "Team Collaboration",
          description: "Work seamlessly with your team members and volunteers",
          features: ["Role assignments", "Task management", "Real-time updates"],
          cta: "Manage Team",
          link: "/organizer/team"
        },
        {
          icon: <FileText className="w-8 h-8" />,
          title: "Event Templates",
          description: "Save time with pre-built templates for common event types",
          features: ["20+ templates", "Custom branding", "Quick setup"],
          cta: "Browse Templates",
          link: "/templates"
        }
      ]
    },
    {
      category: "Ticketing & Registration",
      items: [
        {
          icon: <Ticket className="w-8 h-8" />,
          title: "Smart Ticketing",
          description: "Create and manage multiple ticket types with ease",
          features: ["Early bird pricing", "Group discounts", "Promo codes"],
          cta: "Setup Ticketing",
          link: "/organizer/ticketing"
        },
        {
          icon: <QrCode className="w-8 h-8" />,
          title: "QR Code Check-in",
          description: "Fast and secure entry management with QR codes",
          features: ["Instant validation", "Offline mode", "Real-time tracking"],
          cta: "Setup Check-in",
          link: "/gate-entry"
        },
        {
          icon: <Shield className="w-8 h-8" />,
          title: "Fraud Protection",
          description: "Advanced security to prevent ticket fraud and scalping",
          features: ["Duplicate detection", "Transfer controls", "Secure payments"],
          cta: "Learn More",
          link: "/security"
        }
      ]
    },
    {
      category: "Marketing & Promotion",
      items: [
        {
          icon: <Mail className="w-8 h-8" />,
          title: "Email Campaigns",
          description: "Reach your audience with targeted email marketing",
          features: ["Custom templates", "A/B testing", "Analytics"],
          cta: "Create Campaign",
          link: "/marketing/email"
        },
        {
          icon: <Share2 className="w-8 h-8" />,
          title: "Social Media Tools",
          description: "Promote your events across all social platforms",
          features: ["Multi-platform posting", "Content scheduler", "Hashtag suggestions"],
          cta: "Start Promoting",
          link: "/marketing/social"
        },
        {
          icon: <TrendingUp className="w-8 h-8" />,
          title: "SEO Optimization",
          description: "Make your events discoverable in search engines",
          features: ["Meta tags", "Schema markup", "Sitemap generation"],
          cta: "Optimize Events",
          link: "/marketing/seo"
        }
      ]
    },
    {
      category: "Analytics & Insights",
      items: [
        {
          icon: <BarChart3 className="w-8 h-8" />,
          title: "Event Analytics",
          description: "Track performance with comprehensive analytics",
          features: ["Real-time data", "Custom reports", "Export options"],
          cta: "View Analytics",
          link: "/admin/reports"
        },
        {
          icon: <DollarSign className="w-8 h-8" />,
          title: "Revenue Tracking",
          description: "Monitor ticket sales and revenue in real-time",
          features: ["Sales forecasting", "Payment tracking", "Financial reports"],
          cta: "Track Revenue",
          link: "/organizer/revenue"
        },
        {
          icon: <Users className="w-8 h-8" />,
          title: "Attendee Insights",
          description: "Understand your audience with detailed demographics",
          features: ["Demographics", "Behavior patterns", "Feedback analysis"],
          cta: "View Insights",
          link: "/organizer/attendees"
        }
      ]
    }
  ];

  const integrations = [
    { name: "Stripe", logo: "💳", description: "Payment processing" },
    { name: "Google Calendar", logo: "📅", description: "Calendar sync" },
    { name: "Mailchimp", logo: "📧", description: "Email marketing" },
    { name: "Zoom", logo: "📹", description: "Virtual events" },
    { name: "Slack", logo: "💬", description: "Team communication" },
    { name: "Zapier", logo: "⚡", description: "Workflow automation" }
  ];

  return (
    <Layout>
      <SEO 
        title="Event Tools - Powerful Features for Organizers | Sypot" 
        description="Discover our comprehensive suite of event management tools designed to make organizing events easier and more efficient."
        canonical="/event-tools"
      />
      
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                <Zap className="w-3 h-3 mr-1" />
                Event Tools
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Everything You Need to Create Amazing Events
              </h1>
              <p className="text-xl opacity-90 mb-8">
                Professional tools that help you plan, promote, and manage successful events with ease.
              </p>
              <div className="flex gap-4">
                <Link to="/create-event">
                  <Button size="lg" variant="secondary">
                    Start Creating
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20">
                    View Pricing
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Tools by Category */}
          {tools.map((category) => (
            <div key={category.category} className="mb-16">
              <h2 className="text-3xl font-bold mb-8">{category.category}</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {category.items.map((tool) => (
                  <Card key={tool.title} className="hover:shadow-xl transition-shadow">
                    <CardHeader>
                      <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                        {tool.icon}
                      </div>
                      <CardTitle>{tool.title}</CardTitle>
                      <CardDescription>{tool.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-6">
                        {tool.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Link to={tool.link}>
                        <Button className="w-full">{tool.cta}</Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}

          {/* Integrations */}
          <div className="mt-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Powerful Integrations</h2>
              <p className="text-muted-foreground">
                Connect with your favorite tools and services
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {integrations.map((integration) => (
                <Card key={integration.name} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="text-4xl mb-2">{integration.logo}</div>
                    <h3 className="font-semibold">{integration.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{integration.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <Card className="bg-gradient-to-r from-primary to-primary/80 text-white">
              <CardContent className="py-12">
                <h2 className="text-3xl font-bold mb-4">Ready to Take Your Events to the Next Level?</h2>
                <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                  Join thousands of successful organizers using our tools to create unforgettable experiences.
                </p>
                <div className="flex gap-4 justify-center">
                  <Link to="/auth">
                    <Button size="lg" variant="secondary">
                      Get Started Free
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20">
                    Schedule Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EventTools;