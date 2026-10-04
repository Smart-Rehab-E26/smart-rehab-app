import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BarChart, LineChart, ProgressBar, Rings } from '@/components/charts';
import { GradientCard } from '@/components/gradient-card';
import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { Metric, Widget, WidgetRow } from '@/components/widget';
import { Brand, Spacing } from '@/constants/theme';
import {
  brace,
  formQuality,
  gait,
  muscleActivation,
  pain,
  rangeOfMotion,
  recovery,
  rings,
  todayPlan,
  valgus,
  weekdayLabels,
} from '@/data/mock-data';
import { useSensor } from '@/hooks/use-sensor';
import { useTheme } from '@/hooks/use-theme';

export default function SummaryScreen() {
  return (
    <Screen overline="Sunday, 4 October" title="Summary">
      <RecoveryHero />
      <TodayPlanWidget />
      <DailyGoalsWidget />

      <Widget
        title="Range of Motion"
        icon={{ ios: 'angle', android: 'straighten', web: 'straighten' }}
        color={Brand.primary}
        meta="14 days">
        <View style={styles.spread}>
          <Metric value={`${rangeOfMotion.maxFlexion}°`} unit={`/ ${rangeOfMotion.targetFlexion}° flexion`} />
          <ThemedText type="smallBold" style={{ color: Brand.success }}>
            ▲ {rangeOfMotion.changeThisWeek}° this week
          </ThemedText>
        </View>
        <LineChart
          data={rangeOfMotion.last14Days}
          target={rangeOfMotion.targetFlexion}
          color={Brand.primary}
          height={90}
        />
        <ThemedText type="small" themeColor="textSecondary">
          Extension deficit {rangeOfMotion.extensionDeficit}° · dashed line is your goal
        </ThemedText>
      </Widget>

      <WidgetRow>
        <Widget title="Form" icon={{ ios: 'checkmark.seal.fill', android: 'verified', web: 'verified' }} color={Brand.sky}>
          <Metric value={`${formQuality.percent}%`} unit="clean" />
          <BarChart data={formQuality.last7Days} color={Brand.sky} height={44} labels={weekdayLabels} />
        </Widget>
        <Widget title="Pain" icon={{ ios: 'bandage.fill', android: 'healing', web: 'healing' }} color={Brand.deep}>
          <Metric value={`${pain.today}`} unit="/ 10" />
          <LineChart data={pain.last7Days} color={Brand.deep} height={44} />
        </Widget>
      </WidgetRow>

      <Widget
        title="Muscle Activation"
        icon={{ ios: 'bolt.fill', android: 'bolt', web: 'bolt' }}
        color={Brand.primary}
        meta="EMG · last session">
        <MuscleRow label="Quadriceps" value={muscleActivation.quadriceps} color={Brand.primary} />
        <MuscleRow label="Hamstrings" value={muscleActivation.hamstrings} color={Brand.sky} />
      </Widget>

      <WidgetRow>
        <Widget title="Alignment" icon={{ ios: 'exclamationmark.triangle.fill', android: 'warning', web: 'warning' }} color={Brand.warning}>
          <Metric value={`${valgus.eventsToday}`} unit="valgus" />
          <BarChart data={valgus.last7Days} color={Brand.warning} height={44} labels={weekdayLabels} />
        </Widget>
        <Widget title="Gait" icon={{ ios: 'figure.walk', android: 'directions_walk', web: 'directions_walk' }} color={Brand.sky}>
          <Metric value={`${gait.symmetryPercent}%`} unit="even" />
          <ThemedText type="small" themeColor="textSecondary">
            {gait.stepsWithBrace.toLocaleString('en-US')} steps{'\n'}
            {gait.cadence} steps/min
          </ThemedText>
        </Widget>
      </WidgetRow>

      <BraceWidget />
    </Screen>
  );
}

function RecoveryHero() {
  return (
    <GradientCard>
      <View style={styles.heroRow}>
        <View style={styles.heroText}>
          <Text style={styles.heroOverline}>{recovery.procedure.toUpperCase()}</Text>
          <Text style={styles.heroTitle}>
            Week {recovery.week}
            <Text style={styles.heroTitleSoft}> of {recovery.totalWeeks}</Text>
          </Text>
          <Text style={styles.heroBody}>Ahead of plan on knee bend. Keep it up.</Text>
        </View>
        <View style={styles.heroRing}>
          <Rings rings={[{ progress: recovery.score / 100, color: '#FFFFFF' }]} size={92} />
          <View style={styles.heroRingLabel}>
            <Text style={styles.heroScore}>{recovery.score}</Text>
            <Text style={styles.heroScoreUnit}>score</Text>
          </View>
        </View>
      </View>

      <View style={styles.heroTrack}>
        <View style={[styles.heroFill, { width: `${(recovery.week / recovery.totalWeeks) * 100}%` }]} />
      </View>
      <View style={styles.heroFooter}>
        <SymbolView name={{ ios: 'calendar', android: 'event', web: 'event' }} tintColor="#FFFFFF" size={14} />
        <Text style={styles.heroBody}>{recovery.nextCheckIn}</Text>
      </View>
    </GradientCard>
  );
}

