"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { AdSetDraft } from '@/components/AdSetDraft';
import { SetupWizard } from '@/components/SetupWizard'; // Reach Calculator
import { MapVisualizer } from '@/components/MapVisualizer';
import { ArrowLeft, Users, Map as MapIcon, Layers, ArrowRight, CheckCircle2, Trophy, Shuffle, RotateCcw, Target, Layout, Info } from 'lucide-react';
import { clsx } from 'clsx';
import { MAPS, DEFAULT_SUITS } from '@/data/maps';
import { Suit } from '@/types/engine';
import { HIRELINGS_DATA } from '@/data/hirelings';
import { LANDMARKS_DATA } from '@/data/landmarks';

type Step = 'config' | 'map' | 'selection' | 'finish';
type SetupMethod = 'draft' | 'calculator';

interface SetupConfig {
  playerCount: 2 | 3 | 4 | 5 | 6;
  mapId: string;
  deckId: 'standard' | 'exiles';
  method: SetupMethod;
  randomSuits: boolean;
  useLandmarks: boolean;
  useHirelings: boolean;
}

export default function SetupPage() {
  const [step, setStep] = useState<Step>('config');
  const [config, setConfig] = useState<SetupConfig>({
    playerCount: 4,
    mapId: 'autumn',
    deckId: 'exiles',
    method: 'draft',
    randomSuits: false,
    useLandmarks: false,
    useHirelings: false
  });

  const [suitMapping, setSuitMapping] = useState<Record<number, Suit> | undefined>(undefined);
  const [selectedHirelings, setSelectedHirelings] = useState<string[]>([]);
  const [selectedLandmarks, setSelectedLandmarks] = useState<string[]>([]);

  const maps = Object.values(MAPS);

  const handleSetTheStage = () => {
    // Generate Random Suits if needed
    if (config.randomSuits) {
      const shuffled = [...DEFAULT_SUITS].sort(() => Math.random() - 0.5);
      const mapping: Record<number, Suit> = {};
      shuffled.forEach((s, i) => mapping[i + 1] = s);
      setSuitMapping(mapping);
    } else {
      setSuitMapping(undefined);
    }

    // Randomize Hirelings (Need 3)
    if (config.useHirelings) {
      const shuffled = [...HIRELINGS_DATA].sort(() => Math.random() - 0.5).slice(0, 3);
      setSelectedHirelings(shuffled.map(h => h.id));
    }

    // Randomize Landmarks (Need 1-2)
    if (config.useLandmarks) {
      const count = Math.random() > 0.5 ? 2 : 1;
      const shuffled = [...LANDMARKS_DATA].sort(() => Math.random() - 0.5).slice(0, count);
      setSelectedLandmarks(shuffled.map(l => l.id));
    }

    setStep('map');
  };

  const handleSelectionFinish = (factionIds: string[]) => {
    // Save everything to session
    const session = {
      activeFactionIds: factionIds,
      map: config.mapId,
      suitMapping,
      hirelings: selectedHirelings,
      landmarks: selectedLandmarks,
      deck: config.deckId,
      startedAt: Date.now()
    };
    localStorage.setItem('root_active_session', JSON.stringify(session));
    setStep('finish');
  };

  return (
    <div className="min-h-screen bg-[#0a0c10] p-4 pb-20 pt-6">
      {/* Navigation Header */}
      <div className="max-w-4xl mx-auto flex items-center justify-between mb-8">
        <Link href="/" className="text-gray-500 hover:text-white flex items-center gap-2 transition-colors font-medium">
          <ArrowLeft className="w-5 h-5" /> Cancel
        </Link>
        <div className="flex gap-2">
           <div className={clsx("w-3 h-3 rounded-full transition-colors", step === 'config' ? "bg-orange-500" : "bg-gray-700")} />
           <div className={clsx("w-3 h-3 rounded-full transition-colors", step === 'map' ? "bg-orange-500" : "bg-gray-700")} />
           <div className={clsx("w-3 h-3 rounded-full transition-colors", step === 'selection' ? "bg-orange-500" : "bg-gray-700")} />
           <div className={clsx("w-3 h-3 rounded-full transition-colors", step === 'finish' ? "bg-green-500" : "bg-gray-700")} />
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        
        {/* STEP 1: CONFIGURATION */}
        {step === 'config' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
             <div className="text-center">
                <h1 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">Game Configuration</h1>
                <p className="text-gray-400">Define your woodland conflict</p>
             </div>

             <div className="grid md:grid-cols-2 gap-6">
                
                {/* Player Count */}
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                   <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-400" /> Players
                   </h3>
                   <div className="grid grid-cols-5 gap-2">
                      {[2, 3, 4, 5, 6].map(count => (
                         <button
                           key={count}
                           onClick={() => setConfig({...config, playerCount: count as 2 | 3 | 4 | 5 | 6})}
                           className={clsx(
                             "py-3 rounded-lg border font-bold transition-all",
                             config.playerCount === count 
                               ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/40" 
                               : "bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-500"
                           )}
                         >
                           {count}
                         </button>
                      ))}
                   </div>
                </div>

                {/* Setup Method */}
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                   <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <Layout className="w-5 h-5 text-purple-400" /> Selection Method
                   </h3>
                   <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setConfig({...config, method: 'draft'})}
                        disabled={config.playerCount > 4}
                        className={clsx(
                          "py-3 px-2 rounded-lg border font-bold transition-all text-xs flex flex-col items-center gap-1",
                          config.method === 'draft' 
                            ? "bg-purple-900/60 border-purple-500 text-purple-100 shadow-lg shadow-purple-900/40" 
                            : "bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-500",
                          config.playerCount > 4 && "opacity-30 cursor-not-allowed"
                        )}
                      >
                        <Shuffle className="w-4 h-4" />
                        AdSet Draft
                      </button>
                      <button
                        onClick={() => setConfig({...config, method: 'calculator'})}
                        className={clsx(
                          "py-3 px-2 rounded-lg border font-bold transition-all text-xs flex flex-col items-center gap-1",
                          config.method === 'calculator' 
                            ? "bg-blue-900/60 border-blue-500 text-blue-100 shadow-lg shadow-blue-900/40" 
                            : "bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-500"
                        )}
                      >
                        <Target className="w-4 h-4" />
                        Reach Calc
                      </button>
                   </div>
                   {config.playerCount > 4 && config.method === 'draft' && (
                       <p className="text-[10px] text-orange-400 mt-2">AdSet draft supports max 4 players. Switching to Reach Calc.</p>
                   )}
                </div>

                {/* Deck & Map Selectors */}
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 md:col-span-2 space-y-6">
                   <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <MapIcon className="w-5 h-5 text-amber-400" /> Map
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                            {maps.map(map => (
                                <button
                                key={map.id}
                                onClick={() => setConfig({...config, mapId: map.id})}
                                className={clsx(
                                    "py-3 rounded-lg border font-bold transition-all text-xs",
                                    config.mapId === map.id
                                    ? "bg-amber-900/40 border-amber-500 text-amber-100" 
                                    : "bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-500"
                                )}
                                >
                                {map.name}
                                </button>
                            ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <Layers className="w-5 h-5 text-indigo-400" /> Deck
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={() => setConfig({...config, deckId: 'standard'})}
                                className={clsx(
                                "py-3 rounded-lg border font-bold transition-all text-xs",
                                config.deckId === 'standard' 
                                    ? "bg-blue-900/60 border-blue-500 text-blue-100" 
                                    : "bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-500"
                                )}
                            >
                                Standard
                            </button>
                            <button
                                onClick={() => setConfig({...config, deckId: 'exiles'})}
                                className={clsx(
                                "py-3 rounded-lg border font-bold transition-all text-xs",
                                config.deckId === 'exiles' 
                                    ? "bg-orange-900/60 border-orange-500 text-orange-100" 
                                    : "bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-500"
                                )}
                            >
                                Exiles
                            </button>
                        </div>
                      </div>
                   </div>
                   
                   {/* Options */}
                   <div className="pt-4 border-t border-gray-800 flex flex-wrap gap-4">
                      <label className="flex items-center gap-2 cursor-pointer text-gray-300 text-sm bg-black/20 px-4 py-2 rounded-xl border border-gray-800 hover:border-gray-600 transition-colors">
                         <input 
                           type="checkbox" 
                           checked={config.randomSuits}
                           onChange={e => setConfig({...config, randomSuits: e.target.checked})}
                           className="w-4 h-4 rounded accent-orange-500"
                         />
                         Randomize Suits
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer text-gray-300 text-sm bg-black/20 px-4 py-2 rounded-xl border border-gray-800 hover:border-gray-600 transition-colors">
                         <input 
                           type="checkbox" 
                           checked={config.useLandmarks}
                           onChange={e => setConfig({...config, useLandmarks: e.target.checked})}
                           className="w-4 h-4 rounded accent-amber-500"
                         />
                         Include Landmarks
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer text-gray-300 text-sm bg-black/20 px-4 py-2 rounded-xl border border-gray-800 hover:border-gray-600 transition-colors">
                         <input 
                           type="checkbox" 
                           checked={config.useHirelings}
                           onChange={e => setConfig({...config, useHirelings: e.target.checked})}
                           className="w-4 h-4 rounded accent-purple-500"
                         />
                         Include Hirelings
                      </label>
                   </div>
                </div>
             </div>

             <div className="flex justify-center pt-4">
                <button
                  onClick={handleSetTheStage}
                  className="px-12 py-4 bg-white text-black font-black text-xl rounded-full hover:bg-gray-200 hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center gap-3"
                >
                  SET THE STAGE <ArrowRight className="w-6 h-6" />
                </button>
             </div>
          </div>
        )}

        {/* STEP 2: MAP SETUP */}
        {step === 'map' && (
           <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="text-center">
                <h1 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">Prepare the Map</h1>
                <p className="text-gray-400">Step 2: Woodland Geography</p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 shadow-2xl">
                 <div className="mb-8 flex justify-center">
                    <MapVisualizer 
                      mapId={config.mapId} 
                      suitMapping={suitMapping}
                    />
                 </div>

                 <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-300 bg-black/40 p-6 rounded-2xl border border-gray-800">
                    <div className="space-y-3">
                       <h4 className="font-bold text-white uppercase tracking-widest text-xs flex items-center gap-2">
                           <Info className="w-4 h-4 text-blue-400" /> Setup Checklist
                       </h4>
                       <ul className="space-y-2 text-gray-400">
                          <li className="flex items-start gap-2"><span className="text-blue-500">•</span> <span>Place board: <strong>{MAPS[config.mapId]?.name}</strong></span></li>
                          <li className="flex items-start gap-2"><span className="text-blue-500">•</span> <span>{config.randomSuits ? "Place suit markers as shown on map above." : "Follow printed suits on board."}</span></li>
                          <li className="flex items-start gap-2"><span className="text-blue-500">•</span> <span>Place Ruins on all &quot;R&quot; slots (4 total).</span></li>
                          <li className="flex items-start gap-2"><span className="text-blue-500">•</span> <span>Place Item supply track at the top.</span></li>
                       </ul>
                    </div>
                    
                    <div className="space-y-4">
                       {config.useHirelings && (
                          <div className="space-y-2">
                             <h4 className="font-bold text-purple-400 uppercase tracking-widest text-[10px]">Active Hirelings</h4>
                             <div className="flex flex-wrap gap-2">
                                {selectedHirelings.map(hid => (
                                   <span key={hid} className="bg-purple-900/30 border border-purple-500/30 px-2 py-1 rounded text-xs font-bold text-purple-200">
                                      {HIRELINGS_DATA.find(h => h.id === hid)?.name}
                                   </span>
                                ))}
                             </div>
                          </div>
                       )}
                       {config.useLandmarks && (
                          <div className="space-y-2">
                             <h4 className="font-bold text-amber-400 uppercase tracking-widest text-[10px]">Active Landmarks</h4>
                             <div className="flex flex-wrap gap-2">
                                {selectedLandmarks.map(lid => (
                                   <span key={lid} className="bg-amber-900/30 border border-amber-500/30 px-2 py-1 rounded text-xs font-bold text-amber-200">
                                      {LANDMARKS_DATA.find(l => l.id === lid)?.name}
                                   </span>
                                ))}
                             </div>
                          </div>
                       )}
                       <div className="space-y-1">
                          <h4 className="font-bold text-indigo-400 uppercase tracking-widest text-[10px]">Deck Configuration</h4>
                          <p className="font-bold text-white">{config.deckId === 'exiles' ? "EXILES & PARTISANS" : "STANDARD DECK"}</p>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="flex justify-between items-center pt-4">
                <button onClick={() => setStep('config')} className="text-gray-500 hover:text-white font-bold transition-colors flex items-center gap-2">
                  <ArrowLeft className="w-5 h-5" /> BACK
                </button>
                <button
                  onClick={() => setStep('selection')}
                  className="px-10 py-4 bg-white text-black font-black text-xl rounded-full hover:bg-gray-200 hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center gap-3"
                >
                  {config.method === 'draft' ? 'PROCEED TO DRAFT' : 'SELECT FACTIONS'} <ArrowRight className="w-6 h-6" />
                </button>
             </div>
           </div>
        )}

        {/* STEP 3: SELECTION (DRAFT OR CALCULATOR) */}
        {step === 'selection' && (
           <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="mb-6">
                 <button
                  onClick={() => setStep('map')}
                  className="text-gray-500 hover:text-white flex items-center gap-2 text-sm font-bold uppercase tracking-widest"
                 >
                   <ArrowLeft className="w-4 h-4" /> Back to Map
                 </button>
              </div>
              
              {config.method === 'draft' ? (
                  <AdSetDraft 
                    initialPlayerCount={config.playerCount as 2|3|4} 
                    onFinish={handleSelectionFinish} 
                  />
              ) : (
                  <div className="space-y-6">
                      <div className="text-center mb-8">
                        <h1 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">Reach Calculator</h1>
                        <p className="text-gray-400">Ensure a balanced game for {config.playerCount} players</p>
                      </div>
                      <SetupWizard onFinish={handleSelectionFinish} />
                  </div>
              )}
           </div>
        )}

        {/* STEP 4: FINISH (Only reached if AdSet finishes or we manually route here) */}
        {step === 'finish' && (
           <div className="max-w-xl mx-auto text-center space-y-8 animate-in zoom-in-95 duration-500 py-12">
              <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto border border-green-500/40 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                 <Trophy className="w-12 h-12 text-green-400" />
              </div>
              
              <div>
                 <h1 className="text-4xl font-black text-white mb-2 uppercase tracking-tight">Woodland Ready!</h1>
                 <p className="text-gray-400">Factions assigned, map prepared, rules confirmed.</p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 text-left space-y-6 shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4">
                    <span className="text-green-400 text-[10px] font-black tracking-[0.2em] bg-green-950/50 px-3 py-1 rounded-full border border-green-500/30 uppercase">Session Active</span>
                 </div>
                 <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-1">
                       <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Woodland Map</p>
                       <p className="text-white font-black text-lg">{MAPS[config.mapId]?.name || 'Custom Map'}</p>
                    </div>
                    <div className="space-y-1">
                       <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Shared Deck</p>
                       <p className="text-white font-black text-lg">{config.deckId === 'exiles' ? 'Exiles & Partisans' : 'Standard'}</p>
                    </div>
                    <div className="space-y-1">
                       <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Participants</p>
                       <p className="text-white font-black text-lg">{config.playerCount} Players</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Setup Protocol</p>
                        <p className="text-white font-black text-lg capitalize">{config.method}</p>
                    </div>
                 </div>
              </div>

              <div className="flex flex-col gap-4 pt-4">
                 <Link href="/play" className="w-full">
                    <button className="w-full py-5 bg-white text-black font-black text-2xl rounded-2xl shadow-2xl transition-transform hover:scale-105 active:scale-95 flex items-center justify-center gap-4">
                       <CheckCircle2 className="w-8 h-8" />
                       START GAME
                    </button>
                 </Link>
                 <button 
                   onClick={() => window.location.reload()}
                   className="text-gray-500 hover:text-gray-300 text-sm font-bold uppercase tracking-widest py-2 flex items-center justify-center gap-2 transition-colors"
                 >
                   <RotateCcw className="w-4 h-4" /> Reset Setup
                 </button>
              </div>
           </div>
        )}

      </div>
    </div>
  );
}