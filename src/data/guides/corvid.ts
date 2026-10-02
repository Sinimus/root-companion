import { IFactionGuide } from '@/types/engine';

export const CORVID_GUIDE: IFactionGuide = {
  factionId: 'corvid',
  setup: [
    '1. Form supplies of 15 Warriors and 8 Plot tokens, face down.',
    '2. Place 1 Warrior in any clearing of each suit (3 Warriors in total).'
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
          description: 'Any number of times: flip a Plot face up in a clearing with a Corvid warrior, score 1 VP per face-up Plot on the map (including the new one), then resolve it if it is a Bomb or Extortion.',
          architectTip: 'A Plot without a Corvid warrior in its clearing cannot be flipped. Each flip scores more than the one before.',
          ruleReference: '13.4.2',
        },
        {
          id: 'recruit',
          title: 'Recruit',
          description: 'Once per turn, spend any card to place 1 warrior in each matching clearing.',
          architectTip: 'You recruit in every clearing of that suit, no Plot needed. With a bird card, choose one suit.',
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
          description: 'Take up to 3 actions: Move (one move), Plot (place a face-down Plot), Battle, Trick (swap two Plots on the map, both face up or both face down).',
          architectTip: 'Plot cost: remove 1 warrior + 1 more per Plot already placed this turn, from a clearing with no Plot token. Gets expensive!',
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
          id: 'exert',
          title: 'Exert',
          description: 'You may take one Daylight action if you choose not to draw cards this Evening.',
          ruleReference: '13.6.1',
        },
        {
          id: 'draw',
          title: 'Draw',
          description: 'Draw 1 card + 1 per face-up Extortion token on the map. Discard down to 5.',
          architectTip: 'Only face-up Extortions add card draw. Other Plots do not.',
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
      { title: "Plots", text: "RAIDS pay out warriors when they are removed, not when flipped. Play EXTORTIONS early for cards. BOMBS for mid/late game." },
      { title: "Weak Spots", text: "Target low-warrior factions (Alliance, Riverfolk). Focus on one faction to overwhelm them." }
    ]
  }
};