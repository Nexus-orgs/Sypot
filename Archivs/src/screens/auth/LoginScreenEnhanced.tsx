import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from '../../types/navigation';
import { colors, spacing, typography, borderRadius } from '../../utils/theme';
import Input from '../../components/Input';
import Button from '../../components/Button';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface FormData {
  emailOrPhone: string;
  password: string;
}

interface FormErrors {
  emailOrPhone?: string;
  password?: string;
}

export default function LoginScreenEnhanced() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [formData, setFormData] = useState<FormData>({
    emailOrPhone: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email/Phone validation
    if (!formData.emailOrPhone.trim()) {
      newErrors.emailOrPhone = 'Email or phone number is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^\+?[\d\s-()]+$/;
      
      if (!emailRegex.test(formData.emailOrPhone) && !phoneRegex.test(formData.emailOrPhone)) {
        newErrors.emailOrPhone = 'Please enter a valid email or phone number';
      }
    }

    // Password validation
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, show success
      navigation.replace('MainTabs');
    } catch (error) {
      Alert.alert('Login Failed', 'Please check your credentials and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleSocialLogin = (provider: string) => {
    Alert.alert(
      'Social Login',
      `${provider} login will be implemented in the full version.`,
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.loginBackground} />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Button
            title="?"
            onPress={() => Alert.alert('Help', 'Need assistance? Contact our support team.')}
            variant="ghost"
            size="small"
            style={styles.helpButton}
          />
        </View>

        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Welcome to Sypot</Text>
            <Text style={styles.subtitle}>Sign in to discover amazing events</Text>
          </View>
          
          <View style={styles.formContainer}>
            <Input
              label="Email or Phone"
              placeholder="Enter your email or phone number"
              value={formData.emailOrPhone}
              onChangeText={(value) => handleInputChange('emailOrPhone', value)}
              error={errors.emailOrPhone}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              leftIcon={<Text style={styles.inputIcon}>📧</Text>}
            />
            
            <Input
              label="Password"
              placeholder="Enter your password"
              value={formData.password}
              onChangeText={(value) => handleInputChange('password', value)}
              error={errors.password}
              secureTextEntry
              showPasswordToggle
              autoCapitalize="none"
              leftIcon={<Text style={styles.inputIcon}>🔒</Text>}
            />
            
            <Button
              title="Sign In"
              onPress={handleLogin}
              loading={isLoading}
              disabled={!formData.emailOrPhone || !formData.password}
              fullWidth
              style={styles.loginButton}
            />
            
            <Button
              title="Forgot Password?"
              onPress={handleForgotPassword}
              variant="ghost"
              size="small"
              style={styles.forgotPasswordButton}
            />
          </View>

          <View style={styles.socialSection}>
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Or continue with</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.socialButtons}>
              <Button
                title="Google"
                onPress={() => handleSocialLogin('Google')}
                variant="outline"
                style={styles.socialButton}
                textStyle={styles.socialButtonText}
              />
              <Button
                title="Apple"
                onPress={() => handleSocialLogin('Apple')}
                variant="outline"
                style={styles.socialButton}
                textStyle={styles.socialButtonText}
              />
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpPrompt}>Don't have an account? </Text>
            <Button
              title="Sign Up"
              onPress={handleSignUp}
              variant="ghost"
              size="small"
              style={styles.signUpButton}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.loginBackground,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    padding: spacing.lg,
  },
  header: {
    alignItems: 'flex-end',
    paddingVertical: spacing.md,
  },
  helpButton: {
    borderRadius: borderRadius.full,
    backgroundColor: colors.neutral200,
    width: 40,
    height: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: '700',
    color: colors.neutral900,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    color: colors.neutral600,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    maxWidth: 350,
    alignSelf: 'center',
  },
  inputIcon: {
    fontSize: typography.fontSize.base,
  },
  loginButton: {
    marginTop: spacing.md,
    backgroundColor: colors.loginPrimary,
  },
  forgotPasswordButton: {
    alignSelf: 'center',
    marginTop: spacing.lg,
  },
  socialSection: {
    marginTop: spacing.xl,
    alignItems: 'center',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
    width: '100%',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.neutral300,
  },
  dividerText: {
    paddingHorizontal: spacing.md,
    fontSize: typography.fontSize.sm,
    color: colors.neutral500,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 350,
  },
  socialButton: {
    flex: 1,
    marginHorizontal: spacing.xs,
  },
  socialButtonText: {
    color: colors.neutral700,
  },
  footer: {
    paddingVertical: spacing.lg,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpPrompt: {
    color: colors.neutral600,
    fontSize: typography.fontSize.base,
  },
  signUpButton: {
    marginLeft: -spacing.sm,
  },
});