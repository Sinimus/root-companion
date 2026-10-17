// Map setup, Law of Root A.1.

import { DEFAULT_SUITS } from '@/data/maps';
import { Suit } from '@/types/engine';

// A.1: on a variant map (Appendix M: Winter, Lake, Mountain) the 12 suit markers are always
// shuffled face down and dealt one per clearing; on Autumn they are optional
export function dealsRandomSuits(mapId: string, randomSuitsChosen: boolean): boolean {
  return randomSuitsChosen || mapId !== 'autumn';
}

// A.1: shuffle the 12 suit markers (Fisher-Yates) and deal one per clearing,
// in id order 1..12. The random source can be injected for tests.
export function dealSuitMarkers(random: () => number = Math.random): Record<number, Suit> {
  const deck = [...DEFAULT_SUITS];
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  const mapping: Record<number, Suit> = {};
  deck.forEach((suit, i) => {
    mapping[i + 1] = suit;
  });
  return mapping;
}
