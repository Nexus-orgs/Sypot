export * from './colors';
export * from './typography';
export * from './spacing';

import { Colors } from './colors';
import { Typography } from './typography';
import { Spacing, BorderRadius, Shadows } from './spacing';

export const Theme = {
  colors: Colors,
  typography: Typography,
  spacing: Spacing,
  borderRadius: BorderRadius,
  shadows: Shadows,
};
