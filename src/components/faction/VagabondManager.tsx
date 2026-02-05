"use client";

import React, { useState, useEffect } from 'react';
import { Backpack, Hammer, RefreshCw, AlertTriangle, Plus, Minus } from 'lucide-react';

type ItemState = 'ready' | 'exhausted' | 'damaged';

interface VagabondItem {
  id: string;
  type: 'Sword' | 'Crossbow' | 'Hammer' | 'Torch' | 'Tea' | 'Coin' | 'Boot' | 'Bag';
  state: ItemState;
}

interface VagabondManagerProps {
  factionId: string;
}

export function VagabondManager({ factionId }: VagabondManagerProps) {
  const [items, setItems] = useState<VagabondItem[]>([
    { id: '1', type: 'Sword', state: 'ready' },
    { id: '2', type: 'Crossbow', state: 'ready' },
    { id: '3', type: 'Hammer', state: 'ready' },
    { id: '4', type: 'Torch', state: 'ready' },
    { id: '5', type: 'Tea', state: 'ready' },
    { id: '6', type: 'Tea', state: 'ready' },
  ]);

  const [bagCount, setBagCount] = useState(0);

  // Load state from localStorage
  useEffect(() => {
    const savedItems = localStorage.getItem(`root_vagabond_items_${factionId}`);
    const savedBags = localStorage.getItem(`root_vagabond_bags_${factionId}`);

    if (savedItems) setItems(JSON.parse(savedItems));
    if (savedBags) setBagCount(parseInt(savedBags));
  }, [factionId]);

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem(`root_vagabond_items_${factionId}`, JSON.stringify(items));
  }, [items, factionId]);

  useEffect(() => {
    localStorage.setItem(`root_vagabond_bags_${factionId}`, bagCount.toString());
  }, [bagCount, factionId]);

  const maxItems = 6 + (bagCount * 2);
  const readyItems = items.filter(item => item.state === 'ready');
  const exhaustedItems = items.filter(item => item.state === 'exhausted');
  const damagedItems = items.filter(item => item.state === 'damaged');
  const teaCount = items.filter(item => item.type === 'Tea' && item.state !== 'damaged').length;

  const toggleItemState = (itemId: string) => {
    setItems(prev => prev.map(item => {
      if (item.id === itemId) {
        if (item.state === 'ready') {
          return { ...item, state: 'exhausted' };
        } else if (item.state === 'exhausted') {
          return { ...item, state: 'ready' };
        }
      }
      return item;
    }));
  };

  const damageItem = (itemId: string) => {
    setItems(prev => prev.map(item =>
      item.id === itemId ? { ...item, state: 'damaged' } : item
    ));
  };

  const repairItem = (itemId: string) => {
    setItems(prev => prev.map(item =>
      item.id === itemId ? { ...item, state: 'ready' } : item
    ));
  };

  const refreshItems = () => {
    const refreshCount = 3 + (teaCount * 2);
    const toRefresh = exhaustedItems.slice(0, refreshCount);

    setItems(prev => {
      const refreshed = new Set(toRefresh.map(item => item.id));
      return prev.map(item =>
        refreshed.has(item.id) ? { ...item, state: 'ready' } : item
      );
    });
  };

  const addItem = () => {
    if (items.length < maxItems) {
      const newItem: VagabondItem = {
        id: Date.now().toString(),
        type: 'Coin', // Default type
        state: 'ready'
      };
      setItems(prev => [...prev, newItem]);
    }
  };

  const removeItem = (itemId: string) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
  };

  const getItemIcon = (type: VagabondItem['type']) => {
    const iconMap = {
      Sword: '⚔️',
      Crossbow: '🏹',
      Hammer: '🔨',
      Torch: '🔦',
      Tea: '🫖',
      Coin: '🪙',
      Boot: '👢',
      Bag: '🎒'
    };
    return iconMap[type] || '📦';
  };

  return (
    <div className="max-w-2xl mx-auto mb-6 space-y-4">

      {/* Header */}
      <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Backpack className="w-6 h-6 text-amber-500" />
            Vagabond Inventory
          </h2>
          <div className="flex items-center gap-4">
            <div className="text-sm">
              <span className="text-gray-400">Items: </span>
              <span className="text-white font-bold">{items.length}/{maxItems}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setBagCount(Math.max(0, bagCount - 1))}
                className="p-1 bg-gray-800 hover:bg-gray-700 rounded text-gray-400"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-white font-bold">Bags: {bagCount}</span>
              <button
                onClick={() => setBagCount(bagCount + 1)}
                className="p-1 bg-gray-800 hover:bg-gray-700 rounded text-gray-400"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Refresh Button */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-400">
            Birdsong: Refresh {3 + (teaCount * 2)} items (3 + 2 per Tea)
          </div>
          <button
            onClick={refreshItems}
            disabled={exhaustedItems.length === 0}
            className={`
              px-3 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all
              ${exhaustedItems.length > 0
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-gray-800 text-gray-600 cursor-not-allowed'
              }
            `}
          >
            <RefreshCw className="w-4 h-4" />
            Refresh Items
          </button>
        </div>
      </div>

      {/* Satchel & Ready/Exhausted Items */}
      <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4">
        <h3 className="text-lg font-bold text-white mb-3">Satchel & Tracks</h3>

        {readyItems.length === 0 && exhaustedItems.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Backpack className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No items in satchel</p>
            <button
              onClick={addItem}
              disabled={items.length >= maxItems}
              className="mt-2 px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded text-sm"
            >
              Add Item
            </button>
          </div>
        ) : (
          <div className="grid gap-2">
            {[...readyItems, ...exhaustedItems].map(item => (
              <div
                key={item.id}
                className={`
                  flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer
                  ${item.state === 'ready'
                    ? 'bg-green-900/20 border-green-800/50 hover:bg-green-900/30'
                    : 'bg-orange-900/20 border-orange-800/50 hover:bg-orange-900/30'
                  }
                `}
                onClick={() => toggleItemState(item.id)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getItemIcon(item.type)}</span>
                  <div>
                    <div className="text-white font-bold">{item.type}</div>
                    <div className={`
                      text-xs px-2 py-0.5 rounded inline-block
                      ${item.state === 'ready'
                        ? 'bg-green-800/50 text-green-300'
                        : 'bg-orange-800/50 text-orange-300'
                      }
                    `}>
                      {item.state.toUpperCase()}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      damageItem(item.id);
                    }}
                    className="px-2 py-1 bg-red-800 hover:bg-red-700 text-red-300 rounded text-sm"
                  >
                    Damage
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeItem(item.id);
                    }}
                    className="px-2 py-1 bg-gray-800 hover:bg-gray-700 text-gray-400 rounded text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {items.length < maxItems && (
          <button
            onClick={addItem}
            className="mt-3 w-full px-3 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-gray-400 transition-colors"
          >
            Add Item to Satchel
          </button>
        )}
      </div>

      {/* Damaged Items */}
      {damagedItems.length > 0 && (
        <div className="bg-red-900/20 border border-red-800/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <h3 className="text-lg font-bold text-red-400">Damaged Items</h3>
          </div>

          <div className="grid gap-2">
            {damagedItems.map(item => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 bg-red-900/10 border border-red-800/30 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl opacity-50">{getItemIcon(item.type)}</span>
                  <div>
                    <div className="text-red-300 font-bold">{item.type}</div>
                    <div className="text-xs bg-red-800/50 text-red-300 px-2 py-0.5 rounded">
                      DAMAGED
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => repairItem(item.id)}
                  className="px-3 py-1 bg-blue-800 hover:bg-blue-700 text-blue-300 rounded text-sm flex items-center gap-1"
                >
                  <Hammer className="w-4 h-4" />
                  Repair
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}