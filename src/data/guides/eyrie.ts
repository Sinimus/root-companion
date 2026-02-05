import { IFactionGuide } from '@/types/engine';

export const EYRIE_GUIDE: IFactionGuide = {
  factionId: 'eyrie',
  setup: [
    '1. Place 6 Warriors and 1 Roost in a corner clearing (opposite Marquise if able).',
    '2. Choose a Leader. Tuck 2 Viziers into Decree columns listed on Leader.',
    '3. Fill Roosts track.'
  ],
  strategy: {
    summary: "Expansion and Programming. You are the clock of the game. Fast and aggressive.",
    tips: [
      { title: 'Decree Management', text: 'Always place 2 cards if possible. Put non-Bird cards in Move/Battle. Keep Birds for Recruit/Build.' },
      { title: 'Leader Choice', text: 'Start with Charismatic to recruit fast. Switch to Builder later for crafting points.' },
      { title: 'Turmoil Timing', text: 'Turmoil is inevitable. Plan it! Compare your Roost points (+4 VP) vs Bird cards in decree (-1 VP each) to decide when to crash.' },
      { title: 'Roosts', text: 'Protect them. If you run out of Roosts, leave one undefended so it gets destroyed and you can rebuild it.' }
    ]
  },
  phases: [
    {
      id: 'birdsong',
      title: 'Birdsong',
      color: 'border-blue-500',
      steps: [
        { id: 'emergency', title: 'Emergency Orders', description: 'If hand is empty, draw 1 card.', ruleReference: '7.4.1' },
        { id: 'decree', title: 'Add to Decree', description: 'Add 1 or 2 cards to Decree. Max 1 Bird card.', ruleReference: '7.4.2' },
        { id: 'roost', title: 'New Roost', description: 'If 0 Roosts on map: Place Roost + 3 Warriors in clearing with fewest warriors.', ruleReference: '7.4.3' }
      ]
    },
    {
      id: 'daylight',
      title: 'Daylight',
      color: 'border-yellow-500',
      steps: [
        { id: 'craft', title: 'Craft', description: 'Activate Roosts to craft. (Items = 1 VP only).', ruleReference: '7.5.1' },
        { id: 'resolve', title: 'Resolve Decree', description: 'Recruit (Place warrior), Move (From suit), Battle (In suit), Build (Place Roost in suit you Rule).', ruleReference: '7.5.2', architectTip: 'Must complete ALL actions or TURMOIL.' }
      ]
    },
    {
      id: 'evening',
      title: 'Evening',
      color: 'border-indigo-500',
      steps: [
        { id: 'score', title: 'Score', description: 'Score VP shown on Roosts track.', ruleReference: '7.6.1' },
        { id: 'draw', title: 'Draw', description: 'Draw 1 card + bonuses. Discard > 5.', ruleReference: '7.6.2' }
      ]
    }
  ]
};