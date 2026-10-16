// Battle hits, Law of Root 4.3 (with 6.x to 15.x faction effects used by the Battle Sim).

export interface BattleInput {
  roll: { d1: number; d2: number };
  attackerId: string;
  defenderId: string;
  vagabondSwords: number; // undamaged swords of a Vagabond in the battle (9.2.6)
  attackerWarriors: number | null; // warriors in the clearing; null = not entered, no cap
  defenderWarriors: number | null;
  isDefenseless: boolean; // defender has no warriors (4.3.5.II)
  isAmbush: boolean;
  isAmbushFoiled: boolean; // attacker answered with an ambush (4.3.1.I)
  armorersActive: boolean;
  sappersActive: boolean;
  brutalTacticsActive: boolean;
  commandWarrenActive: boolean;
  hasCorvidPlot: boolean;
  keeperHasRelic: boolean;
  hundredsWrathful: boolean;
  hundredsWarlord: boolean;
  eyrieCommander: boolean;
}

export interface BattleResult {
  attackerHits: number;
  defenderHits: number;
  notes: string[];
}

export function resolveBattle(input: BattleInput): BattleResult {
  const {
    roll,
    attackerId,
    defenderId,
    vagabondSwords,
    attackerWarriors,
    defenderWarriors,
    isDefenseless,
    isAmbush,
    isAmbushFoiled,
    armorersActive,
    sappersActive,
    brutalTacticsActive,
    commandWarrenActive,
    hasCorvidPlot,
    keeperHasRelic,
    hundredsWrathful,
    hundredsWarlord,
    eyrieCommander,
  } = input;

  const notes: string[] = [];

  // Faction checks, as the Battle Wizard defines them
  const isAllianceDefender = defenderId === 'alliance';
  const isVagabondAttacker = attackerId.startsWith('vagabond');
  const isVagabondDefender = defenderId.startsWith('vagabond');
  const isCorvidDefender = defenderId === 'corvid';
  const isKeeperAttacker = attackerId === 'keepers';
  const isKeeperDefender = defenderId === 'keepers';
  const isHundredsAttacker = attackerId === 'hundreds';
  const isEyrieAttacker = attackerId === 'eyrie';

  const rawHigh = Math.max(roll.d1, roll.d2);
  const rawLow = Math.min(roll.d1, roll.d2);

  let rawAttacker = rawHigh;
  let rawDefender = rawLow;

  // 1. Guerrilla War
  if (isAllianceDefender) {
    rawAttacker = rawLow;
    rawDefender = rawHigh;
    notes.push('Guerrilla War: Alliance defends with higher roll.');
  }

  // 2. Vagabond Cap
  if (isVagabondAttacker) {
    if (rawAttacker > vagabondSwords) {
      rawAttacker = vagabondSwords;
      notes.push(`Vagabond: Hits limited by number of swords (${vagabondSwords}).`);
    }
  }
  // Law 9.2.6 caps the Vagabond's rolled hits as defender too
  if (isVagabondDefender && rawDefender > vagabondSwords) {
    rawDefender = vagabondSwords;
    notes.push(`Vagabond: Hits limited by number of swords (${vagabondSwords}).`);
  }

  // Warrior cap: rolled hits are limited by the warriors in the clearing of battle (4.3.3.I)
  if (attackerWarriors !== null && !isVagabondAttacker && rawAttacker > attackerWarriors) {
    rawAttacker = attackerWarriors;
    notes.push(`Rolled hits limited by ${attackerWarriors} attacking warriors (4.3.3.I).`);
  }
  if (defenderWarriors !== null && !isVagabondDefender && rawDefender > defenderWarriors) {
    rawDefender = defenderWarriors;
    notes.push(`Rolled hits limited by ${defenderWarriors} defending warriors (4.3.3.I).`);
  }

  // Defenseless: no defending warriors (4.3.5.II); a Vagabond defender without an undamaged
  // sword is defenseless too (9.2.4), already capped by his swords above
  const defenseless = isDefenseless || (isVagabondDefender && vagabondSwords === 0);
  if (defenseless && !isVagabondDefender) {
    rawDefender = 0;
    notes.push('Defenseless: defender deals no rolled hits (4.3.3.I).');
  }

  // 3. Base Hits (rolled hits; the attacker's extra hits are counted apart, Law 4.3.5.I)
  let attackerExtraHits = 0;
  let defenderHits = rawDefender;

  // 4. Modifiers Calculation

  // AMBUSH: Defender deals 2 extra hits immediately, unless the attacker foils it with an
  // ambush of their own (4.3.1.I)
  if (isAmbush) {
    if (isAmbushFoiled) {
      notes.push("Ambush foiled: the defender's ambush deals no hits (4.3.1.I).");
    } else {
      defenderHits += 2;
      notes.push('AMBUSH: +2 Defender Hits (Applied immediately).');
      if (attackerWarriors !== null && attackerWarriors <= 2) {
        notes.push('Ambush may remove every attacking warrior; then the battle ends (4.3.1.II).');
      }
    }
  }

  // DEFENSELESS: Attacker deals +1 hit
  if (defenseless) {
    if (!isDefenseless) {
      notes.push('Vagabond without an undamaged sword is defenseless (9.2.4).');
    }
    attackerExtraHits += 1;
    notes.push('Defenseless: +1 Attacker Hit.');
  }

  // SAPPERS: Defender deals +1 extra hit
  if (sappersActive) {
    defenderHits += 1;
    notes.push('Sappers: Defender deals +1 hit.');
  }

  // BRUTAL TACTICS: Attacker +1 hit, Defender scores VP (VP logic not tracked here)
  if (brutalTacticsActive) {
    attackerExtraHits += 1;
    notes.push('Brutal Tactics: Attacker deals +1 hit, Defender scores 1 VP.');
  }

  // FACTION BONUSES
  if (isHundredsAttacker && hundredsWarlord && hundredsWrathful) {
    attackerExtraHits += 1;
    notes.push('Wrathful Warlord: +1 Attacker Hit.');
  }

  if (isEyrieAttacker && eyrieCommander) {
    attackerExtraHits += 1;
    notes.push('Commander: +1 Attacker Hit.');
  }

  if (isCorvidDefender && hasCorvidPlot) {
    defenderHits += 1;
    notes.push('Embedded Agents: +1 Defender Hit (Facedown Plot).');
  }

  // 5. Damage Prevention / Reduction (Apply LAST)

  // ARMORERS: "In battle, may discard this to ignore all rolled hits taken."
  // Only rolled hits are ignored; extra hits still land (Law 4.3.5.I, 4.3.5.III).
  if (armorersActive) {
    rawAttacker = 0;
    notes.push('Armorers: Defender ignores all ROLLED hits taken (extra hits still count).');
  }
  let attackerHits = rawAttacker + attackerExtraHits;

  // DEVOUT KNIGHTS (Keepers): Ignore first hit taken
  if (isKeeperDefender && keeperHasRelic && attackerHits > 0) {
    attackerHits -= 1;
    notes.push('DEVOUT KNIGHTS: Keepers ignore 1 hit taken.');
  }

  if (isKeeperAttacker && keeperHasRelic && defenderHits > 0) {
    defenderHits -= 1;
    notes.push('DEVOUT KNIGHTS: Keepers ignore 1 hit taken.');
  }

  if (commandWarrenActive) {
    notes.push('Command Warren: Battle can occur at start of Daylight phase.');
  }

  return {
    attackerHits: Math.max(0, attackerHits),
    defenderHits: Math.max(0, defenderHits),
    notes,
  };
}
