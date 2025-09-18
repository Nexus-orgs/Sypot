import React from 'react';
import { Layout } from '../components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Handshake, Trophy, DollarSign, Users, Rocket, Gift, CheckCircle, ArrowRight } from 'lucide-react';

export const PartnerProgram: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="relative bg-gradient-to-r from-green-600 to-emerald-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">Partner with Us</Badge>
            <h1 className="text-5xl font-bold mb-6">Partner Program</h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
              Join our partner ecosystem and grow your business while helping others succeed.
            </p>
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
              Become a Partner
              <Handshake className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Trophy className="w-10 h-10 text-yellow-500 mb-4" />
                <CardTitle>Referral Partner</CardTitle>
                <CardDescription>Earn 20% commission on referrals</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {['20% recurring commission', 'Marketing materials', 'Dedicated support', 'Monthly payouts'].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Rocket className="w-10 h-10 text-purple-500 mb-4" />
                <CardTitle>Technology Partner</CardTitle>
                <CardDescription>Integrate your solutions with our platform</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {['API access', 'Co-marketing opportunities', 'Technical documentation', 'Integration support'].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="w-10 h-10 text-blue-500 mb-4" />
                <CardTitle>Agency Partner</CardTitle>
                <CardDescription>Offer Vibe Connect to your clients</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {['White-label options', 'Volume discounts', 'Partner portal', 'Training & certification'].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <h2 className="text-2xl font-bold mb-4">Ready to Partner?</h2>
            <Button size="lg">
              Apply Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};
