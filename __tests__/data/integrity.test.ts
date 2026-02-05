import { FACTIONS_DATA, RECOMMENDED_REACH } from '@/data/factions';

describe('Data Integrity', () => {
  describe('FACTIONS_DATA', () => {
    it('should have unique IDs', () => {
      const ids = FACTIONS_DATA.map(f => f.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should have valid reach values', () => {
      FACTIONS_DATA.forEach(f => {
        expect(f.reach).toBeGreaterThanOrEqual(0);
      });
    });

    it('should have valid types', () => {
      FACTIONS_DATA.forEach(f => {
        expect(['militant', 'insurgent']).toContain(f.type);
      });
    });
  });

  describe('RECOMMENDED_REACH', () => {
    it('should cover player counts 2-6', () => {
      const counts = [2, 3, 4, 5, 6];
      counts.forEach(c => {
        expect(RECOMMENDED_REACH[c]).toBeDefined();
        expect(typeof RECOMMENDED_REACH[c]).toBe('number');
      });
    });
  });
});
