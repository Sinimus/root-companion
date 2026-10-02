export const LAW_SNIPPETS: Record<string, { title: string; text: string }> = {
  // Core Concepts
  'rule': {
    title: 'Rule',
    text: 'You rule a clearing if you have the MOST total Warriors + Buildings. Tokens and pawns do not count. Ties = nobody rules (except: the Eyrie rule on ties if they have a piece there; the Lizard Cult rules any clearing with one of its Gardens).'
  },
  'move': {
    title: 'Move',
    text: 'Take warriors from clearing A to adjacent clearing B. You must Rule either the origin OR the destination clearing.'
  },
  'battle': {
    title: 'Battle',
    text: 'Roll the two battle dice. Attacker deals the higher roll, Defender the lower. Maximum rolled hits = number of your warriors in the clearing. Extra hits are not limited. Each hit removes one piece, warriors first.'
  },
  'craft': {
    title: 'Craft',
    text: 'Activate crafting pieces in clearings matching the suits in the card\'s crafting cost. Each piece can only be activated once per turn.'
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
    text: 'Take up to 2 moves. You may move the same or separate groups of warriors.'
  },
  'overwork': {
    title: 'Overwork',
    text: 'Spend a card matching a Sawmill\'s clearing to place a Wood token there. This is a Daylight action.'
  },
  'build': {
    title: 'Build (Marquise)',
    text: 'Choose a clearing you rule with an open slot. Pay the Wood cost shown at the top of the building\'s column on your board (it rises with each building of that type), using Wood connected through clearings you rule. Score the VP on the space uncovered.'
  },

  // Eyrie Dynasties
  'turmoil': {
    title: 'Turmoil',
    text: 'If you cannot fully take a Decree action: lose 1 VP per Bird card on the Decree (including Loyal Viziers), discard the Decree except the Loyal Viziers, replace your Leader, and end Daylight immediately.'
  },
  'decree': {
    title: 'Decree',
    text: 'Your action plan for the turn. Resolve columns left to right and resolve EVERY card in each column, or suffer Turmoil.'
  },

  // Woodland Alliance
  'revolt': {
    title: 'Revolt',
    text: 'Spend 2 Supporters matching a sympathetic clearing. Remove ALL enemy pieces there, place the matching Base and 1 Warrior per sympathetic clearing of that suit, and gain 1 Officer.'
  },
  'organize': {
    title: 'Organize',
    text: 'Remove 1 Alliance warrior from an unsympathetic clearing to place a Sympathy token there, and score the VP on the space uncovered.'
  },
  'spread': {
    title: 'Spread Sympathy',
    text: 'Place a Sympathy token in an unsympathetic clearing adjacent to a sympathetic one. Spend matching Supporters equal to the cost printed above the token on your Sympathy track (+1 under Martial Law).'
  },

  // Vagabond
  'aid': {
    title: 'Aid',
    text: 'Exhaust any item and give a card matching your clearing to a player with pieces there. You may take one item from their Crafted Items box. Enough Aid in one turn advances that faction along the Allied track; a Hostile faction can be aided but its marker does not move.'
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
    text: 'Exhaust Hammer. Move one damaged item from the Damaged box to your Satchel, keeping it on its current side.'
  },
  'quest': {
    title: 'Quest',
    text: 'Choose a Quest matching your clearing and exhaust the 2 items it lists. Either score 1 VP per completed quest of that suit OR draw 2 cards.'
  },

  // Riverfolk Company
  'commit': {
    title: 'Commit',
    text: 'Move a warrior from the Funds box to the Committed box to pay for an action. Committed funds return to Funds next Birdsong; spent funds go back to their owner\'s supply.'
  },
  'dividends': {
    title: 'Dividends',
    text: 'Score 1 VP for every 2 Funds you have (only if you have a Trade Post built on the map).'
  },
  'services': {
    title: 'Services',
    text: 'At the start of their Birdsong other players may buy Riverfolk services by paying warriors into your Payments box: Hand Card (take a card from the Riverfolk hand), Riverboats (treat rivers as paths), Mercenaries (treat Riverfolk warriors as their own for rule and battle).'
  },

  // Lizard Cult
  'crusade': {
    title: 'Crusade',
    text: 'Spend 2 Acolytes. Either Battle in an Outcast clearing OR Move from an Outcast clearing and then Battle.'
  },
  'convert': {
    title: 'Convert',
    text: 'Spend 2 Acolytes. Replace one enemy warrior in an Outcast clearing with a Cult warrior.'
  },
  'sanctify': {
    title: 'Sanctify',
    text: 'Spend 3 Acolytes. Replace one enemy building in an Outcast clearing with a Garden of the Outcast suit.'
  },
  'rituals': {
    title: 'Rituals',
    text: 'Reveal cards from hand, one ritual per card. Revealed cards return to your hand in Evening, except cards spent to Score. Sacrifice requires revealing a bird card.'
  },

  // Underground Duchy
  'sway': {
    title: 'Sway',
    text: 'Choose an unswayed Minister of a rank (Squire, Noble, Lord) you still have a Crown for. Reveal the number of cards it lists; each card needs its own matching clearing with a Duchy piece. Revealed bird cards are discarded in Evening.'
  },
  'dig': {
    title: 'Dig',
    text: 'Spend a card to place a Tunnel in a matching clearing without one, then move 1 to 4 warriors from the Burrow to that clearing.'
  },
  'parliament': {
    title: 'Parliament',
    text: 'Take the action of each Swayed Minister once, in any order. Every Minister has its own action (for example Captain: battle; Banker: spend cards for VP; Earl of Stone: 1 VP per Citadel on the map).'
  },

  // Corvid Conspiracy
  'trick': {
    title: 'Trick',
    text: 'Swap two Plot tokens on the map. Both must be face up or both face down.'
  },
  'flip': {
    title: 'Flip',
    text: 'Flip a face-down Plot face up in a clearing with a Corvid warrior. Score 1 VP for each face-up Plot on the map, then resolve a Bomb or Extortion.'
  },
  'plot': {
    title: 'Plot',
    text: 'Place a new Plot token by spending warriors. Cost: 1 warrior + 1 additional warrior for each Plot already placed this turn.'
  },

  // Keepers in Iron
  'delve': {
    title: 'Delve',
    text: 'After Battle, in a clearing you rule with a Keeper warrior: flip a Relic in an adjacent forest and move it into the clearing. If you rule fewer clearings adjacent to that forest than the Relic\'s value, discard the Retinue card used.'
  },
  'recover': {
    title: 'Recover',
    text: 'Take a Relic from a clearing with a Waystation of the same type and place it on your board. Score its value (+2 VP if you filled a Relics column). If you rule fewer clearings of that suit than the Relic\'s value, discard the Retinue card used.'
  },
  'retinue': {
    title: 'Retinue',
    text: 'Cards tucked into the three columns of your faction board. The column sets the action (Move / Battle then Delve / Move or Recover), the card\'s suit sets the clearing. Maximum 10 cards.'
  },

  // Lord of the Hundreds
  'raze': {
    title: 'Raze',
    text: 'In each clearing with a Mob: remove all enemy buildings and tokens and take an item from a ruin there. Then roll the Mob Die and place a Mob in a matching clearing adjacent to a Mob.'
  },
  'incite': {
    title: 'Incite',
    text: 'Spend a card to place a Mob token in a matching clearing that has no Mob and has a Hundreds warrior.'
  },
  'oppress': {
    title: 'Oppress',
    text: 'Count clearings you Rule with a Hundreds piece and NO enemy pieces. 1-2 clearings: 1 VP. 3-4: 2 VP. 5: 3 VP. 6+: 4 VP.'
  },
  'mood': {
    title: 'Mood',
    text: 'Each Birdsong you must switch to a different Mood card. You cannot pick a Mood whose item is in your Hoard. There are 8 Moods, each granting an ability for the turn.'
  },

  // Additional Core Terms
  'ambush': {
    title: 'Ambush',
    text: 'Played by the defender before the roll, matching the clearing. Deals 2 hits immediately. Cancelled if the attacker also plays a matching Ambush.'
  },
  'favor': {
    title: 'Favor Cards',
    text: 'Standard deck only. Removes ALL enemy pieces (warriors, buildings, tokens) from clearings of the matching suit.'
  },
  'partisans': {
    title: 'Partisan Cards',
    text: 'Exiles and Partisans deck only. In battle in clearings of the card\'s suit you may deal 1 extra hit, then discard all your cards except those of that suit.'
  }
};