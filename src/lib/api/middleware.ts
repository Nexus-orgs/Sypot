/**
 * API Middleware for Production
 * Handles rate limiting, authentication, and request validation
 */

import { RateLimiter } from '@/lib/security/validation';
import { validateCSRFToken, generateCSRFToken } from '@/lib/security/validation';
import { securityHeaders, corsConfig } from '@/lib/security/headers';
import { isProduction } from '@/config/env.validation';

// Rate limiters for different endpoints
const rateLimiters = {
  auth: new RateLimiter(5, 15 * 60 * 1000), // 5 attempts per 15 minutes
  api: new RateLimiter(100, 15 * 60 * 1000), // 100 requests per 15 minutes
  upload: new RateLimiter(10, 60 * 60 * 1000), // 10 uploads per hour
  events: new RateLimiter(20, 60 * 60 * 1000), // 20 event operations per hour
};

/**
 * Apply security headers to response
 */
export function applySecurityHeaders(response: Response): Response {
  const headers = new Headers(response.headers);
  
  Object.entries(securityHeaders).forEach(([key, value]) => {
    if (value) {
      headers.set(key, value);
    }
  });
  
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

/**
 * Rate limiting middleware
 */
export async function rateLimit(
  request: Request,
  endpoint: keyof typeof rateLimiters = 'api'
): Promise<Response | null> {
  // Skip rate limiting in development
  if (!isProduction()) {
    return null;
  }
  
  const ip = request.headers.get('x-forwarded-for') || 
              request.headers.get('x-real-ip') || 
              'unknown';
  
  const limiter = rateLimiters[endpoint];
  const key = `${endpoint}:${ip}`;
  
  if (!limiter.canAttempt(key)) {
    const retryAfter = Math.ceil(limiter.getRemainingTime(key) / 1000);
    
    return new Response(
      JSON.stringify({
        error: 'Too many requests',
        message: 'Please try again later',
        retryAfter
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': retryAfter.toString(),
          'X-RateLimit-Limit': '100',
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': new Date(Date.now() + retryAfter * 1000).toISOString()
        }
      }
    );
  }
  
  return null;
}

/**
 * CSRF protection middleware
 */
export function validateCSRF(request: Request): boolean {
  // Skip CSRF for GET requests
  if (request.method === 'GET' || request.method === 'HEAD') {
    return true;
  }
  
  // Skip in development
  if (!isProduction()) {
    return true;
  }
  
  const token = request.headers.get('x-csrf-token');
  const sessionToken = getSessionCSRFToken(request);
  
  if (!token || !sessionToken) {
    return false;
  }
  
  return validateCSRFToken(token, sessionToken);
}

/**
 * Get CSRF token from session/cookie
 */
function getSessionCSRFToken(request: Request): string | null {
  // In a real app, this would get the token from session/cookie
  const cookies = request.headers.get('cookie');
  if (!cookies) return null;
  
  const csrfCookie = cookies.split(';')
    .find(c => c.trim().startsWith('csrf-token='));
  
  if (!csrfCookie) return null;
  
  return csrfCookie.split('=')[1];
}

/**
 * API request wrapper with security middleware
 */
export async function secureApiRequest(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  // Apply security headers
  const headers = new Headers(options.headers);
  
  // Add CSRF token if needed
  if (isProduction() && options.method && ['POST', 'PUT', 'DELETE'].includes(options.method)) {
    const csrfToken = generateCSRFToken();
    headers.set('X-CSRF-Token', csrfToken);
    
    // Store token in cookie for validation
    document.cookie = `csrf-token=${csrfToken}; Path=/; SameSite=Strict; Secure`;
  }
  
  // Add request ID for tracking
  headers.set('X-Request-ID', generateRequestId());
  
  // Add timestamp
  headers.set('X-Request-Timestamp', new Date().toISOString());
  
  try {
    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include', // Include cookies
      mode: 'cors'
    });
    
    // Check for rate limit headers
    const remaining = response.headers.get('X-RateLimit-Remaining');
    if (remaining && parseInt(remaining) < 10) {
      console.warn(`⚠️ Rate limit warning: ${remaining} requests remaining`);
    }
    
    return response;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

/**
 * Generate unique request ID
 */
function generateRequestId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Sanitize and validate API response
 */
export function validateApiResponse<T>(response: any): T {
  // Remove any potentially dangerous fields
  const dangerousFields = ['__proto__', 'constructor', 'prototype'];
  
  function sanitize(obj: any): any {
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }
    
    if (Array.isArray(obj)) {
      return obj.map(sanitize);
    }
    
    const sanitized: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && !dangerousFields.includes(key)) {
        sanitized[key] = sanitize(obj[key]);
      }
    }
    
    return sanitized;
  }
  
  return sanitize(response) as T;
}

/**
 * API error handler
 */
export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public code?: string,
    public details?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
  
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      code: this.code,
      details: this.details
    };
  }
}

/**
 * Handle API errors consistently
 */
export function handleApiError(error: any): ApiError {
  if (error instanceof ApiError) {
    return error;
  }
  
  if (error.response) {
    return new ApiError(
      error.response.status,
      error.response.statusText || 'Request failed',
      error.code,
      error.response.data
    );
  }
  
  if (error.code === 'ECONNABORTED') {
    return new ApiError(408, 'Request timeout', 'TIMEOUT');
  }
  
  if (error.code === 'ENETWORK') {
    return new ApiError(0, 'Network error', 'NETWORK_ERROR');
  }
  
  return new ApiError(500, 'Internal server error', 'INTERNAL_ERROR');
}

/**
 * Retry logic for failed requests
 */
export async function retryRequest(
  fn: () => Promise<Response>,
  retries: number = 3,
  delay: number = 1000
): Promise<Response> {
  let lastError: any;
  
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;
      
      // Don't retry client errors
      if (error.status >= 400 && error.status < 500) {
        throw error;
      }
      
      // Wait before retrying
      if (i < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
      }
    }
  }
  
  throw lastError;
}