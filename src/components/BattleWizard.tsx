'use client';

import React, { useEffect, useId, useState } from 'react';
import {
  Swords,
  Dices,
  AlertCircle,
  ShieldAlert,
  Shield,
  Skull,
  Flame,
  Crown,
  Coins,
  Users,
} from 'lucide-react';
import { FACTIONS_DATA } from '@/data/factions';
import { IGameSession } from '@/types/engine';
import { resolveBattle } from '@/utils/battleLogic';
import { Tooltip } from './Tooltip';

interface BattleProps {
  defaultAttackerId?: string;
  onClose: () => void;
}

export function BattleWizard({ defaultAttackerId, onClose }: BattleProps) {
  const uid = useId();
  const [activeSession, setActiveSession] = useState<IGameSession | null>(null);
  const [attackerId, setAttackerId] = useState(defaultAttackerId || 'marquise');
  const [defenderId, setDefenderId] = useState('eyrie');
  const [roll, setRoll] = useState<{ d1: number; d2: number } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('root_active_session');
    if (saved) {
      try {
        const session = JSON.parse(saved) as IGameSession;
        setActiveSession(session);
        if (!defaultAttackerId && session.activeFactionIds.length >= 2) {
          setAttackerId(session.activeFactionIds[0]);
          setDefenderId(session.activeFactionIds[1]);
        }
      } catch (e) {
        console.error('Failed to parse session', e);
      }
    }
  }, [defaultAttackerId]);

  // Sort factions: active first
  const sortedFactions = [...FACTIONS_DATA].sort((a, b) => {
    const aActive = activeSession?.activeFactionIds.includes(a.id) ? 1 : 0;
    const bActive = activeSession?.activeFactionIds.includes(b.id) ? 1 : 0;
    return bActive - aActive;
  });

  // Toggles
  const [isDefenseless, setIsDefenseless] = useState(false);
  const [isAmbush, setIsAmbush] = useState(false);
  const [isAmbushFoiled, setIsAmbushFoiled] = useState(false);

  // Warriors in the clearing of battle (4.3.3.I); null = not entered, no cap
  const [attackerWarriors, setAttackerWarriors] = useState<number | null>(null);
  const [defenderWarriors, setDefenderWarriors] = useState<number | null>(null);

  // Advanced Cards
  const [armorersActive, setArmorersActive] = useState(false);
  const [sappersActive, setSappersActive] = useState(false);
  const [brutalTacticsActive, setBrutalTacticsActive] = useState(false);
  const [commandWarrenActive, setCommandWarrenActive] = useState(false);
  const [showAdvancedCards, setShowAdvancedCards] = useState(false);

  // Faction Specifics
  const [vagabondSwords, setVagabondSwords] = useState(3);
  const [hasCorvidPlot, setHasCorvidPlot] = useState(true);
  const [keeperHasRelic, setKeeperHasRelic] = useState(true);
  const [hundredsWrathful, setHundredsWrathful] = useState(false);
  const [hundredsWarlord, setHundredsWarlord] = useState(true);
  const [hundredsStubborn, setHundredsStubborn] = useState(true); // starting mood (14.3.4)
  const [hundredsLoot, setHundredsLoot] = useState(false);
  const [eyrieCommander, setEyrieCommander] = useState(false);

  // Context Checks
  const isVagabondAttacker = attackerId.startsWith('vagabond');
  const isVagabondDefender = defenderId.startsWith('vagabond');
  const isCorvidDefender = defenderId === 'corvid';
  const isKeeperAttacker = attackerId === 'keepers';
  const isKeeperDefender = defenderId === 'keepers';
  const isHundredsAttacker = attackerId === 'hundreds';
  const isHundredsDefender = defenderId === 'hundreds';
  const isEyrieAttacker = attackerId === 'eyrie';

  const handleRoll = () => {
    setRoll({ d1: Math.floor(Math.random() * 4), d2: Math.floor(Math.random() * 4) });
  };

  const result = roll
    ? resolveBattle({
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
        hundredsStubborn,
        hundredsLoot,
        eyrieCommander,
      })
    : null;

  const attackerHits = result?.attackerHits ?? 0;
  const defenderHits = result?.defenderHits ?? 0;
  const notes = result?.notes ?? [];

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-gray-950 border border-gray-700 rounded-2xl w-full max-w-md flex flex-col max-h-[90vh] shadow-2xl">
        <div className="bg-gray-900 p-4 border-b border-gray-800 flex justify-between items-center rounded-t-2xl">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Swords className="w-5 h-5 text-red-500" /> Battle Sim 5.1
          </h3>
          <button
            onClick={onClose}
            aria-label="Close battle simulator"
            className="text-gray-400 hover:text-white p-2"
          >
            ✕
          </button>
        </div>

        <div className="p-5 space-y-6 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] text-red-400 font-bold uppercase tracking-wider flex items-center gap-1">
                <Swords className="w-3 h-3" /> Attacker
              </label>
              <select
                value={attackerId}
                onChange={(e) => setAttackerId(e.target.value)}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-sm p-2 text-sm font-bold"
              >
                {sortedFactions.map((f) => (
                  <option key={f.id} value={f.id}>
                    {activeSession?.activeFactionIds.includes(f.id) ? '● ' : ''}
                    {f.shortName}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-blue-400 font-bold uppercase tracking-wider flex items-center gap-1">
                <Shield className="w-3 h-3" /> Defender
              </label>
              <select
                value={defenderId}
                onChange={(e) => setDefenderId(e.target.value)}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-sm p-2 text-sm font-bold"
              >
                {sortedFactions.map((f) => (
                  <option key={f.id} value={f.id}>
                    {activeSession?.activeFactionIds.includes(f.id) ? '● ' : ''}
                    {f.shortName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-3 bg-gray-900/50 p-4 rounded-xl border border-gray-800">
            <p className="text-[10px] uppercase text-gray-500 font-bold mb-2">Battle Conditions</p>

            <label
              htmlFor={`${uid}-defenseless`}
              className="flex items-center justify-between cursor-pointer hover:bg-gray-800/50 p-1 rounded-sm"
            >
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-yellow-500" />
                <span className="text-sm text-gray-300">Defenseless</span>
                <Tooltip text="Defender has no warriors in the clearing (4.3.5.II): attacker +1 hit, defender deals no rolled hits. A Vagabond defender without an undamaged sword is defenseless automatically (9.2.4)." />
              </div>
              <input
                id={`${uid}-defenseless`}
                type="checkbox"
                checked={isDefenseless}
                onChange={(e) => setIsDefenseless(e.target.checked)}
                className="accent-red-500 w-4 h-4"
              />
            </label>

            <label
              htmlFor={`${uid}-ambush`}
              className="flex items-center justify-between cursor-pointer hover:bg-gray-800/50 p-1 rounded-sm"
            >
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-red-500" />
                <span className="text-sm text-gray-300">Ambush!</span>
                <Tooltip text="Defender plays Ambush card. Deals 2 hits immediately." />
              </div>
              <input
                id={`${uid}-ambush`}
                type="checkbox"
                checked={isAmbush}
                onChange={(e) => {
                  setIsAmbush(e.target.checked);
                  if (!e.target.checked) setIsAmbushFoiled(false);
                }}
                className="accent-red-500 w-4 h-4"
              />
            </label>

            {isAmbush && (
              <label
                htmlFor={`${uid}-ambush-foiled`}
                className="flex items-center justify-between cursor-pointer hover:bg-gray-800/50 p-1 rounded-sm pl-6"
              >
                <div className="flex items-center gap-2">
                  <Swords className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-300">Foiled by attacker's ambush</span>
                  <Tooltip text="The attacker played an ambush matching the clearing: the defender's ambush is discarded and deals no hits (4.3.1.I)." />
                </div>
                <input
                  id={`${uid}-ambush-foiled`}
                  type="checkbox"
                  checked={isAmbushFoiled}
                  onChange={(e) => setIsAmbushFoiled(e.target.checked)}
                  className="accent-red-500 w-4 h-4"
                />
              </label>
            )}

            {!isVagabondAttacker && (
              <label
                htmlFor={`${uid}-attacker-warriors`}
                className="flex items-center justify-between cursor-pointer hover:bg-gray-800/50 p-1 rounded-sm"
              >
                <div className="flex items-center gap-2">
                  <Swords className="w-4 h-4 text-red-400" />
                  <span className="text-sm text-gray-300">Attacking warriors</span>
                  <Tooltip text="Rolled hits are limited by the warriors in the clearing of battle (4.3.3.I). Leave empty for no limit." />
                </div>
                <input
                  id={`${uid}-attacker-warriors`}
                  type="number"
                  value={attackerWarriors ?? ''}
                  min={0}
                  max={25}
                  placeholder="any"
                  onChange={(e) => {
                    setAttackerWarriors(e.target.value === '' ? null : Number(e.target.value));
                  }}
                  className="w-20 bg-gray-800 text-white border border-gray-700 rounded-sm p-2 text-sm font-bold text-center"
                />
              </label>
            )}

            {!isVagabondDefender && (
              <label
                htmlFor={`${uid}-defender-warriors`}
                className="flex items-center justify-between cursor-pointer hover:bg-gray-800/50 p-1 rounded-sm"
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-gray-300">Defending warriors</span>
                  <Tooltip text="Rolled hits are limited by the warriors in the clearing of battle (4.3.3.I). Leave empty for no limit." />
                </div>
                <input
                  id={`${uid}-defender-warriors`}
                  type="number"
                  value={defenderWarriors ?? ''}
                  min={0}
                  max={25}
                  placeholder="any"
                  onChange={(e) => {
                    setDefenderWarriors(e.target.value === '' ? null : Number(e.target.value));
                  }}
                  className="w-20 bg-gray-800 text-white border border-gray-700 rounded-sm p-2 text-sm font-bold text-center"
                />
              </label>
            )}

            {/* Advanced Cards Section */}
            <div className="border-t border-gray-800 pt-2 mt-2">
              <div className="flex items-center w-full hover:bg-gray-800/50 p-1 rounded-sm">
                <button
                  type="button"
                  onClick={() => setShowAdvancedCards(!showAdvancedCards)}
                  aria-expanded={showAdvancedCards}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Crown className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-bold text-purple-300">Advanced Cards</span>
                </button>
                <Tooltip text="Special cards that drastically alter combat math (Exiles & Partisans)" />
                <button
                  type="button"
                  onClick={() => setShowAdvancedCards(!showAdvancedCards)}
                  tabIndex={-1}
                  aria-hidden="true"
                  className="flex-1 flex justify-end cursor-pointer"
                >
                  <span className={showAdvancedCards ? 'inline-block rotate-180' : 'inline-block'}>
                    <Flame className="w-4 h-4 text-gray-400 transition-transform" />
                  </span>
                </button>
              </div>

              {showAdvancedCards && (
                <div className="space-y-2 mt-2 p-2 bg-gray-900/30 rounded-sm">
                  <label
                    htmlFor={`${uid}-armorers`}
                    className="flex items-center justify-between cursor-pointer hover:bg-gray-800/50 p-1 rounded-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-gray-300">Armorers</span>
                      <Tooltip text="Defender discards to ignore all rolled hits taken." />
                    </div>
                    <input
                      id={`${uid}-armorers`}
                      type="checkbox"
                      checked={armorersActive}
                      onChange={(e) => setArmorersActive(e.target.checked)}
                      className="accent-blue-500 w-4 h-4"
                    />
                  </label>

                  <label
                    htmlFor={`${uid}-sappers`}
                    className="flex items-center justify-between cursor-pointer hover:bg-gray-800/50 p-1 rounded-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Swords className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-300">Sappers</span>
                      <Tooltip text="Defender discards to deal +1 hit." />
                    </div>
                    <input
                      id={`${uid}-sappers`}
                      type="checkbox"
                      checked={sappersActive}
                      onChange={(e) => setSappersActive(e.target.checked)}
                      className="accent-green-500 w-4 h-4"
                    />
                  </label>

                  <label
                    htmlFor={`${uid}-brutal-tactics`}
                    className="flex items-center justify-between cursor-pointer hover:bg-gray-800/50 p-1 rounded-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Skull className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-gray-300">Brutal Tactics</span>
                      <Tooltip text="Attacker discards for +1 hit, defender scores 1 VP." />
                    </div>
                    <input
                      id={`${uid}-brutal-tactics`}
                      type="checkbox"
                      checked={brutalTacticsActive}
                      onChange={(e) => setBrutalTacticsActive(e.target.checked)}
                      className="accent-red-500 w-4 h-4"
                    />
                  </label>

                  <label
                    htmlFor={`${uid}-command-warren`}
                    className="flex items-center justify-between cursor-pointer hover:bg-gray-800/50 p-1 rounded-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Crown className="w-4 h-4 text-purple-500" />
                      <span className="text-sm text-gray-300">Command Warren</span>
                      <Tooltip text="Allows battle at start of Daylight phase (instead of Evening)." />
                    </div>
                    <input
                      id={`${uid}-command-warren`}
                      type="checkbox"
                      checked={commandWarrenActive}
                      onChange={(e) => setCommandWarrenActive(e.target.checked)}
                      className="accent-purple-500 w-4 h-4"
                    />
                  </label>

                  <div className="text-xs text-gray-500 italic p-2 bg-gray-800/30 rounded-sm">
                    Context: Command Warren allows battle at start of daylight
                  </div>
                </div>
              )}
            </div>

            {(isVagabondAttacker || isVagabondDefender) && (
              <div className="flex items-center justify-between border-t border-gray-800 pt-2 mt-2">
                <span className="text-sm text-gray-300">Undamaged Swords:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setVagabondSwords((s) => Math.max(0, s - 1))}
                    aria-label="Remove one undamaged sword"
                    className="w-6 h-6 bg-gray-700 rounded-sm text-white"
                  >
                    -
                  </button>
                  <span className="font-bold w-4 text-center">{vagabondSwords}</span>
                  <button
                    onClick={() => setVagabondSwords((s) => s + 1)}
                    aria-label="Add one undamaged sword"
                    className="w-6 h-6 bg-gray-700 rounded-sm text-white"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {isCorvidDefender && (
              <label
                htmlFor={`${uid}-corvid-plot`}
                className="flex items-center justify-between cursor-pointer hover:bg-gray-800/50 p-1 rounded-sm border-t border-gray-800 pt-2"
              >
                <div className="flex items-center gap-2">
                  <Skull className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-purple-200">Facedown Plot?</span>
                  <Tooltip text="Embedded Agents: If a plot is hidden in clearing, Corvid gets +1 hit." />
                </div>
                <input
                  id={`${uid}-corvid-plot`}
                  type="checkbox"
                  checked={hasCorvidPlot}
                  onChange={(e) => setHasCorvidPlot(e.target.checked)}
                  className="accent-purple-500 w-4 h-4"
                />
              </label>
            )}

            {(isKeeperAttacker || isKeeperDefender) && (
              <label
                htmlFor={`${uid}-keepers-relic`}
                className="flex items-center justify-between cursor-pointer hover:bg-gray-800/50 p-1 rounded-sm border-t border-gray-800 pt-2"
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-300">Keepers have Relic?</span>
                  <Tooltip text="Devout Knights: If they have Relic and Warrior, they ignore first hit." />
                </div>
                <input
                  id={`${uid}-keepers-relic`}
                  type="checkbox"
                  checked={keeperHasRelic}
                  onChange={(e) => setKeeperHasRelic(e.target.checked)}
                  className="accent-gray-500 w-4 h-4"
                />
              </label>
            )}

            {isHundredsAttacker && (
              <div className="border-t border-gray-800 pt-2 mt-2 flex flex-col gap-2">
                {!isVagabondDefender && (
                  <label
                    htmlFor={`${uid}-hundreds-loot`}
                    className="flex items-center justify-between cursor-pointer hover:bg-gray-800/50 p-1 rounded-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Coins className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-yellow-200">Loot the defender</span>
                      <Tooltip text="No rolled hits; take an item from the defender's Crafted Items box if you rule the clearing after the battle (14.2.5). Not against the Vagabond." />
                    </div>
                    <input
                      id={`${uid}-hundreds-loot`}
                      type="checkbox"
                      checked={hundredsLoot}
                      onChange={(e) => setHundredsLoot(e.target.checked)}
                      className="accent-yellow-500 w-4 h-4"
                    />
                  </label>
                )}
                <label className="flex items-center justify-between cursor-pointer hover:bg-gray-800/50 p-1 rounded-sm">
                  <div className="flex items-center gap-2">
                    <Crown className="w-4 h-4 text-orange-500" />
                    <span className="text-sm text-orange-200">Warlord in battle?</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={hundredsWarlord}
                    onChange={(e) => setHundredsWarlord(e.target.checked)}
                    className="accent-orange-500 w-4 h-4"
                  />
                </label>
                {hundredsWarlord && (
                  <label
                    htmlFor={`${uid}-hundreds-wrathful`}
                    className="flex items-center justify-between cursor-pointer hover:bg-gray-800/50 p-1 rounded-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-red-300">Wrathful Mood?</span>
                      <Tooltip text="Warlord gives +1 hit when attacking." />
                    </div>
                    <input
                      id={`${uid}-hundreds-wrathful`}
                      type="checkbox"
                      checked={hundredsWrathful}
                      onChange={(e) => setHundredsWrathful(e.target.checked)}
                      className="accent-red-500 w-4 h-4"
                    />
                  </label>
                )}
              </div>
            )}

            {isHundredsDefender && (
              <label
                htmlFor={`${uid}-hundreds-stubborn`}
                className="flex items-center justify-between cursor-pointer hover:bg-gray-800/50 p-1 rounded-sm border-t border-gray-800 pt-2"
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-orange-500" />
                  <span className="text-sm text-orange-200">Stubborn (warlord's clearing)</span>
                  <Tooltip text="Ignore the first hit taken in the warlord's clearing (14.7.7)." />
                </div>
                <input
                  id={`${uid}-hundreds-stubborn`}
                  type="checkbox"
                  checked={hundredsStubborn}
                  onChange={(e) => setHundredsStubborn(e.target.checked)}
                  className="accent-orange-500 w-4 h-4"
                />
              </label>
            )}

            {isEyrieAttacker && (
              <label className="flex items-center justify-between cursor-pointer hover:bg-gray-800/50 p-1 rounded-sm border-t border-gray-800 pt-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-300">Commander Leader?</span>
                </div>
                <input
                  type="checkbox"
                  checked={eyrieCommander}
                  onChange={(e) => setEyrieCommander(e.target.checked)}
                  className="accent-blue-500 w-4 h-4"
                />
              </label>
            )}
          </div>

          <button
            onClick={handleRoll}
            className="w-full py-4 bg-white text-black font-black text-xl rounded-xl hover:bg-gray-200 active:scale-95 transition-all flex items-center justify-center gap-3 shadow-lg"
          >
            <Dices className="w-6 h-6" /> {roll ? 'REROLL' : 'FIGHT'}
          </button>

          {roll && (
            <div className="space-y-4 animate-in zoom-in-95 duration-200">
              <div className="flex justify-center gap-4 text-xs text-gray-500 font-mono">
                <div className="bg-black px-3 py-1 rounded-sm">D1: {roll.d1}</div>
                <div className="bg-black px-3 py-1 rounded-sm">D2: {roll.d2}</div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-red-900/20 p-4 rounded-xl border border-red-500/30">
                  <div className="text-[10px] uppercase text-red-400 font-bold mb-1">Attacker</div>
                  <div className="text-5xl font-black text-white">{attackerHits}</div>
                </div>
                <div className="bg-blue-900/20 p-4 rounded-xl border border-blue-500/30">
                  <div className="text-[10px] uppercase text-blue-400 font-bold mb-1">Defender</div>
                  <div className="text-5xl font-black text-white">{defenderHits}</div>
                </div>
              </div>

              {notes.length > 0 && (
                <div className="bg-gray-800 p-3 rounded-lg text-xs text-gray-300 space-y-1.5 border-l-2 border-yellow-500">
                  {notes.map((n, i) => (
                    <p key={i} className="flex items-start gap-2">
                      <span className="text-yellow-500">•</span> {n}
                    </p>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
