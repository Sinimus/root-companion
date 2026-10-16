'use client';

import React from 'react';
import { MAPS } from '@/data/maps';
import { clearingsBySuit, cornerClearingIds, suitOf } from '@/utils/mapLogic';
import { Suit } from '@/types/engine';
import { Anchor, TowerControl as Tower, Mountain, Waves } from 'lucide-react';

interface Props {
  mapId: string;
  suitMapping?: Record<number, Suit>; // Mapping of clearing ID to suit
  landmarks?: string[];
}

const SUIT_COLORS: Record<Suit, string> = {
  fox: '#B91C1C',
  mouse: '#C2410C',
  rabbit: '#EAB308',
  bird: '#1D4ED8',
};

// White passes 4.5:1 on fox, mouse and bird; rabbit is too light for white text.
const SUIT_TEXT_COLORS: Record<Suit, string> = {
  fox: '#fff',
  mouse: '#fff',
  bird: '#fff',
  rabbit: '#1F2937',
};

// Second cue for color-blind players: the suit's initial inside the clearing.
const SUIT_LETTERS: Record<Suit, string> = {
  fox: 'F',
  mouse: 'M',
  rabbit: 'R',
  bird: 'B',
};

const SUIT_NAMES: Record<Suit, string> = {
  fox: 'Fox',
  mouse: 'Mouse',
  rabbit: 'Rabbit',
  bird: 'Bird',
};

const LEGEND_SUIT_ORDER: Suit[] = ['fox', 'rabbit', 'mouse', 'bird'];

