"use client";

import React, { useState, useEffect } from 'react';
import { Package, Sword, Hammer, Target, Coffee, Coins, Briefcase, Plus, Minus } from 'lucide-react';

type ItemType = 'Boot' | 'Bag' | 'Coin' | 'Sword' | 'Hammer' | 'Crossbow' | 'Tea';

interface HundredsHoardProps {
  factionId: string;
}

export function HundredsHoard({ factionId }: HundredsHoardProps) {
  const [items, setItems] = useState<Record<ItemType, number>>({
    Boot: 0,
    Bag: 0,
    Coin: 0,
    Sword: 0,
    Hammer: 0,
    Crossbow: 0,
    Tea: 0,
  });

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

  // Calculate stats based on rules 14.2.4
  const calculateStat = (itemTypes: ItemType[]) => {
    const totalItems = itemTypes.reduce((sum, type) => sum + items[type], 0);
    if (totalItems === 0) return 0;
    if (totalItems === 1) return 1;
    if (totalItems === 2) return 2;
    if (totalItems === 3) return 3;
    return 4; // 4+ items
  };

  const commandStat = calculateStat(['Boot', 'Bag', 'Coin']);
  const prowessStat = calculateStat(['Sword', 'Hammer', 'Crossbow', 'Tea']);

  const updateItemCount = (type: ItemType, delta: number) => {
    setItems(prev => ({
      ...prev,
      [type]: Math.max(0, prev[type] + delta)
    }));
  };

  const getItemIcon = (type: ItemType) => {
    const iconMap = {
      Boot: <Package className="w-5 h-5" />,
      Bag: <Briefcase className="w-5 h-5" />,
      Coin: <Coins className="w-5 h-5" />,
      Sword: <Sword className="w-5 h-5" />,
      Hammer: <Hammer className="w-5 h-5" />,
      Crossbow: <Target className="w-5 h-5" />,
      Tea: <Coffee className="w-5 h-5" />
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
      Tea: 'text-orange-400'
    };
    return colorMap[type];
  };

  const StatDisplay = ({ label, value, color }: { label: string; value: number; color: string }) => (
    <div className={`
      text-center p-4 rounded-xl border-2
      ${color === 'blue'
        ? 'bg-blue-900/20 border-blue-800/50'
        : 'bg-purple-900/20 border-purple-800/50'
      }
    `}>
      <div className={`text-3xl font-bold ${color === 'blue' ? 'text-blue-400' : 'text-purple-400'}`}>
        {value}
      </div>
      <div className={`text-sm font-bold mt-1 ${color === 'blue' ? 'text-blue-300' : 'text-purple-300'}`}>
        {label}
      </div>
    </div>
  );

  const ItemPanel = ({
    title,
    items: panelItems,
    statColor
  }: {
    title: string;
    items: ItemType[];
    statColor: 'blue' | 'purple';
  }) => (
    <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4">
      <h3 className="text-lg font-bold text-white mb-4">{title}</h3>
      <div className="space-y-3">
        {panelItems.map(type => (
          <div key={type} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 bg-gray-800 rounded ${getItemColor(type)}`}>
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
                  ${items[type] > 0
                    ? 'bg-red-800 hover:bg-red-700 text-red-300'
                    : 'bg-gray-800 text-gray-600 cursor-not-allowed'
                  }
                `}
              >
                <Minus className="w-4 h-4" />
              </button>

              <span className="text-xl font-bold text-white min-w-[3rem] text-center">
                {items[type]}
              </span>

              <button
                onClick={() => updateItemCount(type, 1)}
                className="p-1 bg-green-800 hover:bg-green-700 text-green-300 rounded transition-colors"
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
          Stats calculated from item counts: 1-2 items = 1-2 stat, 3 items = 3 stat, 4+ items = 4 stat (Rule 14.2.4)
        </div>
      </div>

      {/* Item Panels */}
      <div className="grid md:grid-cols-2 gap-4">
        <ItemPanel
          title="Command Items"
          items={['Boot', 'Bag', 'Coin']}
          statColor="blue"
        />
        <ItemPanel
          title="Prowess Items"
          items={['Sword', 'Hammer', 'Crossbow', 'Tea']}
          statColor="purple"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4">
        <h3 className="text-lg font-bold text-white mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <button
            onClick={() => {
              const newItems = { ...items };
              (Object.keys(newItems) as ItemType[]).forEach(type => {
                newItems[type] = 0;
              });
              setItems(newItems);
            }}
            className="px-3 py-2 bg-red-800 hover:bg-red-700 text-red-300 rounded-lg text-sm font-bold transition-colors"
          >
            Clear All
          </button>
          <button
            onClick={() => {
              setItems({
                Boot: 2,
                Bag: 1,
                Coin: 3,
                Sword: 2,
                Hammer: 1,
                Crossbow: 2,
                Tea: 1,
              });
            }}
            className="px-3 py-2 bg-blue-800 hover:bg-blue-700 text-blue-300 rounded-lg text-sm font-bold transition-colors"
          >
            Sample Setup
          </button>
          <button
            onClick={() => {
              const newItems = { ...items };
              (Object.keys(newItems) as ItemType[]).forEach(type => {
                newItems[type] = Math.min(4, newItems[type] + 1);
              });
              setItems(newItems);
            }}
            className="px-3 py-2 bg-green-800 hover:bg-green-700 text-green-300 rounded-lg text-sm font-bold transition-colors"
          >
            Add 1 to All
          </button>
          <button
            onClick={() => {
              setItems({
                Boot: 4,
                Bag: 4,
                Coin: 4,
                Sword: 4,
                Hammer: 4,
                Crossbow: 4,
                Tea: 4,
              });
            }}
            className="px-3 py-2 bg-purple-800 hover:bg-purple-700 text-purple-300 rounded-lg text-sm font-bold transition-colors"
          >
            Max All (4)
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
            <div className="text-2xl font-bold text-green-400">
              {commandStat + prowessStat}
            </div>
            <div className="text-gray-400">Total Stats</div>
          </div>
        </div>
      </div>

    </div>
  );
}