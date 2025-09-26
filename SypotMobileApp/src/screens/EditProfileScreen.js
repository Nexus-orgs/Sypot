import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { theme } from '../styles/theme';

const EditProfileScreen = ({ navigation }) => {
  const [profileData, setProfileData] = useState({
    name: 'Alex Johnson',
    username: 'alexj',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    bio: 'Adventure seeker | Music lover | Food enthusiast',
    location: 'New York, NY',
    website: 'www.alexjohnson.com',
    interests: ['Music', 'Sports', 'Food', 'Tech', 'Art'],
  });

  const [errors, setErrors] = useState({});

  const CameraIcon = () => (
    <Svg width={24} height={24} fill={theme.colors.white} viewBox="0 0 256 256">
      <Path d="M208,56H180.28L166.65,35.56A8,8,0,0,0,160,32H96a8,8,0,0,0-6.65,3.56L75.72,56H48A24,24,0,0,0,24,80V192a24,24,0,0,0,24,24H208a24,24,0,0,0,24-24V80A24,24,0,0,0,208,56Zm8,136a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V80a8,8,0,0,1,8-8H80a8,8,0,0,0,6.65-3.56L100.28,48h55.44l13.63,20.44A8,8,0,0,0,176,72h32a8,8,0,0,1,8,8ZM128,88a44,44,0,1,0,44,44A44.05,44.05,0,0,0,128,88Zm0,72a28,28,0,1,1,28-28A28,28,0,0,1,128,160Z" />
    </Svg>
  );

  const allInterests = [
    'Music', 'Sports', 'Art', 'Food', 'Tech', 'Business',
    'Outdoor', 'Travel', 'Photography', 'Gaming', 'Fashion',
    'Fitness', 'Movies', 'Reading', 'Cooking', 'Dancing',
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!profileData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!profileData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (profileData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(profileData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }
    
    if (!profileData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(profileData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (profileData.phone && !/^[\d\s\-\+\(\)]+$/.test(profileData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (profileData.bio && profileData.bio.length > 150) {
      newErrors.bio = 'Bio must be less than 150 characters';
    }
    
    if (profileData.website && !profileData.website.match(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/)) {
      newErrors.website = 'Please enter a valid website URL';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      Alert.alert(
        'Success',
        'Your profile has been updated successfully!',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } else {
      Alert.alert('Validation Error', 'Please fix the errors before saving');
    }
  };

  const updateProfileData = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const toggleInterest = (interest) => {
    setProfileData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleChangePhoto = () => {
    Alert.alert(
      'Change Profile Photo',
      'Choose an option',
      [
        { text: 'Take Photo', onPress: () => console.log('Camera') },
        { text: 'Choose from Library', onPress: () => console.log('Library') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Edit Profile</Text>
            <TouchableOpacity onPress={handleSave}>
              <Text style={styles.saveButton}>Save</Text>
            </TouchableOpacity>
          </View>

          {/* Profile Photo */}
          <View style={styles.photoSection}>
            <TouchableOpacity style={styles.photoContainer} onPress={handleChangePhoto}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400' }}
                style={styles.profilePhoto}
              />
              <View style={styles.cameraButton}>
                <CameraIcon />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleChangePhoto}>
              <Text style={styles.changePhotoText}>Change Profile Photo</Text>
            </TouchableOpacity>
          </View>

          {/* Form Fields */}
          <View style={styles.form}>
            {/* Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Name *</Text>
              <TextInput
                style={[styles.input, errors.name && styles.inputError]}
                value={profileData.name}
                onChangeText={(text) => updateProfileData('name', text)}
                placeholder="Enter your name"
                placeholderTextColor={theme.colors.gray[400]}
              />
              {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
            </View>

            {/* Username */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Username *</Text>
              <TextInput
                style={[styles.input, errors.username && styles.inputError]}
                value={profileData.username}
                onChangeText={(text) => updateProfileData('username', text.toLowerCase())}
                placeholder="Choose a username"
                placeholderTextColor={theme.colors.gray[400]}
                autoCapitalize="none"
              />
              {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
            </View>

            {/* Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email *</Text>
              <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                value={profileData.email}
                onChangeText={(text) => updateProfileData('email', text)}
                placeholder="Enter your email"
                placeholderTextColor={theme.colors.gray[400]}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            </View>

            {/* Phone */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone</Text>
              <TextInput
                style={[styles.input, errors.phone && styles.inputError]}
                value={profileData.phone}
                onChangeText={(text) => updateProfileData('phone', text)}
                placeholder="Enter your phone number"
                placeholderTextColor={theme.colors.gray[400]}
                keyboardType="phone-pad"
              />
              {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
            </View>

            {/* Bio */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Bio ({profileData.bio.length}/150)
              </Text>
              <TextInput
                style={[styles.input, styles.textArea, errors.bio && styles.inputError]}
                value={profileData.bio}
                onChangeText={(text) => updateProfileData('bio', text)}
                placeholder="Tell us about yourself"
                placeholderTextColor={theme.colors.gray[400]}
                multiline
                numberOfLines={3}
                maxLength={150}
                textAlignVertical="top"
              />
              {errors.bio && <Text style={styles.errorText}>{errors.bio}</Text>}
            </View>

            {/* Location */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Location</Text>
              <TextInput
                style={styles.input}
                value={profileData.location}
                onChangeText={(text) => updateProfileData('location', text)}
                placeholder="City, State/Country"
                placeholderTextColor={theme.colors.gray[400]}
              />
            </View>

            {/* Website */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Website</Text>
              <TextInput
                style={[styles.input, errors.website && styles.inputError]}
                value={profileData.website}
                onChangeText={(text) => updateProfileData('website', text)}
                placeholder="www.yourwebsite.com"
                placeholderTextColor={theme.colors.gray[400]}
                keyboardType="url"
                autoCapitalize="none"
              />
              {errors.website && <Text style={styles.errorText}>{errors.website}</Text>}
            </View>

            {/* Interests */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Interests</Text>
              <View style={styles.interestsContainer}>
                {allInterests.map((interest) => (
                  <TouchableOpacity
                    key={interest}
                    style={[
                      styles.interestChip,
                      profileData.interests.includes(interest) && styles.interestChipActive,
                    ]}
                    onPress={() => toggleInterest(interest)}
                  >
                    <Text
                      style={[
                        styles.interestText,
                        profileData.interests.includes(interest) && styles.interestTextActive,
                      ]}
                    >
                      {interest}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Account Actions */}
            <View style={styles.accountActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Change Password</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={[styles.actionButtonText, { color: theme.colors.error }]}>
                  Delete Account
                </Text>
              </TouchableOpacity>
            </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  cancelButton: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.gray[600],
  },
  headerTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: 'bold',
    color: theme.colors.textLight,
  },
  saveButton: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  photoSection: {
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
  },
  photoContainer: {
    position: 'relative',
    marginBottom: theme.spacing.sm,
  },
  profilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: theme.colors.white,
  },
  changePhotoText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.primary,
    fontWeight: '500',
  },
  form: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
  inputGroup: {
    marginBottom: theme.spacing.lg,
  },
  label: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '500',
    color: theme.colors.textLight,
    marginBottom: theme.spacing.xs,
  },
  input: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    borderRadius: theme.borderRadius.default,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textLight,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  textArea: {
    minHeight: 80,
    paddingTop: theme.spacing.md,
  },
  errorText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.error,
    marginTop: 4,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: theme.spacing.sm,
  },
  interestChip: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.gray[100],
    marginRight: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
  },
  interestChipActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  interestText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.textLight,
  },
  interestTextActive: {
    color: theme.colors.white,
  },
  accountActions: {
    marginTop: theme.spacing.xl,
    paddingTop: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[200],
  },
  actionButton: {
    paddingVertical: theme.spacing.md,
  },
  actionButtonText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.primary,
    fontWeight: '500',
  },
});

export default EditProfileScreen;