export function MapVisualizer({ mapId, suitMapping }: Props) {
  const mapData = MAPS[mapId] || MAPS['autumn'];
  const clearings = mapData.clearings;
  const bySuit = clearingsBySuit(mapData, suitMapping);
  const corners = cornerClearingIds(mapData);
  const hasRiver = mapData.paths.some((p) => p.river);
  const hasClosed = mapData.paths.some((p) => p.isClosed);
  const hasPass = clearings.some((c) => c.isPass);
  const hasFerry = clearings.some((c) => c.ferryStart);
  const coastalIds = clearings.filter((c) => c.isCoastal).map((c) => c.id);

  const presentSuits = LEGEND_SUIT_ORDER.filter((suit) => bySuit[suit].length > 0);
  const suitLines = presentSuits.map((suit) => `${SUIT_NAMES[suit]}: ${bySuit[suit].join(', ')}`);
  const ariaLabel = `${mapData.name}. ${suitLines.join(' ')} Corners: ${corners.join(', ')}.`;

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="w-full aspect-square max-w-md mx-auto bg-[#eaddcf] rounded-3xl border-4 sm:border-8 border-[#8b5a2b]/20 shadow-2xl overflow-hidden relative p-3 sm:p-6 ring-4 ring-[#8b5a2b]/10">
        <svg
          viewBox="-6 -6 112 112"
          role="img"
          aria-label={ariaLabel}
          className="w-full h-full relative z-10"
        >
          <title>{ariaLabel}</title>

          {/* Special Feature: LAKE */}
          {mapId === 'lake' && (
            <ellipse
              cx="50"
              cy="55"
              rx="20"
              ry="16"
              fill="#3B82F6"
              fillOpacity="0.2"
              stroke="#3B82F6"
              strokeWidth="0.5"
              strokeDasharray="2 2"
            />
          )}

          {/* Rivers (drawn under the roads) */}
          {mapData.paths
            .filter((p) => p.river)
            .map((path, idx) => {
              const from = clearings.find((c) => c.id === path.from);
              const to = clearings.find((c) => c.id === path.to);
              if (!from || !to) return null;
              return (
                <line
                  key={`river-${idx}`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="#2563EB"
                  strokeWidth="3"
                  strokeOpacity="0.8"
                  strokeLinecap="round"
                />
              );
            })}

          {/* Paths (roads) */}
          {mapData.paths
            .filter((p) => !p.river && !p.isClosed)
            .map((path, idx) => {
              const from = clearings.find((c) => c.id === path.from);
              const to = clearings.find((c) => c.id === path.to);
              if (!from || !to) return null;
              return (
                <line
                  key={`road-${idx}`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="#8b5a2b"
                  strokeWidth="1.6"
                  strokeOpacity="0.55"
                  strokeLinecap="round"
                />
              );
            })}

          {/* Closed paths (Mountain): dashed red plus an x at the middle */}
          {mapData.paths
            .filter((p) => p.isClosed)
            .map((path, idx) => {
              const from = clearings.find((c) => c.id === path.from);
              const to = clearings.find((c) => c.id === path.to);
              if (!from || !to) return null;
              const mx = (from.x + to.x) / 2;
              const my = (from.y + to.y) / 2;
              return (
                <g key={`closed-${idx}`}>
                  <line
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke="#7f1d1d"
                    strokeWidth="2"
                    strokeDasharray="3 2"
                    strokeLinecap="round"
                  />
                  <line
                    x1={mx - 1.1}
                    y1={my - 1.1}
                    x2={mx + 1.1}
                    y2={my + 1.1}
                    stroke="#7f1d1d"
                    strokeWidth="0.8"
                    strokeLinecap="round"
                  />
                  <line
                    x1={mx - 1.1}
                    y1={my + 1.1}
                    x2={mx + 1.1}
                    y2={my - 1.1}
                    stroke="#7f1d1d"
                    strokeWidth="0.8"
                    strokeLinecap="round"
                  />
                </g>
              );
            })}

          {/* Clearings */}
          {clearings.map((c) => {
            const suit = suitOf(c, suitMapping);
            const textColor = SUIT_TEXT_COLORS[suit];
            return (
              <g
                key={c.id}
                data-clearing={c.id}
                data-corner={c.isCorner ? 'true' : undefined}
                className="cursor-default"
              >
                {/* Corner clearing ring */}
                {c.isCorner && (
                  <circle
                    cx={c.x}
                    cy={c.y}
                    r="10.5"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="1.2"
                    strokeDasharray="2.5 2"
                  />
                )}

                {/* Clearing Circle */}
                <circle
                  cx={c.x}
                  cy={c.y}
                  r="7.5"
                  fill={SUIT_COLORS[suit]}
                  stroke="#fff"
                  strokeWidth="1.5"
                  className="drop-shadow-lg"
                />

                {/* Pass (Mountain): the Tower stands in this clearing */}
                {c.isPass && (
                  <foreignObject x={c.x - 3.5} y={c.y - 3.5} width="7" height="7">
                    <Tower className="w-full h-full text-white/80" />
                  </foreignObject>
                )}

                {/* Clearing number, slightly above center */}
                <text
                  x={c.x}
                  y={c.y - 1.4}
                  textAnchor="middle"
                  fontSize="5.5"
                  fontWeight="900"
                  fill={textColor}
                  style={{ textShadow: '0 1px 2px rgba(0,0,0,0.35)' }}
                >
                  {c.id}
                </text>

                {/* Suit letter, below the number */}
                <text
                  x={c.x}
                  y={c.y + 4.4}
                  textAnchor="middle"
                  fontSize="3.4"
                  fontWeight="700"
                  fill={textColor}
                >
                  {SUIT_LETTERS[suit]}
                </text>

                {/* Ruin badge at the lower right */}
                {c.hasRuin && (
                  <g data-ruin="true">
                    <rect
                      x={c.x + 4.5}
                      y={c.y + 4.5}
                      width="5"
                      height="5"
                      rx="1"
                      fill="#292524"
                      stroke="#fff"
                      strokeWidth="0.6"
                    />
                    <text
                      x={c.x + 7}
                      y={c.y + 7}
                      dy="1.2"
                      textAnchor="middle"
                      fontSize="3.4"
                      fontWeight="700"
                      fill="#fff"
                    >
                      R
                    </text>
                  </g>
                )}

                {/* Ferry start (Lake), at the upper right */}
                {c.ferryStart && (
                  <>
                    <circle cx={c.x + 6} cy={c.y - 6} r="3.5" fill="#fff" />
                    <foreignObject x={c.x + 2.5} y={c.y - 9.5} width="7" height="7">
                      <Anchor className="w-full h-full text-[#1E3A8A]" />
                    </foreignObject>
                  </>
                )}
              </g>
            );
          })}
        </svg>

        {/* Map Overlay Text */}
        <div className="absolute bottom-4 right-6 flex flex-col items-end opacity-40 select-none">
          <div className="flex items-center gap-2">
            {mapId === 'mountain' && <Mountain className="w-4 h-4" />}
            {mapId === 'lake' && <Waves className="w-4 h-4" />}
            <span className="text-xs font-black uppercase tracking-widest text-[#8b5a2b]">
              {mapData.name}
            </span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-2 flex flex-col gap-1.5 text-xs text-gray-300">
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {presentSuits.map((suit) => (
            <span key={suit} className="inline-flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full inline-block"
                style={{ backgroundColor: SUIT_COLORS[suit] }}
              />
              {SUIT_NAMES[suit]}: {bySuit[suit].join(', ')}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-gray-400">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full border border-dashed border-amber-500 inline-block" />
            Corner
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-[3px] bg-[#292524] text-white text-[9px] font-bold inline-flex items-center justify-center">
              R
            </span>
            Ruin
          </span>
          {hasRiver && (
            <span className="inline-flex items-center gap-1.5">
              <span className="w-4 h-[3px] rounded-full bg-[#2563EB] inline-block" />
              River
            </span>
          )}
          {hasClosed && (
            <span className="inline-flex items-center gap-1.5">
              <span className="w-4 border-t-2 border-dashed border-[#7f1d1d] inline-block" />
              Closed path
            </span>
          )}
          {hasPass && (
            <span className="inline-flex items-center gap-1.5">
              <Tower className="w-3.5 h-3.5 text-white/80" />
              Pass
            </span>
          )}
          {hasFerry && (
            <span className="inline-flex items-center gap-1.5">
              <Anchor className="w-3.5 h-3.5 text-[#60a5fa]" />
              Ferry start
            </span>
          )}
          {coastalIds.length > 0 && <span>Coastal: {coastalIds.join(', ')}</span>}
        </div>
      </div>
    </div>
  );
}
