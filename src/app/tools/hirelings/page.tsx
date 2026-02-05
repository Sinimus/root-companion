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
          markers: 3, // Default 3 control markers
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

      const newMarkers = current.markers + delta;
      if (newMarkers <= 0) {
        const newActive = { ...prev };
        delete newActive[hirelingId];
        return newActive;
      }
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
        const newMarkers = hireling.markers - 1;
        if (newMarkers > 0) {
          newActive[id] = {
            ...hireling,
            markers: newMarkers
          };
        }
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

  const getHirelingVPThreshold = (index: number) => {
    // Hirelings unlock at 4, 8, 12 VP
    const thresholds = [4, 8, 12];
    return thresholds[index] || 16;
  };

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
              <h3 className="text-yellow-400 font-bold">Unlock Requirements</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Hirelings become available when you reach certain VP thresholds:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
              {HIRELINGS_DATA.map((hireling, index) => (
                <div key={hireling.id} className="text-center">
                  <div className="text-xs text-gray-500 mb-1">{hireling.name}</div>
                  <div className="text-lg font-bold text-yellow-400">{getHirelingVPThreshold(index)} VP</div>
                </div>
              ))}
            </div>
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
                <li>• Hirelings unlock at 4, 8, 12 VP</li>
                <li>• When you gain a hireling, roll Control Die</li>
                <li>• Start with 3 control markers by default</li>
                <li>• Hirelings count for clearing control</li>
              </ul>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 p-4 rounded-xl">
              <h3 className="text-orange-300 font-bold mb-2">Losing Control</h3>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Lose 1 control marker each turn</li>
                <li>• When markers reach 0, hireling is released</li>
                <li>• Other players can then gain control</li>
                <li>• Use &quot;End Turn Decay&quot; to simulate this</li>
              </ul>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}