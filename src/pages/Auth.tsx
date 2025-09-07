import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin } from "lucide-react";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center">
              <MapPin className="h-8 w-8 text-white" />
            </div>
            <span className="text-3xl font-bold text-white">Sypot</span>
          </div>
          <p className="text-white/80">Discover your perfect spot</p>
        </div>

        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-white/10">
              <TabsTrigger value="signin" className="text-white data-[state=active]:bg-white/20">Sign In</TabsTrigger>
              <TabsTrigger value="signup" className="text-white data-[state=active]:bg-white/20">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <CardHeader>
                <CardTitle className="text-white">Welcome back</CardTitle>
                <CardDescription className="text-white/70">
                  Sign in to continue your Sypot journey
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <Input id="email" type="email" placeholder="Enter your email" className="bg-white/10 border-white/30 text-white placeholder-white/60" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">Password</Label>
                  <Input id="password" type="password" placeholder="Enter your password" className="bg-white/10 border-white/30 text-white placeholder-white/60" />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button className="w-full bg-white text-primary hover:bg-white/90" disabled={isLoading}>
                  Sign In
                </Button>
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  Forgot password?
                </Button>
              </CardFooter>
            </TabsContent>

            <TabsContent value="signup">
              <CardHeader>
                <CardTitle className="text-white">Join Sypot</CardTitle>
                <CardDescription className="text-white/70">
                  Create your account and start discovering
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-white">Email</Label>
                  <Input id="signup-email" type="email" placeholder="Enter your email" className="bg-white/10 border-white/30 text-white placeholder-white/60" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-white">Password</Label>
                  <Input id="signup-password" type="password" placeholder="Create a password" className="bg-white/10 border-white/30 text-white placeholder-white/60" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="text-white">Confirm Password</Label>
                  <Input id="confirm-password" type="password" placeholder="Confirm your password" className="bg-white/10 border-white/30 text-white placeholder-white/60" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-white text-primary hover:bg-white/90" disabled={isLoading}>
                  Create Account
                </Button>
              </CardFooter>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Auth;