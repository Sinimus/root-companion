import { IFactionGuide } from '@/types/engine';

export const MARQUISE_GUIDE: IFactionGuide = {
  factionId: 'marquise',
  setup: [
    '1. Place Keep token in a corner clearing.',
    '2. Place 1 Warrior in each adjacent clearing.',
    '3. Place 1 Warrior in each other clearing (except opposite corner).',
    '4. Place 1 Sawmill, 1 Workshop, 1 Recruiter in the Keep clearing.',
    '5. Fill your tracks with buildings.'
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
        { id: 'craft', title: 'Craft', description: 'Activate Workshops to craft cards. (Spend slots, not wood).', ruleReference: '6.5.1' },
        { id: 'actions', title: 'Actions', description: 'Take up to 3 Actions (+1 per Bird card spent):', ruleReference: '6.5.2',
          architectTip: 'Battle: Fight. March: 2 Moves. Recruit: 1 Warrior at every Recruiter. Build: Spend Wood to place building. Overwork: Spend card to place Wood.'
        }
      ]
    },
    {
      id: 'evening',
      title: 'Evening',
      color: 'border-indigo-500',
      steps: [
        { id: 'draw', title: 'Draw', description: 'Draw 1 card + 1 per bonus on Recruiter track. Discard > 5.', ruleReference: '6.6' }
      ]
    }
  ]
};