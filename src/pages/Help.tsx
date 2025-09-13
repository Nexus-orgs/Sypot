import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { 
  HelpCircle, 
  Search, 
  MessageCircle,
  Mail,
  Phone,
  Book,
  Users,
  Calendar,
  CreditCard,
  Shield,
  ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";

const Help = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    {
      id: "getting-started",
      title: "Getting Started",
      description: "Learn the basics of using Sypot",
      icon: Book,
      color: "bg-blue-500"
    },
    {
      id: "events",
      title: "Events & Bookings",
      description: "Everything about events and reservations",
      icon: Calendar,
      color: "bg-green-500"
    },
    {
      id: "social",
      title: "Friends & Social",
      description: "Connect with friends and join communities",
      icon: Users,
      color: "bg-purple-500"
    },
    {
      id: "payments",
      title: "Payments & Billing",
      description: "Payment methods and billing questions",
      icon: CreditCard,
      color: "bg-orange-500"
    },
    {
      id: "privacy",
      title: "Privacy & Security",
      description: "Keep your account safe and private",
      icon: Shield,
      color: "bg-red-500"
    }
  ];

  const faqs = [
    {
      question: "How do I create an account on Sypot?",
      answer: "To create an account, click the 'Sign Up' button on the homepage, enter your email and create a password. You'll receive a confirmation email to verify your account.",
      category: "getting-started"
    },
    {
      question: "How do I book tickets for an event?",
      answer: "Find an event you're interested in, click 'View Details', then click 'Get Ticket' or 'Book Now'. Follow the checkout process to complete your booking.",
      category: "events"
    },
    {
      question: "Can I cancel my event booking?",
      answer: "Yes, you can cancel most bookings up to 24 hours before the event. Go to 'My Bookings' and click 'Cancel' next to the event. Refund policies vary by event organizer.",
      category: "events"
    },
    {
      question: "How do I add friends on Sypot?",
      answer: "You can add friends by searching for their name or username in the Friends section, or by clicking 'Add Friend' on their profile. They'll receive a friend request notification.",
      category: "social"
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept major credit cards (Visa, Mastercard), mobile money (M-Pesa, Airtel Money), and bank transfers for event bookings and business services.",
      category: "payments"
    },
    {
      question: "How can I make my profile private?",
      answer: "Go to Settings > Privacy and change your profile visibility to 'Private' or 'Friends Only'. You can also control what information is visible to others.",
      category: "privacy"
    },
    {
      question: "How do I create an event?",
      answer: "Click 'Create Event' in the main navigation, fill in your event details including title, description, date, location, and pricing. Submit for review and it will go live once approved.",
      category: "events"
    },
    {
      question: "Why can't I see my friends' activity?",
      answer: "Your friends might have their privacy settings set to private, or they may not have shared their activity publicly. Check your privacy settings as well.",
      category: "social"
    }
  ];

  const filteredFaqs = searchQuery 
    ? faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-4">How can we help you?</h1>
          <p className="text-muted-foreground text-lg">
            Find answers to common questions or get in touch with our support team
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-12">
          <Search className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search for help articles, FAQs, or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-14 text-lg"
          />
        </div>

        {/* Categories */}
        {!searchQuery && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{category.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {category.description}
                        </p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* FAQ Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>
              Quick answers to the most common questions
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredFaqs.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-3">
                        <span>{faq.question}</span>
                        <Badge variant="outline" className="text-xs">
                          {categories.find(c => c.id === faq.category)?.title}
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="text-center py-8">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No results found</h3>
                <p className="text-muted-foreground">
                  Try searching with different keywords or browse our categories above
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Contact Support */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Live Chat</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get instant help from our support team
              </p>
              <Button variant="vibrant" className="w-full" asChild>
                <Link to="/chat">Start Chat</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Email Support</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Send us an email and we'll respond within 24 hours
              </p>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/contact">Send Email</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Phone Support</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Call us for urgent support needs
              </p>
              <Button variant="outline" className="w-full">
                +254 700 123 456
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex justify-center gap-4 mt-8">
          <Button variant="outline" asChild>
            <Link to="/contact">Contact Support</Link>
          </Button>
          <Button variant="vibrant" asChild>
            <Link to="/settings">Settings</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Help;
