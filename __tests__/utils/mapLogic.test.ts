import { MAPS, LAKE_MAP, IClearingDef } from '@/data/maps';
import { clearingsBySuit, cornerClearingIds, suitOf } from '@/utils/mapLogic';
import { Suit } from '@/types/engine';

// The four corners of the 0..100 layout square the clearings are placed in.
const SQUARE_CORNERS: Array<[number, number]> = [
  [0, 0],
  [100, 0],
  [0, 100],
  [100, 100],
];

const dist = (c: IClearingDef, corner: [number, number]) =>
  Math.hypot(c.x - corner[0], c.y - corner[1]);

// The index of the layout-square corner a clearing is nearest to.
const nearestSquareCorner = (c: IClearingDef): number => {
  let best = 0;
  SQUARE_CORNERS.forEach((corner, i) => {
    if (dist(c, corner) < dist(c, SQUARE_CORNERS[best])) best = i;
  });
  return best;
};

describe('mapLogic', () => {
  describe('map data invariants', () => {
    it('every map has 12 clearings numbered 1 to 12', () => {
      Object.values(MAPS).forEach((map) => {
        expect(map.clearings.map((c) => c.id).sort((a, b) => a - b)).toEqual(
          Array.from({ length: 12 }, (_, i) => i + 1),
        );
      });
    });

    it('every path endpoint is an existing clearing', () => {
      Object.values(MAPS).forEach((map) => {
        const ids = new Set(map.clearings.map((c) => c.id));
        map.paths.forEach((p) => {
          expect({ map: map.id, from: ids.has(p.from), to: ids.has(p.to) }).toEqual({
            map: map.id,
            from: true,
            to: true,
          });
        });
      });
    });

    it('every map has exactly four corners, each nearest to a different corner of the square', () => {
      Object.values(MAPS).forEach((map) => {
        const corners = cornerClearingIds(map);
        expect(corners).toHaveLength(4);

        const matched = new Set<number>();
        corners.forEach((id) => {
          const clearing = map.clearings.find((c) => c.id === id)!;
          const nearest = nearestSquareCorner(clearing);
          // a different corner of the square for each of the four clearings
          expect(matched.has(nearest)).toBe(false);
          matched.add(nearest);
          // and no other clearing is nearer to that corner of the square
          const squareCorner = SQUARE_CORNERS[nearest];
          const best = dist(clearing, squareCorner);
          expect(map.clearings.every((c) => dist(c, squareCorner) >= best)).toBe(true);
        });
        expect(matched.size).toBe(4);
      });
    });

    it('the Lake map has exactly one coastal corner and it is the ferryStart clearing', () => {
      const coastalCorners = LAKE_MAP.clearings.filter((c) => c.isCorner && c.isCoastal);
      expect(coastalCorners).toHaveLength(1);
      expect(coastalCorners[0].ferryStart).toBe(true);
    });

    it('only the Mountain map has closed paths, exactly six of them', () => {
      Object.values(MAPS).forEach((map) => {
        const closed = map.paths.filter((p) => p.isClosed).length;
        expect({ map: map.id, closed }).toEqual({
          map: map.id,
          closed: map.id === 'mountain' ? 6 : 0,
        });
      });
    });

    it('clearingsBySuit without a mapping on Autumn gives four clearings per suit', () => {
      const bySuit = clearingsBySuit(MAPS['autumn']);
      expect(bySuit).toEqual({
        fox: [1, 7, 8, 11],
        rabbit: [2, 5, 10, 12],
        mouse: [3, 4, 6, 9],
        bird: [],
      });
    });
  });

  describe('cornerClearingIds', () => {
    it('returns the corner ids ascending', () => {
      expect(cornerClearingIds(MAPS['autumn'])).toEqual([1, 3, 10, 12]);
      expect(cornerClearingIds(MAPS['winter'])).toEqual([1, 4, 9, 12]);
      expect(cornerClearingIds(MAPS['lake'])).toEqual([1, 4, 10, 12]);
      expect(cornerClearingIds(MAPS['mountain'])).toEqual([1, 3, 10, 12]);
    });
  });

  describe('clearingsBySuit', () => {
    it('always has all four suit keys, ids ascending', () => {
      const mapping: Record<number, Suit> = {
        12: 'fox',
        1: 'fox',
        5: 'fox',
        2: 'rabbit',
        6: 'rabbit',
        7: 'rabbit',
        3: 'mouse',
        8: 'mouse',
        9: 'mouse',
        4: 'bird',
        10: 'bird',
        11: 'bird',
      };
      const bySuit = clearingsBySuit(MAPS['mountain'], mapping);
      expect(Object.keys(bySuit).sort()).toEqual(['bird', 'fox', 'mouse', 'rabbit']);
      expect(bySuit.fox).toEqual([1, 5, 12]);
      expect(bySuit.rabbit).toEqual([2, 6, 7]);
      expect(bySuit.mouse).toEqual([3, 8, 9]);
      expect(bySuit.bird).toEqual([4, 10, 11]);
    });
  });

  describe('suitOf', () => {
    it('uses the dealt marker when given, the printed suit otherwise', () => {
      const clearing = MAPS['autumn'].clearings[0]; // id 1, printed fox
      expect(suitOf(clearing)).toBe('fox');
      expect(suitOf(clearing, { 1: 'mouse' })).toBe('mouse');
      expect(suitOf(clearing, { 2: 'mouse' })).toBe('fox');
    });
  });
});
