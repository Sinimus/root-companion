import { IHireling } from '@/types/engine';

// Card texts transcribed from the Leder Games card library (cards.ledergames.com),
// ROOT-174 to ROOT-199 and ROOT-355 to ROOT-360. Timing icons follow Law H.2.
export const HIRELINGS_DATA: IHireling[] = [
  {
    id: 'forest_patrol',
    name: 'Forest Patrol',
    pack: 'Marauder Expansion',
    replacesFaction: 'marquise',
    ruleReference: 'H',
    iconName: 'Cat',
    promotedSide: {
      name: 'Forest Patrol',
      setup: 'Place a Patrol warrior in each clearing.',
      abilities: [
        { type: 'ability', effect: 'Whenever any Patrol warriors are removed, place one of them on this card, not in the supply.' },
        { type: 'daylight', effect: 'You may move, and then you may battle. OR: Place all Patrol warriors from this card into a clearing with any Patrol warriors.' },
      ],
    },
    demotedSide: {
      name: 'Feline Physicians',
      abilities: [
        { type: 'ability', effect: 'Controller: Whenever any of your faction warriors are removed, you may spend a card matching their clearing to place those warriors in a clearing with your faction pieces, instead of your supply (like Field Hospitals).' },
      ],
    },
  },
  {
    id: 'last_dynasty',
    name: 'Last Dynasty',
    pack: 'Marauder Expansion',
    replacesFaction: 'eyrie',
    ruleReference: 'H',
    iconName: 'Bird',
    promotedSide: {
      name: 'Last Dynasty',
      setup: 'Place all 5 Dynasty warriors in a clearing on the map edge.',
      abilities: [
        { type: 'daylight', effect: 'If no Dynasty warriors are on the map, place all 5 Dynasty warriors in any edge clearing and battle there. OR: If they rule their clearing, move all their warriors and then battle with them if able. OR: If they do not rule their clearing, battle there twice.' },
      ],
    },
    demotedSide: {
      name: 'Bluebird Nobles',
      abilities: [
        { type: 'ability', effect: 'Controller: You rule clearings when tied for presence (like Lords of the Forest).' },
        { type: 'birdsong', effect: 'Controller: Score one point for every three clearings you rule.' },
      ],
    },
  },
  {
    id: 'spring_uprising',
    name: 'Spring Uprising',
    pack: 'Marauder Expansion',
    replacesFaction: 'alliance',
    ruleReference: 'H',
    iconName: 'Rabbit',
    promotedSide: {
      name: 'Spring Uprising',
      setup: 'Roll the uprising die twice and place an Uprising warrior in matching clearings.',
      abilities: [
        { type: 'hired', effect: 'If no Uprising warriors are on the map, roll the uprising die and place an Uprising warrior in a matching clearing.' },
        { type: 'ability', effect: 'To battle the Uprising, the attacker must discard a card matching the battle clearing.' },
        { type: 'birdsong', effect: '1st: You must roll the uprising die. 2nd: You must remove an Uprising warrior and all enemy pieces from a matching clearing. OR: You must place an Uprising warrior in a matching clearing.' },
      ],
    },
    demotedSide: {
      name: 'Rabbit Scouts',
      abilities: [
        { type: 'ability', effect: 'Controller: As defender in battle, before the roll, you may spend a card matching the battle clearing to use the higher roll and make the attacker use the lower roll (like Guerrilla War).' },
      ],
    },
  },
  {
    id: 'the_exile',
    name: 'The Exile',
    pack: 'Marauder Expansion',
    replacesFaction: 'vagabond_1',
    ruleReference: 'H',
    iconName: 'User',
    promotedSide: {
      name: 'The Exile',
      setup: 'Put the Exile pawn in any forest and the 3 Club items on this card.',
      abilities: [
        { type: 'ability', effect: 'Anytime on their turn, a player with faction pieces adjacent to the Exile may place an item from their Crafted Items box on this card to draw a card and score a point.' },
        { type: 'daylight', effect: 'Any number of times, you may exhaust one item here to move to an adjacent forest, and may exhaust two items here to battle in an adjacent clearing. When done, refresh all items here. In battle, you can roll hits up to the number of items here. For each hit taken, exhaust one item, or remove one if you cannot exhaust any.' },
      ],
    },
    demotedSide: {
      name: 'The Brigand',
      setup: 'Place "R" items under the ruins as if the Vagabond were in play.',
      abilities: [
        { type: 'daylight', effect: 'Controller: You may take an item from a ruin in a clearing with your faction pieces. (As Lord of the Hundreds, put it in your Hoard.) If you took the last item from the ruin, remove the ruin.' },
        { type: 'daylight', effect: 'Controller: You may exhaust an item in your Crafted Items box (not Hoard) to take a random card from a player with faction pieces in a clearing with your faction pieces.' },
      ],
    },
  },
  {
    id: 'flame_bearers',
    name: 'Flame Bearers',
    pack: 'Marauder Hirelings Pack',
    replacesFaction: 'hundreds',
    ruleReference: 'H',
    iconName: 'Flame',
    promotedSide: {
      name: 'Flame Bearers',
      setup: 'Place 2 Bearer warriors among any clearings (even the same).',
      abilities: [
        { type: 'hired', effect: 'If no Bearer warriors are on the map, place 2 Bearer warriors among any clearings.' },
        { type: 'birdsong', effect: '1st: In each clearing with any Bearer warriors, you must remove one enemy piece per Bearer warrior there, warriors first. 2nd: You must place one Bearer warrior at a Bearer warrior or adjacent to one. If you cannot, place 2 Bearer warriors in any clearings.' },
      ],
    },
    demotedSide: {
      name: 'Rat Smugglers',
      abilities: [
        { type: 'ability', effect: 'Controller: Any number of times in Daylight, you may discard a card with an item in order to move or battle. (You do not need to be able to craft it.)' },
      ],
    },
  },
  {
    id: 'vault_keepers',
    name: 'Vault Keepers',
    pack: 'Marauder Hirelings Pack',
    replacesFaction: 'keepers',
    ruleReference: 'H',
    iconName: 'KeyRound',
    promotedSide: {
      name: 'Vault Keepers',
      setup: 'Place 2 Keeper warriors and a vault building in any clearing with an open building slot.',
      abilities: [
        { type: 'hired', effect: 'If no Keeper pieces are on the map, place 2 Keeper warriors and a vault building in any clearing.' },
        { type: 'daylight', effect: '1st: You may place a vault in a clearing with a vault or adjacent to one. If you cannot, place a warrior and a vault in any clearing. 2nd: You may battle in each clearing with a vault. OR: You may place a Keeper warrior at each vault.' },
      ],
    },
    demotedSide: {
      name: 'Badger Bodyguards',
      abilities: [
        { type: 'ability', effect: 'Controller: In battle, you ignore the first hit you take. (This does not combine with other effects that let you ignore the first hit you take.)' },
      ],
    },
  },
  {
    id: 'popular_band',
    name: 'Popular Band',
    pack: 'Marauder Hirelings Pack',
    ruleReference: 'H',
    iconName: 'Music',
    promotedSide: {
      name: 'Popular Band',
      setup: 'Place 2 Band warriors, each in a different clearing.',
      abilities: [
        { type: 'hired', effect: 'If no Band warriors are on the map, place a Band warrior in a clearing with your faction pieces.' },
        { type: 'ability', effect: 'Enemies cannot move from a clearing with a Band warrior on the same turn they moved into it.' },
        { type: 'daylight', effect: '1st: Choose a clearing with a Band warrior. You may force any faction warrior in each adjacent clearing to move into the chosen clearing. 2nd: You may place a Band warrior in any clearing.' },
      ],
    },
    demotedSide: {
      name: 'Street Band',
      abilities: [
        { type: 'ability', effect: 'Enemies cannot move from a clearing with a Band warrior on the same turn they moved into it.' },
        { type: 'daylight', effect: 'Place a Band warrior in any clearing.' },
      ],
    },
  },
  {
    id: 'riverfolk_flotilla',
    name: 'Riverfolk Flotilla',
    pack: 'Riverfolk Hirelings Pack',
    replacesFaction: 'riverfolk',
    ruleReference: 'H',
    iconName: 'Ship',
    promotedSide: {
      name: 'Riverfolk Flotilla',
      setup: 'Place the Flotilla pawn in a clearing on the map edge and river.',
      abilities: [
        { type: 'ability', effect: 'The Flotilla cannot be battled or removed. In battle, the Flotilla can roll up to 3 hits.' },
        { type: 'birdsong', effect: '1st: Each player with faction pieces at the Flotilla may draw a card. 2nd: You must move the Flotilla along the river, ignoring rule. Then, the Flotilla may battle.' },
      ],
    },
    demotedSide: {
      name: 'Otter Divers',
      abilities: [
        { type: 'ability', effect: 'Controller: You ignore rule when moving to or from a clearing on the river.' },
      ],
    },
  },
  {
    id: 'warm_sun_prophets',
    name: 'Warm Sun Prophets',
    pack: 'Riverfolk Hirelings Pack',
    replacesFaction: 'cult',
    ruleReference: 'H',
    iconName: 'Sun',
    promotedSide: {
      name: 'Warm Sun Prophets',
      setup: 'Place a Prophet warrior in each clearing with a ruin.',
      abilities: [
        { type: 'hired', effect: 'If no Prophet warriors are on the map, place a Prophet warrior in any clearing.' },
        { type: 'daylight', effect: 'Choose any player (even controller) with faction pieces in a clearing with a Prophet warrior. Force them to battle there, or force them to move as many pieces as they can from there to a clearing you choose and battle in the destination if you want. You choose the defender. OR: Place a Prophet warrior in a clearing without one.' },
      ],
    },
    demotedSide: {
      name: 'Lizard Envoys',
      abilities: [
        { type: 'birdsong', effect: 'Controller: You may search the top five cards in the discard pile and take a card of the most common suit except an ambush. You cannot count birds as other suits, and you decide on suit ties.' },
      ],
    },
  },
  {
    id: 'highway_bandits',
    name: 'Highway Bandits',
    pack: 'Riverfolk Hirelings Pack',
    ruleReference: 'H',
    iconName: 'Swords',
    promotedSide: {
      name: 'Highway Bandits',
      setup: 'Place 2 bandits, one each on a path without one.',
      abilities: [
        { type: 'ability', effect: 'When an enemy moves on a path with a bandit, they must remove one moving piece or damage one item (if Vagabond).' },
        { type: 'ability', effect: 'Controller: When you move on a path with a bandit, you may place a warrior in the destination clearing.' },
        { type: 'daylight', effect: 'Place a bandit on a path without one, linked to a clearing with your faction pieces. If no bandits are in the supply, you may remove one in order to place it.' },
      ],
    },
    demotedSide: {
      name: 'Bandit Gangs',
      abilities: [
        { type: 'hired', effect: 'If no Bandit warriors are on the map, place one in a clearing with your faction pieces.' },
        { type: 'ability', effect: 'Bandit warriors cannot be battled in clearings with their controller\'s faction pieces.' },
        { type: 'daylight', effect: 'Place a faction warrior of the controller at each Bandit warrior. OR: Place a Bandit warrior in a clearing with a faction piece of the controller.' },
      ],
    },
  },
  {
    id: 'sunward_expedition',
    name: 'Sunward Expedition',
    pack: 'Underworld Hirelings Pack',
    replacesFaction: 'duchy',
    ruleReference: 'H',
    iconName: 'Pickaxe',
    promotedSide: {
      name: 'Sunward Expedition',
      setup: 'Place a foothold token and 3 Expedition warriors in any clearing.',
      abilities: [
        { type: 'daylight', effect: '1st: Place a foothold token and up to 3 Expedition warriors in a clearing with no foothold. If no footholds are in the supply, remove one from the map in order to place it. 2nd: You may move, and then you may battle. OR: Place a warrior at each foothold.' },
      ],
    },
    demotedSide: {
      name: 'Mole Artisans',
      abilities: [
        { type: 'ability', effect: 'Controller: Whenever you craft a card with an item, you may reveal it instead of discarding it. At end of Evening, return the cards you revealed in this way to your hand. (You may end your turn with 6+ cards.)' },
      ],
    },
  },
  {
    id: 'corvid_spies',
    name: 'Corvid Spies',
    pack: 'Underworld Hirelings Pack',
    replacesFaction: 'corvid',
    ruleReference: 'H',
    iconName: 'Eye',
    promotedSide: {
      name: 'Corvid Spies',
      setup: 'Place 2 Spy warriors, one each in two clearings of matching suit.',
      abilities: [
        { type: 'daylight', effect: '1st: Place 2 Spy warriors among any clearings with enemy pieces. 2nd: Battle in each clearing with any Spy warriors. OR: In one clearing with any Spy warriors, the controller takes a random card from each enemy with faction pieces there.' },
      ],
    },
    demotedSide: {
      name: 'Raven Sentries',
      abilities: [
        { type: 'ability', effect: 'Controller: In battle, you deal an extra hit if the battle clearing has buildings or tokens of your faction.' },
      ],
    },
  },
  {
    id: 'furious_protector',
    name: 'Furious Protector',
    pack: 'Underworld Hirelings Pack',
    ruleReference: 'H',
    iconName: 'Shield',
    promotedSide: {
      name: 'Furious Protector',
      setup: 'Place the Protector pawn in any clearing.',
      abilities: [
        { type: 'ability', effect: 'The Protector cannot be battled or removed. Enemies cannot place pieces in its clearing.' },
        { type: 'birdsong', effect: '1st: You must move the Protector, ignoring rule. 2nd: You must remove one faction warrior of each player (even you) in the Protector\'s clearing. (Do not remove hirelings.)' },
      ],
    },
    demotedSide: {
      name: 'Stoic Protector',
      abilities: [
        { type: 'hired', effect: 'If the Protector pawn is not on the map, place it in a clearing with your faction pieces.' },
        { type: 'ability', effect: 'The Protector cannot be battled or removed.' },
        { type: 'ability', effect: 'Controller: Enemies cannot battle or remove your faction pieces at the Protector.' },
        { type: 'birdsong', effect: 'You must move the Protector, ignoring rule.' },
      ],
    },
  },
  {
    id: 'sunny_advocates',
    name: 'Sunny Advocates',
    pack: 'Homeland Hirelings Pack',
    ruleReference: 'H',
    iconName: 'Megaphone',
    promotedSide: {
      name: 'Sunny Advocates',
      setup: 'Place 2 Advocate warriors each in a fox, mouse, and rabbit clearing.',
      abilities: [
        { type: 'hired', effect: 'If no Advocate warriors are on the map, place 1 Advocate warrior in any clearing.' },
        { type: 'daylight', effect: 'Choose a clearing suit. In each matching clearing with any Advocate warriors, replace 1 enemy warrior with a warrior of your faction. Then, place 1 Advocate warrior in a clearing without them at your faction pieces. If you cannot, place 1 Advocate warrior in any clearing.' },
      ],
    },
    demotedSide: {
      name: 'Bat Messengers',
      abilities: [
        { type: 'ability', effect: 'Controller: When you place a building or token of your faction, you may also place 1 warrior at it.' },
      ],
    },
  },
  {
    id: 'river_roamers',
    name: 'River Roamers',
    pack: 'Homeland Hirelings Pack',
    ruleReference: 'H',
    iconName: 'Waves',
    promotedSide: {
      name: 'River Roamers',
      setup: 'Place 2 Roamer warriors and 1 lilypad in a river clearing.',
      abilities: [
        { type: 'hired', effect: 'If no lilypads are on the map, place 2 Roamer warriors and 1 lilypad in a river clearing.' },
        { type: 'daylight', effect: '1st: Controller: Craft using lilypads. 2nd: Battle at each lilypad. OR: Place 2 Roamer warriors in a river clearing. Place 1 lilypad there if it doesn\'t have one.' },
      ],
    },
    demotedSide: {
      name: 'Frog Tinkers',
      abilities: [
        { type: 'birdsong', effect: 'Controller: Draw the top card of the deck and place it face up near the deck. When crafting, you may spend this card as a crafting icon of its suit. (Count a bird as a suit of your choice.) At end of Evening, discard this card.' },
      ],
    },
  },
  {
    id: 'prosperous_farmers',
    name: 'Prosperous Farmers',
    pack: 'Homeland Hirelings Pack',
    ruleReference: 'H',
    iconName: 'Wheat',
    promotedSide: {
      name: 'Prosperous Farmers',
      setup: 'Place 1 farm and 1 Farmer warrior each in two clearings.',
      abilities: [
        { type: 'hired', effect: 'If no farms are on the map, place 1 Farmer warrior and 1 farm in a clearing with your faction pieces.' },
        { type: 'ability', effect: 'Players cannot score any points by removing farms.' },
        { type: 'daylight', effect: '1st: If you rule any farms, draw 1 card and place 1 farm in the clearing with the fewest warriors and a slot. 2nd: Battle at a farm, or place 1 warrior at each farm.' },
      ],
    },
    demotedSide: {
      name: 'Struggling Farmers',
      abilities: [
        { type: 'hired', effect: 'Remove farms and Farmer warriors from clearings that are not ruled by their former controller.' },
        { type: 'ability', effect: 'Players cannot score any points by removing farms.' },
        { type: 'daylight', effect: 'You may place 1 farm and 1 Farmer warrior in a clearing you rule. If you place both, draw 1 card.' },
      ],
    },
  },
];
