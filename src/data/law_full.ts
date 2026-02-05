export interface LawRule {
  id: string;
  title: string;
  text: string;
  section: string;
  subsection: string;
}

export const LAW_FULL: LawRule[] = [
  {
    "id": "1.1.1",
    "title": "Precedence",
    "text": "If a card conflicts with the Law, follow the card. If the Learning to Play guide conflicts with the Law, follow the Law. If you can follow both a general rule and a faction or hireling rule, follow both; if you cannot, follow the faction or hireling rule.",
    "section": "1. Golden Rules",
    "subsection": "1.1 Rules Conflicts"
  },
  {
    "id": "1.1.2",
    "title": "Use of CANNOT",
    "text": "The term **CANNOT** is absolute. It cannot be overridden unless explicitly instructed.",
    "section": "1. Golden Rules",
    "subsection": "1.1 Rules Conflicts"
  },
  {
    "id": "1.1.3",
    "title": "Unclear Resolutions and Choices",
    "text": "Whenever it is unclear what order simultaneous effects should resolve in, or which player should make a decision, the player taking their turn chooses.",
    "section": "1. Golden Rules",
    "subsection": "1.1 Rules Conflicts"
  },
  {
    "id": "1.2.1",
    "title": "Hands",
    "text": "Players may only show or reveal cards in their hand if explicitly instructed, but the number of cards in their hand is public information.",
    "section": "1. Golden Rules",
    "subsection": "1.2 Public and Private Information"
  },
  {
    "id": "1.2.2",
    "title": "Discard",
    "text": "The discard pile can be searched and inspected at any time.",
    "section": "1. Golden Rules",
    "subsection": "1.2 Public and Private Information"
  },
  {
    "id": "1.3.1",
    "title": "Agreements",
    "text": "Players may discuss the game and make agreements, but they are non-binding.",
    "section": "1. Golden Rules",
    "subsection": "1.3 Negotiation and Deals"
  },
  {
    "id": "1.3.2",
    "title": "Cards",
    "text": "Players may only give cards to each other if explicitly instructed.",
    "section": "1. Golden Rules",
    "subsection": "1.3 Negotiation and Deals"
  },
  {
    "id": "1.4.1",
    "title": "Turn Structure",
    "text": "Each player's turn has three phases: Birdsong, Daylight, and Evening. Anything that says \"at start of\" a phase happens before everything else in the phase, and anything that says \"at end of\" happens after everything else in the phase but before the start of the next phase, if any. After a player ends Evening, the next clockwise player begins their turn. Play continues until one player has won the game (3.1).",
    "section": "1. Golden Rules",
    "subsection": "1.4 Game Structure"
  },
  {
    "id": "1.4.2",
    "title": "Interrupts",
    "text": "You cannot interrupt an action (including a compound action such as the Marquise's March), ability (such as the Corvids' Exposure), or persistent effect (such as the Eyrie Emigre card) with another effect unless it explicitly allows it.",
    "section": "1. Golden Rules",
    "subsection": "1.4 Game Structure"
  },
  {
    "id": "1.5.1",
    "title": "Limits",
    "text": "Pieces are limited by the contents of the game. Do not use proxy pieces if you run out.",
    "section": "1. Golden Rules",
    "subsection": "1.5 Pieces"
  },
  {
    "id": "1.5.2",
    "title": "Starting Faction",
    "text": "Each player owns the faction they choose in setup (5) and the pieces listed on the back of its faction board except for items. Generically, these are called **FACTION PIECES** or similar. Specifically, these are called **[FACTION NAME] PIECES**.",
    "section": "1. Golden Rules",
    "subsection": "1.5 Pieces"
  },
  {
    "id": "1.5.3",
    "title": "Piece Ownership",
    "text": "The ownership of faction pieces cannot change.",
    "section": "1. Golden Rules",
    "subsection": "1.5 Pieces"
  },
  {
    "id": "1.5.4",
    "title": "Piece Manipulation",
    "text": "Pieces are placed and removed as defined in the Glossary (G.1.19, G.1.22). If you are prompted to place, take, or remove pieces but you cannot do so fully, you must place, take, or remove the maximum number possible. If multiple pieces are removed simultaneously and that would trigger effects, remove all pieces before triggering effects.",
    "section": "1. Golden Rules",
    "subsection": "1.5 Pieces"
  },
  {
    "id": "1.5.5",
    "title": "Use of FORCE",
    "text": "Some effects let you **FORCE** a player or their pieces to act. Resolve this exactly as if that player were choosing to do this, as limited by the effect.",
    "section": "1. Golden Rules",
    "subsection": "1.5 Pieces"
  },
  {
    "id": "2.1.1",
    "title": "Birds Are Wild",
    "text": "You can treat any bird card as a card of another suit, even if you must spend, take, or give multiple cards of the same suit.\n\n**I.** Forced Effects. If you are prompted to discard or give cards of non-bird suits, you must treat your bird cards as a prompted suit.\n\n**II.** Reverse Substitution. If you are prompted to spend, discard, take, or give a bird card, you cannot substitute a card of another suit.",
    "section": "2. Key Concepts",
    "subsection": "2.1 Cards"
  },
  {
    "id": "2.1.2",
    "title": "Ambush Cards",
    "text": "There are five **AMBUSH CARDS**: one mouse, one rabbit, one fox, and two birds. You may spend an ambush card for its suit, but it does not have a crafted effect. You may also play one in battle to deal hits (4.3.1).",
    "section": "2. Key Concepts",
    "subsection": "2.1 Cards"
  },
  {
    "id": "2.1.3",
    "title": "Dominance Cards",
    "text": "There are four **DOMINANCE CARDS** matching the four suits. You may spend a dominance card for its suit, but it cannot be crafted. You may also play one to permanently change your victory condition (3.3).",
    "section": "2. Key Concepts",
    "subsection": "2.1 Cards"
  },
  {
    "id": "2.2.1",
    "title": "Adjacency",
    "text": "A clearing is adjacent to all other clearings linked to it by a path.",
    "section": "2. Key Concepts",
    "subsection": "2.2 Clearings and Paths"
  },
  {
    "id": "2.2.2",
    "title": "Suit",
    "text": "Each clearing has a **SUIT**: mouse, rabbit, or fox.",
    "section": "2. Key Concepts",
    "subsection": "2.2 Clearings and Paths"
  },
  {
    "id": "2.2.3",
    "title": "Slots",
    "text": "Each clearing has a number of **BUILDING SLOTS** (white boxes). Whenever you place a building, it fills an open slot. You cannot place a building in a clearing with no open slots.",
    "section": "2. Key Concepts",
    "subsection": "2.2 Clearings and Paths"
  },
  {
    "id": "2.2.4",
    "title": "Ruins",
    "text": "Slots marked with a small \"R\" begin the game filled with **RUINS**. Ruins cannot be removed unless explicitly instructed.",
    "section": "2. Key Concepts",
    "subsection": "2.2 Clearings and Paths"
  },
  {
    "id": "2.4.1",
    "title": "Adjacency",
    "text": "A forest is adjacent to all clearings that touch it without crossing a printed path, and it is adjacent to all forests that are separated by only one printed path.",
    "section": "2. Key Concepts",
    "subsection": "2.4 Forests"
  },
  {
    "id": "3.2.1",
    "title": "Removing Buildings and Tokens",
    "text": "Whenever you remove an enemy's building or token, you score one victory point.",
    "section": "3. Victory",
    "subsection": "3.2 Scoring Victory Points"
  },
  {
    "id": "3.2.2",
    "title": "Crafting Items",
    "text": "Whenever you craft an item (4.1), score the victory points listed on the card.",
    "section": "3. Victory",
    "subsection": "3.2 Scoring Victory Points"
  },
  {
    "id": "3.3.1",
    "title": "Activating",
    "text": "During your Daylight, if you have at least 10 victory points, you may **ACTIVATE** a dominance card in your hand by placing it in your play area. Remove your score marker from the score track. You can no longer score victory points.\n\n**I.** Mouse, Rabbit, or Fox Dominance. You win the game immediately if you rule three clearings of the suit matching the activated dominance card at the start of your Birdsong.\n\n**II.** Bird Dominance. You win the game immediately if you rule two clearings in opposite corners at the start of your Birdsong.",
    "section": "3. Victory",
    "subsection": "3.3 Dominance Cards"
  },
  {
    "id": "3.3.2",
    "title": "Activated Cards",
    "text": "An activated dominance card does not count against your hand limit, and it cannot be removed from play. You cannot replace an activated dominance card with a different one.",
    "section": "3. Victory",
    "subsection": "3.3 Dominance Cards"
  },
  {
    "id": "3.3.3",
    "title": "Using Dominance Cards",
    "text": "A dominance card can be spent for its suit. Anytime a dominance card would be placed in the discard pile, instead place it near the map to show it is **AVAILABLE** to be taken.",
    "section": "3. Victory",
    "subsection": "3.3 Dominance Cards"
  },
  {
    "id": "3.3.4",
    "title": "Taking Available Cards",
    "text": "During your Daylight, you can take an available dominance card into your hand by spending a card of matching suit. You cannot treat an available bird dominance card as a non-bird suit.",
    "section": "3. Victory",
    "subsection": "3.3 Dominance Cards"
  },
  {
    "id": "4.1.1",
    "title": "Cost",
    "text": "To craft a card, you must **ACTIVATE** crafting pieces of the suits listed in the card's bottom-left corner. A crafting piece's suit matches its clearing. Each crafting piece may be activated only once per turn. A three-color question mark denotes a crafting piece of any suit.",
    "section": "4. Key Actions",
    "subsection": "4.1 Craft"
  },
  {
    "id": "4.1.2",
    "title": "Immediate Effects",
    "text": "When you craft an immediate effect (paper box), resolve its effect and then discard the card. If it shows an item, take the matching item from the item supply on the map and place it in the Crafted Items box on your faction board. If the card lists an item not in the item supply, the card cannot be crafted.",
    "section": "4. Key Actions",
    "subsection": "4.1 Craft"
  },
  {
    "id": "4.1.3",
    "title": "Persistent Effects",
    "text": "When you craft a persistent effect (stone box), place it in your play area. You may use the effect described on the card.",
    "section": "4. Key Actions",
    "subsection": "4.1 Craft"
  },
  {
    "id": "4.1.4",
    "title": "No Duplicates",
    "text": "You cannot craft a persistent effect if you have an identical one in your play area.",
    "section": "4. Key Actions",
    "subsection": "4.1 Craft"
  },
  {
    "id": "4.2.1",
    "title": "You Must Rule",
    "text": "To take a move, you must rule the origin clearing, destination clearing, or both.",
    "section": "4. Key Actions",
    "subsection": "4.2 Move"
  },
  {
    "id": "4.2.2",
    "title": "No Movement Limits",
    "text": "A given piece can be moved any number of times per turn. If you are prompted to take multiple moves, you may move the same or separate groups of warriors.",
    "section": "4. Key Actions",
    "subsection": "4.2 Move"
  },
  {
    "id": "4.3.1",
    "title": "Step 1: Defender May Ambush",
    "text": "The defender may play one ambush card matching the clearing of battle. If so, resolve 4.3.1.I-II in order.\n\n**I.** Foil Ambush. The attacker may also play an ambush card matching the clearing of the battle. If they do, the defender discards their ambush card and skips 4.3.1.II.",
    "section": "4. Key Actions",
    "subsection": "4.3 Battle"
  },
  {
    "id": "II.",
    "title": "Resolve Ambush",
    "text": "The defender deals two hits immediately (4.3.4). Then, the defender discards the ambush card. If no attacking warriors or pawns remain, end the battle immediately.",
    "section": "4. Key Actions",
    "subsection": "4.3 Battle"
  },
  {
    "id": "4.3.2",
    "title": "Step 2: Roll Dice",
    "text": "Roll both dice. The attacker will deal hits equal to the higher roll, and the defender will deal hits equal to the lower roll. If the rolls are equal, attacker and defender will deal the same number of hits.\n\n**I.** Maximum Rolled Hits. The maximum hits you can deal from rolling equals the number of your warriors in the clearing of battle, whether you are the attacker or defender.",
    "section": "4. Key Actions",
    "subsection": "4.3 Battle"
  },
  {
    "id": "4.3.3",
    "title": "Step 3: Use Effects",
    "text": "The attacker and defender may use optional effects that affect battle. If both want to use effects, the attacker chooses who uses them first (1.1.3).\n\n**I.** Extra Hits. Many effects will deal **EXTRA HITS**, which are not limited by the number of warriors in the clearing of battle.\n\n**II.** Defenseless. If the defender has no warriors in the clearing of battle, the attacker will deal an extra hit.",
    "section": "4. Key Actions",
    "subsection": "4.3 Battle"
  },
  {
    "id": "4.3.4",
    "title": "Step 4: Deal Hits",
    "text": "Each hit that a side deals removes one piece of the other side from the clearing of battle. The side taking hits chooses the order in which their own pieces are removed, but all of their warriors there must be removed before any of their buildings or tokens there can be removed; they also choose the order of any effects triggered by their pieces being removed.",
    "section": "4. Key Actions",
    "subsection": "4.3 Battle"
  },
  {
    "id": "5.1.1",
    "title": "Step 1: Assign Factions and Starting Player",
    "text": "Assign one faction to each player in any way. Determine the starting player and seating order randomly. Each player takes their chosen faction board and the pieces listed on its back.",
    "section": "5. Setup",
    "subsection": "5.1 Standard Setup"
  },
  {
    "id": "5.1.2",
    "title": "Step 2: Place Score Markers",
    "text": "Each player places their score marker on \"0\" on the score track.",
    "section": "5. Setup",
    "subsection": "5.1 Standard Setup"
  },
  {
    "id": "5.1.3",
    "title": "Step 3: Draw Starting Hands",
    "text": "If you are playing with two players, remove all four dominance cards from the deck. Shuffle the deck. Each player draws three cards.",
    "section": "5. Setup",
    "subsection": "5.1 Standard Setup"
  },
  {
    "id": "5.1.4",
    "title": "Step 4: Place Ruins",
    "text": "Place a ruin in each slot on the map marked with an \"R\" (four in total).",
    "section": "5. Setup",
    "subsection": "5.1 Standard Setup"
  },
  {
    "id": "5.1.5",
    "title": "Step 5: Form Item Supply",
    "text": "Place these items on the matching spaces of the item supply near the top of the map: 2 Boots, 2 Swords, 1 Bag, 1 Crossbow, 2 Hammers, 2 Tea, 2 Coins.",
    "section": "5. Setup",
    "subsection": "5.1 Standard Setup"
  },
  {
    "id": "5.1.6",
    "title": "Step 6: Gather Other Pieces",
    "text": "Hand out the 16 faction overview cards as desired, and place the two dice near the map.",
    "section": "5. Setup",
    "subsection": "5.1 Standard Setup"
  },
  {
    "id": "5.1.7",
    "title": "Step 7: Set Up Factions",
    "text": "In setup order (A, B, C, etc.), each player follows their faction's setup instructions, listed in their rules section and on the back of their faction board.",
    "section": "5. Setup",
    "subsection": "5.1 Standard Setup"
  },
  {
    "id": "6.2.1",
    "title": "Crafting",
    "text": "The Marquise crafts during Daylight by activating workshops.",
    "section": "6. Marquise de Cat",
    "subsection": "6.2 Faction Rules and Abilities"
  },
  {
    "id": "6.2.2",
    "title": "The Keep",
    "text": "The Marquise can place pieces in the clearing with the keep token, and other players cannot.",
    "section": "6. Marquise de Cat",
    "subsection": "6.2 Faction Rules and Abilities"
  },
  {
    "id": "6.2.3",
    "title": "Field Hospitals",
    "text": "Whenever any number of Marquise warriors are removed from a clearing, the Marquise may spend a card matching that clearing to place those warriors in the clearing with the keep token instead of the Marquise's supply.",
    "section": "6. Marquise de Cat",
    "subsection": "6.2 Faction Rules and Abilities"
  },
  {
    "id": "6.3.1",
    "title": "Step 1: Gather Warriors and Wood",
    "text": "Form supplies of 25 warriors and 8 wood tokens.",
    "section": "6. Marquise de Cat",
    "subsection": "6.3 Faction Setup"
  },
  {
    "id": "6.3.2",
    "title": "Step 2: Place Keep",
    "text": "Place the keep token in any corner clearing. This is your starting clearing.",
    "section": "6. Marquise de Cat",
    "subsection": "6.3 Faction Setup"
  },
  {
    "id": "6.3.3",
    "title": "Step 3: Garrison",
    "text": "Place a warrior in each clearing except the clearing in the diagonally opposite corner from the clearing with the keep token.",
    "section": "6. Marquise de Cat",
    "subsection": "6.3 Faction Setup"
  },
  {
    "id": "6.3.4",
    "title": "Step 4: Place Starting Buildings",
    "text": "Place 1 sawmill, 1 workshop, and 1 recruiter. You may place them among the clearing with the keep token and any adjacent clearings, in any combination.",
    "section": "6. Marquise de Cat",
    "subsection": "6.3 Faction Setup"
  },
  {
    "id": "6.3.5",
    "title": "Step 5: Fill Buildings Tracks",
    "text": "Place your remaining 5 sawmills, 5 workshops, and 5 recruiters on your matching Buildings tracks from right to left.",
    "section": "6. Marquise de Cat",
    "subsection": "6.3 Faction Setup"
  },
  {
    "id": "6.5.1",
    "title": "Battle",
    "text": "Initiate a battle.",
    "section": "6. Marquise de Cat",
    "subsection": "6.5 Daylight"
  },
  {
    "id": "6.5.2",
    "title": "March",
    "text": "Take up to two moves.",
    "section": "6. Marquise de Cat",
    "subsection": "6.5 Daylight"
  },
  {
    "id": "6.5.3",
    "title": "Recruit",
    "text": "Place one warrior at each recruiter. You may take this action only once per turn.",
    "section": "6. Marquise de Cat",
    "subsection": "6.5 Daylight"
  },
  {
    "id": "6.5.4",
    "title": "Build",
    "text": "Place a building.",
    "section": "6. Marquise de Cat",
    "subsection": "6.5 Daylight"
  },
  {
    "id": "I.",
    "title": "Choose Clearing and Building",
    "text": "Choose a clearing you rule. Choose whether you want to place a sawmill, workshop, or recruiter. You will place the leftmost building of its type from your faction board.",
    "section": "6. Marquise de Cat",
    "subsection": "6.5 Daylight"
  },
  {
    "id": "II.",
    "title": "Pay Cost",
    "text": "Find the chosen building's cost at the top of its column. Remove wood tokens equal in number to the cost from the chosen clearing, any adjacent clearings you rule, or any clearings connected to the chosen clearing you rule through any number of clearings you rule.\n\n**III.** Place Building and Score. Place the chosen building in the chosen clearing, and score the victory points listed on the space uncovered on your faction board.",
    "section": "6. Marquise de Cat",
    "subsection": "6.5 Daylight"
  },
  {
    "id": "6.5.5",
    "title": "Overwork",
    "text": "Spend a card matching the clearing of a sawmill, and place a wood token there.",
    "section": "6. Marquise de Cat",
    "subsection": "6.5 Daylight"
  },
  {
    "id": "7.2.1",
    "title": "Crafting",
    "text": "The Eyrie craft before resolving the Decree during Daylight by activating roosts.",
    "section": "7. Eyrie Dynasties",
    "subsection": "7.2 Faction Rules and Abilities"
  },
  {
    "id": "7.2.2",
    "title": "Lords of the Forest",
    "text": "The Eyrie rule a clearing when tied for most combined warriors and buildings there, and they have at least one Eyrie piece there.",
    "section": "7. Eyrie Dynasties",
    "subsection": "7.2 Faction Rules and Abilities"
  },
  {
    "id": "7.2.3",
    "title": "Disdain for Trade",
    "text": "Whenever the Eyrie craft an item, they ignore the listed victory points and instead score only one victory point.",
    "section": "7. Eyrie Dynasties",
    "subsection": "7.2 Faction Rules and Abilities"
  },
  {
    "id": "7.3.1",
    "title": "Step 1: Gather Warriors",
    "text": "Form a supply of 20 warriors.",
    "section": "7. Eyrie Dynasties",
    "subsection": "7.3 Faction Setup"
  },
  {
    "id": "7.3.2",
    "title": "Step 2: Place Roost and Starting Warriors",
    "text": "Place 1 roost and 6 warriors in a corner clearing that is not the starting corner clearing of another player and, if possible, is diagonally opposite from a starting corner clearing. This is your starting clearing.",
    "section": "7. Eyrie Dynasties",
    "subsection": "7.3 Faction Setup"
  },
  {
    "id": "7.3.3",
    "title": "Step 3: Choose Leader",
    "text": "Choose 1 of the 4 Eyrie leader cards and place it in your Leader Card slot.",
    "section": "7. Eyrie Dynasties",
    "subsection": "7.3 Faction Setup"
  },
  {
    "id": "7.3.4",
    "title": "Step 4: Tuck Viziers",
    "text": "Tuck your 2 Loyal Vizier cards, showing their suit, into the Decree columns above your faction board as listed on your leader.",
    "section": "7. Eyrie Dynasties",
    "subsection": "7.3 Faction Setup"
  },
  {
    "id": "7.3.5",
    "title": "Step 5: Fill Roosts Track",
    "text": "Place your 6 remaining roosts on your Roosts track from right to left.",
    "section": "7. Eyrie Dynasties",
    "subsection": "7.3 Faction Setup"
  },
  {
    "id": "7.4.1",
    "title": "Emergency Orders",
    "text": "If you have no cards in your hand, draw one card.",
    "section": "7. Eyrie Dynasties",
    "subsection": "7.4 Birdsong"
  },
  {
    "id": "7.4.2",
    "title": "Add to the Decree",
    "text": "You must add one or two cards to the Decree, but only one card added may be a bird card.",
    "section": "7. Eyrie Dynasties",
    "subsection": "7.4 Birdsong"
  },
  {
    "id": "7.4.3",
    "title": "A New Roost",
    "text": "If you have no roosts on the map, place a roost and three warriors in a clearing with the fewest warriors where all those pieces can be placed.",
    "section": "7. Eyrie Dynasties",
    "subsection": "7.4 Birdsong"
  },
  {
    "id": "7.5.1",
    "title": "Craft",
    "text": "You may activate roosts to craft cards from your hand.",
    "section": "7. Eyrie Dynasties",
    "subsection": "7.5 Daylight"
  },
  {
    "id": "7.5.2",
    "title": "Resolve the Decree",
    "text": "You must resolve the Decree, starting with the leftmost column and moving right. In each column, you must resolve all of its cards, but in any order. If you cannot fully take an action, you immediately fall into turmoil (7.7).\n\n**I.** Recruit. Place a warrior in any clearing with a roost whose suit matches the card suit.\n\n**II.** Move. Move from any clearing whose suit matches the card suit.\n\n**III.** Battle. Initiate a battle in any clearing whose suit matches the card suit.\n\n**IV.** Build. Place a roost in any clearing you rule whose suit matches the card suit and which has no roost.",
    "section": "7. Eyrie Dynasties",
    "subsection": "7.5 Daylight"
  },
  {
    "id": "7.6.1",
    "title": "Score Points",
    "text": "Score the victory points listed on the rightmost empty space of your Roosts track.",
    "section": "7. Eyrie Dynasties",
    "subsection": "7.6 Evening"
  },
  {
    "id": "7.6.2",
    "title": "Draw and Discard",
    "text": "Draw one card, plus one card per uncovered draw bonus. Then, if you have more than five cards in your hand, discard cards of your choice until you have five.",
    "section": "7. Eyrie Dynasties",
    "subsection": "7.6 Evening"
  },
  {
    "id": "7.7.1",
    "title": "Step 1: Humiliate",
    "text": "Lose one victory point per bird card (including Loyal Viziers) on the Decree.",
    "section": "7. Eyrie Dynasties",
    "subsection": "7.7 Turmoil"
  },
  {
    "id": "7.7.2",
    "title": "Step 2: Purge",
    "text": "Discard all of the cards on the Decree except your Loyal Viziers.",
    "section": "7. Eyrie Dynasties",
    "subsection": "7.7 Turmoil"
  },
  {
    "id": "7.7.3",
    "title": "Step 3: Depose",
    "text": "Flip your current leader face down and set it aside, choose a new leader from those face up, and place on your faction board. Tuck your Loyal Viziers into the Decree spaces listed on your new leader.\n\n**I.** A New Clutch. If you must choose a new leader but none are face up, flip them all face up.",
    "section": "7. Eyrie Dynasties",
    "subsection": "7.7 Turmoil"
  },
  {
    "id": "7.7.4",
    "title": "Step 4: Rest",
    "text": "End Daylight and begin Evening.",
    "section": "7. Eyrie Dynasties",
    "subsection": "7.7 Turmoil"
  },
  {
    "id": "7.8.1",
    "title": "Builder",
    "text": "Loyal Viziers begin on Recruit and Move. Whenever you craft, you ignore your Disdain for Trade special ability.",
    "section": "7. Eyrie Dynasties",
    "subsection": "7.8 Leaders Reference"
  },
  {
    "id": "7.8.2",
    "title": "Charismatic",
    "text": "Loyal Viziers begin on Recruit and Battle. Whenever you take a Recruit action, you must place two warriors instead of one.",
    "section": "7. Eyrie Dynasties",
    "subsection": "7.8 Leaders Reference"
  },
  {
    "id": "7.8.3",
    "title": "Commander",
    "text": "Loyal Viziers begin on Move and Battle. In battle as attacker, you deal an extra hit.",
    "section": "7. Eyrie Dynasties",
    "subsection": "7.8 Leaders Reference"
  },
  {
    "id": "7.8.4",
    "title": "Despot",
    "text": "Loyal Viziers begin on Move and Build. Whenever you remove at least one enemy building or token in battle, you score one extra victory point (two in total, 3.2.1).",
    "section": "7. Eyrie Dynasties",
    "subsection": "7.8 Leaders Reference"
  },
  {
    "id": "8.2.1",
    "title": "Crafting",
    "text": "The Alliance crafts during Daylight by activating sympathy tokens.",
    "section": "8. Woodland Alliance",
    "subsection": "8.2 Faction Rules and Abilities"
  },
  {
    "id": "8.2.2",
    "title": "Guerrilla War",
    "text": "As defender in battle, the Alliance will deal hits equal to the higher roll, and the attacker will deal hits equal to the lower roll.",
    "section": "8. Woodland Alliance",
    "subsection": "8.2 Faction Rules and Abilities"
  },
  {
    "id": "8.2.3",
    "title": "The Supporters Stack",
    "text": "To take various actions, the Alliance spends **SUPPORTERS**, which are cards on their Supporters stack. Supporters can only be spent for their suit and do not count against the Alliance's hand size.\n\n**I.** Capacity. If the Alliance has no bases on the map, the Supporters stack can only hold up to five cards. If any bases are on the map, the Supporters stack can hold unlimited cards.",
    "section": "8. Woodland Alliance",
    "subsection": "8.2 Faction Rules and Abilities"
  },
  {
    "id": "8.2.4",
    "title": "Removing Bases",
    "text": "Whenever a base is removed, the Alliance must discard all supporters matching the printed suit of the base (including birds) and remove half of their officers, rounded up.",
    "section": "8. Woodland Alliance",
    "subsection": "8.2 Faction Rules and Abilities"
  },
  {
    "id": "8.2.5",
    "title": "Sympathy Tokens",
    "text": "The Alliance has 10 sympathy tokens.\n\n**I.** Placement Limits. A clearing can hold only one sympathy token.",
    "section": "8. Woodland Alliance",
    "subsection": "8.2 Faction Rules and Abilities"
  },
  {
    "id": "II.",
    "title": "Terms",
    "text": "A **SYMPATHETIC CLEARING** is one with a sympathy token. An **UNSYMPATHETIC CLEARING** is one without a sympathy token.",
    "section": "8. Woodland Alliance",
    "subsection": "8.2 Faction Rules and Abilities"
  },
  {
    "id": "8.2.6",
    "title": "Outrage",
    "text": "Whenever another player removes a sympathy token or moves any warriors into a sympathetic clearing, they must add one card matching the affected clearing from their hand to the Supporters stack.",
    "section": "8. Woodland Alliance",
    "subsection": "8.2 Faction Rules and Abilities"
  },
  {
    "id": "8.3.1",
    "title": "Step 1: Gather Warriors",
    "text": "Form a supply of 10 warriors.",
    "section": "8. Woodland Alliance",
    "subsection": "8.3 Faction Setup"
  },
  {
    "id": "8.3.2",
    "title": "Step 2: Place Bases",
    "text": "Place 3 bases on the matching spaces in your Bases box.",
    "section": "8. Woodland Alliance",
    "subsection": "8.3 Faction Setup"
  },
  {
    "id": "8.3.3",
    "title": "Step 3: Fill Sympathy Track",
    "text": "Place 10 sympathy tokens on your Sympathy track.",
    "section": "8. Woodland Alliance",
    "subsection": "8.3 Faction Setup"
  },
  {
    "id": "8.3.4",
    "title": "Step 4: Gain Supporters",
    "text": "Draw 3 cards and place them face down on your Supporters stack.",
    "section": "8. Woodland Alliance",
    "subsection": "8.3 Faction Setup"
  },
  {
    "id": "8.4.1",
    "title": "Revolt",
    "text": "Any number of times, you may take the Revolt action.\n\n**I.** Step 1: Choose Clearing. Choose a sympathetic clearing that matches a base on your faction board.\n\n**II.** Step 2: Spend Supporters. Spend two supporters matching the suit of the chosen clearing.\n\n**III.** Step 3: Resolve Effect. Remove all enemy pieces from the chosen clearing. Then, place the matching base there, and place warriors there equal to the number of sympathetic clearings matching the base's printed suit. Finally, place one warrior in the Officers box. This warrior is now an **OFFICER**.",
    "section": "8. Woodland Alliance",
    "subsection": "8.4 Birdsong"
  },
  {
    "id": "8.4.2",
    "title": "Spread Sympathy",
    "text": "Any number of times, you may take the Spread Sympathy action.",
    "section": "8. Woodland Alliance",
    "subsection": "8.4 Birdsong"
  },
  {
    "id": "I.",
    "title": "Step 1: Choose Clearing",
    "text": "Choose an unsympathetic clearing adjacent to a sympathetic clearing. If there are no sympathetic clearings, you may choose any clearing.",
    "section": "8. Woodland Alliance",
    "subsection": "8.4 Birdsong"
  },
  {
    "id": "II.",
    "title": "Step 2: Spend Supporters",
    "text": "Spend supporters matching the suit of the chosen clearing. The number of supporters that must be spent is listed above the sympathy token.",
    "section": "8. Woodland Alliance",
    "subsection": "8.4 Birdsong"
  },
  {
    "id": "III.",
    "title": "Step 3: Place and Score",
    "text": "Place a sympathy token in the chosen clearing. Score the victory points on the space uncovered on your faction board.",
    "section": "8. Woodland Alliance",
    "subsection": "8.4 Birdsong"
  },
  {
    "id": "8.5.1",
    "title": "Craft",
    "text": "You may activate sympathy tokens to craft a card from your hand.",
    "section": "8. Woodland Alliance",
    "subsection": "8.5 Daylight"
  },
  {
    "id": "8.5.2",
    "title": "Mobilize",
    "text": "Add a card from your hand to the Supporters stack.",
    "section": "8. Woodland Alliance",
    "subsection": "8.5 Daylight"
  },
  {
    "id": "8.5.3",
    "title": "Train",
    "text": "Spend a card whose suit matches the printed suit of a base on the map to place a warrior in the Officers box.",
    "section": "8. Woodland Alliance",
    "subsection": "8.5 Daylight"
  },
  {
    "id": "8.6.1",
    "title": "Military Operations",
    "text": "You may take actions, as follows, up to your number of officers, in any order and number.\n\n**I.** Move. Take one move.\n\n**II.** Battle. Initiate a battle.\n\n**III.** Recruit. Place a warrior in any clearing with a base.\n\n**IV.** Organize. Remove one Alliance warrior from an unsympathetic clearing, place a sympathy token there, and score the victory points listed on the space uncovered on your faction board.",
    "section": "8. Woodland Alliance",
    "subsection": "8.6 Evening"
  },
  {
    "id": "8.6.2",
    "title": "Draw and Discard",
    "text": "Draw one card, plus one card per uncovered draw bonus. Then, if you have more than five cards in your hand, discard cards of your choice until you have five.",
    "section": "8. Woodland Alliance",
    "subsection": "8.6 Evening"
  },
  {
    "id": "9.2.1",
    "title": "Crafting",
    "text": "The Vagabond exhausts hammers to craft. All of his hammers match the suit of his current clearing.",
    "section": "9. Vagabond",
    "subsection": "9.2 Faction Rules and Abilities"
  },
  {
    "id": "9.2.2",
    "title": "Lone Wanderer",
    "text": "The Vagabond pawn is not a warrior (so he cannot rule a clearing). The Vagabond pawn cannot be removed from the map.",
    "section": "9. Vagabond",
    "subsection": "9.2 Faction Rules and Abilities"
  },
  {
    "id": "9.2.3",
    "title": "Nimble",
    "text": "The Vagabond can move regardless of who rules his origin or destination clearing.",
    "section": "9. Vagabond",
    "subsection": "9.2 Faction Rules and Abilities"
  },
  {
    "id": "9.2.4",
    "title": "Defenseless",
    "text": "In battle, the Vagabond is defenseless if he has no undamaged swords.",
    "section": "9. Vagabond",
    "subsection": "9.2 Faction Rules and Abilities"
  },
  {
    "id": "9.2.5",
    "title": "Items",
    "text": "The Vagabond's capabilities depend on the items he acquires. Instead of a Crafted Items box, he has a Satchel and various item tracks. The Vagabond **EXHAUSTS** face-up undamaged items, flipping them face down, to take many actions.",
    "section": "9. Vagabond",
    "subsection": "9.2 Faction Rules and Abilities"
  },
  {
    "id": "9.2.6",
    "title": "Maximum Rolled Hits",
    "text": "In battle, the Vagabond's maximum rolled hits equals his undamaged swords, face up or face down, in his Satchel.",
    "section": "9. Vagabond",
    "subsection": "9.2 Faction Rules and Abilities"
  },
  {
    "id": "9.2.7",
    "title": "Taking Hits",
    "text": "Whenever the Vagabond takes a hit, he must damage one undamaged item, moving it to his Damaged box.",
    "section": "9. Vagabond",
    "subsection": "9.2 Faction Rules and Abilities"
  },
  {
    "id": "9.2.8",
    "title": "Dominance Cards and Coalitions",
    "text": "The Vagabond cannot activate a dominance card for its normal victory condition. Instead, in games with four or more players, the Vagabond can activate a dominance card to form a coalition with another player, placing his score marker on that player's faction board.",
    "section": "9. Vagabond",
    "subsection": "9.2 Faction Rules and Abilities"
  },
  {
    "id": "9.2.9",
    "title": "Relationships",
    "text": "Your faction board shows a Relationships chart.\n\n**I.** Improving Relationships. You can improve a relationship with a non-Hostile faction by taking the Aid action.\n\n**II.** Allied Status. If a relationship marker reaches the final space on the Allied track, you are now **ALLIED** with the faction.",
    "section": "9. Vagabond",
    "subsection": "9.2 Faction Rules and Abilities"
  },
  {
    "id": "III.",
    "title": "Hostile Status",
    "text": "If you remove a warrior of a non-Hostile faction, move their relationship marker to the Hostile box. This faction is now **HOSTILE**.\n\n*a.* Infamy. Score one extra victory point for each piece of a Hostile faction you remove in battle during your turn.",
    "section": "9. Vagabond",
    "subsection": "9.2 Faction Rules and Abilities"
  },
  {
    "id": "9.3.1",
    "title": "Step 1: Choose Character",
    "text": "Choose a character card and place it in your Character Card slot.",
    "section": "9. Vagabond",
    "subsection": "9.3 Faction Setup"
  },
  {
    "id": "9.3.2",
    "title": "Step 2: Place Pawn",
    "text": "Place your Vagabond pawn in any forest.",
    "section": "9. Vagabond",
    "subsection": "9.3 Faction Setup"
  },
  {
    "id": "9.3.3",
    "title": "Step 3: Get Quests",
    "text": "Shuffle your quest deck, draw 3 quest cards, and place them face up near you.",
    "section": "9. Vagabond",
    "subsection": "9.3 Faction Setup"
  },
  {
    "id": "9.3.4",
    "title": "Step 4: Populate Ruins",
    "text": "Take the 4 ruins from the map, and take the items marked with an \"R.\" Place one beneath each ruin and then shuffle each ruin stack. Return each stack to an empty ruin slot.",
    "section": "9. Vagabond",
    "subsection": "9.3 Faction Setup"
  },
  {
    "id": "9.3.5",
    "title": "Step 5: Take Starting Items",
    "text": "Take the items marked with an \"S\" listed on your character card.",
    "section": "9. Vagabond",
    "subsection": "9.3 Faction Setup"
  },
  {
    "id": "9.3.6",
    "title": "Step 6: Set Relationships",
    "text": "Take a relationship marker for each non-Vagabond faction and place them all on the Indifferent space of your Relationships chart.",
    "section": "9. Vagabond",
    "subsection": "9.3 Faction Setup"
  },
  {
    "id": "9.4.1",
    "title": "Refresh",
    "text": "Flip two exhausted items face up for each tea face up on the Refresh track at the start of your Birdsong. Then flip up three more exhausted items.",
    "section": "9. Vagabond",
    "subsection": "9.4 Birdsong"
  },
  {
    "id": "9.4.2",
    "title": "Slip",
    "text": "You may move into an adjacent clearing or forest without exhausting any boots.",
    "section": "9. Vagabond",
    "subsection": "9.4 Birdsong"
  },
  {
    "id": "9.5.1",
    "title": "Move",
    "text": "Exhaust one boot to move, plus one if the destination clearing has any Hostile warriors.",
    "section": "9. Vagabond",
    "subsection": "9.5 Daylight"
  },
  {
    "id": "9.5.2",
    "title": "Battle",
    "text": "Exhaust one sword to initiate a battle.",
    "section": "9. Vagabond",
    "subsection": "9.5 Daylight"
  },
  {
    "id": "9.5.3",
    "title": "Explore",
    "text": "Exhaust one torch to take one item under a ruin in your clearing, reveal it, and place it face up in your Satchel or on its matching track.",
    "section": "9. Vagabond",
    "subsection": "9.5 Daylight"
  },
  {
    "id": "9.5.4",
    "title": "Aid",
    "text": "Exhaust any one item, and give one of your cards matching your clearing to any player with faction pieces there.",
    "section": "9. Vagabond",
    "subsection": "9.5 Daylight"
  },
  {
    "id": "9.5.5",
    "title": "Quest",
    "text": "Choose a quest whose suit matches your clearing, and exhaust the two items listed on the quest to complete it.",
    "section": "9. Vagabond",
    "subsection": "9.5 Daylight"
  },
  {
    "id": "9.5.6",
    "title": "Strike",
    "text": "Exhaust one crossbow to remove an enemy warrior from your clearing.",
    "section": "9. Vagabond",
    "subsection": "9.5 Daylight"
  },
  {
    "id": "9.5.7",
    "title": "Repair",
    "text": "Exhaust one hammer to move one damaged item to the Satchel, keeping the item on its current side.",
    "section": "9. Vagabond",
    "subsection": "9.5 Daylight"
  },
  {
    "id": "9.5.8",
    "title": "Craft",
    "text": "Play a card from your hand, and exhaust the hammers of listed suit to craft it.",
    "section": "9. Vagabond",
    "subsection": "9.5 Daylight"
  },
  {
    "id": "9.5.9",
    "title": "Special Action",
    "text": "Exhaust one torch to take the action listed on your character card.",
    "section": "9. Vagabond",
    "subsection": "9.5 Daylight"
  },
  {
    "id": "9.6.1",
    "title": "Rest",
    "text": "If you are in a forest, move all items in your Damaged box to your Satchel or their matching track, and flip them face up.",
    "section": "9. Vagabond",
    "subsection": "9.6 Evening"
  },
  {
    "id": "9.6.2",
    "title": "Draw Cards",
    "text": "Draw one card, plus one card per coin face up on the matching track.",
    "section": "9. Vagabond",
    "subsection": "9.6 Evening"
  },
  {
    "id": "9.6.3",
    "title": "Discard Cards",
    "text": "If you have more than five cards in your hand, discard cards of your choice until you have five.",
    "section": "9. Vagabond",
    "subsection": "9.6 Evening"
  },
  {
    "id": "9.6.4",
    "title": "Check Item Capacity",
    "text": "If you have more items total in your Satchel and Damaged box than your item limit, remove items from your Satchel and Damaged box until you have items equal to your item limit, and remove them from the game permanently.",
    "section": "9. Vagabond",
    "subsection": "9.6 Evening"
  },
  {
    "id": "10.2.1",
    "title": "Crafting",
    "text": "The Cult crafts during Evening by activating gardens whose printed suit matches the Outcast suit.",
    "section": "10. Lizard Cult",
    "subsection": "10.2 Faction Rules and Abilities"
  },
  {
    "id": "10.2.2",
    "title": "Hatred of Birds",
    "text": "Bird cards are not wild for Cult rituals.",
    "section": "10. Lizard Cult",
    "subsection": "10.2 Faction Rules and Abilities"
  },
  {
    "id": "10.2.3",
    "title": "Revenge",
    "text": "Whenever a Cult warrior is removed while defending in battle, it is placed in the Acolytes box instead of the Cult's supply.",
    "section": "10. Lizard Cult",
    "subsection": "10.2 Faction Rules and Abilities"
  },
  {
    "id": "10.2.4",
    "title": "Pilgrims",
    "text": "The Cult rules any clearings where they have any gardens.",
    "section": "10. Lizard Cult",
    "subsection": "10.2 Faction Rules and Abilities"
  },
  {
    "id": "10.2.5",
    "title": "Fear of the Faithful",
    "text": "Whenever a garden is removed, the Cult must discard a random card.",
    "section": "10. Lizard Cult",
    "subsection": "10.2 Faction Rules and Abilities"
  },
  {
    "id": "10.2.6",
    "title": "The Lost Souls Pile",
    "text": "Whenever any card is spent or discarded, place it in the Lost Souls pile instead of the discard pile.",
    "section": "10. Lizard Cult",
    "subsection": "10.2 Faction Rules and Abilities"
  },
  {
    "id": "10.3.1",
    "title": "Step 1: Gather Warriors",
    "text": "Form a supply of 25 warriors.",
    "section": "10. Lizard Cult",
    "subsection": "10.3 Faction Setup"
  },
  {
    "id": "10.3.2",
    "title": "Step 2: Place Warriors",
    "text": "Place 4 warriors and 1 garden of matching printed suit in a corner clearing that is not the starting corner clearing of another player. This is your starting clearing. Then place 1 warrior in each adjacent clearing.",
    "section": "10. Lizard Cult",
    "subsection": "10.3 Faction Setup"
  },
  {
    "id": "10.3.3",
    "title": "Step 3: Choose Outcast",
    "text": "Place the outcast marker on any suit space in the Outcast box. The suit of this space is called the **OUTCAST**.",
    "section": "10. Lizard Cult",
    "subsection": "10.3 Faction Setup"
  },
  {
    "id": "10.3.4",
    "title": "Step 4: Fill Gardens Tracks",
    "text": "Place your 14 remaining gardens on the matching spaces of your Gardens tracks from right to left.",
    "section": "10. Lizard Cult",
    "subsection": "10.3 Faction Setup"
  },
  {
    "id": "10.4.1",
    "title": "Adjust Outcast",
    "text": "Look at the cards in the Lost Souls pile, ignoring birds. The suit with the most cards becomes the new Outcast.",
    "section": "10. Lizard Cult",
    "subsection": "10.4 Birdsong"
  },
  {
    "id": "10.4.2",
    "title": "Discard Lost Souls",
    "text": "Discard all of the cards in the Lost Souls pile to the discard pile.",
    "section": "10. Lizard Cult",
    "subsection": "10.4 Birdsong"
  },
  {
    "id": "10.4.3",
    "title": "Perform Conspiracies",
    "text": "You can spend acolytes to perform conspiracies in clearings matching the Outcast.\n\n**I.** Crusade. Spend two acolytes to initiate a battle in an Outcast clearing or to move from an Outcast clearing and then, if you wish, initiate a battle in the destination clearing.\n\n**II.** Convert. Spend two acolytes to replace an enemy warrior from an Outcast clearing with a Cult warrior.\n\n**III.** Sanctify. Spend three acolytes to replace an enemy building from an Outcast clearing with a garden of the Outcast suit.",
    "section": "10. Lizard Cult",
    "subsection": "10.4 Birdsong"
  },
  {
    "id": "10.5.1",
    "title": "Build",
    "text": "In a clearing you rule matching the revealed card, place a matching garden.",
    "section": "10. Lizard Cult",
    "subsection": "10.5 Daylight"
  },
  {
    "id": "10.5.2",
    "title": "Recruit",
    "text": "In a clearing matching the revealed card, place a warrior.",
    "section": "10. Lizard Cult",
    "subsection": "10.5 Daylight"
  },
  {
    "id": "10.5.3",
    "title": "Score",
    "text": "Spend the same card you reveal to score the victory points listed above the rightmost empty Gardens space of the suit matching the revealed card.",
    "section": "10. Lizard Cult",
    "subsection": "10.5 Daylight"
  },
  {
    "id": "10.5.4",
    "title": "Sacrifice",
    "text": "Place a warrior in the Acolytes box. To perform this ritual, you must reveal a bird card.",
    "section": "10. Lizard Cult",
    "subsection": "10.5 Daylight"
  },
  {
    "id": "10.6.1",
    "title": "Return Revealed Cards",
    "text": "Return all cards you revealed this turn to your hand.",
    "section": "10. Lizard Cult",
    "subsection": "10.6 Evening"
  },
  {
    "id": "10.6.2",
    "title": "Craft",
    "text": "You may craft by activating gardens whose printed suit matches the Outcast suit.",
    "section": "10. Lizard Cult",
    "subsection": "10.6 Evening"
  },
  {
    "id": "10.6.3",
    "title": "Draw and Discard",
    "text": "Draw one card, plus one card per uncovered draw bonus.",
    "section": "10. Lizard Cult",
    "subsection": "10.6 Evening"
  },
  {
    "id": "11.2.1",
    "title": "Crafting",
    "text": "The Riverfolk craft during Daylight by committing funds to empty spaces on the Trade Posts tracks.",
    "section": "11. Riverfolk Company",
    "subsection": "11.2 Faction Rules and Abilities"
  },
  {
    "id": "11.2.2",
    "title": "Swimmers",
    "text": "The Riverfolk treat rivers as paths and may move along rivers regardless of who rules their origin or destination clearing.",
    "section": "11. Riverfolk Company",
    "subsection": "11.2 Faction Rules and Abilities"
  },
  {
    "id": "11.2.3",
    "title": "Public Hand",
    "text": "The Riverfolk place their hand face up above their faction board.",
    "section": "11. Riverfolk Company",
    "subsection": "11.2 Faction Rules and Abilities"
  },
  {
    "id": "11.2.4",
    "title": "Funds",
    "text": "To take many actions, the Riverfolk commit and spend **FUNDS**: warriors in their Funds box.",
    "section": "11. Riverfolk Company",
    "subsection": "11.2 Faction Rules and Abilities"
  },
  {
    "id": "11.2.5",
    "title": "Trade Posts",
    "text": "The Riverfolk score victory points when they place trade posts.\n\n**I.** Trade Disruption. Whenever a trade post is removed, the Riverfolk remove half of their funds, rounded up, and remove the trade post from the game permanently.",
    "section": "11. Riverfolk Company",
    "subsection": "11.2 Faction Rules and Abilities"
  },
  {
    "id": "11.2.6",
    "title": "Buying Services",
    "text": "At the start of another player's Birdsong, that player may buy Riverfolk services.",
    "section": "11. Riverfolk Company",
    "subsection": "11.2 Faction Rules and Abilities"
  },
  {
    "id": "11.3.1",
    "title": "Step 1: Gather Warriors",
    "text": "Form a supply of 15 warriors.",
    "section": "11. Riverfolk Company",
    "subsection": "11.3 Faction Setup"
  },
  {
    "id": "11.3.2",
    "title": "Step 2: Place Warriors",
    "text": "Place 4 warriors in any clearings touching the river.",
    "section": "11. Riverfolk Company",
    "subsection": "11.3 Faction Setup"
  },
  {
    "id": "11.3.3",
    "title": "Step 3: Fill Trade Posts Tracks",
    "text": "Place 9 trade posts on the matching spaces of your Trade Posts tracks.",
    "section": "11. Riverfolk Company",
    "subsection": "11.3 Faction Setup"
  },
  {
    "id": "11.3.4",
    "title": "Step 4: Gain Starting Funds",
    "text": "Place 3 warriors in your Payments box.",
    "section": "11. Riverfolk Company",
    "subsection": "11.3 Faction Setup"
  },
  {
    "id": "11.3.5",
    "title": "Step 5: Set Starting Prices",
    "text": "Place 1 service marker on any space of each of your Services tracks.",
    "section": "11. Riverfolk Company",
    "subsection": "11.3 Faction Setup"
  },
  {
    "id": "11.4.1",
    "title": "Protectionism",
    "text": "If the Payments box is empty, place two warriors in it.",
    "section": "11. Riverfolk Company",
    "subsection": "11.4 Birdsong"
  },
  {
    "id": "11.4.2",
    "title": "Score Dividends",
    "text": "If there are any trade posts on the map, score one victory point per two funds.",
    "section": "11. Riverfolk Company",
    "subsection": "11.4 Birdsong"
  },
  {
    "id": "11.4.3",
    "title": "Gather Funds",
    "text": "Move all warriors on your faction board to the Funds box.",
    "section": "11. Riverfolk Company",
    "subsection": "11.4 Birdsong"
  },
  {
    "id": "11.5.1",
    "title": "Move",
    "text": "Commit one fund to take a move.",
    "section": "11. Riverfolk Company",
    "subsection": "11.5 Daylight"
  },
  {
    "id": "11.5.2",
    "title": "Battle",
    "text": "Commit one fund to initiate a battle.",
    "section": "11. Riverfolk Company",
    "subsection": "11.5 Daylight"
  },
  {
    "id": "11.5.3",
    "title": "Craft",
    "text": "Commit funds to craft a card from your hand. Instead of moving these warriors to the Committed box, you must place them on empty spaces of the Trade Posts tracks matching the suits listed on the crafting cost.",
    "section": "11. Riverfolk Company",
    "subsection": "11.5 Daylight"
  },
  {
    "id": "11.5.4",
    "title": "Draw",
    "text": "Commit one fund to draw a card.",
    "section": "11. Riverfolk Company",
    "subsection": "11.5 Daylight"
  },
  {
    "id": "11.5.5",
    "title": "Recruit",
    "text": "Spend one fund to place a warrior in any clearing with a river.",
    "section": "11. Riverfolk Company",
    "subsection": "11.5 Daylight"
  },
  {
    "id": "11.5.6",
    "title": "Establish Trade Post with Garrison",
    "text": "Spend two funds to place a trade post and a warrior.",
    "section": "11. Riverfolk Company",
    "subsection": "11.5 Daylight"
  },
  {
    "id": "11.6.1",
    "title": "Discard Cards",
    "text": "If you have more than five cards in your hand, discard cards of your choice until there are five.",
    "section": "11. Riverfolk Company",
    "subsection": "11.6 Evening"
  },
  {
    "id": "11.6.2",
    "title": "Set Costs",
    "text": "You may move each service marker to any space on its track, setting it to a new cost.",
    "section": "11. Riverfolk Company",
    "subsection": "11.6 Evening"
  },
  {
    "id": "12.2.1",
    "title": "Crafting",
    "text": "The Duchy crafts during Evening by activating citadels and markets.",
    "section": "12. Underground Duchy",
    "subsection": "12.2 Faction Rules and Abilities"
  },
  {
    "id": "12.2.2",
    "title": "The Burrow",
    "text": "**THE BURROW** is an unsuited clearing adjacent to each clearing with a tunnel token. The Duchy always rules the Burrow.",
    "section": "12. Underground Duchy",
    "subsection": "12.2 Faction Rules and Abilities"
  },
  {
    "id": "12.2.3",
    "title": "The Price of Failure",
    "text": "Whenever any number of Duchy buildings are removed, the Duchy returns their swayed minister card of highest rank to their Unswayed Ministers pile, and removes its crown from the game permanently, then discards a random card.",
    "section": "12. Underground Duchy",
    "subsection": "12.2 Faction Rules and Abilities"
  },
  {
    "id": "12.2.4",
    "title": "Tunnels",
    "text": "The Duchy has three tunnel tokens.",
    "section": "12. Underground Duchy",
    "subsection": "12.2 Faction Rules and Abilities"
  },
  {
    "id": "12.3.1",
    "title": "Step 1: Gather Warriors and Tunnels",
    "text": "Form supplies of 20 warriors and 3 tunnel tokens.",
    "section": "12. Underground Duchy",
    "subsection": "12.3 Faction Setup"
  },
  {
    "id": "12.3.2",
    "title": "Step 2: Prepare the Burrow",
    "text": "Place the Burrow board near the map.",
    "section": "12. Underground Duchy",
    "subsection": "12.3 Faction Setup"
  },
  {
    "id": "12.3.3",
    "title": "Step 3: Surface",
    "text": "Place 2 warriors and 1 tunnel in a corner clearing that is not the starting corner clearing of another player. This is your starting clearing. Then place 2 warriors in each clearing adjacent to the chosen corner clearing, except the Burrow.",
    "section": "12. Underground Duchy",
    "subsection": "12.3 Faction Setup"
  },
  {
    "id": "12.3.4",
    "title": "Step 4: Fill Buildings Tracks",
    "text": "Place 3 citadels and 3 markets on your matching Buildings spaces.",
    "section": "12. Underground Duchy",
    "subsection": "12.3 Faction Setup"
  },
  {
    "id": "12.3.5",
    "title": "Step 5: Collect Ministers",
    "text": "Place 9 minister cards face up on your Unswayed Ministers pile.",
    "section": "12. Underground Duchy",
    "subsection": "12.3 Faction Setup"
  },
  {
    "id": "12.3.6",
    "title": "Step 6: Fill Crown Spaces",
    "text": "Place 9 crowns on the spaces with victory points on your faction board.",
    "section": "12. Underground Duchy",
    "subsection": "12.3 Faction Setup"
  },
  {
    "id": "12.5.1",
    "title": "Assembly",
    "text": "You may take up to two actions: Build, Recruit, Move, Battle, Dig.",
    "section": "12. Underground Duchy",
    "subsection": "12.5 Daylight"
  },
  {
    "id": "12.5.2",
    "title": "Parliament",
    "text": "You may take the action of each swayed minister once in any order.",
    "section": "12. Underground Duchy",
    "subsection": "12.5 Daylight"
  },
  {
    "id": "12.5.3",
    "title": "Sway",
    "text": "You may sway one minister. Reveal cards matching clearings where you have pieces to sway a minister of matching rank, place a crown on it, and score points.",
    "section": "12. Underground Duchy",
    "subsection": "12.5 Daylight"
  },
  {
    "id": "12.6.1",
    "title": "Discard and Return Revealed Cards",
    "text": "Discard any bird cards you revealed this turn, then return all other cards you revealed this turn to your hand.",
    "section": "12. Underground Duchy",
    "subsection": "12.6 Evening"
  },
  {
    "id": "12.6.2",
    "title": "Craft",
    "text": "You may craft by activating citadels and markets.",
    "section": "12. Underground Duchy",
    "subsection": "12.6 Evening"
  },
  {
    "id": "12.6.3",
    "title": "Draw and Discard",
    "text": "Draw one card, plus one card per card draw icon showing.",
    "section": "12. Underground Duchy",
    "subsection": "12.6 Evening"
  },
  {
    "id": "13.2.1",
    "title": "Crafting",
    "text": "The Corvids craft during Birdsong by activating plot tokens.",
    "section": "13. Corvid Conspiracy",
    "subsection": "13.2 Faction Rules and Abilities"
  },
  {
    "id": "13.2.2",
    "title": "Plot Tokens",
    "text": "The Corvids have eight plot tokens, two of each type.",
    "section": "13. Corvid Conspiracy",
    "subsection": "13.2 Faction Rules and Abilities"
  },
  {
    "id": "13.2.3",
    "title": "Nimble",
    "text": "The Corvids can move regardless of who rules their origin or destination clearing.",
    "section": "13. Corvid Conspiracy",
    "subsection": "13.2 Faction Rules and Abilities"
  },
  {
    "id": "13.2.4",
    "title": "Exposure",
    "text": "Anytime on their turn, but before drawing any cards in their Evening, an enemy player with faction pieces in a clearing with a facedown plot token may show the Corvids a matching card to guess the type of plot token in that clearing. If correct, the enemy player removes the plot token (scoring a victory point) and ignores its effect.",
    "section": "13. Corvid Conspiracy",
    "subsection": "13.2 Faction Rules and Abilities"
  },
  {
    "id": "13.2.5",
    "title": "Embedded Agents",
    "text": "As defender in battle, if the Corvids have a facedown plot token in the clearing of battle, they deal an extra hit.",
    "section": "13. Corvid Conspiracy",
    "subsection": "13.2 Faction Rules and Abilities"
  },
  {
    "id": "13.3.1",
    "title": "Step 1: Gather Warriors and Plots",
    "text": "Form supplies of 15 warriors and 8 plot tokens face down.",
    "section": "13. Corvid Conspiracy",
    "subsection": "13.3 Faction Setup"
  },
  {
    "id": "13.3.2",
    "title": "Step 2: Scatter",
    "text": "Place 1 warrior in any clearing of each suit (total of 3).",
    "section": "13. Corvid Conspiracy",
    "subsection": "13.3 Faction Setup"
  },
  {
    "id": "13.4.1",
    "title": "Craft",
    "text": "You may activate plot tokens to craft cards from your hand.",
    "section": "13. Corvid Conspiracy",
    "subsection": "13.4 Birdsong"
  },
  {
    "id": "13.4.2",
    "title": "Flip Plots",
    "text": "Any number of times, flip a plot token face up in a clearing with any Corvid warriors, score one victory point per face-up plot token on the map, and then resolve its flip effect.",
    "section": "13. Corvid Conspiracy",
    "subsection": "13.4 Birdsong"
  },
  {
    "id": "13.4.3",
    "title": "Recruit",
    "text": "Once per turn, you may spend any card to place one warrior in each matching clearing.",
    "section": "13. Corvid Conspiracy",
    "subsection": "13.4 Birdsong"
  },
  {
    "id": "13.5.1",
    "title": "Move",
    "text": "Take a move.",
    "section": "13. Corvid Conspiracy",
    "subsection": "13.5 Daylight"
  },
  {
    "id": "13.5.2",
    "title": "Plot",
    "text": "Remove a Corvid warrior, plus another Corvid warrior per plot you have placed this turn, from a clearing with no plot tokens to place a facedown plot token there.",
    "section": "13. Corvid Conspiracy",
    "subsection": "13.5 Daylight"
  },
  {
    "id": "13.5.3",
    "title": "Battle",
    "text": "Initiate a battle.",
    "section": "13. Corvid Conspiracy",
    "subsection": "13.5 Daylight"
  },
  {
    "id": "13.5.4",
    "title": "Trick",
    "text": "Swap two plot tokens on the map.",
    "section": "13. Corvid Conspiracy",
    "subsection": "13.5 Daylight"
  },
  {
    "id": "13.6.1",
    "title": "Exert",
    "text": "You may take one action listed in Daylight if you choose to not draw cards during Evening.",
    "section": "13. Corvid Conspiracy",
    "subsection": "13.6 Evening"
  },
  {
    "id": "13.6.2",
    "title": "Draw",
    "text": "Draw one card plus one card per face-up extortion token on the map.",
    "section": "13. Corvid Conspiracy",
    "subsection": "13.6 Evening"
  },
  {
    "id": "14.2.1",
    "title": "Crafting",
    "text": "The Hundreds craft during Daylight by activating strongholds.",
    "section": "14. Lord of the Hundreds",
    "subsection": "14.2 Faction Rules and Abilities"
  },
  {
    "id": "14.2.2",
    "title": "The Warlord",
    "text": "The Hundreds have a piece called the warlord. The warlord is a warrior that cannot be removed outside of battle, moved outside of the Hundreds' turn, or placed in ways other than setup and the Anoint action.",
    "section": "14. Lord of the Hundreds",
    "subsection": "14.2 Faction Rules and Abilities"
  },
  {
    "id": "14.2.3",
    "title": "Contempt for Trade",
    "text": "Whenever the Hundreds craft an item, they may take the item but score none of the listed victory points, or may remove the item permanently to score the listed victory points.",
    "section": "14. Lord of the Hundreds",
    "subsection": "14.2 Faction Rules and Abilities"
  },
  {
    "id": "14.2.4",
    "title": "The Hoard",
    "text": "Instead of a Crafted Items box, the Hundreds have the Hoard box.",
    "section": "14. Lord of the Hundreds",
    "subsection": "14.2 Faction Rules and Abilities"
  },
  {
    "id": "14.2.5",
    "title": "Looters",
    "text": "At the start of battle as the attacker, the Hundreds may declare that they want to loot the defender.",
    "section": "14. Lord of the Hundreds",
    "subsection": "14.2 Faction Rules and Abilities"
  },
  {
    "id": "14.3.1",
    "title": "Step 1: Gather Pieces",
    "text": "Form supplies of 20 warriors, 1 warlord, and 6 strongholds.",
    "section": "14. Lord of the Hundreds",
    "subsection": "14.3 Faction Setup"
  },
  {
    "id": "14.3.2",
    "title": "Step 2: Garrison",
    "text": "Place your warlord, four warriors, and one stronghold in a corner clearing that is not the starting corner clearing of another player and, if possible, is diagonally opposite from a starting corner clearing.",
    "section": "14. Lord of the Hundreds",
    "subsection": "14.3 Faction Setup"
  },
  {
    "id": "14.3.3",
    "title": "Step 3: Place Items",
    "text": "Place the four \"R\" items randomly under the ruins.",
    "section": "14. Lord of the Hundreds",
    "subsection": "14.3 Faction Setup"
  },
  {
    "id": "14.3.4",
    "title": "Step 4: Get Stubborn",
    "text": "Place your Stubborn mood card on your Mood Card slot.",
    "section": "14. Lord of the Hundreds",
    "subsection": "14.3 Faction Setup"
  },
  {
    "id": "14.4.1",
    "title": "Raze",
    "text": "In each clearing with a mob token, remove all enemy buildings and tokens, take one item from the ruin in the clearing, if any, and remove the ruin if you took its last item. After resolving all mobs, you must roll the mob die once and place a mob token.",
    "section": "14. Lord of the Hundreds",
    "subsection": "14.4 Birdsong"
  },
  {
    "id": "14.4.2",
    "title": "Recruit",
    "text": "Place warriors equal in number to your Prowess into the clearing with your warlord. Then, place warriors in each clearing with any strongholds.",
    "section": "14. Lord of the Hundreds",
    "subsection": "14.4 Birdsong"
  },
  {
    "id": "14.4.3",
    "title": "Anoint",
    "text": "If the warlord is not on the map, you must replace any Hundreds warrior on the map with the warlord.",
    "section": "14. Lord of the Hundreds",
    "subsection": "14.4 Birdsong"
  },
  {
    "id": "14.4.4",
    "title": "Choose Mood",
    "text": "You must replace the mood card in your Mood Card slot with a different mood card that does not show an item that is in your Hoard.",
    "section": "14. Lord of the Hundreds",
    "subsection": "14.4 Birdsong"
  },
  {
    "id": "14.5.1",
    "title": "Craft",
    "text": "You may activate strongholds to craft cards.",
    "section": "14. Lord of the Hundreds",
    "subsection": "14.5 Daylight"
  },
  {
    "id": "14.5.2",
    "title": "Command the Hundreds",
    "text": "You may take the following actions, in any order, a number of times up to your Command: Move, Battle, Build.",
    "section": "14. Lord of the Hundreds",
    "subsection": "14.5 Daylight"
  },
  {
    "id": "14.5.3",
    "title": "Advance the Warlord",
    "text": "You may take this action a number of times up to your Prowess. You may move the warlord with any Hundreds warriors, and then you may battle in the warlord's clearing.",
    "section": "14. Lord of the Hundreds",
    "subsection": "14.5 Daylight"
  },
  {
    "id": "14.6.1",
    "title": "Incite",
    "text": "Any number of times, you may spend a card to place a mob token in a matching clearing that has no mob token but does have a Hundreds warrior.",
    "section": "14. Lord of the Hundreds",
    "subsection": "14.6 Evening"
  },
  {
    "id": "14.6.2",
    "title": "Oppress",
    "text": "You score victory points based on the number of clearings you rule that have a Hundreds piece and no enemy pieces.",
    "section": "14. Lord of the Hundreds",
    "subsection": "14.6 Evening"
  },
  {
    "id": "14.6.3",
    "title": "Draw and Discard",
    "text": "Draw one card. Then, if you have more than five cards in your hand, discard cards of your choice until you have five.",
    "section": "14. Lord of the Hundreds",
    "subsection": "14.6 Evening"
  },
  {
    "id": "15.2.1",
    "title": "Relics",
    "text": "You seek out twelve relic tokens of three types—figures, tablets, and jewelry.",
    "section": "15. Keepers in Iron",
    "subsection": "15.2 Faction Rules and Abilities"
  },
  {
    "id": "15.2.2",
    "title": "Waystations",
    "text": "You have three waystations.",
    "section": "15. Keepers in Iron",
    "subsection": "15.2 Faction Rules and Abilities"
  },
  {
    "id": "15.2.3",
    "title": "Crafting",
    "text": "The Keepers craft during Daylight by activating waystations (of any type).",
    "section": "15. Keepers in Iron",
    "subsection": "15.2 Faction Rules and Abilities"
  },
  {
    "id": "15.2.4",
    "title": "Devout Knights",
    "text": "In battle, if the clearing of battle has at least one relic and at least one Keeper warrior, the Keepers ignore the first hit they take. When moving, the Keepers may move one relic with each Keeper warrior that they move.",
    "section": "15. Keepers in Iron",
    "subsection": "15.2 Faction Rules and Abilities"
  },
  {
    "id": "15.2.5",
    "title": "Prized Trophies",
    "text": "Whenever an enemy removes a relic, they place it in any forest face up and score an extra victory point.",
    "section": "15. Keepers in Iron",
    "subsection": "15.2 Faction Rules and Abilities"
  },
  {
    "id": "15.3.1",
    "title": "Step 1: Place Starting Relics",
    "text": "Collect all twelve relic tokens and shuffle them face down. Place one randomly in each forest.",
    "section": "15. Keepers in Iron",
    "subsection": "15.3 Faction Setup"
  },
  {
    "id": "15.3.2",
    "title": "Step 2: Gather Warriors",
    "text": "Form a supply of 15 warriors.",
    "section": "15. Keepers in Iron",
    "subsection": "15.3 Faction Setup"
  },
  {
    "id": "15.3.3",
    "title": "Step 3: Place Warriors",
    "text": "Place four warriors in a corner clearing that is not the starting corner clearing of another player. Then, place four warriors in a clearing on the map edge that is adjacent to the chosen clearing.",
    "section": "15. Keepers in Iron",
    "subsection": "15.3 Faction Setup"
  },
  {
    "id": "15.3.4",
    "title": "Step 4: Place Remaining Relics",
    "text": "Place all remaining relics randomly, as evenly as possible, among forests not adjacent to clearings with your warriors.",
    "section": "15. Keepers in Iron",
    "subsection": "15.3 Faction Setup"
  },
  {
    "id": "15.3.5",
    "title": "Step 5: Tuck Faithful Retainers",
    "text": "Tuck one Faithful Retainer card into each Retinue slot of your faction board.",
    "section": "15. Keepers in Iron",
    "subsection": "15.3 Faction Setup"
  },
  {
    "id": "15.3.6",
    "title": "Step 6: Collect Waystations",
    "text": "Place your three waystation buildings on the matching Waystations spaces of your faction board.",
    "section": "15. Keepers in Iron",
    "subsection": "15.3 Faction Setup"
  },
  {
    "id": "15.4.1",
    "title": "Encamp",
    "text": "Once per clearing, you may replace a Keeper warrior with a waystation.",
    "section": "15. Keepers in Iron",
    "subsection": "15.4 Birdsong"
  },
  {
    "id": "15.4.2",
    "title": "Decamp",
    "text": "Once per clearing, you may replace a waystation with a Keeper warrior.",
    "section": "15. Keepers in Iron",
    "subsection": "15.4 Birdsong"
  },
  {
    "id": "15.4.3",
    "title": "Recruit",
    "text": "Any number of times, you may spend a card to place two warriors at a matching waystation.",
    "section": "15. Keepers in Iron",
    "subsection": "15.4 Birdsong"
  },
  {
    "id": "15.5.1",
    "title": "Craft",
    "text": "You may activate waystations (of any type) to craft cards.",
    "section": "15. Keepers in Iron",
    "subsection": "15.5 Daylight"
  },
  {
    "id": "15.5.2",
    "title": "Act with Retinue",
    "text": "Starting with the leftmost column of your Retinue and moving to the right, you may take the column's action, as follows, for each card in the column in any order.\n\n**I.** Move. Take a move from a clearing whose suit matches the card suit.",
    "section": "15. Keepers in Iron",
    "subsection": "15.5 Daylight"
  },
  {
    "id": "II.",
    "title": "Battle then Delve",
    "text": "Choose a clearing whose suit matches the card suit. You must initiate a battle there if any enemy pieces are there. Then, if you rule the clearing and it has at least one Keeper warrior, you may delve there as follows.",
    "section": "15. Keepers in Iron",
    "subsection": "15.5 Daylight"
  },
  {
    "id": "III.",
    "title": "Move or Recover",
    "text": "Choose a clearing whose suit matches the card suit. Take a move from it, or recover relics from it.",
    "section": "15. Keepers in Iron",
    "subsection": "15.5 Daylight"
  },
  {
    "id": "15.6.1",
    "title": "Live Off the Land",
    "text": "You must remove one Keeper warrior from each clearing that has four or more Keeper warriors.",
    "section": "15. Keepers in Iron",
    "subsection": "15.6 Evening"
  },
  {
    "id": "15.6.2",
    "title": "Gather Retinue",
    "text": "You may add any number of cards from your hand to any Retinue slots, or you may shift one card in your Retinue to a different slot.",
    "section": "15. Keepers in Iron",
    "subsection": "15.6 Evening"
  },
  {
    "id": "15.6.3",
    "title": "Draw and Discard",
    "text": "Draw one card, plus one card per uncovered draw bonus.",
    "section": "15. Keepers in Iron",
    "subsection": "15.6 Evening"
  },
  {
    "id": "A.1",
    "title": "Step 1: Choose and Set Up Map",
    "text": "As a group, choose a map.",
    "section": "A. Advanced Setup",
    "subsection": "15.6 Evening"
  },
  {
    "id": "A.2",
    "title": "Step 2: Choose Deck",
    "text": "As a group, you may choose to replace the entire standard deck with the Exiles and Partisans deck.",
    "section": "A. Advanced Setup",
    "subsection": "15.6 Evening"
  },
  {
    "id": "A.3",
    "title": "Step 3: Set Up Bots",
    "text": "As a group, you may choose to play with bots.",
    "section": "A. Advanced Setup",
    "subsection": "15.6 Evening"
  },
  {
    "id": "A.4",
    "title": "Step 4: Seat Players",
    "text": "Determine the seating order and the first player randomly.",
    "section": "A. Advanced Setup",
    "subsection": "15.6 Evening"
  },
  {
    "id": "A.5",
    "title": "Step 5: Set Up Landmarks",
    "text": "As a group, you may choose to use landmarks (Appendix F).",
    "section": "A. Advanced Setup",
    "subsection": "15.6 Evening"
  },
  {
    "id": "A.6",
    "title": "Step 6: Set Up Hirelings",
    "text": "As a group, you may choose to use exactly three hirelings (Appendix E).",
    "section": "A. Advanced Setup",
    "subsection": "15.6 Evening"
  },
  {
    "id": "A.7",
    "title": "Step 7: Draw Five Cards",
    "text": "Each player draws five cards.",
    "section": "A. Advanced Setup",
    "subsection": "15.6 Evening"
  },
  {
    "id": "A.8",
    "title": "Step 8: Set Up Factions",
    "text": "As a group, you may choose and set up factions as described in the Standard Setup (5.1) or you may use the faction setup cards included in the Marauder Expansion.",
    "section": "A. Advanced Setup",
    "subsection": "15.6 Evening"
  },
  {
    "id": "A.9",
    "title": "Step 9: Place Score Markers",
    "text": "Each player places their faction's score marker on the \"0\" space on the score track.",
    "section": "A. Advanced Setup",
    "subsection": "15.6 Evening"
  },
  {
    "id": "A.10",
    "title": "Step 10: Choose Starting Hands",
    "text": "Each player chooses three cards in their hand to keep and puts the other two cards face down on the shared deck.",
    "section": "A. Advanced Setup",
    "subsection": "15.6 Evening"
  },
  {
    "id": "C.1",
    "title": "Winter Map",
    "text": "The river divides forests.",
    "section": "C. Variant Maps",
    "subsection": "15.6 Evening"
  },
  {
    "id": "C.2.2",
    "title": "The Lake",
    "text": "The **LAKE** is in the center of the map. The lake is treated as rivers linking each coastal clearing to each other coastal clearing. The lake divides forests.",
    "section": "C. Variant Maps",
    "subsection": "15.6 Evening"
  },
  {
    "id": "C.2.5",
    "title": "The Ferry",
    "text": "Once per turn, pieces moving from the coastal clearing with the Ferry can move on the lake to any other coastal clearing, ignoring adjacency, and moving the Ferry along with them.",
    "section": "C. Variant Maps",
    "subsection": "15.6 Evening"
  },
  {
    "id": "C.3.2",
    "title": "Closed Paths",
    "text": "A path covered with a closed path marker is a **CLOSED PATH**.",
    "section": "C. Variant Maps",
    "subsection": "15.6 Evening"
  },
  {
    "id": "C.3.3",
    "title": "Removing Closed Paths",
    "text": "Once per turn in their Daylight, a player can spend a card to remove a closed path marker from the game permanently and score one victory point.",
    "section": "C. Variant Maps",
    "subsection": "15.6 Evening"
  },
  {
    "id": "C.3.4",
    "title": "The Pass and Tower",
    "text": "The clearing marked with the Tower piece is **THE PASS**. At the end of a player's Evening, if that player rules the Pass, that player scores one victory point.",
    "section": "C. Variant Maps",
    "subsection": "15.6 Evening"
  },
  {
    "id": "E.1",
    "title": "Gaining and Losing Hirelings",
    "text": "When a player's score marker enters a space with a hireling marker, they take the hireling marker. At the end of their turn, they take any hireling card from the supply.",
    "section": "E. Hirelings",
    "subsection": "15.6 Evening"
  },
  {
    "id": "E.3",
    "title": "Rules",
    "text": "A hireling's controller treats hireling pieces as their own only for rule.",
    "section": "E. Hirelings",
    "subsection": "15.6 Evening"
  },
  {
    "id": "F.1",
    "title": "General Rules",
    "text": "Landmarks cannot be battled, moved, or removed, unless noted explicitly by a landmark. Landmarks are not owned by any faction and are not enemy pieces.",
    "section": "F. Landmarks",
    "subsection": "15.6 Evening"
  },
  {
    "id": "G.1.1",
    "title": "Ability",
    "text": "A persistent effect of a faction as listed at the top of its faction board and in its Faction Rules and Abilities section, or a persistent effect of a hireling as listed on its hireling card.",
    "section": "G. Glossary",
    "subsection": "15.6 Evening"
  },
  {
    "id": "G.1.2",
    "title": "Adjacent",
    "text": "A clearing is adjacent to all other clearings linked to it by a path. A forest is adjacent to all clearings that touch it without crossing a path, and it is adjacent to all forests that are separated by only one path, except on the lake.",
    "section": "G. Glossary",
    "subsection": "15.6 Evening"
  },
  {
    "id": "G.1.3",
    "title": "Building",
    "text": "A square cardboard piece owned by its faction.",
    "section": "G. Glossary",
    "subsection": "15.6 Evening"
  },
  {
    "id": "G.1.5",
    "title": "Discard",
    "text": "Place the prompted card in the shared discard pile.",
    "section": "G. Glossary",
    "subsection": "15.6 Evening"
  },
  {
    "id": "G.1.7",
    "title": "Effect",
    "text": "Anything that changes the game, including persistent effects, faction abilities, and actions.",
    "section": "G. Glossary",
    "subsection": "15.6 Evening"
  },
  {
    "id": "G.1.8",
    "title": "Enemy",
    "text": "Any other player that you are not in a coalition with, or a hireling that is in the supply or held by an enemy player.",
    "section": "G. Glossary",
    "subsection": "15.6 Evening"
  },
  {
    "id": "G.1.9",
    "title": "Enemy Piece",
    "text": "A faction piece of an enemy player or a hireling piece of an enemy hireling, except while you're treating the piece as your own for rule.",
    "section": "G. Glossary",
    "subsection": "15.6 Evening"
  },
  {
    "id": "G.1.10",
    "title": "Faction Piece",
    "text": "All the warriors, pawns, buildings, and tokens listed on the back of a faction board.",
    "section": "G. Glossary",
    "subsection": "15.6 Evening"
  },
  {
    "id": "G.1.11",
    "title": "Forest",
    "text": "An area on the map enclosed by paths and clearings.",
    "section": "G. Glossary",
    "subsection": "15.6 Evening"
  },
  {
    "id": "G.1.12",
    "title": "Force",
    "text": "See 1.5.5.",
    "section": "G. Glossary",
    "subsection": "15.6 Evening"
  },
  {
    "id": "G.1.13",
    "title": "Item",
    "text": "A square cardboard piece showing an item that is not owned by any faction.",
    "section": "G. Glossary",
    "subsection": "15.6 Evening"
  },
  {
    "id": "G.1.16",
    "title": "Path",
    "text": "A white link between two clearings.",
    "section": "G. Glossary",
    "subsection": "15.6 Evening"
  },
  {
    "id": "G.1.17",
    "title": "Pawn",
    "text": "A wooden figure owned by its faction.",
    "section": "G. Glossary",
    "subsection": "15.6 Evening"
  },
  {
    "id": "G.1.18",
    "title": "Piece",
    "text": "Any component—building, token, warrior, pawn, item, marker, and so on.",
    "section": "G. Glossary",
    "subsection": "15.6 Evening"
  },
  {
    "id": "G.1.19",
    "title": "Place",
    "text": "Take the prompted piece from the prompted source and put it in the prompted destination.",
    "section": "G. Glossary",
    "subsection": "15.6 Evening"
  },
  {
    "id": "G.1.20",
    "title": "Play Area",
    "text": "The area around your faction board. Cards in it can only be spent, discarded, or used for other purposes if explicitly instructed.",
    "section": "G. Glossary",
    "subsection": "15.6 Evening"
  },
  {
    "id": "G.1.21",
    "title": "Replace",
    "text": "Shorthand for **REMOVE** then **PLACE**.",
    "section": "G. Glossary",
    "subsection": "15.6 Evening"
  },
  {
    "id": "G.1.22",
    "title": "Remove",
    "text": "Take the prompted piece from the prompted source and return it to the prompted destination.",
    "section": "G. Glossary",
    "subsection": "15.6 Evening"
  },
  {
    "id": "G.1.23",
    "title": "Reveal",
    "text": "Place the prompted card face up in your play area.",
    "section": "G. Glossary",
    "subsection": "15.6 Evening"
  },
  {
    "id": "G.1.24",
    "title": "River",
    "text": "A blue link between two clearings.",
    "section": "G. Glossary",
    "subsection": "15.6 Evening"
  },
  {
    "id": "G.1.25",
    "title": "Ruin",
    "text": "Piece covering an \"R\" slot in a clearing.",
    "section": "G. Glossary",
    "subsection": "15.6 Evening"
  },
  {
    "id": "G.1.28",
    "title": "Slot",
    "text": "White box in a clearing.",
    "section": "G. Glossary",
    "subsection": "15.6 Evening"
  },
  {
    "id": "G.1.29",
    "title": "Spend",
    "text": "See **DISCARD**.",
    "section": "G. Glossary",
    "subsection": "15.6 Evening"
  },
  {
    "id": "G.1.30",
    "title": "Supply",
    "text": "The collection of pieces that is not on a faction board or the map.",
    "section": "G. Glossary",
    "subsection": "15.6 Evening"
  },
  {
    "id": "G.1.31",
    "title": "Swap",
    "text": "Switch the locations of the two prompted pieces.",
    "section": "G. Glossary",
    "subsection": "15.6 Evening"
  },
  {
    "id": "G.1.32",
    "title": "Token",
    "text": "A circular cardboard piece owned by its faction.",
    "section": "G. Glossary",
    "subsection": "15.6 Evening"
  },
  {
    "id": "G.1.33",
    "title": "Treat",
    "text": "The prompted thing takes on the properties of the second prompted thing.",
    "section": "G. Glossary",
    "subsection": "15.6 Evening"
  },
  {
    "id": "G.1.34",
    "title": "Warrior",
    "text": "A wooden figure owned by its faction.",
    "section": "G. Glossary",
    "subsection": "15.6 Evening"
  }
];
