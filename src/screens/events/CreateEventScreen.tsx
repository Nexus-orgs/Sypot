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

import { colors, spacing, typography, borderRadius } from '../../utils/theme';
import { eventCategories } from '../../services/mockData';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Card from '../../components/Card';

interface EventFormData {
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  location: string;
  price: string;
  maxAttendees: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function CreateEventScreen() {
  const navigation = useNavigation();
  
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    description: '',
    category: '',
    date: '',
    time: '',
    location: '',
    price: '',
    maxAttendees: '',
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Event title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Event description is required';
    } else if (formData.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    if (!formData.date.trim()) {
      newErrors.date = 'Event date is required';
    }

    if (!formData.time.trim()) {
      newErrors.time = 'Event time is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Event location is required';
    }

    if (formData.price && isNaN(Number(formData.price))) {
      newErrors.price = 'Price must be a valid number';
    }

    if (formData.maxAttendees && isNaN(Number(formData.maxAttendees))) {
      newErrors.maxAttendees = 'Max attendees must be a valid number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof EventFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleCreateEvent = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'Success!',
        'Your event has been created successfully.',
        [
          { 
            text: 'OK', 
            onPress: () => navigation.goBack() 
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to create event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const CategorySelector = () => (
    <Card style={styles.categoryCard}>
      <Text style={styles.inputLabel}>Category *</Text>
      <View style={styles.categoriesContainer}>
        {eventCategories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryChip,
              formData.category === category.name && {
                backgroundColor: category.color,
              }
            ]}
            onPress={() => handleInputChange('category', category.name)}
          >
            <Text style={styles.categoryEmoji}>{category.emoji}</Text>
            <Text style={[
              styles.categoryText,
              formData.category === category.name && styles.selectedCategoryText
            ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {errors.category && (
        <Text style={styles.errorText}>{errors.category}</Text>
      )}
    </Card>
  );

  const ImageUploadPlaceholder = () => (
    <Card style={styles.imageUploadCard}>
      <Text style={styles.inputLabel}>Event Image</Text>
      <TouchableOpacity 
        style={styles.imageUploadArea}
        onPress={() => Alert.alert('Image Upload', 'Photo selection will be implemented with image picker.')}
      >
        <Text style={styles.imageUploadIcon}>📷</Text>
        <Text style={styles.imageUploadText}>Add Event Photo</Text>
        <Text style={styles.imageUploadSubtext}>
          Upload an attractive image for your event
        </Text>
      </TouchableOpacity>
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
        
        <Text style={styles.headerTitle}>Create Event</Text>
        
        <TouchableOpacity 
          style={styles.helpButton}
          onPress={() => Alert.alert('Help', 'Need help creating your event? Contact our support team.')}
        >
          <Text style={styles.helpButtonText}>?</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Basic Information */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Event Details</Text>
          
          <Input
            label="Event Title"
            placeholder="Enter a catchy event title"
            value={formData.title}
            onChangeText={(value) => handleInputChange('title', value)}
            error={errors.title}
            leftIcon={<Text style={styles.inputIcon}>🎉</Text>}
          />

          <Input
            label="Description"
            placeholder="Describe your event in detail..."
            value={formData.description}
            onChangeText={(value) => handleInputChange('description', value)}
            error={errors.description}
            multiline
            style={styles.textArea}
            leftIcon={<Text style={styles.inputIcon}>📝</Text>}
          />
        </Card>

        {/* Category Selection */}
        <CategorySelector />

        {/* Image Upload */}
        <ImageUploadPlaceholder />

        {/* Date & Time */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>When</Text>
          
          <View style={styles.dateTimeRow}>
            <Input
              label="Date"
              placeholder="MM/DD/YYYY"
              value={formData.date}
              onChangeText={(value) => handleInputChange('date', value)}
              error={errors.date}
              containerStyle={styles.halfInput}
              leftIcon={<Text style={styles.inputIcon}>📅</Text>}
            />
            
            <Input
              label="Time"
              placeholder="HH:MM AM/PM"
              value={formData.time}
              onChangeText={(value) => handleInputChange('time', value)}
              error={errors.time}
              containerStyle={styles.halfInput}
              leftIcon={<Text style={styles.inputIcon}>🕐</Text>}
            />
          </View>
        </Card>

        {/* Location */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Where</Text>
          
          <Input
            label="Location"
            placeholder="Enter venue address or name"
            value={formData.location}
            onChangeText={(value) => handleInputChange('location', value)}
            error={errors.location}
            leftIcon={<Text style={styles.inputIcon}>📍</Text>}
            rightIcon={
              <TouchableOpacity onPress={() => Alert.alert('Map', 'Location picker will be integrated with maps.')}>
                <Text style={styles.mapIcon}>🗺️</Text>
              </TouchableOpacity>
            }
          />
        </Card>

        {/* Pricing & Capacity */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Pricing & Capacity</Text>
          
          <Input
            label="Ticket Price (Optional)"
            placeholder="0.00 (Leave empty for free events)"
            value={formData.price}
            onChangeText={(value) => handleInputChange('price', value)}
            error={errors.price}
            keyboardType="numeric"
            leftIcon={<Text style={styles.inputIcon}>💰</Text>}
            helperText="Leave empty for free events"
          />
          
          <Input
            label="Max Attendees (Optional)"
            placeholder="Enter maximum number of attendees"
            value={formData.maxAttendees}
            onChangeText={(value) => handleInputChange('maxAttendees', value)}
            error={errors.maxAttendees}
            keyboardType="numeric"
            leftIcon={<Text style={styles.inputIcon}>👥</Text>}
            helperText="Leave empty for unlimited attendance"
          />
        </Card>

        {/* Additional Options */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Options</Text>
          
          <View style={styles.optionsContainer}>
            <TouchableOpacity style={styles.optionItem}>
              <Text style={styles.optionIcon}>📋</Text>
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>Require Registration</Text>
                <Text style={styles.optionDescription}>
                  Attendees must register before joining
                </Text>
              </View>
              <View style={styles.optionToggle}>
                <Text style={styles.toggleText}>ON</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.optionItem}>
              <Text style={styles.optionIcon}>🔒</Text>
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>Private Event</Text>
                <Text style={styles.optionDescription}>
                  Only invited people can see and join
                </Text>
              </View>
              <View style={styles.optionToggle}>
                <Text style={styles.toggleText}>OFF</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Card>

        {/* Preview Button */}
        <Card style={styles.section}>
          <Button
            title="Preview Event"
            onPress={() => Alert.alert('Preview', 'Event preview will show how your event will look to attendees.')}
            variant="outline"
            fullWidth
          />
        </Card>

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <Button
          title="Save as Draft"
          onPress={() => Alert.alert('Draft Saved', 'Your event has been saved as a draft.')}
          variant="outline"
          style={styles.draftButton}
        />
        
        <Button
          title="Create Event"
          onPress={handleCreateEvent}
          loading={loading}
          style={styles.createButton}
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
  helpButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.neutral100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  helpButtonText: {
    fontSize: typography.fontSize.lg,
    fontWeight: '600',
    color: colors.textDark,
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
  inputIcon: {
    fontSize: typography.fontSize.base,
  },
  mapIcon: {
    fontSize: typography.fontSize.base,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  inputLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: spacing.sm,
  },
  errorText: {
    fontSize: typography.fontSize.xs,
    color: colors.error,
    marginTop: spacing.xs,
  },
  categoryCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  categoryChip: {
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
  categoryEmoji: {
    fontSize: 16,
    marginRight: spacing.xs,
  },
  categoryText: {
    fontSize: typography.fontSize.sm,
    color: colors.textDark,
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: 'white',
  },
  imageUploadCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  imageUploadArea: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    backgroundColor: colors.neutral50,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderColor: colors.neutral200,
    borderStyle: 'dashed',
  },
  imageUploadIcon: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  imageUploadText: {
    fontSize: typography.fontSize.base,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: spacing.xs,
  },
  imageUploadSubtext: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral600,
    textAlign: 'center',
  },
  dateTimeRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  halfInput: {
    flex: 1,
  },
  optionsContainer: {
    gap: spacing.md,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  optionIcon: {
    fontSize: typography.fontSize.lg,
    marginRight: spacing.md,
    width: 24,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: '600',
    color: colors.textDark,
  },
  optionDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral600,
    marginTop: 2,
  },
  optionToggle: {
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
  draftButton: {
    flex: 1,
  },
  createButton: {
    flex: 1.5,
  },
});