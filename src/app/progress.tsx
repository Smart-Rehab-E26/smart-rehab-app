import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { BarChart, LineChart } from '@/components/charts';
import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Metric, Widget } from '@/components/widget';
import { Brand, Spacing } from '@/constants/theme';
import {
  exercises,
  milestones,
  pastSessions,
  progressStats,
  rangeOfMotion,
  weekdayLabels,
  weeklyAdherence,
  weeklyFlexion,
} from '@/data/mock-data';
import { useTheme } from '@/hooks/use-theme';

const ranges = ['Week', 'Month', 'All'] as const;

export default function ProgressScreen() {
  const theme = useTheme();
  const [range, setRange] = useState<(typeof ranges)[number]>('Month');

  return (
    <Screen overline="Since surgery" title="Progress">
      <View style={[styles.segmented, { backgroundColor: theme.backgroundSelected }]}>
        {ranges.map((r) => (
          <Pressable
            key={r}
            onPress={() => setRange(r)}
            style={[styles.segment, r === range && { backgroundColor: theme.backgroundElement }]}>
            <ThemedText type="smallBold" themeColor={r === range ? 'text' : 'textSecondary'}>
              {r}
            </ThemedText>
          </Pressable>
        ))}
      </View>

      <View style={styles.grid}>
        {progressStats.map((stat) => (
          <ThemedView key={stat.label} type="backgroundElement" style={styles.stat}>
            <ThemedText style={styles.statValue}>{stat.value}</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {stat.label}
            </ThemedText>
          </ThemedView>
        ))}
      </View>

      <Widget
        title="Knee Flexion"
        icon={{ ios: 'angle', android: 'straighten', web: 'straighten' }}
        color={Brand.primary}
        meta="per week">
        <Metric value={`${weeklyFlexion[weeklyFlexion.length - 1]}°`} unit={`goal ${rangeOfMotion.targetFlexion}°`} />
        <LineChart data={weeklyFlexion} target={rangeOfMotion.targetFlexion} color={Brand.primary} height={110} />
        <View style={styles.axis}>
          {weeklyFlexion.map((_, i) => (
            <ThemedText key={i} style={[styles.axisLabel, { color: theme.textSecondary }]}>
              W{i + 1}
            </ThemedText>
          ))}
        </View>
      </Widget>

      <Widget
        title="Sessions This Week"
        icon={{ ios: 'calendar', android: 'event', web: 'event' }}
        color={Brand.sky}
        meta="goal 2 / day">
        <Metric value={`${weeklyAdherence.reduce((a, b) => a + b, 0)}`} unit="of 14 sessions" />
        <BarChart data={weeklyAdherence} color={Brand.sky} height={60} labels={weekdayLabels} />
      </Widget>

      <Widget title="Milestones" icon={{ ios: 'trophy.fill', android: 'emoji_events', web: 'emoji_events' }} color={Brand.warning}>
        {milestones.map((m) => (
          <View key={m.title} style={styles.listRow}>
            <View
              style={[
                styles.badge,
                { backgroundColor: m.achieved ? Brand.primary : theme.backgroundSelected },
              ]}>
              <SymbolView
                name={
                  m.achieved
                    ? { ios: 'checkmark', android: 'check', web: 'check' }
                    : { ios: 'lock.fill', android: 'lock', web: 'lock' }
                }
                tintColor={m.achieved ? '#FFFFFF' : theme.textSecondary}
                size={14}
              />
            </View>
            <View style={styles.listText}>
              <ThemedText type="smallBold" themeColor={m.achieved ? 'text' : 'textSecondary'}>
                {m.title}
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {m.detail}
              </ThemedText>
            </View>
          </View>
        ))}
      </Widget>

      <Widget title="Recent Sessions" icon={{ ios: 'clock.fill', android: 'history', web: 'history' }} color={Brand.primary}>
        {pastSessions.map((session) => {
          const exercise = exercises.find((e) => e.id === session.exerciseId);
          return (
            <View key={`${session.date}-${session.exerciseId}`} style={styles.listRow}>
              <View style={styles.listText}>
                <ThemedText type="smallBold">{exercise?.name ?? session.exerciseId}</ThemedText>
                <ThemedText type="small" themeColor="textSecondary">
                  {session.date} · {session.repsDone} reps · max {session.maxAngle}°
                </ThemedText>
              </View>
              <ThemedText type="smallBold" style={{ color: session.formPercent >= 85 ? Brand.success : Brand.warning }}>
                {session.formPercent}%
              </ThemedText>
            </View>
          );
        })}
      </Widget>
    </Screen>
  );
}

const styles = StyleSheet.create({
  segmented: {
    flexDirection: 'row',
    borderRadius: 10,
    padding: 2,
  },
  segment: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 6,
    borderRadius: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.three,
  },
  stat: {
    flexGrow: 1,
    flexBasis: '40%',
    padding: Spacing.three,
    borderRadius: 14,
  },
  statValue: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: 700,
    color: Brand.primary,
  },
  axis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  axisLabel: {
    fontSize: 11,
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingVertical: 2,
  },
  badge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listText: {
    flex: 1,
  },
});
