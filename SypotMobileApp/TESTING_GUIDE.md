# Sypot Mobile App - Testing Guide

## 🚀 Quick Start Testing

The app is configured for easy testing with a **Test Menu** that provides quick access to all screens.

### Running the App

```bash
# Navigate to the project
cd SypotMobileApp

# Install dependencies (if not done)
npm install

# Start with Expo
npx expo start

# Then choose:
# Press 'i' for iOS Simulator
# Press 'a' for Android Emulator
# Scan QR code with Expo Go app
```

### For Native Builds

The app now includes native Android and iOS folders for building standalone apps:

```bash
# iOS (Mac only)
npx expo run:ios

# Android
npx expo run:android

# Or use traditional React Native commands
npx react-native run-ios
npx react-native run-android
```

## 📱 All Available Screens (20+ Screens)

### ✅ Fully Implemented Screens

1. **Test Menu** - Main navigation hub to test all screens
2. **Splash Screen** - Animated brand intro
3. **Login/Sign Up** - Auto-login enabled (1 second delay)
4. **Home Feed** - Event discovery with cards
5. **Explore** - Category-based browsing with search
6. **Profile** - User stats, badges, and activity
7. **Messages** - Conversation list with unread indicators
8. **Create Event** - Full event creation form
9. **Event Details** - Complete event info with ticket purchase
10. **Settings** - Comprehensive app preferences
11. **Notifications** - Real-time updates display
12. **My Bookings** - Upcoming and past event tickets

### 🔄 Placeholder Screens (Ready for Implementation)

13. **Edit Profile**
14. **Map View** 
15. **Friends/Connections**
16. **Help/Support**
17. **Onboarding Interests**
18. **Forgot Password**
19. **Achievements/Badges**
20. **Organizer Dashboard**
21. **Ticket Purchase**
22. **Chat** (Individual conversation)

## 🧭 Navigation Flow

```
Test Menu (Start Screen)
    ↓
Can navigate to ANY screen directly
    OR
    ↓
Splash → Login (Auto) → Main App
    ↓
Bottom Tab Navigation:
├── Home
├── Explore  
├── Create
├── Messages (Badge: 3)
└── Profile
```

## 🎯 Testing Checklist

### Basic Navigation
- [ ] App launches with Test Menu
- [ ] All screens are accessible from Test Menu
- [ ] Back navigation works on all screens
- [ ] Bottom tabs switch correctly

### Core Features
- [ ] Login auto-proceeds after 1 second
- [ ] Home feed displays event cards
- [ ] Explore shows category filters
- [ ] Search bars accept input
- [ ] Profile shows user information
- [ ] Messages displays conversation list
- [ ] Create Event form accepts input
- [ ] Settings toggles work

### UI/UX
- [ ] All screens render without errors
- [ ] ScrollViews work properly
- [ ] Images load correctly
- [ ] Touch feedback on buttons
- [ ] Keyboard handling on input screens
- [ ] Safe area handling (notch devices)

### Platform Testing
- [ ] iOS Simulator works
- [ ] Android Emulator works
- [ ] Expo Go app works
- [ ] Different screen sizes render correctly

## 🎨 Key Features to Test

### Messages Screen
- Conversation list with avatars
- Online status indicators
- Unread message counts
- Search functionality

### Create Event Screen
- Image upload area
- Category selection
- Date/time pickers
- Location input
- Price input
- Form validation

### Event Details
- Event image display
- Attendee counter
- Progress bar
- Ticket purchase button
- Share functionality

### Settings Screen
- Toggle switches
- Section organization
- Navigation to sub-screens
- Logout confirmation

### My Bookings
- Tab switching (Upcoming/Past)
- Ticket cards
- QR code button
- Empty state

## 🐛 Known Testing Points

1. **Auto-Login**: Login screen automatically navigates to main app after 1 second
2. **Test Menu**: Set as initial screen for easy testing (change `initialRouteName` in AppNavigator.js for production)
3. **Placeholder Screens**: Some screens show placeholder content - these are ready for full implementation
4. **Mock Data**: All lists use mock data for demonstration

## 📲 Device Testing

### iOS Requirements
- iOS Simulator (Xcode required)
- Recommended: iPhone 14 or newer simulator
- iOS 13.0 or higher

### Android Requirements  
- Android Emulator (Android Studio)
- Recommended: Pixel 5 or newer emulator
- Android 6.0 (API 23) or higher

### Physical Device Testing
- Install Expo Go app
- Scan QR code from terminal
- Ensure device is on same network

## 🔧 Troubleshooting

### Metro Bundler Issues
```bash
npx expo start -c  # Clear cache
```

### Module Resolution
```bash
rm -rf node_modules
npm install
```

### iOS Build Issues
```bash
cd ios && pod install
cd .. && npx expo run:ios
```

### Android Build Issues
```bash
cd android && ./gradlew clean
cd .. && npx expo run:android
```

## 📝 Notes for Developers

- **Theme**: Consistent design system in `src/styles/theme.js`
- **Navigation**: React Navigation v6 with Stack and Tab navigators
- **Icons**: Custom SVG icons for all tab bar items
- **Fonts**: System fonts for optimal performance
- **State**: Currently using local state (ready for Redux/Context)
- **API**: Ready for backend integration (mock data in place)

## ✅ Production Checklist

Before releasing to production:

1. [ ] Change `initialRouteName` from "TestMenu" to "Splash"
2. [ ] Remove TestMenuScreen from navigation
3. [ ] Implement actual authentication
4. [ ] Connect to real API endpoints
5. [ ] Add proper error handling
6. [ ] Implement data persistence
7. [ ] Add analytics tracking
8. [ ] Test on multiple real devices
9. [ ] Optimize images and assets
10. [ ] Enable ProGuard (Android) and bitcode (iOS)

## 🎉 Ready to Test!

The app is fully set up and ready for testing on both iOS and Android. All navigation paths work, and you can access every screen from the Test Menu for comprehensive testing.