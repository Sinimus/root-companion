"use client";

import React from 'react';
import { MAPS } from '@/data/maps';
import { Suit } from '@/types/engine';
import { Anchor, TowerControl as Tower, Mountain, Waves } from 'lucide-react';
import { clsx } from 'clsx';

interface Props {
  mapId: string;
  suitMapping?: Record<number, Suit>; // Mapping of clearing ID to suit
  landmarks?: string[]; 
}

const SUIT_COLORS: Record<Suit, string> = {
  fox: '#EF4444', 
  mouse: '#F97316', 
  rabbit: '#EAB308', 
  bird: '#3B82F6' 
};

export function MapVisualizer({ mapId, suitMapping }: Props) {
  const mapData = MAPS[mapId] || MAPS['autumn'];
  const clearings = mapData.clearings;

  return (
    <div className="w-full aspect-square max-w-md mx-auto bg-[#eaddcf] rounded-3xl border-8 border-[#8b5a2b]/20 shadow-2xl overflow-hidden relative p-6 ring-4 ring-[#8b5a2b]/10">
       
       <svg viewBox="0 0 100 100" className="w-full h-full relative z-10">
          {/* Special Feature: LAKE */}
          {mapId === 'lake' && (
             <circle cx="50" cy="50" r="25" fill="#3B82F6" fillOpacity="0.2" stroke="#3B82F6" strokeWidth="0.5" strokeDasharray="2 2" />
          )}

          {/* Paths */}
          {mapData.paths.map((path, idx) => {
             const from = clearings.find(c => c.id === path.from);
             const to = clearings.find(c => c.id === path.to);
             if (!from || !to) return null;
             return (
               <line 
                 key={idx}
                 x1={from.x} y1={from.y}
                 x2={to.x} y2={to.y}
                 stroke={path.isClosed ? "#8b5a2b" : "#fff"}
                 strokeWidth={path.isClosed ? "3" : "2"}
                 strokeOpacity={path.isClosed ? "0.4" : "0.6"}
                 strokeDasharray={path.isClosed ? "1 1" : "none"}
               />
             );
          })}

          {/* Clearings */}
          {clearings.map(c => {
             const suit = suitMapping ? suitMapping[c.id] : c.defaultSuit;
             return (
               <g key={c.id} className="cursor-default">
                  {/* Clearing Circle */}
                  <circle 
                    cx={c.x} cy={c.y} 
                    r="7" 
                    fill={SUIT_COLORS[suit]}
                    stroke="#fff"
                    strokeWidth="1.5"
                    className="drop-shadow-lg"
                  />
                  
                  {/* Icons for special clearings */}
                  {c.isPass && (
                    <foreignObject x={c.x-4} y={c.y-4} width="8" height="8">
                        <Tower className="w-full h-full text-white/40 p-1" />
                    </foreignObject>
                  )}

                  {/* ID Label */}
                  <text 
                    x={c.x} y={c.y} 
                    dy="1.2" 
                    textAnchor="middle" 
                    fontSize="4.5" 
                    fontWeight="900" 
                    fill="white"
                    style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
                  >
                    {c.id}
                  </text>

                  {/* Features Indicators */}
                  {c.hasRuin && (
                    <rect x={c.x - 2.5} y={c.y + 3.5} width="5" height="1.5" fill="#333" rx="0.2" />
                  )}
                  {mapId === 'lake' && c.id === 1 && (
                    <foreignObject x={c.x + 4} y={c.y - 4} width="6" height="6">
                        <Anchor className="text-blue-600 w-full h-full drop-shadow-sm" />
                    </foreignObject>
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
             <span className="text-xs font-black uppercase tracking-widest text-[#8b5a2b]">{mapData.name}</span>
          </div>
       </div>
    </div>
  );
}