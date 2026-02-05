/**
 * @author Sinimus <sinimus@noreply>
 * @license AGPL-3.0
 * @description Part of Root Companion App
 */

import { FACTIONS_DATA, IFaction } from '@/data/factions';

export interface AdSetState {
  poolFaction: string;
  playerFactions: string[];
}

export function generateAdSetState(playerCount: number): AdSetState {
  const militantFactions = FACTIONS_DATA.filter(f => f.type === 'militant');
  const allFactions = FACTIONS_DATA;

  if (playerCount < 2 || playerCount > 4) {
    throw new Error(`Invalid player count: ${playerCount}. AdSet supports 2-4 players.`);
  }

  // 2 players: Only militant factions
  if (playerCount === 2) {
    if (militantFactions.length < 2) {
      throw new Error('Not enough militant factions for 2-player game');
    }

    // Shuffle militant factions and assign to players
    const shuffledMilitants = [...militantFactions].sort(() => Math.random() - 0.5);
    const playerFactions = shuffledMilitants.slice(0, 2);

    return {
      poolFaction: shuffledMilitants.length > 2 ? shuffledMilitants[2].id : '',
      playerFactions: playerFactions.map(f => f.id)
    };
  }

  // 3+ players: 1 militant to pool, then distribute remaining
  const shuffledMilitants = [...militantFactions].sort(() => Math.random() - 0.5);

  // Take 1 militant for the pool
  const poolMilitant = shuffledMilitants[0];
  if (!poolMilitant) {
    throw new Error('No militant factions available for pool');
  }

  // Remaining militant factions + all insurgent factions
  const remainingFactions = [
    ...shuffledMilitants.slice(1),
    ...allFactions.filter(f => f.type === 'insurgent')
  ];

  // Shuffle all remaining factions
  const shuffledRemaining = remainingFactions.sort(() => Math.random() - 0.5);

  // Deal factions to players
  const playerFactions = shuffledRemaining.slice(0, playerCount);

  return {
    poolFaction: poolMilitant.id,
    playerFactions: playerFactions.map(f => f.id)
  };
}

export function getFactionById(id: string): IFaction | undefined {
  return FACTIONS_DATA.find(f => f.id === id);
}

export function simulateDraftTurns(
  initialState: AdSetState,
  playerCount: number
): Array<{playerIndex: number; poolChoice: string; handChoice: string}> {
  const turns: Array<{playerIndex: number; poolChoice: string; handChoice: string}> = [];
  const currentState = { 
    ...initialState,
    playerFactions: [...initialState.playerFactions]
  };

  // Start from last player and go backwards (AdSet draft order)
  for (let i = playerCount - 1; i >= 0; i--) {
    const poolFaction = currentState.poolFaction;
    const handFaction = currentState.playerFactions[i];

    turns.push({
      playerIndex: i,
      poolChoice: poolFaction,
      handChoice: handFaction
    });

    // For simulation purposes, randomly choose one
    // In real implementation, this will be handled by user interaction
    const choosesPool = Math.random() > 0.5;

    if (choosesPool) {
      // Player takes pool faction, hand faction goes to pool
      currentState.playerFactions[i] = poolFaction;
      currentState.poolFaction = handFaction;
    }
    // else: player keeps hand faction, pool stays the same
  }

  return turns;
}