"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { LANDMARKS_DATA } from '@/data/landmarks';
import { ILandmark } from '@/types/engine';
import { ArrowLeft, MapPin, Ship, Building, Trees, Store, Hammer, Plus, Minus, Shuffle, Eye, EyeOff } from 'lucide-react';

interface LandmarkManagerProps {}

export function LandmarkManager({}: LandmarkManagerProps) {
  const [selectedLandmarks, setSelectedLandmarks] = useState<string[]>([]);
  const [blackMarketDeck, setBlackMarketDeck] = useState<string[]>([]);
  const [showMarketDeck, setShowMarketDeck] = useState(false);
  const [legendaryForgeItems, setLegendaryForgeItems] = useState<string[]>([]);

  // Load state from localStorage
  useEffect(() => {
    try {
      const savedLandmarks = localStorage.getItem('root_landmarks_selected');
      const savedDeck = localStorage.getItem('root_landmarks_blackmarket');
      const savedForge = localStorage.getItem('root_landmarks_forge');
      const savedVisibility = localStorage.getItem('root_landmarks_showmarket');

      if (savedLandmarks) setSelectedLandmarks(JSON.parse(savedLandmarks));
      if (savedDeck) setBlackMarketDeck(JSON.parse(savedDeck));
      if (savedForge) setLegendaryForgeItems(JSON.parse(savedForge));
      if (savedVisibility) setShowMarketDeck(JSON.parse(savedVisibility));
    } catch (e) {
      console.error('Error loading landmarks data:', e);
    }
  }, []);

  // Save selected landmarks to localStorage
  useEffect(() => {
    localStorage.setItem('root_landmarks_selected', JSON.stringify(selectedLandmarks));
  }, [selectedLandmarks]);

  // Save black market deck to localStorage
  useEffect(() => {
    localStorage.setItem('root_landmarks_blackmarket', JSON.stringify(blackMarketDeck));
  }, [blackMarketDeck]);

  // Save legendary forge items to localStorage
  useEffect(() => {
    localStorage.setItem('root_landmarks_forge', JSON.stringify(legendaryForgeItems));
  }, [legendaryForgeItems]);

  // Save market deck visibility to localStorage
  useEffect(() => {
    localStorage.setItem('root_landmarks_showmarket', JSON.stringify(showMarketDeck));
  }, [showMarketDeck]);

  // Icon mapping for landmarks
  const ICON_MAP = {
    Ship,
    Building,
    Trees,
    Store,
    Hammer,
    MapPin,
  };

  const toggleLandmark = (landmarkId: string) => {
    setSelectedLandmarks(prev => {
      if (prev.includes(landmarkId)) {
        // If removing Black Market, clear its deck
        if (landmarkId === 'black-market') {
          setBlackMarketDeck([]);
        }
        // If removing Legendary Forge, clear its items
        if (landmarkId === 'legendary-forge') {
          setLegendaryForgeItems([]);
        }
        return prev.filter(id => id !== landmarkId);
      } else {
        // If adding Black Market, initialize its deck
        if (landmarkId === 'black-market') {
          initializeBlackMarket();
        }
        // If adding Legendary Forge, initialize it
        if (landmarkId === 'legendary-forge') {
          initializeLegendaryForge();
        }
        return [...prev, landmarkId];
      }
    });
  };

  const initializeBlackMarket = () => {
    // Simulate creating a 3-card market deck (in a real game, these would be random cards)
    setBlackMarketDeck(['🎴', '🎴', '🎴']);
  };

  const initializeLegendaryForge = () => {
    // Start with empty forge - items will be added as they are crafted
    setLegendaryForgeItems([]);
  };

  const addForgeItem = (item: string) => {
    setLegendaryForgeItems(prev => [...prev, item]);
  };

  const removeForgeItem = (index: number) => {
    setLegendaryForgeItems(prev => prev.filter((_, i) => i !== index));
  };

  const getIcon = (iconName: string) => {
    return ICON_MAP[iconName as keyof typeof ICON_MAP] || MapPin;
  };

  const randomizeLandmarks = () => {
    const shuffled = [...LANDMARKS_DATA].sort(() => Math.random() - 0.5);
    const randomCount = Math.floor(Math.random() * 2) + 1; // 1-2 landmarks
    const newSelection = shuffled.slice(0, randomCount).map(l => l.id);

    setSelectedLandmarks(newSelection);

    // Initialize Black Market deck if selected
    if (newSelection.includes('black-market')) {
      initializeBlackMarket();
    } else {
      setBlackMarketDeck([]);
    }
  };

  const removeBlackMarketCard = () => {
    setBlackMarketDeck(prev => prev.slice(0, -1));
  };

  return (
    <main className="min-h-screen bg-[#0a0c10] text-white p-4 pb-20 pt-20">
      {/* Header */}
      <div className="absolute top-6 left-6 z-40">
        <Link href="/" className="text-gray-500 hover:text-white flex items-center gap-2 transition-colors font-medium">
          <ArrowLeft className="w-5 h-5" /> Menu
        </Link>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-white mb-2 flex items-center justify-center gap-3">
            <MapPin className="w-8 h-8 text-amber-400" />
            Landmarks Manager
          </h1>
          <p className="text-gray-400">Select and manage Marauder Expansion landmarks</p>
        </div>

        {/* Controls */}
        <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">Selected: {selectedLandmarks.length} landmarks</span>
              <button
                onClick={randomizeLandmarks}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <Shuffle className="w-4 h-4" />
                Random Select (1-2)
              </button>
            </div>
            {selectedLandmarks.length > 0 && (
              <button
                onClick={() => setSelectedLandmarks([])}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Available Landmarks */}
        <div className="space-y-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Available Landmarks</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {LANDMARKS_DATA.map(landmark => {
              const Icon = getIcon(landmark.icon || 'MapPin');
              const isSelected = selectedLandmarks.includes(landmark.id);

              return (
                <div
                  key={landmark.id}
                  onClick={() => toggleLandmark(landmark.id)}
                  className={`
                    p-6 rounded-xl border-2 cursor-pointer transition-all
                    ${isSelected
                      ? 'bg-amber-900/20 border-amber-600/50 shadow-lg shadow-amber-500/20'
                      : 'bg-gray-900/60 border-gray-800 hover:border-gray-600 hover:bg-gray-900/80'
                    }
                  `}
                >
                  <div className="flex items-start gap-4">
                    <div className={`
                      p-3 rounded-lg transition-colors
                      ${isSelected ? 'bg-amber-800/50 text-amber-300' : 'bg-gray-800 text-gray-400'}
                    `}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-white">{landmark.name}</h3>
                        <span className={`
                          text-xs px-2 py-1 rounded-full font-medium
                          ${isSelected
                            ? 'bg-amber-600 text-white'
                            : 'bg-gray-700 text-gray-300'
                          }
                        `}>
                          {isSelected ? 'Selected' : 'Available'}
                        </span>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-bold text-amber-400 mb-1">Setup</h4>
                          <p className="text-sm text-gray-300">{landmark.setupText}</p>
                        </div>

                        <div>
                          <h4 className="text-sm font-bold text-blue-400 mb-1">Rule</h4>
                          <p className="text-sm text-gray-300">{landmark.ruleText}</p>
                        </div>

                        {landmark.gameplayEffect && (
                          <div>
                            <h4 className="text-sm font-bold text-green-400 mb-1">Effect</h4>
                            <p className="text-xs text-gray-400 italic">{landmark.gameplayEffect}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Landmarks */}
        {selectedLandmarks.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4">Selected Landmarks</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {selectedLandmarks.map(landmarkId => {
                const landmark = LANDMARKS_DATA.find(l => l.id === landmarkId);
                if (!landmark) return null;

                const Icon = getIcon(landmark.icon || 'MapPin');

                return (
                  <div key={landmarkId} className="bg-gradient-to-br from-amber-900/20 to-amber-800/10 border border-amber-600/50 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-amber-800/50 rounded-lg">
                        <Icon className="w-5 h-5 text-amber-300" />
                      </div>
                      <h3 className="text-lg font-bold text-amber-200">{landmark.name}</h3>
                    </div>

                    {/* Special Black Market Tracker */}
                    {landmarkId === 'black-market' && (
                      <div className="bg-gray-800/50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-bold text-amber-300">Market Deck</h4>
                          <button
                            onClick={() => setShowMarketDeck(!showMarketDeck)}
                            className="text-amber-400 hover:text-amber-300 transition-colors"
                          >
                            {showMarketDeck ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">Cards remaining:</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => removeBlackMarketCard()}
                              disabled={blackMarketDeck.length === 0}
                              className={`
                                p-1 rounded transition-colors
                                ${blackMarketDeck.length > 0
                                  ? 'bg-red-800 hover:bg-red-700 text-red-300'
                                  : 'bg-gray-800 text-gray-600 cursor-not-allowed'
                                }
                              `}
                            >
                              <Minus className="w-4 h-4" />
                            </button>

                            <span className="font-bold text-lg text-white min-w-[3rem] text-center">
                              {blackMarketDeck.length}
                            </span>

                            <button
                              onClick={() => setBlackMarketDeck(prev => [...prev, '🎴'])}
                              className="p-1 bg-green-800 hover:bg-green-700 text-green-300 rounded transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {showMarketDeck && (
                          <div className="mt-3 p-3 bg-gray-900/50 rounded-lg">
                            <div className="flex justify-center gap-2">
                              {blackMarketDeck.map((card, index) => (
                                <div key={index} className="text-2xl">
                                  🎴
                                </div>
                              ))}
                            </div>
                            <p className="text-xs text-gray-500 text-center mt-2">
                              Face down cards (hidden from players)
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Special Legendary Forge Tracker */}
                    {landmarkId === 'legendary-forge' && (
                      <div className="bg-gray-800/50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-bold text-orange-300">Legendary Forge Items</h4>
                          <span className="text-xs text-gray-500">Protected from battle</span>
                        </div>

                        <div className="mb-3">
                          <div className="text-sm text-gray-400 mb-2">Crafted Items (2+ wood cost):</div>

                          {legendaryForgeItems.length === 0 ? (
                            <div className="text-center py-3 bg-gray-900/30 rounded-lg">
                              <p className="text-xs text-gray-500 italic">No items crafted yet</p>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              {legendaryForgeItems.map((item, index) => (
                                <div key={index} className="flex items-center justify-between bg-gray-900/30 rounded-lg px-3 py-2">
                                  <span className="text-sm text-white">{item}</span>
                                  <button
                                    onClick={() => removeForgeItem(index)}
                                    className="p-1 bg-red-800 hover:bg-red-700 text-red-300 rounded transition-colors"
                                    title="Remove item"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="border-t border-gray-700 pt-3">
                          <div className="text-sm text-gray-400 mb-2">Add crafted item:</div>
                          <div className="grid grid-cols-2 gap-2">
                            {['Sword', 'Hammer', 'Boots', 'Crossbow', 'Tea', 'Coin', 'Bag', 'Torches'].map(item => (
                              <button
                                key={item}
                                onClick={() => addForgeItem(item)}
                                className="px-2 py-1 bg-orange-900/30 hover:bg-orange-800/40 text-orange-300 text-xs rounded transition-colors"
                              >
                                + {item}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}