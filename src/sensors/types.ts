/**
 * One sample from the knee brace.
 * The exact format will be agreed with the embedded/BLE side.
 */
export type SensorReading = {
  timestamp: number;
  /** Knee flexion angle in degrees (0 = straight leg). */
  kneeAngle: number;
  /** Muscle activation, 0–1. */
  emgQuadriceps: number;
  emgHamstrings: number;
  /** True when the pressure film detects the knee caving inwards. */
  valgusWarning: boolean;
};

/**
 * Anything that can deliver sensor readings: the mock below, or a BLE
 * connection to the brace later. The rest of the app only uses this.
 */
export interface SensorSource {
  start(): void;
  stop(): void;
  subscribe(listener: (reading: SensorReading) => void): () => void;
}
