import { IFactionGuide } from '@/types/engine';

export const DUCHY_GUIDE: IFactionGuide = {
  factionId: 'duchy',
  setup: [
    '1. Form supplies of 20 Warriors and 3 Tunnel tokens. Place the Burrow board near the map.',
    '2. Place 2 Warriors and 1 Tunnel in a corner clearing that is not another player\'s starting corner (diagonally opposite one if possible).',
    '3. Place 2 Warriors in each clearing adjacent to that corner (not in the Burrow).',
    '4. Place 3 Citadels and 3 Markets on your Buildings spaces.',
    '5. Place the 9 Minister cards face up on your Unswayed Ministers pile.',
    '6. Place 9 Crowns on the VP spaces of your faction board.'
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
          description: 'Place 1 warrior + 1 per warrior icon showing on your board in the Burrow (off-map).',
          architectTip: 'Building uncovers icons on your Buildings tracks. Build early to boost your economy.',
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
          description: 'Take up to 2 actions: Build (reveal a card to place a Citadel/Market in a matching clearing you rule), Recruit (1 warrior in the Burrow), Move, Battle, Dig.',
          architectTip: 'Dig: Spend a card to place a Tunnel in a matching clearing without one, then move 1 to 4 warriors from the Burrow there. The Burrow is adjacent to every Tunnel clearing, so going tunnel to tunnel takes two moves.',
          ruleReference: '12.5.1',
        },
        {
          id: 'parliament',
          title: 'Parliament',
          description: 'Take the action of each Swayed Minister once, in any order. Squires: Foremole (build in any clearing you rule), Captain (battle), Marshal (move). Nobles: Brigadier (2 moves or 2 battles), Banker (spend same-suit cards for VP), Mayor (copy a swayed Squire or Noble). Lords: Duchess of Mud (2 VP if all 3 Tunnels are on the map), Baron of Dirt (1 VP per Market on the map), Earl of Stone (1 VP per Citadel on the map).',
          architectTip: 'Each Minister has its own action, used once per turn. They are not extra Assembly actions.',
          ruleReference: '12.5.2',
        },
        {
          id: 'sway',
          title: 'Sway',
          description: 'Sway 1 Minister of a rank (Squire, Noble, Lord) you still have a Crown for. Reveal the number of cards listed on it; each card needs a different matching clearing with a Duchy piece. Place a Crown on the Minister and score.',
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
          architectTip: 'Citadels and Markets are identical for crafting. Each must sit in a clearing matching a crafting icon on the card.',
          ruleReference: '12.6.2',
        },
        {
          id: 'draw',
          title: 'Draw & Discard',
          description: 'Draw 1 card + 1 per card draw icon showing on your board. Discard down to 5.',
          architectTip: 'Building uncovers the card draw icons on your Buildings tracks.',
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