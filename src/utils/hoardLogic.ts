// Lord's Hoard, Law of Root 14.2.4 (item tracks of the Lord of the Hundreds).

export type ItemType = 'Boot' | 'Bag' | 'Coin' | 'Sword' | 'Hammer' | 'Crossbow' | 'Tea';

export type Hoard = Record<ItemType, number>;

export const COMMAND_ITEMS: ItemType[] = ['Boot', 'Bag', 'Coin'];
export const PROWESS_ITEMS: ItemType[] = ['Sword', 'Hammer', 'Crossbow', 'Tea'];
export const TRACK_SIZE = 4;

export function trackOf(type: ItemType): ItemType[] {
  return COMMAND_ITEMS.includes(type) ? COMMAND_ITEMS : PROWESS_ITEMS;
}

export function trackCount(hoard: Hoard, track: ItemType[]): number {
  return track.reduce((sum, type) => sum + hoard[type], 0);
}

// Law 14.2.4.II: no items = 1, one or two items = 2, three items = 3, four items = 4
export function hoardStat(hoard: Hoard, track: ItemType[]): number {
  const totalItems = trackCount(hoard, track);
  if (totalItems === 0) return 1;
  if (totalItems <= 2) return 2;
  if (totalItems === 3) return 3;
  return 4;
}

// Law 14.2.4.I: a gained item goes to the leftmost empty space of its track; a full
// track cannot take it (the gained item or an item on that track must be removed instead)
export function addItem(hoard: Hoard, type: ItemType): { hoard: Hoard; trackFull: boolean } {
  if (trackCount(hoard, trackOf(type)) >= TRACK_SIZE) {
    return { hoard, trackFull: true };
  }
  return { hoard: { ...hoard, [type]: hoard[type] + 1 }, trackFull: false };
}
