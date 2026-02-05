import { ILandmark } from '@/types/engine';

export const LANDMARKS_DATA: ILandmark[] = [
  {
    id: 'ferry',
    name: 'Ferry',
    setupText: 'Place the Ferry token in any corner clearing that is adjacent to the lake.',
    ruleText: 'When a player moves a piece from the Ferry clearing to another clearing adjacent to the lake, they may draw 1 card.',
    gameplayEffect: 'Move from Ferry along lake + Draw 1 card',
    icon: 'Ship'
  },
  {
    id: 'tower',
    name: 'Tower',
    setupText: 'Place the Tower token in a non-corner clearing.',
    ruleText: 'At the end of Evening, if you rule the clearing with the Tower, score 1 VP.',
    gameplayEffect: 'End of Evening: Ruler scores 1 VP',
    icon: 'Building'
  },
  {
    id: 'elder-treetop',
    name: 'Elder Treetop',
    setupText: 'Place the Elder Treetop token in a forest clearing.',
    ruleText: 'The clearing with Elder Treetop has 1 extra building slot. Whenever an opponent removes one of your buildings from the clearing with Elder Treetop, score 1 VP.',
    gameplayEffect: 'Extra building slot + 1 VP when enemy building removed',
    icon: 'Trees'
  },
  {
    id: 'black-market',
    name: 'Black Market',
    setupText: 'Place the Black Market token in a clearing. Create a Market Deck with 3 random cards facedown.',
    ruleText: 'Once per turn on your turn, you may spend 1 card to look at the top card of the Market Deck and swap it with a card from your hand (without showing it to other players).',
    gameplayEffect: 'Blind card swap: Spend 1 card to look at and swap top Market Deck card',
    icon: 'Store'
  },
  {
    id: 'legendary-forge',
    name: 'Legendary Forge',
    setupText: 'Place the Legendary Forge token in a clearing.',
    ruleText: 'When you craft an item that costs 2 or more wood, you may score 1 VP. Items crafted at the Forge cannot be ruined or exhausted by battle.',
    gameplayEffect: 'Craft 2+ wood items + Score 1 VP + Items protected from battle',
    icon: 'Hammer'
  },
  {
    id: 'lost-city',
    name: 'Lost City',
    setupText: 'Place the Lost City token in a clearing.',
    ruleText: 'The clearing with Lost City is treated as all suits (Fox, Mouse, Rabbit) for crafting, movement, and other effects.',
    gameplayEffect: 'Clearing treated as all suits (Fox/Mouse/Rabbit)',
    icon: 'MapPin'
  }
];

// Helper function to get landmark by ID
export function getLandmarkById(id: string): ILandmark | undefined {
  return LANDMARKS_DATA.find(landmark => landmark.id === id);
}

// Helper function to get random landmarks (for game setup)
export function getRandomLandmarks(count: number): ILandmark[] {
  const shuffled = [...LANDMARKS_DATA].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}