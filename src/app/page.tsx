"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Layers, RotateCcw, PlayCircle, Sparkles, Gamepad2, Shield, MapPin, Info, Scale, Swords, Users, Trophy, XCircle } from 'lucide-react';
import { IGameSession } from '@/types/engine';
import { FACTIONS_DATA } from '@/data/factions';
import { HIRELINGS_DATA } from '@/data/hirelings';
import { LANDMARKS_DATA } from '@/data/landmarks';
import { clsx } from 'clsx';

export default function Home() {
  const [activeSession, setActiveSession] = useState<IGameSession | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('root_active_session');
    if (saved) {
      try {
        setActiveSession(JSON.parse(saved));
      } catch {
        // Ignore error
      }
    }
  }, []);

  const clearData = () => {
    if (confirm("This will erase all saved progress and settings. Continue?")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const endSession = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm("End current game session? This will clear the active factions list.")) {
      localStorage.removeItem('root_active_session');
      setActiveSession(null);
    }
  };

  return (
    <main className="bg-[#0a0c10] text-white p-6 max-w-6xl mx-auto min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="py-8 space-y-4 text-center mb-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Sparkles className="w-8 h-8 text-orange-400" />
          <h1 className="text-7xl font-black tracking-tighter bg-gradient-to-br from-white via-gray-200 to-gray-600 bg-clip-text text-transparent">
            ROOT
          </h1>
          <Sparkles className="w-8 h-8 text-orange-400" />
        </div>
        <h2 className="text-2xl font-light text-gray-400">Tactical Field Assistant v1.0.0</h2>
        <p className="text-gray-500 text-sm max-w-md mx-auto">Your comprehensive companion for mastering the woodland realms of Root</p>
      </div>

      {/* Active Game Dashboard */}
      {activeSession && (
        <div className="mb-12 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="bg-gradient-to-br from-indigo-900/40 to-blue-900/20 border border-indigo-500/30 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
               <button 
                 onClick={endSession}
                 className="text-indigo-400 hover:text-red-400 transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-widest bg-black/20 px-3 py-1.5 rounded-full border border-indigo-500/20"
               >
                 <XCircle className="w-4 h-4" /> End Session
               </button>
            </div>
            
            <div className="flex items-center gap-4 mb-8">
               <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center border border-indigo-500/40">
                  <Trophy className="w-6 h-6 text-indigo-400" />
               </div>
               <div>
                  <h3 className="text-2xl font-black text-white tracking-tight uppercase">Live Game</h3>
                  <p className="text-indigo-300/60 text-sm font-medium">Quick access to active factions</p>
               </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
               {activeSession.activeFactionIds.map((fid, idx) => {
                 const faction = FACTIONS_DATA.find(f => f.id === fid);
                 if (!faction) return null;
                 return (
                   <Link 
                     key={fid} 
                     href={`/play/${fid}`}
                     className={clsx(
                       "group p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg relative overflow-hidden",
                       faction.color || "border-gray-800 bg-gray-900/40"
                     )}
                   >
                     <div className="absolute -right-2 -top-2 w-8 h-8 bg-black/40 rounded-full flex items-center justify-center border border-white/10 group-hover:bg-white/20 transition-colors">
                        <span className="text-[10px] font-black text-white/60">{idx + 1}</span>
                     </div>
                     <p className="text-[10px] font-black uppercase text-white/40 mb-1 tracking-widest group-hover:text-white/60 transition-colors">Turn {idx + 1}</p>
                     <p className="font-bold text-white text-sm md:text-base leading-tight">{faction.shortName}</p>
                     <div className="mt-3 flex justify-end">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                           <Shield className="w-4 h-4 text-white/80" />
                        </div>
                     </div>
                   </Link>
                 )
               })}
            </div>

            {/* Extras Section */}
            {(activeSession.hirelings?.length || 0) > 0 || (activeSession.landmarks?.length || 0) > 0 ? (
               <div className="mt-8 pt-6 border-t border-indigo-500/20 grid md:grid-cols-2 gap-8">
                  {/* Active Hirelings */}
                  {activeSession.hirelings && activeSession.hirelings.length > 0 && (
                    <div className="space-y-3">
                       <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 flex items-center gap-2">
                          <Users className="w-3 h-3" /> Hirelings
                       </h4>
                       <div className="flex flex-wrap gap-2">
                          {activeSession.hirelings.map(hid => {
                             const h = HIRELINGS_DATA.find(item => item.id === hid);
                             return (
                               <Link key={hid} href="/tools/hirelings" className="bg-purple-900/20 border border-purple-500/20 px-3 py-1.5 rounded-xl text-xs font-bold text-purple-200 hover:bg-purple-900/40 transition-colors">
                                  {h?.name}
                               </Link>
                             )
                          })}
                       </div>
                    </div>
                  )}

                  {/* Active Landmarks */}
                  {activeSession.landmarks && activeSession.landmarks.length > 0 && (
                    <div className="space-y-3">
                       <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-400 flex items-center gap-2">
                          <MapPin className="w-3 h-3" /> Landmarks
                       </h4>
                       <div className="flex flex-wrap gap-2">
                          {activeSession.landmarks.map(lid => {
                             const l = LANDMARKS_DATA.find(item => item.id === lid);
                             return (
                               <Link key={lid} href="/tools/landmarks" className="bg-amber-900/20 border border-amber-500/20 px-3 py-1.5 rounded-xl text-xs font-bold text-amber-200 hover:bg-amber-900/40 transition-colors">
                                  {l?.name}
                               </Link>
                             )
                          })}
                       </div>
                    </div>
                  )}
               </div>
            ) : null}
          </div>
        </div>
      )}

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12 flex-1">

        {/* Large: Game Setup */}
        <div className="md:col-span-2 lg:col-span-2">
          <Link href="/setup" className="block h-full bg-gradient-to-br from-orange-600/20 to-orange-800/10 backdrop-blur border border-orange-500/20 hover:border-orange-400/40 rounded-2xl p-8 transition-all duration-300 group relative overflow-hidden">
            <div className="absolute top-6 right-6 w-20 h-20 bg-orange-500/10 rounded-full flex items-center justify-center">
              <PlayCircle className="w-10 h-10 text-orange-400 group-hover:text-orange-300 transition-colors" />
            </div>
            <div className="relative z-10 pr-20">
              <div className="flex items-center gap-3 mb-3">
                <Gamepad2 className="w-6 h-6 text-orange-400" />
                <span className="text-xs font-bold text-orange-300 uppercase tracking-wider">Main Action</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-2 group-hover:scale-105 transition-transform">Game Setup</h3>
              <p className="text-orange-200/70 text-lg">Unified wizard for AdSet Draft, Reach Calc, and Map Setup</p>
            </div>
          </Link>
        </div>

        {/* Large: Faction Guides */}
        <div className="md:col-span-1 lg:col-span-2">
          <Link href="/play" className="block h-full bg-gradient-to-br from-blue-600/20 to-blue-800/10 backdrop-blur border border-blue-500/20 hover:border-blue-400/40 rounded-2xl p-8 transition-all duration-300 group relative overflow-hidden">
            <div className="absolute top-6 right-6 w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center">
              <BookOpen className="w-10 h-10 text-blue-400 group-hover:text-blue-300 transition-colors" />
            </div>
            <div className="relative z-10 pr-20">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="w-6 h-6 text-blue-400" />
                <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">Learning Hub</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-2 group-hover:scale-105 transition-transform">Faction Guides</h3>
              <p className="text-blue-200/70 text-lg">Master every faction with detailed strategy walkthroughs</p>
            </div>
          </Link>
        </div>

        {/* Tools: Battle Sim */}
        <Link href="/tools/battle" className="bg-gray-900/40 backdrop-blur border border-white/5 hover:border-red-500/30 hover:bg-red-900/10 rounded-2xl p-6 transition-all duration-300 group relative overflow-hidden">
          <div className="absolute top-4 right-4 w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center">
            <Swords className="w-6 h-6 text-red-400 group-hover:text-red-300 transition-colors" />
          </div>
          <div className="relative z-10 pr-8">
            <h4 className="text-xl font-bold text-white mb-1 group-hover:scale-105 transition-transform">Battle Sim</h4>
            <p className="text-gray-400 text-sm">Combat calculator</p>
          </div>
        </Link>

        {/* Tools: Rules & Glossary */}
        <Link href="/tools/rules" className="bg-gray-900/40 backdrop-blur border border-white/5 hover:border-amber-500/30 hover:bg-amber-900/10 rounded-2xl p-6 transition-all duration-300 group relative overflow-hidden">
          <div className="absolute top-4 right-4 w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center">
            <Scale className="w-6 h-6 text-amber-400 group-hover:text-amber-300 transition-colors" />
          </div>
          <div className="relative z-10 pr-8">
            <h4 className="text-xl font-bold text-white mb-1 group-hover:scale-105 transition-transform">Rules</h4>
            <p className="text-gray-400 text-sm">Law & Glossary</p>
          </div>
        </Link>

        {/* Tools: Decks */}
        <Link href="/tools/deck" className="bg-gray-900/40 backdrop-blur border border-white/5 hover:border-white/10 rounded-2xl p-6 transition-all duration-300 group relative overflow-hidden">
          <div className="absolute top-4 right-4 w-12 h-12 bg-purple-400/10 rounded-full flex items-center justify-center">
            <Layers className="w-6 h-6 text-purple-400 group-hover:text-purple-300 transition-colors" />
          </div>
          <div className="relative z-10 pr-8">
            <h4 className="text-xl font-bold text-white mb-1 group-hover:scale-105 transition-transform">Decks</h4>
            <p className="text-gray-400 text-sm">Card Reference</p>
          </div>
        </Link>

        {/* Tools: Hirelings */}
        <Link href="/tools/hirelings" className="bg-gray-900/40 backdrop-blur border border-white/5 hover:border-white/10 rounded-2xl p-6 transition-all duration-300 group relative overflow-hidden">
          <div className="absolute top-4 right-4 w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center">
            <Users className="w-6 h-6 text-purple-400 group-hover:text-purple-300 transition-colors" />
          </div>
          <div className="relative z-10 pr-8">
            <h4 className="text-xl font-bold text-white mb-1 group-hover:scale-105 transition-transform">Hirelings</h4>
            <p className="text-gray-400 text-sm">Allies & markers</p>
          </div>
        </Link>

        {/* Tools: Landmarks */}
        <Link href="/tools/landmarks" className="bg-gray-900/40 backdrop-blur border border-white/5 hover:border-white/10 rounded-2xl p-6 transition-all duration-300 group relative overflow-hidden">
          <div className="absolute top-4 right-4 w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center">
            <MapPin className="w-6 h-6 text-amber-400 group-hover:text-amber-300 transition-colors" />
          </div>
          <div className="relative z-10 pr-8">
            <h4 className="text-xl font-bold text-white mb-1 group-hover:scale-105 transition-transform">Landmarks</h4>
            <p className="text-gray-400 text-sm">Marauder setup</p>
          </div>
        </Link>

        {/* About / Info */}
        <Link href="/tools/about" className="bg-gray-900/40 backdrop-blur border border-white/5 hover:border-white/10 rounded-2xl p-6 transition-all duration-300 group relative overflow-hidden">
          <div className="absolute top-4 right-4 w-12 h-12 bg-gray-500/10 rounded-full flex items-center justify-center">
            <Info className="w-6 h-6 text-gray-400 group-hover:text-gray-300 transition-colors" />
          </div>
          <div className="relative z-10 pr-8">
            <h4 className="text-xl font-bold text-white mb-1 group-hover:scale-105 transition-transform">About</h4>
            <p className="text-gray-400 text-sm">Guide & Credits</p>
          </div>
        </Link>

        {/* Settings: Reset */}
        <button
          onClick={clearData}
          className="bg-gray-900/40 backdrop-blur border border-white/5 hover:border-red-500/20 hover:bg-red-900/20 rounded-2xl p-6 transition-all duration-300 group relative overflow-hidden text-left"
        >
          <div className="absolute top-4 right-4 w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center">
            <RotateCcw className="w-6 h-6 text-red-400 group-hover:text-red-300 transition-colors" />
          </div>
          <div className="relative z-10 pr-8">
            <h4 className="text-xl font-bold text-white mb-1 group-hover:scale-105 transition-transform">Reset</h4>
            <p className="text-gray-400 text-sm">Clear data</p>
          </div>
        </button>

      </div>
    </main>
  );
}