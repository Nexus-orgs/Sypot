import React from 'react';
import { Layout } from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Cookie, Shield, Info, Settings } from 'lucide-react';

export const CookiePolicy: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="flex items-center gap-3 mb-8">
            <Cookie className="w-10 h-10 text-amber-600" />
            <h1 className="text-4xl font-bold">Cookie Policy</h1>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>How We Use Cookies</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>Last updated: March 15, 2024</p>
              
              <h3>What are cookies?</h3>
              <p>Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience and allow certain features to work.</p>

              <h3>Types of cookies we use</h3>
              <ul>
                <li><strong>Essential cookies:</strong> Required for the website to function properly</li>
                <li><strong>Performance cookies:</strong> Help us understand how visitors use our website</li>
                <li><strong>Functional cookies:</strong> Remember your preferences and personalize your experience</li>
                <li><strong>Marketing cookies:</strong> Track your activity to provide relevant advertisements</li>
              </ul>

              <h3>Your cookie choices</h3>
              <p>You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed.</p>

              <h3>Third-party cookies</h3>
              <p>We use services from Google Analytics, Stripe, and social media platforms that may set their own cookies.</p>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button>
              <Settings className="w-4 h-4 mr-2" />
              Manage Cookie Settings
            </Button>
            <Button variant="outline">
              Learn More About Privacy
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};
