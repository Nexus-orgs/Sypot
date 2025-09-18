import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { motion } from 'framer-motion';
import {
  Building2,
  Store,
  Music,
  Coffee,
  Users,
  Calendar,
  TrendingUp,
  BarChart3,
  CreditCard,
  Shield,
  Smartphone,
  Globe,
  CheckCircle,
  ArrowRight,
  Star,
  DollarSign,
  Clock,
  Award,
  Headphones,
  ChevronRight,
  Utensils,
  GraduationCap,
  Briefcase,
  Heart,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner';

interface Solution {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  benefits: {
    title: string;
    value: string;
  }[];
  caseStudy?: {
    business: string;
    result: string;
    metric: string;
  };
  pricing: string;
}

const solutions: Solution[] = [
  {
    id: 'restaurants',
    title: 'Restaurants & Bars',
    description: 'Transform your venue into an entertainment destination with themed nights and special events.',
    icon: <Utensils className="w-8 h-8" />,
    features: [
      'Event calendar integration',
      'Table reservation system',
      'Menu QR codes for events',
      'Live music scheduling',
      'Happy hour promotions',
      'Customer loyalty programs',
      'Staff scheduling for events',
      'Inventory management'
    ],
    benefits: [
      { title: 'Revenue Increase', value: '+300%' },
      { title: 'Table Bookings', value: '+85%' },
      { title: 'Repeat Customers', value: '+200%' }
    ],
    caseStudy: {
      business: 'Savanna Bites',
      result: 'Went from empty weeknights to fully booked',
      metric: 'Ksh 2.5M monthly revenue'
    },
    pricing: 'From Ksh 4,999/month'
  },
  {
    id: 'nightclubs',
    title: 'Nightclubs & Lounges',
    description: 'Manage guest lists, VIP tables, and special events while building your brand.',
    icon: <Music className="w-8 h-8" />,
    features: [
      'VIP table management',
      'Guest list system',
      'DJ lineup scheduling',
      'Bottle service ordering',
      'Event ticketing',
      'Capacity monitoring',
      'Security coordination',
      'Social media integration'
    ],
    benefits: [
      { title: 'VIP Revenue', value: '+400%' },
      { title: 'Guest List Size', value: '+500%' },
      { title: 'Social Reach', value: '+1000%' }
    ],
    caseStudy: {
      business: 'Club Hypnotica',
      result: 'Doubled weekend revenue in 3 months',
      metric: '5,000+ monthly guests'
    },
    pricing: 'From Ksh 9,999/month'
  },
  {
    id: 'hotels',
    title: 'Hotels & Resorts',
    description: 'Create memorable experiences for guests with conferences, weddings, and special events.',
    icon: <Building2 className="w-8 h-8" />,
    features: [
      'Conference room booking',
      'Wedding planning tools',
      'Catering management',
      'Guest activity scheduling',
      'Spa & amenity bookings',
      'Group reservation system',
      'Banquet hall management',
      'Package deals creation'
    ],
    benefits: [
      { title: 'Event Revenue', value: '+250%' },
      { title: 'Occupancy Rate', value: '+40%' },
      { title: 'Guest Satisfaction', value: '98%' }
    ],
    caseStudy: {
      business: 'Serena Hotels',
      result: 'Became #1 wedding venue in the region',
      metric: 'Ksh 100M annual event revenue'
    },
    pricing: 'From Ksh 19,999/month'
  },
  {
    id: 'cafes',
    title: 'Coffee Shops & Cafes',
    description: 'Host poetry nights, book clubs, and community events that build loyalty.',
    icon: <Coffee className="w-8 h-8" />,
    features: [
      'Open mic scheduling',
      'Workshop management',
      'Book club coordination',
      'Art exhibition tools',
      'Study group bookings',
      'Loyalty rewards',
      'Pre-order system',
      'Community board'
    ],
    benefits: [
      { title: 'Foot Traffic', value: '+150%' },
      { title: 'Average Spend', value: '+80%' },
      { title: 'Community Size', value: '2000+' }
    ],
    caseStudy: {
      business: 'Java House',
      result: 'Created thriving creative community',
      metric: '50+ events monthly'
    },
    pricing: 'From Ksh 2,999/month'
  },
  {
    id: 'venues',
    title: 'Event Venues',
    description: 'Maximize bookings and streamline operations for your event space.',
    icon: <Calendar className="w-8 h-8" />,
    features: [
      'Venue availability calendar',
      'Package customization',
      'Vendor management',
      'Floor plan designer',
      'Contract generation',
      'Payment processing',
      'Setup coordination',
      'Client portal'
    ],
    benefits: [
      { title: 'Booking Rate', value: '+90%' },
      { title: 'Revenue/Event', value: '+60%' },
      { title: 'Operational Efficiency', value: '+70%' }
    ],
    caseStudy: {
      business: 'KICC',
      result: 'Streamlined 500+ events annually',
      metric: '95% client satisfaction'
    },
    pricing: 'From Ksh 14,999/month'
  },
  {
    id: 'education',
    title: 'Schools & Universities',
    description: 'Manage campus events, lectures, and student activities efficiently.',
    icon: <GraduationCap className="w-8 h-8" />,
    features: [
      'Academic calendar sync',
      'Student organization tools',
      'Guest speaker management',
      'Sports event scheduling',
      'Alumni event planning',
      'Ticketing for shows',
      'Campus tour booking',
      'Graduation ceremony tools'
    ],
    benefits: [
      { title: 'Student Engagement', value: '+200%' },
      { title: 'Event Attendance', value: '+150%' },
      { title: 'Alumni Participation', value: '+300%' }
    ],
    caseStudy: {
      business: 'University of Nairobi',
      result: 'Unified campus event management',
      metric: '1000+ events per semester'
    },
    pricing: 'Educational discount available'
  }
];

const features = [
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: 'Real-time Analytics',
    description: 'Track attendance, revenue, and customer insights'
  },
  {
    icon: <CreditCard className="w-6 h-6" />,
    title: 'Integrated Payments',
    description: 'Accept M-Pesa, cards, and mobile money instantly'
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: 'Mobile Management',
    description: 'Run your business from anywhere with our app'
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Enterprise Security',
    description: 'Bank-level security for your data and transactions'
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: 'Marketing Tools',
    description: 'Built-in SEO, social media, and email marketing'
  },
  {
    icon: <Headphones className="w-6 h-6" />,
    title: '24/7 Support',
    description: 'Dedicated support team for your success'
  }
];

