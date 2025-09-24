/**
 * Input validation and sanitization utilities
 * Prevents SQL injection, XSS, and other injection attacks
 */

import DOMPurify from 'isomorphic-dompurify';
import { z } from 'zod';

/**
 * SQL Injection Prevention
 * Always use parameterized queries with Supabase
 * Never concatenate user input directly into queries
 */

// Email validation schema
export const emailSchema = z.string()
  .email('Invalid email format')
  .min(5, 'Email too short')
  .max(255, 'Email too long')
  .toLowerCase()
  .transform(val => val.trim());

// Password validation schema
export const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password too long')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

// Username validation schema
export const usernameSchema = z.string()
  .min(3, 'Username too short')
  .max(30, 'Username too long')
  .regex(/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, underscores, and hyphens')
  .transform(val => val.trim());

// Generic text input validation
export const textInputSchema = z.string()
  .min(1, 'Field cannot be empty')
  .max(500, 'Text too long')
  .transform(val => sanitizeHtml(val.trim()));

// URL validation schema
export const urlSchema = z.string()
  .url('Invalid URL format')
  .regex(/^https?:\/\//, 'URL must start with http:// or https://')
  .max(2048, 'URL too long');

// Phone number validation
export const phoneSchema = z.string()
  .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format')
  .transform(val => val.replace(/\D/g, ''));

// Date validation
export const dateSchema = z.string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)')
  .refine(val => {
    const date = new Date(val);
    return !isNaN(date.getTime());
  }, 'Invalid date');

// UUID validation
export const uuidSchema = z.string()
  .uuid('Invalid ID format');

// Event creation schema
export const eventSchema = z.object({
  title: z.string()
    .min(5, 'Title too short')
    .max(100, 'Title too long')
    .transform(val => sanitizeHtml(val)),
  description: z.string()
    .min(20, 'Description too short')
    .max(5000, 'Description too long')
    .transform(val => sanitizeHtml(val)),
  date: dateSchema,
  time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Invalid time format (HH:MM)'),
  location: z.string()
    .min(5, 'Location too short')
    .max(200, 'Location too long')
    .transform(val => sanitizeHtml(val)),
  price: z.number().min(0).max(999999),
  capacity: z.number().int().min(1).max(100000),
  category: z.enum(['music', 'sports', 'arts', 'food', 'business', 'tech', 'other']),
  imageUrl: urlSchema.optional(),
  tags: z.array(z.string().max(30)).max(10).optional()
});

/**
 * Sanitize HTML content to prevent XSS attacks
 */
export function sanitizeHtml(input: string): string {
  // Configure DOMPurify for strict sanitization
  const config = {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
    ALLOW_DATA_ATTR: false,
    KEEP_CONTENT: true,
    SAFE_FOR_JQUERY: true
  };
  
  return DOMPurify.sanitize(input, config);
}

/**
 * Sanitize input for use in SQL queries
 * Note: Always prefer parameterized queries over this
 */
export function escapeSqlInput(input: string): string {
  if (typeof input !== 'string') return '';
  
  // Remove SQL meta-characters
  return input
    .replace(/['";\\]/g, '') // Remove quotes and backslashes
    .replace(/--/g, '') // Remove SQL comments
    .replace(/\/\*/g, '') // Remove multi-line comment start
    .replace(/\*\//g, '') // Remove multi-line comment end
    .replace(/xp_/gi, '') // Remove extended stored procedures
    .replace(/sp_/gi, '') // Remove system stored procedures
    .replace(/(union|select|insert|update|delete|drop|create|alter|exec|execute|script|javascript|eval)/gi, ''); // Remove SQL keywords
}

/**
 * Validate and sanitize file uploads
 */
export const fileUploadSchema = z.object({
  name: z.string().max(255),
  type: z.enum(['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'application/pdf']),
  size: z.number().max(10 * 1024 * 1024) // 10MB max
});

/**
 * Rate limit tracking for client-side
 */
export class RateLimiter {
  private attempts: Map<string, { count: number; resetTime: number }> = new Map();
  
  constructor(
    private maxAttempts: number = 5,
    private windowMs: number = 15 * 60 * 1000 // 15 minutes
  ) {}
  
  canAttempt(key: string): boolean {
    const now = Date.now();
    const attempt = this.attempts.get(key);
    
    if (!attempt || now > attempt.resetTime) {
      this.attempts.set(key, {
        count: 1,
        resetTime: now + this.windowMs
      });
      return true;
    }
    
    if (attempt.count >= this.maxAttempts) {
      return false;
    }
    
    attempt.count++;
    return true;
  }
  
  reset(key: string): void {
    this.attempts.delete(key);
  }
  
  getRemainingTime(key: string): number {
    const attempt = this.attempts.get(key);
    if (!attempt) return 0;
    
    const remaining = attempt.resetTime - Date.now();
    return remaining > 0 ? remaining : 0;
  }
}

/**
 * CSRF Token management
 */
export function generateCSRFToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

export function validateCSRFToken(token: string, storedToken: string): boolean {
  if (!token || !storedToken) return false;
  return token === storedToken;
}

/**
 * Input validation middleware for API routes
 */
export function validateInput<T>(schema: z.ZodSchema<T>) {
  return (data: unknown): T => {
    try {
      return schema.parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const messages = error.errors.map(e => `${e.path.join('.')}: ${e.message}`);
        throw new Error(`Validation failed: ${messages.join(', ')}`);
      }
      throw error;
    }
  };
}

/**
 * Secure random string generator
 */
export function generateSecureToken(length: number = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  
  return Array.from(array, byte => chars[byte % chars.length]).join('');
}

/**
 * Check for common SQL injection patterns
 * Returns true if suspicious patterns are found
 */
export function detectSQLInjection(input: string): boolean {
  const sqlPatterns = [
    /(\b)(union|select|insert|update|delete|drop|create|alter|exec|execute)(\b)/gi,
    /('|"|;|--|\*|\/\*|\*\/|xp_|sp_)/gi,
    /(=\s*or\s*|or\s*1\s*=\s*1|;\s*drop|;\s*delete|;\s*update)/gi,
    /(<script|javascript:|onerror=|onload=|eval\(|alert\()/gi
  ];
  
  return sqlPatterns.some(pattern => pattern.test(input));
}