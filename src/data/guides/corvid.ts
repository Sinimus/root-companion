import { IFactionGuide } from '@/types/engine';

export const CORVID_GUIDE: IFactionGuide = {
  factionId: 'corvid',
  setup: [
    '1. Place 3 Plots (tokens) in 3 different clearings.',
    '2. Place 1 Warrior on each Plot.',
    '3. Place your starting 6 Warriors in clearings with your Plots.',
    '4. Place 1 Extortion token on each Plot.',
    '5. Draw 5 starting cards.'
  ],
  phases: [
    {
      id: 'birdsong',
      title: 'Birdsong',
      color: 'border-purple-700',
      steps: [
        {
          id: 'craft',
          title: 'Craft',
          description: 'Activate Plot tokens (face up or down) to craft cards.',
          architectTip: 'Plots can craft from anywhere! You don\'t need to rule the clearing.',
          ruleReference: '13.4.1',
        },
        {
          id: 'flip',
          title: 'Flip Plots',
          description: 'Flip any number of your Plots. Score 1 VP per face-up Plot on the map.',
          architectTip: 'Face-up plots are vulnerable! Face-down plots are hidden but can\'t score.',
          ruleReference: '13.4.2',
        },
        {
          id: 'recruit',
          title: 'Recruit',
          description: 'Discard 1 card to place 1 warrior in each matching clearing where you have plots.',
          architectTip: 'Recruit in all clearings of that suit where you have plots, not just one!',
          ruleReference: '13.4.3',
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
          title: 'Actions',
          description: 'Take up to 3 actions: Move (2 spaces), Plot (place new Plot), Battle, Trick (move enemy warrior).',
          architectTip: 'Plot cost: 1 warrior + 1 additional warrior for each Plot already placed this turn. Gets expensive!',
          ruleReference: '13.5',
        }
      ]
    },
    {
      id: 'evening',
      title: 'Evening',
      color: 'border-indigo-500',
      steps: [
        {
          id: 'draw',
          title: 'Draw',
          description: 'Draw 1 card + 1 per face-up Extortion token on the map.',
          architectTip: 'Face-up plots give card draw but are vulnerable. Balance risk vs reward.',
          ruleReference: '13.6.2',
        }
      ]
    }
  ],
  strategy: {
    summary: "Chaos & Terrorism. Trap Triggering. Threat of Bomb. Move regardless of rule. Extra hit where they have a secret plot.",
    tips: [
      { title: "Unpredictable", text: "Appear unpredictable. Act like you 'randomly' select plots so people don't try to EXPOSE them." },
      { title: "Spread", text: "Don't spread too wide. Create teams of 3 warriors to place and protect plots." },
      { title: "Plots", text: "Flip RAIDS early for warriors. Play EXTORTIONS early for cards. BOMBS for mid/late game." },
      { title: "Weak Spots", text: "Target low-warrior factions (Alliance, Riverfolk). Focus on one faction to overwhelm them." }
    ]
  }
};