import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { GradientCard } from '@/components/gradient-card';
import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Brand, Spacing } from '@/constants/theme';
import { exerciseCategories, exercises, type ExerciseCategory } from '@/data/mock-data';
import { useTheme } from '@/hooks/use-theme';

const categoryIcons: Record<ExerciseCategory, SymbolViewProps['name']> = {
  Mobility: { ios: 'arrow.triangle.2.circlepath', android: 'sync', web: 'sync' },
  Strength: { ios: 'dumbbell.fill', android: 'fitness_center', web: 'fitness_center' },
  Balance: { ios: 'figure.stand', android: 'accessibility_new', web: 'accessibility_new' },
};

export default function ExercisesScreen() {
  const theme = useTheme();
  const [category, setCategory] = useState<(typeof exerciseCategories)[number]>('All');
  const upNext = exercises[2];
  const shown = category === 'All' ? exercises : exercises.filter((e) => e.category === category);

  return (
    <Screen overline="Week 6 programme" title="Exercises">
      <GradientCard>
        <Text style={styles.heroOverline}>UP NEXT</Text>
        <Text style={styles.heroTitle}>{upNext.name}</Text>
        <Text style={styles.heroBody}>
          {upNext.sets} × {upNext.reps} · {upNext.durationMin} min · keep the knee at {upNext.targetAngle}°
        </Text>
        <Pressable style={({ pressed }) => [styles.heroButton, pressed && styles.pressed]}>
          <Text style={styles.heroButtonText}>Start exercise</Text>
        </Pressable>
      </GradientCard>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
        {exerciseCategories.map((c) => {
          const selected = c === category;
          return (
            <Pressable
              key={c}
              onPress={() => setCategory(c)}
              style={[styles.chip, { backgroundColor: selected ? Brand.primary : theme.backgroundElement }]}>
              <ThemedText type="smallBold" style={selected && styles.chipTextSelected}>
                {c}
              </ThemedText>
            </Pressable>
          );
        })}
      </ScrollView>

      {shown.map((exercise) => (
        <ThemedView key={exercise.id} type="backgroundElement" style={styles.row}>
          <View style={[styles.iconTile, { backgroundColor: Brand.primary + '1A' }]}>
            <SymbolView name={categoryIcons[exercise.category]} tintColor={Brand.primary} size={22} />
          </View>
          <View style={styles.rowText}>
            <ThemedText type="smallBold">{exercise.name}</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {exercise.sets} × {exercise.reps} · {exercise.durationMin} min · {exercise.targetAngle}°
            </ThemedText>
          </View>
          <ThemedText themeColor="textSecondary">›</ThemedText>
        </ThemedView>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  heroOverline: {
    color: '#FFFFFFB3',
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 0.5,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 26,
    lineHeight: 32,
    fontWeight: 800,
    marginTop: -Spacing.two,
  },
  heroBody: {
    color: '#FFFFFFE6',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 500,
    marginTop: -Spacing.two,
  },
  heroButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: Spacing.two + 4,
    alignItems: 'center',
  },
  heroButtonText: {
    color: Brand.primary,
    fontSize: 16,
    fontWeight: 700,
  },
  pressed: {
    opacity: 0.7,
  },
  chips: {
    gap: Spacing.two,
  },
  chip: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: 20,
  },
  chipTextSelected: {
    color: '#FFFFFF',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    padding: Spacing.three,
    borderRadius: 14,
  },
  iconTile: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowText: {
    flex: 1,
  },
});
