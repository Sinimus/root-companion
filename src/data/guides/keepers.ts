import { IFactionGuide } from '@/types/engine';

export const KEEPERS_GUIDE: IFactionGuide = {
  factionId: 'keepers',
  setup: [
    '1. Shuffle all 12 Relics face down (value hidden) and place one randomly in each forest. Form a supply of 15 Warriors.',
    '2. Place 4 Warriors in a corner clearing that is not another player\'s starting corner (diagonally opposite one if possible).',
    '3. Place 4 Warriors in a map-edge clearing adjacent to that corner.',
    '4. Place the remaining Relics randomly, as evenly as possible, among forests not adjacent to clearings with your warriors.',
    '5. Tuck one Faithful Retainer card into each Retinue slot.',
    '6. Place your 3 Waystations on the Waystations spaces of your faction board.'
  ],
  phases: [
    {
      id: 'birdsong',
      title: 'Birdsong',
      color: 'border-stone-400',
      steps: [
        {
          id: 'encamp',
          title: 'Encamp',
          description: 'Once per clearing, you may replace a Keeper warrior with a Waystation (either side up).',
          architectTip: 'Waystations give crafting slots and help you Rule. Build them in key clearings.',
          ruleReference: '15.4.1',
        },
        {
          id: 'decamp',
          title: 'Decamp',
          description: 'Once per clearing, you may replace a Waystation with a Keeper warrior.',
          architectTip: 'Sometimes you need warriors more than Waystations. Flexibility is key.',
          ruleReference: '15.4.2',
        },
        {
          id: 'recruit',
          title: 'Recruit',
          description: 'Any number of times: spend a card to place 2 warriors at a matching Waystation.',
          architectTip: 'Recruit 2 warriors at once! Great for building numbers quickly.',
          ruleReference: '15.4.3',
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
          description: 'Activate Waystations to craft.',
          ruleReference: '15.5.1',
        },
        {
          id: 'retinue',
          title: 'Act with Retinue',
          description: 'Left to right, you may act once per card in each Retinue column, in a clearing matching the card: Move / Battle then Delve / Move or Recover.',
          architectTip: 'Delve: in a clearing you rule with a Keeper warrior, flip a Relic in an adjacent forest and move it into the clearing. Recover: take a Relic matching a Waystation in its clearing and score its value (1 to 3), +2 VP for filling a Relics column. Ruling fewer clearings than the Relic\'s value costs you the Retinue card.',
          ruleReference: '15.5.2',
        }
      ]
    },
    {
      id: 'evening',
      title: 'Evening',
      color: 'border-indigo-500',
      steps: [
        {
          id: 'live_off_land',
          title: 'Live Off the Land',
          description: 'Remove 1 Keeper warrior from each clearing that has 4 or more Keeper warriors.',
          architectTip: 'Limits your army size in each clearing. Balance between control and overpopulation.',
          ruleReference: '15.6.1',
        },
        {
          id: 'gather',
          title: 'Gather Retinue',
          description: 'Add any number of cards from hand to any Retinue slots, OR shift one Retinue card to a different slot. Maximum 10 cards.',
          architectTip: 'Build your Retinue over time for more actions. The column sets the action, the suit sets the clearing.',
          ruleReference: '15.6.2',
        },
        {
          id: 'draw',
          title: 'Draw',
          description: 'Draw 1 card + 1 per Waystation on map. Discard down to 5.',
          architectTip: 'More Waystations = more card draw. Build them strategically for card advantage.',
          ruleReference: '15.6.3',
        }
      ]
    }
  ],
  strategy: {
    summary: "Stealth & Efficiency. PickUp + Delivery. Relics are OP Defense. Plan moves ahead.",
    tips: [
      { title: "Planning", text: "Plan several turns ahead. Specialize in one suit (e.g. Fox) to avoid Recover penalty." },
      { title: "Not Police", text: "You are not a police faction. Do not sacrifice your turn to prevent others from winning." },
      { title: "Relics", text: "Relics are key. Be prepared for value 3 relics. Use small relics as Armor." },
      { title: "Retinue", text: "Keep it flexible and full. Cycle cards as much as possible." }
    ]
  }
};