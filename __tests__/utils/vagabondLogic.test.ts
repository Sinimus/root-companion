import {
  VagabondItem,
  VagabondItemType,
  VAGABOND_CHARACTERS,
  startingItems,
  refreshCount,
  refresh,
  drawCount,
  itemLimit,
  itemLoad,
  maxRolledHits,
  repairHammerId,
  repair,
  rest,
  trackItemIds,
} from '@/utils/vagabondLogic';

const item = (
  id: string,
  type: VagabondItemType,
  exhausted = false,
  damaged = false,
): VagabondItem => ({ id, type, exhausted, damaged });

describe('Vagabond logic', () => {
  describe('starting items (Law Appendix V)', () => {
    it('gives each character its own set', () => {
      expect(VAGABOND_CHARACTERS.Thief).toEqual(['Boot', 'Torch', 'Tea', 'Sword']);
      expect(VAGABOND_CHARACTERS.Arbiter).toEqual(['Boot', 'Torch', 'Sword', 'Sword']);
      expect(VAGABOND_CHARACTERS.Vagrant).toEqual(['Coin', 'Torch', 'Boot']);
      expect(Object.keys(VAGABOND_CHARACTERS)).toHaveLength(12);
    });

    it('starts every item face up and undamaged (9.3.5)', () => {
      startingItems('Tinker').forEach((i) => {
        expect(i.exhausted).toBe(false);
        expect(i.damaged).toBe(false);
      });
    });
  });

  describe('refresh (9.4.1)', () => {
    it('counts only face-up tea on the track', () => {
      expect(
        refreshCount([item('1', 'Tea'), item('2', 'Tea', true), item('3', 'Tea', false, true)]),
      ).toBe(5);
      expect(refreshCount([item('1', 'Sword')])).toBe(3);
    });

    it('does not count tea flipped up during the refresh itself', () => {
      const items = [
        item('t', 'Tea', true),
        item('a', 'Boot', true),
        item('b', 'Boot', true),
        item('c', 'Sword', true),
        item('d', 'Torch', true),
      ];
      const after = refresh(items);
      expect(after.filter((i) => !i.exhausted)).toHaveLength(3);
    });

    it('leaves damaged items in the Damaged box', () => {
      const after = refresh([item('1', 'Sword', true, true)]);
      expect(after[0]).toEqual(item('1', 'Sword', false, true));
    });
  });

  describe('evening (9.6)', () => {
    it('draws one card plus one per face-up coin on the track', () => {
      expect(drawCount([item('1', 'Coin'), item('2', 'Coin', true)])).toBe(2);
    });

    it('raises the item limit by two per face-up bag on the track', () => {
      expect(itemLimit([item('1', 'Bag'), item('2', 'Bag', true)])).toBe(8);
    });

    it('counts Satchel and Damaged box, not the tracks', () => {
      const items = [
        item('1', 'Bag'),
        item('2', 'Tea'),
        item('3', 'Sword'),
        item('4', 'Boot', true),
        item('5', 'Coin', false, true),
      ];
      expect(trackItemIds(items)).toEqual(new Set(['1', '2']));
      expect(itemLoad(items)).toBe(3);
    });

    it('holds at most three items per track (9.2.5.I)', () => {
      const teas = ['1', '2', '3', '4'].map((id) => item(id, 'Tea'));
      expect(trackItemIds(teas).size).toBe(3);
      expect(itemLoad(teas)).toBe(1);
    });

    it('rest returns damaged items face up', () => {
      expect(rest([item('1', 'Sword', true, true)])[0]).toEqual(item('1', 'Sword', false, false));
    });
  });

  describe('battle and repair', () => {
    it('caps rolled hits at undamaged swords, face up or down (9.2.6)', () => {
      expect(
        maxRolledHits([
          item('1', 'Sword'),
          item('2', 'Sword', true),
          item('3', 'Sword', false, true),
        ]),
      ).toBe(2);
    });

    it('repair exhausts a face-up hammer and keeps the item on its current side (9.5.7)', () => {
      const after = repair(
        [item('1', 'Boot', true, true), item('2', 'Hammer'), item('3', 'Sword')],
        '1',
      );
      expect(after[0]).toEqual(item('1', 'Boot', true, false));
      expect(after[1]).toEqual(item('2', 'Hammer', true, false));
      expect(after[2]).toEqual(item('3', 'Sword'));
    });

    it('repair without any hammer returns the same array', () => {
      const items = [item('1', 'Boot', true, true), item('2', 'Sword')];
      expect(repair(items, '1')).toBe(items);
    });

    it('repair with only an exhausted or only a damaged hammer returns the same array', () => {
      const exhaustedHammer = [item('1', 'Boot', true, true), item('2', 'Hammer', true)];
      expect(repair(exhaustedHammer, '1')).toBe(exhaustedHammer);

      const damagedHammer = [item('1', 'Boot', true, true), item('2', 'Hammer', false, true)];
      expect(repair(damagedHammer, '1')).toBe(damagedHammer);
    });

    it('a damaged hammer cannot repair itself, but another face-up hammer can (9.5.7)', () => {
      const alone = [item('1', 'Hammer', false, true)];
      expect(repair(alone, '1')).toBe(alone);

      const after = repair([item('1', 'Hammer', false, true), item('2', 'Hammer')], '1');
      expect(after[0]).toEqual(item('1', 'Hammer', false, false));
      expect(after[1]).toEqual(item('2', 'Hammer', true, false));
    });

    it('repairHammerId returns null when no usable hammer exists', () => {
      expect(repairHammerId([item('1', 'Boot')], '1')).toBeNull();
      expect(repairHammerId([item('1', 'Hammer', true), item('2', 'Boot')], '2')).toBeNull();
      expect(repairHammerId([item('1', 'Hammer', false, true), item('2', 'Boot')], '2')).toBeNull();
      expect(repairHammerId([item('1', 'Hammer'), item('2', 'Boot')], '2')).toBe('1');
    });
  });
});
