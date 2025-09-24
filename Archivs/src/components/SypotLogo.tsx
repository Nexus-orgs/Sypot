import React from 'react';
import { View } from 'react-native';
import Svg, { Path, Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { colors } from '../utils/theme';

interface SypotLogoProps {
  size?: number;
  color?: string;
}

export default function SypotLogo({ size = 64 }: SypotLogoProps) {
  const scaleFactor = size / 64;

  return (
    <View style={{ width: size, height: size }}>
      <Svg 
        width={size} 
        height={size} 
        viewBox="0 0 64 64" 
        fill="none"
      >
        <Defs>
          <LinearGradient id="paint0_linear_logo" x1="8" y1="0" x2="56" y2="64" gradientUnits="userSpaceOnUse">
            <Stop stopColor={colors.primaryOrange} />
            <Stop offset="1" stopColor="#ea580c" />
          </LinearGradient>
          <LinearGradient id="paint1_linear_logo" x1="26" y1="24" x2="38" y2="24" gradientUnits="userSpaceOnUse">
            <Stop stopColor={colors.primary} />
            <Stop offset="1" stopColor="#0d9488" />
          </LinearGradient>
        </Defs>
        
        {/* Main pin shape */}
        <Path
          d="M32 0C18.7452 0 8 10.7452 8 24C8 34.4849 20.4433 49.8134 32 64C43.5567 49.8134 56 34.4849 56 24C56 10.7452 45.2548 0 32 0Z"
          fill="url(#paint0_linear_logo)"
        />
        
        {/* White circle in the pin */}
        <Circle cx="32" cy="24" r="12" fill="white" />
        
        {/* Inner colored circle */}
        <Circle cx="32" cy="24" r="6" fill="url(#paint1_linear_logo)" />
      </Svg>
    </View>
  );
}