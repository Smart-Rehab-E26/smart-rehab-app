/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#0B1B33',
    background: '#F1F5FB',
    backgroundElement: '#FFFFFF',
    backgroundSelected: '#E3EBF7',
    textSecondary: '#7A8699',
  },
  dark: {
    text: '#ffffff',
    background: '#060B14',
    backgroundElement: '#111A2B',
    backgroundSelected: '#1C2740',
    textSecondary: '#8592A8',
  },
} as const;

/** Smart Rehab brand blues, plus status colors for good/warning. */
export const Brand = {
  primary: '#1769FF',
  deep: '#0A3FA8',
  sky: '#4FA3FF',
  ice: '#8CC4FF',
  navy: '#0B2A66',
  success: '#22C38E',
  warning: '#FF9F0A',
  danger: '#FF4D6A',
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80, web: 80 }) ?? 0;
export const MaxContentWidth = 800;
