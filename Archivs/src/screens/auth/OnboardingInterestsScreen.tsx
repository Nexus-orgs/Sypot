import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from '../../types/navigation';
import { colors, spacing, typography, borderRadius } from '../../utils/theme';

type OnboardingInterestsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'OnboardingInterests'>;

const interests = [
  'Music', 'Sports', 'Food & Drink', 'Art', 'Technology', 'Travel',
  'Photography', 'Business', 'Health & Fitness', 'Education',
  'Gaming', 'Fashion', 'Books', 'Movies', 'Outdoor Activities',
  'Crafts', 'Dancing', 'Comedy', 'Networking', 'Charity'
];

export default function OnboardingInterestsScreen() {
  const navigation = useNavigation<OnboardingInterestsScreenNavigationProp>();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleContinue = () => {
    navigation.replace('MainTabs');
  };

  const handleSkip = () => {
    navigation.replace('MainTabs');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.loginBackground} />
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleSkip}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>What are you interested in?</Text>
          <Text style={styles.subtitle}>
            Help us personalize your experience by selecting your interests
          </Text>
          
          <View style={styles.interestsContainer}>
            {interests.map((interest) => (
              <TouchableOpacity
                key={interest}
                style={[
                  styles.interestChip,
                  selectedInterests.includes(interest) && styles.selectedChip
                ]}
                onPress={() => toggleInterest(interest)}
              >
                <Text style={[
                  styles.interestText,
                  selectedInterests.includes(interest) && styles.selectedText
                ]}>
                  {interest}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity 
            style={[
              styles.continueButton,
              selectedInterests.length === 0 && styles.buttonDisabled
            ]}
            onPress={handleContinue}
            disabled={selectedInterests.length === 0}
          >
            <Text style={styles.continueButtonText}>
              Continue ({selectedInterests.length})
            </Text>
          </TouchableOpacity>
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
    padding: spacing.lg,
  },
  header: {
    alignItems: 'flex-end',
    paddingVertical: spacing.md,
  },
  skipText: {
    color: colors.neutral600,
    fontSize: typography.fontSize.base,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingVertical: spacing.lg,
  },
  title: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: '700',
    color: colors.neutral900,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    color: colors.neutral600,
    marginBottom: spacing.xl,
    textAlign: 'center',
    lineHeight: 24,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  interestChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.neutral200,
    marginBottom: spacing.sm,
    minWidth: '30%',
    alignItems: 'center',
  },
  selectedChip: {
    backgroundColor: colors.loginPrimary,
  },
  interestText: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral700,
    fontWeight: '500',
  },
  selectedText: {
    color: 'white',
  },
  footer: {
    paddingVertical: spacing.lg,
  },
  continueButton: {
    width: '100%',
    height: 56,
    backgroundColor: colors.loginPrimary,
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  continueButtonText: {
    color: 'white',
    fontSize: typography.fontSize.lg,
    fontWeight: '700',
  },
});