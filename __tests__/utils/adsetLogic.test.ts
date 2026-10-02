import { generateAdSetState, isChoosable, chooseFaction, draftOrder, AdSetState } from '@/utils/adsetLogic';
import { FACTIONS_DATA } from '@/data/factions';

const typeOf = (id: string) => FACTIONS_DATA.find(f => f.id === id)?.type;

// Deterministic pseudo-random sequence for repeatable shuffles
const seeded = (seed: number) => () => {
  seed = (seed * 9301 + 49297) % 233280;
  return seed / 233280;
};

describe('AdSet Logic (Law A.8)', () => {
  describe('generateAdSetState', () => {
    it('should throw error for invalid player counts', () => {
      expect(() => generateAdSetState(1)).toThrow('Invalid player count');
      expect(() => generateAdSetState(5)).toThrow('Invalid player count');
    });

    it('deals one more card than players, all unique (A.8.2)', () => {
      [2, 3, 4].forEach(count => {
        for (let seed = 1; seed <= 25; seed++) {
          const state = generateAdSetState(count, { random: seeded(seed) });
          expect(state.pool).toHaveLength(count + 1);
          expect(new Set(state.pool).size).toBe(count + 1);
        }
      });
    });

    it('deals a militant as the first card (A.8.2)', () => {
      for (let seed = 1; seed <= 25; seed++) {
        const state = generateAdSetState(4, { random: seeded(seed) });
        expect(typeOf(state.pool[0])).toBe('militant');
      }
    });

    it('uses only militant factions with two players (A.8.2.I)', () => {
      for (let seed = 1; seed <= 25; seed++) {
        const state = generateAdSetState(2, { random: seeded(seed) });
        state.pool.forEach(id => expect(typeOf(id)).toBe('militant'));
        expect(state.lockedFactionId).toBeNull();
      }
    });

    it('locks the last card exactly when it is an insurgent (A.8.2.II)', () => {
      for (let seed = 1; seed <= 50; seed++) {
        const state = generateAdSetState(4, { random: seeded(seed) });
        const last = state.pool[state.pool.length - 1];
        expect(state.lockedFactionId).toBe(typeOf(last) === 'insurgent' ? last : null);
      }
    });

    it('leaves out excluded factions and the second Vagabond by default', () => {
      for (let seed = 1; seed <= 50; seed++) {
        const state = generateAdSetState(4, { random: seeded(seed), excludedFactionIds: ['marquise', 'alliance'] });
        expect(state.pool).not.toContain('marquise');
        expect(state.pool).not.toContain('alliance');
        expect(state.pool).not.toContain('vagabond_2');
      }
    });
  });

  describe('isChoosable', () => {
    const state: AdSetState = {
      pool: ['marquise', 'eyrie', 'cult', 'alliance'],
      lockedFactionId: 'alliance'
    };

    it('blocks the locked insurgent until a militant has been chosen', () => {
      expect(isChoosable(state, 'alliance', [])).toBe(false);
      expect(isChoosable(state, 'alliance', ['cult'])).toBe(false);
      expect(isChoosable(state, 'alliance', ['marquise'])).toBe(true);
    });

    it('allows any unlocked card in the pool and nothing outside it', () => {
      expect(isChoosable(state, 'cult', [])).toBe(true);
      expect(isChoosable(state, 'duchy', [])).toBe(false);
    });
  });

  describe('chooseFaction', () => {
    it('removes the chosen card from the pool without mutating the state', () => {
      const state: AdSetState = { pool: ['marquise', 'eyrie', 'cult'], lockedFactionId: null };
      const next = chooseFaction(state, 'eyrie');
      expect(next.pool).toEqual(['marquise', 'cult']);
      expect(state.pool).toEqual(['marquise', 'eyrie', 'cult']);
    });
  });

  describe('draftOrder', () => {
    it('starts with the last player and goes backwards (A.8.3)', () => {
      expect(draftOrder(3)).toEqual([2, 1, 0]);
    });
  });
});
