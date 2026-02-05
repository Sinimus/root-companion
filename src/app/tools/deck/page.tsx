"use client";
import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, Layers, Zap, Star, Database, Scale } from 'lucide-react';
import { DECK_INFO } from '@/data/general_rules';
import { CardDatabaseViewer } from '@/components/CardDatabaseViewer';
import { clsx } from 'clsx';

export default function DeckPage() {
  const [activeTab, setActiveTab] = useState<'compare' | 'database'>('compare');

  return (
    <div className="min-h-screen bg-[#0a0c10] pb-20 pt-6 relative flex flex-col">
      {/* Navigation */}
      <div className="px-4 md:px-6 py-4 flex flex-col md:flex-row items-center justify-between sticky top-0 z-40 bg-[#0a0c10]/95 backdrop-blur border-b border-gray-800 gap-4 md:gap-0">
          <div className="w-full md:w-auto flex justify-start">
            <Link href="/" className="text-gray-500 hover:text-white flex items-center gap-2 transition-colors font-medium">
                <ArrowLeft className="w-5 h-5" /> Menu
            </Link>
          </div>
          
          {/* Main Tab Navigation */}
          <div className="flex bg-gray-900 p-1.5 rounded-xl border border-gray-800 w-full md:w-auto">
             <button 
               onClick={() => setActiveTab('compare')}
               className={clsx(
                 "flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300",
                 activeTab === 'compare' 
                    ? "bg-purple-900/80 text-white shadow-lg shadow-purple-900/20 ring-1 ring-purple-500/50" 
                    : "text-gray-400 hover:text-gray-200 hover:bg-gray-800"
               )}
             >
               <Scale className="w-4 h-4" />
               Comparison
             </button>
             <button 
               onClick={() => setActiveTab('database')}
               className={clsx(
                 "flex-1 md:flex-none px-6 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300",
                 activeTab === 'database' 
                    ? "bg-blue-900/80 text-white shadow-lg shadow-blue-900/20 ring-1 ring-blue-500/50" 
                    : "text-gray-400 hover:text-gray-200 hover:bg-gray-800"
               )}
             >
               <Database className="w-4 h-4" />
               Card Database
             </button>
          </div>

          <div className="hidden md:block w-24"></div> {/* Spacer */}
      </div>

      <div className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full">
         
         {activeTab === 'compare' && (
             <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300 max-w-4xl mx-auto">
                 <div className="text-center">
                    <h1 className="text-3xl font-black text-white mb-2">Deck Comparison</h1>
                    <p className="text-gray-500">Overview of Standard vs. Exiles & Partisans</p>
                 </div>

                 <div className="grid md:grid-cols-2 gap-6">
                    {/* Standard */}
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-blue-500/30 transition-colors">
                       <div className="flex items-center gap-2 mb-4">
                          <Layers className="w-5 h-5 text-blue-500" />
                          <h2 className="text-xl font-bold text-white">Standard Deck</h2>
                       </div>
                       <p className="text-gray-400 text-sm mb-4">{DECK_INFO.standard.desc}</p>

                       <div className="space-y-4">
                          <div className="bg-blue-900/20 p-3 rounded-lg border border-blue-800/50">
                             <h3 className="font-bold text-blue-300 text-sm mb-1 flex items-center gap-2">
                               <Star className="w-4 h-4" />
                               Favor of the [Suit]
                             </h3>
                             <p className="text-xs text-gray-400">Removes ALL enemy pieces (warriors, buildings, tokens) from clearings of the matching suit.</p>
                          </div>

                          <div className="space-y-2">
                             <h4 className="font-bold text-white text-sm">Key Features:</h4>
                             <ul className="space-y-1 text-sm text-gray-300">
                                <li>• <strong>Ambush:</strong> 5 cards (1/suit + 2 birds)</li>
                                <li>• <strong>Dominance:</strong> 4 cards</li>
                                <li>• <strong>Item Crafting:</strong> Focus on VP generation</li>
                                <li>• <strong>Stand and Deliver:</strong> Card draw mechanics</li>
                             </ul>
                          </div>
                       </div>
                    </div>

                    {/* Exiles */}
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-orange-500/30 transition-colors">
                       <div className="flex items-center gap-2 mb-4">
                          <Zap className="w-5 h-5 text-orange-500" />
                          <h2 className="text-xl font-bold text-white">Exiles & Partisans</h2>
                       </div>
                       <p className="text-gray-400 text-sm mb-4">{DECK_INFO.exiles.desc}</p>

                       <div className="space-y-4">
                          <div className="bg-orange-900/20 p-3 rounded-lg border border-orange-800/50">
                             <h3 className="font-bold text-orange-300 text-sm mb-1 flex items-center gap-2">
                               <Zap className="w-4 h-4" />
                               Partisan Cards
                             </h3>
                             <p className="text-xs text-gray-400">Deal extra hits in battle but require discarding matching cards from hand.</p>
                          </div>

                          <div className="bg-gray-800 p-3 rounded-lg">
                             <h4 className="font-bold text-white text-sm mb-2">Key Cards:</h4>
                             <ul className="space-y-1 text-xs text-gray-400">
                                <li>• <strong>Coffin Makers:</strong> Score points when warriors die</li>
                                <li>• <strong>Corvid Planners:</strong> Move without ruling clearings</li>
                                <li>• <strong>False Orders:</strong> Force enemy warrior movement</li>
                                <li>• <strong>Saboteurs:</strong> Discard enemy crafted cards</li>
                             </ul>
                          </div>
                       </div>
                    </div>
                 </div>
             </div>
         )}

         {activeTab === 'database' && (
             <div className="h-[calc(100vh-140px)] animate-in fade-in slide-in-from-bottom-4 duration-300">
                 <CardDatabaseViewer />
             </div>
         )}
      </div>
    </div>
  );
}
