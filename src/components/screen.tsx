import { type PropsWithChildren } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

/** Scrollable page with a title, used by every tab. */
export function Screen({
  title,
  overline,
  children,
}: PropsWithChildren<{ title: string; overline?: string }>) {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content}>
          <ThemedView>
            {overline && (
              <ThemedText type="smallBold" themeColor="textSecondary" style={styles.overline}>
                {overline}
              </ThemedText>
            )}
            <ThemedText type="subtitle">{title}</ThemedText>
          </ThemedView>
          {children}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

/** Rounded box for grouping content. */
export function Card({ children }: PropsWithChildren) {
  return (
    <ThemedView type="backgroundElement" style={styles.card}>
      {children}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  safeArea: {
    flex: 1,
    width: '100%',
    maxWidth: MaxContentWidth,
  },
  content: {
    gap: Spacing.three,
    padding: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.four,
  },
  card: {
    gap: Spacing.two,
    padding: Spacing.three,
    borderRadius: 14,
  },
  overline: {
    textTransform: 'uppercase',
  },
});
