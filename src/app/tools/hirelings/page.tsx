"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Users, Clock, AlertTriangle, RotateCcw } from 'lucide-react';
import { HirelingCard } from '@/components/HirelingCard';
import { HIRELINGS_DATA } from '@/data/hirelings';

interface ActiveHireling {
  id: string;
  markers: number;
  isPromoted: boolean;
}

export default function HirelingsPage() {
  const [activeHirelings, setActiveHirelings] = useState<Record<string, ActiveHireling>>({});

  // Load state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('root_hirelings_active');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        // Migrate old format (Record<string, number>) to new format (Record<string, ActiveHireling>)
        const migrated: Record<string, ActiveHireling> = {};
        let needsMigration = false;

        Object.entries(parsed).forEach(([id, value]) => {
          if (typeof value === 'number') {
            // Old format: { markers: number, isPromoted: boolean }
            migrated[id] = {
              id, // <--- Add this line
              markers: value,
              isPromoted: true
            };
            needsMigration = true;
          } else {
            // New format - already has ActiveHireling structure
            migrated[id] = value as ActiveHireling;
          }
        });

        setActiveHirelings(migrated);

        // Save migrated format if needed
        if (needsMigration) {
          localStorage.setItem('root_hirelings_active', JSON.stringify(migrated));
        }
      } catch (e) {
        console.error('Error parsing hirelings data:', e);
        setActiveHirelings({});
      }
    }
  }, []);

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem('root_hirelings_active', JSON.stringify(activeHirelings));
  }, [activeHirelings]);

  const handleHire = (hirelingId: string) => {
    if (!activeHirelings[hirelingId]) {
      setActiveHirelings(prev => ({
        ...prev,
        [hirelingId]: {
          id: hirelingId, // <--- Add this line
          markers: 1, // Placeholder; the player sets it to their control die roll (Law H.1.2)
          isPromoted: true // Default to promoted state
        }
      }));
    }
  };

  const handleRelease = (hirelingId: string) => {
    setActiveHirelings(prev => {
      const newActive = { ...prev };
      delete newActive[hirelingId];
      return newActive;
    });
  };

  const handleUpdateMarkers = (hirelingId: string, delta: number) => {
    setActiveHirelings(prev => {
      const current = prev[hirelingId];
      if (!current) return prev;

      // At 0 the hireling passes to another player, who rolls again (Law H.1.3)
      const newMarkers = Math.max(0, current.markers + delta);
      return {
        ...prev,
        [hirelingId]: {
          ...current,
          markers: newMarkers
        }
      };
    });
  };

  const handleEndTurnDecay = () => {
    setActiveHirelings(prev => {
      const newActive: Record<string, ActiveHireling> = {};
      Object.entries(prev).forEach(([id, hireling]) => {
        newActive[id] = {
          ...hireling,
          markers: Math.max(0, hireling.markers - 1)
        };
      });
      return newActive;
    });
  };

  const handleFlipHireling = (hirelingId: string) => {
    setActiveHirelings(prev => {
      const current = prev[hirelingId];
      if (!current) return prev;

      return {
        ...prev,
        [hirelingId]: {
          ...current,
          isPromoted: !current.isPromoted
        }
      };
    });
  };

  const availableHirelings = HIRELINGS_DATA.filter(h => !activeHirelings[h.id]);
  const activeHirelingsList = HIRELINGS_DATA.filter(h => activeHirelings[h.id]);

  return (
    <div className="min-h-screen bg-[#0a0c10] p-4 pb-20 pt-20 relative">
      <div className="absolute top-6 left-6 z-40">
        <Link href="/" className="text-gray-500 hover:text-white flex items-center gap-2 transition-colors font-medium">
          <ArrowLeft className="w-5 h-5" /> Menu
        </Link>
      </div>

      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-black text-white mb-2 flex items-center justify-center gap-3">
            <Users className="w-8 h-8 text-purple-400" />
            Hireling Manager
          </h1>
          <p className="text-gray-500">Manage neutral factions and their control markers</p>
        </div>

        {/* Controls */}
        <div className="flex justify-center">
          <button
            onClick={handleEndTurnDecay}
            disabled={Object.keys(activeHirelings).length === 0}
            className={`
              px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all
              ${Object.keys(activeHirelings).length > 0
                ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-500/20'
                : 'bg-gray-800 text-gray-600 cursor-not-allowed'
              }
            `}
          >
            <Clock className="w-5 h-5" />
            End Turn Decay
          </button>
        </div>

        {/* Active Hirelings */}
        {activeHirelingsList.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-purple-400 flex items-center gap-2">
              <Users className="w-6 h-6" />
              Active Hirelings ({activeHirelingsList.length})
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {activeHirelingsList.map(hireling => {
                const activeHireling = activeHirelings[hireling.id];
                return (
                  <HirelingCard
                    key={hireling.id}
                    hireling={hireling}
                    controlMarkers={activeHireling?.markers || 0}
                    onUpdateMarkers={(delta) => handleUpdateMarkers(hireling.id, delta)}
                    onToggleActive={() => handleRelease(hireling.id)}
                    onFlipState={() => handleFlipHireling(hireling.id)}
                    initialPromoted={activeHireling?.isPromoted ?? true}
                    isActive={true}
                  />
                );
              })}
            </div>
          </section>
        )}

        {/* Available Hirelings */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-400 flex items-center gap-2">
            <RotateCcw className="w-6 h-6" />
            Available Hirelings ({availableHirelings.length})
          </h2>

          {/* VP Threshold Info */}
          <div className="bg-gray-900/50 border border-gray-800 p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              <h3 className="text-yellow-400 font-bold">Hireling Markers</h3>
            </div>
            <p className="text-gray-400 text-sm">
              A game uses exactly three hirelings. Hireling markers sit on the 4, 8 and 12 spaces of the score track.
              When your score marker enters one of these spaces, take the marker and, at the end of your turn,
              take any hireling card from the supply and roll for control.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {availableHirelings.map(hireling => (
              <HirelingCard
                key={hireling.id}
                hireling={hireling}
                controlMarkers={0}
                onUpdateMarkers={() => {}} // No-op for inactive cards
                onToggleActive={() => handleHire(hireling.id)}
                isActive={false}
              />
            ))}
          </div>
        </section>

        {/* Rules Summary */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-500">How Hirelings Work</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-gray-900/50 border border-gray-800 p-4 rounded-xl">
              <h3 className="text-purple-300 font-bold mb-2">Gaining Control</h3>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Reach the 4, 8 or 12 space to take a hireling at end of turn</li>
                <li>• Roll the control die and place that many control markers</li>
                <li>• Leader (or tied for most VP) counts only the gold pips</li>
                <li>• You treat hireling pieces as your own only for rule</li>
              </ul>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 p-4 rounded-xl">
              <h3 className="text-orange-300 font-bold mb-2">Losing Control</h3>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• End of your turn: remove 1 marker from each hireling gained on earlier turns</li>
                <li>• With no markers left, give the hireling to any other player</li>
                <li>• That player rolls for control immediately</li>
                <li>• &quot;End Turn Decay&quot; removes one marker from each; add one back for a hireling gained this turn</li>
              </ul>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}