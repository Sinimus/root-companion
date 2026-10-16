'use client';

import React, { useState, useEffect } from 'react';
import {
  Package,
  Sword,
  Hammer,
  Target,
  Coffee,
  Coins,
  Briefcase,
  Plus,
  Minus,
} from 'lucide-react';
import {
  COMMAND_ITEMS,
  PROWESS_ITEMS,
  addItem,
  hoardStat,
  type Hoard,
  type ItemType,
} from '@/utils/hoardLogic';

interface HundredsHoardProps {
  factionId: string;
}

export function HundredsHoard({ factionId }: HundredsHoardProps) {
  const [items, setItems] = useState<Hoard>({
    Boot: 0,
    Bag: 0,
    Coin: 0,
    Sword: 0,
    Hammer: 0,
    Crossbow: 0,
    Tea: 0,
  });

  // Shown when a gained item hits a full track (Law 14.2.4.I)
  const [fullTrackNotice, setFullTrackNotice] = useState<string | null>(null);

  // Load state from localStorage
  useEffect(() => {
    const savedItems = localStorage.getItem(`root_hundreds_items_${factionId}`);
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, [factionId]);

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem(`root_hundreds_items_${factionId}`, JSON.stringify(items));
  }, [items, factionId]);

  const commandStat = hoardStat(items, COMMAND_ITEMS);
  const prowessStat = hoardStat(items, PROWESS_ITEMS);

  // Each Hoard track has four spaces (Law 14.2.4.I)
  const updateItemCount = (type: ItemType, delta: number) => {
    if (delta > 0) {
      const { hoard, trackFull } = addItem(items, type);
      if (trackFull) {
        const trackName = COMMAND_ITEMS.includes(type) ? 'Command' : 'Prowess';
        setFullTrackNotice(
          `${trackName} track is full: remove the gained ${type} or any item on that track from the game, and score 1 victory point (14.2.4.I).`,
        );
        return;
      }
      setItems(hoard);
    } else {
      setItems((prev) => ({ ...prev, [type]: Math.max(0, prev[type] + delta) }));
    }
    setFullTrackNotice(null);
  };

  const getItemIcon = (type: ItemType) => {
    const iconMap = {
      Boot: <Package className="w-5 h-5" />,
      Bag: <Briefcase className="w-5 h-5" />,
      Coin: <Coins className="w-5 h-5" />,
      Sword: <Sword className="w-5 h-5" />,
      Hammer: <Hammer className="w-5 h-5" />,
      Crossbow: <Target className="w-5 h-5" />,
      Tea: <Coffee className="w-5 h-5" />,
    };
    return iconMap[type];
  };

  const getItemColor = (type: ItemType) => {
    const colorMap = {
      Boot: 'text-amber-400',
      Bag: 'text-purple-400',
      Coin: 'text-yellow-400',
      Sword: 'text-red-400',
      Hammer: 'text-gray-400',
      Crossbow: 'text-green-400',
      Tea: 'text-orange-400',
    };
    return colorMap[type];
  };

  const StatDisplay = ({
    label,
    value,
    color,
  }: {
    label: string;
    value: number;
    color: string;
  }) => (
    <div
      className={`
      text-center p-4 rounded-xl border-2
      ${
        color === 'blue'
          ? 'bg-blue-900/20 border-blue-800/50'
          : 'bg-purple-900/20 border-purple-800/50'
      }
    `}
    >
      <div
        className={`text-3xl font-bold ${color === 'blue' ? 'text-blue-400' : 'text-purple-400'}`}
      >
        {value}
      </div>
      <div
        className={`text-sm font-bold mt-1 ${color === 'blue' ? 'text-blue-300' : 'text-purple-300'}`}
      >
        {label}
      </div>
    </div>
  );

  const ItemPanel = ({
    title,
    items: panelItems,
    statColor,
  }: {
    title: string;
    items: ItemType[];
    statColor: 'blue' | 'purple';
  }) => (
    <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4">
      <h3 className="text-lg font-bold text-white mb-4">{title}</h3>
      <div className="space-y-3">
        {panelItems.map((type) => (
          <div key={type} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 bg-gray-800 rounded-sm ${getItemColor(type)}`}>
                {getItemIcon(type)}
              </div>
              <div>
                <div className="text-white font-bold">{type}</div>
                <div className="text-xs text-gray-500 capitalize">{type} items</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => updateItemCount(type, -1)}
                disabled={items[type] === 0}
                className={`
                  p-1 rounded transition-colors
                  ${
                    items[type] > 0
                      ? 'bg-red-800 hover:bg-red-700 text-red-300'
                      : 'bg-gray-800 text-gray-600 cursor-not-allowed'
                  }
                `}
              >
                <Minus className="w-4 h-4" />
              </button>

              <span className="text-xl font-bold text-white min-w-12 text-center">
                {items[type]}
              </span>

              <button
                onClick={() => updateItemCount(type, 1)}
                className="p-1 bg-green-800 hover:bg-green-700 text-green-300 rounded-sm transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto mb-6 space-y-4">
      {/* Header */}
      <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4">
        <div className="flex items-center gap-3 mb-4">
          <Package className="w-6 h-6 text-yellow-500" />
          <h2 className="text-xl font-bold text-white">Lord's Hoard</h2>
        </div>

        {/* Stats Display */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <StatDisplay label="COMMAND" value={commandStat} color="blue" />
          <StatDisplay label="PROWESS" value={prowessStat} color="purple" />
        </div>

        {/* Rules Reference */}
        <div className="text-xs text-gray-500 text-center">
          Each track holds up to 4 items. No items = 1, 1-2 items = 2, 3 items = 3, 4 items = 4 (Law
          14.2.4)
        </div>
      </div>

      {/* Item Panels */}
      <div className="grid md:grid-cols-2 gap-4">
        <ItemPanel title="Command Items" items={['Boot', 'Bag', 'Coin']} statColor="blue" />
        <ItemPanel
          title="Prowess Items"
          items={['Sword', 'Hammer', 'Crossbow', 'Tea']}
          statColor="purple"
        />
      </div>

      {fullTrackNotice && <p className="text-sm text-amber-400">{fullTrackNotice}</p>}

      {/* Quick Actions */}
      <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4">
        <h3 className="text-lg font-bold text-white mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <button
            onClick={() => {
              const newItems = { ...items };
              (Object.keys(newItems) as ItemType[]).forEach((type) => {
                newItems[type] = 0;
              });
              setItems(newItems);
              setFullTrackNotice(null);
            }}
            className="px-3 py-2 bg-red-800 hover:bg-red-700 text-red-300 rounded-lg text-sm font-bold transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4">
        <h3 className="text-lg font-bold text-white mb-2">Hoard Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-400">
              {items.Boot + items.Bag + items.Coin}
            </div>
            <div className="text-gray-400">Command Items</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">
              {items.Sword + items.Hammer + items.Crossbow + items.Tea}
            </div>
            <div className="text-gray-400">Prowess Items</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {Object.values(items).reduce((sum, count) => sum + count, 0)}
            </div>
            <div className="text-gray-400">Total Items</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{commandStat + prowessStat}</div>
            <div className="text-gray-400">Total Stats</div>
          </div>
        </div>
      </div>
    </div>
  );
}
