// Placeholder content until we have a backend.

export type ExerciseCategory = 'Mobility' | 'Strength' | 'Balance';

export type Exercise = {
  id: string;
  name: string;
  description: string;
  category: ExerciseCategory;
  sets: number;
  reps: number;
  targetAngle: number;
  durationMin: number;
};

export const exerciseCategories: ('All' | ExerciseCategory)[] = ['All', 'Mobility', 'Strength', 'Balance'];

export const exercises: Exercise[] = [
  {
    id: 'heel-slides',
    name: 'Heel slides',
    description: 'Lying down, slide your heel towards you and back.',
    category: 'Mobility',
    sets: 3,
    reps: 10,
    targetAngle: 90,
    durationMin: 5,
  },
  {
    id: 'quad-sets',
    name: 'Quad sets',
    description: 'Tighten the thigh and press the back of the knee down.',
    category: 'Strength',
    sets: 3,
    reps: 12,
    targetAngle: 0,
    durationMin: 4,
  },
  {
    id: 'straight-leg-raise',
    name: 'Straight leg raise',
    description: 'Keep the knee straight and lift the leg 30 cm.',
    category: 'Strength',
    sets: 3,
    reps: 10,
    targetAngle: 0,
    durationMin: 6,
  },
  {
    id: 'mini-squats',
    name: 'Mini squats',
    description: 'Bend both knees slightly, keeping them over your toes.',
    category: 'Strength',
    sets: 2,
    reps: 8,
    targetAngle: 45,
    durationMin: 5,
  },
  {
    id: 'seated-knee-bends',
    name: 'Seated knee bends',
    description: 'Sit on a chair and slide your foot back under the seat.',
    category: 'Mobility',
    sets: 3,
    reps: 10,
    targetAngle: 100,
    durationMin: 5,
  },
  {
    id: 'single-leg-stand',
    name: 'Single leg stand',
    description: 'Stand on the operated leg, holding a chair if needed.',
    category: 'Balance',
    sets: 3,
    reps: 3,
    targetAngle: 10,
    durationMin: 4,
  },
];

export type Session = {
  date: string;
  exerciseId: string;
  repsDone: number;
  maxAngle: number;
  formPercent: number;
};

export const pastSessions: Session[] = [
  { date: 'Today', exerciseId: 'heel-slides', repsDone: 30, maxAngle: 94, formPercent: 88 },
  { date: 'Yesterday', exerciseId: 'mini-squats', repsDone: 16, maxAngle: 47, formPercent: 81 },
  { date: 'Fri 2 Oct', exerciseId: 'quad-sets', repsDone: 36, maxAngle: 3, formPercent: 92 },
  { date: 'Thu 1 Oct', exerciseId: 'heel-slides', repsDone: 27, maxAngle: 86, formPercent: 76 },
];

export const streakDays = 3;

// --- Progress screen ---

export const progressStats = [
  { label: 'Sessions', value: '34' },
  { label: 'Best flexion', value: '94°' },
  { label: 'Clean reps', value: '86%' },
  { label: 'Day streak', value: '3' },
];

/** Max flexion per week since surgery. */
export const weeklyFlexion = [45, 58, 69, 78, 87, 94];

/** Sessions done vs planned, per day this week. */
export const weeklyAdherence = [2, 2, 1, 2, 2, 1, 1];

export const milestones = [
  { title: 'First session', detail: 'Completed week 1', achieved: true },
  { title: '90° flexion', detail: 'Reached week 6', achieved: true },
  { title: '7-day streak', detail: '3 of 7 days', achieved: false },
  { title: '120° flexion', detail: 'Goal for week 12', achieved: false },
];

// --- Summary widgets ---
// Everything here comes from the brace sensors (IMUs, potentiometer, EMG,
// pressure film) or from what the patient enters in the app.

export const recovery = {
  procedure: 'ACL reconstruction',
  week: 6,
  totalWeeks: 12,
  score: 68,
  nextCheckIn: 'Physio check-in · Thu 9 Oct',
};

export const todayPlan = [
  { name: 'Heel slides', detail: '3 × 10', done: true },
  { name: 'Quad sets', detail: '3 × 12', done: true },
  { name: 'Straight leg raise', detail: '3 × 10', done: false },
  { name: 'Mini squats', detail: '2 × 8', done: false },
];

export const rings = {
  rehabMinutes: { value: 22, goal: 30 },
  reps: { value: 64, goal: 80 },
  braceHours: { value: 7.5, goal: 8 },
};

/** Knee angle from potentiometer + IMU fusion. */
export const rangeOfMotion = {
  maxFlexion: 94,
  targetFlexion: 120,
  extensionDeficit: 3,
  changeThisWeek: 6,
  last14Days: [62, 64, 63, 68, 70, 71, 74, 75, 79, 80, 84, 86, 88, 94],
};

/** Share of reps done within the target angle and without valgus. */
export const formQuality = {
  percent: 86,
  last7Days: [64, 70, 72, 75, 79, 83, 86],
};

/** Self-reported in the app after each session, 0–10. */
export const pain = {
  today: 3,
  last7Days: [6, 6, 5, 4, 4, 3, 3],
};

/** EMG, peak activation as % of the patient's target. */
export const muscleActivation = {
  quadriceps: 0.72,
  hamstrings: 0.48,
};

/** From the pressure film on the sides of the knee. */
export const valgus = {
  eventsToday: 3,
  last7Days: [14, 11, 9, 8, 6, 5, 3],
};

/** From the IMUs while walking with the brace. */
export const gait = {
  symmetryPercent: 91,
  stepsWithBrace: 4210,
  cadence: 98,
};

export const brace = {
  battery: 78,
  lastSync: '10:42',
};

export const weekdayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
