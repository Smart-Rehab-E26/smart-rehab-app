import { useState, type PropsWithChildren } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import { Brand, Spacing } from '@/constants/theme';

let nextId = 0;

/** Card with the brand blue gradient behind its content. */
export function GradientCard({ children, style }: PropsWithChildren<{ style?: StyleProp<ViewStyle> }>) {
  // The SVG needs explicit pixel sizes on Android, so measure the card first.
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [id] = useState(() => `gradient-${nextId++}`);

  return (
    <View
      style={[styles.card, style]}
      onLayout={(e) => setSize({ width: e.nativeEvent.layout.width, height: e.nativeEvent.layout.height })}>
      {size.width > 0 && (
        <Svg width={size.width} height={size.height} style={StyleSheet.absoluteFill}>
          <Defs>
            <LinearGradient id={id} x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0" stopColor={Brand.sky} />
              <Stop offset="0.55" stopColor={Brand.primary} />
              <Stop offset="1" stopColor={Brand.navy} />
            </LinearGradient>
          </Defs>
          <Rect width={size.width} height={size.height} fill={`url(#${id})`} />
        </Svg>
      )}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    padding: Spacing.three + 4,
    gap: Spacing.three,
    backgroundColor: Brand.primary,
  },
});
