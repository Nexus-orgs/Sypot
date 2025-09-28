import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from '../types/navigation';
import { Colors, Typography, Spacing } from '../themes';
import Logo from '../components/common/Logo';

type SplashNavigationProp = StackNavigationProp<RootStackParamList, 'Splash'>;

const { width, height } = Dimensions.get('window');

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<SplashNavigationProp>();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Navigate to Login screen after splash
      navigation.replace('Login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Background gradient */}
      <LinearGradient
        colors={[
          'rgba(20, 184, 166, 0.2)',
          'transparent',
          'rgba(249, 115, 22, 0.2)',
        ]}
        locations={[0, 0.5, 1]}
        style={styles.backgroundGradient}
      />

      {/* Animated blobs */}
      <View style={[styles.blob, styles.topBlob]} />
      <View style={[styles.blob, styles.bottomBlob]} />

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Logo size={128} />
        </View>

        <Text style={styles.tagline}>Find Your Vibe, Find Your People</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  blob: {
    position: 'absolute',
    width: 288, // 72 * 4
    height: 288,
    borderRadius: 144,
    opacity: 0.1,
  },
  topBlob: {
    backgroundColor: Colors.primary,
    top: -72,
    left: -72,
  },
  bottomBlob: {
    backgroundColor: Colors.secondary,
    bottom: -72,
    right: -72,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    paddingHorizontal: Spacing.lg,
  },
  logoContainer: {
    marginBottom: Spacing['2xl'],
  },
  tagline: {
    ...Typography.headingMedium,
    color: Colors.textBlack,
    textAlign: 'center',
    letterSpacing: -0.5,
    fontWeight: '700',
  },
});

export default SplashScreen;
