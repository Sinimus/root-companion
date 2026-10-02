import { IFactionGuide } from '@/types/engine';

export const HUNDREDS_GUIDE: IFactionGuide = {
  factionId: 'hundreds',
  setup: [
    '1. Form supplies of 20 Warriors, 1 Warlord and 6 Strongholds.',
    '2. Place your Warlord, 4 Warriors and 1 Stronghold in a corner clearing that is not another player\'s starting corner (diagonally opposite one if possible).',
    '3. Place the four "R" items randomly under the ruins, unless this has already been done.',
    '4. Place the Stubborn mood card on your Mood Card slot.'
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
          description: 'In each clearing with a Mob: remove all enemy buildings and tokens and take 1 item from a ruin there. Then roll the Mob Die once and place a Mob in a matching clearing without one that is adjacent to a Mob.',
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
          description: 'If the Warlord is off the map, replace any Hundreds warrior on the map with the Warlord. If you cannot, place the Warlord in any clearing.',
          architectTip: 'Keep Warlord safe but active! Dead Warlord = big problems.',
          ruleReference: '14.4.3',
        },
        {
          id: 'mood',
          title: 'Choose Mood',
          description: 'You must switch to a different Mood card. You cannot choose a Mood whose item is in your Hoard.',
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
          description: 'Take up to Command actions: Move, Battle, Build (spend a card to place a Stronghold in a matching clearing you rule).',
          architectTip: 'Looters: As attacker you may declare a loot. You deal no rolled hits (extra hits still count); if you rule the clearing after the battle, take 1 item from the defender\'s Crafted Items box.',
          ruleReference: '14.5.2',
        },
        {
          id: 'advance',
          title: 'Advance',
          description: 'Up to Prowess times: move the Warlord with any Hundreds warriors, then you may battle in the Warlord\'s clearing.',
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
          description: 'Any number of times: spend a card to place a Mob token in a matching clearing that has no Mob and has a Hundreds warrior (the Warlord counts).',
          architectTip: 'Mobs spread automatically during Raze. Place them strategically!',
          ruleReference: '14.6.1',
        },
        {
          id: 'oppress',
          title: 'Oppress',
          description: 'Count clearings you Rule that have a Hundreds piece and NO enemy pieces. 1-2 clearings: 1 VP. 3-4: 2 VP. 5: 3 VP. 6+: 4 VP.',
          architectTip: 'Any enemy piece, even a single token, disqualifies the clearing. Mobs clear buildings and tokens for you.',
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