import React, {useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {AuthStackParamList} from '../../navigation/types';
import {Colors, Typography, Spacing} from '../../themes';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

type ForgotPasswordNavigationProp = StackNavigationProp<AuthStackParamList, 'ForgotPassword'>;

const ForgotPasswordScreen: React.FC = () => {
  const navigation = useNavigation<ForgotPasswordNavigationProp>();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendReset = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Show success message or navigate
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={Colors.textBlack} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>
          Enter your email and we'll send you a link to reset your password
        </Text>

        <Input
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Button
          title="Send Reset Link"
          onPress={handleSendReset}
          variant="primary"
          size="large"
          disabled={!email}
          loading={loading}
        />
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
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },
  content: {
    flex: 1,
    padding: Spacing.lg,
    justifyContent: 'center',
  },
  title: {
    ...Typography.displayMedium,
    marginBottom: Spacing.md,
  },
  subtitle: {
    ...Typography.bodyLarge,
    color: Colors.textGray,
    marginBottom: Spacing.xl,
  },
});

export default ForgotPasswordScreen;