function TodayPlanWidget() {
  const theme = useTheme();
  const done = todayPlan.filter((e) => e.done).length;
  return (
    <Widget
      title="Today's Plan"
      icon={{ ios: 'list.bullet.clipboard.fill', android: 'assignment', web: 'assignment' }}
      color={Brand.primary}
      meta={`${done} of ${todayPlan.length} done`}>
      {todayPlan.map((exercise) => (
        <View key={exercise.name} style={styles.planRow}>
          <View
            style={[
              styles.check,
              exercise.done
                ? { backgroundColor: Brand.primary, borderColor: Brand.primary }
                : { borderColor: theme.backgroundSelected },
            ]}>
            {exercise.done && <Text style={styles.checkMark}>✓</Text>}
          </View>
          <ThemedText
            type="small"
            themeColor={exercise.done ? 'textSecondary' : 'text'}
            style={[styles.planName, exercise.done && styles.strike]}>
            {exercise.name}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {exercise.detail}
          </ThemedText>
        </View>
      ))}
    </Widget>
  );
}

function DailyGoalsWidget() {
  const items = [
    { label: 'Exercise', ...rings.rehabMinutes, unit: 'min', color: Brand.primary },
    { label: 'Reps', ...rings.reps, unit: '', color: Brand.sky },
    { label: 'Brace worn', ...rings.braceHours, unit: 'h', color: Brand.ice },
  ];
  return (
    <Widget title="Daily Goals" icon={{ ios: 'target', android: 'track_changes', web: 'track_changes' }} color={Brand.primary}>
      <View style={styles.activity}>
        <Rings rings={items.map((i) => ({ progress: i.value / i.goal, color: i.color }))} />
        <View style={styles.legend}>
          {items.map((item) => (
            <View key={item.label}>
              <ThemedText type="small" themeColor="textSecondary">
                {item.label}
              </ThemedText>
              <ThemedText style={[styles.legendValue, { color: item.color }]}>
                {item.value}/{item.goal}
                <ThemedText style={[styles.legendUnit, { color: item.color }]}> {item.unit}</ThemedText>
              </ThemedText>
            </View>
          ))}
        </View>
      </View>
    </Widget>
  );
}

function MuscleRow({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <View style={styles.gapSmall}>
      <View style={styles.spread}>
        <ThemedText type="small">{label}</ThemedText>
        <ThemedText type="smallBold">{Math.round(value * 100)}% of target</ThemedText>
      </View>
      <ProgressBar value={value} color={color} />
    </View>
  );
}

function BraceWidget() {
  const [active, setActive] = useState(false);
  const reading = useSensor(active);
  return (
    <Widget
      title="Smart Brace"
      icon={{ ios: 'dot.radiowaves.left.and.right', android: 'sensors', web: 'sensors' }}
      color={Brand.primary}
      meta={active ? 'Live' : `Synced ${brace.lastSync}`}>
      <View style={styles.spread}>
        {active && reading ? (
          <Metric value={`${reading.kneeAngle}°`} unit="knee angle" />
        ) : (
          <Metric value={`${brace.battery}%`} unit="battery" />
        )}
        {active && reading?.valgusWarning && (
          <ThemedText type="smallBold" style={{ color: Brand.warning }}>
            ⚠ Knee caving in
          </ThemedText>
        )}
      </View>
      <Pressable
        onPress={() => setActive(!active)}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
        <Text style={styles.buttonText}>{active ? 'Stop session' : 'Start session'}</Text>
      </Pressable>
    </Widget>
  );
}

const styles = StyleSheet.create({
  spread: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  heroText: {
    flex: 1,
    gap: Spacing.one,
  },
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
  },
  heroTitleSoft: {
    color: '#FFFFFFB3',
    fontWeight: 600,
  },
  heroBody: {
    color: '#FFFFFFE6',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 500,
  },
  heroRing: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroRingLabel: {
    position: 'absolute',
    alignItems: 'center',
  },
  heroScore: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 800,
  },
  heroScoreUnit: {
    color: '#FFFFFFB3',
    fontSize: 11,
    fontWeight: 600,
  },
  heroTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF40',
    overflow: 'hidden',
  },
  heroFill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },
  heroFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  planRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two + 4,
    paddingVertical: 2,
  },
  check: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 800,
  },
  planName: {
    flex: 1,
  },
  strike: {
    textDecorationLine: 'line-through',
  },
  activity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.four,
  },
  legend: {
    gap: Spacing.one,
  },
  legendValue: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: 700,
  },
  legendUnit: {
    fontSize: 14,
    fontWeight: 600,
  },
  gapSmall: {
    gap: Spacing.one,
  },
  button: {
    backgroundColor: Brand.primary,
    paddingVertical: Spacing.two + 4,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 700,
  },
  pressed: {
    opacity: 0.7,
  },
});
