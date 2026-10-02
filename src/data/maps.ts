import { Suit } from '@/types/engine';

export interface IClearingDef {
  id: number;
  x: number; // 0-100 coordinates
  y: number; // 0-100 coordinates
  defaultSuit: Suit;
  slots: number;
  hasRuin?: boolean;
  isCoastal?: boolean; // For Lake Map
  ferryStart?: boolean; // For Lake Map: corner clearing where the Ferry starts
  isPass?: boolean; // For Mountain Map
}

export interface IPathDef {
  from: number;
  to: number;
  river?: boolean;
  isClosed?: boolean; // For Mountain Map
}

export interface IMapDef {
  id: string;
  name: string;
  clearings: IClearingDef[];
  paths: IPathDef[];
}

export const AUTUMN_MAP: IMapDef = {
  id: 'autumn',
  name: 'Autumn Map',
  clearings: [
    { id: 1, x: 15, y: 15, defaultSuit: 'fox', slots: 1, hasRuin: true },
    { id: 2, x: 50, y: 12, defaultSuit: 'rabbit', slots: 2 },
    { id: 3, x: 85, y: 15, defaultSuit: 'mouse', slots: 2 },
    { id: 4, x: 12, y: 45, defaultSuit: 'mouse', slots: 2 },
    { id: 5, x: 45, y: 45, defaultSuit: 'fox', slots: 1, hasRuin: true },
    { id: 6, x: 88, y: 42, defaultSuit: 'rabbit', slots: 2 },
    { id: 7, x: 12, y: 75, defaultSuit: 'rabbit', slots: 1, hasRuin: true },
    { id: 8, x: 50, y: 65, defaultSuit: 'mouse', slots: 2 },
    { id: 9, x: 88, y: 72, defaultSuit: 'fox', slots: 2 },
    { id: 10, x: 25, y: 88, defaultSuit: 'fox', slots: 2 },
    { id: 11, x: 55, y: 88, defaultSuit: 'rabbit', slots: 1, hasRuin: true },
    { id: 12, x: 85, y: 88, defaultSuit: 'mouse', slots: 2 },
  ],
  paths: [
    { from: 1, to: 2 }, { from: 1, to: 4 },
    { from: 2, to: 3 }, { from: 2, to: 5 },
    { from: 3, to: 6 },
    { from: 4, to: 5 }, { from: 4, to: 7 },
    { from: 5, to: 6 }, { from: 5, to: 8 },
    { from: 6, to: 9 },
    { from: 7, to: 8 }, { from: 7, to: 10 },
    { from: 8, to: 9 }, { from: 8, to: 11 },
    { from: 9, to: 12 },
    { from: 10, to: 11 },
    { from: 11, to: 12 }
  ]
};

// Winter map: the reverse side of the Autumn board, with its own layout.
// Clearings, paths, river and ruins are read from the map picture in the base
// Learn to Play (p. 23). The board prints no suits: suit markers are always
// dealt at random (Law A.1), so defaultSuit is only a placeholder.
// Law M.2.1: the river divides forests as printed paths do.
export const WINTER_MAP: IMapDef = {
  id: 'winter',
  name: 'Winter Map',
  clearings: [
    { id: 1, x: 13, y: 13, defaultSuit: 'fox', slots: 1 },
    { id: 2, x: 39, y: 18, defaultSuit: 'rabbit', slots: 2 },
    { id: 3, x: 61, y: 24, defaultSuit: 'mouse', slots: 2 },
    { id: 4, x: 88, y: 23, defaultSuit: 'fox', slots: 1 },
    { id: 5, x: 15, y: 42, defaultSuit: 'mouse', slots: 1 },
    { id: 6, x: 36, y: 50, defaultSuit: 'rabbit', slots: 2, hasRuin: true },
    { id: 7, x: 62, y: 47, defaultSuit: 'fox', slots: 2, hasRuin: true },
    { id: 8, x: 93, y: 61, defaultSuit: 'mouse', slots: 1 },
    { id: 9, x: 15, y: 81, defaultSuit: 'rabbit', slots: 1 },
    { id: 10, x: 38, y: 87, defaultSuit: 'mouse', slots: 1, hasRuin: true },
    { id: 11, x: 59, y: 74, defaultSuit: 'fox', slots: 1, hasRuin: true },
    { id: 12, x: 85, y: 87, defaultSuit: 'rabbit', slots: 2 },
  ],
  paths: [
    { from: 1, to: 2 }, { from: 2, to: 3 }, { from: 3, to: 4 },
    { from: 1, to: 5 }, { from: 1, to: 6 },
    { from: 4, to: 7 }, { from: 4, to: 8 },
    { from: 5, to: 9 },
    { from: 6, to: 9 }, { from: 6, to: 10 },
    { from: 7, to: 11 }, { from: 7, to: 12 },
    { from: 8, to: 12 },
    { from: 9, to: 10 }, { from: 10, to: 11 }, { from: 11, to: 12 },
    { from: 5, to: 6, river: true }, { from: 6, to: 7, river: true }, { from: 7, to: 8, river: true },
  ]
};