export const BusinessSolutions: React.FC = () => {
  const [selectedSolution, setSelectedSolution] = useState<string>('restaurants');
  const [isContactOpen, setIsContactOpen] = useState(false);

  const currentSolution = solutions.find(s => s.id === selectedSolution);

  const handleGetStarted = (solutionTitle: string) => {
    toast.success(`Getting started with ${solutionTitle} solution`);
    setIsContactOpen(true);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                Tailored for Your Industry
              </Badge>
              <h1 className="text-5xl font-bold mb-6">Business Solutions</h1>
              <p className="text-xl text-indigo-100 max-w-3xl mx-auto mb-8">
                Industry-specific tools to help your business create unforgettable experiences
                and drive revenue through events.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
                  Schedule Demo
                  <Calendar className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                  See Pricing
                  <DollarSign className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Industry Solutions */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Solutions by Industry</h2>
            <p className="text-xl text-gray-600">Choose your industry to see how we can help</p>
          </div>

          {/* Solution Selector */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {solutions.map((solution) => (
              <motion.button
                key={solution.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedSolution(solution.id)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedSolution === solution.id
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20'
                    : 'border-gray-200 hover:border-indigo-300'
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className={selectedSolution === solution.id ? 'text-indigo-600' : 'text-gray-600'}>
                    {solution.icon}
                  </div>
                  <span className="text-sm font-medium">{solution.title.split('&')[0]}</span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Selected Solution Details */}
          {currentSolution && (
            <motion.div
              key={currentSolution.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid lg:grid-cols-2 gap-12"
            >
              {/* Left Side - Details */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600">
                    {currentSolution.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{currentSolution.title}</h3>
                    <p className="text-gray-600">{currentSolution.pricing}</p>
                  </div>
                </div>

                <p className="text-lg text-gray-600 mb-8">{currentSolution.description}</p>

                {/* Features */}
                <div className="mb-8">
                  <h4 className="font-semibold mb-4">Key Features</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {currentSolution.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="flex gap-4">
                  <Button 
                    size="lg" 
                    onClick={() => handleGetStarted(currentSolution.title)}
                  >
                    Get Started
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button size="lg" variant="outline">
                    Download Brochure
                  </Button>
                </div>
              </div>

              {/* Right Side - Benefits & Case Study */}
              <div className="space-y-6">
                {/* Benefits */}
                <Card>
                  <CardHeader>
                    <CardTitle>Expected Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      {currentSolution.benefits.map((benefit, index) => (
                        <div key={index} className="text-center">
                          <div className="text-2xl font-bold text-indigo-600">{benefit.value}</div>
                          <div className="text-sm text-gray-600">{benefit.title}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Case Study */}
                {currentSolution.caseStudy && (
                  <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
                    <CardHeader>
                      <Badge className="w-fit mb-2">Success Story</Badge>
                      <CardTitle>{currentSolution.caseStudy.business}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{currentSolution.caseStudy.result}</p>
                      <div className="flex items-center gap-2 text-indigo-600 font-semibold">
                        <TrendingUp className="w-5 h-5" />
                        {currentSolution.caseStudy.metric}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </motion.div>
          )}
        </div>

        {/* Platform Features */}
        <div className="bg-gray-50 dark:bg-gray-900 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Everything You Need to Succeed</h2>
              <p className="text-xl text-gray-600">
                Comprehensive tools designed for your industry
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg w-fit mb-4 text-indigo-600">
                        {feature.icon}
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Trusted by Leading Businesses</h2>
            <p className="text-xl text-gray-600">See what our clients say about us</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "Vibe Connect transformed our restaurant. We're now known for our events as much as our food.",
                author: "Grace Mwangi",
                role: "Owner, Savanna Bites",
                rating: 5
              },
              {
                quote: "The best investment we've made. Our club revenue doubled in just 3 months.",
                author: "DJ Mike",
                role: "Manager, Club Hypnotica",
                rating: 5
              },
              {
                quote: "Finally, a platform that understands the hospitality industry. Game changer!",
                author: "Sarah Chen",
                role: "Events Director, Serena Hotels",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <CardDescription className="text-base italic">
                    "{testimonial.quote}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <Sparkles className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-indigo-100 mb-8">
              Join thousands of businesses creating amazing experiences with Vibe Connect
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
                Start 30-Day Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                Talk to an Expert
                <Headphones className="w-5 h-5 ml-2" />
              </Button>
            </div>
            <p className="text-sm text-indigo-200 mt-4">
              No credit card required • Setup in 5 minutes • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};