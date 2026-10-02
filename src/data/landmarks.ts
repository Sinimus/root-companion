import { ILandmark } from '@/types/engine';

// Card texts transcribed from the Leder Games card library (cards.ledergames.com),
// ROOT-138 to ROOT-151. General rules: Law A.5 and Appendix L.
export const LANDMARKS_DATA: ILandmark[] = [
  {
    id: 'ferry',
    name: 'The Ferry',
    setupText: 'Place the Ferry landmark in a clearing on the river. (On the lake map, place it in a coastal clearing.) It cannot have a landmark or be adjacent to one.',
    ruleText: 'Once per turn, when moving from a clearing with the Ferry, you may move to an adjacent river clearing, ignoring paths, moving the Ferry along with the moving pieces. (Follow normal move rules. On the lake map, move to another coastal clearing.) If faction pieces move, their player draws one card. (If multiple factions are moved at the same time, each of their players draws one card.)',
    gameplayEffect: 'Once per turn: ride the Ferry to another river/coastal clearing and draw 1 card. You must still rule the origin or destination.',
    icon: 'Ship'
  },
  {
    id: 'tower',
    name: 'The Tower',
    setupText: 'Place the Tower landmark in a clearing that has a ruin. It cannot have a landmark. (On the mountain map without the landmark cards, the Tower goes in the central clearing, the Pass.)',
    ruleText: 'At the end of a player\'s Evening, if they rule the Tower\'s clearing, they score one point.',
    gameplayEffect: 'End of Evening: Ruler scores 1 VP',
    icon: 'Building'
  },
  {
    id: 'elder-treetop',
    name: 'Elder Treetop',
    setupText: 'Not recommended for two-player games. Place the Elder Treetop landmark in a corner clearing. It cannot have a landmark or be adjacent to one.',
    ruleText: 'The Elder Treetop adds a building slot to its clearing. Whenever a player removes an enemy building from the Elder Treetop slot, they score an extra point. (Two in total, not one.)',
    gameplayEffect: 'Extra building slot. Removing an enemy building from it scores 2 VP in total.',
    icon: 'Trees'
  },
  {
    id: 'black-market',
    name: 'Black Market',
    setupText: 'Place the Black Market landmark in a clearing that has exactly one building slot and no ruin. It cannot have a landmark or be adjacent to one. Draw three cards but do not look at them. Place them face down next to the Black Market card.',
    ruleText: 'Once on their turn, a player with faction pieces at the Black Market may swap any one facedown card next to the Black Market with a card from their hand, placing it face down.',
    gameplayEffect: 'Once per turn: blind swap of one hand card with one of the 3 face-down cards',
    icon: 'Store'
  },
  {
    id: 'legendary-forge',
    name: 'Legendary Forge',
    setupText: 'Place the Legendary Forge landmark in a clearing. It cannot have a landmark or be adjacent to one. Remove items from the item supply onto the card, based on the suit of the Forge\'s clearing. Fox: 2 Swords, Crossbow, Hammer. Mouse: 2 Bags, 2 Tea. Rabbit: 2 Boots, 2 Coins.',
    ruleText: 'To craft an item on this card, you must have a faction piece at the Legendary Forge. (You still follow normal crafting rules.) Whenever you craft an item on this card, draw a card and score an extra point. (Score it even if you have Disdain or Contempt for Trade.)',
    gameplayEffect: 'Items on the card need a piece at the Forge to craft; crafting one gives +1 card and +1 VP',
    icon: 'Hammer'
  },
  {
    id: 'lost-city',
    name: 'Lost City',
    setupText: 'Place the Lost City landmark in a clearing on the river. (On the lake map, place it in a coastal clearing.) It cannot have a landmark or be adjacent to one.',
    ruleText: 'The Lost City\'s clearing is treated as being fox, mouse, and rabbit suit. (With two crafting pieces here, one can be fox and one mouse. The Duchy counts it once for sway. Attacker and defender can ambush with different suits.)',
    gameplayEffect: 'Clearing treated as all suits (Fox/Mouse/Rabbit)',
    icon: 'MapPin'
  }
];

// Items moved from the item supply onto the Legendary Forge card at setup,
// by the suit of the Forge's clearing (ROOT-146)
export const LEGENDARY_FORGE_ITEMS: Record<'fox' | 'mouse' | 'rabbit', string[]> = {
  fox: ['Sword', 'Sword', 'Crossbow', 'Hammer'],
  mouse: ['Bag', 'Bag', 'Tea', 'Tea'],
  rabbit: ['Boot', 'Boot', 'Coin', 'Coin'],
};

// Helper function to get landmark by ID
export function getLandmarkById(id: string): ILandmark | undefined {
  return LANDMARKS_DATA.find(landmark => landmark.id === id);
}

// Helper function to get random landmarks (for game setup)
export function getRandomLandmarks(count: number): ILandmark[] {
  const shuffled = [...LANDMARKS_DATA].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}