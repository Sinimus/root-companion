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
      content: 'Shuffle the deck. Each player draws 3 cards. With 2 players, first remove all 4 Dominance cards.',
    },
    {
      title: '4. Faction Setup',
      content: 'Set up factions in setup order (A, B, C...) as listed on the back of each faction board.',
    }
  ],
  advanced: [
    {
      title: '1. Map & Variants',
      content: 'Choose and set up the map. On any map other than Autumn, shuffle the 12 suit markers face down and place one on each clearing.',
      substeps: [
        'Mountain Map: Place Tower in the central clearing (the Pass). Cover the 6 darker paths with closed path markers.',
        'Lake Map: Place Ferry in the corner clearing that is also coastal.',
        'Ruins & Items: Place as normal.',
        'Landmarks (Optional): Deal 1 or 2 landmark cards. The last player sets up one, the second-to-last player the other. Landmark cards may override the Tower and Ferry placement.'
      ]
    },
    {
      title: '2. Hirelings (Optional)',
      content: 'Optional. Shuffle the hireling cards and deal exactly 3.',
      substeps: [
        '3 players: Flip 1 Hireling to "Demoted".',
        '4 players: Flip 2 Hirelings to "Demoted".',
        '5+ players: Flip all 3 Hirelings to "Demoted".',
        'Starting with the last player and going counter-clockwise, each player sets up one Hireling.',
        'Place the three hireling markers on the 4, 8 and 12 spaces of the score track.',
        'A faction cannot be played if its matching Hireling is in play.'
      ]
    },
    {
      title: '3. Cards & Draft Pool (AdSet)',
      content: 'Each player draws 5 cards. Then prepare the faction setup cards.',
      substeps: [
        'With 2 players, remove all 4 Dominance cards before shuffling the deck.',
        'Agree which factions to omit.',
        'Shuffle Militant cards (Red). Deal one face up to the pool.',
        'Shuffle Insurgent (Gray) into the remaining Militants and deal 1 more card per player to the pool (players + 1 cards in total).',
        '2 players: remove all Insurgent cards before dealing.',
        'If the last card dealt is an Insurgent, it is locked until a Militant faction has been chosen.'
      ]
    },
    {
      title: '4. Faction Draft',
      content: 'Drafting starts with the LAST player and goes COUNTER-CLOCKWISE.',
      substeps: [
        'Each player in turn chooses one faction setup card from the Pool.',
        'Setup immediately upon choosing (place pieces, choose Homeland).',
        'Homeland: Not an enemy homeland, and all listed setup pieces must fit.',
        'If your faction requires distance from enemy homelands, set up as far away as you can.'
      ]
    },
    {
      title: '5. Hand & Start',
      content: 'Place score markers on 0. Each player keeps 3 of their 5 cards.',
      substeps: [
        'Put the other 2 cards face down on the deck, then shuffle the deck.',
        '1st player (who drafted last) starts Birdsong.'
      ]
    }
  ]
};