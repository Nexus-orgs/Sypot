import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Colors, Typography, BorderRadius, Spacing} from '../../themes';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  error?: string;
  disabled?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  leftIcon?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
  style?: ViewStyle;
  inputStyle?: TextStyle;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  error,
  disabled = false,
  multiline = false,
  numberOfLines = 1,
  leftIcon,
  rightIcon,
  onRightIconPress,
  style,
  inputStyle,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const getContainerStyles = () => {
    const baseStyles = [styles.container];
    
    if (isFocused) {
      baseStyles.push(styles.focused);
    }
    
    if (error) {
      baseStyles.push(styles.error);
    }
    
    if (disabled) {
      baseStyles.push(styles.disabled);
    }
    
    if (style) {
      baseStyles.push(style);
    }
    
    return baseStyles;
  };

  const getInputStyles = () => {
    const baseStyles = [styles.input];
    
    if (leftIcon) {
      baseStyles.push(styles.inputWithLeftIcon);
    }
    
    if (rightIcon) {
      baseStyles.push(styles.inputWithRightIcon);
    }
    
    if (multiline) {
      baseStyles.push(styles.multilineInput);
    }
    
    if (inputStyle) {
      baseStyles.push(inputStyle);
    }
    
    return baseStyles;
  };

  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <View style={getContainerStyles()}>
        {leftIcon && (
          <View style={styles.leftIconContainer}>
            <Icon name={leftIcon} size={20} color={Colors.textGray} />
          </View>
        )}
        
        <TextInput
          style={getInputStyles()}
          placeholder={placeholder}
          placeholderTextColor={Colors.textGray}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          editable={!disabled}
          multiline={multiline}
          numberOfLines={multiline ? numberOfLines : 1}
          textAlignVertical={multiline ? 'top' : 'center'}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        
        {rightIcon && (
          <TouchableOpacity
            style={styles.rightIconContainer}
            onPress={onRightIconPress}
            disabled={!onRightIconPress}>
            <Icon name={rightIcon} size={20} color={Colors.textGray} />
          </TouchableOpacity>
        )}
      </View>
      
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: Spacing.md,
  },
  label: {
    ...Typography.label,
    marginBottom: Spacing.xs,
    color: Colors.textBlack,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral200,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: 'transparent',
    minHeight: 56,
  },
  focused: {
    borderColor: Colors.primary,
    backgroundColor: Colors.backgroundLight,
  },
  error: {
    borderColor: Colors.error,
  },
  disabled: {
    opacity: 0.6,
    backgroundColor: Colors.neutral100,
  },
  input: {
    flex: 1,
    ...Typography.bodyMedium,
    color: Colors.textBlack,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  inputWithLeftIcon: {
    paddingLeft: 0,
  },
  inputWithRightIcon: {
    paddingRight: 0,
  },
  multilineInput: {
    minHeight: 100,
    maxHeight: 150,
  },
  leftIconContainer: {
    paddingLeft: Spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightIconContainer: {
    paddingRight: Spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    ...Typography.error,
    marginTop: Spacing.xs,
  },
});

export default Input;