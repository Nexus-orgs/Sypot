import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {Colors, Typography, Spacing} from '../../themes';

const CreateEventScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>CreateEventScreen</Text>
        <Text style={styles.subtitle}>Create and organize your own events</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLight,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  title: {
    ...Typography.displayMedium,
    color: Colors.textBlack,
    marginBottom: Spacing.md,
  },
  subtitle: {
    ...Typography.bodyLarge,
    color: Colors.textGray,
    textAlign: 'center',
  },
});

export default CreateEventScreen;
