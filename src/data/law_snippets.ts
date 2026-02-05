export const LAW_SNIPPETS: Record<string, { title: string; text: string }> = {
  // Core Concepts
  'rule': {
    title: 'Rule',
    text: 'You rule a clearing if you have the MOST total Warriors + Buildings. Ties = nobody rules (except Eyrie always wins ties, Lizards in sympathetic clearings).'
  },
  'move': {
    title: 'Move',
    text: 'Take warriors from clearing A to adjacent clearing B. You must Rule either the origin OR the destination clearing.'
  },
  'battle': {
    title: 'Battle',
    text: 'Roll dice equal to your warriors. Attacker takes the higher die, Defender takes the lower. Maximum hits = number of your warriors. Remove pieces 1:1.'
  },
  'craft': {
    title: 'Craft',
    text: 'Activate pieces in clearings matching the card\'s suit to use the card\'s effect. Each piece can only be used once per turn for crafting.'
  },
  'recruit': {
    title: 'Recruit',
    text: 'Placing new warriors from supply onto the map. This is NOT a move, so it does not trigger move effects (like Outrage).'
  },
  'dominance': {
    title: 'Dominance',
    text: 'Requires 10 VP to play. Changes victory condition - you can no longer score VPs, must complete the Dominance objective to win.'
  },

  // Marquise de Cat
  'march': {
    title: 'March (Marquise)',
    text: 'Take up to 2 Move actions. Can move multiple warriors different distances, total cost cannot exceed 2 moves.'
  },
  'overwork': {
    title: 'Overwork',
    text: 'Spend a card matching a Sawmill\'s clearing to place a Wood token there. This is a Daylight action.'
  },
  'build': {
    title: 'Build (Marquise)',
    text: 'Spend Wood equal to the building\'s cost to place it in a clearing you rule. Sawmill = 1 Wood, Workshop = 2 Wood, Recruiter = 2 Wood.'
  },

  // Eyrie Dynasties
  'turmoil': {
    title: 'Turmoil',
    text: 'If you cannot complete a Decree action: Lose 1 VP per Bird card in hand, discard your entire Decree, change your Leader, and your Daylight phase ends immediately.'
  },
  'decree': {
    title: 'Decree',
    text: 'Your action plan for the turn. Must complete one action from each column (left to right), or suffer Turmoil.'
  },

  // Woodland Alliance
  'revolt': {
    title: 'Revolt',
    text: 'Spend 2 Supporters. Destroy ALL enemy pieces (Buildings, Tokens, Warriors) in a sympathetic clearing. Place your Base + 3 Warriors there.'
  },
  'organize': {
    title: 'Organize',
    text: 'Remove 1 of your warriors from the map to place a Sympathy token in that same clearing.'
  },
  'spread': {
    title: 'Spread Sympathy',
    text: 'Place Sympathy tokens in clearings adjacent to your existing Sympathy. Cost increases with distance from starting sympathy.'
  },

  // Vagabond
  'aid': {
    title: 'Aid',
    text: 'Exhaust any item + Give matching card to player in clearing. Take one of their items. Your relationship improves (Indifferent -> Allied -> Hostile cycle).'
  },
  'explore': {
    title: 'Explore',
    text: 'Exhaust Torch. Take an item from a Ruin in your clearing. Score 1 VP immediately.'
  },
  'strike': {
    title: 'Strike',
    text: 'Exhaust Crossbow. Remove 1 warrior (no dice roll). If no warriors present, can remove building or token instead.'
  },
  'repair': {
    title: 'Repair',
    text: 'Exhaust Hammer. Fix one damaged (face-down) item, flipping it face-up.'
  },
  'quest': {
    title: 'Quest',
    text: 'Exhaust 2 items matching the Quest symbol. Either score 1 VP per completed quest of that suit OR draw 2 cards.'
  },

  // Riverfolk Company
  'commit': {
    title: 'Commit',
    text: 'Move warriors from Funds box to Committed box. These warriors can be used for actions this turn.'
  },
  'dividends': {
    title: 'Dividends',
    text: 'Score 1 VP for every 2 Funds you have (only if you have a Trade Post built on the map).'
  },
  'services': {
    title: 'Services',
    text: 'Other players can pay you to use your Hirelings: Hand Cards, Riverboats (movement), or Mercenaries (extra actions).'
  },

  // Lizard Cult
  'crusade': {
    title: 'Crusade',
    text: 'Spend 2 Acolytes. Either Battle in an Outcast clearing OR Move from an Outcast clearing and then Battle.'
  },
  'convert': {
    title: 'Convert',
    text: 'Spend 2 Acolytes. Remove one enemy warrior in an Outcast clearing and replace it with one of your Acolytes.'
  },
  'sanctify': {
    title: 'Sanctify',
    text: 'Spend 3 Acolytes. Score 1 VP for each Garden in an Outcast clearing where you have an Acolyte.'
  },
  'rituals': {
    title: 'Rituals',
    text: 'Reveal cards from hand to perform actions. Cards are not discarded unless specified (Sacrifice ritual).'
  },

  // Duchy of Burgundy
  'sway': {
    title: 'Sway',
    text: 'Reveal cards matching clearings you occupy to gain a Minister of that suit. Bird cards help but are discarded.'
  },
  'dig': {
    title: 'Dig',
    text: 'Spend a card matching the clearing to place a Tunnel. Allows instant movement of warriors from Burrow to any tunnel.'
  },
  'parliament': {
    title: 'Parliament',
    text: 'Perform actions based on your Swayed Ministers. Duke = 3 actions, Duchess = 2 actions, Knight = 1 action.'
  },

  // Corvid Conspiracy
  'trick': {
    title: 'Trick',
    text: 'Swap two Plot tokens on the map. Can exchange positions to manipulate the board.'
  },
  'flip': {
    title: 'Flip',
    text: 'Reveal a face-down Plot token. Score 1 VP immediately for each face-up Plot on the map.'
  },
  'plot': {
    title: 'Plot',
    text: 'Place a new Plot token by spending warriors. Cost: 1 warrior + 1 additional warrior for each Plot already placed this turn.'
  },

  // Keepers in Iron
  'delve': {
    title: 'Delve',
    text: 'Move Keeper into a forest to find a Relic. Check if your Retinue card suit matches any forest adjacency.'
  },
  'recover': {
    title: 'Recover',
    text: 'Move a Relic to a Waystation. Score 3 VP immediately. Check if your Retinue card suit matches the Waystation suit.'
  },
  'retinue': {
    title: 'Retinue',
    text: 'Your hand of cards that determines available actions. Each card provides specific actions based on its suit.'
  },

  // Hundred Hills
  'raze': {
    title: 'Raze',
    text: 'Remove all enemy buildings and tokens in clearings with your Mobs. Roll Mob Die and may spread Mob to adjacent clearing.'
  },
  'incite': {
    title: 'Incite',
    text: 'Discard a card to place a Mob token in a matching clearing. Mobs spread automatically during Raze.'
  },
  'oppress': {
    title: 'Oppress',
    text: 'Score 1 VP for each clearing you Rule that has NO enemy pieces. Complete control required.'
  },
  'mood': {
    title: 'Mood',
    text: 'Choose one of three Mood cards each turn. Provides special bonuses but restricts which Items you can hold.'
  },

  // Additional Core Terms
  'ambush': {
    title: 'Ambush',
    text: 'Card played by defender before dice roll. Deals 2 automatic hits. Cancelled if attacker also plays Ambush.'
  },
  'favor': {
    title: 'Favor Cards',
    text: 'Standard deck only. Removes ALL enemy pieces (warriors, buildings, tokens) from clearings of the matching suit.'
  },
  'partisans': {
    title: 'Partisan Cards',
    text: 'Exiles deck only. Deal extra hits in battle but require discarding matching cards from hand.'
  }
};