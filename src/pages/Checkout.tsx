import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  CreditCard,
  Lock,
  Shield,
  Calendar,
  MapPin,
  Users,
  Clock,
  Ticket,
  AlertCircle,
  CheckCircle,
  Smartphone,
  Wallet,
  DollarSign,
  Tag,
  Gift,
  ArrowLeft
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

interface TicketType {
  id: string;
  name: string;
  price: number;
  description: string;
  available: number;
  perks?: string[];
}

const Checkout = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Get event data from location state
  const eventData = location.state?.event || {
    id: "demo-event",
    title: "Jazz Night at Blue Note",
    date: "Dec 15, 2024",
    time: "8:00 PM",
    location: "Blue Note Jazz Club, Westlands",
    image: "/placeholder.svg"
  };

  const [selectedTickets, setSelectedTickets] = useState<{[key: string]: number}>({});
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState(1); // 1: Tickets, 2: Payment, 3: Confirmation
  
  // Payment form data
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    email: profile?.user_id ? user?.email : "",
    phone: profile?.phone || "",
    mpesaPhone: "",
  });

  const ticketTypes: TicketType[] = [
    {
      id: "general",
      name: "General Admission",
      price: 1500,
      description: "Standard entry ticket",
      available: 50,
      perks: ["Entry to event", "Welcome drink"]
    },
    {
      id: "vip",
      name: "VIP Ticket",
      price: 3500,
      description: "Premium experience with exclusive perks",
      available: 20,
      perks: ["Priority entry", "VIP seating", "Complimentary drinks", "Meet & greet"]
    },
    {
      id: "group",
      name: "Group Package (4 people)",
      price: 5000,
      description: "Special rate for groups",
      available: 10,
      perks: ["4 general admission tickets", "Reserved table", "Bottle service"]
    }
  ];

  const paymentMethods = [
    { id: "card", name: "Credit/Debit Card", icon: CreditCard, description: "Visa, Mastercard, Amex" },
    { id: "mpesa", name: "M-Pesa", icon: Smartphone, description: "Pay with mobile money" },
    { id: "paypal", name: "PayPal", icon: Wallet, description: "Fast and secure" },
  ];

  const calculateSubtotal = () => {
    return Object.entries(selectedTickets).reduce((total, [ticketId, quantity]) => {
      const ticket = ticketTypes.find(t => t.id === ticketId);
      return total + (ticket?.price || 0) * quantity;
    }, 0);
  };

  const calculateServiceFee = () => {
    return Math.round(calculateSubtotal() * 0.05); // 5% service fee
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const serviceFee = calculateServiceFee();
    const discount = promoDiscount;
    return subtotal + serviceFee - discount;
  };

  const handleApplyPromo = () => {
    // Simulate promo code validation
    if (promoCode.toUpperCase() === "FIRST10") {
      const discount = Math.round(calculateSubtotal() * 0.1);
      setPromoDiscount(discount);
      toast({
        title: "Promo code applied!",
        description: `You saved KES ${discount}`,
      });
    } else if (promoCode.toUpperCase() === "VIP20") {
      const discount = Math.round(calculateSubtotal() * 0.2);
      setPromoDiscount(discount);
      toast({
        title: "Promo code applied!",
        description: `You saved KES ${discount}`,
      });
    } else {
      toast({
        title: "Invalid promo code",
        description: "Please check your code and try again",
        variant: "destructive"
      });
    }
  };

  const handleTicketSelection = (ticketId: string, quantity: number) => {
    setSelectedTickets(prev => ({
      ...prev,
      [ticketId]: quantity
    }));
  };

  const validatePaymentData = () => {
    if (paymentMethod === "card") {
      if (!paymentData.cardNumber || !paymentData.cardName || !paymentData.expiryDate || !paymentData.cvv) {
        toast({
          title: "Missing Information",
          description: "Please fill in all card details",
          variant: "destructive"
        });
        return false;
      }
      // Basic card number validation
      if (paymentData.cardNumber.replace(/\s/g, "").length !== 16) {
        toast({
          title: "Invalid Card Number",
          description: "Please enter a valid 16-digit card number",
          variant: "destructive"
        });
        return false;
      }
    } else if (paymentMethod === "mpesa") {
      if (!paymentData.mpesaPhone) {
        toast({
          title: "Missing Information",
          description: "Please enter your M-Pesa phone number",
          variant: "destructive"
        });
        return false;
      }
    }
    
    if (!agreeToTerms) {
      toast({
        title: "Terms & Conditions",
        description: "Please agree to the terms and conditions",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };

  const handlePayment = async () => {
    if (!validatePaymentData()) return;
    
    setProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Generate ticket data
      const ticketData = {
        event_id: eventData.id,
        user_id: user?.id,
        tickets: selectedTickets,
        total_amount: calculateTotal(),
        payment_method: paymentMethod,
        status: "confirmed",
        qr_code: `SYPOT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        created_at: new Date().toISOString()
      };
      
      // Save booking to database (simulated)
      console.log("Booking data:", ticketData);
      
      // Move to confirmation step
      setPaymentStep(3);
      
      toast({
        title: "Payment Successful! 🎉",
        description: "Your tickets have been confirmed",
      });
      
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setProcessing(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.slice(0, 2) + "/" + v.slice(2, 4);
    }
    return v;
  };

  return (
    <Layout>
      <SEO 
        title="Checkout - Secure Payment | Sypot" 
        description="Complete your ticket purchase securely"
        canonical="/checkout"
      />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center ${paymentStep >= 1 ? "text-primary" : "text-muted-foreground"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${paymentStep >= 1 ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                1
              </div>
              <span className="ml-2 hidden sm:inline">Select Tickets</span>
            </div>
            <div className={`w-20 h-0.5 ${paymentStep >= 2 ? "bg-primary" : "bg-muted"}`} />
            <div className={`flex items-center ${paymentStep >= 2 ? "text-primary" : "text-muted-foreground"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${paymentStep >= 2 ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                2
              </div>
              <span className="ml-2 hidden sm:inline">Payment</span>
            </div>
            <div className={`w-20 h-0.5 ${paymentStep >= 3 ? "bg-primary" : "bg-muted"}`} />
            <div className={`flex items-center ${paymentStep >= 3 ? "text-primary" : "text-muted-foreground"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${paymentStep >= 3 ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                3
              </div>
              <span className="ml-2 hidden sm:inline">Confirmation</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {paymentStep === 1 && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Select Your Tickets</CardTitle>
                    <CardDescription>Choose the tickets you want to purchase</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {ticketTypes.map((ticket) => (
                      <div key={ticket.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-lg">{ticket.name}</h3>
                            <p className="text-sm text-muted-foreground">{ticket.description}</p>
                            <p className="text-2xl font-bold mt-2">KES {ticket.price}</p>
                          </div>
                          <Badge variant="secondary">
                            {ticket.available} left
                          </Badge>
                        </div>
                        
                        {ticket.perks && (
                          <div className="mb-3">
                            <p className="text-sm font-medium mb-1">Includes:</p>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              {ticket.perks.map((perk, index) => (
                                <li key={index} className="flex items-center gap-2">
                                  <CheckCircle className="h-3 w-3 text-green-500" />
                                  {perk}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-4">
                          <Label htmlFor={`quantity-${ticket.id}`} className="text-sm">
                            Quantity:
                          </Label>
                          <select
                            id={`quantity-${ticket.id}`}
                            className="border rounded px-3 py-1"
                            value={selectedTickets[ticket.id] || 0}
                            onChange={(e) => handleTicketSelection(ticket.id, parseInt(e.target.value))}
                          >
                            {[...Array(Math.min(10, ticket.available + 1))].map((_, i) => (
                              <option key={i} value={i}>{i}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      onClick={() => setPaymentStep(2)}
                      disabled={Object.values(selectedTickets).every(q => q === 0)}
                    >
                      Continue to Payment
                    </Button>
                  </CardFooter>
                </Card>
              </>
            )}

            {paymentStep === 2 && (
              <>
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Payment Information</CardTitle>
                    <CardDescription>
                      <div className="flex items-center gap-2 text-green-600">
                        <Shield className="h-4 w-4" />
                        Secure payment powered by Stripe
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Contact Information */}
                    <div className="space-y-4">
                      <h3 className="font-medium">Contact Information</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={paymentData.email}
                            onChange={(e) => setPaymentData({...paymentData, email: e.target.value})}
                            placeholder="john@example.com"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={paymentData.phone}
                            onChange={(e) => setPaymentData({...paymentData, phone: e.target.value})}
                            placeholder="+254 700 000 000"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div className="space-y-4">
                      <h3 className="font-medium">Payment Method</h3>
                      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                        {paymentMethods.map((method) => (
                          <div key={method.id} className="flex items-center space-x-3 border rounded-lg p-3">
                            <RadioGroupItem value={method.id} id={method.id} />
                            <Label htmlFor={method.id} className="flex-1 cursor-pointer">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <method.icon className="h-5 w-5" />
                                  <div>
                                    <p className="font-medium">{method.name}</p>
                                    <p className="text-xs text-muted-foreground">{method.description}</p>
                                  </div>
                                </div>
                              </div>
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    {/* Card Details */}
                    {paymentMethod === "card" && (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            value={paymentData.cardNumber}
                            onChange={(e) => setPaymentData({...paymentData, cardNumber: formatCardNumber(e.target.value)})}
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardName">Cardholder Name</Label>
                          <Input
                            id="cardName"
                            value={paymentData.cardName}
                            onChange={(e) => setPaymentData({...paymentData, cardName: e.target.value})}
                            placeholder="John Doe"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiryDate">Expiry Date</Label>
                            <Input
                              id="expiryDate"
                              value={paymentData.expiryDate}
                              onChange={(e) => setPaymentData({...paymentData, expiryDate: formatExpiryDate(e.target.value)})}
                              placeholder="MM/YY"
                              maxLength={5}
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              value={paymentData.cvv}
                              onChange={(e) => setPaymentData({...paymentData, cvv: e.target.value.replace(/\D/g, "")})}
                              placeholder="123"
                              maxLength={4}
                              type="password"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* M-Pesa Details */}
                    {paymentMethod === "mpesa" && (
                      <div className="space-y-4">
                        <Alert>
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>
                            You will receive an M-Pesa prompt on your phone to complete the payment
                          </AlertDescription>
                        </Alert>
                        <div>
                          <Label htmlFor="mpesaPhone">M-Pesa Phone Number</Label>
                          <Input
                            id="mpesaPhone"
                            value={paymentData.mpesaPhone}
                            onChange={(e) => setPaymentData({...paymentData, mpesaPhone: e.target.value})}
                            placeholder="0700000000"
                          />
                        </div>
                      </div>
                    )}

                    {/* Terms & Conditions */}
                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="terms" 
                        checked={agreeToTerms}
                        onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                      />
                      <Label htmlFor="terms" className="text-sm cursor-pointer">
                        I agree to the <span className="text-primary underline">Terms & Conditions</span> and <span className="text-primary underline">Refund Policy</span>
                      </Label>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-4">
                    <Button variant="outline" onClick={() => setPaymentStep(1)} className="flex-1">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back
                    </Button>
                    <Button 
                      className="flex-1" 
                      onClick={handlePayment}
                      disabled={processing || !agreeToTerms}
                    >
                      {processing ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Lock className="h-4 w-4 mr-2" />
                          Pay KES {calculateTotal().toLocaleString()}
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </>
            )}

            {paymentStep === 3 && (
              <Card>
                <CardHeader className="text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                  <CardTitle className="text-2xl">Payment Successful!</CardTitle>
                  <CardDescription>
                    Your tickets have been confirmed and sent to your email
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-muted p-4 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-2">Confirmation Number</p>
                    <p className="text-2xl font-mono font-bold">
                      SYPOT-{Date.now().toString().slice(-6)}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Ticket Details</h3>
                    {Object.entries(selectedTickets).map(([ticketId, quantity]) => {
                      if (quantity === 0) return null;
                      const ticket = ticketTypes.find(t => t.id === ticketId);
                      return (
                        <div key={ticketId} className="flex justify-between">
                          <span>{ticket?.name} x {quantity}</span>
                          <span>KES {((ticket?.price || 0) * quantity).toLocaleString()}</span>
                        </div>
                      );
                    })}
                  </div>

                  <Alert>
                    <Ticket className="h-4 w-4" />
                    <AlertDescription>
                      Your tickets have been sent to {paymentData.email || user?.email}. 
                      You can also access them from your profile.
                    </AlertDescription>
                  </Alert>

                  <div className="border-t pt-4">
                    <p className="text-sm text-muted-foreground mb-4">
                      Show this QR code at the venue for entry:
                    </p>
                    <div className="bg-white p-4 rounded-lg border-2 border-dashed">
                      <div className="aspect-square bg-muted max-w-[200px] mx-auto rounded flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">QR Code</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-4">
                  <Button variant="outline" onClick={() => navigate('/my-bookings')} className="flex-1">
                    View My Tickets
                  </Button>
                  <Button onClick={() => navigate('/events')} className="flex-1">
                    Browse More Events
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Event Info */}
                <div className="flex gap-3">
                  <div className="w-16 h-16 bg-muted rounded-lg flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-sm">{eventData.title}</h4>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <Calendar className="h-3 w-3" />
                      {eventData.date} at {eventData.time}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {eventData.location}
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Selected Tickets */}
                {Object.entries(selectedTickets).map(([ticketId, quantity]) => {
                  if (quantity === 0) return null;
                  const ticket = ticketTypes.find(t => t.id === ticketId);
                  return (
                    <div key={ticketId} className="flex justify-between text-sm">
                      <span>{ticket?.name} x {quantity}</span>
                      <span>KES {((ticket?.price || 0) * quantity).toLocaleString()}</span>
                    </div>
                  );
                })}

                {Object.values(selectedTickets).every(q => q === 0) && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No tickets selected yet
                  </p>
                )}

                <Separator />

                {/* Promo Code */}
                {paymentStep === 2 && (
                  <>
                    <div>
                      <Label htmlFor="promo" className="text-sm">Promo Code</Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          id="promo"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Enter code"
                          className="h-9"
                        />
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={handleApplyPromo}
                        >
                          Apply
                        </Button>
                      </div>
                    </div>
                    <Separator />
                  </>
                )}

                {/* Price Breakdown */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>KES {calculateSubtotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service Fee</span>
                    <span>KES {calculateServiceFee().toLocaleString()}</span>
                  </div>
                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-KES {promoDiscount.toLocaleString()}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-semibold text-base">
                    <span>Total</span>
                    <span>KES {calculateTotal().toLocaleString()}</span>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-xs">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span>Your payment is secure and encrypted</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;