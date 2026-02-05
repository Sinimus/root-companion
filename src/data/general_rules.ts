export const GOLDEN_RULES = [
  { title: '1. Precedence', text: 'Card text overrides the rules.' },
  { title: '2. "Cannot"', text: '"Cannot" is absolute. It cannot be overridden.' },
  { title: '3. Public Info', text: 'Hand size, discard pile, and boards are public. Hand content is secret.' },
  { title: '4. Agreements', text: 'Deals are non-binding. You cannot give cards/items unless a rule says so.' },
  { title: '5. Ruling', text: 'Most Warriors + Buildings = Rule. Ties = Nobody rules. (Eyrie/Lizards have exceptions).' },
  { title: '6. Movement', text: 'To Move, you must Rule the origin OR the destination.' },
  { title: '7. Crafting', text: 'Activate pieces in matching clearings. Pieces are used once per turn.' },
  { title: '8. Victory', text: 'First to 30 VP wins immediately. Or complete a Dominance start of turn.' }
];

export const DECK_INFO = {
  standard: {
    title: 'Standard Deck',
    desc: 'The base game deck. Includes "Favor" cards (nuke clearings) and "Stand and Deliver".',
    features: [
      'Favor Cards: Remove ALL enemy pieces in suit clearings.',
      'Ambush: 5 cards (1 of each suit, 2 birds).',
      'Dominance: 4 cards.'
    ]
  },
  exiles: {
    title: 'Exiles & Partisans',
    desc: 'Alternative deck. Replaces Favors with "Partisans" and adds varied powers.',
    features: [
      'No Favors: Less board nuking.',
      'Partisans: Deal extra hits in battle but discard matching cards.',
      'Coffin Makers: Score points when warriors die.',
      'False Orders: Move enemy warriors.',
      'Corvid Planners: Ignore Rule for movement.'
    ]
  }
};