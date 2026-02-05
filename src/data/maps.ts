import { Suit } from '@/types/engine';

export interface IClearingDef {
  id: number;
  x: number; // 0-100 coordinates
  y: number; // 0-100 coordinates
  defaultSuit: Suit;
  slots: number;
  hasRuin?: boolean;
  isCoastal?: boolean; // For Lake Map
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

export const WINTER_MAP: IMapDef = {
  ...AUTUMN_MAP,
  id: 'winter',
  name: 'Winter Map'
};

export const LAKE_MAP: IMapDef = {
  id: 'lake',
  name: 'Lake Map',
  clearings: [
    { id: 1, x: 15, y: 15, defaultSuit: 'fox', slots: 1, isCoastal: true },
    { id: 2, x: 50, y: 10, defaultSuit: 'rabbit', slots: 2, isCoastal: true },
    { id: 3, x: 85, y: 15, defaultSuit: 'mouse', slots: 2, isCoastal: true },
    { id: 4, x: 10, y: 50, defaultSuit: 'mouse', slots: 2, isCoastal: true },
    { id: 5, x: 90, y: 50, defaultSuit: 'rabbit', slots: 2, isCoastal: true },
    { id: 6, x: 15, y: 85, defaultSuit: 'rabbit', slots: 1, isCoastal: true },
    { id: 7, x: 50, y: 90, defaultSuit: 'fox', slots: 2, isCoastal: true },
    { id: 8, x: 85, y: 85, defaultSuit: 'mouse', slots: 2, isCoastal: true },
    { id: 9, x: 30, y: 35, defaultSuit: 'fox', slots: 1, hasRuin: true },
    { id: 10, x: 70, y: 35, defaultSuit: 'mouse', slots: 1, hasRuin: true },
    { id: 11, x: 30, y: 65, defaultSuit: 'mouse', slots: 1, hasRuin: true },
    { id: 12, x: 70, y: 65, defaultSuit: 'fox', slots: 1, hasRuin: true },
  ],
  paths: [
    { from: 1, to: 2 }, { from: 1, to: 4 }, { from: 1, to: 9 },
    { from: 2, to: 3 }, { from: 2, to: 10 },
    { from: 3, to: 5 }, { from: 3, to: 10 },
    { from: 4, to: 6 }, { from: 4, to: 11 },
    { from: 5, to: 8 }, { from: 5, to: 12 },
    { from: 6, to: 7 }, { from: 6, to: 11 },
    { from: 7, to: 8 }, { from: 7, to: 12 },
    { from: 8, to: 12 },
    { from: 9, to: 10 }, { from: 9, to: 11 },
    { from: 10, to: 12 },
    { from: 11, to: 12 }
  ]
};

export const MOUNTAIN_MAP: IMapDef = {
  id: 'mountain',
  name: 'Mountain Map',
  clearings: [
    { id: 1, x: 15, y: 15, defaultSuit: 'fox', slots: 1 },
    { id: 2, x: 50, y: 15, defaultSuit: 'rabbit', slots: 2 },
    { id: 3, x: 85, y: 15, defaultSuit: 'mouse', slots: 2 },
    { id: 4, x: 15, y: 50, defaultSuit: 'mouse', slots: 2 },
    { id: 5, x: 50, y: 50, defaultSuit: 'bird', slots: 1, isPass: true }, // The Pass
    { id: 6, x: 85, y: 50, defaultSuit: 'rabbit', slots: 2 },
    { id: 7, x: 15, y: 85, defaultSuit: 'rabbit', slots: 1 },
    { id: 8, x: 50, y: 85, defaultSuit: 'fox', slots: 2 },
    { id: 9, x: 85, y: 85, defaultSuit: 'mouse', slots: 2 },
    { id: 10, x: 30, y: 30, defaultSuit: 'fox', slots: 1, hasRuin: true },
    { id: 11, x: 70, y: 30, defaultSuit: 'mouse', slots: 1, hasRuin: true },
    { id: 12, x: 50, y: 70, defaultSuit: 'rabbit', slots: 1, hasRuin: true },
  ],
  paths: [
    { from: 1, to: 2, isClosed: true }, { from: 1, to: 4, isClosed: true },
    { from: 2, to: 3, isClosed: true }, { from: 2, to: 5 },
    { from: 3, to: 6, isClosed: true },
    { from: 4, to: 5 }, { from: 4, to: 7, isClosed: true },
    { from: 5, to: 6 }, { from: 5, to: 8 },
    { from: 6, to: 9, isClosed: true },
    { from: 7, to: 8, isClosed: true },
    { from: 8, to: 9, isClosed: true },
    { from: 10, to: 1 }, { from: 10, to: 5 },
    { from: 11, to: 3 }, { from: 11, to: 5 },
    { from: 12, to: 8 }, { from: 12, to: 5 },
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