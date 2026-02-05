"use client";

import React, { useState, useEffect } from 'react';
import { Swords, Dices, AlertCircle, ShieldAlert, Info, Shield, Skull, Flame, Crown, Users } from 'lucide-react';
import { FACTIONS_DATA } from '@/data/factions';
import { IGameSession } from '@/types/engine';

interface BattleProps {
  defaultAttackerId?: string;
  onClose: () => void;
}

function Tooltip({ text }: { text: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative inline-block ml-1" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      <Info className="w-4 h-4 text-gray-500 hover:text-blue-400 cursor-help" />
      {show && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-gray-900 border border-gray-600 p-3 rounded text-xs text-gray-200 shadow-xl z-50 pointer-events-none leading-tight">
          {text}
        </div>
      )}
    </div>
  );
}

export function BattleWizard({ defaultAttackerId, onClose }: BattleProps) {
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
        console.error("Failed to parse session", e);
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
  const [eyrieCommander, setEyrieCommander] = useState(false);

  // Context Checks
  const isAllianceDefender = defenderId === 'alliance';
  const isVagabondAttacker = attackerId.startsWith('vagabond');
  const isCorvidDefender = defenderId === 'corvid';
  const isKeeperAttacker = attackerId === 'keepers';
  const isKeeperDefender = defenderId === 'keepers';
  const isHundredsAttacker = attackerId === 'hundreds';
  const isEyrieAttacker = attackerId === 'eyrie';

  const handleRoll = () => {
    setRoll({ d1: Math.floor(Math.random() * 4), d2: Math.floor(Math.random() * 4) });
  };

  let attackerHits = 0;
  let defenderHits = 0;
  const notes: string[] = [];

  if (roll) {
    const rawHigh = Math.max(roll.d1, roll.d2);
    const rawLow = Math.min(roll.d1, roll.d2);

    let rawAttacker = rawHigh;
    let rawDefender = rawLow;

    // 1. Guerrilla War
    if (isAllianceDefender) {
      rawAttacker = rawLow;
      rawDefender = rawHigh;
      notes.push("Guerrilla War: Alliance defends with higher roll.");
    }

    // 2. Vagabond Cap
    if (isVagabondAttacker) {
       if (rawAttacker > vagabondSwords) {
         rawAttacker = vagabondSwords;
         notes.push(`Vagabond: Hits limited by number of swords (${vagabondSwords}).`);
       }
    }

    // 3. Base Hits
    attackerHits = rawAttacker;
    defenderHits = rawDefender;

    // 4. Modifiers Calculation
    
    // AMBUSH: Defender deals 2 extra hits immediately
    if (isAmbush) {
      defenderHits += 2;
      notes.push("AMBUSH: +2 Defender Hits (Applied immediately).");
    }

    // DEFENSELESS: Attacker deals +1 hit
    if (isDefenseless) {
      attackerHits += 1;
      notes.push("Defenseless: +1 Attacker Hit.");
    }

    // SAPPERS: Defender deals +1 extra hit
    if (sappersActive) {
      defenderHits += 1;
      notes.push("Sappers: Defender deals +1 hit.");
    }

    // BRUTAL TACTICS: Attacker +1 hit, Defender scores VP (VP logic not tracked here)
    if (brutalTacticsActive) {
      attackerHits += 1;
      notes.push("Brutal Tactics: Attacker deals +1 hit, Defender scores 1 VP.");
    }

    // FACTION BONUSES
    if (isHundredsAttacker && hundredsWarlord && hundredsWrathful) {
      attackerHits += 1;
      notes.push("Wrathful Warlord: +1 Attacker Hit.");
    }

    if (isEyrieAttacker && eyrieCommander) {
      attackerHits += 1;
      notes.push("Commander: +1 Attacker Hit.");
    }

    if (isCorvidDefender && hasCorvidPlot) {
      defenderHits += 1;
      notes.push("Embedded Agents: +1 Defender Hit (Facedown Plot).");
    }

    // 5. Damage Prevention / Reduction (Apply LAST)

    // ARMORERS: Defender takes 0 rolled hits. 
    // This means Attacker deals 0 hits (excluding Ambush/manual adjustments, but usually ignores all).
    // Law 2.1.1: "defending player discards this card to ignore all rolled hits taken"
    if (armorersActive) {
      attackerHits = 0; 
      notes.push("Armorers: Defender ignores ALL rolled hits taken.");
    }

    // DEVOUT KNIGHTS (Keepers): Ignore first hit taken
    if (isKeeperDefender && keeperHasRelic && attackerHits > 0) {
       attackerHits -= 1;
       notes.push("DEVOUT KNIGHTS: Keepers ignore 1 hit taken.");
    }

    if (isKeeperAttacker && keeperHasRelic && defenderHits > 0) {
       defenderHits -= 1;
       notes.push("DEVOUT KNIGHTS: Keepers ignore 1 hit taken.");
    }

    if (commandWarrenActive) {
      notes.push("Command Warren: Battle can occur at start of Daylight phase.");
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur p-4 animate-in fade-in">
      <div className="bg-gray-950 border border-gray-700 rounded-2xl w-full max-w-md flex flex-col max-h-[90vh] shadow-2xl">

        <div className="bg-gray-900 p-4 border-b border-gray-800 flex justify-between items-center rounded-t-2xl">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Swords className="w-5 h-5 text-red-500" /> Battle Sim 5.0
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-2">✕</button>
        </div>

        <div className="p-5 space-y-6 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-1">
                <label className="text-[10px] text-red-400 font-bold uppercase tracking-wider flex items-center gap-1">
                  <Swords className="w-3 h-3" /> Attacker
                </label>
                <select value={attackerId} onChange={(e) => setAttackerId(e.target.value)} className="w-full bg-gray-800 text-white border border-gray-700 rounded p-2 text-sm font-bold">
                  {sortedFactions.map(f => (
                    <option key={f.id} value={f.id}>
                      {activeSession?.activeFactionIds.includes(f.id) ? '● ' : ''}{f.shortName}
                    </option>
                  ))}
                </select>
             </div>
             <div className="space-y-1">
                <label className="text-[10px] text-blue-400 font-bold uppercase tracking-wider flex items-center gap-1">
                  <Shield className="w-3 h-3" /> Defender
                </label>
                <select value={defenderId} onChange={(e) => setDefenderId(e.target.value)} className="w-full bg-gray-800 text-white border border-gray-700 rounded p-2 text-sm font-bold">
                  {sortedFactions.map(f => (
                    <option key={f.id} value={f.id}>
                      {activeSession?.activeFactionIds.includes(f.id) ? '● ' : ''}{f.shortName}
                    </option>
                  ))}
                </select>
             </div>
          </div>

          <div className="space-y-3 bg-gray-900/50 p-4 rounded-xl border border-gray-800">
             <p className="text-[10px] uppercase text-gray-500 font-bold mb-2">Battle Conditions</p>

             <label className="flex items-center justify-between cursor-pointer hover:bg-gray-800/50 p-1 rounded">
                <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-gray-300">Defenseless</span>
                    <Tooltip text="Defender has no warriors in clearing. +1 Hit." />
                </div>
                <input type="checkbox" checked={isDefenseless} onChange={e => setIsDefenseless(e.target.checked)} className="accent-red-500 w-4 h-4" />
             </label>

             <label className="flex items-center justify-between cursor-pointer hover:bg-gray-800/50 p-1 rounded">
                <div className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-gray-300">Ambush!</span>
                    <Tooltip text="Defender plays Ambush card. Deals 2 hits immediately." />
                </div>
                <input type="checkbox" checked={isAmbush} onChange={e => setIsAmbush(e.target.checked)} className="accent-red-500 w-4 h-4" />
             </label>

             {/* Advanced Cards Section */}
             <div className="border-t border-gray-800 pt-2 mt-2">
               <button
                 onClick={() => setShowAdvancedCards(!showAdvancedCards)}
                 className="flex items-center justify-between w-full cursor-pointer hover:bg-gray-800/50 p-1 rounded"
               >
                 <div className="flex items-center gap-2">
                   <Crown className="w-4 h-4 text-purple-500" />
                   <span className="text-sm font-bold text-purple-300">Advanced Cards</span>
                   <Tooltip text="Special cards that drastically alter combat math (Exiles & Partisans)" />
                 </div>
                 <div className={showAdvancedCards ? "rotate-180" : ""}>
                   <Flame className="w-4 h-4 text-gray-400 transition-transform" />
                 </div>
               </button>

               {showAdvancedCards && (
                 <div className="space-y-2 mt-2 p-2 bg-gray-900/30 rounded">
                   <label className="flex items-center justify-between cursor-pointer hover:bg-gray-800/50 p-1 rounded">
                     <div className="flex items-center gap-2">
                       <Shield className="w-4 h-4 text-blue-500" />
                       <span className="text-sm text-gray-300">Armorers</span>
                       <Tooltip text="Defender discards to ignore all rolled hits taken." />
                     </div>
                     <input type="checkbox" checked={armorersActive} onChange={e => setArmorersActive(e.target.checked)} className="accent-blue-500 w-4 h-4" />
                   </label>

                   <label className="flex items-center justify-between cursor-pointer hover:bg-gray-800/50 p-1 rounded">
                     <div className="flex items-center gap-2">
                       <Swords className="w-4 h-4 text-green-500" />
                       <span className="text-sm text-gray-300">Sappers</span>
                       <Tooltip text="Defender discards to deal +1 hit." />
                     </div>
                     <input type="checkbox" checked={sappersActive} onChange={e => setSappersActive(e.target.checked)} className="accent-green-500 w-4 h-4" />
                   </label>

                   <label className="flex items-center justify-between cursor-pointer hover:bg-gray-800/50 p-1 rounded">
                     <div className="flex items-center gap-2">
                       <Skull className="w-4 h-4 text-red-500" />
                       <span className="text-sm text-gray-300">Brutal Tactics</span>
                       <Tooltip text="Attacker discards for +1 hit, defender scores 1 VP." />
                     </div>
                     <input type="checkbox" checked={brutalTacticsActive} onChange={e => setBrutalTacticsActive(e.target.checked)} className="accent-red-500 w-4 h-4" />
                   </label>

                   <label className="flex items-center justify-between cursor-pointer hover:bg-gray-800/50 p-1 rounded">
                     <div className="flex items-center gap-2">
                       <Crown className="w-4 h-4 text-purple-500" />
                       <span className="text-sm text-gray-300">Command Warren</span>
                       <Tooltip text="Allows battle at start of Daylight phase (instead of Evening)." />
                     </div>
                     <input type="checkbox" checked={commandWarrenActive} onChange={e => setCommandWarrenActive(e.target.checked)} className="accent-purple-500 w-4 h-4" />
                   </label>

                   <div className="text-xs text-gray-500 italic p-2 bg-gray-800/30 rounded">
                     Context: Command Warren allows battle at start of daylight
                   </div>
                 </div>
               )}
             </div>

             {isVagabondAttacker && (
                 <div className="flex items-center justify-between border-t border-gray-800 pt-2 mt-2">
                    <span className="text-sm text-gray-300">Undamaged Swords:</span>
                    <div className="flex items-center gap-2">
                       <button onClick={() => setVagabondSwords(s => Math.max(0, s-1))} className="w-6 h-6 bg-gray-700 rounded text-white">-</button>
                       <span className="font-bold w-4 text-center">{vagabondSwords}</span>
                       <button onClick={() => setVagabondSwords(s => s+1)} className="w-6 h-6 bg-gray-700 rounded text-white">+</button>
                    </div>
                 </div>
             )}

             {isCorvidDefender && (
                <label className="flex items-center justify-between cursor-pointer hover:bg-gray-800/50 p-1 rounded border-t border-gray-800 pt-2">
                   <div className="flex items-center gap-2">
                       <Skull className="w-4 h-4 text-purple-400" />
                       <span className="text-sm text-purple-200">Facedown Plot?</span>
                       <Tooltip text="Embedded Agents: If a plot is hidden in clearing, Corvid gets +1 hit." />
                   </div>
                   <input type="checkbox" checked={hasCorvidPlot} onChange={e => setHasCorvidPlot(e.target.checked)} className="accent-purple-500 w-4 h-4" />
                </label>
             )}

             {(isKeeperAttacker || isKeeperDefender) && (
                <label className="flex items-center justify-between cursor-pointer hover:bg-gray-800/50 p-1 rounded border-t border-gray-800 pt-2">
                   <div className="flex items-center gap-2">
                       <Shield className="w-4 h-4 text-gray-400" />
                       <span className="text-sm text-gray-300">Keepers have Relic?</span>
                       <Tooltip text="Devout Knights: If they have Relic and Warrior, they ignore first hit." />
                   </div>
                   <input type="checkbox" checked={keeperHasRelic} onChange={e => setKeeperHasRelic(e.target.checked)} className="accent-gray-500 w-4 h-4" />
                </label>
             )}

             {isHundredsAttacker && (
                 <div className="border-t border-gray-800 pt-2 mt-2 flex flex-col gap-2">
                    <label className="flex items-center justify-between cursor-pointer hover:bg-gray-800/50 p-1 rounded">
                        <div className="flex items-center gap-2">
                            <Crown className="w-4 h-4 text-orange-500" />
                            <span className="text-sm text-orange-200">Warlord in battle?</span>
                        </div>
                        <input type="checkbox" checked={hundredsWarlord} onChange={e => setHundredsWarlord(e.target.checked)} className="accent-orange-500 w-4 h-4" />
                    </label>
                    {hundredsWarlord && (
                        <label className="flex items-center justify-between cursor-pointer hover:bg-gray-800/50 p-1 rounded">
                            <div className="flex items-center gap-2">
                                <Flame className="w-4 h-4 text-red-500" />
                                <span className="text-sm text-red-300">Wrathful Mood?</span>
                                <Tooltip text="Warlord gives +1 hit when attacking." />
                            </div>
                            <input type="checkbox" checked={hundredsWrathful} onChange={e => setHundredsWrathful(e.target.checked)} className="accent-red-500 w-4 h-4" />
                        </label>
                    )}
                 </div>
             )}

             {isEyrieAttacker && (
                <label className="flex items-center justify-between cursor-pointer hover:bg-gray-800/50 p-1 rounded border-t border-gray-800 pt-2">
                   <div className="flex items-center gap-2">
                       <span className="text-sm text-gray-300">Commander Leader?</span>
                   </div>
                   <input type="checkbox" checked={eyrieCommander} onChange={e => setEyrieCommander(e.target.checked)} className="accent-blue-500 w-4 h-4" />
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
                  <div className="bg-black px-3 py-1 rounded">D1: {roll.d1}</div>
                  <div className="bg-black px-3 py-1 rounded">D2: {roll.d2}</div>
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
                   {notes.map((n, i) => <p key={i} className="flex items-start gap-2"><span className="text-yellow-500">•</span> {n}</p>)}
                 </div>
               )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}