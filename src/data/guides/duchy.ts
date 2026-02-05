import { IFactionGuide } from '@/types/engine';

export const DUCHY_GUIDE: IFactionGuide = {
  factionId: 'duchy',
  setup: [
    '1. Place the Burrow (token) in a corner clearing.',
    '2. Place your 6 starting Warriors in the Burrow (off-map).',
    '3. Place 1 Citadel in the Burrow clearing.',
    '4. Place 2 Ministers in the Burrow clearing.',
    '5. Place your Baron token in the Burrow clearing.'
  ],
  phases: [
    {
      id: 'birdsong',
      title: 'Birdsong',
      color: 'border-amber-700',
      steps: [
        {
          id: 'place_units',
          title: 'Place Warriors',
          description: 'Place 1 warrior + 1 per Citadel built in the Burrow (off-map).',
          architectTip: 'More Citadels = more warriors per turn. Build Citadels early to boost your economy.',
          ruleReference: '12.4',
        }
      ]
    },
    {
      id: 'daylight',
      title: 'Daylight',
      color: 'border-yellow-500',
      steps: [
        {
          id: 'assembly',
          title: 'Assembly',
          description: 'Take up to 2 actions: Build (Citadel/Market), Recruit (in Burrow), Move (through tunnels), Battle, Dig.',
          architectTip: 'Dig: Spend a card matching the clearing to place a Tunnel. Tunnels let you move anywhere instantly.',
          ruleReference: '12.5.1',
        },
        {
          id: 'parliament',
          title: 'Parliament',
          description: 'Perform actions of Swayed Ministers: Duke (3 actions), Duchess (2 actions), Knight (1 action).',
          architectTip: 'Minister actions = same as Assembly actions. Higher ranking ministers = more actions!',
          ruleReference: '12.5.2',
        },
        {
          id: 'sway',
          title: 'Sway',
          description: 'Reveal cards matching clearings where you have pieces. Take one available Minister from that suit.',
          architectTip: 'Price of Failure: If you lose a building, you lose your highest ranking Minister. Protect your buildings!',
          ruleReference: '12.5.3',
        }
      ]
    },
    {
      id: 'evening',
      title: 'Evening',
      color: 'border-indigo-500',
      steps: [
        {
          id: 'return',
          title: 'Return Cards',
          description: 'Return cards revealed for Sway to hand (Discard any Bird cards used!).',
          architectTip: 'Bird cards help you Sway but are discarded! Plan your Bird usage carefully.',
          ruleReference: '12.6.1',
        },
        {
          id: 'craft',
          title: 'Craft',
          description: 'Activate Citadels and Markets to craft cards.',
          architectTip: 'Citadels and Markets must be in clearings matching the crafted card suit.',
          ruleReference: '12.6.2',
        },
        {
          id: 'draw',
          title: 'Draw & Discard',
          description: 'Draw 1 card + 1 per bonus icon on Citadels track. Discard down to 5.',
          architectTip: 'Build more Citadels to increase card draw and VP scoring.',
          ruleReference: '12.6.3',
        }
      ]
    }
  ],
  strategy: {
    summary: "Prudence & Organization. Set Collection + Area Control. Dig tunnels to pop up anywhere. Slow build-up, unstoppable late.",
    tips: [
      { title: "Buildings", text: "Prioritize and protect Buildings. Losing them triggers Price of Failure which is devastating." },
      { title: "Ministers", text: "Unlock the 3 Squires first to get actions ASAP. Brigadier + Mayor is a strong combo." },
      { title: "Tunnels", text: "Use the Burrow and tunnels to move (teleport style). Dig action is perfect for Dominance." },
      { title: "Crafting", text: "Craft cards that give extra actions, like League of Adventurous Mice." }
    ]
  }
};