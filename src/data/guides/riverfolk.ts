import { IFactionGuide } from '@/types/engine';

export const RIVERFOLK_GUIDE: IFactionGuide = {
  factionId: 'riverfolk',
  setup: [
    '1. Place your Outposts in clearings matching the 3 suits on your starting cards.',
    '2. Place 1 Warrior on each Outpost.',
    '3. Place 2 Warriors in the Payments box.',
    '4. Place 1 Warrior on each of your starting cards.',
    '5. Place your Trade Post on the 3 VP space.'
  ],
  phases: [
    {
      id: 'birdsong',
      title: 'Birdsong',
      color: 'border-cyan-500',
      steps: [
        {
          id: 'protectionism',
          title: 'Protectionism',
          description: 'If Payments box is empty, place 2 warriors from supply into it.',
          architectTip: 'Keeps your economy flowing. Empty Payments = no income protection.',
          ruleReference: '11.4.1',
        },
        {
          id: 'dividends',
          title: 'Score Dividends',
          description: 'If you have a Trade Post on map: Score 1 VP per 2 Funds in your Funds box.',
          architectTip: 'Trade Post is your primary VP engine. Build it early and keep Funds flowing.',
          ruleReference: '11.4.2',
        },
        {
          id: 'gather',
          title: 'Gather Funds',
          description: 'Move all warriors from Payments, Committed boxes, and Trade Posts to the Funds box.',
          architectTip: 'Your income phase! Funds = Actions. More warriors = more Funds = more actions.',
          ruleReference: '11.4.3',
        }
      ]
    },
    {
      id: 'daylight',
      title: 'Daylight',
      color: 'border-yellow-500',
      steps: [
        {
          id: 'actions',
          title: 'Operations',
          description: 'Commit or Spend Funds to: Move (1 Fund), Battle (1 Fund), Craft (2 Funds), Draw (1 Fund), Recruit (1 Fund).',
          architectTip: 'Establish Trade Post: Spend 2 Funds matching the ruler of the target clearing. Critical for VP scoring.',
          ruleReference: '11.5',
        }
      ]
    },
    {
      id: 'evening',
      title: 'Evening',
      color: 'border-indigo-500',
      steps: [
        {
          id: 'discard',
          title: 'Discard',
          description: 'Discard cards down to 5.',
          architectTip: 'Keep cards that match your desired services. You need cards to price services.',
          ruleReference: '11.6.1',
        },
        {
          id: 'prices',
          title: 'Set Costs',
          description: 'Set prices for Services by placing cards face down: Hand Card (1), Riverboats (2), Mercenaries (3).',
          architectTip: 'Players can pay you to use these! Set high prices if they need your services badly.',
          ruleReference: '11.6.2',
        }
      ]
    }
  ],
  strategy: {
    summary: "Sell Sell & Over-Sell. Negotiation + Resource Allocation. Swim regardless of rule. Set prices for services.",
    tips: [
      { title: "Sales", text: "Talk a lot, be open. If people don't buy, get troops on the map and 'force' them to hire mercenaries." },
      { title: "Pricing", text: "The key is to price the right amount at the right time. It doesn't matter who buys as long as someone does." },
      { title: "Trade Posts", text: "You MUST progressively place all of them. Protect the Trade outpost with 2-3 warriors." },
      { title: "Funds", text: "Spend almost everything every turn. Saving funds is dangerous due to Trade Disruption." }
    ]
  }
};