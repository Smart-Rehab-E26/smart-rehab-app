import { SensorReading, SensorSource } from './types';

const SAMPLE_INTERVAL_MS = 100;

/** Fake brace that simulates slow knee bends, so the UI can be built without hardware. */
export class MockSensorSource implements SensorSource {
  private listeners = new Set<(reading: SensorReading) => void>();
  private timer: ReturnType<typeof setInterval> | null = null;

  start() {
    if (this.timer) return;
    this.timer = setInterval(() => this.emit(), SAMPLE_INTERVAL_MS);
  }

  stop() {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
  }

  subscribe(listener: (reading: SensorReading) => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private emit() {
    const t = Date.now() / 1000;
    // One bend every ~4 seconds, between 0° and 90°.
    const bend = (Math.sin(t * 1.5) + 1) / 2;
    const reading: SensorReading = {
      timestamp: Date.now(),
      kneeAngle: Math.round(bend * 90),
      emgQuadriceps: bend * 0.8 + Math.random() * 0.1,
      emgHamstrings: (1 - bend) * 0.5 + Math.random() * 0.1,
      valgusWarning: bend > 0.9 && Math.random() < 0.2,
    };
    this.listeners.forEach((listener) => listener(reading));
  }
}
