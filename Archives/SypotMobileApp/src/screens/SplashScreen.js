import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import Svg, {
  Path,
  Circle,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';
import { theme } from '../styles/theme';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate to TestMenu after 2 seconds (change to 'Login' in production)
    const timer = setTimeout(() => {
      navigation.replace('TestMenu');
    }, 2000);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, navigation]);

  return (
    <View style={styles.container}>
      {/* Background gradient effect */}
      <View style={styles.gradientBackground} />

      {/* Blur circles */}
      <View style={[styles.blurCircle, styles.topLeftCircle]} />
      <View style={[styles.blurCircle, styles.bottomRightCircle]} />

      {/* Logo and content */}
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Logo SVG */}
        <View style={styles.logoContainer}>
          <Svg width={128} height={128} viewBox="0 0 64 64" fill="none">
            <Defs>
              <LinearGradient id="paint0" x1="8" y1="0" x2="56" y2="64">
                <Stop stopColor="#f97316" />
                <Stop offset="1" stopColor="#ea580c" />
              </LinearGradient>
              <LinearGradient id="paint1" x1="26" y1="24" x2="38" y2="24">
                <Stop stopColor="#14b8a6" />
                <Stop offset="1" stopColor="#0d9488" />
              </LinearGradient>
            </Defs>
            <Path
              d="M32 0C18.7452 0 8 10.7452 8 24C8 34.4849 20.4433 49.8134 32 64C43.5567 49.8134 56 34.4849 56 24C56 10.7452 45.2548 0 32 0Z"
              fill="url(#paint0)"
            />
            <Circle cx="32" cy="24" r="12" fill="white" />
            <Circle cx="32" cy="24" r="6" fill="url(#paint1)" />
          </Svg>
        </View>

        <Text style={styles.tagline}>Find Your Vibe, Find Your People</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.3,
  },
  blurCircle: {
    position: 'absolute',
    width: 288,
    height: 288,
    borderRadius: 144,
    opacity: 0.1,
  },
  topLeftCircle: {
    top: -72,
    left: -72,
    backgroundColor: theme.colors.brandTeal,
  },
  bottomRightCircle: {
    bottom: -72,
    right: -72,
    backgroundColor: theme.colors.brandOrange,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
  },
  logoContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.15,
    shadowRadius: 13,
    elevation: 10,
  },
  tagline: {
    marginTop: theme.spacing.xl,
    fontSize: theme.typography.fontSize.xl,
    fontWeight: 'bold',
    color: theme.colors.textLight,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
});

export default SplashScreen;