// Lake map: clearings, paths and the suggested suits are read from the map
// picture in the Underworld Learn to Play (p. 6). Coastal clearings touch the
// lake (Law M.3.3); the Ferry starts in the coastal corner clearing (M.3.1).
// Only the ruin in clearing 5 is legible in the picture; the map has four.
export const LAKE_MAP: IMapDef = {
  id: 'lake',
  name: 'Lake Map',
  clearings: [
    { id: 1, x: 16, y: 20, defaultSuit: 'fox', slots: 1 },
    { id: 2, x: 46, y: 16, defaultSuit: 'mouse', slots: 1 },
    { id: 3, x: 67, y: 26, defaultSuit: 'fox', slots: 1 },
    { id: 4, x: 87, y: 34, defaultSuit: 'rabbit', slots: 1 },
    { id: 5, x: 32, y: 37, defaultSuit: 'mouse', slots: 2, hasRuin: true, isCoastal: true },
    { id: 6, x: 13, y: 51, defaultSuit: 'rabbit', slots: 1 },
    { id: 7, x: 64, y: 49, defaultSuit: 'rabbit', slots: 2, isCoastal: true },
    { id: 8, x: 84, y: 59, defaultSuit: 'mouse', slots: 2 },
    { id: 9, x: 33, y: 67, defaultSuit: 'rabbit', slots: 2, isCoastal: true },
    { id: 10, x: 13, y: 83, defaultSuit: 'mouse', slots: 1 },
    { id: 11, x: 43, y: 87, defaultSuit: 'fox', slots: 1 },
    { id: 12, x: 84, y: 80, defaultSuit: 'fox', slots: 2, isCoastal: true, ferryStart: true },
  ],
  paths: [
    { from: 1, to: 2 }, { from: 1, to: 5 }, { from: 1, to: 6 },
    { from: 2, to: 3 }, { from: 2, to: 5 }, { from: 2, to: 7 },
    { from: 3, to: 4 }, { from: 3, to: 7 },
    { from: 4, to: 8 },
    { from: 5, to: 6 },
    { from: 6, to: 10 },
    { from: 7, to: 8 },
    { from: 8, to: 12 },
    { from: 9, to: 10 }, { from: 9, to: 11 },
    { from: 10, to: 11 },
    { from: 11, to: 12 }
  ]
};

// Mountain map: clearings, paths, closed paths and the suggested suits are read
// from the map picture in the Underworld Learn to Play (p. 7). Six paths start
// closed (Law M.4.1). Clearing 5 is the Pass, where the Tower stands (M.4.4).
// Ruins are legible in clearings 5 and 8 only; the map has four.
export const MOUNTAIN_MAP: IMapDef = {
  id: 'mountain',
  name: 'Mountain Map',
  clearings: [
    { id: 1, x: 11, y: 17, defaultSuit: 'fox', slots: 1 },
    { id: 2, x: 53, y: 16, defaultSuit: 'mouse', slots: 1 },
    { id: 3, x: 81, y: 22, defaultSuit: 'rabbit', slots: 2 },
    { id: 4, x: 29, y: 34, defaultSuit: 'rabbit', slots: 3 },
    { id: 5, x: 49, y: 40, defaultSuit: 'fox', slots: 2, hasRuin: true, isPass: true }, // The Pass
    { id: 6, x: 9, y: 57, defaultSuit: 'rabbit', slots: 1 },
    { id: 7, x: 89, y: 51, defaultSuit: 'mouse', slots: 1 },
    { id: 8, x: 61, y: 63, defaultSuit: 'mouse', slots: 2, hasRuin: true },
    { id: 9, x: 33, y: 67, defaultSuit: 'fox', slots: 2 },
    { id: 10, x: 13, y: 82, defaultSuit: 'mouse', slots: 2 },
    { id: 11, x: 55, y: 86, defaultSuit: 'rabbit', slots: 1 },
    { id: 12, x: 84, y: 79, defaultSuit: 'fox', slots: 1 },
  ],
  paths: [
    { from: 1, to: 4 }, { from: 1, to: 6 },
    { from: 2, to: 5 }, { from: 2, to: 8 },
    { from: 3, to: 7 }, { from: 3, to: 8 },
    { from: 4, to: 5 }, { from: 4, to: 9 },
    { from: 5, to: 8 }, { from: 5, to: 9 },
    { from: 6, to: 10 },
    { from: 7, to: 12 },
    { from: 8, to: 12 },
    { from: 9, to: 10 }, { from: 9, to: 11 },
    { from: 2, to: 3, isClosed: true }, { from: 2, to: 4, isClosed: true },
    { from: 4, to: 6, isClosed: true },
    { from: 7, to: 8, isClosed: true }, { from: 8, to: 9, isClosed: true },
    { from: 11, to: 12, isClosed: true },
  ]
};

export const MAPS: Record<string, IMapDef> = {
  autumn: AUTUMN_MAP,
  winter: WINTER_MAP,
  lake: LAKE_MAP,
  mountain: MOUNTAIN_MAP
};

export const DEFAULT_SUITS: Suit[] = [
  'fox', 'fox', 'fox', 'fox', 
  'rabbit', 'rabbit', 'rabbit', 'rabbit', 
  'mouse', 'mouse', 'mouse', 'mouse'
];