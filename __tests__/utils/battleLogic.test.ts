import { BattleInput, resolveBattle } from '@/utils/battleLogic';

const makeInput = (overrides: Partial<BattleInput> = {}): BattleInput => ({
  roll: { d1: 3, d2: 1 },
  attackerId: 'marquise',
  defenderId: 'eyrie',
  vagabondSwords: 3,
  attackerWarriors: null,
  defenderWarriors: null,
  isDefenseless: false,
  isAmbush: false,
  isAmbushFoiled: false,
  armorersActive: false,
  sappersActive: false,
  brutalTacticsActive: false,
  commandWarrenActive: false,
  hasCorvidPlot: false,
  keeperHasRelic: false,
  hundredsWrathful: false,
  hundredsWarlord: false,
  hundredsStubborn: false,
  hundredsLoot: false,
  eyrieCommander: false,
  ...overrides,
});

const resolve = (overrides: Partial<BattleInput>) => resolveBattle(makeInput(overrides));

describe('resolveBattle (Law of Root 4.3)', () => {
  it('gives the higher roll to the attacker and the lower to the defender', () => {
    const result = resolve({ roll: { d1: 3, d2: 1 } });
    expect(result.attackerHits).toBe(3);
    expect(result.defenderHits).toBe(1);
  });

  it('swaps the rolls for an Alliance defender (Guerrilla War)', () => {
    const result = resolve({ defenderId: 'alliance' });
    expect(result.attackerHits).toBe(1);
    expect(result.defenderHits).toBe(3);
    expect(result.notes).toContain('Guerrilla War: Alliance defends with higher roll.');
  });

  it('drops the rolled hits of a defenseless defender and adds the attacker hit (4.3.5.II)', () => {
    const result = resolve({ isDefenseless: true, roll: { d1: 2, d2: 2 } });
    expect(result.attackerHits).toBe(3); // 2 rolled + 1 extra
    expect(result.defenderHits).toBe(0);
    expect(result.notes).toContain('Defenseless: defender deals no rolled hits (4.3.3.I).');
    expect(result.notes).toContain('Defenseless: +1 Attacker Hit.');
  });

  it('treats a Vagabond defender without an undamaged sword as defenseless (9.2.4)', () => {
    const result = resolve({
      defenderId: 'vagabond_1',
      vagabondSwords: 0,
      roll: { d1: 2, d2: 1 },
    });
    expect(result.attackerHits).toBe(3); // 2 rolled + 1 extra
    expect(result.defenderHits).toBe(0); // capped by 0 swords
    expect(result.notes).toContain('Vagabond without an undamaged sword is defenseless (9.2.4).');
    expect(result.notes).toContain('Defenseless: +1 Attacker Hit.');
  });

  it('limits rolled hits by the warriors in the clearing of battle (4.3.3.I)', () => {
    const attackerSide = resolve({ attackerWarriors: 1, roll: { d1: 3, d2: 2 } });
    expect(attackerSide.attackerHits).toBe(1);
    expect(attackerSide.defenderHits).toBe(2);
    expect(attackerSide.notes).toContain('Rolled hits limited by 1 attacking warriors (4.3.3.I).');

    const defenderSide = resolve({ defenderWarriors: 1, roll: { d1: 3, d2: 3 } });
    expect(defenderSide.attackerHits).toBe(3);
    expect(defenderSide.defenderHits).toBe(1);
    expect(defenderSide.notes).toContain('Rolled hits limited by 1 defending warriors (4.3.3.I).');
  });

  it('caps a Vagabond attacker by swords, not by attacking warriors', () => {
    const result = resolve({
      attackerId: 'vagabond_1',
      attackerWarriors: 1,
      roll: { d1: 3, d2: 2 },
    });
    expect(result.attackerHits).toBe(3); // 3 undamaged swords
    expect(result.defenderHits).toBe(2);
    expect(result.notes).not.toContain('Rolled hits limited by 1 attacking warriors (4.3.3.I).');
  });

  it('adds the ambush hits, and removes them when the attacker foils the ambush (4.3.1.I)', () => {
    const ambushed = resolve({ isAmbush: true, roll: { d1: 1, d2: 1 } });
    expect(ambushed.defenderHits).toBe(3); // 1 rolled + 2 ambush
    expect(ambushed.notes).toContain('AMBUSH: +2 Defender Hits (Applied immediately).');

    const foiled = resolve({ isAmbush: true, isAmbushFoiled: true, roll: { d1: 1, d2: 1 } });
    expect(foiled.defenderHits).toBe(1); // only the rolled hit
    expect(foiled.notes).toContain("Ambush foiled: the defender's ambush deals no hits (4.3.1.I).");
    expect(foiled.notes).not.toContain('AMBUSH: +2 Defender Hits (Applied immediately).');
  });

  it('warns that an ambush against at most two attackers may end the battle (4.3.1.II)', () => {
    const result = resolve({ isAmbush: true, attackerWarriors: 2 });
    expect(result.notes).toContain(
      'Ambush may remove every attacking warrior; then the battle ends (4.3.1.II).',
    );
  });

  it('keeps extra hits when Armorers ignores the rolled hits (4.3.5.I)', () => {
    const result = resolve({
      isDefenseless: true,
      armorersActive: true,
      roll: { d1: 3, d2: 0 },
    });
    expect(result.attackerHits).toBe(1); // 3 rolled hits ignored, 1 extra hit lands
  });

  it('lets Keepers Devout Knights as defender ignore the first hit, never below 0', () => {
    const hit = resolve({
      defenderId: 'keepers',
      keeperHasRelic: true,
      roll: { d1: 3, d2: 1 },
    });
    expect(hit.attackerHits).toBe(2); // 3 - 1
    expect(hit.notes).toContain('DEVOUT KNIGHTS: Keepers ignore 1 hit taken.');

    const noHit = resolve({
      defenderId: 'keepers',
      keeperHasRelic: true,
      roll: { d1: 0, d2: 0 },
    });
    expect(noHit.attackerHits).toBe(0);
    expect(noHit.notes).not.toContain('DEVOUT KNIGHTS: Keepers ignore 1 hit taken.');
  });

  it('lets a Stubborn Hundreds defender ignore the first hit taken (14.7.7)', () => {
    const stubborn = resolve({
      attackerId: 'marquise',
      defenderId: 'hundreds',
      hundredsStubborn: true,
    });
    expect(stubborn.attackerHits).toBe(2); // 3 - 1
    expect(stubborn.defenderHits).toBe(1);
    expect(stubborn.notes).toContain('Stubborn: the Hundreds ignore the first hit taken (14.7.7).');

    const withoutMood = resolve({
      defenderId: 'hundreds',
      hundredsStubborn: false,
    });
    expect(withoutMood.attackerHits).toBe(3);
    expect(withoutMood.notes).not.toContain(
      'Stubborn: the Hundreds ignore the first hit taken (14.7.7).',
    );
  });

  it('drops the Hundreds rolled hits when they loot, keeping extra hits (14.2.5)', () => {
    const loot = resolve({
      attackerId: 'hundreds',
      hundredsLoot: true,
    });
    expect(loot.attackerHits).toBe(0);
    expect(loot.defenderHits).toBe(1); // the defender still deals rolled hits
    expect(loot.notes).toContain('Looters: the Hundreds deal no rolled hits (14.2.5).');

    const wrathful = resolve({
      attackerId: 'hundreds',
      hundredsLoot: true,
      hundredsWarlord: true,
      hundredsWrathful: true,
    });
    expect(wrathful.attackerHits).toBe(1); // 0 rolled + 1 Wrathful extra hit
    expect(wrathful.defenderHits).toBe(1);
    expect(wrathful.notes).toContain('Wrathful Warlord: +1 Attacker Hit.');
  });

  it('ignores a declared loot against a Vagabond defender (14.2.5)', () => {
    const result = resolve({
      attackerId: 'hundreds',
      defenderId: 'vagabond_1',
      hundredsLoot: true,
    });
    expect(result.attackerHits).toBe(3);
    expect(result.defenderHits).toBe(1);
    expect(result.notes).not.toContain('Looters: the Hundreds deal no rolled hits (14.2.5).');
  });
});
