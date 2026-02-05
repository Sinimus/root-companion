"use client";

import React, { useState } from 'react';
import { IHireling } from '@/types/engine';
import {
  Shield, Swords, Music, User, Plus, Minus, AlertTriangle,
  ChevronDown, ChevronUp, RefreshCw, Crown, ArrowDown
} from 'lucide-react';

interface HirelingCardProps {
  hireling: IHireling;
  controlMarkers: number;
  onUpdateMarkers: (delta: number) => void;
  onToggleActive: () => void;
  onFlipState?: () => void;
  initialPromoted?: boolean;
  isActive?: boolean;
}

// Icon mapping for hirelings
const ICON_MAP = {
  Shield,
  Swords,
  Music,
  User,
};

export function HirelingCard({
  hireling,
  controlMarkers,
  onUpdateMarkers,
  onToggleActive,
  onFlipState,
  initialPromoted = true,
  isActive = false
}: HirelingCardProps) {
  const [isPromoted, setIsPromoted] = useState(initialPromoted);
  const Icon = ICON_MAP[hireling.iconName as keyof typeof ICON_MAP] || User;

  // Get current side data
  const currentSide = isPromoted ? hireling.promotedSide : hireling.demotedSide;

  return (
    <div className={`
      relative p-4 rounded-xl border-2 transition-all duration-300
      ${isActive
        ? isPromoted
          ? 'bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border-yellow-600/50 shadow-lg shadow-yellow-500/20'
          : 'bg-gradient-to-br from-gray-800/40 to-gray-900/60 border-gray-600/50 shadow-lg shadow-gray-500/20'
        : 'bg-gray-900/60 border-gray-800 hover:border-gray-600 hover:bg-gray-900/80'
      }
    `}>
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className={`
          p-2 rounded-lg transition-colors
          ${isActive
            ? isPromoted
              ? 'bg-yellow-800/50 text-yellow-300'
              : 'bg-gray-700/50 text-gray-300'
            : 'bg-gray-800 text-gray-400'
          }
        `}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-white text-lg">{hireling.name}</h3>
            {isActive && (
              <div className="flex items-center gap-1">
                {isPromoted ? (
                  <Crown className="w-4 h-4 text-yellow-400" />
                ) : (
                  <ArrowDown className="w-4 h-4 text-gray-400" />
                )}
                <span className={`
                  text-xs font-bold px-2 py-0.5 rounded
                  ${isPromoted
                    ? 'bg-yellow-900/30 text-yellow-400'
                    : 'bg-gray-700/50 text-gray-400'
                  }
                `}>
                  {isPromoted ? 'PROMOTED' : 'DEMOTED'}
                </span>
              </div>
            )}
          </div>
          {hireling.items && (
            <div className="flex gap-1 mt-1">
              {hireling.items.map((item, i) => (
                <span key={i} className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded">
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1">
          {isActive && onFlipState && (
            <button
              onClick={() => {
                setIsPromoted(!isPromoted);
                onFlipState();
              }}
              className={`
                px-2 py-1 rounded-lg text-xs font-bold transition-all hover:scale-105
                ${isPromoted
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-yellow-700 text-yellow-200 hover:bg-yellow-600'
                }
              `}
              title="Flip hireling card"
            >
              <RefreshCw className="w-3 h-3" />
            </button>
          )}
          <button
            onClick={onToggleActive}
            className={`
              px-3 py-1 rounded-lg text-xs font-bold transition-all hover:scale-105
              ${isActive
                ? isPromoted
                  ? 'bg-yellow-600 text-white hover:bg-yellow-700 shadow-lg shadow-yellow-500/30'
                  : 'bg-gray-600 text-white hover:bg-gray-700 shadow-lg shadow-gray-500/30'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white shadow-md'
              }
            `}
          >
            {isActive ? 'ACTIVE' : 'HIRE'}
          </button>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-400 text-sm mb-3">{hireling.description}</p>

      {/* Abilities */}
      <div className="space-y-2 mb-3">
        {currentSide.abilities.map((ability, i) => (
          <div key={i} className={`
            p-3 rounded-lg transition-all
            ${isPromoted ? 'bg-yellow-900/10 border border-yellow-600/20' : 'bg-gray-800/40 border border-gray-600/20'}
          `}>
            <div className="flex items-start gap-2">
              <span className={`
                text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider
                ${ability.type === 'passive' ? 'bg-blue-900/30 text-blue-400' :
                  ability.type === 'action' ? 'bg-green-900/30 text-green-400' :
                  'bg-yellow-900/30 text-yellow-400'}
              `}>
                {ability.type}
              </span>
              <div className="flex-1">
                <h4 className="text-white font-bold text-sm mb-1">{ability.title}</h4>
                <p className="text-gray-400 text-xs leading-relaxed">{ability.effect}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Control Markers (only for active promoted hirelings - demoted ones don't use pieces/markers) */}
      {isActive && isPromoted && (
        <div className="border-t border-gray-700 pt-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-gray-300">Control Markers</span>
            <div className="text-xs text-gray-500">
              Default: {currentSide.markers}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => onUpdateMarkers(-1)}
                disabled={controlMarkers <= 0}
                className={`
                  p-1 rounded transition-colors
                  ${controlMarkers > 0
                    ? 'bg-red-800 hover:bg-red-700 text-red-300'
                    : 'bg-gray-800 text-gray-600 cursor-not-allowed'
                  }
                `}
              >
                <Minus className="w-4 h-4" />
              </button>

              <span className={`
                font-bold text-lg min-w-[3rem] text-center
                ${controlMarkers === 0 ? 'text-red-500 animate-pulse' : 'text-white'}
              `}>
                {controlMarkers}
              </span>

              <button
                onClick={() => onUpdateMarkers(1)}
                className="p-1 bg-green-800 hover:bg-green-700 text-green-300 rounded transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Visual marker indicators */}
            <div className="flex gap-1">
              {Array.from({ length: currentSide.markers }, (_, i) => (
                <div
                  key={i}
                  className={`
                    w-2 h-2 rounded-full
                    ${i < controlMarkers
                      ? isPromoted ? 'bg-yellow-400' : 'bg-gray-400'
                      : 'bg-gray-700'
                    }
                  `}
                />
              ))}
            </div>
          </div>

          {controlMarkers === 0 && (
            <div className="mt-2 flex items-center gap-2 text-red-500 text-sm font-bold">
              <AlertTriangle className="w-4 h-4" />
              <span>RELEASE</span>
            </div>
          )}
        </div>
      )}

      {/* Demoted hireling indicator */}
      {isActive && !isPromoted && (
        <div className="border-t border-gray-700 pt-3">
          <div className="text-center">
            <span className="text-sm text-gray-500 italic">Passive - No control markers needed</span>
          </div>
        </div>
      )}

      {/* Rule Reference */}
      {hireling.ruleReference && (
        <div className="text-xs text-gray-500 font-mono text-center pt-2 border-t border-gray-800">
          Ref: {hireling.ruleReference}
        </div>
      )}
    </div>
  );
}