#!/usr/bin/env node

/**
 * Production Validation Script
 * Comprehensive checks before deployment
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Starting Production Validation...\n');

const results = {
  passed: [],
  warnings: [],
  errors: []
};

// 1. Check Environment Configuration
console.log('🔧 Validating Environment Configuration...');
const envFiles = ['.env.example', '.env.production'];
envFiles.forEach(file => {
  if (fs.existsSync(path.join(__dirname, '..', file))) {
    results.passed.push(`✅ ${file} exists`);
  } else {
    results.warnings.push(`⚠️ Missing ${file}`);
  }
});

// 2. Check Critical Files
console.log('\n📁 Validating Critical Files...');
const criticalFiles = [
  'public/robots.txt',
  'public/sitemap.xml',
  'public/favicon.ico',
  'src/lib/security/headers.ts',
  'src/lib/security/validation.ts',
  'src/config/env.validation.ts',
  'PRODUCTION_DEPLOYMENT.md'
];

criticalFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (fs.existsSync(filePath)) {
    results.passed.push(`✅ ${file} present`);
  } else {
    results.errors.push(`❌ Missing critical file: ${file}`);
  }
});

// 3. Check Authentication System
console.log('\n🔐 Validating Authentication System...');
const authFiles = [
  'src/hooks/useAuth.tsx',
  'src/lib/mock-auth.ts',
  'src/components/ProtectedRoute.tsx',
  'src/pages/Auth.tsx'
];

authFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check for mock auth handling
    if (content.includes('mockAuth')) {
      results.passed.push(`✅ ${file} has mock auth support`);
    }
    
    // Check for role-based auth
    if (content.includes('user_type') || content.includes('requiredRole')) {
      results.passed.push(`✅ ${file} has role-based auth`);
    }
  }
});

// 4. Check SEO Implementation
console.log('\n🔍 Validating SEO Configuration...');
const robotsPath = path.join(__dirname, '..', 'public', 'robots.txt');
if (fs.existsSync(robotsPath)) {
  const robotsContent = fs.readFileSync(robotsPath, 'utf8');
  
  // Check for sitemap reference
  if (robotsContent.includes('Sitemap:')) {
    results.passed.push('✅ Robots.txt has sitemap reference');
  }
  
  // Check for user-agent rules
  if (robotsContent.includes('User-agent:')) {
    results.passed.push('✅ Robots.txt has user-agent rules');
  }
  
  // Check for disallow rules for private areas
  const privateAreas = ['/admin/', '/dashboard/', '/profile/', '/settings/'];
  privateAreas.forEach(area => {
    if (robotsContent.includes(`Disallow: ${area}`)) {
      results.passed.push(`✅ ${area} blocked from indexing`);
    } else {
      results.warnings.push(`⚠️ ${area} not explicitly blocked in robots.txt`);
    }
  });
}

// 5. Check Page Components
console.log('\n📄 Validating Page Components...');
const requiredPages = [
  'Index', 'Auth', 'Explore', 'Events', 'EventDetails',
  'Profile', 'Settings', 'Chat', 'AdminDashboard',
  'OrganizerDashboard', 'BusinessDashboard', 'AboutUs',
  'Pricing', 'Features', 'Help', 'Privacy', 'Terms'
];

const pagesDir = path.join(__dirname, '..', 'src', 'pages');
requiredPages.forEach(page => {
  const pagePath = path.join(pagesDir, `${page}.tsx`);
  if (fs.existsSync(pagePath)) {
    results.passed.push(`✅ ${page} page exists`);
  } else {
    results.warnings.push(`⚠️ Missing page: ${page}`);
  }
});

// 6. Check Security Features
console.log('\n🛡️ Validating Security Features...');
const securityChecks = [
  {
    file: 'src/lib/security/validation.ts',
    features: ['emailSchema', 'passwordSchema', 'sanitizeHtml', 'detectSQLInjection']
  },
  {
    file: 'src/lib/security/headers.ts',
    features: ['Content-Security-Policy', 'X-Frame-Options', 'rateLimitConfig']
  },
  {
    file: 'src/lib/api/middleware.ts',
    features: ['rateLimit', 'validateCSRF', 'secureApiRequest']
  }
];

securityChecks.forEach(check => {
  const filePath = path.join(__dirname, '..', check.file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    check.features.forEach(feature => {
      if (content.includes(feature)) {
        results.passed.push(`✅ ${feature} implemented`);
      } else {
        results.errors.push(`❌ Missing security feature: ${feature}`);
      }
    });
  }
});

// 7. Check Component Features
console.log('\n🎨 Validating Component Features...');
const componentChecks = [
  { file: 'src/components/LikeButton.tsx', feature: 'Like functionality' },
  { file: 'src/components/ShareButton.tsx', feature: 'Share functionality' },
  { file: 'src/components/SearchBar.tsx', feature: 'Search functionality' },
  { file: 'src/components/Layout.tsx', feature: 'Layout with navigation' },
  { file: 'src/components/Footer.tsx', feature: 'Footer component' }
];

componentChecks.forEach(check => {
  const filePath = path.join(__dirname, '..', check.file);
  if (fs.existsSync(filePath)) {
    results.passed.push(`✅ ${check.feature} implemented`);
  } else {
    results.warnings.push(`⚠️ Missing: ${check.feature}`);
  }
});

// 8. Check Testing
console.log('\n🧪 Validating Testing Configuration...');
if (fs.existsSync(path.join(__dirname, '..', 'playwright.config.ts'))) {
  results.passed.push('✅ Playwright E2E testing configured');
  
  // Check for test files
  const testDir = path.join(__dirname, '..', 'tests', 'e2e');
  if (fs.existsSync(testDir)) {
    const testFiles = fs.readdirSync(testDir).filter(f => f.endsWith('.spec.ts'));
    results.passed.push(`✅ ${testFiles.length} E2E test files found`);
  }
}

// 9. Check Build Configuration
console.log('\n🏗️ Validating Build Configuration...');
const packageJsonPath = path.join(__dirname, '..', 'package.json');
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  const requiredScripts = ['build', 'build:prod', 'test', 'security:audit'];
  requiredScripts.forEach(script => {
    if (packageJson.scripts && packageJson.scripts[script]) {
      results.passed.push(`✅ Script "${script}" configured`);
    } else {
      results.errors.push(`❌ Missing script: ${script}`);
    }
  });
}

// 10. Check TypeScript Configuration
console.log('\n📝 Validating TypeScript Configuration...');
try {
  execSync('cd .. && npx tsc --noEmit', { 
    cwd: __dirname,
    stdio: 'pipe'
  });
  results.passed.push('✅ TypeScript compilation successful');
} catch (error) {
  const errorMsg = error.stdout ? error.stdout.toString() : 'TypeScript errors';
  if (errorMsg.includes('error')) {
    results.errors.push(`❌ TypeScript compilation errors found`);
  } else {
    results.warnings.push('⚠️ TypeScript check completed with warnings');
  }
}

// Print Results
console.log('\n' + '='.repeat(60));
console.log('📊 PRODUCTION VALIDATION RESULTS');
console.log('='.repeat(60));

if (results.passed.length > 0) {
  console.log('\n✅ PASSED (' + results.passed.length + '):');
  results.passed.forEach(item => console.log('  ' + item));
}

if (results.warnings.length > 0) {
  console.log('\n⚠️ WARNINGS (' + results.warnings.length + '):');
  results.warnings.forEach(item => console.log('  ' + item));
}

if (results.errors.length > 0) {
  console.log('\n❌ ERRORS (' + results.errors.length + '):');
  results.errors.forEach(item => console.log('  ' + item));
}

// Summary
console.log('\n' + '='.repeat(60));
console.log('📈 VALIDATION SUMMARY:');
console.log(`  ✅ Passed: ${results.passed.length}`);
console.log(`  ⚠️ Warnings: ${results.warnings.length}`);
console.log(`  ❌ Errors: ${results.errors.length}`);

// Production Readiness Score
const total = results.passed.length + results.warnings.length + results.errors.length;
const score = Math.round((results.passed.length / total) * 100);

console.log(`\n🎯 Production Readiness Score: ${score}%`);

if (score >= 90) {
  console.log('✅ Application is READY for production!');
} else if (score >= 70) {
  console.log('⚠️ Application needs minor improvements before production.');
} else {
  console.log('❌ Application needs significant work before production.');
}

console.log('='.repeat(60));

// Exit code based on errors
process.exit(results.errors.length > 0 ? 1 : 0);