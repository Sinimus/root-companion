export type SetupVariant = 'standard' | 'advanced';

export interface ISetupStep {
  title: string;
  content: string;
  substeps?: string[];
}

export const SETUP_GUIDE_DATA: Record<SetupVariant, ISetupStep[]> = {
  standard: [
    {
      title: '1. Map & Deck',
      content: 'Choose a map (Autumn, Winter...). Place Ruins and Items.',
      substeps: ['Ruins on "R" slots', 'Items on the top track', 'Shuffle the deck']
    },
    {
      title: '2. Factions & Score',
      content: 'Each player chooses a faction. Place VP markers on 0.',
    },
    {
      title: '3. Cards',
      content: 'Deal 3 cards to each player.',
    },
    {
      title: '4. Faction Setup',
      content: 'Set up factions in alphabetical order (A-Z) as listed on the back of the board.',
    }
  ],
  advanced: [
    {
      title: '1. Map & Variants',
      content: 'Choose and set up the map. (Mountain/Lake have special rules).',
      substeps: [
        'Mountain Map: Place Tower in the pass. Cover 6 paths with rubble.',
        'Lake Map: Place Ferry in the corner.',
        'Ruins & Items: Place as normal.',
        'Landmarks (Optional): Draw 1-2 cards. Last player sets up Landmarks.'
      ]
    },
    {
      title: '2. Hirelings (Optional)',
      content: 'Recommended for 3-4 players. Draw 3 Hirelings.',
      substeps: [
        '3 players: Flip 1 Hireling to "Demoted".',
        '4 players: Flip 2 Hirelings to "Demoted".',
        'Last player sets up Hirelings counter-clockwise.',
        'Place control markers on 4, 8, 12 VP.'
      ]
    },
    {
      title: '3. Draft Pool (AdSet)',
      content: 'Prepare the Setup Deck (AdSet).',
      substeps: [
        'Remove unused factions.',
        'Shuffle Militant cards (Red). Place one in the middle (Draft Pool).',
        'Shuffle Insurgent (Gray) into the rest.',
        'Deal 1 card to each player.'
      ]
    },
    {
      title: '4. Faction Draft',
      content: 'Drafting starts with the LAST player and goes COUNTER-CLOCKWISE.',
      substeps: [
        'Choose a card from your Hand OR the Pool.',
        'Setup immediately upon choosing (place pieces, choose Homeland).',
        'Homeland: Must be valid (slots available, not next to enemy).',
        'If you take from Hand, put your card into the Pool.'
      ]
    },
    {
      title: '5. Hand & Start',
      content: 'Each player draws 5 cards, keeps 3.',
      substeps: [
        'Compensation: 2nd player +1 card, 3rd +1 card, 4th +1 card.',
        '1st player (who drafted last) starts Birdsong.'
      ]
    }
  ]
};