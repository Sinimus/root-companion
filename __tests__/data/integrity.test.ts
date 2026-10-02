import { FACTIONS_DATA, RECOMMENDED_REACH } from '@/data/factions';
import { MAPS, AUTUMN_MAP, WINTER_MAP, MOUNTAIN_MAP, LAKE_MAP, DEFAULT_SUITS } from '@/data/maps';
import { HIRELINGS_DATA } from '@/data/hirelings';
import { LANDMARKS_DATA, LEGENDARY_FORGE_ITEMS } from '@/data/landmarks';
import { CARDS_DB } from '@/data/cards';
import { LAW_FULL } from '@/data/law_full';
import { GLOSSARY_DATA } from '@/data/glossary';
import { RULES_DB } from '@/data/rules_db';
import { IFactionGuide } from '@/types/engine';
import { MARQUISE_GUIDE } from '@/data/guides/marquise';
import { EYRIE_GUIDE } from '@/data/guides/eyrie';
import { ALLIANCE_GUIDE } from '@/data/guides/alliance';
import { VAGABOND_GUIDE } from '@/data/guides/vagabond';
import { LIZARD_GUIDE } from '@/data/guides/lizard';
import { RIVERFOLK_GUIDE } from '@/data/guides/riverfolk';
import { DUCHY_GUIDE } from '@/data/guides/duchy';
import { CORVID_GUIDE } from '@/data/guides/corvid';
import { HUNDREDS_GUIDE } from '@/data/guides/hundreds';
import { KEEPERS_GUIDE } from '@/data/guides/keepers';

const GUIDES: IFactionGuide[] = [
  MARQUISE_GUIDE, EYRIE_GUIDE, ALLIANCE_GUIDE, VAGABOND_GUIDE, LIZARD_GUIDE,
  RIVERFOLK_GUIDE, DUCHY_GUIDE, CORVID_GUIDE, HUNDREDS_GUIDE, KEEPERS_GUIDE
];

