import { useEffect, useState } from 'react';

import { MockSensorSource } from '@/sensors/mock-sensor-source';
import { SensorReading, SensorSource } from '@/sensors/types';

// Swap this for the BLE source once the brace is ready.
const source: SensorSource = new MockSensorSource();

/** Latest reading from the brace while `active` is true. */
export function useSensor(active: boolean) {
  const [reading, setReading] = useState<SensorReading | null>(null);

  useEffect(() => {
    if (!active) return;
    const unsubscribe = source.subscribe(setReading);
    source.start();
    return () => {
      unsubscribe();
      source.stop();
    };
  }, [active]);

  return reading;
}
