import { IFactionGuide } from '@/types/engine';

export const LIZARD_GUIDE: IFactionGuide = {
  factionId: 'cult',
  setup: [
    '1. Form a supply of 25 Warriors.',
    '2. Place 4 Warriors and 1 Garden of the matching suit in a corner clearing that is not another player\'s starting corner (diagonally opposite one if possible).',
    '3. Place 1 Warrior in each clearing adjacent to that corner.',
    '4. Place the Outcast marker on any suit space of the Outcast box.',
    '5. Place your 14 remaining Gardens on the matching spaces of your Gardens tracks.'
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
          description: 'Check Lost Souls cards, ignoring birds. The suit with the most cards becomes the Outcast. On a tie the marker stays where it is and flips to Hated.',
          architectTip: 'If the Outcast suit stays the same, it becomes HATED (-1 Acolyte cost for conspiracies this turn).',
          ruleReference: '10.4.1',
        },
        {
          id: 'discard_souls',
          title: 'Discard Lost Souls',
          description: 'Move all cards from the Lost Souls pile to the discard pile.',
          architectTip: 'Every card any player spends or discards goes to Lost Souls first, so the whole table shapes your next Outcast.',
          ruleReference: '10.4.2',
        },
        {
          id: 'conspiracies',
          title: 'Perform Conspiracies',
          description: 'Spend Acolytes in Outcast clearings: Crusade (2 acolytes), Convert (2 acolytes), Sanctify (3 acolytes).',
          architectTip: 'Crusade: battle in an Outcast clearing, or move from one and then battle in the destination. Convert: replace an enemy warrior with a Cult warrior. Sanctify: replace an enemy building with a Garden of the Outcast suit.',
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
          description: 'Reveal cards from hand, one ritual per card: Build (Garden in a matching clearing you rule), Recruit (Warrior in a matching clearing), Score (spend the card to score for Gardens of its suit, once per suit per turn), Sacrifice (reveal a bird to place a Warrior in the Acolytes box).',
          architectTip: 'Hatred of Birds: Bird cards are NOT wild for rituals. A bird card can only be revealed for Sacrifice.',
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
          architectTip: 'Revealed cards come back to your hand, except cards spent to Score, which go to Lost Souls.',
          ruleReference: '10.6.1',
        },
        {
          id: 'craft',
          title: 'Craft',
          description: 'Craft by activating Gardens whose printed suit matches the Outcast suit.',
          architectTip: 'Only Gardens of the Outcast suit can craft. Plan your Outcast carefully.',
          ruleReference: '10.6.2',
        },
        {
          id: 'draw',
          title: 'Draw & Discard',
          description: 'Draw 1 card +1 per uncovered draw bonus. Discard down to 5.',
          architectTip: 'Build more Gardens to increase card draw and crafting capacity.',
          ruleReference: '10.6.3',
        }
      ]
    }
  ],
  strategy: {
    summary: "Convert & Sacrifice. Resource Cycling + Rotating Trump Suit. Gardens have supreme rule. Warriors lost while defending become Acolytes.",
    tips: [
      { title: "Cards", text: "Cards are everything. Craft cards that give you more cards. Buy from Riverfolks." },
      { title: "Outcast", text: "Try to make the Outcast Hated for conspiracy discount. Influence the Lost Soul Pile." },
      { title: "Gardens", text: "Get 2 Gardens for each suit ASAP for draw bonus. Protect them at all costs." },
      { title: "Acolytes", text: "Use as leverage and threat. Save them for HATED Outcast turns." }
    ]
  }
};