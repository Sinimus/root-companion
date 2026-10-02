import { IFactionGuide } from '@/types/engine';

export const MARQUISE_GUIDE: IFactionGuide = {
  factionId: 'marquise',
  setup: [
    '1. Form supplies of 25 Warriors and 8 Wood. Place the Keep token in a corner clearing.',
    '2. Place 1 Warrior in the Keep clearing and in each adjacent clearing.',
    '3. Place 1 Warrior in each other clearing, except the diagonally opposite corner.',
    '4. Place 1 Sawmill, 1 Workshop, 1 Recruiter among the Keep clearing and its adjacent clearings, in any combination.',
    '5. Fill your Buildings tracks with the remaining 5 Sawmills, 5 Workshops and 5 Recruiters, leaving the leftmost space of each track empty.'
  ],
  strategy: {
    summary: "Control and Production. You are the engine builder. Keep it cool, control is everything.",
    tips: [
      { title: 'Early Game: Turtle', text: "Protect your Keep at all costs. Don't overextend. Build Sawmills slowly to avoid becoming a target." },
      { title: 'Mid Game: Police', text: "You are in charge of slowing others down. Negotiate! Don't fight the Alliance unnecessarily (you feed them cards)." },
      { title: 'Late Game: Burst', text: "Adjust to the board. Look for defenseless targets. Rebuild destroyed buildings for cheap points." },
      { title: 'Dominance', text: "Dominance victory is possible for Cats if you maintain a strong board presence." }
    ]
  },
  phases: [
    {
      id: 'birdsong',
      title: 'Birdsong',
      color: 'border-orange-500',
      steps: [
        { id: 'wood', title: 'Place Wood', description: 'Place 1 wood token at each Sawmill on the map.', ruleReference: '6.4' }
      ]
    },
    {
      id: 'daylight',
      title: 'Daylight',
      color: 'border-yellow-500',
      steps: [
        { id: 'craft', title: 'Craft', description: 'Activate Workshops to craft cards. (Each Workshop once per turn; crafting does not cost wood.)', ruleReference: '6.5' },
        { id: 'actions', title: 'Actions', description: 'Take up to 3 Actions (+1 per Bird card spent):', ruleReference: '6.5',
          architectTip: 'Battle: Fight. March: 2 Moves. Recruit: 1 Warrior at every Recruiter (once per turn). Build: Spend Wood to place building. Overwork: Spend card to place Wood.'
        }
      ]
    },
    {
      id: 'evening',
      title: 'Evening',
      color: 'border-indigo-500',
      steps: [
        { id: 'draw', title: 'Draw', description: 'Draw 1 card + 1 per uncovered draw bonus. Discard down to 5.', ruleReference: '6.6' }
      ]
    }
  ]
};