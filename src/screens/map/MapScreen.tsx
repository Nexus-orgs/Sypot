import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import { colors, spacing, typography, borderRadius, shadows } from '../../utils/theme';

export default function MapScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.backgroundLight} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Map</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.headerButton}>
            <Text style={styles.headerButtonText}>🔍</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Text style={styles.headerButtonText}>📍</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Map Placeholder */}
      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapIcon}>🗺️</Text>
          <Text style={styles.mapText}>Map View</Text>
          <Text style={styles.mapSubtext}>
            Discover events and places around you
          </Text>
        </View>
        
        {/* Map Controls */}
        <View style={styles.mapControls}>
          <TouchableOpacity style={styles.controlButton}>
            <Text style={styles.controlText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton}>
            <Text style={styles.controlText}>-</Text>
          </TouchableOpacity>
        </View>
        
        {/* Current Location Button */}
        <TouchableOpacity style={styles.locationButton}>
          <Text style={styles.locationText}>📍</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Sheet Placeholder */}
      <View style={styles.bottomSheet}>
        <View style={styles.handle} />
        <Text style={styles.bottomSheetTitle}>Nearby Events</Text>
        
        {/* Sample event items */}
        {[1, 2, 3].map((index) => (
          <TouchableOpacity key={index} style={styles.eventItem}>
            <View style={styles.eventIcon}>
              <Text style={styles.eventIconText}>🎉</Text>
            </View>
            <View style={styles.eventInfo}>
              <Text style={styles.eventTitle}>Event {index}</Text>
              <Text style={styles.eventDistance}>0.{index * 2} km away</Text>
            </View>
          </TouchableOpacity>
        ))}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  title: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: '700',
    color: colors.textDark,
  },
  headerButtons: {
    flexDirection: 'row',
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.sm,
    ...shadows.sm,
  },
  headerButtonText: {
    fontSize: typography.fontSize.base,
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
    backgroundColor: colors.neutral100,
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapIcon: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  mapText: {
    fontSize: typography.fontSize.xl,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: spacing.xs,
  },
  mapSubtext: {
    fontSize: typography.fontSize.base,
    color: colors.neutral600,
    textAlign: 'center',
  },
  mapControls: {
    position: 'absolute',
    top: spacing.lg,
    right: spacing.lg,
  },
  controlButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
    ...shadows.md,
  },
  controlText: {
    fontSize: typography.fontSize.lg,
    fontWeight: '600',
    color: colors.textDark,
  },
  locationButton: {
    position: 'absolute',
    bottom: spacing.xl,
    right: spacing.lg,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.lg,
  },
  locationText: {
    fontSize: typography.fontSize.lg,
  },
  bottomSheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    maxHeight: 300,
    ...shadows.lg,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: colors.neutral300,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: spacing.md,
  },
  bottomSheetTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: spacing.md,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  eventIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.neutral100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  eventIconText: {
    fontSize: typography.fontSize.base,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: '600',
    color: colors.textDark,
  },
  eventDistance: {
    fontSize: typography.fontSize.sm,
    color: colors.neutral600,
    marginTop: 2,
  },
});