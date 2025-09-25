import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {AuthStackParamList} from '../../navigation/types';
import {Colors, Typography, Spacing, BorderRadius} from '../../themes';
import Logo from '../../components/common/Logo';
import Button from '../../components/common/Button';

type WelcomeNavigationProp = StackNavigationProp<AuthStackParamList, 'Welcome'>;

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<WelcomeNavigationProp>();

  const handleGetStarted = () => {
    navigation.navigate('SignUp');
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.helpButton}>
          <Icon name="help-outline" size={24} color={Colors.textGray} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.logoSection}>
          <Logo size={100} />
          <Text style={styles.title}>Welcome to Sypot</Text>
          <Text style={styles.subtitle}>
            Discover amazing events, connect with like-minded people, and create unforgettable memories.
          </Text>
        </View>

        <View style={styles.buttonSection}>
          <Button
            title="Get Started"
            onPress={handleGetStarted}
            variant="primary"
            size="large"
            style={styles.primaryButton}
          />
          
          <Button
            title="Already have an account? Log In"
            onPress={handleLogin}
            variant="text"
            size="medium"
            style={styles.loginButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLight,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },
  helpButton: {
    padding: Spacing.xs,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing['2xl'],
  },
  logoSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Spacing['2xl'],
  },
  title: {
    ...Typography.displayMedium,
    color: Colors.textBlack,
    textAlign: 'center',
    marginTop: Spacing.lg,
    marginBottom: Spacing.md,
  },
  subtitle: {
    ...Typography.bodyLarge,
    color: Colors.textGray,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: Spacing.md,
  },
  buttonSection: {
    gap: Spacing.md,
  },
  primaryButton: {
    width: '100%',
  },
  loginButton: {
    width: '100%',
  },
});

export default WelcomeScreen;