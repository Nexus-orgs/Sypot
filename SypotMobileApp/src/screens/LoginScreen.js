import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { theme } from '../styles/theme';
import { validateEmail, validatePhone } from '../utils/validation';

const LoginScreen = ({ navigation }) => {
  const [emailOrPhone, setEmailOrPhone] = useState('demo@sypot.com');

  // Auto-login after 2 seconds for testing
  useEffect(() => {
    const timer = setTimeout(() => {
      // Skip validation for auto-login
      navigation.replace('MainTabs');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  const handleContinue = () => {
    // Validate email/phone
    const emailError = validateEmail(emailOrPhone);
    const phoneError = validatePhone(emailOrPhone);
    
    // If it's not a valid email and not a valid phone, show error
    if (emailError && phoneError && emailOrPhone !== 'demo@sypot.com') {
      Alert.alert('Validation Error', 'Please enter a valid email or phone number');
      return;
    }
    
    // Dormant login - directly navigate to main app
    navigation.replace('MainTabs');
  };

  const handleSocialLogin = (provider) => {
    // Dormant login - directly navigate to main app
    navigation.replace('MainTabs');
  };

  const GoogleIcon = () => (
    <Svg width={24} height={24} viewBox="0 0 48 48">
      <Path
        d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
        fill="#FFC107"
      />
      <Path
        d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"
        fill="#FF3D00"
      />
      <Path
        d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.222 0-9.657-3.356-11.303-7.962l-6.571 4.819C9.656 39.663 16.318 44 24 44z"
        fill="#4CAF50"
      />
      <Path
        d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C43.021 36.687 44 34.09 44 31.611c0-3.345-1.09-6.45-2.952-9.014l-2.437-2.518z"
        fill="#1976D2"
      />
    </Svg>
  );

  const AppleIcon = () => (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="currentColor">
      <Path d="M8.2,20.3c-0.3,0-0.6,0-0.9,0c-1.3,0-2.6-0.3-3.8-0.9C2.2,18.8,1.2,17.6,0.6,16.2c-0.8-1.9-0.6-4,0.4-5.8 c0.6-1.1,1.5-2.1,2.6-2.8c1.1-0.7,2.3-1,3.6-1c0.3,0,0.6,0,0.9,0c0.6,0,1.2,0.1,1.7,0.2c-1.1,1.2-1.7,2.7-1.7,4.3 c0,1.5,0.6,3.1,1.8,4.2C8.8,20.2,8.5,20.3,8.2,20.3z M15,2c-2,1.8-3.1,4.3-3.1,6.9c0,2.1,0.8,4.1,2.2,5.7c1.3,1.4,3.1,2.3,5,2.3 c0.1,0,0.2,0,0.3,0c1.2-0.1,2.4-0.4,3.5-1c1.3-0.8,2.3-1.8,2.9-3.2c0.7-1.4,0.8-3,0.4-4.5c-0.3-1-0.8-1.9-1.5-2.6 c-0.6-0.6-1.3-1-2.1-1.3C21.1,4,19.6,3.3,18.1,3C17.2,2.6,16.1,2.2,15,2z" />
    </Svg>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.helpButton}>
              <Text style={styles.helpIcon}>?</Text>
            </TouchableOpacity>
          </View>

          {/* Main Content */}
          <View style={styles.mainContent}>
            <Text style={styles.title}>Welcome to Sypot</Text>

            {/* Input Field */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email or phone number"
                placeholderTextColor={theme.colors.gray[500]}
                value={emailOrPhone}
                onChangeText={setEmailOrPhone}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />

              <TouchableOpacity
                style={styles.continueButton}
                onPress={handleContinue}
                activeOpacity={0.8}
              >
                <Text style={styles.continueButtonText}>Continue</Text>
              </TouchableOpacity>
            </View>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Or continue with</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Login Buttons */}
            <View style={styles.socialContainer}>
              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => handleSocialLogin('Google')}
                activeOpacity={0.8}
              >
                <GoogleIcon />
                <Text style={styles.socialButtonText}>Continue with Google</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => handleSocialLogin('Apple')}
                activeOpacity={0.8}
              >
                <AppleIcon />
                <Text style={styles.socialButtonText}>Continue with Apple</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              By continuing, you agree to our{' '}
              <Text style={styles.footerLink}>Terms of Service</Text> and{' '}
              <Text style={styles.footerLink}>Privacy Policy</Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundLight,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.lg,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: theme.spacing.md,
  },
  helpButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.gray[200],
    justifyContent: 'center',
    alignItems: 'center',
  },
  helpIcon: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.gray[600],
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: theme.typography.fontSize['3xl'],
    fontWeight: "bold",
    color: theme.colors.textLight,
    marginBottom: theme.spacing.xl,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    maxWidth: 400,
  },
  input: {
    height: 56,
    backgroundColor: theme.colors.gray[100],
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    fontSize: theme.typography.fontSize.base,
    fontWeight: "normal",
    color: theme.colors.textLight,
    marginBottom: theme.spacing.md,
  },
  continueButton: {
    height: 56,
    backgroundColor: theme.colors.brandOrange,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: "bold",
    color: theme.colors.white,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.spacing.lg,
    width: '100%',
    maxWidth: 400,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.gray[300],
  },
  dividerText: {
    marginHorizontal: theme.spacing.md,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: "normal",
    color: theme.colors.gray[500],
  },
  socialContainer: {
    width: '100%',
    maxWidth: 400,
  },
  socialButton: {
    height: 56,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.gray[200],
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  socialButtonText: {
    marginLeft: theme.spacing.sm,
    fontSize: theme.typography.fontSize.base,
    fontWeight: "600",
    color: theme.colors.gray[800],
  },
  footer: {
    paddingVertical: theme.spacing.lg,
  },
  footerText: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: "normal",
    color: theme.colors.gray[500],
    textAlign: 'center',
  },
  footerLink: {
    fontWeight: "600",
    color: theme.colors.gray[800],
  },
});

export default LoginScreen;