export type Suit = 'bird' | 'fox' | 'rabbit' | 'mouse';
export type DeckType = 'standard' | 'exiles';
export type CardType = 'craft' | 'ambush' | 'dominance' | 'event';

export interface ICard {
  id: string;
  name: string;
  deck: DeckType[]; // Some cards might be in both if we consider structure, but usually decks are distinct physical products. We will list which deck includes this specific card design.
  suit: Suit;
  type: CardType;
  cost: string[]; // e.g. ['fox'] or ['rabbit', 'rabbit']
  effect: string;
  vp?: number;
  itemIcon?: string; // boot, sword, etc.
  totalInDeck?: number; // For deck peeping
}

export const CARDS_DB: ICard[] = [
  // --- SHARED / COMMON TYPES (Ambush & Dominance exist in structure of both, but legally are part of the deck used) ---
  // We will assign them to 'standard' primarily, but note they exist in Exiles too usually (or cover both).
  // Actually, Exiles & Partisans product contains its own Ambushes/Dominance? Yes.
  
  // AMBUSHES
  {
    id: 'ambush_bird',
    name: 'Ambush!',
    deck: ['standard', 'exiles'],
    suit: 'bird',
    type: 'ambush',
    cost: [],
    effect: 'Battle: Defender deals 2 hits immediately, then discards this card. Cancelled if attacker plays a matching Ambush.',
    totalInDeck: 2
  },
  {
    id: 'ambush_fox',
    name: 'Ambush!',
    deck: ['standard', 'exiles'],
    suit: 'fox',
    type: 'ambush',
    cost: [],
    effect: 'Battle: Defender deals 2 hits immediately, then discards this card. Cancelled if attacker plays a matching Ambush.',
    totalInDeck: 1
  },
  {
    id: 'ambush_rabbit',
    name: 'Ambush!',
    deck: ['standard', 'exiles'],
    suit: 'rabbit',
    type: 'ambush',
    cost: [],
    effect: 'Battle: Defender deals 2 hits immediately, then discards this card. Cancelled if attacker plays a matching Ambush.',
    totalInDeck: 1
  },
  {
    id: 'ambush_mouse',
    name: 'Ambush!',
    deck: ['standard', 'exiles'],
    suit: 'mouse',
    type: 'ambush',
    cost: [],
    effect: 'Battle: Defender deals 2 hits immediately, then discards this card. Cancelled if attacker plays a matching Ambush.',
    totalInDeck: 1
  },

  // DOMINANCE
  {
    id: 'dom_bird',
    name: 'Bird Dominance',
    deck: ['standard', 'exiles'],
    suit: 'bird',
    type: 'dominance',
    cost: [],
    effect: 'Rule 2 opposite corners at start of Birdsong to win. Spend to make available.',
    totalInDeck: 1
  },
  {
    id: 'dom_fox',
    name: 'Fox Dominance',
    deck: ['standard', 'exiles'],
    suit: 'fox',
    type: 'dominance',
    cost: [],
    effect: 'Rule 3 fox clearings at start of Birdsong to win. Spend to make available.',
    totalInDeck: 1
  },
  {
    id: 'dom_rabbit',
    name: 'Rabbit Dominance',
    deck: ['standard', 'exiles'],
    suit: 'rabbit',
    type: 'dominance',
    cost: [],
    effect: 'Rule 3 rabbit clearings at start of Birdsong to win. Spend to make available.',
    totalInDeck: 1
  },
  {
    id: 'dom_mouse',
    name: 'Mouse Dominance',
    deck: ['standard', 'exiles'],
    suit: 'mouse',
    type: 'dominance',
    cost: [],
    effect: 'Rule 3 mouse clearings at start of Birdsong to win. Spend to make available.',
    totalInDeck: 1
  },

  // --- STANDARD DECK UNIQUES ---
  
  // Favors
  {
    id: 'favor_fox',
    name: 'Favor of the Foxes',
    deck: ['standard'],
    suit: 'fox',
    type: 'event',
    cost: ['fox', 'fox', 'fox'],
    effect: 'Remove all enemy pieces in fox clearings.',
    totalInDeck: 1
  },
  {
    id: 'favor_rabbit',
    name: 'Favor of the Rabbits',
    deck: ['standard'],
    suit: 'rabbit',
    type: 'event',
    cost: ['rabbit', 'rabbit', 'rabbit'],
    effect: 'Remove all enemy pieces in rabbit clearings.',
    totalInDeck: 1
  },
  {
    id: 'favor_mouse',
    name: 'Favor of the Mice',
    deck: ['standard'],
    suit: 'mouse',
    type: 'event',
    cost: ['mouse', 'mouse', 'mouse'],
    effect: 'Remove all enemy pieces in mouse clearings.',
    totalInDeck: 1
  },

  // Improvements / Persistent
  {
    id: 'armorers',
    name: 'Armorers',
    deck: ['standard'],
    suit: 'fox',
    type: 'craft',
    cost: ['fox'],
    effect: 'In battle, may discard this card to ignore all rolled hits taken.',
    totalInDeck: 2
  },
  {
    id: 'sappers',
    name: 'Sappers',
    deck: ['standard'],
    suit: 'bird',
    type: 'craft',
    cost: ['mouse'],
    effect: 'In battle as defender, discard to deal an extra hit.',
    totalInDeck: 2
  },
  {
    id: 'scout',
    name: 'Scouting Party',
    deck: ['standard'],
    suit: 'mouse',
    type: 'craft',
    cost: ['mouse', 'mouse'],
    effect: 'As attacker, you are not affected by Ambush cards.',
    totalInDeck: 2
  },
  {
    id: 'brutal',
    name: 'Brutal Tactics',
    deck: ['standard'],
    suit: 'bird',
    type: 'craft',
    cost: ['fox', 'fox'],
    effect: 'In battle as attacker, may deal an extra hit, but defender scores 1 VP.',
    totalInDeck: 2
  },
  {
    id: 'command',
    name: 'Command Warren',
    deck: ['standard'],
    suit: 'rabbit',
    type: 'craft',
    cost: ['rabbit', 'rabbit'],
    effect: 'At start of Daylight, may initiate a battle.',
    totalInDeck: 2
  },
  {
    id: 'tax',
    name: 'Tax Collector',
    deck: ['standard'],
    suit: 'fox',
    type: 'craft',
    cost: ['rabbit', 'mouse', 'fox'],
    effect: 'Once in Daylight, remove 1 of your warriors to draw 1 card.',
    totalInDeck: 3
  },
  {
    id: 'codebreakers',
    name: 'Codebreakers',
    deck: ['standard'],
    suit: 'bird',
    type: 'craft',
    cost: ['mouse'],
    effect: "Once in Daylight, may look at another player's hand.",
    totalInDeck: 2
  },
  {
    id: 'bank',
    name: 'Better Burrow Bank',
    deck: ['standard'],
    suit: 'rabbit',
    type: 'craft',
    cost: ['rabbit', 'rabbit'],
    effect: 'At start of Birdsong, you and another player draw a card.',
    totalInDeck: 2
  },
  {
    id: 'stand',
    name: 'Stand and Deliver!',
    deck: ['standard'],
    suit: 'mouse',
    type: 'craft',
    cost: ['mouse', 'mouse', 'mouse'],
    effect: 'In Birdsong, may take a random card from another player. That player scores 1 VP.',
    totalInDeck: 2
  },
  {
    id: 'cobbler',
    name: 'Cobbler',
    deck: ['standard'],
    suit: 'rabbit',
    type: 'craft',
    cost: ['rabbit', 'rabbit'],
    effect: 'At start of Evening, may take a move.',
    totalInDeck: 2
  },
  {
    id: 'royal',
    name: 'Royal Claim',
    deck: ['standard'],
    suit: 'bird',
    type: 'craft',
    cost: ['?','?','?','?'],
    effect: 'In Birdsong, discard to score 1 VP per clearing you rule.',
    totalInDeck: 1
  },

  // Standard Items (simplified view, different suits exist)
  {
    id: 'std_boot',
    name: 'Boots',
    deck: ['standard'],
    suit: 'rabbit', // Represents generic suit mapping for simplicity
    type: 'craft',
    cost: ['rabbit'],
    effect: 'Craft Item',
    vp: 1,
    itemIcon: 'boot',
    totalInDeck: 2
  },
  {
    id: 'std_bag',
    name: 'Bag',
    deck: ['standard'],
    suit: 'mouse',
    type: 'craft',
    cost: ['mouse'],
    effect: 'Craft Item',
    vp: 1,
    itemIcon: 'bag',
    totalInDeck: 1
  },
  {
    id: 'std_xbow',
    name: 'Crossbow',
    deck: ['standard'],
    suit: 'fox',
    type: 'craft',
    cost: ['fox'],
    effect: 'Craft Item',
    vp: 1,
    itemIcon: 'crossbow',
    totalInDeck: 1
  },
  {
    id: 'std_hammer',
    name: 'Hammer',
    deck: ['standard'],
    suit: 'mouse',
    type: 'craft',
    cost: ['mouse'],
    effect: 'Craft Item',
    vp: 2,
    itemIcon: 'hammer',
    totalInDeck: 1
  },
  {
    id: 'std_sword',
    name: 'Sword',
    deck: ['standard'],
    suit: 'fox',
    type: 'craft',
    cost: ['fox', 'fox'],
    effect: 'Craft Item',
    vp: 2,
    itemIcon: 'sword',
    totalInDeck: 2
  },
  {
    id: 'std_tea',
    name: 'Tea',
    deck: ['standard'],
    suit: 'mouse',
    type: 'craft',
    cost: ['mouse'],
    effect: 'Craft Item',
    vp: 2,
    itemIcon: 'tea',
    totalInDeck: 2
  },
  {
    id: 'std_coin',
    name: 'Coins',
    deck: ['standard'],
    suit: 'rabbit',
    type: 'craft',
    cost: ['rabbit', 'rabbit'],
    effect: 'Craft Item',
    vp: 3,
    itemIcon: 'coin',
    totalInDeck: 2
  },

  // --- EXILES & PARTISANS UNIQUES ---

  // Partisans (Suit haters)
  {
    id: 'part_fox',
    name: 'Fox Partisans',
    deck: ['exiles'],
    suit: 'fox',
    type: 'craft',
    cost: ['fox'],
    effect: 'In battle in Fox clearing, may discard all Fox cards. Deal 1 extra hit per card.',
    totalInDeck: 1
  },
  {
    id: 'part_rabbit',
    name: 'Rabbit Partisans',
    deck: ['exiles'],
    suit: 'rabbit',
    type: 'craft',
    cost: ['rabbit'],
    effect: 'In battle in Rabbit clearing, may discard all Rabbit cards. Deal 1 extra hit per card.',
    totalInDeck: 1
  },
  {
    id: 'part_mouse',
    name: 'Mouse Partisans',
    deck: ['exiles'],
    suit: 'mouse',
    type: 'craft',
    cost: ['mouse'],
    effect: 'In battle in Mouse clearing, may discard all Mouse cards. Deal 1 extra hit per card.',
    totalInDeck: 1
  },

  // Critical E&P Cards
  {
    id: 'coffin',
    name: 'Coffin Makers',
    deck: ['exiles'],
    suit: 'rabbit',
    type: 'craft',
    cost: ['rabbit', 'rabbit'],
    effect: 'Whenever any warriors would return to supply, place them here instead. In Birdsong, score 1 VP per 5 warriors here, then return to supply.',
    totalInDeck: 1
  },
  {
    id: 'soup',
    name: 'Soup Kitchens',
    deck: ['exiles'],
    suit: 'bird',
    type: 'craft',
    cost: ['bird'],
    effect: 'Your tokens count toward Rule. Score 1 VP per token when crafting this.',
    totalInDeck: 1
  },
  {
    id: 'boat',
    name: 'Boat Builders',
    deck: ['exiles'],
    suit: 'bird',
    type: 'craft',
    cost: ['bird'],
    effect: 'You treat rivers as paths.',
    totalInDeck: 1
  },
  {
    id: 'planners',
    name: 'Corvid Planners',
    deck: ['exiles'],
    suit: 'bird',
    type: 'craft',
    cost: ['bird'],
    effect: 'You can move without Ruling the origin or destination.',
    totalInDeck: 1
  },
  {
    id: 'propaganda',
    name: 'Propaganda Bureau',
    deck: ['exiles'],
    suit: 'bird',
    type: 'craft',
    cost: ['?','?','?'],
    effect: 'Once in Daylight, spend a card to remove an enemy warrior from a matching clearing and place a warrior there.',
    totalInDeck: 1
  },
  {
    id: 'false_orders',
    name: 'False Orders',
    deck: ['exiles'],
    suit: 'bird',
    type: 'craft',
    cost: ['fox'],
    effect: "In Birdsong, discard this to move half of an enemy's warriors from a clearing you rule.",
    totalInDeck: 2
  },
  {
    id: 'informant',
    name: 'Informants',
    deck: ['exiles'],
    suit: 'fox',
    type: 'craft',
    cost: ['fox'],
    effect: 'In Evening, if you would draw cards, you may instead take a card from the discard pile.',
    totalInDeck: 1
  },
  {
    id: 'swap',
    name: 'Swap Meet',
    deck: ['exiles'],
    suit: 'bird',
    type: 'craft',
    cost: ['rabbit'],
    effect: 'Once in Birdsong, may take a random card from another player, then give them a card.',
    totalInDeck: 1
  },
  {
    id: 'tunnels',
    name: 'Tunnels',
    deck: ['exiles'],
    suit: 'rabbit',
    type: 'craft',
    cost: ['rabbit'],
    effect: 'You treat clearings with your crafting pieces as adjacent.',
    totalInDeck: 1
  },
  {
    id: 'investments',
    name: 'League of Adventurous Mice',
    deck: ['exiles'],
    suit: 'mouse',
    type: 'craft',
    cost: ['mouse'],
    effect: 'Once in Daylight, may exhaust an item in your Crafted Items box to take a Move or Battle.',
    totalInDeck: 1
  },
  {
    id: 'charm',
    name: 'Charm Offensive',
    deck: ['exiles'],
    suit: 'rabbit',
    type: 'craft',
    cost: ['rabbit'],
    effect: 'At start of Evening, may choose another player and score 1 VP. They choose to give you a card (score 1 VP) or not.',
    totalInDeck: 1
  },
  {
    id: 'saboteurs',
    name: 'Saboteurs',
    deck: ['exiles'],
    suit: 'bird',
    type: 'craft',
    cost: ['?'],
    effect: "In Daylight, discard this to discard an enemy's crafted card.",
    totalInDeck: 3
  },
  {
    id: 'eyrie_emigre',
    name: 'Eyrie Émigré',
    deck: ['exiles'],
    suit: 'bird',
    type: 'craft',
    cost: ['bird', 'bird'],
    effect: "At end of Daylight, move and then battle.",
    totalInDeck: 1
  },
  {
    id: 'teaching',
    name: 'Master Engravers',
    deck: ['exiles'],
    suit: 'mouse',
    type: 'craft',
    cost: ['mouse', 'mouse'],
    effect: 'When you craft an item, score +1 VP.',
    totalInDeck: 1
  },
  // Exiles Items
  {
    id: 'ex_boot',
    name: 'Boots',
    deck: ['exiles'],
    suit: 'bird', // Usually varied
    type: 'craft',
    cost: ['?'],
    effect: 'Craft Item',
    vp: 1,
    itemIcon: 'boot',
    totalInDeck: 2
  },
  {
    id: 'ex_coin',
    name: 'Coins',
    deck: ['exiles'],
    suit: 'fox',
    type: 'craft',
    cost: ['fox', 'fox'],
    effect: 'Craft Item',
    vp: 3,
    itemIcon: 'coin',
    totalInDeck: 2
  },
  {
    id: 'ex_sword',
    name: 'Sword',
    deck: ['exiles'],
    suit: 'mouse',
    type: 'craft',
    cost: ['mouse', 'mouse'],
    effect: 'Craft Item',
    vp: 2,
    itemIcon: 'sword',
    totalInDeck: 2
  },
  {
    id: 'ex_tea',
    name: 'Tea',
    deck: ['exiles'],
    suit: 'rabbit',
    type: 'craft',
    cost: ['rabbit', 'rabbit'],
    effect: 'Craft Item',
    vp: 2,
    itemIcon: 'tea',
    totalInDeck: 2
  }
];
