import { dealsRandomSuits } from '@/utils/setupLogic';

describe('Map setup (Law A.1)', () => {
  it('always deals random suit markers on the variant maps', () => {
    ['winter', 'lake', 'mountain'].forEach((mapId) => {
      expect(dealsRandomSuits(mapId, false)).toBe(true);
    });
  });

  it('uses the printed suits on Autumn unless random suits are chosen', () => {
    expect(dealsRandomSuits('autumn', false)).toBe(false);
    expect(dealsRandomSuits('autumn', true)).toBe(true);
  });
});
