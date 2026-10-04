import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import { Children, type PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type Props = PropsWithChildren<{
  title: string;
  icon: SymbolViewProps['name'];
  color: string;
  /** Small grey text top-right, e.g. a time. */
  meta?: string;
}>;

/** Apple Health-style card: coloured icon + title, then content. */
export function Widget({ title, icon, color, meta, children }: Props) {
  const theme = useTheme();
  return (
    <ThemedView type="backgroundElement" style={styles.card}>
      <View style={styles.header}>
        <SymbolView name={icon} tintColor={color} size={16} />
        <ThemedText type="smallBold" style={[styles.title, { color }]}>
          {title}
        </ThemedText>
        {meta && (
          <ThemedText type="small" style={{ color: theme.textSecondary }}>
            {meta}
          </ThemedText>
        )}
        <ThemedText type="small" style={{ color: theme.textSecondary }}>
          ›
        </ThemedText>
      </View>
      {children}
    </ThemedView>
  );
}

/** Big number with a small unit, e.g. "8,432 steps". */
export function Metric({ value, unit }: { value: string; unit?: string }) {
  const theme = useTheme();
  return (
    <ThemedText style={styles.value}>
      {value}
      {unit && <ThemedText style={[styles.unit, { color: theme.textSecondary }]}> {unit}</ThemedText>}
    </ThemedText>
  );
}

/** Two widgets side by side. */
export function WidgetRow({ children }: PropsWithChildren) {
  return (
    <View style={styles.row}>
      {Children.map(children, (child) => (
        <View style={styles.rowItem}>{child}</View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexGrow: 1,
    gap: Spacing.two,
    padding: Spacing.three,
    borderRadius: 14,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one + 2,
  },
  title: {
    flex: 1,
  },
  value: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: 700,
  },
  unit: {
    fontSize: 15,
    fontWeight: 600,
  },
  rowItem: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
});
