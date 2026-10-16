// Hireling control markers, Law of Root H.1.2 and H.1.3.

export interface ActiveHireling {
  id: string;
  markers: number;
  isPromoted: boolean;
  gainedThisTurn: boolean; // Exempt from the end-of-turn decay (H.1.3)
}

export type ActiveHirelings = Record<string, ActiveHireling>;

// One placeholder marker; the player sets it to their control die roll (H.1.2)
export function newActiveHireling(id: string): ActiveHireling {
  return { id, markers: 1, isPromoted: true, gainedThisTurn: true };
}

// First sentence of H.1.3: remove one marker from each hireling gained on a previous turn
export function endTurnDecay(hirelings: ActiveHirelings): ActiveHirelings {
  const decayed: ActiveHirelings = {};
  Object.entries(hirelings).forEach(([id, hireling]) => {
    decayed[id] = hireling.gainedThisTurn
      ? { ...hireling, gainedThisTurn: false }
      : { ...hireling, markers: Math.max(0, hireling.markers - 1) };
  });
  return decayed;
}

// Second sentence of H.1.3: with no markers left, pass the card on with a hireling marker
export function hirelingsToPassOn(hirelings: ActiveHirelings): string[] {
  return Object.entries(hirelings)
    .filter(([, hireling]) => hireling.markers === 0)
    .map(([id]) => id);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

// A stored hireling object: markers is required, the flags are optional
type StoredHireling = { markers: number; isPromoted?: boolean; gainedThisTurn?: boolean };

function isStoredHireling(value: unknown): value is StoredHireling {
  return (
    isRecord(value) &&
    typeof value.markers === 'number' &&
    (value.isPromoted === undefined || typeof value.isPromoted === 'boolean') &&
    (value.gainedThisTurn === undefined || typeof value.gainedThisTurn === 'boolean')
  );
}

// Reads what the page saved: the old Record<string, number> or the current objects
export function migrateStoredHirelings(parsed: unknown): ActiveHirelings {
  if (!isRecord(parsed)) return {};

  const migrated: ActiveHirelings = {};
  Object.entries(parsed).forEach(([id, value]) => {
    if (typeof value === 'number') {
      migrated[id] = { id, markers: value, isPromoted: true, gainedThisTurn: false };
    } else if (isStoredHireling(value)) {
      migrated[id] = {
        id,
        markers: value.markers,
        isPromoted: value.isPromoted ?? true,
        gainedThisTurn: value.gainedThisTurn ?? false,
      };
    }
    // Anything else is not a stored hireling; skip it
  });
  return migrated;
}
