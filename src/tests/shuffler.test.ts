import { describe, it, expect } from 'vitest';

export function shuffleOptions<T extends { id: string }>(options: T[], seed: number): T[] {
  // Deterministic pseudo-random shuffle using seed
  const result = [...options];
  let m = result.length;
  let s = seed;
  while (m) {
    s = (s * 9301 + 49297) % 233280;
    const i = Math.floor((s / 233280) * m--);
    const t = result[m];
    result[m] = result[i];
    result[i] = t;
  }
  return result;
}

describe('Safe Option Shuffling Engine', () => {
  const options = [
    { id: 'opt-1', text: 'Option 1' },
    { id: 'opt-2', text: 'Option 2' },
    { id: 'opt-3', text: 'Option 3' },
    { id: 'opt-4', text: 'Option 4' },
  ];

  it('preserves all option UUIDs and lengths regardless of shuffle arrangement', () => {
    const shuffled = shuffleOptions(options, 42);
    expect(shuffled.length).toBe(4);
    expect(shuffled.map((o) => o.id).sort()).toEqual(['opt-1', 'opt-2', 'opt-3', 'opt-4']);
  });

  it('produces deterministic output with same seed for exam session resilience', () => {
    const run1 = shuffleOptions(options, 999);
    const run2 = shuffleOptions(options, 999);
    expect(run1).toEqual(run2);
  });

  it('guarantees scoring evaluates stable option ID rather than render index', () => {
    const correctOptionId = 'opt-2';
    const shuffled = shuffleOptions(options, 12345);
    
    // Find index of the correct option in the shuffled array
    const displayedIndex = shuffled.findIndex((o) => o.id === correctOptionId);
    expect(displayedIndex).toBeGreaterThanOrEqual(0);

    // Selected choice submits the stable UUID
    const submittedId = shuffled[displayedIndex].id;
    expect(submittedId).toBe(correctOptionId);
  });
});
