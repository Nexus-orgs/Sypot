#!/usr/bin/env node

/**
 * React Native Setup Verification Script
 * This script checks if all required dependencies and configurations are in place
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 React Native Setup Verification\n');

let errors = [];
let warnings = [];
let success = [];

// Check critical files exist
const criticalFiles = [
  'index.js',
  'App.tsx',
  'package.json',
  'metro.config.js',
  'babel.config.js',
  'android/app/src/main/java/com/sypotapp/MainActivity.kt',
  'android/app/src/main/java/com/sypotapp/MainApplication.kt',
];

console.log('📁 Checking critical files...');
criticalFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    success.push(`✅ ${file} exists`);
  } else {
    errors.push(`❌ Missing: ${file}`);
  }
});

// Check if node_modules exists
if (fs.existsSync(path.join(__dirname, 'node_modules'))) {
  success.push('✅ node_modules installed');
} else {
  errors.push('❌ node_modules not installed - run: npm install --legacy-peer-deps');
}

// Check critical dependencies in node_modules
const criticalDeps = [
  'react-native-gesture-handler',
  'react-native-screens',
  'react-native-safe-area-context',
  '@react-navigation/native',
  '@react-navigation/stack',
  '@react-navigation/bottom-tabs',
];

console.log('\n📦 Checking critical dependencies...');
criticalDeps.forEach(dep => {
  const depPath = path.join(__dirname, 'node_modules', dep);
  if (fs.existsSync(depPath)) {
    success.push(`✅ ${dep} installed`);
  } else {
    errors.push(`❌ Missing dependency: ${dep}`);
  }
});

// Check gesture handler import in index.js
console.log('\n🔗 Checking native module imports...');
const indexContent = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');
if (indexContent.includes("import 'react-native-gesture-handler'")) {
  if (indexContent.indexOf("import 'react-native-gesture-handler'") < indexContent.indexOf("import { AppRegistry }")) {
    success.push('✅ react-native-gesture-handler imported at top of index.js');
  } else {
    errors.push('❌ react-native-gesture-handler must be imported at the very top of index.js');
  }
} else {
  errors.push('❌ Missing import for react-native-gesture-handler in index.js');
}

// Check App component structure
const appContent = fs.readFileSync(path.join(__dirname, 'App.tsx'), 'utf8');
if (appContent.includes('AppNavigator')) {
  success.push('✅ App.tsx imports AppNavigator');
} else {
  errors.push('❌ App.tsx missing AppNavigator import');
}

// Check navigation structure
const navPath = path.join(__dirname, 'src', 'navigation', 'AppNavigator.tsx');
if (fs.existsSync(navPath)) {
  success.push('✅ AppNavigator.tsx exists');
  const navContent = fs.readFileSync(navPath, 'utf8');
  if (navContent.includes('NavigationContainer')) {
    success.push('✅ NavigationContainer configured');
  } else {
    errors.push('❌ NavigationContainer not configured in AppNavigator');
  }
} else {
  errors.push('❌ Missing AppNavigator.tsx');
}

// Check screens exist
const screens = [
  'src/screens/SplashScreen.tsx',
  'src/screens/auth/LoginScreen.tsx',
  'src/screens/auth/SignUpScreen.tsx',
  'src/screens/home/HomeFeedScreen.tsx',
  'src/screens/explore/ExploreScreen.tsx',
];

console.log('\n📱 Checking screens...');
screens.forEach(screen => {
  const screenPath = path.join(__dirname, screen);
  if (fs.existsSync(screenPath)) {
    success.push(`✅ ${screen} exists`);
  } else {
    warnings.push(`⚠️  Missing screen: ${screen}`);
  }
});

// Print results
console.log('\n' + '='.repeat(50));
console.log('📊 VERIFICATION RESULTS\n');

if (success.length > 0) {
  console.log('✅ SUCCESS (' + success.length + ')');
  success.forEach(s => console.log('  ' + s));
}

if (warnings.length > 0) {
  console.log('\n⚠️  WARNINGS (' + warnings.length + ')');
  warnings.forEach(w => console.log('  ' + w));
}

if (errors.length > 0) {
  console.log('\n❌ ERRORS (' + errors.length + ')');
  errors.forEach(e => console.log('  ' + e));
  console.log('\n🔧 FIX REQUIRED: Please address the errors above before running the app');
} else {
  console.log('\n✨ All critical checks passed! Your app should be ready to run.');
  console.log('\n📱 To run the app:');
  console.log('   - Metro bundler: npx react-native start');
  console.log('   - Android: npx react-native run-android');
  console.log('   - iOS: cd ios && pod install && cd .. && npx react-native run-ios');
}

console.log('='.repeat(50));

// Exit with error code if there are errors
process.exit(errors.length > 0 ? 1 : 0);