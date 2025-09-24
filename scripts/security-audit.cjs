#!/usr/bin/env node

/**
 * Security Audit Script
 * Run this before deploying to production
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔒 Starting Security Audit...\n');

const issues = [];
const warnings = [];
const passed = [];

// 1. Check for exposed sensitive files
console.log('📁 Checking for exposed sensitive files...');
const sensitiveFiles = [
  '.env',
  '.env.local',
  '.env.development',
  'firebase.json',
  'serviceAccount.json',
  'credentials.json',
  'config.json',
  'secrets.json'
];

sensitiveFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (fs.existsSync(filePath)) {
    // Check if it's in .gitignore
    const gitignorePath = path.join(__dirname, '..', '.gitignore');
    const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
    
    if (!gitignoreContent.includes(file)) {
      issues.push(`❌ Sensitive file "${file}" is not in .gitignore`);
    } else {
      passed.push(`✅ Sensitive file "${file}" is properly ignored`);
    }
  }
});

// 2. Check npm audit
console.log('\n📦 Running npm audit...');
try {
  const auditResult = execSync('npm audit --json', { encoding: 'utf8' });
  const audit = JSON.parse(auditResult);
  
  if (audit.metadata.vulnerabilities.total > 0) {
    const { critical, high, moderate, low } = audit.metadata.vulnerabilities;
    
    if (critical > 0) {
      issues.push(`❌ ${critical} critical vulnerabilities found`);
    }
    if (high > 0) {
      issues.push(`❌ ${high} high severity vulnerabilities found`);
    }
    if (moderate > 0) {
      warnings.push(`⚠️ ${moderate} moderate severity vulnerabilities found`);
    }
    if (low > 0) {
      warnings.push(`⚠️ ${low} low severity vulnerabilities found`);
    }
  } else {
    passed.push('✅ No known vulnerabilities in dependencies');
  }
} catch (error) {
  // npm audit returns non-zero exit code when vulnerabilities are found
  warnings.push('⚠️ Some vulnerabilities found in dependencies - run "npm audit" for details');
}

// 3. Check for hardcoded secrets
console.log('\n🔑 Scanning for hardcoded secrets...');
const codeExtensions = ['.js', '.jsx', '.ts', '.tsx', '.json'];
const secretPatterns = [
  /api[_-]?key\s*[:=]\s*["'][^"']+["']/gi,
  /secret\s*[:=]\s*["'][^"']+["']/gi,
  /password\s*[:=]\s*["'][^"']+["']/gi,
  /token\s*[:=]\s*["'][^"']+["']/gi,
  /private[_-]?key\s*[:=]\s*["'][^"']+["']/gi,
  /aws[_-]?access[_-]?key/gi,
  /stripe[_-]?key/gi,
  /supabase[_-]?key/gi
];

function scanDirectory(dir, patterns) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    // Skip node_modules and .git
    if (file === 'node_modules' || file === '.git' || file === 'dist' || file === 'build') {
      return;
    }
    
    if (stat.isDirectory()) {
      scanDirectory(filePath, patterns);
    } else if (codeExtensions.includes(path.extname(file))) {
      const content = fs.readFileSync(filePath, 'utf8');
      
      patterns.forEach(pattern => {
        const matches = content.match(pattern);
        if (matches) {
          const relativePath = path.relative(process.cwd(), filePath);
          
          // Skip if it's in test files or example files
          if (relativePath.includes('test') || relativePath.includes('example') || relativePath.includes('.env.')) {
            return;
          }
          
          // Check if it's using environment variables
          matches.forEach(match => {
            if (!match.includes('process.env') && !match.includes('import.meta.env')) {
              warnings.push(`⚠️ Potential hardcoded secret in ${relativePath}: ${match.substring(0, 50)}...`);
            }
          });
        }
      });
    }
  });
}

scanDirectory(path.join(__dirname, '..', 'src'), secretPatterns);

// 4. Check HTTPS enforcement
console.log('\n🔐 Checking HTTPS enforcement...');
const htmlFile = path.join(__dirname, '..', 'index.html');
if (fs.existsSync(htmlFile)) {
  const htmlContent = fs.readFileSync(htmlFile, 'utf8');
  
  if (!htmlContent.includes('upgrade-insecure-requests')) {
    warnings.push('⚠️ Consider adding upgrade-insecure-requests CSP directive');
  } else {
    passed.push('✅ HTTPS upgrade is enforced');
  }
}

// 5. Check for console.log statements
console.log('\n📝 Checking for console.log statements...');
let consoleCount = 0;
function checkConsoleLogs(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (file === 'node_modules' || file === '.git' || file === 'dist' || file === 'build') {
      return;
    }
    
    if (stat.isDirectory()) {
      checkConsoleLogs(filePath);
    } else if (['.js', '.jsx', '.ts', '.tsx'].includes(path.extname(file))) {
      const content = fs.readFileSync(filePath, 'utf8');
      const matches = content.match(/console\.(log|info|warn|error)/g);
      if (matches) {
        consoleCount += matches.length;
      }
    }
  });
}

checkConsoleLogs(path.join(__dirname, '..', 'src'));
if (consoleCount > 0) {
  warnings.push(`⚠️ Found ${consoleCount} console statements in code - remove for production`);
} else {
  passed.push('✅ No console statements found');
}

// 6. Check environment variables
console.log('\n🔧 Checking environment configuration...');
const envExampleFile = path.join(__dirname, '..', '.env.example');
const envProdFile = path.join(__dirname, '..', '.env.production');

if (!fs.existsSync(envExampleFile)) {
  warnings.push('⚠️ No .env.example file found - create one for documentation');
} else {
  passed.push('✅ Environment example file exists');
}

if (!fs.existsSync(envProdFile)) {
  warnings.push('⚠️ No .env.production template found');
} else {
  passed.push('✅ Production environment template exists');
}

// 7. Check security headers configuration
console.log('\n🛡️ Checking security headers...');
const securityHeadersFile = path.join(__dirname, '..', 'src', 'lib', 'security', 'headers.ts');
if (fs.existsSync(securityHeadersFile)) {
  passed.push('✅ Security headers configuration found');
} else {
  issues.push('❌ Security headers not configured');
}

// Print results
console.log('\n' + '='.repeat(60));
console.log('📊 SECURITY AUDIT RESULTS');
console.log('='.repeat(60));

if (passed.length > 0) {
  console.log('\n✅ PASSED CHECKS:');
  passed.forEach(p => console.log('  ' + p));
}

if (warnings.length > 0) {
  console.log('\n⚠️ WARNINGS:');
  warnings.forEach(w => console.log('  ' + w));
}

if (issues.length > 0) {
  console.log('\n❌ CRITICAL ISSUES:');
  issues.forEach(i => console.log('  ' + i));
}

// Summary
console.log('\n' + '='.repeat(60));
console.log('📈 SUMMARY:');
console.log(`  ✅ Passed: ${passed.length}`);
console.log(`  ⚠️ Warnings: ${warnings.length}`);
console.log(`  ❌ Issues: ${issues.length}`);
console.log('='.repeat(60));

if (issues.length > 0) {
  console.log('\n❌ Security audit failed! Fix critical issues before deploying.');
  process.exit(1);
} else if (warnings.length > 0) {
  console.log('\n⚠️ Security audit passed with warnings. Review and fix if necessary.');
  process.exit(0);
} else {
  console.log('\n✅ Security audit passed! Ready for production.');
  process.exit(0);
}