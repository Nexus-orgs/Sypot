# 🚀 Production Deployment Guide for Sypot

## 📋 Pre-Deployment Checklist

### ✅ Security Checklist

- [ ] Run security audit: `npm run security:audit`
- [ ] Update all dependencies: `npm update`
- [ ] Fix any critical vulnerabilities: `npm audit fix`
- [ ] Review and remove all `console.log` statements
- [ ] Verify environment variables are set correctly
- [ ] Ensure HTTPS is enforced
- [ ] Check CSP headers are configured
- [ ] Verify rate limiting is enabled
- [ ] Test authentication flow thoroughly
- [ ] Review input validation on all forms

### 🔐 Environment Configuration

1. **Copy production environment template:**
   ```bash
   cp .env.production .env
   ```

2. **Configure required variables:**
   ```env
   # Supabase (REQUIRED for production)
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   
   # App URL (REQUIRED)
   VITE_APP_URL=https://sypot.com
   
   # Security Keys (REQUIRED - Generate strong random strings)
   VITE_ENCRYPTION_KEY=<32-char-random-string>
   VITE_JWT_SECRET=<32-char-random-string>
   VITE_CSRF_SECRET=<32-char-random-string>
   
   # Third-party services (Optional but recommended)
   VITE_GOOGLE_ANALYTICS_ID=GA-XXXXXXXXX
   VITE_STRIPE_PUBLIC_KEY=pk_live_xxxxx
   VITE_SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
   ```

3. **Generate secure keys:**
   ```bash
   # Generate 32-character random strings for security keys
   openssl rand -hex 32
   ```

## 🏗️ Build Process

### 1. Install Dependencies
```bash
npm install --production
```

### 2. Run Tests
```bash
# Run all tests
npm run test

# Run with visual debugging if needed
npm run test:headed
```

### 3. Build for Production
```bash
npm run build:prod
```

### 4. Preview Build Locally
```bash
npm run preview
```

## 🛡️ Security Configuration

### Content Security Policy (CSP)
The application includes comprehensive CSP headers in `/src/lib/security/headers.ts`:
- Prevents XSS attacks
- Controls resource loading
- Enforces HTTPS
- Blocks unsafe inline scripts

### SQL Injection Prevention
- All database queries use parameterized statements via Supabase
- Input validation with Zod schemas
- HTML sanitization with DOMPurify

### Rate Limiting
Configured per endpoint:
- Auth endpoints: 5 attempts/15 min
- API endpoints: 100 requests/15 min
- File uploads: 10 uploads/hour
- Event creation: 20 events/hour

### Authentication Security
- Mock authentication disabled in production
- CSRF token validation
- Secure session management
- Password requirements enforced

## 🔍 SEO Configuration

### Indexed Pages (Allow crawlers)
The following pages are optimized for search engine indexing:
- `/` - Homepage
- `/about` - About Us
- `/features` - Features
- `/pricing` - Pricing
- `/events` - Events listing
- `/explore` - Explore events
- `/discover` - Discover experiences
- `/blog` - Blog content
- `/help` - Help center
- `/contact` - Contact page
- `/careers` - Career opportunities
- `/business-solutions` - Business features
- `/success-stories` - Case studies
- `/resources` - Resource center

### Protected Pages (Blocked from indexing)
- `/admin/*` - Admin dashboard
- `/profile/*` - User profiles
- `/settings/*` - User settings
- `/dashboard/*` - User dashboards
- `/chat/*` - Private messages
- `/checkout/*` - Payment pages
- `/api/*` - API endpoints

### Structured Data
The app includes rich structured data for:
- Organization info
- Event listings
- Business profiles
- Breadcrumb navigation
- Search functionality

### Sitemap
- Main sitemap: `/sitemap.xml`
- Updated daily for dynamic content
- Includes priority and change frequency

## 🚢 Deployment Options

### Option 1: Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Set environment variables in Vercel dashboard
```

### Option 2: Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist

# Set environment variables in Netlify dashboard
```

### Option 3: Cloudflare Pages
```bash
# Build the project
npm run build:prod

# Deploy via Cloudflare dashboard or Wrangler CLI
npx wrangler pages deploy dist --project-name=sypot
```

### Option 4: Traditional Server (Nginx)
```nginx
server {
    listen 443 ssl http2;
    server_name sypot.com;
    
    # SSL configuration
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload";
    add_header X-Frame-Options "DENY";
    add_header X-Content-Type-Options "nosniff";
    add_header X-XSS-Protection "1; mode=block";
    
    # Serve static files
    root /var/www/sypot/dist;
    
    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## 📊 Monitoring & Analytics

### 1. Google Analytics
- Set `VITE_GOOGLE_ANALYTICS_ID` in environment
- Tracks page views, events, and user behavior
- GDPR compliant with cookie consent

### 2. Error Tracking (Sentry)
- Set `VITE_SENTRY_DSN` in environment
- Captures JavaScript errors
- Performance monitoring
- User feedback collection

### 3. Application Monitoring
- Monitor API response times
- Track rate limit hits
- Monitor authentication failures
- Database query performance

## 🔄 Post-Deployment

### 1. Verify Deployment
```bash
# Check robots.txt
curl https://sypot.com/robots.txt

# Check sitemap
curl https://sypot.com/sitemap.xml

# Test CSP headers
curl -I https://sypot.com
```

### 2. Monitor Performance
- [ ] Page load time < 3 seconds
- [ ] Time to Interactive < 5 seconds
- [ ] Lighthouse score > 90
- [ ] Core Web Vitals passing

### 3. SEO Verification
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify meta tags are rendering
- [ ] Check structured data in Google's Rich Results Test

### 4. Security Verification
- [ ] Run SSL Labs test (should get A+ rating)
- [ ] Test rate limiting on API endpoints
- [ ] Verify authentication flow
- [ ] Check for exposed sensitive data
- [ ] Test CORS configuration

## 🐛 Troubleshooting

### Common Issues

1. **Environment variables not loading**
   - Ensure `.env` file is in root directory
   - Variables must start with `VITE_`
   - Restart build process after changes

2. **CORS errors**
   - Check `VITE_APP_URL` matches deployment URL
   - Verify Supabase URL is correct
   - Update CORS settings in Supabase dashboard

3. **Authentication not working**
   - Verify Supabase credentials
   - Check redirect URLs in Supabase
   - Ensure mock auth is disabled (`VITE_ENABLE_MOCK_AUTH=false`)

4. **Rate limiting too strict**
   - Adjust limits in `/src/lib/security/headers.ts`
   - Consider IP whitelisting for known services
   - Monitor and adjust based on usage patterns

## 📞 Support

For deployment issues or questions:
- Email: support@sypot.com
- Documentation: https://docs.sypot.com
- GitHub Issues: https://github.com/sypot/sypot/issues

## 📝 Final Notes

- Always backup before major deployments
- Use staging environment for testing
- Monitor error rates after deployment
- Keep dependencies updated regularly
- Review security audit monthly
- Update sitemap for new content
- Test on multiple devices/browsers
- Monitor SEO rankings and adjust

---

**Last Updated:** September 24, 2025
**Version:** 1.0.0