import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
  Check, X, Sparkles, TrendingUp, Shield, Zap, 
  Users, Calendar, BarChart3, CreditCard, Globe, 
  Headphones, Award, Infinity
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: "Starter",
      description: "Perfect for individual organizers just getting started",
      monthlyPrice: 0,
      yearlyPrice: 0,
      currency: "KES",
      color: "border-gray-200",
      features: [
        { text: "Up to 3 events per month", included: true },
        { text: "Basic event page", included: true },
        { text: "50 attendees per event", included: true },
        { text: "QR code tickets", included: true },
        { text: "Email notifications", included: true },
        { text: "Basic analytics", included: true },
        { text: "5% transaction fee", included: true },
        { text: "Community support", included: true },
        { text: "Custom branding", included: false },
        { text: "Priority support", included: false },
        { text: "Advanced analytics", included: false },
        { text: "API access", included: false }
      ],
      cta: "Start Free",
      popular: false
    },
    {
      name: "Professional",
      description: "For growing organizers who need more features",
      monthlyPrice: 4999,
      yearlyPrice: 49990,
      currency: "KES",
      color: "border-primary ring-2 ring-primary",
      features: [
        { text: "Unlimited events", included: true },
        { text: "Advanced event page", included: true },
        { text: "500 attendees per event", included: true },
        { text: "QR code tickets", included: true },
        { text: "Email & SMS notifications", included: true },
        { text: "Advanced analytics", included: true },
        { text: "3% transaction fee", included: true },
        { text: "Priority support", included: true },
        { text: "Custom branding", included: true },
        { text: "Team collaboration (3 users)", included: true },
        { text: "Attendee data export", included: true },
        { text: "API access", included: false }
      ],
      cta: "Start 14-day trial",
      popular: true
    },
    {
      name: "Enterprise",
      description: "For large organizations and event agencies",
      monthlyPrice: 19999,
      yearlyPrice: 199990,
      currency: "KES",
      color: "border-purple-200",
      features: [
        { text: "Unlimited everything", included: true },
        { text: "White-label solution", included: true },
        { text: "Unlimited attendees", included: true },
        { text: "Advanced ticketing", included: true },
        { text: "Multi-channel notifications", included: true },
        { text: "Custom analytics & reports", included: true },
        { text: "1% transaction fee", included: true },
        { text: "Dedicated account manager", included: true },
        { text: "Full customization", included: true },
        { text: "Unlimited team members", included: true },
        { text: "Full data ownership", included: true },
        { text: "API access & webhooks", included: true }
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  const addOns = [
    {
      icon: <Globe className="w-5 h-5" />,
      title: "Virtual Events",
      description: "Stream your events online",
      price: "KES 999/event"
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Event Insurance",
      description: "Protect against cancellations",
      price: "From KES 499"
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Extra Team Members",
      description: "Add more collaborators",
      price: "KES 299/user"
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      title: "Advanced Reports",
      description: "Detailed insights & exports",
      price: "KES 1,499/mo"
    }
  ];

  const faqs = [
    {
      question: "Can I change plans anytime?",
      answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept M-Pesa, credit/debit cards (Visa, Mastercard), and bank transfers for enterprise plans."
    },
    {
      question: "Is there a setup fee?",
      answer: "No, there are no setup fees for any of our plans. You only pay the subscription and transaction fees."
    },
    {
      question: "How do transaction fees work?",
      answer: "Transaction fees are charged only on paid events as a percentage of ticket sales. Free events have no transaction fees."
    }
  ];

  return (
    <Layout>
      <SEO 
        title="Pricing - Event Organizer Plans | Sypot" 
        description="Choose the perfect plan for your event organizing needs. From free starter to enterprise solutions."
        canonical="/pricing"
      />
      
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              <Sparkles className="w-3 h-3 mr-1" />
              Pricing Plans
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Choose Your Perfect Plan
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
              Whether you're organizing your first event or managing hundreds, 
              we have a plan that scales with your needs.
            </p>
            
            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-1">
              <Button
                variant={billingPeriod === 'monthly' ? 'secondary' : 'ghost'}
                onClick={() => setBillingPeriod('monthly')}
                className={billingPeriod === 'monthly' ? '' : 'text-white hover:text-white/80'}
              >
                Monthly
              </Button>
              <Button
                variant={billingPeriod === 'yearly' ? 'secondary' : 'ghost'}
                onClick={() => setBillingPeriod('yearly')}
                className={billingPeriod === 'yearly' ? '' : 'text-white hover:text-white/80'}
              >
                Yearly
                <Badge className="ml-2 bg-green-500 text-white">Save 20%</Badge>
              </Button>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="container mx-auto px-4 -mt-10">
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {plans.map((plan) => (
              <Card 
                key={plan.name} 
                className={`relative ${plan.color} ${plan.popular ? 'scale-105 shadow-xl' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-white px-3 py-1">
                      <Award className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                  <div className="mt-6">
                    <span className="text-4xl font-bold">
                      {plan.currency} {billingPeriod === 'monthly' 
                        ? plan.monthlyPrice.toLocaleString()
                        : plan.yearlyPrice.toLocaleString()}
                    </span>
                    {plan.monthlyPrice > 0 && (
                      <span className="text-muted-foreground">
                        /{billingPeriod === 'monthly' ? 'month' : 'year'}
                      </span>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-500 mt-0.5" />
                      ) : (
                        <X className="w-5 h-5 text-gray-300 mt-0.5" />
                      )}
                      <span className={`text-sm ${!feature.included ? 'text-muted-foreground' : ''}`}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </CardContent>
                
                <CardFooter>
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Add-ons Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Power-Up Your Events</h2>
            <div className="grid md:grid-cols-4 gap-4">
              {addOns.map((addon) => (
                <Card key={addon.title} className="text-center">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                      {addon.icon}
                    </div>
                    <h3 className="font-semibold mb-2">{addon.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{addon.description}</p>
                    <p className="font-bold text-primary">{addon.price}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Comparison Table */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Detailed Comparison</h2>
            <Card>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="text-left p-4">Features</th>
                      <th className="text-center p-4">Starter</th>
                      <th className="text-center p-4">Professional</th>
                      <th className="text-center p-4">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-4 font-medium">Events per month</td>
                      <td className="text-center p-4">3</td>
                      <td className="text-center p-4">Unlimited</td>
                      <td className="text-center p-4">Unlimited</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-medium">Attendees per event</td>
                      <td className="text-center p-4">50</td>
                      <td className="text-center p-4">500</td>
                      <td className="text-center p-4">Unlimited</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-medium">Transaction fee</td>
                      <td className="text-center p-4">5%</td>
                      <td className="text-center p-4">3%</td>
                      <td className="text-center p-4">1%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-medium">Team members</td>
                      <td className="text-center p-4">1</td>
                      <td className="text-center p-4">3</td>
                      <td className="text-center p-4">Unlimited</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-medium">Support</td>
                      <td className="text-center p-4">Community</td>
                      <td className="text-center p-4">Priority</td>
                      <td className="text-center p-4">Dedicated</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* FAQs */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {faqs.map((faq) => (
                <Card key={faq.question}>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center pb-16">
            <Card className="bg-primary text-white">
              <CardContent className="py-12">
                <h2 className="text-3xl font-bold mb-4">Ready to Start Organizing?</h2>
                <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                  Join thousands of successful event organizers using Sypot
                </p>
                <div className="flex gap-4 justify-center">
                  <Link to="/auth">
                    <Button size="lg" variant="secondary">
                      Start Free Trial
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20">
                      Talk to Sales
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Pricing;