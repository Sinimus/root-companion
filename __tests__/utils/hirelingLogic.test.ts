import {
  ActiveHirelings,
  endTurnDecay,
  hirelingsToPassOn,
  migrateStoredHirelings,
  newActiveHireling,
} from '@/utils/hirelingLogic';

const active = (
  id: string,
  markers: number,
  isPromoted = true,
  gainedThisTurn = false,
): ActiveHirelings => ({ [id]: { id, markers, isPromoted, gainedThisTurn } });

describe('Hireling logic (Law H.1.3)', () => {
  describe('newActiveHireling (H.1.2)', () => {
    it('starts promoted, gained this turn, with one placeholder marker', () => {
      expect(newActiveHireling('forest_patrol')).toEqual({
        id: 'forest_patrol',
        markers: 1,
        isPromoted: true,
        gainedThisTurn: true,
      });
    });
  });

  describe('endTurnDecay (H.1.3)', () => {
    it('removes one marker from a hireling gained on a previous turn', () => {
      expect(endTurnDecay(active('forest_patrol', 3))).toEqual(active('forest_patrol', 2));
    });

    it('keeps the markers of a hireling gained this turn, then clears the mark', () => {
      const after = endTurnDecay(active('forest_patrol', 3, true, true));
      expect(after).toEqual(active('forest_patrol', 3));

      const second = endTurnDecay(after);
      expect(second).toEqual(active('forest_patrol', 2));
    });

    it('leaves isPromoted untouched', () => {
      expect(endTurnDecay(active('forest_patrol', 2, false, true))).toEqual(
        active('forest_patrol', 2, false),
      );
    });

    it('never goes below 0 markers', () => {
      expect(endTurnDecay(active('forest_patrol', 0))).toEqual(active('forest_patrol', 0));
    });

    it('does not mutate its input', () => {
      const before = active('forest_patrol', 2, false, true);
      const deepCopy: ActiveHirelings = JSON.parse(JSON.stringify(before));
      endTurnDecay(before);
      expect(before).toEqual(deepCopy);
    });
  });

  describe('hirelingsToPassOn (second sentence of H.1.3)', () => {
    it('lists only the ids at 0 markers, also one gained this turn', () => {
      const activeHirelings: ActiveHirelings = {
        ...active('forest_patrol', 2),
        ...active('last_dynasty', 0),
        ...active('flame_bearers', 0, true, true),
      };
      expect(hirelingsToPassOn(activeHirelings)).toEqual(['last_dynasty', 'flame_bearers']);
    });
  });

  describe('migrateStoredHirelings', () => {
    it('reads the old format of plain numbers', () => {
      expect(migrateStoredHirelings({ forest_patrol: 3 })).toEqual(active('forest_patrol', 3));
    });

    it('defaults a missing gainedThisTurn to false', () => {
      expect(migrateStoredHirelings({ forest_patrol: { markers: 2, isPromoted: false } })).toEqual(
        active('forest_patrol', 2, false),
      );
    });

    it('reads the full new format', () => {
      expect(
        migrateStoredHirelings({
          forest_patrol: { markers: 1, isPromoted: false, gainedThisTurn: true },
        }),
      ).toEqual(active('forest_patrol', 1, false, true));
    });

    it('skips values that are neither a number nor a markers object', () => {
      const migrated = migrateStoredHirelings({
        forest_patrol: 2,
        text: 'three',
        nothing: null,
        list: [1, 2],
        noMarkers: { isPromoted: true },
      });
      expect(Object.keys(migrated)).toEqual(['forest_patrol']);
    });

    it('returns an empty record for null, a string and an array', () => {
      expect(migrateStoredHirelings(null)).toEqual({});
      expect(migrateStoredHirelings('forest_patrol')).toEqual({});
      expect(migrateStoredHirelings(['forest_patrol'])).toEqual({});
    });
  });
});
