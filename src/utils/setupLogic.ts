// Map setup, Law of Root A.1.

// A.1: on a variant map (Appendix M: Winter, Lake, Mountain) the 12 suit markers are always
// shuffled face down and dealt one per clearing; on Autumn they are optional
export function dealsRandomSuits(mapId: string, randomSuitsChosen: boolean): boolean {
  return randomSuitsChosen || mapId !== 'autumn';
}
