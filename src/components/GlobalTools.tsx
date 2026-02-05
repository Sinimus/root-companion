"use client";

import React, { useState, useEffect } from 'react';
import { Swords, Book, ScrollText, X, Settings2 } from 'lucide-react';
import { BattleWizard } from '@/components/BattleWizard';
import { GlossaryModal } from '@/components/GlossaryModal';
import { LawViewerModal } from '@/components/LawViewerModal';
import { clsx } from 'clsx';
import { LAW_EVENT_NAME } from '@/utils/events';

export function GlobalTools() {
  const [activeTool, setActiveTool] = useState<'battle' | 'glossary' | 'law' | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [lawQuery, setLawQuery] = useState('');

  useEffect(() => {
    const handleOpenLaw = (e: any) => {
      setLawQuery(e.detail?.ruleId || '');
      setActiveTool('law');
    };

    window.addEventListener(LAW_EVENT_NAME, handleOpenLaw);
    return () => window.removeEventListener(LAW_EVENT_NAME, handleOpenLaw);
  }, []);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[90] flex flex-col items-end gap-3">
        
        {/* Expanded Menu */}
        <div className={clsx(
            "flex flex-col gap-3 transition-all duration-300 origin-bottom",
            isExpanded ? "scale-100 opacity-100 translate-y-0" : "scale-0 opacity-0 translate-y-10 pointer-events-none"
        )}>
            {/* Law of Root Button */}
            <button
                onClick={() => { setActiveTool('law'); setIsExpanded(false); }}
                className="w-12 h-12 bg-gray-800 hover:bg-gray-700 text-amber-500 rounded-full shadow-lg flex items-center justify-center border border-gray-700 backdrop-blur-sm group"
                title="The Law of Root"
            >
                <ScrollText className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>

            {/* Glossary Tool Button */}
            <button
                onClick={() => { setActiveTool('glossary'); setIsExpanded(false); }}
                className="w-12 h-12 bg-gray-800 hover:bg-gray-700 text-blue-400 rounded-full shadow-lg flex items-center justify-center border border-gray-700 backdrop-blur-sm group"
                title="Glossary Reference"
            >
                <Book className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>

            {/* Battle Tool Button */}
            <button
                onClick={() => { setActiveTool('battle'); setIsExpanded(false); }}
                className="w-12 h-12 bg-red-900/80 hover:bg-red-800 text-white rounded-full shadow-lg flex items-center justify-center border border-red-700/50 backdrop-blur-sm group"
                title="Quick Battle"
            >
                <Swords className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </button>
        </div>

        {/* Main Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={clsx(
            "w-14 h-14 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center border-2 backdrop-blur-md group",
            isExpanded 
                ? "bg-gray-800 border-gray-600 text-white rotate-90" 
                : "bg-gradient-to-br from-orange-600 to-orange-800 border-orange-400/30 text-white"
          )}
          aria-label="Toggle Tools"
        >
          {isExpanded ? <X className="w-6 h-6" /> : <Settings2 className="w-6 h-6 group-hover:rotate-45 transition-transform" />}
        </button>
      </div>

      {activeTool === 'battle' && (
        <BattleWizard onClose={() => setActiveTool(null)} />
      )}

      {activeTool === 'glossary' && (
        <GlossaryModal onClose={() => setActiveTool(null)} />
      )}

      {activeTool === 'law' && (
        <LawViewerModal 
            initialQuery={lawQuery}
            onClose={() => { setActiveTool(null); setLawQuery(''); }} 
        />
      )}
    </>
  );
}