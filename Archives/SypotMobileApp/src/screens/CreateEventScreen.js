import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { theme } from '../styles/theme';
import {
  validateRequired,
  validateDate,
  validateTime,
  validatePrice,
  validateNumber,
} from '../utils/validation';

const CreateEventScreen = ({ navigation }) => {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    time: '',
    category: 'Music',
    maxAttendees: '',
    price: '',
  });

  const categories = [
    'Music',
    'Sports',
    'Art',
    'Food',
    'Tech',
    'Business',
    'Outdoor',
    'Social',
  ];

  const CameraIcon = () => (
    <Svg
      width={32}
      height={32}
      fill={theme.colors.gray[400]}
      viewBox="0 0 256 256"
    >
      <Path d="M208,56H180.28L166.65,35.56A8,8,0,0,0,160,32H96a8,8,0,0,0-6.65,3.56L75.72,56H48A24,24,0,0,0,24,80V192a24,24,0,0,0,24,24H208a24,24,0,0,0,24-24V80A24,24,0,0,0,208,56Zm8,136a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V80a8,8,0,0,1,8-8H80a8,8,0,0,0,6.65-3.56L100.28,48h55.44l13.63,20.44A8,8,0,0,0,176,72h32a8,8,0,0,1,8,8ZM128,88a44,44,0,1,0,44,44A44.05,44.05,0,0,0,128,88Zm0,72a28,28,0,1,1,28-28A28,28,0,0,1,128,160Z" />
    </Svg>
  );

  const LocationIcon = () => (
    <Svg
      width={20}
      height={20}
      fill={theme.colors.gray[500]}
      viewBox="0 0 256 256"
    >
      <Path d="M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Z" />
    </Svg>
  );

  const CalendarIcon = () => (
    <Svg
      width={20}
      height={20}
      fill={theme.colors.gray[500]}
      viewBox="0 0 256 256"
    >
      <Path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM48,208V96H208V208Z" />
    </Svg>
  );

  const handleCreateEvent = () => {
    // Validate form
    const errors = {};

    const titleError = validateRequired(eventData.title, 'Event title');
    if (titleError) {
      errors.title = titleError;
    }

    const locationError = validateRequired(eventData.location, 'Location');
    if (locationError) {
      errors.location = locationError;
    }

    const dateError = validateDate(eventData.date);
    if (dateError) {
      errors.date = dateError;
    }

    if (eventData.time) {
      const timeError = validateTime(eventData.time);
      if (timeError) {
        errors.time = timeError;
      }
    }

    if (eventData.price) {
      const priceError = validatePrice(eventData.price);
      if (priceError) {
        errors.price = priceError;
      }
    }

    if (eventData.maxAttendees) {
      const attendeesError = validateNumber(eventData.maxAttendees, 1, 10000);
      if (attendeesError) {
        errors.maxAttendees = attendeesError;
      }
    }

    if (Object.keys(errors).length > 0) {
      const errorMessage = Object.values(errors).join('\n');
      Alert.alert('Validation Error', errorMessage);
      return;
    }

    Alert.alert('Success', 'Event created successfully!', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  const updateEventData = (field, value) => {
    setEventData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.cancelButton}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Event</Text>
          <TouchableOpacity onPress={handleCreateEvent}>
            <Text style={styles.createButton}>Create</Text>
          </TouchableOpacity>
        </View>

        {/* Event Image Upload */}
        <TouchableOpacity style={styles.imageUpload} activeOpacity={0.8}>
          <CameraIcon />
          <Text style={styles.imageUploadText}>Add Event Cover Photo</Text>
          <Text style={styles.imageUploadHint}>Recommended: 16:9 ratio</Text>
        </TouchableOpacity>

        {/* Event Details Form */}
        <View style={styles.form}>
          {/* Event Title */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Event Title *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter event title"
              placeholderTextColor={theme.colors.gray[400]}
              value={eventData.title}
              onChangeText={text => updateEventData('title', text)}
            />
          </View>

          {/* Category Selection */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Category</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.categoryContainer}
            >
              {categories.map(cat => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.categoryChip,
                    eventData.category === cat && styles.categoryChipActive,
                  ]}
                  onPress={() => updateEventData('category', cat)}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      eventData.category === cat && styles.categoryTextActive,
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Description */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe your event"
              placeholderTextColor={theme.colors.gray[400]}
              value={eventData.description}
              onChangeText={text => updateEventData('description', text)}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Location */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Location *</Text>
            <View style={styles.inputWithIcon}>
              <LocationIcon />
              <TextInput
                style={styles.inputField}
                placeholder="Add location"
                placeholderTextColor={theme.colors.gray[400]}
                value={eventData.location}
                onChangeText={text => updateEventData('location', text)}
              />
            </View>
          </View>

          {/* Date & Time */}
          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.label}>Date *</Text>
              <View style={styles.inputWithIcon}>
                <CalendarIcon />
                <TextInput
                  style={styles.inputField}
                  placeholder="MM/DD/YYYY"
                  placeholderTextColor={theme.colors.gray[400]}
                  value={eventData.date}
                  onChangeText={text => updateEventData('date', text)}
                />
              </View>
            </View>
            <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.label}>Time</Text>
              <TextInput
                style={styles.input}
                placeholder="HH:MM AM/PM"
                placeholderTextColor={theme.colors.gray[400]}
                value={eventData.time}
                onChangeText={text => updateEventData('time', text)}
              />
            </View>
          </View>

          {/* Attendees & Price */}
          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.label}>Max Attendees</Text>
              <TextInput
                style={styles.input}
                placeholder="No limit"
                placeholderTextColor={theme.colors.gray[400]}
                value={eventData.maxAttendees}
                onChangeText={text => updateEventData('maxAttendees', text)}
                keyboardType="numeric"
              />
            </View>
            <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.label}>Price</Text>
              <TextInput
                style={styles.input}
                placeholder="Free"
                placeholderTextColor={theme.colors.gray[400]}
                value={eventData.price}
                onChangeText={text => updateEventData('price', text)}
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Create Button */}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleCreateEvent}
            activeOpacity={0.8}
          >
            <Text style={styles.submitButtonText}>Create Event</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  createButton: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  imageUpload: {
    height: 200,
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    backgroundColor: theme.colors.gray[100],
    borderRadius: theme.borderRadius.lg,
    borderWidth: 2,
    borderColor: theme.colors.gray[300],
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageUploadText: {
    marginTop: theme.spacing.sm,
    fontSize: theme.typography.fontSize.base,
    fontWeight: '500',
    color: theme.colors.gray[700],
  },
  imageUploadHint: {
    marginTop: 4,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.gray[500],
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
    marginBottom: theme.spacing.sm,
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
  textArea: {
    minHeight: 100,
    paddingTop: theme.spacing.md,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    borderRadius: theme.borderRadius.default,
    paddingHorizontal: theme.spacing.md,
  },
  inputField: {
    flex: 1,
    marginLeft: theme.spacing.sm,
    paddingVertical: theme.spacing.md,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.textLight,
  },
  categoryContainer: {
    flexDirection: 'row',
  },
  categoryChip: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.gray[100],
    marginRight: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.gray[200],
  },
  categoryChipActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  categoryText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: '500',
    color: theme.colors.textLight,
  },
  categoryTextActive: {
    color: theme.colors.white,
  },
  row: {
    flexDirection: 'row',
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.full,
    alignItems: 'center',
    marginTop: theme.spacing.lg,
    ...theme.shadows.default,
  },
  submitButtonText: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: 'bold',
    color: theme.colors.white,
  },
});

export default CreateEventScreen;
