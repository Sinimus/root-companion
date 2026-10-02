export const RULES_DB: Record<string, string> = {
  // --- GENERAL ---
  '1.5.2': 'STARTING FACTION: Each player owns the faction they choose in setup and the pieces listed on the back of its faction board.',
  '2.2.1': 'ADJACENCY: A clearing is adjacent to all other clearings linked to it by a path.',
  '2.5': 'RULE: A player rules a clearing if they have more total warriors and buildings in it than each other player. (Tokens and pawns do not contribute to rule.) If there is a tie, no one rules.',
  '3.3': 'DOMINANCE CARDS: If you have at least 10 VP, you may play a dominance card to change your victory condition. You can no longer score VP.',
  '4.1': 'CRAFT: Activate crafting pieces of the suits listed in the card\'s bottom-left corner. You can activate each piece only once per turn.',
  '4.2': 'MOVE: Take any number of your warriors/pawns from one clearing and move them to one adjacent clearing. You must rule the origin or destination clearing.',
  '4.3': 'BATTLE: Choose a clearing with your warriors and an enemy. Roll dice. Attacker deals higher roll, defender deals lower. Max hits = your number of warriors.',
  '4.3.1': 'AMBUSH: Defender may play a matching Ambush card to deal 2 hits immediately. Attacker may Foil it with a matching Ambush.',
  '4.3.5.I': 'EXTRA HITS: Extra hits are not limited by the number of warriors in the clearing of battle.',
  '4.3.5.II': 'DEFENSELESS: If the defender has no warriors in the clearing of battle, the attacker deals an extra hit.',

  // --- MARQUISE (6) ---
  '6.2.2': 'THE KEEP: Only the Marquise can place pieces in the clearing with the keep token. (Others can move in).',
  '6.2.3': 'FIELD HOSPITALS: Whenever Marquise warriors are removed, spend a matching card to place them back at the Keep.',
  '6.4': 'BIRDSONG: Place wood tokens in each clearing with any number of sawmills, one wood per sawmill there.',
  '6.2.1': 'CRAFTING: The Marquise crafts during Daylight by activating workshops.',
  '6.5.1': 'BATTLE: Initiate a battle.',
  '6.5.2': 'MARCH: Take up to two moves.',
  '6.5.3': 'RECRUIT: Place one warrior at each recruiter. You may take this action only once per turn.',
  '6.5.4': 'BUILD: Place a building in a clearing you rule with an open slot by spending wood equal to its cost.',
  '6.5.5': 'OVERWORK: Spend a card matching a sawmill\'s clearing to place a wood token there.',
  '6.6': 'EVENING: Draw one card +1 per uncovered draw bonus. Discard down to 5.',

  // --- EYRIE (7) ---
  '7.2.2': 'LORDS OF THE FOREST: Eyrie rule a clearing when tied for most warriors and buildings, if they have at least one Eyrie piece there.',
  '7.2.3': 'DISDAIN FOR TRADE: Items crafted score only 1 VP.',
  '7.4.1': 'EMERGENCY ORDERS: If you have 0 cards in hand, draw 1 card.',
  '7.4.2': 'ADD TO DECREE: Add 1 or 2 cards. Only 1 can be a Bird card.',
  '7.4.3': 'A NEW ROOST: If no roosts on map, place 1 roost + 3 warriors in clearing with fewest warriors.',
  '7.5.1': 'CRAFT: Activate roosts to craft cards.',
  '7.5.2': 'RESOLVE DECREE: Resolve left to right. Recruit > Move > Battle > Build. Failure = Turmoil.',
  '7.6.1': 'SCORE POINTS: Score VP listed on rightmost empty space of Roosts track.',
  '7.6.2': 'DRAW & DISCARD: Draw 1 card +1 per uncovered bonus. Discard to 5.',
  '7.7': 'TURMOIL: Lose 1 VP per bird card on the Decree (including Viziers). Discard Decree (except Viziers). Depose Leader. End Daylight.',

  // --- ALLIANCE (8) ---
  '8.2.2': 'GUERRILLA WAR: As defender, Alliance deals higher roll, attacker deals lower.',
  '8.2.6': 'OUTRAGE: If enemy removes Sympathy or moves warriors into sympathetic clearing, they must add a matching card to Supporters.',
  '8.4.1': 'REVOLT: Spend 2 matching Supporters. Remove all enemy pieces. Place Base + 1 Warrior per sympathetic clearing of that suit. Gain Officer.',
  '8.4.2': 'SPREAD SYMPATHY: Spend matching Supporters (cost above the token) to place Sympathy in a clearing adjacent to Sympathy and score. (Martial Law: +1 cost if target has 3+ enemy warriors).',
  '8.5.1': 'CRAFT: Activate sympathy tokens to craft.',
  '8.5.2': 'MOBILIZE: Add card from hand to Supporters.',
  '8.5.3': 'TRAIN: Spend matching card to gain Officer.',
  '8.6.1': 'MILITARY OPERATIONS: Take actions up to number of Officers (Move, Battle, Recruit, Organize).',
  '8.6.2': 'DRAW & DISCARD: Draw 1 card +1 per uncovered bonus. Discard to 5.',

  // --- VAGABOND (9) ---
  '9.2.2': 'LONE WANDERER: Pawn is not a warrior. Cannot rule. Cannot be removed. If an enemy effect removes all enemy pieces from his clearing (Revolt, Favor, Bomb), damage 3 items.',
  '9.2.5': 'ITEMS: Exhaust items to take actions. Face up = ready, face down = exhausted. Damaged items sit in the Damaged box. Face-up Tea, Coins and Bags go on their tracks.',
  '9.2.9': 'RELATIONSHIPS: Aid non-hostile to improve. Remove warrior of non-hostile = Hostile.',
  '9.4.1': 'REFRESH: Flip 2 exhausted items face up per Tea face up on the Refresh track, then 3 more.',
  '9.4.2': 'SLIP: Move to adjacent clearing/forest without a Boot, even into a Hostile clearing. Ignores effects that prevent moving out of a clearing.',
  '9.5': 'ACTIONS: Exhaust items to act.',
  '9.5.1': 'MOVE: Exhaust Boot to move one clearing. +1 Boot if the destination has Hostile warriors.',
  '9.5.2': 'BATTLE: Exhaust Sword to initiate a battle. Max rolled hits = undamaged Swords.',
  '9.5.3': 'EXPLORE: Exhaust Torch. Take item from Ruin. Score 1 VP.',
  '9.5.4': 'AID: Exhaust item + give a card matching your clearing to a player with pieces there (even Hostile). You may take one of their crafted items.',
  '9.5.5': 'QUEST: In a clearing matching the quest, exhaust the 2 items it lists. Score 1 VP per completed quest of suit OR Draw 2 cards.',
  '9.5.6': 'STRIKE: Exhaust Crossbow to remove warrior (no roll).',
  '9.5.7': 'REPAIR: Exhaust Hammer to move one damaged item to the Satchel, keeping its side.',
  '9.5.8': 'CRAFT: Exhaust one Hammer per crafting icon. Your clearing must match all icons.',
  '9.6.1': 'REST: If in a forest, move all damaged items to the Satchel and flip them face up.',
  '9.6.2': 'DRAW: Draw 1 card +1 per Coin face up on its track.',
  '9.6.4': 'LIMIT: Item limit 6 + 2 per Bag face up on its track, counting Satchel and Damaged box. Remove extras permanently.',

  // --- LIZARD CULT (10) ---
  '10.2.3': 'REVENGE: Defending warriors removed in battle become Acolytes.',
  '10.4.1': 'ADJUST OUTCAST: Suit with most cards in Lost Souls (ignoring birds) becomes Outcast. If same as previous, or on a tie, it becomes Hated.',
  '10.4.2': 'DISCARD LOST SOULS: Move Lost Souls to discard pile.',
  '10.4.3': 'CONSPIRACIES: Spend Acolytes in Outcast clearings. Crusade (2), Convert (2), Sanctify (3). Hated = -1 cost.',
  '10.5': 'RITUALS: Reveal cards to act. Build, Recruit, Score, Sacrifice.',
  '10.6.1': 'RETURN CARDS: Return revealed cards to hand (cards spent to Score are gone).',
  '10.6.2': 'CRAFT: Activate gardens whose printed suit matches the Outcast suit.',
  '10.6.3': 'DRAW: Draw 1 card +1 per uncovered bonus. Discard to 5.',

  // --- RIVERFOLK (11) ---
  '11.2.2': 'SWIMMERS: Treat rivers as paths. Move along rivers regardless of rule.',
  '11.4.1': 'PROTECTIONISM: If Payments empty, place 2 warriors there.',
  '11.4.2': 'DIVIDENDS: Score 1 VP per 2 Funds if any Trade Post is on the map.',
  '11.4.3': 'GATHER FUNDS: Move all warriors to Funds box.',
  '11.5': 'OPERATIONS: Commit/Spend funds to act.',
  '11.6.1': 'DISCARD: Discard down to 5 cards.',
  '11.6.2': 'SET COSTS: Move each service marker (Hand Card, Riverboats, Mercenaries) to any space on its track.',

  // --- DUCHY (12) ---
  '12.4': 'BIRDSONG: Place warriors in Burrow.',
  '12.5.1': 'ASSEMBLY: Take up to 2 actions (Build, Recruit, Move, Battle, Dig).',
  '12.5.2': 'PARLIAMENT: Take the action of each Swayed Minister once.',
  '12.5.3': 'SWAY: With a Crown of its rank left, reveal the cards a Minister lists (each needs a matching clearing with a Duchy piece) to sway it and score.',
  '12.6.1': 'RETURN CARDS: Discard Birds, return others to hand.',
  '12.6.2': 'CRAFT: Activate Citadels and Markets.',

  // --- CORVID (13) ---
  '13.4.1': 'CRAFT: Activate Plot tokens.',
  '13.4.2': 'FLIP PLOTS: Any number of times, flip a plot in a clearing with a Corvid warrior. Score 1 VP per face-up plot on map each time.',
  '13.4.3': 'RECRUIT: Once per turn, spend a card to place a warrior in each matching clearing.',
  '13.5.4': 'TRICK: Swap two plot tokens on the map, both face up or both face down.',
  '13.6.1': 'EXERT: Take one Daylight action if you choose not to draw this Evening.',
  '13.5': 'DAYLIGHT: Take up to 3 actions (Move, Plot, Battle, Trick).',
  '13.6.2': 'DRAW: Draw 1 card +1 per face-up Extortion on the map. Discard to 5.',

  // --- HUNDREDS (14) ---
  '14.4.1': 'RAZE: At each Mob, remove enemy buildings/tokens. Roll Mob Die to spread.',
  '14.4.2': 'RECRUIT: Place warriors = Prowess at Warlord. +1 per Stronghold.',
  '14.4.3': 'ANOINT: If Warlord off map, replace any Hundreds warrior with the Warlord; if you cannot, place him in any clearing.',
  '14.4.4': 'MOOD: Switch to a different Mood card that does not show an item in your Hoard.',
  '14.5.1': 'CRAFT: Activate Strongholds.',
  '14.5.2': 'COMMAND: Move, Battle, Build. Limit = Command stat.',
  '14.5.3': 'ADVANCE: Move Warlord + Battle. Limit = Prowess stat.',
  '14.6.1': 'INCITE: Spend a card to place a Mob in a matching clearing with no Mob and a Hundreds warrior.',
  '14.6.2': 'OPPRESS: Count clearings you rule with a Hundreds piece and NO enemy pieces: 1-2 = 1 VP, 3-4 = 2 VP, 5 = 3 VP, 6+ = 4 VP.',

  // --- KEEPERS (15) ---
  '15.4.1': 'ENCAMP: Once per clearing, replace a warrior with a Waystation.',
  '15.4.2': 'DECAMP: Once per clearing, replace a Waystation with a warrior.',
  '15.4.3': 'RECRUIT: Spend a card to place 2 warriors at a matching Waystation.',
  '15.5.1': 'CRAFT: Activate Waystations.',
  '15.5.2': 'ACT WITH RETINUE: Move, Battle then Delve, Move or Recover.',
  '15.6.1': 'LIVE OFF LAND: Remove 1 warrior from each clearing with 4+ Keeper warriors.',
  '15.6.2': 'GATHER RETINUE: Add any number of cards to Retinue or shift one. Max 10 cards.',
  '15.6.3': 'DRAW: Draw 1 card +1 per Waystation.'
};