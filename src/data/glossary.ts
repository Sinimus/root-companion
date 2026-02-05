export interface IGlossaryTerm {
  term: string;
  definition: string;
  ruleReference?: string;
}

export const GLOSSARY_DATA: IGlossaryTerm[] = [
  { term: 'Adjacent', definition: 'Linked by a path. Forests are adjacent if they share a border without a path.', ruleReference: '2.2.1' },
  { term: 'Ambush', definition: 'Card played by defender before dice roll to deal 2 hits. Cancelled by attacker\'s Ambush.', ruleReference: '4.3.1' },
  { term: 'Battle', definition: 'Action in a clearing with enemies. Roll dice: Attacker high, Defender low. Max hits = your warriors.', ruleReference: '4.3' },
  { term: 'Birdsong', definition: 'First phase of a turn. Typically for recruiting or preparing.', ruleReference: '1.4.1' },
  { term: 'Building', definition: 'Square piece (Sawmill, Roost, Base, etc.). Fills a slot. Counts for Rule.', ruleReference: '2.2.3' },
  { term: 'Card Suits', definition: 'Fox, Mouse, Rabbit, Bird. Birds are wild.', ruleReference: '2.1' },
  { term: 'Clearing', definition: 'Map spaces where pieces are placed. Has a suit and slots.', ruleReference: '2.2' },
  { term: 'Crafting', definition: 'Activating pieces to use a card\'s effect. Pieces must match card suit.', ruleReference: '4.1' },
  { term: 'Daylight', definition: 'Main phase of a turn. Typically for actions (Move, Battle, Build).', ruleReference: '1.4.1' },
  { term: 'Deck', definition: 'Shared pile of cards. If empty, shuffle discard.', ruleReference: '2.1' },
  { term: 'Defenseless', definition: 'Defender has no warriors in battle clearing. +1 Hit for attacker.', ruleReference: '4.3.3' },
  { term: 'Discard', definition: 'Place card in discard pile. Dominance cards go to "Available" area.', ruleReference: '2.1' },
  { term: 'Dominance', definition: 'Card changing victory condition. Requires 10VP to play. No more VP scoring.', ruleReference: '3.3' },
  { term: 'Draw', definition: 'Take top card of deck.', ruleReference: '2.1' },
  { term: 'Enemy', definition: 'Any player not in Coalition with you.', ruleReference: '1.1' },
  { term: 'Evening', definition: 'Final phase. Typically for drawing cards and scoring.', ruleReference: '1.4.1' },
  { term: 'Forest', definition: 'Area enclosed by paths. Only Vagabond moves here (Slip).', ruleReference: '2.4' },
  { term: 'Hand', definition: 'Your cards. Secret content, public count.', ruleReference: '1.2.1' },
  { term: 'Item', definition: 'Square token (Sword, Boot, etc.). Held by Vagabond or on tracks.', ruleReference: 'G.1.13' },
  { term: 'Move', definition: 'Take warriors from A to adjacent B. Must Rule A or B.', ruleReference: '4.2' },
  { term: 'Outrage', definition: 'Giving Alliance a card when removing Sympathy or moving into Sympathetic clearing.', ruleReference: '8.2.6' },
  { term: 'Pawn', definition: 'Character piece (Vagabond). Not a warrior. Cannot rule.', ruleReference: 'G.1.17' },
  { term: 'Piece', definition: 'Any warrior, building, token, or pawn.', ruleReference: '1.5' },
  { term: 'Recruit', definition: 'Placing new warriors from supply on the map.', ruleReference: 'G.1' },
  { term: 'Relationship', definition: 'Vagabond status with factions (Indifferent, Allied, Hostile).', ruleReference: '9.2.9' },
  { term: 'Rule', definition: 'Most total Warriors + Buildings in a clearing. Ties go to nobody (except Eyrie).', ruleReference: '2.5' },
  { term: 'Slot', definition: 'Space in a clearing for a building.', ruleReference: '2.2.3' },
  { term: 'Suit', definition: 'Fox, Mouse, Rabbit, Bird. Matches clearings and cards.', ruleReference: '2.1' },
  { term: 'Supply', definition: 'Pieces off the map.', ruleReference: '1.5.1' },
  { term: 'Token', definition: 'Round piece (Wood, Keep, Sympathy). Usually no Rule.', ruleReference: 'G.1.32' },
  { term: 'Victory Points', definition: 'Score 30 to win. Scored by crafting items, removing enemy tokens/buildings, and faction specifics.', ruleReference: '3.1' },
  { term: 'Warrior', definition: 'Meeple. Counts for Rule. deals damage.', ruleReference: '1.5.2' },
  { term: 'Wild', definition: 'Bird cards act as any suit.', ruleReference: '2.1.1' }
];