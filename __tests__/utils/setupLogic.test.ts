import { dealsRandomSuits, dealSuitMarkers } from '@/utils/setupLogic';
import { Suit } from '@/types/engine';

// Deterministic PRNG (mulberry32) so the deal can be asserted exactly.
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

describe('Map setup (Law A.1)', () => {
  it('always deals random suit markers on the variant maps', () => {
    ['winter', 'lake', 'mountain'].forEach((mapId) => {
      expect(dealsRandomSuits(mapId, false)).toBe(true);
    });
  });

  it('uses the printed suits on Autumn unless random suits are chosen', () => {
    expect(dealsRandomSuits('autumn', false)).toBe(false);
    expect(dealsRandomSuits('autumn', true)).toBe(true);
  });
});

describe('dealSuitMarkers (Law A.1 fair deal)', () => {
  it('deals exactly one marker per clearing, ids 1 to 12', () => {
    const mapping = dealSuitMarkers(mulberry32(7));
    expect(
      Object.keys(mapping)
        .map(Number)
        .sort((a, b) => a - b),
    ).toEqual(Array.from({ length: 12 }, (_, i) => i + 1));
  });

  it('keeps four fox, four rabbit and four mouse markers', () => {
    [1, 42, 2026].forEach((seed) => {
      const counts: Record<string, number> = {};
      Object.values(dealSuitMarkers(mulberry32(seed))).forEach((suit: Suit) => {
        counts[suit] = (counts[suit] ?? 0) + 1;
      });
      expect({ seed, counts }).toEqual({
        seed,
        counts: { fox: 4, rabbit: 4, mouse: 4 },
      });
    });
  });

  it('is deterministic for a seeded random source', () => {
    expect(dealSuitMarkers(mulberry32(42))).toEqual(dealSuitMarkers(mulberry32(42)));
  });

  it('two different seeds give different deals', () => {
    expect(dealSuitMarkers(mulberry32(1))).not.toEqual(dealSuitMarkers(mulberry32(2)));
  });
});
