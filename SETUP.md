# Sypot App Setup Guide

## 📋 Development Setup Instructions

### 1. Prerequisites
Make sure you have the following installed:
- Node.js 16 or higher
- React Native development environment
- Android Studio (for Android)
- Xcode (for iOS, macOS only)

### 2. Installation Steps

```bash
# Clone the repository
git clone https://github.com/JT-tanui/Sypot2.git
cd Sypot2

# Install dependencies
npm install --legacy-peer-deps

# For iOS (macOS only)
cd ios && pod install && cd ..

# Start Metro bundler
npm start

# In a new terminal, run the app
npm run android  # For Android
npm run ios      # For iOS
```

### 3. Dependency Resolution

If you encounter dependency conflicts during installation, use:
```bash
npm install --legacy-peer-deps --force
```

### 4. Common Issues & Solutions

#### Metro Bundler Issues
```bash
# Clear Metro cache
npx react-native start --reset-cache
```

#### Android Build Issues
```bash
# Clean Android build
cd android && ./gradlew clean && cd ..
```

#### iOS Build Issues (macOS only)
```bash
# Clean iOS build
cd ios && xcodebuild clean && cd ..
```

## 🚀 App Features Implemented

### Authentication Flow
- ✅ Splash Screen with animated logo
- ✅ Login/Sign Up screens
- ✅ Forgot Password functionality
- ✅ Interest-based onboarding

### Main App Features
- ✅ Home Feed with event discovery
- ✅ Explore screen with search & categories
- ✅ Messages/Chat interface
- ✅ User Profile management
- ✅ Map view for location-based discovery

### Design System
- ✅ Custom theme with Sypot brand colors
- ✅ Typography system with proper hierarchy
- ✅ Consistent spacing and shadows
- ✅ Reusable component library

## 📱 Screen Navigation Flow

```
Splash Screen
     ↓
Login/Sign Up → Forgot Password
     ↓              ↓
Onboarding Interests
     ↓
Main App (Tabs)
├── Home Feed
├── Explore
├── Map View
├── Messages
└── Profile
```

## 🎨 Design Conversion

The app screens have been faithfully converted from the Figma designs:

| Design Screen | Implementation | Status |
|---------------|----------------|---------|
| `sypot_splash_screen` | SplashScreen.tsx | ✅ |
| `sypot_login/sign_up` | LoginScreen.tsx, SignUpScreen.tsx | ✅ |
| `sypot_home_feed_2` | HomeFeedScreen.tsx | ✅ |
| `sypot_explore_page` | ExploreScreen.tsx | ✅ |
| `sypot_messages/chat` | MessagesScreen.tsx | ✅ |
| `sypot_user_profile` | ProfileScreen.tsx | ✅ |
| `sypot_map_view` | MapScreen.tsx | ✅ |
| `sypot_onboarding_interests` | OnboardingInterestsScreen.tsx | ✅ |

## 🔧 Development Commands

```bash
# Start development
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Lint code
npm run lint

# Run tests
npm test

# Clean project
npm run clean  # (if configured)
```

## 📂 Project Structure

```
src/
├── components/          # Reusable UI components
│   └── SypotLogo.tsx   # Custom SVG logo
├── navigation/         # Navigation configuration
├── screens/           # Screen components
│   ├── auth/         # Authentication screens
│   ├── home/         # Home feed
│   ├── explore/      # Event discovery
│   ├── messages/     # Chat functionality
│   ├── profile/      # User management
│   └── map/          # Location features
├── types/            # TypeScript definitions
└── utils/           # Utilities and theme
```

## 🚀 Next Steps for Development

1. **Backend Integration**: Connect to API endpoints
2. **Real Data**: Replace mock data with actual API calls
3. **Navigation Enhancement**: Add more screen transitions
4. **Map Integration**: Implement real map functionality
5. **Push Notifications**: Add real-time notifications
6. **State Management**: Implement Redux or Context API
7. **Testing**: Add unit and integration tests

## 💡 Tips for Development

- Use TypeScript for better development experience
- Follow the established design system and theme
- Maintain component modularity and reusability
- Test on both iOS and Android platforms
- Keep the code clean and well-documented

---

**Happy Coding! 🎉**