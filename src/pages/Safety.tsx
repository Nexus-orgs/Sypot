import React from 'react';
import { Layout } from '../components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Shield, AlertCircle, CheckCircle, Users, Lock, Phone, Mail } from 'lucide-react';

export const Safety: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="relative bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <Shield className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-5xl font-bold mb-6">Safety Center</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Your safety is our priority. Learn about our safety features and guidelines.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <Lock className="w-8 h-8 text-blue-600 mb-2" />
                <CardTitle>Account Security</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <span>Two-factor authentication available</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <span>Encrypted payment information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <span>Regular security audits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <span>Secure password requirements</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="w-8 h-8 text-blue-600 mb-2" />
                <CardTitle>Event Safety</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <span>Verified event organizers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <span>24/7 emergency support line</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <span>Real-time incident reporting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <span>Safety guidelines for all events</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <AlertCircle className="w-8 h-8 text-orange-600 mb-2" />
              <CardTitle>Report a Safety Issue</CardTitle>
              <CardDescription>If you encounter any safety concerns, please let us know immediately</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button>
                  <Phone className="w-4 h-4 mr-2" />
                  Emergency Hotline
                </Button>
                <Button variant="outline">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Safety Team
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="prose dark:prose-invert max-w-none">
            <h2>Safety Guidelines</h2>
            <ul>
              <li>Always meet in public, well-lit places for event-related meetings</li>
              <li>Verify event details before purchasing tickets</li>
              <li>Report suspicious behavior immediately</li>
              <li>Keep your personal information private</li>
              <li>Use secure payment methods</li>
              <li>Trust your instincts - if something feels wrong, it probably is</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};
