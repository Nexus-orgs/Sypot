import { loadStripe, Stripe } from '@stripe/stripe-js';
import { supabase } from '@/lib/supabase-client';

// Initialize Stripe
let stripePromise: Promise<Stripe | null>;
if (import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY) {
  stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
}

export interface PaymentDetails {
  amount: number;
  currency: string;
  description: string;
  metadata?: Record<string, any>;
}

export interface MpesaPaymentRequest {
  phoneNumber: string;
  amount: number;
  accountReference: string;
  transactionDesc: string;
}

class PaymentService {
  // Stripe Payment Methods
  async createStripePaymentIntent(details: PaymentDetails) {
    try {
      const { data, error } = await supabase.functions.invoke('create-payment-intent', {
        body: details
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw error;
    }
  }

  async confirmStripePayment(clientSecret: string, paymentMethod: any) {
    const stripe = await stripePromise;
    if (!stripe) throw new Error('Stripe not initialized');

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod
    });

    if (result.error) {
      throw new Error(result.error.message);
    }

    return result.paymentIntent;
  }

  async createStripeCheckoutSession(items: any[], successUrl: string, cancelUrl: string) {
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: {
          items,
          success_url: successUrl,
          cancel_url: cancelUrl
        }
      });

      if (error) throw error;
      
      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe not initialized');
      
      const { error: redirectError } = await stripe.redirectToCheckout({
        sessionId: data.sessionId
      });
      
      if (redirectError) throw redirectError;
      
      return data;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw error;
    }
  }

  // M-Pesa Payment Methods
  async initiateMpesaPayment(request: MpesaPaymentRequest) {
    try {
      const { data, error } = await supabase.functions.invoke('mpesa-stk-push', {
        body: request
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error initiating M-Pesa payment:', error);
      throw error;
    }
  }

  async checkMpesaPaymentStatus(checkoutRequestId: string) {
    try {
      const { data, error } = await supabase.functions.invoke('mpesa-query', {
        body: { checkoutRequestId }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error checking M-Pesa payment status:', error);
      throw error;
    }
  }

  // Generic Payment Processing
  async processPayment(
    bookingId: string,
    paymentMethod: 'card' | 'mpesa' | 'paypal',
    paymentDetails: any
  ) {
    try {
      // Get booking details
      const { data: booking, error: bookingError } = await supabase
        .from('bookings')
        .select('*')
        .eq('id', bookingId)
        .single();

      if (bookingError) throw bookingError;

      let paymentResult;

      switch (paymentMethod) {
        case 'card':
          paymentResult = await this.processCardPayment(booking, paymentDetails);
          break;
        case 'mpesa':
          paymentResult = await this.processMpesaPayment(booking, paymentDetails);
          break;
        case 'paypal':
          // PayPal integration would go here
          throw new Error('PayPal payment not yet implemented');
        default:
          throw new Error('Invalid payment method');
      }

      // Update booking with payment information
      const { error: updateError } = await supabase
        .from('bookings')
        .update({
          payment_status: 'completed',
          payment_method: paymentMethod,
          stripe_payment_intent_id: paymentResult.stripe_payment_intent_id,
          mpesa_transaction_id: paymentResult.mpesa_transaction_id,
          updated_at: new Date().toISOString()
        })
        .eq('id', bookingId);

      if (updateError) throw updateError;

      // Create transaction record
      await this.createTransaction({
        booking_id: bookingId,
        user_id: booking.user_id,
        type: 'payment',
        amount: booking.total_amount,
        currency: booking.currency,
        status: 'completed',
        payment_method: paymentMethod,
        gateway: paymentMethod === 'card' ? 'stripe' : 'mpesa',
        gateway_transaction_id: paymentResult.transaction_id
      });

      return paymentResult;
    } catch (error) {
      console.error('Error processing payment:', error);
      throw error;
    }
  }

  private async processCardPayment(booking: any, paymentDetails: any) {
    const paymentIntent = await this.createStripePaymentIntent({
      amount: Math.round(booking.total_amount * 100), // Convert to cents
      currency: booking.currency.toLowerCase(),
      description: `Booking ${booking.booking_reference}`,
      metadata: {
        booking_id: booking.id,
        user_id: booking.user_id,
        event_id: booking.event_id
      }
    });

    const result = await this.confirmStripePayment(
      paymentIntent.client_secret,
      paymentDetails.payment_method
    );

    return {
      success: true,
      transaction_id: result.id,
      stripe_payment_intent_id: result.id
    };
  }

  private async processMpesaPayment(booking: any, paymentDetails: any) {
    const mpesaResult = await this.initiateMpesaPayment({
      phoneNumber: paymentDetails.phone_number,
      amount: booking.total_amount,
      accountReference: booking.booking_reference,
      transactionDesc: `Event booking ${booking.booking_reference}`
    });

    // Poll for payment confirmation (in production, use webhooks)
    let attempts = 0;
    const maxAttempts = 30; // 30 seconds timeout

    while (attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
      
      const status = await this.checkMpesaPaymentStatus(mpesaResult.CheckoutRequestID);
      
      if (status.ResultCode === '0') {
        return {
          success: true,
          transaction_id: status.MpesaReceiptNumber,
          mpesa_transaction_id: status.MpesaReceiptNumber
        };
      } else if (status.ResultCode && status.ResultCode !== '0') {
        throw new Error(`M-Pesa payment failed: ${status.ResultDesc}`);
      }
      
      attempts++;
    }

    throw new Error('M-Pesa payment timeout');
  }

  private async createTransaction(transactionData: any) {
    const { error } = await supabase
      .from('transactions')
      .insert({
        ...transactionData,
        completed_at: new Date().toISOString()
      });

    if (error) {
      console.error('Error creating transaction record:', error);
    }
  }

  // Refund Methods
  async processRefund(bookingId: string, amount?: number, reason?: string) {
    try {
      const { data: booking, error: bookingError } = await supabase
        .from('bookings')
        .select('*')
        .eq('id', bookingId)
        .single();

      if (bookingError) throw bookingError;

      const refundAmount = amount || booking.total_amount;

      let refundResult;
      
      if (booking.stripe_payment_intent_id) {
        // Process Stripe refund
        const { data, error } = await supabase.functions.invoke('create-refund', {
          body: {
            payment_intent_id: booking.stripe_payment_intent_id,
            amount: Math.round(refundAmount * 100),
            reason
          }
        });

        if (error) throw error;
        refundResult = data;
      } else if (booking.mpesa_transaction_id) {
        // M-Pesa refunds would need to be handled differently
        // Usually through a manual process or reversal API
        throw new Error('M-Pesa refunds must be processed manually');
      }

      // Update booking status
      await supabase
        .from('bookings')
        .update({
          status: 'refunded',
          payment_status: 'refunded',
          updated_at: new Date().toISOString()
        })
        .eq('id', bookingId);

      // Create refund transaction
      await this.createTransaction({
        booking_id: bookingId,
        user_id: booking.user_id,
        type: 'refund',
        amount: refundAmount,
        currency: booking.currency,
        status: 'completed',
        payment_method: booking.payment_method,
        gateway: booking.stripe_payment_intent_id ? 'stripe' : 'mpesa',
        gateway_transaction_id: refundResult?.id
      });

      return refundResult;
    } catch (error) {
      console.error('Error processing refund:', error);
      throw error;
    }
  }

  // Payment Method Management
  async savePaymentMethod(paymentMethodId: string, type: 'card' | 'mpesa') {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) throw new Error('User not authenticated');

    if (type === 'card') {
      // Retrieve payment method details from Stripe
      const { data, error } = await supabase.functions.invoke('get-payment-method', {
        body: { payment_method_id: paymentMethodId }
      });

      if (error) throw error;

      // Save to database
      const { error: saveError } = await supabase
        .from('payment_methods')
        .insert({
          user_id: userData.user.id,
          type: 'card',
          card_last4: data.card.last4,
          card_brand: data.card.brand,
          card_exp_month: data.card.exp_month,
          card_exp_year: data.card.exp_year,
          stripe_payment_method_id: paymentMethodId
        });

      if (saveError) throw saveError;
    }
  }

  async getPaymentMethods() {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('payment_methods')
      .select('*')
      .eq('user_id', userData.user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async deletePaymentMethod(paymentMethodId: string) {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('payment_methods')
      .delete()
      .eq('id', paymentMethodId)
      .eq('user_id', userData.user.id);

    if (error) throw error;
  }
}

export const paymentService = new PaymentService();