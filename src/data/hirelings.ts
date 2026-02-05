import { IHireling } from '@/types/engine';

export const HIRELINGS_DATA: IHireling[] = [
  {
    id: 'stag_protector',
    name: 'The Stag Protector',
    description: 'A guardian protector who shields allies from conflict.',
    ruleReference: 'Hirelings - Stag Protector',
    controlType: 'die_roll',
    iconName: 'Shield',
    promotedSide: {
      abilities: [
        {
          title: 'Divine Protection',
          effect: 'You and your warriors, buildings, and tokens cannot be targeted by battles or card effects that remove pieces.',
          type: 'passive'
        }
      ],
      markers: 3
    },
    demotedSide: {
      abilities: [
        {
          title: 'Wandering Guardian',
          effect: 'Every Birdsong: Move the Protector to an adjacent clearing. You lose control markers as normal.',
          type: 'passive'
        }
      ],
      markers: 3
    }
  },
  {
    id: 'hedgehog_bandits',
    name: 'Hedgehog Bandits',
    description: 'Cunning outlaws who establish hidden camps.',
    ruleReference: 'Hirelings - Hedgehog Bandits',
    controlType: 'die_roll',
    iconName: 'Swords',
    promotedSide: {
      abilities: [
        {
          title: 'Bandit Camp',
          effect: 'Either place one of your warriors in a clearing with the Bandit Camp token, or place the Bandit Camp token in a clearing you rule.',
          type: 'action'
        },
        {
          title: 'Defensive Position',
          effect: 'The Bandit Camp cannot be targeted by battles.',
          type: 'passive'
        }
      ],
      markers: 2
    },
    demotedSide: {
      abilities: [
        {
          title: 'Hidden Outlaws',
          effect: 'The Bandit Camp provides +1 Wood and +1 Card when you rule its clearing.',
          type: 'passive'
        }
      ],
      markers: 2
    }
  },
  {
    id: 'weasel_musicians',
    name: 'Weasel Musicians',
    description: 'Enchanting performers whose music controls movement.',
    ruleReference: 'Hirelings - Weasel Musicians',
    controlType: 'die_roll',
    iconName: 'Music',
    promotedSide: {
      abilities: [
        {
          title: 'Enchanting Melody',
          effect: 'Warriors cannot move out of a clearing on the same turn they moved into it (their move is canceled).',
          type: 'passive'
        }
      ],
      markers: 2
    },
    demotedSide: {
      abilities: [
        {
          title: 'Street Performance',
          effect: 'Players who rule the clearing with the Musician can draw 1 card when they craft there.',
          type: 'passive'
        }
      ],
      markers: 2
    }
  },
  {
    id: 'bear_exile',
    name: 'The Bear Exile',
    description: 'A powerful wanderer who can be hired for services or fed for favors.',
    ruleReference: 'Hirelings - Bear Exile',
    controlType: 'die_roll',
    iconName: 'User',
    items: ['Tea', 'Coin', 'Boot'],
    promotedSide: {
      abilities: [
        {
          title: 'For Hire',
          effect: 'Exhaust any number of your items to either Move the Bear that many clearings or Battle that many times (each hit removes one piece).',
          type: 'action'
        },
        {
          title: 'Bear Companion',
          effect: 'When moving with the Bear, you may also take items from clearings you pass through.',
          type: 'action'
        }
      ],
      markers: 3
    },
    demotedSide: {
      abilities: [
        {
          title: 'Feeding Time',
          effect: 'Any player may give the Bear Exile one of their items to score 1 VP. The item is not exhausted.',
          type: 'passive'
        }
      ],
      markers: 3
    }
  },
  {
    id: 'forest_patrol',
    name: 'Forest Patrol',
    description: 'Faction-aligned woodland defenders with specialized skills.',
    ruleReference: 'Hirelings - Forest Patrol',
    controlType: 'die_roll',
    iconName: 'Shield',
    promotedSide: {
      abilities: [
        {
          title: 'Advanced Tactics',
          effect: 'Enhanced faction abilities (refer to actual card for specific effects).',
          type: 'action'
        }
      ],
      markers: 2
    },
    demotedSide: {
      abilities: [
        {
          title: 'Feline Physicians',
          effect: 'Once per turn, you may either heal 1 damage from your warriors or remove 1 damage token from the Forest Patrol card to draw 1 card.',
          type: 'action'
        }
      ],
      markers: 2
    }
  }
];