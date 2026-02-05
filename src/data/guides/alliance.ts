import { IFactionGuide } from '@/types/engine';

export const ALLIANCE_GUIDE: IFactionGuide = {
  factionId: 'alliance',
  setup: [
    '1. Place 1 Sympathy token in each corner clearing.',
    '2. Place 1 Warrior on each Sympathy token.',
    '3. Place 1 card on each Sympathy token (matching suit if possible).',
    '4. Place your Base on the Warriors track.'
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
          description: 'Spend 2 Supporters. Remove enemy pieces in matching sympathetic clearing. Place Base + 3 Warriors. Gain Officer.',
          architectTip: 'Revolt removes ALL enemy pieces (Building + Tokens), scoring 1 VP for each. Base gives you 1 Officer action.',
          ruleReference: '8.4.1',
        },
        {
          id: 'spread_sympathy',
          title: 'Spread Sympathy',
          description: 'Place Sympathy token in adjacent clearing. Place 1 Warrior on it. Place 1 card on it.',
          architectTip: 'Martial Law: If target clearing has 3+ warriors of one enemy, cost is +1 Supporter. Sympathy helps you Rule.',
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
          description: 'Spend a card matching any suit where you have a Base to gain an Officer.',
          architectTip: 'Officers give you Military Operations actions. Max 3 Officers from Bases + 1 from starting track.',
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
          description: 'Perform up to X actions: Move (3 spaces), Battle (hit = officers), Recruit (in clearings with Officers), Organize (move Officers).',
          architectTip: 'Organize lets you move Officers between clearings where you rule. Critical for spreading influence.',
          ruleReference: '8.6.1',
        },
        {
          id: 'draw',
          title: 'Draw & Discard',
          description: 'Draw 1 card + 1 per bonus icon on Bases track. Discard down to 5.',
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