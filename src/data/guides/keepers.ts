import { IFactionGuide } from '@/types/engine';

export const KEEPERS_GUIDE: IFactionGuide = {
  factionId: 'keepers',
  setup: [
    '1. Place your 3 starting Waystations in 3 different clearings.',
    '2. Place 1 Warrior on each Waystation.',
    '3. Place 3 additional Warriors in clearings with Waystations.',
    '4. Place your Keeper of Keys token in a clearing with a Waystation.',
    '5. Place 1 Relic in each of 3 different forests.'
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
          description: 'Replace one of your warriors with a Waystation in the same clearing.',
          architectTip: 'Waystations give crafting slots and help you Rule. Build them in key clearings.',
          ruleReference: '15.4.1',
        },
        {
          id: 'decamp',
          title: 'Decamp',
          description: 'Replace one of your Waystations with a warrior in the same clearing.',
          architectTip: 'Sometimes you need warriors more than Waystations. Flexibility is key.',
          ruleReference: '15.4.2',
        },
        {
          id: 'recruit',
          title: 'Recruit',
          description: 'Discard a card matching the clearing suit to place 2 warriors at a matching Waystation.',
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
          description: 'Perform actions for each card in Retinue: Move, Battle, Delve (find Relic), Recover (score Relic).',
          architectTip: 'Delve: Move Keeper into forest to get Relic. Recover: Return Relic to Waystation to score 3 VP.',
          ruleReference: '15.5.2',
          required: true,
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
          description: 'Remove 1 warrior from each of your clearings with 4+ total Keepers (warriors + waystations).',
          architectTip: 'Limits your army size in each clearing. Balance between control and overpopulation.',
          ruleReference: '15.6.1',
        },
        {
          id: 'gather',
          title: 'Gather Retinue',
          description: 'Add one card from hand to Retinue OR shift one card to the next day section.',
          architectTip: 'Build your Retinue over time for more actions. Plan which cards for which days.',
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