import { IFactionGuide } from '@/types/engine';

export const HUNDREDS_GUIDE: IFactionGuide = {
  factionId: 'hundreds',
  setup: [
    '1. Place your Stronghold in a corner clearing.',
    '2. Place your Warlord in the Stronghold clearing.',
    '3. Place 5 Warriors in the Stronghold clearing.',
    '4. Place your Mob Die on the Warlord space.',
    '5. Choose a starting Mood and draw 5 cards.'
  ],
  phases: [
    {
      id: 'birdsong',
      title: 'Birdsong',
      color: 'border-red-600',
      steps: [
        {
          id: 'raze',
          title: 'Raze',
          description: 'Remove enemy buildings/tokens in clearings with Mobs. Roll Mob Die to spread Mob to adjacent clearing.',
          architectTip: 'Mobs are your main weapon! Spread them to pressure multiple areas.',
          ruleReference: '14.4.1',
        },
        {
          id: 'recruit',
          title: 'Recruit',
          description: 'Place warriors equal to Prowess at Warlord location. +1 warrior per Stronghold built.',
          architectTip: 'Build Strongholds to increase recruitment and give more crafting slots.',
          ruleReference: '14.4.2',
        },
        {
          id: 'anoint',
          title: 'Anoint',
          description: 'If Warlord is off-map, replace one of your warriors with Warlord in any clearing you rule.',
          architectTip: 'Keep Warlord safe but active! Dead Warlord = big problems.',
          ruleReference: '14.4.3',
        },
        {
          id: 'mood',
          title: 'Choose Mood',
          description: 'Select a new Mood card. Cannot choose Mood if you have matching Item in your Hoard.',
          architectTip: 'Moods give special abilities but restrict Item choices. Plan ahead!',
          ruleReference: '14.4.4',
        }
      ]
    },
    {
      id: 'daylight',
      title: 'Daylight',
      color: 'border-yellow-500',
      steps: [
        {
          id: 'craft',
          title: 'Craft',
          description: 'Activate Strongholds to craft.',
          ruleReference: '14.5.1',
        },
        {
          id: 'command',
          title: 'Command',
          description: 'Take actions equal to Command value: Move, Battle, Build Stronghold.',
          architectTip: 'Looters: In battle, you can choose to deal 0 hits to steal an Item instead (if you rule clearing).',
          ruleReference: '14.5.2',
        },
        {
          id: 'advance',
          title: 'Advance',
          description: 'Take actions equal to Prowess value: Move Warlord (and army with him), Battle.',
          architectTip: 'Warlord moves with army! Use this to threaten multiple areas quickly.',
          ruleReference: '14.5.3',
        }
      ]
    },
    {
      id: 'evening',
      title: 'Evening',
      color: 'border-indigo-500',
      steps: [
        {
          id: 'incite',
          title: 'Incite',
          description: 'Discard a card to place a Mob token in a matching clearing.',
          architectTip: 'Mobs spread automatically during Raze. Place them strategically!',
          ruleReference: '14.6.1',
        },
        {
          id: 'oppress',
          title: 'Oppress',
          description: 'Score 1 VP for each clearing you Rule that has NO enemy pieces.',
          architectTip: 'Control clearings completely to score VPs. Remove enemy presence to maximize scoring.',
          ruleReference: '14.6.2',
        },
        {
          id: 'draw',
          title: 'Draw',
          description: 'Draw 1 card. Discard down to 5.',
          architectTip: 'Keep cards for Inciting Mobs and choosing Moods.',
          ruleReference: '14.6.3',
        }
      ]
    }
  ],
  strategy: {
    summary: "Speed & Strike. Area Control + Collection. Recruit easily. Card poor. Burn clearings to rule.",
    tips: [
      { title: "Warlord", text: "Protect Leader and Strongholds at all costs. They are your best lever to recruit." },
      { title: "Consistency", text: "Slow and steady expansion. Maintain clear clearings for Oppress score." },
      { title: "Items", text: "Move toward Ruins. Collect identical items to keep mood choice wide." },
      { title: "Moods", text: "Start with ROWDY as cards are difficult to get. Relentless is strong." }
    ]
  }
};