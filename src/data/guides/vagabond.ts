import { IFactionGuide } from '@/types/engine';

export const VAGABOND_GUIDE: IFactionGuide = {
  factionId: 'vagabond_1',
  setup: [
    '1. Place your Vagabond pawn in any forest.',
    '2. Take starting items: 1 Boot, 1 Sword, 1 Torch, 1 Hammer, 1 Coin, 1 Bag.',
    '3. Place all starting items in your satchel (face up/exhausted).',
    '4. Set your starting relationship: Indifferent to all players.',
    '5. Place your quest token on the quest track.'
  ],
  phases: [
    {
      id: 'birdsong',
      title: 'Birdsong',
      color: 'border-gray-500',
      steps: [
        {
          id: 'refresh',
          title: 'Refresh',
          description: 'Flip 3 exhausted items face up. Flip +2 more for each Tea in satchel.',
          architectTip: 'Only refresh face-down (exhausted) items. Items you used last turn are exhausted.',
          ruleReference: '9.4.1',
        },
        {
          id: 'slip',
          title: 'Slip',
          description: 'Move to an adjacent clearing or forest for FREE. Ignore all restrictions.',
          architectTip: 'Best way to escape bad situations. Can move through hostile clearings without cost.',
          ruleReference: '9.4.2',
        }
      ]
    },
    {
      id: 'daylight',
      title: 'Daylight',
      color: 'border-yellow-500',
      steps: [
        {
          id: 'actions_intro',
          title: 'Perform Actions',
          description: 'Exhaust items to perform actions in any order.',
          ruleReference: '9.5',
        },
        {
          id: 'move',
          title: 'Move',
          description: 'Exhaust Boot. Move 2 clearings. Cost +1 Boot if moving into a Hostile clearing.',
          architectTip: 'Movement costs are per clearing. Hostile means any enemy pieces present.',
          ruleReference: '9.5.1',
        },
        {
          id: 'explore',
          title: 'Explore',
          description: 'Exhaust Torch. Take item from Ruin in clearing. Score 1 VP.',
          architectTip: 'Ruins have 3 items. Once empty, no more VP from exploring there.',
          ruleReference: '9.5.3',
        },
        {
          id: 'aid',
          title: 'Aid',
          description: 'Exhaust any Item. Give matching card to player in clearing. Take their Item. Improve Relationship.',
          architectTip: 'Can only aid when you have items to give! Allies give better items. Hostile cannot be aided.',
          ruleReference: '9.5.4',
        },
        {
          id: 'quest',
          title: 'Quest',
          description: 'Exhaust 2 items matching Quest (e.g., 2 Swords for Attack quest). Score VP OR Draw cards.',
          architectTip: 'Score 1 VP per completed quest of that suit OR Draw 2 cards. Great for VP engine.',
          ruleReference: '9.5.5',
        },
        {
          id: 'battle_strike',
          title: 'Battle / Strike',
          description: 'Battle: Exhaust Sword, roll dice. Strike: Exhaust Crossbow to remove warrior without rolling.',
          architectTip: 'Strike is guaranteed damage! Battle rolls dice but might miss.',
          ruleReference: '9.5.2',
        },
        {
          id: 'repair_craft',
          title: 'Repair / Craft',
          description: 'Repair: Exhaust Hammer to fix damaged item. Craft: Exhaust 2 Hammers matching clearing suit.',
          architectTip: 'Crafting requires 2 Hammers! Can craft items, get cards, or remove tokens.',
          ruleReference: '9.5.7',
        }
      ]
    },
    {
      id: 'evening',
      title: 'Evening',
      color: 'border-indigo-500',
      steps: [
        {
          id: 'rest',
          title: 'Rest',
          description: 'If in a Forest: Repair all damaged items (flip face up).',
          architectTip: 'Free repair! Only works in forests. Damaged items are face-down.',
          ruleReference: '9.6.1',
        },
        {
          id: 'draw',
          title: 'Draw Cards',
          description: 'Draw 1 card + 1 per Coin in satchel.',
          architectTip: 'Coins give you more card draw, which means more flexibility in actions.',
          ruleReference: '9.6.2',
        },
        {
          id: 'limit',
          title: 'Satchel Limit',
          description: 'Discard items down to limit: 6 + 2 per Bag in satchel.',
          architectTip: 'Must discard if over limit. Keep essential items, lose excess.',
          ruleReference: '9.6.4',
        }
      ]
    }
  ],
  strategy: {
    summary: "Questing & Adventure. Dungeon Crawling + Inventory Mgt. Play all sides. Complete quests, aid allies, slay hostiles.",
    tips: [
      { title: "Options", text: "Check your options every turn (craft, quest, aid, infamy?). Identify available items." },
      { title: "Aid", text: "Generates a lot of points. Don't give bird cards. Give item cards to players who can craft them." },
      { title: "Ruins", text: "Delay removing Ruins so others have less space and fight each other more." },
      { title: "Character", text: "Your character choice is key for your play style strategy." }
    ]
  }
};