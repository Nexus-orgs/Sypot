# Sypot - Social Event Discovery App

![Sypot Logo](https://img.shields.io/badge/Sypot-Find%20Your%20Vibe-14b8a6?style=for-the-badge&logo=location-dot&logoColor=white)

**Find Your Vibe, Find Your People** - A React Native mobile application for discovering and attending local events, connecting with like-minded people, and creating memorable experiences.

## 🚀 Features

### 🎯 Core Functionality
- **Event Discovery**: Browse and discover events based on your interests and location
- **Social Networking**: Connect with friends and meet new people at events
- **Event Management**: Create, organize, and manage your own events
- **Real-time Chat**: Message other attendees and organizers
- **Map Integration**: Find events and venues on an interactive map
- **Profile Management**: Customize your profile and track your event history
- **Booking System**: Reserve spots at events and manage your bookings

### 📱 Screens Implemented

#### Authentication Flow
- **Splash Screen**: Beautiful animated splash with gradient background and Sypot logo
- **Login/Sign Up**: Secure authentication with email/phone support
- **Forgot Password**: Password recovery functionality
- **Onboarding**: Interest selection to personalize the experience

#### Main App Features
- **Home Feed**: Personalized event recommendations and social feed
- **Explore**: Search and browse events by category and location  
- **Map View**: Interactive map showing nearby events and venues
- **Messages**: Chat with other users and event organizers
- **Profile**: User profile management and settings

## 🎨 Design System

### Color Palette
- **Primary Teal**: `#14b8a6` - Main brand color for CTAs and highlights
- **Primary Orange**: `#f97316` - Secondary brand color for accents
- **Backgrounds**: Light (`#f8fafc`) and Dark (`#0a0a0a`) theme support
- **Text Colors**: Optimized for readability in both light and dark modes

### Typography
- **Font Family**: Plus Jakarta Sans (system fallback)
- **Font Weights**: 400 (Regular), 500 (Medium), 700 (Bold), 800 (Extra Bold)
- **Responsive Sizes**: From 12px to 36px with appropriate line heights

### Components
- **Consistent Border Radius**: 4px to 24px for different UI elements
- **Shadow System**: Three-tier shadow system for depth and hierarchy
- **Spacing System**: 8pt grid system for consistent layouts

## 🛠 Technical Stack

### Frontend
- **React Native 0.73.2**: Cross-platform mobile development
- **TypeScript**: Type-safe development experience
- **React Navigation 6**: Navigation between screens with stack and tab navigators

### UI & Styling
- **React Native SVG**: Custom logo and icon components
- **React Native Linear Gradient**: Beautiful gradient backgrounds
- **Custom Theme System**: Centralized design tokens and styling

### Navigation Architecture
- **Stack Navigator**: For authentication and main app flows
- **Tab Navigator**: Bottom navigation for main app sections
- **Type-safe Navigation**: TypeScript definitions for all routes and parameters

## 📁 Project Structure

```
SypotApp/
├── src/
│   ├── components/          # Reusable UI components
│   │   └── SypotLogo.tsx   # Custom SVG logo component
│   ├── navigation/         # Navigation configuration
│   │   └── AppNavigator.tsx
│   ├── screens/           # Screen components
│   │   ├── auth/         # Authentication screens
│   │   ├── home/         # Home feed screens
│   │   ├── explore/      # Explore and search screens
│   │   ├── messages/     # Chat and messaging screens
│   │   ├── profile/      # Profile management screens
│   │   ├── map/          # Map view screens
│   │   └── SplashScreen.tsx
│   ├── types/            # TypeScript type definitions
│   └── utils/           # Utilities and configurations
│       └── theme.ts     # Design system and theme
├── android/             # Android-specific code
├── ios/                # iOS-specific code
└── App.tsx             # Main application entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16 or higher
- React Native development environment
- Android Studio (for Android development)
- Xcode (for iOS development on macOS)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/JT-tanui/Sypot2.git
   cd Sypot2
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Install iOS dependencies (iOS only)**
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Start the Metro bundler**
   ```bash
   npm start
   ```

5. **Run the application**
   
   For Android:
   ```bash
   npm run android
   ```
   
   For iOS:
   ```bash
   npm run ios
   ```

## 📱 App Flow

### User Journey
1. **Onboarding**: Splash screen → Login/Sign up → Interest selection
2. **Discovery**: Home feed with personalized events → Explore by category
3. **Engagement**: Event details → Booking → Chat with attendees
4. **Navigation**: Map view for location-based discovery
5. **Social**: Profile management → Friends → Messages

### Key Interactions
- **Swipe Navigation**: Smooth transitions between screens
- **Pull-to-Refresh**: Update event feeds and data
- **Search & Filter**: Find events by location, category, date
- **Real-time Updates**: Live chat and event notifications

## 🎨 Design Inspiration

The app design is based on modern mobile UI patterns with a focus on:
- **Clean Minimalism**: Uncluttered interfaces with plenty of white space
- **Vibrant Colors**: Energetic teal and orange palette reflecting the social nature
- **Intuitive Navigation**: Familiar patterns for easy user adoption
- **Visual Hierarchy**: Clear information architecture with proper typography

## 🔧 Development Notes

### Code Quality
- **TypeScript**: Full type coverage for better development experience
- **ESLint**: Code linting for consistent code style
- **Prettier**: Code formatting for clean, readable code
- **Component Architecture**: Reusable, modular components

### Performance Considerations
- **Optimized Images**: Efficient image loading and caching
- **Lazy Loading**: Load screens and components as needed
- **State Management**: Efficient data flow and state updates
- **Memory Management**: Proper cleanup and resource management

## 🚀 Future Enhancements

### Phase 1 (Current)
- ✅ Authentication flow
- ✅ Core screen layouts  
- ✅ Navigation structure
- ✅ Design system implementation

### Phase 2 (Planned)
- [ ] Backend integration
- [ ] Real-time messaging
- [ ] Push notifications
- [ ] Event booking system
- [ ] Map integration with real data
- [ ] User-generated content

### Phase 3 (Future)
- [ ] Advanced search and filtering
- [ ] Social features (following, recommendations)
- [ ] Event analytics for organizers
- [ ] In-app payments
- [ ] Multi-language support
- [ ] Dark mode implementation

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Maintain consistent code formatting
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Project Maintainer**: JT-tanui
**Repository**: [https://github.com/JT-tanui/Sypot2](https://github.com/JT-tanui/Sypot2)

---

**Built with ❤️ using React Native and TypeScript**

*Find Your Vibe, Find Your People* 🎉