import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Typography, Shadows } from '../../themes';

interface LogoProps {
  size?: number;
  style?: any;
}

const Logo: React.FC<LogoProps> = ({ size = 128, style }) => {
  const scaledSize = size;
  const innerSize = scaledSize * 0.6;

  return (
    <View
      style={[
        styles.container,
        style,
        { width: scaledSize, height: scaledSize },
      ]}
    >
      <LinearGradient
        colors={['#f97316', '#ea580c']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.pinShape,
          {
            width: scaledSize,
            height: scaledSize,
            borderRadius: scaledSize / 2,
          },
        ]}
      >
        {/* White inner circle */}
        <View
          style={[
            styles.innerCircle,
            {
              width: innerSize * 0.7,
              height: innerSize * 0.7,
              borderRadius: (innerSize * 0.7) / 2,
            },
          ]}
        >
          {/* Teal center dot */}
          <LinearGradient
            colors={['#14b8a6', '#0d9488']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[
              styles.centerDot,
              {
                width: innerSize * 0.35,
                height: innerSize * 0.35,
                borderRadius: (innerSize * 0.35) / 2,
              },
            ]}
          />
        </View>

        {/* Pin pointer effect */}
        <View
          style={[
            styles.pinPointer,
            {
              bottom: -scaledSize * 0.2,
              borderLeftWidth: scaledSize * 0.15,
              borderRightWidth: scaledSize * 0.15,
              borderTopWidth: scaledSize * 0.2,
            },
          ]}
        />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.pin,
  },
  pinShape: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  innerCircle: {
    backgroundColor: Colors.textWhite,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerDot: {
    // gradient applied via LinearGradient
  },
  pinPointer: {
    position: 'absolute',
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#ea580c',
  },
});

export default Logo;
