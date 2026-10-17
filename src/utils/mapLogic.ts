// Pure helpers over the map definitions, used by map preparation (Law A.1, M.1-M.4).

import { IClearingDef, IMapDef } from '@/data/maps';
import { Suit } from '@/types/engine';

const ALL_SUITS: Suit[] = ['fox', 'rabbit', 'mouse', 'bird'];

/** The ids of the corner clearings, ascending (Law setup texts place pieces there). */
export function cornerClearingIds(map: IMapDef): number[] {
  return map.clearings
    .filter((c) => c.isCorner)
    .map((c) => c.id)
    .sort((a, b) => a - b);
}

/** The suit of a clearing: the dealt marker if present, the printed suit otherwise. */
export function suitOf(clearing: IClearingDef, suitMapping?: Record<number, Suit>): Suit {
  return suitMapping?.[clearing.id] ?? clearing.defaultSuit;
}

/** Clearing ids per suit, ascending; all four suit keys are always present. */
export function clearingsBySuit(
  map: IMapDef,
  suitMapping?: Record<number, Suit>,
): Record<Suit, number[]> {
  const bySuit = { fox: [], rabbit: [], mouse: [], bird: [] } as Record<Suit, number[]>;
  map.clearings.forEach((c) => bySuit[suitOf(c, suitMapping)].push(c.id));
  ALL_SUITS.forEach((suit) => bySuit[suit].sort((a, b) => a - b));
  return bySuit;
}
