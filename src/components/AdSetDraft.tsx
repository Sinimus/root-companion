/**
 * @author Sinimus <sinimus@noreply>
 * @license AGPL-3.0
 * @description Part of Root Companion App
 */

"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { generateAdSetState, getFactionById, AdSetState } from '@/utils/adsetLogic';
import { Users, ArrowRight, ArrowLeft, Shuffle, CheckCircle, Play } from 'lucide-react';

interface PlayerSelection {
  playerIndex: number;
  factionId: string;
  chosenFrom: 'pool' | 'hand';
}

interface Props {
  onFinish?: (factions: string[]) => void;
  initialPlayerCount?: 2 | 3 | 4;
}

export function AdSetDraft({ onFinish, initialPlayerCount }: Props) {
  const [playerCount, setPlayerCount] = useState<2 | 3 | 4>(initialPlayerCount || 3);
  const [setupState, setSetupState] = useState<AdSetState | null>(null);
  const [currentTurn, setCurrentTurn] = useState<number>(-1);
  const [selections, setSelections] = useState<PlayerSelection[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const dealCards = () => {
    try {
      const state = generateAdSetState(playerCount);
      setSetupState(state);
      setCurrentTurn(playerCount - 1); // Start from last player
      setSelections([]);
      setIsComplete(false);
    } catch (error) {
      console.error('Error generating AdSet state:', error);
      alert(error instanceof Error ? error.message : 'Failed to generate setup');
    }
  };

  const makeSelection = (chooseFrom: 'pool' | 'hand') => {
    if (!setupState || currentTurn < 0) return;

    const poolFaction = setupState.poolFaction;
    const handFaction = setupState.playerFactions[currentTurn];

    const newSelection: PlayerSelection = {
      playerIndex: currentTurn,
      factionId: chooseFrom === 'pool' ? poolFaction : handFaction,
      chosenFrom: chooseFrom
    };

    setSelections(prev => [...prev, newSelection]);

    // Update setup state for next turn
    if (chooseFrom === 'pool') {
      // Player takes pool faction, hand faction goes to pool
      setSetupState(prev => ({
        ...prev!,
        poolFaction: handFaction,
        playerFactions: prev!.playerFactions.map((faction, index) =>
          index === currentTurn ? poolFaction : faction
        )
      }));
    }
    // If chooseFrom === 'hand', no changes needed - player keeps their hand faction

    // Move to next turn
    if (currentTurn > 0) {
      setCurrentTurn(currentTurn - 1);
    } else {
      // Draft complete - return data to parent
      const finalFactions = [...setupState!.playerFactions];
      if (onFinish) onFinish(finalFactions);
      setIsComplete(true);
    }
  };

  const resetDraft = () => {
    setSetupState(null);
    setCurrentTurn(-1);
    setSelections([]);
    setIsComplete(false);
  };

  const FactionCard = ({ factionId, isPool = false }: { factionId: string; isPool?: boolean }) => {
    const faction = getFactionById(factionId);
    if (!faction) return null;

    return (
      <div className={`
        p-6 rounded-xl border-2 transition-all duration-300
        ${isPool
          ? 'bg-purple-900/20 border-purple-600/50 hover:border-purple-500/70 hover:shadow-lg hover:shadow-purple-500/20'
          : faction.color
        }
      `}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-white">{faction.name}</h3>
          <div className="flex items-center gap-2">
            <span className={`
              text-xs px-2 py-1 rounded font-bold uppercase
              ${faction.type === 'militant'
                ? 'bg-red-800/50 text-red-300'
                : 'bg-blue-800/50 text-blue-300'
              }
            `}>
              {faction.type}
            </span>
            <span className="text-sm text-gray-400 font-mono">
              Reach: {faction.reach}
            </span>
          </div>
        </div>
        <div className="text-sm text-gray-400">
          Short Name: {faction.shortName}
        </div>
      </div>
    );
  };

  if (isComplete && setupState) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-black text-white mb-2">AdSet Draft Complete</h1>
          <p className="text-gray-400">Faction assignments ready</p>
        </div>

        {/* Final Assignments */}
        <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-green-400" />
            Final Assignments
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {Array.from({ length: playerCount }, (_, index) => {
              const playerFactionId = setupState.playerFactions[index];
              const selection = selections.find(s => s.playerIndex === index);

              return (
                <div key={index} className="bg-gray-800/50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-white">
                      Player {index + 1}
                    </h3>
                    {selection && (
                      <span className="text-xs text-gray-400">
                        Chose from {selection.chosenFrom}
                      </span>
                    )}
                  </div>
                  <FactionCard factionId={playerFactionId} />
                  <Link
                    href={`/play/${playerFactionId}`}
                    className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-colors"
                  >
                    <Play className="w-4 h-4" />
                    Play Guide
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-4">
          <button
            onClick={resetDraft}
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-bold transition-colors"
          >
            New Draft
          </button>
        </div>
      </div>
    );
  }

  if (setupState && currentTurn >= 0) {
    const poolFaction = setupState.poolFaction;
    const handFaction = setupState.playerFactions[currentTurn];

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-black text-white mb-2">AdSet Draft</h1>
          <div className="flex items-center justify-center gap-4 text-gray-400">
            <span>Player Count: {playerCount}</span>
            <span>•</span>
            <span>Turn: {playerCount - currentTurn}/{playerCount}</span>
          </div>
        </div>

        {/* Current Player */}
        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-800/50 rounded-xl p-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Player {currentTurn + 1}'s Turn
          </h2>
          <p className="text-gray-300">Choose your faction from the options below</p>
        </div>

        {/* Faction Choices */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Pool Faction */}
          <div>
            <h3 className="text-lg font-bold text-purple-400 mb-3 text-center">Pool Faction</h3>
            <FactionCard factionId={poolFaction} isPool={true} />
            <button
              onClick={() => makeSelection('pool')}
              className="w-full mt-4 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
            >
              <ArrowRight className="w-5 h-5" />
              Choose Pool Faction
            </button>
          </div>

          {/* Hand Faction */}
          <div>
            <h3 className="text-lg font-bold text-gray-400 mb-3 text-center">Your Hand</h3>
            <FactionCard factionId={handFaction} />
            <button
              onClick={() => makeSelection('hand')}
              className="w-full mt-4 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              Keep Hand Faction
            </button>
          </div>
        </div>

        {/* Draft Progress */}
        <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4">
          <h3 className="text-lg font-bold text-white mb-3">Draft Progress</h3>
          <div className="flex gap-2">
            {Array.from({ length: playerCount }, (_, index) => {
              const hasSelected = selections.some(s => s.playerIndex === index);
              const isCurrent = index === currentTurn;

              return (
                <div
                  key={index}
                  className={`
                    flex-1 h-2 rounded-full transition-all
                    ${hasSelected ? 'bg-green-500' : isCurrent ? 'bg-blue-500' : 'bg-gray-700'}
                  `}
                />
              );
            })}
          </div>
          <div className="mt-2 text-sm text-gray-400 text-center">
            {selections.length} of {playerCount} players have chosen
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center">
          <button
            onClick={resetDraft}
            className="px-6 py-3 bg-red-800 hover:bg-red-700 text-white rounded-lg font-bold transition-colors"
          >
            Cancel Draft
          </button>
        </div>
      </div>
    );
  }

  // Initial setup state (Selection or Deal)
  if (!setupState) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-black text-white mb-2">AdSet Draft</h1>
          <p className="text-gray-400">
            {initialPlayerCount ? `Setup for ${playerCount} Players` : 'Advanced Setup for Root'}
          </p>
        </div>

        {!initialPlayerCount && (
          <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Select Player Count</h2>
            <div className="grid grid-cols-3 gap-4">
              {[2, 3, 4].map(count => (
                <button
                  key={count}
                  onClick={() => setPlayerCount(count as 2 | 3 | 4)}
                  className={`
                    p-4 rounded-lg border-2 font-bold transition-all
                    ${playerCount === count
                      ? 'bg-blue-600 border-blue-500 text-white'
                      : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600 hover:text-gray-300'
                    }
                  `}
                >
                  <Users className="w-6 h-6 mx-auto mb-2" />
                  {count} Players
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Rules Explanation */}
        <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <Shuffle className="w-5 h-5 text-yellow-500" />
            AdSet Draft Rules
          </h3>
          <div className="space-y-2 text-sm text-gray-400">
            <p><strong>2 Players:</strong> Only militant factions are used.</p>
            <p><strong>3+ Players:</strong> One militant faction goes to the pool.</p>
            <p><strong>Draft Order:</strong> Reverse player order (Last player first).</p>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={dealCards}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-bold text-lg transition-all transform hover:scale-105 flex items-center gap-3 mx-auto"
          >
            <Shuffle className="w-6 h-6" />
            {initialPlayerCount ? 'Start Draft' : 'Deal Cards'}
          </button>
        </div>
      </div>
    );
  }
}