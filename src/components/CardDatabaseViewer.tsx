"use client";

import React, { useState, useMemo } from 'react';
import { CARDS_DB, DeckType, Suit } from '@/data/cards';
import { Search, X } from 'lucide-react';
import { clsx } from 'clsx';

export function CardDatabaseViewer() {
  const [query, setQuery] = useState('');
  const [deckFilter, setDeckFilter] = useState<DeckType | 'all'>('all');
  const [suitFilter, setSuitFilter] = useState<Suit | 'all'>('all');

  const filtered = useMemo(() => {
    return CARDS_DB.filter(card => {
      // Deck Filter
      if (deckFilter !== 'all' && !card.deck.includes(deckFilter)) return false;
      
      // Suit Filter
      if (suitFilter !== 'all' && card.suit !== suitFilter) return false;

      // Query Filter
      if (query.trim()) {
        const lowerQ = query.toLowerCase();
        return (
          card.name.toLowerCase().includes(lowerQ) ||
          card.effect.toLowerCase().includes(lowerQ) ||
          card.type.toLowerCase().includes(lowerQ)
        );
      }
      return true;
    });
  }, [deckFilter, suitFilter, query]);

  // Sort: Type (Dominance/Ambush first), then Name
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
       if (a.type === 'dominance' && b.type !== 'dominance') return -1;
       if (b.type === 'dominance' && a.type !== 'dominance') return 1;
       return a.name.localeCompare(b.name);
    });
  }, [filtered]);

  const getSuitColor = (suit: Suit) => {
    switch (suit) {
      case 'fox': return 'border-red-500/50 bg-red-950/20 text-red-200';
      case 'mouse': return 'border-orange-500/50 bg-orange-950/20 text-orange-200';
      case 'rabbit': return 'border-yellow-500/50 bg-yellow-950/20 text-yellow-200';
      case 'bird': return 'border-blue-500/50 bg-blue-950/20 text-blue-200';
    }
  };

  const getSuitIcon = (suit: Suit) => {
    // Simple text/emoji for now or colored dot
    switch (suit) {
        case 'fox': return '🦊';
        case 'mouse': return '🐭';
        case 'rabbit': return '🐰';
        case 'bird': return '🐦';
    }
  }

  return (
    <div className="flex flex-col h-full space-y-4">
      
      {/* Filters */}
      <div className="bg-gray-900 border border-gray-800 p-4 rounded-xl flex flex-col md:flex-row gap-4 justify-between items-center">
        
        {/* Search */}
        <div className="relative w-full md:w-64">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
           <input
             type="text"
             placeholder="Search cards..."
             value={query}
             onChange={e => setQuery(e.target.value)}
             className="w-full bg-black/40 border border-gray-700 rounded-lg pl-10 pr-8 py-2 text-sm text-white focus:outline-none focus:border-blue-500/50"
           />
           {query && (
               <button onClick={() => setQuery('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                   <X className="w-3 h-3" />
               </button>
           )}
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
           {/* Deck Toggle */}
           <div className="flex bg-black/40 rounded-lg p-1 border border-gray-700 shrink-0">
              <button 
                onClick={() => setDeckFilter('all')}
                className={clsx("px-3 py-1.5 rounded text-xs font-bold transition-colors", deckFilter === 'all' ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white")}
              >All</button>
              <button 
                onClick={() => setDeckFilter('standard')}
                className={clsx("px-3 py-1.5 rounded text-xs font-bold transition-colors flex items-center gap-1", deckFilter === 'standard' ? "bg-blue-900/60 text-blue-200" : "text-gray-400 hover:text-white")}
              >Standard</button>
              <button 
                onClick={() => setDeckFilter('exiles')}
                className={clsx("px-3 py-1.5 rounded text-xs font-bold transition-colors flex items-center gap-1", deckFilter === 'exiles' ? "bg-orange-900/60 text-orange-200" : "text-gray-400 hover:text-white")}
              >E&P</button>
           </div>

           {/* Suit Filter */}
           <div className="flex bg-black/40 rounded-lg p-1 border border-gray-700 shrink-0">
               {(['all', 'bird', 'fox', 'rabbit', 'mouse'] as const).map(suit => (
                   <button
                     key={suit}
                     onClick={() => setSuitFilter(suit as Suit | 'all')}
                     className={clsx(
                        "px-3 py-1.5 rounded text-xs font-bold transition-colors capitalize", 
                        suitFilter === suit ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white"
                     )}
                   >
                     {suit}
                   </button>
               ))}
           </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto custom-scrollbar pr-2 pb-20">
         {sorted.map((card, idx) => (
             <div key={card.id + idx} className={clsx(
                 "relative p-4 rounded-xl border flex flex-col gap-3 min-h-[180px] transition-all hover:scale-[1.02] hover:shadow-xl",
                 getSuitColor(card.suit)
             )}>
                {/* Header */}
                <div className="flex justify-between items-start">
                    <h4 className="font-bold text-lg leading-tight">{card.name}</h4>
                    <span className="text-xl">{getSuitIcon(card.suit)}</span>
                </div>

                {/* Cost */}
                <div className="flex gap-1">
                    {card.cost.map((c, i) => (
                        <span key={i} className={clsx(
                            "w-4 h-4 rounded-sm flex items-center justify-center text-[10px] uppercase font-bold border border-white/20",
                            c === 'fox' ? "bg-red-600" :
                            c === 'mouse' ? "bg-orange-500" :
                            c === 'rabbit' ? "bg-yellow-500" :
                            c === 'bird' ? "bg-blue-500" : "bg-gray-500"
                        )}>
                            {c === '?' ? '?' : ''}
                        </span>
                    ))}
                    {card.cost.length === 0 && card.type !== 'ambush' && card.type !== 'dominance' && (
                        <span className="text-xs text-white/50 italic">Free</span>
                    )}
                </div>

                {/* Effect */}
                <div className="flex-1">
                    <p className="text-sm leading-snug opacity-90">{card.effect}</p>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center border-t border-white/10 pt-2 mt-auto">
                    <div className="flex gap-2">
                        {card.deck.map(d => (
                            <span key={d} className={clsx(
                                "text-[10px] px-1.5 py-0.5 rounded uppercase font-bold tracking-wider",
                                d === 'standard' ? "bg-blue-900/40 text-blue-200" : "bg-orange-900/40 text-orange-200"
                            )}>
                                {d === 'standard' ? 'Std' : 'E&P'}
                            </span>
                        ))}
                    </div>
                    {card.vp && (
                        <span className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded text-white">
                            {card.vp} VP
                        </span>
                    )}
                    {card.type === 'ambush' && <span className="text-xs font-bold text-red-300">AMBUSH</span>}
                </div>
             </div>
         ))}
         {sorted.length === 0 && (
             <div className="col-span-full text-center py-20 text-gray-500">
                 No cards found matching your filters.
             </div>
         )}
      </div>
    </div>
  );
}
