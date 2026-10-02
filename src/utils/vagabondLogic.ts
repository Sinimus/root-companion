// Vagabond item rules, Law of Root 9.2.5 to 9.2.7, 9.4.1, 9.5.7, 9.6 and Appendix V.

export type VagabondItemType = 'Sword' | 'Crossbow' | 'Hammer' | 'Torch' | 'Tea' | 'Coin' | 'Boot' | 'Bag';

export interface VagabondItem {
  id: string;
  type: VagabondItemType;
  exhausted: boolean; // Face down (9.2.5)
  damaged: boolean; // In the Damaged box (9.2.7)
}

export const ITEM_TYPES: VagabondItemType[] = ['Boot', 'Sword', 'Torch', 'Crossbow', 'Hammer', 'Tea', 'Coin', 'Bag'];

// Tea, Coins and Bags sit on tracks while face up and undamaged (9.2.5.I)
export const TRACK_TYPES: VagabondItemType[] = ['Tea', 'Coin', 'Bag'];
const TRACK_SIZE = 3;

// Starting items by character, Law V.1 to V.12
export const VAGABOND_CHARACTERS: Record<string, VagabondItemType[]> = {
  Thief: ['Boot', 'Torch', 'Tea', 'Sword'],
  Tinker: ['Boot', 'Torch', 'Bag', 'Hammer'],
  Ranger: ['Boot', 'Torch', 'Crossbow', 'Sword'],
  Vagrant: ['Coin', 'Torch', 'Boot'],
  Arbiter: ['Boot', 'Torch', 'Sword', 'Sword'],
  Scoundrel: ['Boot', 'Boot', 'Torch', 'Crossbow'],
  Adventurer: ['Boot', 'Torch', 'Hammer'],
  Harrier: ['Coin', 'Torch', 'Sword', 'Crossbow'],
  Ronin: ['Boot', 'Boot', 'Torch', 'Sword'],
  Cheat: ['Boot', 'Tea', 'Crossbow', 'Torch'],
  Gladiator: ['Boot', 'Torch', 'Hammer'],
  Jailor: ['Boot', 'Crossbow', 'Torch'],
};

export function startingItems(character: string): VagabondItem[] {
  return (VAGABOND_CHARACTERS[character] ?? []).map((type, index) => ({
    id: `start-${index}`,
    type,
    exhausted: false,
    damaged: false,
  }));
}

// Ids of the items on tracks: face up, undamaged, at most three per track
export function trackItemIds(items: VagabondItem[]): Set<string> {
  const ids = new Set<string>();
  TRACK_TYPES.forEach(type => {
    items
      .filter(item => item.type === type && !item.exhausted && !item.damaged)
      .slice(0, TRACK_SIZE)
      .forEach(item => ids.add(item.id));
  });
  return ids;
}

function countOnTrack(items: VagabondItem[], type: VagabondItemType): number {
  const onTrack = trackItemIds(items);
  return items.filter(item => item.type === type && onTrack.has(item.id)).length;
}

// 9.4.1: two per face-up Tea on its track, then three more
export function refreshCount(items: VagabondItem[]): number {
  return 2 * countOnTrack(items, 'Tea') + 3;
}

// Flips exhausted items face up, undamaged items first
export function refresh(items: VagabondItem[]): VagabondItem[] {
  const candidates = [
    ...items.filter(item => item.exhausted && !item.damaged),
    ...items.filter(item => item.exhausted && item.damaged),
  ].slice(0, refreshCount(items));
  const ids = new Set(candidates.map(item => item.id));
  return items.map(item => (ids.has(item.id) ? { ...item, exhausted: false } : item));
}

// 9.6.2: one card plus one per face-up Coin on its track
export function drawCount(items: VagabondItem[]): number {
  return 1 + countOnTrack(items, 'Coin');
}

// 9.6.4: six plus two per face-up Bag on its track
export function itemLimit(items: VagabondItem[]): number {
  return 6 + 2 * countOnTrack(items, 'Bag');
}

// 9.6.4 counts the Satchel and the Damaged box; items on tracks do not count
export function itemLoad(items: VagabondItem[]): number {
  return items.length - trackItemIds(items).size;
}

// 9.2.6: maximum rolled hits equals undamaged Swords, face up or face down
export function maxRolledHits(items: VagabondItem[]): number {
  return items.filter(item => item.type === 'Sword' && !item.damaged).length;
}

// 9.5.7: a repaired item keeps its current side
export function repair(items: VagabondItem[], itemId: string): VagabondItem[] {
  return items.map(item => (item.id === itemId ? { ...item, damaged: false } : item));
}

// 9.6.1: in a forest, all damaged items return to the Satchel face up
export function rest(items: VagabondItem[]): VagabondItem[] {
  return items.map(item => (item.damaged ? { ...item, damaged: false, exhausted: false } : item));
}
