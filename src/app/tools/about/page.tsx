"use client";

import React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  PlayCircle,
  Users,
  Swords,
  Shuffle,
  Target,
  Sparkles,
  MapPin,
  Github
} from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0a0c10] p-4 pb-20 pt-20">
      <div className="absolute top-6 left-6 z-40">
        <Link href="/" className="text-gray-500 hover:text-white flex items-center gap-2 transition-colors font-medium">
          <ArrowLeft className="w-5 h-5" /> Back to Menu
        </Link>
      </div>

      <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-500">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
             <Sparkles className="w-8 h-8 text-orange-400" />
             <h1 className="text-4xl font-black text-white">Root Companion App</h1>
             <Sparkles className="w-8 h-8 text-orange-400" />
          </div>
          <p className="text-xl text-gray-400">Tactical Field Assistant</p>
          <div className="inline-flex items-center gap-2 bg-gray-900 border border-gray-800 rounded-full px-4 py-1 text-sm text-gray-400">
            <span>Version 1.0.0</span>
            <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
            <span>Digital Law Updated Sept 2024</span>
          </div>
        </div>

        {/* --- GUIDE SECTION --- */}
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white border-b border-gray-800 pb-2">App Guide</h2>

            {/* Game Setup Section */}
            <div className="bg-gradient-to-r from-green-900/20 to-green-800/10 border border-green-800/50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
                <PlayCircle className="w-6 h-6" />
                Game Setup Tools
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                            <Shuffle className="w-4 h-4 text-purple-400" /> AdSet Draft
                        </h4>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Advanced setup variant from Law of Root. Handles reverse-order drafting, militant pool management, and automatic faction assignment. Best for experienced players.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                            <Target className="w-4 h-4 text-blue-400" /> Reach Calculator
                        </h4>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Traditional faction selection based on reach values. Ensures game balance by calculating total reach against the recommended target for your player count.
                        </p>
                    </div>
                </div>
            </div>

            {/* Battle Sim Section */}
            <div className="bg-gradient-to-r from-red-900/20 to-red-800/10 border border-red-800/50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
                <Swords className="w-6 h-6" />
                Battle Simulator 5.0
                </h3>
                <div className="space-y-4">
                                    <p className="text-sm text-gray-300">
                                        Advanced calculator that knows the rules so you don&apos;t have to. Select attacker and defender, and the app automatically applies:
                                    </p>                    <ul className="grid md:grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-400">
                        <li className="flex items-center gap-2">• <span className="text-green-400">Guerrilla War</span> (Alliance takes higher roll)</li>
                        <li className="flex items-center gap-2">• <span className="text-gray-300">Vagabond Cap</span> (Hits limited by swords)</li>
                        <li className="flex items-center gap-2">• <span className="text-purple-400">Corvid Plots</span> (+1 hit if plot hidden)</li>
                        <li className="flex items-center gap-2">• <span className="text-blue-400">Keepers Armor</span> (Ignore first hit with Relic)</li>
                        <li className="flex items-center gap-2">• <span className="text-red-400">Warlord Wrath</span> (+1 hit when attacking)</li>
                        <li className="flex items-center gap-2">• <span className="text-blue-300">Eyrie Commander</span> (+1 hit attacking)</li>
                    </ul>
                    <div className="pt-2 border-t border-red-900/30 mt-2">
                        <p className="text-xs text-gray-500">Also supports Advanced Cards: <span className="text-gray-300">Armorers, Sappers, Brutal Tactics, Command Warren</span>.</p>
                    </div>
                </div>
            </div>

            {/* Hirelings & Landmarks */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
                    <h3 className="font-bold text-purple-400 mb-3 flex items-center gap-2">
                        <Users className="w-5 h-5" /> Hirelings Manager
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li>• <strong>Flip States:</strong> Toggle between Promoted (Active) and Demoted (Passive) sides.</li>
                        <li>• <strong>Control Markers:</strong> Track decay automatically.</li>
                        <li>• <strong>Global Decay:</strong> Remove markers from all active hirelings at end of turn with one click.</li>
                    </ul>
                </div>
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
                    <h3 className="font-bold text-amber-400 mb-3 flex items-center gap-2">
                        <MapPin className="w-5 h-5" /> Landmarks
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li>• <strong>Setup:</strong> Randomizer for fair setup (1-2 landmarks).</li>
                        <li>• <strong>Black Market:</strong> Track face-down cards and reveal them.</li>
                        <li>• <strong>Legendary Forge:</strong> Track crafted items separately.</li>
                    </ul>
                </div>
            </div>
        </div>

        {/* --- CREDITS & LICENSE (Footer Content) --- */}
        <div className="border-t border-gray-800 pt-12 text-center space-y-8">
            
            <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">About the Project</h3>
                <p className="text-gray-400 text-sm max-w-2xl mx-auto leading-relaxed">
                    This is an unofficial companion app for <strong>Root: The Woodland Game</strong> by Leder Games.
                    It is designed to streamline gameplay, automate complex calculations, and provide quick access to rules
                    without replacing the physical board game experience.
                </p>
                <p className="text-gray-500 text-xs">
                    All game mechanics, terminology, artwork concepts, and intellectual property belong to Leder Games.
                    This application is not affiliated with or endorsed by Leder Games.
                </p>
            </div>

            <div className="flex justify-center gap-6">
                <a href="https://github.com/Sinimus/root-companion" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                    <Github className="w-5 h-5" />
                    <span>Source Code</span>
                </a>
            </div>

            <div className="text-xs text-gray-600 font-mono">
                <p>Created by Sinimus</p>
                <p>Licensed under GNU AGPLv3</p>
                <p className="mt-4">Built with Next.js 14 • Tailwind CSS • Lucide Icons</p>
            </div>
        </div>

      </div>
    </main>
  );
}
