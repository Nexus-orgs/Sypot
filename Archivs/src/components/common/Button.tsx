import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors, Typography, BorderRadius, Spacing} from '../../themes';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon,
}) => {
  const getButtonStyles = () => {
    const baseStyles = [styles.button, styles[size]];
    
    if (disabled) {
      baseStyles.push(styles.disabled);
    }
    
    if (style) {
      baseStyles.push(style);
    }
    
    return baseStyles;
  };

  const getTextStyles = () => {
    const baseStyles = [styles.text, styles[`${size}Text`], styles[`${variant}Text`]];
    
    if (textStyle) {
      baseStyles.push(textStyle);
    }
    
    return baseStyles;
  };

  const renderContent = () => (
    <View style={styles.content}>
      {loading && <ActivityIndicator size="small" color={variant === 'primary' ? Colors.textWhite : Colors.primary} style={styles.loader} />}
      {!loading && icon && <View style={styles.icon}>{icon}</View>}
      <Text style={getTextStyles()}>{title}</Text>
    </View>
  );

  if (variant === 'primary') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.8}>
        <LinearGradient
          colors={[Colors.primary, Colors.primaryDark]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={getButtonStyles()}>
          {renderContent()}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[getButtonStyles(), styles[variant]]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}>
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: BorderRadius.lg,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...Typography.buttonText,
    textAlign: 'center',
  },
  icon: {
    marginRight: Spacing.xs,
  },
  loader: {
    marginRight: Spacing.xs,
  },
  
  // Sizes
  small: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    minHeight: 36,
  },
  medium: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    minHeight: 48,
  },
  large: {
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xl,
    minHeight: 56,
  },

  // Text sizes
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },

  // Variants
  primary: {
    backgroundColor: Colors.primary,
  },
  secondary: {
    backgroundColor: Colors.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  text: {
    backgroundColor: 'transparent',
  },

  // Text colors for variants
  primaryText: {
    color: Colors.textWhite,
  },
  secondaryText: {
    color: Colors.textWhite,
  },
  outlineText: {
    color: Colors.primary,
  },
  textText: {
    color: Colors.primary,
  },

  // Disabled state
  disabled: {
    opacity: 0.5,
  },
});

export default Button;