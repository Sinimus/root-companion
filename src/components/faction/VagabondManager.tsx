"use client";

import React, { useState, useEffect } from 'react';
import { Backpack, Hammer, RefreshCw, AlertTriangle, Plus, Trees } from 'lucide-react';
import {
  VagabondItem, VagabondItemType, ITEM_TYPES, VAGABOND_CHARACTERS, startingItems, trackItemIds,
  refreshCount, refresh, drawCount, itemLimit, itemLoad, maxRolledHits, repair, rest
} from '@/utils/vagabondLogic';

interface VagabondManagerProps {
  factionId: string;
}

// Items saved before the Law Oct 2025 update carried a single `state` field
interface LegacyItem {
  id: string;
  type: VagabondItemType;
  state?: 'ready' | 'exhausted' | 'damaged';
  exhausted?: boolean;
  damaged?: boolean;
}

const migrate = (saved: LegacyItem[]): VagabondItem[] =>
  saved.map(item => ({
    id: item.id,
    type: item.type,
    exhausted: item.exhausted ?? item.state === 'exhausted',
    damaged: item.damaged ?? item.state === 'damaged',
  }));

const ITEM_ICONS: Record<VagabondItemType, string> = {
  Sword: '⚔️',
  Crossbow: '🏹',
  Hammer: '🔨',
  Torch: '🔦',
  Tea: '🫖',
  Coin: '🪙',
  Boot: '👢',
  Bag: '🎒'
};

