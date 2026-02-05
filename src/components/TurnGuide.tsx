/**
 * @author Sinimus <sinimus@noreply>
 * @license AGPL-3.0
 * @description Part of Root Companion App
 */

"use client";

import React, { useState, useEffect } from 'react';
import { IFactionGuide, ITurnPhase } from '@/types/engine';
import { AlertTriangle, Check, ChevronRight, Book, X, MapPin, Info, Lightbulb } from 'lucide-react';
import { clsx } from 'clsx';
import Link from 'next/link';
import { RULES_DB } from '@/data/rules_db';
import { LAW_SNIPPETS } from '@/data/law_snippets';
import { openLaw } from '@/utils/events';

interface Props {
  guide: IFactionGuide;
}

export function TurnGuide({ guide }: Props) {
  // Inject Setup as Phase 0
  const setupPhase: ITurnPhase = {
    id: 'birdsong', // technically pre-birdsong
    title: 'Setup',
    color: 'border-gray-500 bg-gray-900',
    steps: guide.setup.map((text, i) => ({
      id: `setup-${i}`,
      title: `Step ${i + 1}`,
      description: text,
      required: true
    }))
  };

  const allPhases = [setupPhase, ...guide.phases];

  const [activePhaseIdx, setActivePhaseIdx] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [activeModal, setActiveModal] = useState<{title: string, text: string} | null>(null);
  const [showSetupInfo, setShowSetupInfo] = useState(false);
  const [showStrategy, setShowStrategy] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load state from local storage
  useEffect(() => {
    const savedPhase = localStorage.getItem(`root_phase_${guide.factionId}`);
    const savedSteps = localStorage.getItem(`root_steps_${guide.factionId}`);

    if (savedPhase) setActivePhaseIdx(parseInt(savedPhase));
    if (savedSteps) setCompletedSteps(new Set(JSON.parse(savedSteps)));
    setIsLoaded(true);
  }, [guide.factionId]);

  // Save state on change
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem(`root_phase_${guide.factionId}`, activePhaseIdx.toString());
    localStorage.setItem(`root_steps_${guide.factionId}`, JSON.stringify(Array.from(completedSteps)));
  }, [activePhaseIdx, completedSteps, guide.factionId, isLoaded]);

  const activePhase = allPhases[activePhaseIdx];
  const isLastPhase = activePhaseIdx === allPhases.length - 1;

  const toggleStep = (stepId: string) => {
    const newSet = new Set(completedSteps);
    if (newSet.has(stepId)) newSet.delete(stepId);
    else newSet.add(stepId);
    setCompletedSteps(newSet);
  };

  // --- Keyword & Rule Linker ---
  const renderDescription = (text: string) => {
    // Splits by Keywords OR Rule Numbers (e.g. 7.4.1 or 7.4)
    // Rule regex: looks for digit.digit(.digit optional)
    const parts = text.split(/(\b(?:March|Recruit|Battle|Move|Craft|Turmoil|Revolt|Organize|Aid|Explore|Strike|Commit|Dividends|Crusade|Convert|Sway|Dig|Trick|Flip|Raze|Incite|Delve|Recover|Overwork|Build|Sanctify|Rituals|Parliament|Plot|Quest|Repair|Retinue|Mood|Oppress|Spread|Ambush|Favor|Partisans|Decree|Dominance|Rule|Services)\b)|(\b\d+\.\d+(?:\.\d+)?\b)/gi);

    return parts.map((part, i) => {
      if (!part) return null;
      
      const key = part.toLowerCase();
      
      // Check for Keyword (Glossary)
      if (LAW_SNIPPETS[key]) {
        return (
          <span
            key={i}
            onClick={(e) => { e.stopPropagation(); setActiveModal(LAW_SNIPPETS[key]); }}
            className="text-blue-400 font-bold cursor-help hover:underline decoration-dotted underline-offset-4"
          >
            {part}
          </span>
        );
      }

      // Check for Rule Number (Law)
      if (/^\d+\.\d+(?:\.\d+)?$/.test(part)) {
         return (
            <span
              key={i}
              onClick={(e) => { e.stopPropagation(); openLaw(part); }}
              className="text-amber-500 font-mono font-bold cursor-pointer hover:bg-amber-900/30 rounded px-1 -mx-1 transition-colors"
            >
              {part}
            </span>
         );
      }

      return part;
    });
  };

  const nextPhase = () => {
    if (!isLastPhase) {
      setActivePhaseIdx(p => p + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  
  if (!isLoaded) return null;

  return (
    <div className="max-w-2xl mx-auto pb-32 relative">
      {/* Generic Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm animate-in fade-in">
          <div className="bg-gray-900 border border-gray-600 p-6 rounded-xl shadow-2xl max-w-sm w-full relative">
            <button onClick={() => setActiveModal(null)} className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white"><X className="w-5 h-5"/></button>
            <h4 className="text-blue-400 font-bold text-lg mb-3 uppercase tracking-wide flex items-center gap-2">
                <Info className="w-5 h-5" /> {activeModal.title}
            </h4>
            <p className="text-gray-200 leading-relaxed text-lg">{activeModal.text}</p>
          </div>
        </div>
      )}

      {/* Setup Modal */}
      {showSetupInfo && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm animate-in fade-in">
          <div className="bg-gray-900 border border-gray-600 p-6 rounded-xl shadow-2xl max-w-md w-full relative max-h-[80vh] overflow-y-auto">
            <button onClick={() => setShowSetupInfo(false)} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white"><X className="w-5 h-5"/></button>
            <h4 className="text-emerald-400 font-bold text-lg mb-4 uppercase tracking-wide flex items-center gap-2">
                <MapPin className="w-5 h-5" /> Faction Setup
            </h4>
            <div className="space-y-3 text-gray-200">
              {guide.setup.map((step, i) => (
                <div key={i} className="bg-black/30 p-3 rounded border border-white/5 text-sm">
                  {step}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Strategy Modal */}
      {showStrategy && guide.strategy && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm animate-in fade-in">
          <div className="bg-gray-900 border border-yellow-600/50 p-6 rounded-xl shadow-2xl max-w-md w-full relative max-h-[80vh] overflow-y-auto">
            <button onClick={() => setShowStrategy(false)} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white"><X className="w-5 h-5"/></button>
            <h4 className="text-yellow-400 font-bold text-lg mb-2 uppercase tracking-wide flex items-center gap-2">
                <Lightbulb className="w-5 h-5" /> Strategic Tips
            </h4>
            <p className="text-gray-400 text-sm mb-4 italic">{guide.strategy.summary}</p>
            <div className="space-y-4">
              {guide.strategy.tips.map((tip, i) => (
                <div key={i}>
                  <h5 className="text-white font-bold text-sm mb-1">{tip.title}</h5>
                  <p className="text-gray-300 text-sm leading-relaxed">{tip.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Top Bar Controls */}
      <div className="grid grid-cols-2 gap-2 px-4 py-2 mb-2">
         <button onClick={() => setShowSetupInfo(true)} className="text-xs font-bold text-gray-500 hover:text-white flex items-center justify-center gap-1 uppercase tracking-wider bg-gray-900/50 p-2 rounded">
            <MapPin className="w-3 h-3" /> Setup
         </button>
         {guide.strategy && (
           <button onClick={() => setShowStrategy(true)} className="text-xs font-bold text-yellow-600 hover:text-yellow-400 flex items-center justify-center gap-1 uppercase tracking-wider bg-gray-900/50 p-2 rounded">
              <Lightbulb className="w-3 h-3" /> Strategy
           </button>
         )}
      </div>

      <div className={clsx("sticky top-0 z-20 backdrop-blur-xl border-b p-4 mb-6 transition-colors duration-300 shadow-lg", activePhase.color ? activePhase.color.replace('border-', 'bg-').replace('500', '900/90') : 'bg-gray-900', activePhase.color)}>
        <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold text-white tracking-tight">{activePhase.title}</h2>
            <span className="text-xs font-mono opacity-60 uppercase">Phase {activePhaseIdx + 1}/{allPhases.length}</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
           {allPhases.map((p, i) => (
             <button
               key={i}
               onClick={() => setActivePhaseIdx(i)}
               className={clsx(
                 "px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all duration-300 cursor-pointer",
                 i === activePhaseIdx
                   ? `${p.color.replace('border-', 'bg-').replace('500', '600')} text-white shadow-lg`
                   : i < activePhaseIdx
                     ? "bg-white/20 text-white/60"
                     : "bg-gray-800 text-gray-400 hover:bg-gray-700"
               )}
             >
               {p.title}
             </button>
           ))}
        </div>
      </div>

      <div className="px-4 space-y-5">
        {activePhase.steps.map(step => {
          const isDone = completedSteps.has(step.id);
          return (
            <div key={step.id} className={clsx("relative p-5 rounded-xl border-2 transition-all duration-200 group", isDone ? "bg-green-900/10 border-green-900/30 opacity-60" : "bg-gray-900/60 border-gray-800")}>
              <div className="flex items-start gap-4">
                <div onClick={() => toggleStep(step.id)} className={clsx("mt-1 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 shrink-0 cursor-pointer", isDone ? "bg-green-500 border-green-500" : "border-gray-600 group-hover:border-gray-400")}>
                  {isDone && <Check className="w-4 h-4 text-black stroke-[4]" />}
                </div>
                <div className="space-y-3 flex-1">
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                        <h3 onClick={() => toggleStep(step.id)} className={clsx("font-bold text-lg leading-snug cursor-pointer", isDone ? "text-green-100/50 line-through" : "text-white")}>{step.title}</h3>
                        {step.ruleReference && (
                            <button 
                              onClick={(e) => { e.stopPropagation(); openLaw(step.ruleReference); }} 
                              className="text-xs text-blue-400 font-mono bg-blue-900/30 px-2 py-0.5 rounded border border-blue-800 hover:bg-blue-800 transition-colors"
                            >
                              §{step.ruleReference}
                            </button>
                        )}
                    </div>
                  </div>
                  {/* Description with smart links */}
                  <div onClick={() => toggleStep(step.id)} className={clsx("text-sm leading-relaxed cursor-pointer", isDone ? "text-gray-500" : "text-gray-300")}>
                    {step.description && renderDescription(step.description)}
                  </div>
                  {step.architectTip && !isDone && (
                    <div className="bg-amber-950/40 border-l-2 border-amber-600 p-3 rounded-r flex gap-3 items-start">
                      <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span className="text-amber-200/90 text-xs font-medium leading-relaxed">{step.architectTip}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#0a0c10] via-[#0a0c10]/95 to-transparent z-30 safe-area-pb">
        <div className="max-w-2xl mx-auto flex gap-3">
          <Link href="/play" className="flex-1 py-3 rounded-xl font-bold text-gray-400 bg-gray-900/80 hover:bg-gray-800 border border-gray-800 backdrop-blur transition-colors text-center">All Factions</Link>
          <button onClick={nextPhase} disabled={isLastPhase} className={clsx("flex-1 py-3 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all active:scale-95", isLastPhase ? "bg-green-600 text-white cursor-default" : "bg-white text-black hover:bg-gray-100")}>
            {isLastPhase ? "Finish" : (
              <>
                Next Phase
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}