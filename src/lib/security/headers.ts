/**
 * Security headers configuration for production
 * These headers protect against common web vulnerabilities
 */

export const securityHeaders = {
  // Content Security Policy - Prevents XSS attacks
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com https://www.googletagmanager.com https://www.google-analytics.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: https: blob:",
    "font-src 'self' data: https://fonts.gstatic.com",
    "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api.dicebear.com https://images.unsplash.com https://www.google-analytics.com",
    "media-src 'self' blob:",
    "object-src 'none'",
    "frame-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests"
  ].join('; '),
  
  // Prevent clickjacking attacks
  'X-Frame-Options': 'DENY',
  
  // Prevent MIME type sniffing
  'X-Content-Type-Options': 'nosniff',
  
  // Enable XSS protection in older browsers
  'X-XSS-Protection': '1; mode=block',
  
  // Control referrer information
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  
  // Permissions Policy (formerly Feature Policy)
  'Permissions-Policy': [
    'accelerometer=()',
    'camera=()',
    'geolocation=(self)',
    'gyroscope=()',
    'magnetometer=()',
    'microphone=()',
    'payment=()',
    'usb=()'
  ].join(', '),
  
  // HSTS - Force HTTPS
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  
  // Prevent DNS prefetching
  'X-DNS-Prefetch-Control': 'off',
  
  // IE8+ protection
  'X-Download-Options': 'noopen',
  
  // Disable powered-by header
  'X-Powered-By': ''
};

/**
 * CORS configuration for API endpoints
 */
export const corsConfig = {
  origin: process.env.NODE_ENV === 'production' 
    ? [
        process.env.VITE_APP_URL || 'https://sypot.com',
        'https://www.sypot.com'
      ]
    : ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:8080', 'http://localhost:8081'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'X-CSRF-Token'],
  exposedHeaders: ['X-Total-Count', 'X-Page-Count'],
  maxAge: 86400 // 24 hours
};

/**
 * Rate limiting configuration
 */
export const rateLimitConfig = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  
  // Different limits for different endpoints
  endpoints: {
    '/api/auth/login': {
      windowMs: 15 * 60 * 1000,
      max: 5, // 5 login attempts per 15 minutes
      skipSuccessfulRequests: true
    },
    '/api/auth/signup': {
      windowMs: 60 * 60 * 1000,
      max: 3, // 3 signups per hour
      skipSuccessfulRequests: false
    },
    '/api/auth/password-reset': {
      windowMs: 60 * 60 * 1000,
      max: 3, // 3 password reset requests per hour
      skipSuccessfulRequests: false
    },
    '/api/events/create': {
      windowMs: 60 * 60 * 1000,
      max: 10, // 10 events per hour
      skipSuccessfulRequests: false
    },
    '/api/bookings': {
      windowMs: 60 * 60 * 1000,
      max: 20, // 20 bookings per hour
      skipSuccessfulRequests: false
    }
  }
};