export function VagabondManager({ factionId }: VagabondManagerProps) {
  const [items, setItems] = useState<VagabondItem[]>([]);
  const [character, setCharacter] = useState('');
  const [newItemType, setNewItemType] = useState<VagabondItemType>('Boot');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load state from localStorage
  useEffect(() => {
    const savedItems = localStorage.getItem(`root_vagabond_items_${factionId}`);
    const savedCharacter = localStorage.getItem(`root_vagabond_character_${factionId}`);

    if (savedItems) setItems(migrate(JSON.parse(savedItems)));
    if (savedCharacter) setCharacter(savedCharacter);
    setIsLoaded(true);
  }, [factionId]);

  // Save state to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem(`root_vagabond_items_${factionId}`, JSON.stringify(items));
    localStorage.setItem(`root_vagabond_character_${factionId}`, character);
  }, [items, character, factionId, isLoaded]);

  const onTrack = trackItemIds(items);
  const trackItems = items.filter(item => onTrack.has(item.id));
  const satchelItems = items.filter(item => !onTrack.has(item.id) && !item.damaged);
  const damagedItems = items.filter(item => item.damaged);
  const exhaustedCount = items.filter(item => item.exhausted).length;
  const limit = itemLimit(items);
  const load = itemLoad(items);

  const chooseCharacter = (name: string) => {
    setCharacter(name);
    setItems(startingItems(name));
  };

  const update = (itemId: string, change: Partial<VagabondItem>) => {
    setItems(prev => prev.map(item => (item.id === itemId ? { ...item, ...change } : item)));
  };

  const addItem = () => {
    setItems(prev => [...prev, { id: Date.now().toString(), type: newItemType, exhausted: false, damaged: false }]);
  };

  const removeItem = (itemId: string) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
  };

  const ItemRow = ({ item }: { item: VagabondItem }) => (
    <div
      className={`
        flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer
        ${item.exhausted
          ? 'bg-orange-900/20 border-orange-800/50 hover:bg-orange-900/30'
          : 'bg-green-900/20 border-green-800/50 hover:bg-green-900/30'
        }
      `}
      onClick={() => update(item.id, { exhausted: !item.exhausted })}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{ITEM_ICONS[item.type]}</span>
        <div>
          <div className="text-white font-bold">{item.type}</div>
          <div className={`
            text-xs px-2 py-0.5 rounded inline-block
            ${item.exhausted ? 'bg-orange-800/50 text-orange-300' : 'bg-green-800/50 text-green-300'}
          `}>
            {item.exhausted ? 'EXHAUSTED' : 'READY'}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            update(item.id, { damaged: true });
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
  );

  return (
    <div className="max-w-2xl mx-auto mb-6 space-y-4">

      {/* Header */}
      <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Backpack className="w-6 h-6 text-amber-500" />
            Vagabond Inventory
          </h2>
          <div className="text-sm">
            <span className="text-gray-400">Satchel + Damaged: </span>
            <span className={`font-bold ${load > limit ? 'text-red-400' : 'text-white'}`}>{load}/{limit}</span>
          </div>
        </div>

        {/* Character (Law 9.3.1, starting items from Appendix V) */}
        <div className="flex items-center gap-2 text-sm">
          <label htmlFor="vagabond-character" className="text-gray-400">Character:</label>
          <select
            id="vagabond-character"
            value={character}
            onChange={e => chooseCharacter(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-white"
          >
            <option value="" disabled>Choose to take starting items</option>
            {Object.keys(VAGABOND_CHARACTERS).map(name => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>

        {/* Derived values */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs text-gray-400">
          <div className="bg-gray-800/50 rounded p-2">
            <div className="text-lg font-bold text-white">{refreshCount(items)}</div>
            Birdsong refresh (2 per Tea on track + 3)
          </div>
          <div className="bg-gray-800/50 rounded p-2">
            <div className="text-lg font-bold text-white">{maxRolledHits(items)}</div>
            Max rolled hits (undamaged Swords)
          </div>
          <div className="bg-gray-800/50 rounded p-2">
            <div className="text-lg font-bold text-white">{drawCount(items)}</div>
            Evening draw (1 + Coins on track)
          </div>
        </div>

        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => setItems(rest(items))}
            disabled={damagedItems.length === 0}
            title="Evening, in a forest: all damaged items return to the Satchel face up"
            className={`
              px-3 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all
              ${damagedItems.length > 0
                ? 'bg-blue-700 hover:bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-600 cursor-not-allowed'
              }
            `}
          >
            <Trees className="w-4 h-4" />
            Rest in Forest
          </button>
          <button
            onClick={() => setItems(refresh(items))}
            disabled={exhaustedCount === 0}
            className={`
              px-3 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all
              ${exhaustedCount > 0
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-gray-800 text-gray-600 cursor-not-allowed'
              }
            `}
          >
            <RefreshCw className="w-4 h-4" />
            Refresh Items
          </button>
        </div>

        {load > limit && (
          <div className="flex items-center gap-2 text-red-400 text-sm font-bold">
            <AlertTriangle className="w-4 h-4" />
            Over the item limit: in Evening remove {load - limit} item(s) from the game.
          </div>
        )}
      </div>

      {/* Tracks */}
      <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4">
        <h3 className="text-lg font-bold text-white mb-1">Tracks</h3>
        <p className="text-xs text-gray-500 mb-3">Face-up Tea, Coins and Bags. They do not count toward the item limit.</p>
        {trackItems.length === 0 ? (
          <p className="text-sm text-gray-500">No items on tracks</p>
        ) : (
          <div className="grid gap-2">
            {trackItems.map(item => <ItemRow key={item.id} item={item} />)}
          </div>
        )}
      </div>

      {/* Satchel */}
      <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-4">
        <h3 className="text-lg font-bold text-white mb-3">Satchel</h3>

        {satchelItems.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            <Backpack className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No items in satchel</p>
          </div>
        ) : (
          <div className="grid gap-2">
            {satchelItems.map(item => <ItemRow key={item.id} item={item} />)}
          </div>
        )}

        <div className="mt-3 flex gap-2">
          <select
            aria-label="Item type"
            value={newItemType}
            onChange={e => setNewItemType(e.target.value as VagabondItemType)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-2 text-white text-sm"
          >
            {ITEM_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <button
            onClick={addItem}
            className="flex-1 px-3 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-gray-400 transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Item
          </button>
        </div>
      </div>

      {/* Damaged Items */}
      {damagedItems.length > 0 && (
        <div className="bg-red-900/20 border border-red-800/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <h3 className="text-lg font-bold text-red-400">Damaged Box</h3>
          </div>

          <div className="grid gap-2">
            {damagedItems.map(item => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 bg-red-900/10 border border-red-800/30 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl opacity-50">{ITEM_ICONS[item.type]}</span>
                  <div>
                    <div className="text-red-300 font-bold">{item.type}</div>
                    <div className="text-xs bg-red-800/50 text-red-300 px-2 py-0.5 rounded inline-block">
                      DAMAGED{item.exhausted ? ' · EXHAUSTED' : ''}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setItems(repair(items, item.id))}
                  title="Exhaust a Hammer. The repaired item keeps its current side."
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
