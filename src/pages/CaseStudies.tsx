import React from 'react';
import { Layout } from '../components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Award, TrendingUp, Users, Calendar, ArrowRight, Download } from 'lucide-react';

export const CaseStudies: React.FC = () => {
  const caseStudies = [
    {
      title: 'GreenTech Summit: Scaling from 50 to 5,000 Attendees',
      category: 'Conference',
      result: '100x growth in 2 years',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
      metrics: { attendance: '+900%', revenue: '+750%', satisfaction: '98%' }
    },
    {
      title: 'Savanna Bites: From Empty Tables to Fully Booked',
      category: 'Restaurant',
      result: '300% revenue increase',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
      metrics: { bookings: '+95%', events: '12/month', customers: '1,500+' }
    },
    {
      title: 'Kilifi New Year: Doubling Festival Attendance',
      category: 'Festival',
      result: 'Sold out 3 months early',
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400',
      metrics: { attendance: '+100%', social: '5M reach', revenue: '+150%' }
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">Real Results</Badge>
            <h1 className="text-5xl font-bold mb-6">Case Studies</h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Deep dive into how businesses achieved extraordinary results with Vibe Connect.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow">
                <div className="h-48 overflow-hidden rounded-t-lg">
                  <img src={study.image} alt={study.title} className="w-full h-full object-cover" />
                </div>
                <CardHeader>
                  <Badge className="w-fit mb-2">{study.category}</Badge>
                  <CardTitle className="text-lg">{study.title}</CardTitle>
                  <CardDescription>{study.result}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {Object.entries(study.metrics).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-sm font-bold text-purple-600">{value}</div>
                        <div className="text-xs text-gray-600">{key}</div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full">
                    Read Full Study
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg">
              <Download className="w-5 h-5 mr-2" />
              Download All Case Studies
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};
