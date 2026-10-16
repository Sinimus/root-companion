import {
  type Hoard,
  COMMAND_ITEMS,
  PROWESS_ITEMS,
  addItem,
  hoardStat,
  trackCount,
  trackOf,
} from '@/utils/hoardLogic';

const emptyHoard = (): Hoard => ({
  Boot: 0,
  Bag: 0,
  Coin: 0,
  Sword: 0,
  Hammer: 0,
  Crossbow: 0,
  Tea: 0,
});

describe('Hoard logic (Law of Root 14.2.4)', () => {
  it('assigns each item type to its track', () => {
    expect(trackOf('Boot')).toBe(COMMAND_ITEMS);
    expect(trackOf('Bag')).toBe(COMMAND_ITEMS);
    expect(trackOf('Coin')).toBe(COMMAND_ITEMS);
    expect(trackOf('Sword')).toBe(PROWESS_ITEMS);
    expect(trackOf('Hammer')).toBe(PROWESS_ITEMS);
    expect(trackOf('Crossbow')).toBe(PROWESS_ITEMS);
    expect(trackOf('Tea')).toBe(PROWESS_ITEMS);
  });

  it('counts the items of a track', () => {
    const hoard: Hoard = { ...emptyHoard(), Boot: 2, Coin: 1, Sword: 3 };
    expect(trackCount(hoard, COMMAND_ITEMS)).toBe(3);
    expect(trackCount(hoard, PROWESS_ITEMS)).toBe(3);
  });

  it('steps the track stat with the item count (14.2.4.II)', () => {
    const command = (boots: number): Hoard => ({ ...emptyHoard(), Boot: boots });
    expect(hoardStat(command(0), COMMAND_ITEMS)).toBe(1);
    expect(hoardStat(command(1), COMMAND_ITEMS)).toBe(2);
    expect(hoardStat(command(2), COMMAND_ITEMS)).toBe(2);
    expect(hoardStat(command(3), COMMAND_ITEMS)).toBe(3);
    expect(hoardStat(command(4), COMMAND_ITEMS)).toBe(4);

    const prowess = (swords: number): Hoard => ({ ...emptyHoard(), Sword: swords });
    expect(hoardStat(prowess(0), PROWESS_ITEMS)).toBe(1);
    expect(hoardStat(prowess(1), PROWESS_ITEMS)).toBe(2);
    expect(hoardStat(prowess(2), PROWESS_ITEMS)).toBe(2);
    expect(hoardStat(prowess(3), PROWESS_ITEMS)).toBe(3);
    expect(hoardStat(prowess(4), PROWESS_ITEMS)).toBe(4);
  });

  it('adds a gained item to its track (14.2.4.I)', () => {
    const command = addItem(emptyHoard(), 'Boot');
    expect(command.trackFull).toBe(false);
    expect(command.hoard.Boot).toBe(1);
    expect(trackCount(command.hoard, COMMAND_ITEMS)).toBe(1);
    expect(trackCount(command.hoard, PROWESS_ITEMS)).toBe(0);

    const prowess = addItem(emptyHoard(), 'Tea');
    expect(prowess.trackFull).toBe(false);
    expect(prowess.hoard.Tea).toBe(1);
    expect(trackCount(prowess.hoard, PROWESS_ITEMS)).toBe(1);
  });

  it('refuses a fifth item on a full track and returns the hoard unchanged (14.2.4.I)', () => {
    const fullCommand: Hoard = { ...emptyHoard(), Boot: 2, Bag: 1, Coin: 1 };
    const command = addItem(fullCommand, 'Boot');
    expect(command.trackFull).toBe(true);
    expect(command.hoard).toBe(fullCommand);

    const fullProwess: Hoard = { ...emptyHoard(), Sword: 1, Hammer: 1, Crossbow: 1, Tea: 1 };
    const prowess = addItem(fullProwess, 'Sword');
    expect(prowess.trackFull).toBe(true);
    expect(prowess.hoard).toBe(fullProwess);
  });
});
