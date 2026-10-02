/**
 * @author Sinimus <sinimus@noreply>
 * @license AGPL-3.0
 * @description Part of Root Companion App
 */

import { FACTIONS_DATA, IFaction } from '@/data/factions';

// Faction setup card draft, Law of Root A.8.2 and A.8.3.
// All cards are dealt face up to a shared pool: one militant first, then one
// card per player. Players choose from the pool; nobody holds cards in hand.
export interface AdSetState {
  pool: string[]; // Faction ids in deal order
  lockedFactionId: string | null; // Last card dealt, if an insurgent (A.8.2.II)
}

export interface AdSetOptions {
  excludedFactionIds?: string[]; // Omitted factions (A.8.1) or replaced by a hireling (A.6.5)
  includeSecondVagabond?: boolean; // A.8.1 recommends one Vagabond card
  random?: () => number;
}

const SECOND_VAGABOND_ID = 'vagabond_2';

function shuffle<T>(items: readonly T[], random: () => number): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function generateAdSetState(playerCount: number, options: AdSetOptions = {}): AdSetState {
  const { excludedFactionIds = [], includeSecondVagabond = false, random = Math.random } = options;

  if (playerCount < 2 || playerCount > 4) {
    throw new Error(`Invalid player count: ${playerCount}. AdSet supports 2-4 players.`);
  }

  const available = FACTIONS_DATA.filter(f =>
    !excludedFactionIds.includes(f.id) &&
    (includeSecondVagabond || f.id !== SECOND_VAGABOND_ID)
  );

  const militants = shuffle(available.filter(f => f.type === 'militant'), random);
  const firstMilitant = militants[0];
  if (!firstMilitant) {
    throw new Error('No militant factions available for the pool');
  }

  // A.8.2.I: with two players the insurgent cards are removed before dealing
  const insurgents = playerCount === 2 ? [] : available.filter(f => f.type === 'insurgent');
  const rest = shuffle([...militants.slice(1), ...insurgents], random);
  if (rest.length < playerCount) {
    throw new Error(`Not enough faction setup cards for ${playerCount} players`);
  }

  const dealt = rest.slice(0, playerCount);
  const last = dealt[dealt.length - 1];

  return {
    pool: [firstMilitant.id, ...dealt.map(f => f.id)],
    lockedFactionId: last.type === 'insurgent' ? last.id : null
  };
}

export function getFactionById(id: string): IFaction | undefined {
  return FACTIONS_DATA.find(f => f.id === id);
}

// A.8.2.II: the locked insurgent cannot be chosen until a militant faction has been chosen
export function isChoosable(state: AdSetState, factionId: string, chosenFactionIds: string[]): boolean {
  if (!state.pool.includes(factionId)) return false;
  if (factionId !== state.lockedFactionId) return true;
  return chosenFactionIds.some(id => getFactionById(id)?.type === 'militant');
}

export function chooseFaction(state: AdSetState, factionId: string): AdSetState {
  return {
    ...state,
    pool: state.pool.filter(id => id !== factionId)
  };
}

// A.8.3: starting with the last player in turn order and going counterclockwise
export function draftOrder(playerCount: number): number[] {
  return Array.from({ length: playerCount }, (_, i) => playerCount - 1 - i);
}
