import { IFactionGuide } from '@/types/engine';

export const RIVERFOLK_GUIDE: IFactionGuide = {
  factionId: 'riverfolk',
  setup: [
    '1. Form a supply of 15 Warriors.',
    '2. Place 4 Warriors in any clearings touching the river.',
    '3. Place your 9 Trade Posts on the matching spaces of your Trade Posts tracks.',
    '4. Place 3 Warriors in your Payments box.',
    '5. Place 1 service marker on any space of each Services track to set your starting prices.'
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
          description: 'If any Trade Post is on the map: Score 1 VP per 2 Funds in your Funds box.',
          architectTip: 'Scored before Gather Funds, so warriors in Payments and Committed do not count. Only funds you kept unspent last turn score.',
          ruleReference: '11.4.2',
        },
        {
          id: 'gather',
          title: 'Gather Funds',
          description: 'Move all warriors on your faction board (Payments, Committed, Trade Posts tracks) to the Funds box.',
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
          description: 'Commit Funds to: Move (1), Battle (1), Draw (1), Craft (1 Fund per crafting icon, placed on empty Trade Posts track spaces of the matching suits). Spend Funds to: Recruit (1, in a clearing with a river), Establish Trade Post (2).',
          architectTip: 'Establish Trade Post: choose a ruled clearing without a Trade Post and spend 2 Funds of the player who rules it; place the matching Trade Post and 1 Warrior and score. Committed funds come back next Birdsong, spent funds return to their owner.',
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
          architectTip: 'Your hand is public and is what Hand Card buyers shop from. You do not draw in Evening; drawing is a Daylight action.',
          ruleReference: '11.6.1',
        },
        {
          id: 'prices',
          title: 'Set Costs',
          description: 'You may move each service marker (Hand Card, Riverboats, Mercenaries) to any space on its track, setting a new cost.',
          architectTip: 'Buyers pay at the start of their Birdsong by placing their own warriors in your Payments box. Set high prices if they need your services badly.',
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