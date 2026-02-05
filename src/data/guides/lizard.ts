import { IFactionGuide } from '@/types/engine';

export const LIZARD_GUIDE: IFactionGuide = {
  factionId: 'cult',
  setup: [
    '1. Place your Garden in a corner clearing.',
    '2. Place 3 Gardens in adjacent clearings.',
    '3. Place 1 Warrior in each Garden clearing.',
    '4. Place your Lost Souls track at 0.',
    '5. Draw 5 starting cards.'
  ],
  phases: [
    {
      id: 'birdsong',
      title: 'Birdsong',
      color: 'border-yellow-600',
      steps: [
        {
          id: 'adjust_outcast',
          title: 'Adjust Outcast',
          description: 'Check Lost Souls cards. Most common suit becomes Outcast. If tie, choose.',
          architectTip: 'If Outcast suit stays the same, it becomes HATED (-1 cost for conspiracies this turn).',
          ruleReference: '10.4.1',
        },
        {
          id: 'discard_souls',
          title: 'Discard Lost Souls',
          description: 'Move all cards from Lost Souls box to the discard pile.',
          architectTip: 'Clears your Lost Souls for new converts this turn.',
          ruleReference: '10.4.2',
        },
        {
          id: 'conspiracies',
          title: 'Perform Conspiracies',
          description: 'Spend Acolytes in Outcast clearings: Crusade (2 acolytes), Convert (2 acolytes), Sanctify (3 acolytes).',
          architectTip: 'Crusade: Place Garden + Warrior. Convert: Enemy warrior becomes acolyte. Sanctify: Score VP.',
          ruleReference: '10.4.3',
        }
      ]
    },
    {
      id: 'daylight',
      title: 'Daylight',
      color: 'border-yellow-400',
      steps: [
        {
          id: 'rituals',
          title: 'Perform Rituals',
          description: 'Reveal cards from hand to perform: Build (2 matching suit), Recruit (1 matching), Score (2 matching), Sacrifice (any 2).',
          architectTip: 'Hatred of Birds: Bird cards are NOT wild for rituals (except Sacrifice). Must match suit exactly.',
          ruleReference: '10.5',
        }
      ]
    },
    {
      id: 'evening',
      title: 'Evening',
      color: 'border-indigo-500',
      steps: [
        {
          id: 'return_cards',
          title: 'Return Cards',
          description: 'Return all cards revealed for rituals to your hand.',
          architectTip: 'Your ritual cards are not consumed! You can reuse them next turn.',
          ruleReference: '10.6.1',
        },
        {
          id: 'craft',
          title: 'Craft',
          description: 'Craft using Gardens matching the Outcast suit.',
          architectTip: 'Only Gardens in Outcast suit clearings can craft. Plan your Outcast choice carefully.',
          ruleReference: '10.6.2',
        },
        {
          id: 'draw',
          title: 'Draw & Discard',
          description: 'Draw 1 card +1 per bonus icon on Gardens track. Discard down to 5.',
          architectTip: 'Build more Gardens to increase card draw and crafting capacity.',
          ruleReference: '10.6.3',
        }
      ]
    }
  ],
  strategy: {
    summary: "Convert & Sacrifice. Resource Cycling + Rotating Trump Suit. Gardens have supreme rule. Dead warriors become Acolytes.",
    tips: [
      { title: "Cards", text: "Cards are everything. Craft cards that give you more cards. Buy from Riverfolks." },
      { title: "Outcast", text: "Try to make the Outcast Hated for conspiracy discount. Influence the Lost Soul Pile." },
      { title: "Gardens", text: "Get 2 Gardens for each suit ASAP for draw bonus. Protect them at all costs." },
      { title: "Acolytes", text: "Use as leverage and threat. Save them for HATED Outcast turns." }
    ]
  }
};