// A reference resolves if the Law has that rule or any rule beneath it
// ("9.5" is satisfied by "9.5.1"; the Law viewer searches the same way).
const lawIds = LAW_FULL.map(r => r.id);
const resolves = (ref: string) => lawIds.some(id => id === ref || id.startsWith(`${ref}.`));
const splitRefs = (ref: string) => ref.split(',').map(r => r.trim());

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

    it('matches the Reach table of Law 5.2', () => {
      const reach = Object.fromEntries(FACTIONS_DATA.map(f => [f.id, f.reach]));
      expect(reach).toMatchObject({
        marquise: 10, hundreds: 9, keepers: 8, duchy: 8, eyrie: 7,
        vagabond_1: 5, vagabond_2: 2, riverfolk: 5, alliance: 3, corvid: 3, cult: 2
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

  describe('Law references', () => {
    it('LAW_FULL is the October 2025 edition', () => {
      // 4.3.5 Count Hits and chapters 16 to 18 exist only since the Homeland edition
      expect(lawIds).toContain('4.3.5');
      expect(lawIds).toContain('1.3.3');
      expect(lawIds.some(id => id.startsWith('16.'))).toBe(true);
      expect(lawIds).toContain('G.36');
    });

    it('every guide step points at an existing Law rule', () => {
      GUIDES.forEach(guide => {
        guide.phases.forEach(phase => {
          phase.steps.forEach(step => {
            if (!step.ruleReference) return;
            splitRefs(step.ruleReference).forEach(ref => {
              expect({ guide: guide.factionId, step: step.id, ref, ok: resolves(ref) })
                .toEqual({ guide: guide.factionId, step: step.id, ref, ok: true });
            });
          });
        });
      });
    });

    it('every glossary reference points at an existing Law rule', () => {
      GLOSSARY_DATA.forEach(item => {
        if (!item.ruleReference) return;
        expect({ term: item.term, ok: resolves(item.ruleReference) }).toEqual({ term: item.term, ok: true });
      });
    });

    it('every RULES_DB key points at an existing Law rule', () => {
      Object.keys(RULES_DB).forEach(key => {
        expect({ key, ok: resolves(key) }).toEqual({ key, ok: true });
      });
    });
  });

  describe('MAPS', () => {
    it('every map has 12 clearings and paths between existing clearings', () => {
      Object.values(MAPS).forEach(map => {
        expect(map.clearings).toHaveLength(12);
        const ids = new Set(map.clearings.map(c => c.id));
        map.paths.forEach(p => {
          expect(ids.has(p.from)).toBe(true);
          expect(ids.has(p.to)).toBe(true);
        });
      });
    });

    it('every clearing has a fox, rabbit or mouse suit, four of each (Law 2.2.2)', () => {
      Object.values(MAPS).forEach(map => {
        const count = (suit: string) => map.clearings.filter(c => c.defaultSuit === suit).length;
        expect({ map: map.id, fox: count('fox'), rabbit: count('rabbit'), mouse: count('mouse') })
          .toEqual({ map: map.id, fox: 4, rabbit: 4, mouse: 4 });
      });
      expect([...DEFAULT_SUITS].sort()).toEqual([
        'fox', 'fox', 'fox', 'fox', 'mouse', 'mouse', 'mouse', 'mouse', 'rabbit', 'rabbit', 'rabbit', 'rabbit'
      ]);
    });

    it('Autumn and Winter have four ruins (Law 5.1.4)', () => {
      [AUTUMN_MAP, WINTER_MAP].forEach(map => {
        expect(map.clearings.filter(c => c.hasRuin)).toHaveLength(4);
      });
    });

    it('Winter is its own layout with a river (Law M.2)', () => {
      expect(WINTER_MAP.clearings).not.toEqual(AUTUMN_MAP.clearings);
      expect(WINTER_MAP.paths.some(p => p.river)).toBe(true);
    });

    it('Mountain has six closed paths and the Pass has a ruin (Law M.4)', () => {
      expect(MOUNTAIN_MAP.paths.filter(p => p.isClosed)).toHaveLength(6);
      const pass = MOUNTAIN_MAP.clearings.filter(c => c.isPass);
      expect(pass).toHaveLength(1);
      expect(pass[0].hasRuin).toBe(true);
    });

    it('Lake has one coastal clearing where the Ferry starts (Law M.3.1)', () => {
      const ferry = LAKE_MAP.clearings.filter(c => c.ferryStart);
      expect(ferry).toHaveLength(1);
      expect(ferry[0].isCoastal).toBe(true);
    });
  });

  describe('HIRELINGS_DATA', () => {
    it('has the 16 official hirelings with unique ids', () => {
      expect(HIRELINGS_DATA).toHaveLength(16);
      expect(new Set(HIRELINGS_DATA.map(h => h.id)).size).toBe(16);
    });

    it('contains no invented hireling names', () => {
      const names = HIRELINGS_DATA.flatMap(h => [h.promotedSide.name, h.demotedSide.name]);
      ['The Stag Protector', 'Hedgehog Bandits', 'Weasel Musicians', 'The Bear Exile'].forEach(n => {
        expect(names).not.toContain(n);
      });
      expect(names).toEqual(expect.arrayContaining([
        'Furious Protector', 'Stoic Protector', 'Highway Bandits', 'Bandit Gangs',
        'Popular Band', 'Street Band', 'The Exile', 'The Brigand', 'Forest Patrol', 'Feline Physicians'
      ]));
    });

    it('every side has abilities and replaced factions exist', () => {
      const factionIds = FACTIONS_DATA.map(f => f.id);
      HIRELINGS_DATA.forEach(h => {
        expect(h.promotedSide.abilities.length).toBeGreaterThan(0);
        expect(h.demotedSide.abilities.length).toBeGreaterThan(0);
        if (h.replacesFaction) expect(factionIds).toContain(h.replacesFaction);
      });
    });
  });

  describe('LANDMARKS_DATA', () => {
    it('has the six landmarks of the Landmarks Pack (Law C.10.1)', () => {
      expect(LANDMARKS_DATA.map(l => l.id).sort()).toEqual([
        'black-market', 'elder-treetop', 'ferry', 'legendary-forge', 'lost-city', 'tower'
      ]);
    });

    it('the Legendary Forge holds four items per suit', () => {
      Object.values(LEGENDARY_FORGE_ITEMS).forEach(items => expect(items).toHaveLength(4));
    });
  });

  describe('CARDS_DB', () => {
    it('has unique ids', () => {
      expect(new Set(CARDS_DB.map(c => c.id)).size).toBe(CARDS_DB.length);
    });

    it('has five ambush cards per deck, two of them birds (Law 2.1.2)', () => {
      (['standard', 'exiles'] as const).forEach(deck => {
        const ambushes = CARDS_DB.filter(c => c.type === 'ambush' && c.deck.includes(deck));
        expect(ambushes.reduce((sum, c) => sum + (c.totalInDeck ?? 0), 0)).toBe(5);
        expect(ambushes.find(c => c.suit === 'bird')?.totalInDeck).toBe(2);
      });
    });

    it('has four dominance cards per deck, one per suit (Law 2.1.3)', () => {
      (['standard', 'exiles'] as const).forEach(deck => {
        const suits = CARDS_DB.filter(c => c.type === 'dominance' && c.deck.includes(deck)).map(c => c.suit).sort();
        expect(suits).toEqual(['bird', 'fox', 'mouse', 'rabbit']);
      });
    });

    it('item cards never cost bird icons and carry an item', () => {
      CARDS_DB.filter(c => c.vp).forEach(c => {
        expect(c.itemIcon).toBeDefined();
        expect(c.cost).not.toContain('bird');
      });
    });
  });
});
