import { IFactionGuide } from '@/types/engine';

export const VAGABOND_GUIDE: IFactionGuide = {
  factionId: 'vagabond_1',
  setup: [
    '1. Choose a character card and place it in your Character Card slot.',
    '2. Place your Vagabond pawn in any forest.',
    '3. Shuffle the quest deck, draw 3 quests and place them face up near you.',
    '4. Take the 4 ruins and the Bag, Boot, Hammer and Sword marked "R". Put one item under each ruin, shuffle and return the ruins to the map.',
    '5. Take the "S" items listed on your character card. Tea, Coins and Bags go face up on their tracks, all other items face up in your Satchel.',
    '6. Place a relationship marker for each other faction on the Indifferent space.'
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
          description: 'Flip 2 exhausted items face up per Tea face up on the Refresh track. Then flip 3 more exhausted items face up.',
          architectTip: 'Tea you flip face up in this step does not count. Refresh does not repair: damaged items stay in the Damaged box.',
          ruleReference: '9.4.1',
        },
        {
          id: 'slip',
          title: 'Slip',
          description: 'Move to an adjacent clearing or forest without exhausting a Boot, even into a Hostile clearing.',
          architectTip: 'Slip ignores effects that prevent moving OUT of a clearing (such as a Corvid snare). It is the only way to enter a forest.',
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
          description: 'Exhaust items to perform actions in any order and number.',
          ruleReference: '9.5',
        },
        {
          id: 'move',
          title: 'Move',
          description: 'Exhaust 1 Boot to move 1 clearing. Exhaust 1 extra Boot if the destination has warriors of a Hostile faction.',
          architectTip: 'You ignore rule when moving (Nimble). You cannot move into a forest with this action, only out of one.',
          ruleReference: '9.5.1',
        },
        {
          id: 'explore',
          title: 'Explore',
          description: 'Exhaust Torch. Take the item under a Ruin in your clearing. Score 1 VP.',
          architectTip: 'Each ruin holds 1 item (2 with two Vagabonds). Taking the last item removes the ruin.',
          ruleReference: '9.5.3',
        },
        {
          id: 'aid',
          title: 'Aid',
          description: 'Exhaust any 1 item and give a card matching your clearing to a player with pieces there. You may take 1 item from their Crafted Items box.',
          architectTip: 'Aiding enough times in one turn advances the relationship and scores VP. You may Aid a Hostile faction to take items, but its marker does not move.',
          ruleReference: '9.5.4',
        },
        {
          id: 'quest',
          title: 'Quest',
          description: 'Choose a Quest matching your clearing and exhaust the 2 items it lists. Score VP OR draw cards. Then draw a new quest.',
          architectTip: 'Score 1 VP per completed quest of that suit (including this one) OR draw 2 cards.',
          ruleReference: '9.5.5',
        },
        {
          id: 'battle_strike',
          title: 'Battle / Strike',
          description: 'Battle: Exhaust Sword to initiate a battle. Strike: Exhaust Crossbow to remove 1 enemy warrior in your clearing without rolling.',
          architectTip: 'In battle your maximum rolled hits equals your undamaged Swords. Strike can remove a building or token only if that enemy has no warriors there.',
          ruleReference: '9.5.2, 9.5.6',
        },
        {
          id: 'repair_craft',
          title: 'Repair / Craft',
          description: 'Repair: Exhaust Hammer to move 1 damaged item to the Satchel. Craft: Exhaust 1 Hammer per crafting icon on the card.',
          architectTip: 'To craft, your clearing must match every crafting icon on the card. A repaired item keeps its side (exhausted stays exhausted).',
          ruleReference: '9.5.7, 9.5.8',
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
          description: 'If in a Forest: move all damaged items to your Satchel and flip them face up.',
          architectTip: 'Free repair and refresh, only in forests. Damaged items sit in the Damaged box; face down means exhausted, not damaged.',
          ruleReference: '9.6.1',
        },
        {
          id: 'draw',
          title: 'Draw Cards',
          description: 'Draw 1 card + 1 per Coin face up on the Coins track. Then discard down to 5 cards.',
          architectTip: 'An exhausted Coin leaves its track and gives no draw this turn.',
          ruleReference: '9.6.2',
        },
        {
          id: 'limit',
          title: 'Item Capacity',
          description: 'Item limit: 6 + 2 per Bag face up on the Bags track. Count Satchel and Damaged box together and remove the excess.',
          architectTip: 'Items on the Tea, Coins and Bags tracks do not count. Removed items leave the game permanently.',
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
