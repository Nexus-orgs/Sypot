import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Slider } from '../components/ui/slider';
import { motion } from 'framer-motion';
import {
  Megaphone,
  Target,
  TrendingUp,
  Users,
  Globe,
  Smartphone,
  Monitor,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  BarChart3,
  DollarSign,
  Eye,
  MousePointer,
  ArrowRight,
  CheckCircle,
  Zap,
  Calendar,
  MapPin,
  Star,
  Award
} from 'lucide-react';
import { toast } from 'sonner';

interface AdFormat {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  specs: {
    label: string;
    value: string;
  }[];
  pricing: {
    cpm: string;
    cpc: string;
    minimum: string;
  };
  performance: {
    ctr: string;
    conversionRate: string;
    avgEngagement: string;
  };
}

const adFormats: AdFormat[] = [
  {
    id: 'display',
    name: 'Display Ads',
    description: 'Eye-catching banner ads across our platform',
    icon: <Monitor className="w-6 h-6" />,
    specs: [
      { label: 'Sizes', value: '728x90, 300x250, 320x50' },
      { label: 'Format', value: 'JPG, PNG, GIF, HTML5' },
      { label: 'Placement', value: 'Homepage, Event Pages, Search' }
    ],
    pricing: {
      cpm: 'Ksh 500',
      cpc: 'Ksh 50',
      minimum: 'Ksh 5,000'
    },
    performance: {
      ctr: '2.5%',
      conversionRate: '4.2%',
      avgEngagement: 'High'
    }
  },
  {
    id: 'native',
    name: 'Native Ads',
    description: 'Seamlessly integrated promotional content',
    icon: <Zap className="w-6 h-6" />,
    specs: [
      { label: 'Format', value: 'Sponsored Events' },
      { label: 'Placement', value: 'Event Feed, Recommendations' },
      { label: 'Targeting', value: 'Interest-based, Behavioral' }
    ],
    pricing: {
      cpm: 'Ksh 800',
      cpc: 'Ksh 80',
      minimum: 'Ksh 10,000'
    },
    performance: {
      ctr: '4.8%',
      conversionRate: '6.5%',
      avgEngagement: 'Very High'
    }
  },
  {
    id: 'video',
    name: 'Video Ads',
    description: 'Engaging video content for maximum impact',
    icon: <Youtube className="w-6 h-6" />,
    specs: [
      { label: 'Duration', value: '15s, 30s, 60s' },
      { label: 'Format', value: 'MP4, WebM' },
      { label: 'Placement', value: 'Pre-roll, Mid-roll, Feed' }
    ],
    pricing: {
      cpm: 'Ksh 1,200',
      cpc: 'Ksh 100',
      minimum: 'Ksh 15,000'
    },
    performance: {
      ctr: '6.2%',
      conversionRate: '8.1%',
      avgEngagement: 'Exceptional'
    }
  },
  {
    id: 'email',
    name: 'Email Marketing',
    description: 'Direct reach to engaged subscribers',
    icon: <Mail className="w-6 h-6" />,
    specs: [
      { label: 'Reach', value: '500K+ subscribers' },
      { label: 'Frequency', value: 'Weekly, Bi-weekly' },
      { label: 'Segments', value: '20+ categories' }
    ],
    pricing: {
      cpm: 'Ksh 2,000',
      cpc: 'Ksh 150',
      minimum: 'Ksh 20,000'
    },
    performance: {
      ctr: '12.5%',
      conversionRate: '10.2%',
      avgEngagement: 'Very High'
    }
  }
];

export const Advertising: React.FC = () => {
  const [selectedFormat, setSelectedFormat] = useState<string>('display');
  const [budget, setBudget] = useState([10000]);
  const [duration, setDuration] = useState([7]);

  const estimatedReach = Math.round((budget[0] / 500) * 1000);
  const estimatedClicks = Math.round(estimatedReach * 0.025);
  const estimatedConversions = Math.round(estimatedClicks * 0.042);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-orange-600 to-red-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                Reach Your Audience
              </Badge>
              <h1 className="text-5xl font-bold mb-6">Advertising Solutions</h1>
              <p className="text-xl text-orange-100 max-w-3xl mx-auto mb-8">
                Connect with millions of event-goers. Target your ideal audience
                with precision and measure your impact in real-time.
              </p>
              <div className="flex flex-wrap gap-8 justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold">2M+</div>
                  <div className="text-orange-100">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">500K+</div>
                  <div className="text-orange-100">Monthly Events</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">98%</div>
                  <div className="text-orange-100">Brand Recall</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">4.5x</div>
                  <div className="text-orange-100">Average ROI</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Ad Formats */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Advertising Formats</h2>
            <p className="text-xl text-gray-600">
              Choose the right format to achieve your marketing goals
            </p>
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {adFormats.map((format) => (
              <motion.div
                key={format.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card 
                  className={`cursor-pointer transition-all h-full ${
                    selectedFormat === format.id 
                      ? 'border-orange-500 shadow-lg' 
                      : 'hover:border-orange-300'
                  }`}
                  onClick={() => setSelectedFormat(format.id)}
                >
                  <CardHeader>
                    <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg w-fit mb-4 text-orange-600">
                      {format.icon}
                    </div>
                    <CardTitle>{format.name}</CardTitle>
                    <CardDescription>{format.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      {format.specs.map((spec, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-gray-600">{spec.label}:</span>
                          <span className="font-medium">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-4 border-t">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Starting from</span>
                        <span className="font-bold text-orange-600">{format.pricing.minimum}</span>
                      </div>
                      <div className="flex gap-2 justify-center">
                        <Badge variant="secondary">CTR: {format.performance.ctr}</Badge>
                        <Badge variant="secondary">CR: {format.performance.conversionRate}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Campaign Calculator */}
        <div className="bg-gray-50 dark:bg-gray-900 py-16">
          <div className="max-w-4xl mx-auto px-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Campaign Estimator</CardTitle>
                <CardDescription>
                  Plan your campaign and see estimated results
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Campaign Budget: Ksh {budget[0].toLocaleString()}
                  </label>
                  <Slider
                    value={budget}
                    onValueChange={setBudget}
                    min={5000}
                    max={500000}
                    step={1000}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Ksh 5,000</span>
                    <span>Ksh 500,000</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Campaign Duration: {duration[0]} days
                  </label>
                  <Slider
                    value={duration}
                    onValueChange={setDuration}
                    min={1}
                    max={90}
                    step={1}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>1 day</span>
                    <span>90 days</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-6 border-t">
                  <div className="text-center">
                    <Eye className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold">
                      {estimatedReach.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Estimated Reach</div>
                  </div>
                  <div className="text-center">
                    <MousePointer className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold">
                      {estimatedClicks.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Estimated Clicks</div>
                  </div>
                  <div className="text-center">
                    <Target className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold">
                      {estimatedConversions}
                    </div>
                    <div className="text-sm text-gray-600">Est. Conversions</div>
                  </div>
                </div>

                <Button size="lg" className="w-full">
                  Start Campaign
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Grow Your Business?</h2>
            <p className="text-xl text-orange-100 mb-8">
              Join thousands of brands reaching their target audience on Vibe Connect
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                Download Media Kit
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};