import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { colors, spacing, typography, borderRadius, shadows } from '../../utils/theme';
import { mockUsers, eventCategories } from '../../services/mockData';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Card from '../../components/Card';

interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
  location: string;
  website: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function EditProfileScreen() {
  const navigation = useNavigation();
  
  // Initialize with mock user data
  const currentUser = mockUsers[0];
  
  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: currentUser.name.split(' ')[0] || '',
    lastName: currentUser.name.split(' ')[1] || '',
    email: currentUser.email,
    phone: '+1 (555) 123-4567',
    bio: currentUser.bio || '',
    location: 'New York, NY',
    website: 'https://johndoe.com',
  });
  
  const [selectedInterests, setSelectedInterests] = useState<string[]>(currentUser.interests);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    if (formData.phone && !/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (formData.website && !formData.website.startsWith('http')) {
      newErrors.website = 'Website must start with http:// or https://';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof ProfileFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSaveProfile = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'Success!',
        'Your profile has been updated successfully.',
        [
          { 
            text: 'OK', 
            onPress: () => navigation.goBack() 
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = () => {
    Alert.alert(
      'Change Avatar',
      'Choose an option',
      [
        { text: 'Take Photo', onPress: () => console.log('Take photo') },
        { text: 'Choose from Gallery', onPress: () => console.log('Choose from gallery') },
        { text: 'Remove Photo', style: 'destructive', onPress: () => console.log('Remove photo') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const AvatarSection = () => (
    <Card style={styles.avatarSection}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {currentUser.avatar || `${formData.firstName.charAt(0)}${formData.lastName.charAt(0)}`}
          </Text>
        </View>
        <TouchableOpacity 
          style={styles.avatarChangeButton}
          onPress={handleAvatarChange}
        >
          <Text style={styles.avatarChangeText}>📷</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.avatarLabel}>Profile Photo</Text>
      <Text style={styles.avatarDescription}>
        Add a photo to help others recognize you
      </Text>
    </Card>
  );

  const InterestsSection = () => (
    <Card style={styles.section}>
      <Text style={styles.sectionTitle}>Interests</Text>
      <Text style={styles.sectionDescription}>
        Select your interests to help us recommend relevant events
      </Text>
      
      <View style={styles.interestsContainer}>
        {eventCategories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.interestChip,
              selectedInterests.includes(category.name) && {
                backgroundColor: category.color,
              }
            ]}
            onPress={() => toggleInterest(category.name)}
          >
            <Text style={styles.interestEmoji}>{category.emoji}</Text>
            <Text style={[
              styles.interestText,
              selectedInterests.includes(category.name) && styles.selectedInterestText
            ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </Card>
  );

  const PrivacySection = () => (
    <Card style={styles.section}>
      <Text style={styles.sectionTitle}>Privacy Settings</Text>
      
      <View style={styles.privacyOptions}>
        <TouchableOpacity style={styles.privacyItem}>
          <View style={styles.privacyContent}>
            <Text style={styles.privacyTitle}>Profile Visibility</Text>
            <Text style={styles.privacyDescription}>
              Who can see your profile information
            </Text>
          </View>
          <Text style={styles.privacyValue}>Public</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.privacyItem}>
          <View style={styles.privacyContent}>
            <Text style={styles.privacyTitle}>Event Activity</Text>
            <Text style={styles.privacyDescription}>
              Show events you're attending
            </Text>
          </View>
          <View style={styles.privacyToggle}>
            <Text style={styles.toggleText}>ON</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.privacyItem}>
          <View style={styles.privacyContent}>
            <Text style={styles.privacyTitle}>Friend Requests</Text>
            <Text style={styles.privacyDescription}>
              Allow others to send friend requests
            </Text>
          </View>
          <View style={styles.privacyToggle}>
            <Text style={styles.toggleText}>ON</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.backgroundLight} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Edit Profile</Text>
        
        <TouchableOpacity 
          onPress={handleSaveProfile}
          disabled={loading}
        >
          <Text style={[styles.saveButton, loading && styles.saveButtonDisabled]}>
            Save
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Avatar Section */}
        <AvatarSection />

        {/* Basic Information */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          
          <View style={styles.nameRow}>
            <Input
              label="First Name"
              placeholder="Enter first name"
              value={formData.firstName}
              onChangeText={(value) => handleInputChange('firstName', value)}
              error={errors.firstName}
              containerStyle={styles.halfInput}
            />
            
            <Input
              label="Last Name"
              placeholder="Enter last name"
              value={formData.lastName}
              onChangeText={(value) => handleInputChange('lastName', value)}
              error={errors.lastName}
              containerStyle={styles.halfInput}
            />
          </View>

          <Input
            label="Email"
            placeholder="Enter your email address"
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            error={errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon={<Text style={styles.inputIcon}>📧</Text>}
          />

          <Input
            label="Phone Number"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChangeText={(value) => handleInputChange('phone', value)}
            error={errors.phone}
            keyboardType="phone-pad"
            leftIcon={<Text style={styles.inputIcon}>📱</Text>}
          />
        </Card>

        {/* About Me */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>About Me</Text>
          
          <Input
            label="Bio"
            placeholder="Tell others about yourself..."
            value={formData.bio}
            onChangeText={(value) => handleInputChange('bio', value)}
            multiline
            style={styles.textArea}
            leftIcon={<Text style={styles.inputIcon}>✍️</Text>}
            helperText={`${formData.bio.length}/200 characters`}
          />

          <Input
            label="Location"
            placeholder="Where are you located?"
            value={formData.location}
            onChangeText={(value) => handleInputChange('location', value)}
            leftIcon={<Text style={styles.inputIcon}>📍</Text>}
          />

          <Input
            label="Website"
            placeholder="https://yourwebsite.com"
            value={formData.website}
            onChangeText={(value) => handleInputChange('website', value)}
            error={errors.website}
            keyboardType="url"
            autoCapitalize="none"
            leftIcon={<Text style={styles.inputIcon}>🌐</Text>}
          />
        </Card>

        {/* Interests */}
        <InterestsSection />

        {/* Privacy Settings */}
        <PrivacySection />

        {/* Account Actions */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <TouchableOpacity style={styles.actionItem}>
            <Text style={styles.actionIcon}>🔒</Text>
            <Text style={styles.actionText}>Change Password</Text>
            <Text style={styles.actionArrow}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionItem}>
            <Text style={styles.actionIcon}>📧</Text>
            <Text style={styles.actionText}>Change Email</Text>
            <Text style={styles.actionArrow}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionItem, styles.dangerAction]}>
            <Text style={styles.actionIcon}>🗑️</Text>
            <Text style={[styles.actionText, styles.dangerText]}>Delete Account</Text>
            <Text style={styles.actionArrow}>›</Text>
          </TouchableOpacity>
        </Card>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <Button
          title="Cancel"
          onPress={() => navigation.goBack()}
          variant="outline"
          style={styles.cancelButton}
        />
        
        <Button
          title="Save Changes"
          onPress={handleSaveProfile}
          loading={loading}
          style={styles.saveChangesButton}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral200,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.neutral100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: typography.fontSize.xl,
    fontWeight: '600',
    color: colors.textDark,
  },
  headerTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: '700',
    color: colors.textDark,
  },
  saveButton: {
    fontSize: typography.fontSize.base,
    fontWeight: '600',
    color: colors.primary,
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  content: {
    flex: 1,
  },
  section: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: spacing.md,
  },
  sectionDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral600,
    marginBottom: spacing.md,
  },
  avatarSection: {
    alignItems: 'center',
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: spacing.md,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: typography.fontSize['3xl'],
    color: 'white',
    fontWeight: '700',
  },
  avatarChangeButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.md,
  },
  avatarChangeText: {
    fontSize: typography.fontSize.base,
  },
  avatarLabel: {
    fontSize: typography.fontSize.base,
    fontWeight: '600',
    color: colors.textDark,
  },
  avatarDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral600,
    textAlign: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  halfInput: {
    flex: 1,
  },
  inputIcon: {
    fontSize: typography.fontSize.base,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  interestChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: colors.neutral300,
    marginBottom: spacing.sm,
  },
  interestEmoji: {
    fontSize: 16,
    marginRight: spacing.xs,
  },
  interestText: {
    fontSize: typography.fontSize.sm,
    color: colors.textDark,
    fontWeight: '500',
  },
  selectedInterestText: {
    color: 'white',
  },
  privacyOptions: {
    gap: spacing.md,
  },
  privacyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  privacyContent: {
    flex: 1,
  },
  privacyTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: '600',
    color: colors.textDark,
  },
  privacyDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral600,
    marginTop: 2,
  },
  privacyValue: {
    fontSize: typography.fontSize.sm,
    color: colors.primary,
    fontWeight: '600',
  },
  privacyToggle: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.full,
    minWidth: 50,
    alignItems: 'center',
  },
  toggleText: {
    fontSize: typography.fontSize.xs,
    color: 'white',
    fontWeight: '600',
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral200,
  },
  dangerAction: {
    borderBottomWidth: 0,
  },
  actionIcon: {
    fontSize: typography.fontSize.lg,
    marginRight: spacing.md,
    width: 24,
  },
  actionText: {
    flex: 1,
    fontSize: typography.fontSize.base,
    color: colors.textDark,
  },
  dangerText: {
    color: colors.error,
  },
  actionArrow: {
    fontSize: typography.fontSize.xl,
    color: colors.neutral400,
  },
  bottomSpacing: {
    height: 120,
  },
  bottomBar: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: colors.neutral200,
    gap: spacing.md,
  },
  cancelButton: {
    flex: 1,
  },
  saveChangesButton: {
    flex: 2,
  },
});