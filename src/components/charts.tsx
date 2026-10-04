import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Defs, G, LinearGradient, Path, Stop } from 'react-native-svg';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/** Simple vertical bars. Highlights the last bar unless `highlight` is given. */
export function BarChart({
  data,
  color,
  height = 60,
  labels,
  highlight = data.length - 1,
}: {
  data: number[];
  color: string;
  height?: number;
  labels?: string[];
  highlight?: number;
}) {
  const theme = useTheme();
  const max = Math.max(...data, 1);
  return (
    <View style={styles.gap}>
      <View style={[styles.bars, { height }]}>
        {data.map((value, i) => (
          <View key={i} style={styles.barColumn}>
            <View
              style={[
                styles.bar,
                {
                  height: Math.max((value / max) * height, 2),
                  backgroundColor: i === highlight ? color : color + '55',
                },
              ]}
            />
          </View>
        ))}
      </View>
      {labels && (
        <View style={styles.labels}>
          {labels.map((label, i) => (
            <ThemedText key={i} style={[styles.label, { color: theme.textSecondary }]}>
              {label}
            </ThemedText>
          ))}
        </View>
      )}
    </View>
  );
}

/** Smooth-ish line with a soft gradient fill underneath. */
export function LineChart({
  data,
  color,
  height = 60,
  target,
}: {
  data: number[];
  color: string;
  height?: number;
  /** Optional goal value, drawn as a dashed line. */
  target?: number;
}) {
  const [width, setWidth] = useState(0);
  const all = target === undefined ? data : [...data, target];
  const min = Math.min(...all);
  const max = Math.max(...all);
  const range = max - min || 1;
  const pad = 4;
  const toY = (value: number) => pad + (1 - (value - min) / range) * (height - pad * 2);
  const points = data.map((value, i) => ({
    x: (i / (data.length - 1)) * width,
    y: toY(value),
  }));
  const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const area = `${line} L${width},${height} L0,${height} Z`;
  const last = points[points.length - 1];
  const gradientId = `fill-${color.slice(1)}`;

  return (
    <View style={{ height }} onLayout={(e) => setWidth(e.nativeEvent.layout.width)}>
      {width > 0 && (
        <Svg width={width} height={height}>
          <Defs>
            <LinearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={color} stopOpacity={0.3} />
              <Stop offset="1" stopColor={color} stopOpacity={0} />
            </LinearGradient>
          </Defs>
          {target !== undefined && (
            <Path
              d={`M0,${toY(target)} L${width},${toY(target)}`}
              stroke={color}
              strokeOpacity={0.5}
              strokeWidth={1.5}
              strokeDasharray="4 4"
            />
          )}
          <Path d={area} fill={`url(#${gradientId})`} />
          <Path d={line} stroke={color} strokeWidth={2.5} fill="none" strokeLinejoin="round" />
          <Circle cx={last.x} cy={last.y} r={4} fill={color} />
        </Svg>
      )}
    </View>
  );
}

/** Concentric Apple-style activity rings. `progress` is 0–1 (can exceed 1). */
export function Rings({
  rings,
  size = 110,
}: {
  rings: { progress: number; color: string }[];
  size?: number;
}) {
  const stroke = size / 9;
  return (
    <Svg width={size} height={size}>
      {rings.map((ring, i) => {
        const radius = size / 2 - stroke / 2 - i * (stroke + 2);
        const circumference = 2 * Math.PI * radius;
        const progress = Math.min(ring.progress, 1);
        return (
          <G key={i}>
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={ring.color + '33'}
              strokeWidth={stroke}
              fill="none"
            />
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={ring.color}
              strokeWidth={stroke}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${circumference * progress} ${circumference}`}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
          </G>
        );
      })}
    </Svg>
  );
}

/** Thin horizontal progress bar. */
export function ProgressBar({ value, color }: { value: number; color: string }) {
  return (
    <View style={[styles.track, { backgroundColor: color + '33' }]}>
      <View style={[styles.fill, { width: `${Math.min(value, 1) * 100}%`, backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  gap: {
    gap: Spacing.one,
  },
  bars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 3,
  },
  barColumn: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bar: {
    borderRadius: 3,
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 11,
  },
  track: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 3,
  },
});
