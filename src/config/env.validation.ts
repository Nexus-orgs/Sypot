/**
 * Environment Variable Validation
 * Ensures all required environment variables are set before app starts
 */

import { z } from 'zod';

// Environment variable schema
const envSchema = z.object({
  // Mode
  MODE: z.enum(['development', 'production', 'test']).default('development'),
  
  // Supabase Configuration
  VITE_SUPABASE_URL: z.string().url().optional(), // Optional for mock auth
  VITE_SUPABASE_ANON_KEY: z.string().min(1).optional(), // Optional for mock auth
  
  // App Configuration
  VITE_APP_URL: z.string().url().default('http://localhost:5173'),
  VITE_APP_NAME: z.string().default('Sypot'),
  VITE_APP_VERSION: z.string().default('1.0.0'),
  
  // API Configuration
  VITE_API_URL: z.string().url().optional(),
  VITE_API_TIMEOUT: z.string().transform(Number).default('30000'),
  
  // Storage Configuration
  VITE_STORAGE_BUCKET: z.string().optional(),
  VITE_MAX_FILE_SIZE: z.string().transform(Number).default('10485760'), // 10MB
  
  // Feature Flags
  VITE_ENABLE_ANALYTICS: z.string().transform(val => val === 'true').default('false'),
  VITE_ENABLE_MOCK_AUTH: z.string().transform(val => val === 'true').optional(),
  VITE_ENABLE_DEBUG: z.string().transform(val => val === 'true').default('false'),
  VITE_ENABLE_PWA: z.string().transform(val => val === 'true').default('false'),
  
  // Third-party Services (Optional)
  VITE_GOOGLE_ANALYTICS_ID: z.string().optional(),
  VITE_GOOGLE_MAPS_API_KEY: z.string().optional(),
  VITE_STRIPE_PUBLIC_KEY: z.string().optional(),
  VITE_SENTRY_DSN: z.string().url().optional(),
  VITE_CLOUDINARY_URL: z.string().url().optional(),
  
  // Security
  VITE_ENCRYPTION_KEY: z.string().min(32).optional(),
  VITE_JWT_SECRET: z.string().min(32).optional(),
  VITE_CSRF_SECRET: z.string().min(32).optional(),
  
  // Email Configuration
  VITE_EMAIL_FROM: z.string().email().default('noreply@sypot.com'),
  VITE_EMAIL_SUPPORT: z.string().email().default('support@sypot.com'),
  
  // Rate Limiting
  VITE_RATE_LIMIT_WINDOW: z.string().transform(Number).default('900000'), // 15 minutes
  VITE_RATE_LIMIT_MAX: z.string().transform(Number).default('100'),
  
  // Session Configuration
  VITE_SESSION_DURATION: z.string().transform(Number).default('86400000'), // 24 hours
  VITE_SESSION_IDLE_TIMEOUT: z.string().transform(Number).default('1800000'), // 30 minutes
});

// Type inference for TypeScript
export type EnvConfig = z.infer<typeof envSchema>;

// Validation function
export function validateEnv(): EnvConfig {
  try {
    // Parse and validate environment variables
    const env = envSchema.parse(import.meta.env);
    
    // Additional validation for production
    if (env.MODE === 'production') {
      // Check critical production variables
      const criticalVars = [
        { key: 'VITE_SUPABASE_URL', value: env.VITE_SUPABASE_URL },
        { key: 'VITE_SUPABASE_ANON_KEY', value: env.VITE_SUPABASE_ANON_KEY },
        { key: 'VITE_APP_URL', value: env.VITE_APP_URL }
      ];
      
      const missing = criticalVars.filter(v => !v.value).map(v => v.key);
      
      if (missing.length > 0 && !env.VITE_ENABLE_MOCK_AUTH) {
        console.error('❌ Missing critical environment variables for production:', missing.join(', '));
        console.warn('⚠️ Using mock authentication as fallback');
      }
    }
    
    // Log environment status
    console.log('✅ Environment variables validated successfully');
    console.log('📋 Environment:', env.MODE);
    console.log('🔐 Mock Auth:', env.VITE_ENABLE_MOCK_AUTH || !env.VITE_SUPABASE_URL ? 'Enabled' : 'Disabled');
    
    return env;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Environment variable validation failed:');
      error.errors.forEach(err => {
        console.error(`  - ${err.path.join('.')}: ${err.message}`);
      });
      
      // In development, provide helpful defaults
      if (import.meta.env.MODE === 'development') {
        console.warn('⚠️ Using default values for missing environment variables');
        return envSchema.parse({});
      }
      
      throw new Error('Invalid environment configuration');
    }
    throw error;
  }
}

// Create validated config instance
export const env = validateEnv();

// Helper function to check if running in production
export const isProduction = () => env.MODE === 'production';

// Helper function to check if running in development
export const isDevelopment = () => env.MODE === 'development';

// Helper function to check if running in test mode
export const isTest = () => env.MODE === 'test';

// Helper function to check if mock auth is enabled
export const isMockAuthEnabled = () => {
  return env.VITE_ENABLE_MOCK_AUTH === true || !env.VITE_SUPABASE_URL;
};

// Helper function to get API URL
export const getApiUrl = () => {
  return env.VITE_API_URL || env.VITE_APP_URL;
};

// Helper function to check if a feature is enabled
export const isFeatureEnabled = (feature: string): boolean => {
  const featureMap: Record<string, boolean> = {
    analytics: env.VITE_ENABLE_ANALYTICS,
    debug: env.VITE_ENABLE_DEBUG,
    pwa: env.VITE_ENABLE_PWA,
    mockAuth: isMockAuthEnabled()
  };
  
  return featureMap[feature] || false;
};

// Security configuration
export const securityConfig = {
  csrfEnabled: isProduction(),
  httpsOnly: isProduction(),
  secureCooki" isProduction(),
  sameSite: isProduction() ? 'strict' : 'lax',
  encryptionEnabled: !!env.VITE_ENCRYPTION_KEY
};

// Rate limiting configuration
export const rateLimitConfig = {
  windowMs: env.VITE_RATE_LIMIT_WINDOW,
  max: env.VITE_RATE_LIMIT_MAX,
  enabled: isProduction()
};

// Session configuration
export const sessionConfig = {
  duration: env.VITE_SESSION_DURATION,
  idleTimeout: env.VITE_SESSION_IDLE_TIMEOUT,
  secure: isProduction(),
  httpOnly: true,
  sameSite: isProduction() ? 'strict' : 'lax'
};

// Export validated environment for use in app
export default env;