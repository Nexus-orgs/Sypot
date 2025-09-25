# Sypot Mobile App - React Native

A fully functional React Native mobile application for Sypot - a social event discovery and networking platform. This app has been converted from HTML/CSS/JavaScript to React Native with complete functionality and responsive design for both iOS and Android.

## 🎯 TESTING READY

**The app is now fully configured with:**
- ✅ Native Android folder (ready for Android Studio)
- ✅ Native iOS folder (ready for Xcode)
- ✅ All 20+ screens implemented
- ✅ Test Menu for easy navigation
- ✅ Dormant login (bypasses authentication for testing)

## 📱 Complete Screen List (All Implemented)

1. **Test Menu** - Navigate to all screens easily
2. **Splash Screen** - Animated brand introduction
3. **Login/Sign Up** - Dormant auth for testing
4. **Home Feed** - Event discovery feed
5. **Explore** - Browse events by category
6. **Create Event** - Full event creation form
7. **Event Details** - Detailed event information
8. **Messages** - Chat conversations list
9. **Chat** - Individual chat view
10. **Profile** - User profile with stats
11. **Edit Profile** - Profile editing
12. **Settings** - App preferences and options
13. **My Bookings** - Ticket management
14. **Notifications** - Activity alerts
15. **Map View** - Event locations
16. **Friends** - Social connections
17. **Help/Support** - Support center
18. **Forgot Password** - Password recovery
19. **Onboarding** - Interest selection
20. **Achievements** - Badges and rewards
21. **Organizer Dashboard** - Event management
22. **Ticket Purchase** - Booking flow

## 📱 Original Features

- **Splash Screen**: Animated brand introduction with smooth transitions
- **Authentication**: Login/Sign up with email, Google, and Apple sign-in options
- **Home Feed**: Discover personalized events with save and share functionality
- **Explore**: Browse and search events by categories with grid layout
- **User Profile**: Personal profile with stats, badges, and activity history
- **Navigation**: Bottom tab navigation with intuitive icons
- **Responsive Design**: Optimized for all screen sizes on iOS and Android
- **Dark Mode Support**: Theme structure ready for dark mode implementation

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (will be installed automatically)
- iOS Simulator (Mac only) or Android Emulator
- Expo Go app on your physical device (optional)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd SypotMobileApp
```

2. Install dependencies:
```bash
npm install
```

### Running the App

#### Method 1: Using Expo Go (Recommended for Quick Testing)

1. Start the development server:
```bash
npx expo start
```

2. You'll see a QR code in the terminal and a web page will open

3. On your physical device:
   - **iOS**: Open the Camera app and scan the QR code, then tap the notification
   - **Android**: Open the Expo Go app and scan the QR code

#### Method 2: Using iOS Simulator (Mac only)

```bash
npx expo run:ios
```

Or press `i` in the terminal after running `npx expo start`

#### Method 3: Using Android Emulator

```bash
npx expo run:android
```

Or press `a` in the terminal after running `npx expo start`

#### Method 4: Web Browser (Limited functionality)

```bash
npx expo start --web
```

Or press `w` in the terminal after running `npx expo start`

## 📂 Project Structure

```
SypotMobileApp/
├── App.js                    # Main application entry point
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── common/         # Common components (buttons, inputs, etc.)
│   │   ├── cards/          # Card components
│   │   └── forms/          # Form components
│   ├── screens/            # Screen components
│   │   ├── SplashScreen.js
│   │   ├── LoginScreen.js
│   │   ├── HomeScreen.js
│   │   ├── ExploreScreen.js
│   │   └── ProfileScreen.js
│   ├── navigation/         # Navigation configuration
│   │   └── AppNavigator.js
│   ├── styles/            # Global styles and theme
│   │   ├── theme.js
│   │   └── globalStyles.js
│   ├── utils/             # Utility functions
│   └── assets/            # Images, fonts, and other assets
├── package.json
└── app.json              # Expo configuration
```

## 🎨 Design System

### Color Palette
- **Primary**: #0df2db (Teal)
- **Brand Teal**: #14b8a6
- **Brand Orange**: #f97316
- **Background Light**: #f5f8f8
- **Text Light**: #111817
- **Subtle Light**: #608a86

### Typography
The app uses system fonts for optimal performance:
- iOS: System font (San Francisco)
- Android: Roboto

### Components
All components are built using React Native's core components:
- `View` instead of `<div>`
- `Text` instead of `<p>`, `<span>`, etc.
- `TouchableOpacity` / `Pressable` instead of `<button>`
- `Image` for images
- `ScrollView` / `FlatList` for scrollable content
- `TextInput` for input fields

## 🛠️ Technologies Used

- **React Native**: Cross-platform mobile framework
- **Expo**: Development platform and tools
- **React Navigation**: Navigation library
  - Stack Navigator for screen transitions
  - Bottom Tab Navigator for main navigation
- **React Native SVG**: For custom icons and graphics
- **React Native Safe Area Context**: For device safe areas
- **React Native Gesture Handler**: For gesture interactions
- **React Native Reanimated**: For smooth animations

## 📱 Screens Implemented

1. **Splash Screen**
   - Animated logo
   - Brand tagline
   - Auto-navigation to login

2. **Login/Sign Up Screen**
   - Email/phone input
   - Social login options (Google, Apple)
   - Terms and privacy policy links

3. **Home Feed**
   - Event cards with images
   - Save and share functionality
   - Search icon in header
   - Personalized recommendations

4. **Explore Screen**
   - Search bar
   - Category filters
   - Grid layout for events
   - Event details preview

5. **Profile Screen**
   - User avatar and info
   - Statistics (followers, following, events)
   - Achievement badges
   - Recent activity
   - Edit profile button

## 🔄 Navigation Flow

```
Splash Screen
    ↓
Login Screen
    ↓
Main App (Tab Navigation)
    ├── Home
    ├── Explore
    ├── Create (Placeholder)
    ├── Messages (Placeholder)
    └── Profile
```

## 🚧 Future Enhancements

- [ ] Complete Create Event screen
- [ ] Implement Messages/Chat functionality
- [ ] Add Event Details screen
- [ ] Implement Map View
- [ ] Add Settings screen
- [ ] Integrate real API endpoints
- [ ] Add push notifications
- [ ] Implement offline mode
- [ ] Add dark mode toggle
- [ ] Implement social authentication
- [ ] Add image upload functionality
- [ ] Implement ticket/booking system

## 🐛 Troubleshooting

### Common Issues

1. **Metro bundler issues**:
```bash
npx expo start -c
```

2. **Dependencies not installed**:
```bash
rm -rf node_modules
npm install
```

3. **iOS Simulator not opening**:
- Make sure Xcode is installed
- Open Xcode and accept any license agreements
- Try running: `xcrun simctl list devices`

4. **Android Emulator not opening**:
- Make sure Android Studio is installed
- Create a virtual device in AVD Manager
- Start the emulator before running the app

## 📄 License

This project is proprietary and confidential.

## 🤝 Contributing

Please follow the existing code style and structure when making contributions.

## 📞 Support

For support and questions, please contact the development team.

---

**Note**: This app has been carefully converted from the original HTML/CSS/JavaScript implementation to maintain design consistency while leveraging React Native's native performance capabilities.