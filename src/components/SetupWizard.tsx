/**
 * @author Sinimus <sinimus@noreply>
 * @license AGPL-3.0
 * @description Part of Root Companion App
 */

"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { FACTIONS_DATA, RECOMMENDED_REACH } from '@/data/factions';
import { CheckCircle2, Users, ShieldAlert } from 'lucide-react';
import { clsx } from 'clsx';

interface Props {
  onFinish?: (factions: string[]) => void;
}

export function SetupWizard({ onFinish }: Props) {
  const [playerCount, setPlayerCount] = useState<number>(4);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const toggleFaction = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  const handleStartGame = () => {
    if (onFinish) onFinish(Array.from(selectedIds));
  };

  const { totalReach, militantCount, targetReach, isValid, errorMsg } = useMemo(() => {
    const selected = FACTIONS_DATA.filter(f => selectedIds.has(f.id));
    const reach = selected.reduce((sum, f) => sum + f.reach, 0);
    const militants = selected.filter(f => f.type === 'militant').length;
    const target = RECOMMENDED_REACH[playerCount] || 0;
    
    let valid = true;
    let error = "";

    if (militants < 1) {
      valid = false;
      error = "Missing Militant Faction";
    } else if (reach < target) {
      valid = false;
      error = `Low Reach (Need ${target})`;
    } else if (selected.length !== playerCount) {
       if (selected.length > playerCount) error = `Too many factions (${selected.length}/${playerCount})`;
       if (selected.length < playerCount) error = `Select more factions (${selected.length}/${playerCount})`;
       valid = selected.length === playerCount && reach >= target && militants >= 1;
    }

    return { totalReach: reach, militantCount: militants, targetReach: target, isValid: valid, errorMsg: error };
  }, [selectedIds, playerCount]);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6 pb-32">
      
      <div className="flex flex-col gap-4 bg-gray-900/50 p-6 rounded-2xl border border-gray-800 backdrop-blur-sm sticky top-4 z-10 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Game Setup</h1>
            <p className="text-gray-400 text-sm">Advanced Setup (AdSet)</p>
          </div>
          
          <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg border border-gray-700">
            <Users className="text-gray-400 w-5 h-5" />
            <select 
              value={playerCount}
              onChange={(e) => setPlayerCount(Number(e.target.value))}
              className="bg-transparent text-white font-bold outline-none cursor-pointer appearance-none pr-2"
            >
              {[2,3,4,5,6].map(n => <option key={n} value={n}>{n} Players</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-2">
            <div className={clsx("p-3 rounded-xl border flex flex-col items-center transition-colors duration-300", 
              totalReach >= targetReach ? "bg-green-950/30 border-green-900/50" : "bg-red-950/30 border-red-900/50")}>
              <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Reach</span>
              <span className={clsx("text-2xl font-mono font-bold mt-1", totalReach >= targetReach ? "text-green-400" : "text-red-400")}>
                {totalReach} <span className="text-gray-600 text-base font-normal">/ {targetReach}</span>
              </span>
            </div>
            <div className={clsx("p-3 rounded-xl border flex flex-col items-center transition-colors duration-300", 
              militantCount >= 1 ? "bg-green-950/30 border-green-900/50" : "bg-red-950/30 border-red-900/50")}>
              <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Militant</span>
              <span className={clsx("text-2xl font-mono font-bold mt-1", militantCount >= 1 ? "text-green-400" : "text-red-400")}>
                {militantCount}
              </span>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {FACTIONS_DATA.map(f => {
          const isSelected = selectedIds.has(f.id);
          return (
            <button
              key={f.id}
              onClick={() => toggleFaction(f.id)}
              className={clsx(
                "relative p-4 rounded-xl text-left transition-all duration-200 border-2 group",
                isSelected 
                  ? `${f.color} border-white/80 shadow-lg scale-[1.01]` 
                  : "border-gray-800 bg-gray-900/40 hover:bg-gray-800 hover:border-gray-700 opacity-70 hover:opacity-100"
              )}
            >
              <div className="flex justify-between items-start mb-3">
                <span className={clsx("font-bold text-base", isSelected ? "text-white" : "text-gray-300")}>
                  {f.name}
                </span>
                <span className={clsx(
                  "px-2 py-0.5 rounded text-xs font-mono font-bold",
                  isSelected ? "bg-black/40 text-white" : "bg-gray-800 text-gray-500"
                )}>{f.reach}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className={clsx(
                  "text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md",
                  f.type === 'militant' ? "bg-red-900/20 text-red-400" : "bg-blue-900/20 text-blue-400"
                )}>
                  {f.type}
                </span>
                {isSelected && <CheckCircle2 className="w-5 h-5 text-white animate-in fade-in zoom-in duration-200" />}
              </div>
            </button>
          )
        })}
      </div>

      <div className={clsx(
        "fixed bottom-0 left-0 right-0 p-4 border-t transition-all duration-300 backdrop-blur-xl z-50 safe-area-pb",
        isValid 
          ? "bg-green-950/80 border-green-800/50 shadow-[0_-4px_20px_rgba(0,255,0,0.1)]" 
          : "bg-gray-950/90 border-gray-800 shadow-lg"
      )}>
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={clsx("p-2 rounded-full", isValid ? "bg-green-500/20" : "bg-red-500/10")}>
              {isValid ? <CheckCircle2 className="text-green-400 w-6 h-6" /> : <ShieldAlert className="text-red-400 w-6 h-6" />}
            </div>
            <div>
              <div className={clsx("font-bold text-lg leading-tight", isValid ? "text-white" : "text-red-400")}>
                {isValid ? "Ready to Start" : "Invalid Setup"}
              </div>
              {!isValid && <div className="text-xs md:text-sm text-red-300/80 font-medium mt-0.5">{errorMsg}</div>}
            </div>
          </div>
          
          {isValid && (
            <button 
              onClick={handleStartGame}
              className="bg-white text-green-950 px-8 py-3 rounded-full font-bold hover:bg-green-50 hover:scale-105 active:scale-95 transition-all shadow-lg"
            >
              Start Game
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
