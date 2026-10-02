import { IFactionGuide } from '@/types/engine';

export const ALLIANCE_GUIDE: IFactionGuide = {
  factionId: 'alliance',
  setup: [
    '1. Form a supply of 10 Warriors.',
    '2. Place your 3 Bases on the matching spaces of your Bases box.',
    '3. Place your 10 Sympathy tokens on your Sympathy track.',
    '4. Draw 3 cards and place them face down on your Supporters stack.'
  ],
  phases: [
    {
      id: 'birdsong',
      title: 'Birdsong',
      color: 'border-green-500',
      steps: [
        {
          id: 'revolt',
          title: 'Revolt',
          description: 'Choose a sympathetic clearing without a Base whose suit matches a Base still on your board. Spend 2 matching Supporters. Remove all enemy pieces there, place the matching Base and 1 Warrior per sympathetic clearing of that suit, then place 1 Warrior in the Officers box.',
          architectTip: 'Revolt removes ALL enemy pieces; you score 1 VP per building and token removed. The warrior count includes the Revolt clearing itself.',
          ruleReference: '8.4.1',
        },
        {
          id: 'spread_sympathy',
          title: 'Spread Sympathy',
          description: 'Choose an unsympathetic clearing adjacent to a sympathetic one (any clearing if you have no Sympathy on the map). Spend matching Supporters equal to the cost printed above the token on your Sympathy track, place the token and score the VP on the space uncovered.',
          architectTip: 'Martial Law: If the target clearing has 3+ warriors of another player, spend 1 more matching Supporter. Sympathy tokens do not count toward Rule.',
          ruleReference: '8.4.2',
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
          description: 'Activate Sympathy tokens to craft cards.',
          ruleReference: '8.5.1',
        },
        {
          id: 'mobilize',
          title: 'Mobilize',
          description: 'Add cards from hand to the Supporters stack. These fuel Revolts and Sympathy placement.',
          architectTip: 'Build your Supporter stack early. No Supporters = no Revolts or Sympathy spread.',
          ruleReference: '8.5.2',
        },
        {
          id: 'train',
          title: 'Train',
          description: 'Spend a card matching the clearing of a Base on the map to place a Warrior in the Officers box.',
          architectTip: 'Each Officer gives you 1 Military Operations action. Officers come out of your supply of 10 Warriors, and you lose half of them (rounded up) whenever a Base is removed.',
          ruleReference: '8.5.3',
        }
      ]
    },
    {
      id: 'evening',
      title: 'Evening',
      color: 'border-indigo-500',
      steps: [
        {
          id: 'military_ops',
          title: 'Military Operations',
          description: 'Take up to 1 action per Officer, in any order: Move (one move), Battle, Recruit (place a Warrior in a clearing with a Base), Organize (remove an Alliance Warrior from an unsympathetic clearing to place Sympathy there and score).',
          architectTip: 'Organize places Sympathy without spending Supporters and ignores adjacency. It costs the Warrior, not a card.',
          ruleReference: '8.6.1',
        },
        {
          id: 'draw',
          title: 'Draw & Discard',
          description: 'Draw 1 card + 1 per uncovered draw bonus. Discard down to 5.',
          ruleReference: '8.6.2',
        }
      ]
    }
  ],
  strategy: {
    summary: "Spread & Grow. Area Control + Multi-Step Escalation. Threat of Revolt. Spread sympathy easily. Strong defense against attackers and incomers.",
    tips: [
      { title: "Start", text: "Place 3 sympathy in center to maximize Outrage. Mobilize full hand to Revolt on Turn 2." },
      { title: "Guerrilla War", text: "Best skill in the game. Lure people to attack you. Ambush cards are your best friends." },
      { title: "Early Game", text: "Spread Sympathy to clearings with many connections to maximize Outrage. Get to 3 Officers ASAP." },
      { title: "Mid Game", text: "Don't spread yourself. Keep 2 bases well defended. Craft cards, they are valuable." }
    ]
  }
};