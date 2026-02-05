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
  '4.3.3.I': 'EXTRA HITS: Extra hits are not limited by the number of warriors in the clearing of battle.',
  '4.3.3.II': 'DEFENSELESS: If the defender has no warriors in the clearing of battle, the attacker deals an extra hit.',

  // --- MARQUISE (6) ---
  '6.2.2': 'THE KEEP: Only the Marquise can place pieces in the clearing with the keep token. (Others can move in).',
  '6.2.3': 'FIELD HOSPITALS: Whenever Marquise warriors are removed, spend a matching card to place them back at the Keep.',
  '6.4': 'BIRDSONG: Place wood tokens in each clearing with any number of sawmills, one wood per sawmill there.',
  '6.5.1': 'CRAFT: Activate workshops to craft cards.',
  '6.5.2': 'MARCH: Take up to two moves.',
  '6.5.3': 'RECRUIT: Place one warrior at each recruiter. You may take this action only once per turn.',
  '6.5.4': 'BUILD: Place a building in a clearing you rule with an open slot by spending wood equal to its cost.',
  '6.5.5': 'OVERWORK: Spend a card matching a sawmill\'s clearing to place a wood token there.',
  '6.6': 'EVENING: Draw one card +1 per uncovered draw bonus. Discard down to 5.',

  // --- EYRIE (7) ---
  '7.2.2': 'LORDS OF THE FOREST: Eyrie rule clearings when tied for presence.',
  '7.2.3': 'DISDAIN FOR TRADE: Items crafted score only 1 VP.',
  '7.4.1': 'EMERGENCY ORDERS: If you have 0 cards in hand, draw 1 card.',
  '7.4.2': 'ADD TO DECREE: Add 1 or 2 cards. Only 1 can be a Bird card.',
  '7.4.3': 'A NEW ROOST: If no roosts on map, place 1 roost + 3 warriors in clearing with fewest warriors.',
  '7.5.1': 'CRAFT: Activate roosts to craft cards.',
  '7.5.2': 'RESOLVE DECREE: Resolve left to right. Recruit > Move > Battle > Build. Failure = Turmoil.',
  '7.6.1': 'SCORE POINTS: Score VP listed on rightmost empty space of Roosts track.',
  '7.6.2': 'DRAW & DISCARD: Draw 1 card +1 per uncovered bonus. Discard to 5.',
  '7.7': 'TURMOIL: Lose 1 VP per bird card. Discard Decree (except Viziers). Depose Leader. End Daylight.',

  // --- ALLIANCE (8) ---
  '8.2.2': 'GUERRILLA WAR: As defender, Alliance deals higher roll, attacker deals lower.',
  '8.2.6': 'OUTRAGE: If enemy removes Sympathy or moves warriors into sympathetic clearing, they must add a matching card to Supporters.',
  '8.4.1': 'REVOLT: Spend 2 Supporters. Remove enemy pieces. Place Base + Warriors. Gain Officer.',
  '8.4.2': 'SPREAD SYMPATHY: Spend Supporters to place token in adjacent clearing. (Martial Law: +1 cost if target has 3+ enemy warriors).',
  '8.5.1': 'CRAFT: Activate sympathy tokens to craft.',
  '8.5.2': 'MOBILIZE: Add card from hand to Supporters.',
  '8.5.3': 'TRAIN: Spend matching card to gain Officer.',
  '8.6.1': 'MILITARY OPERATIONS: Take actions up to number of Officers (Move, Battle, Recruit, Organize).',
  '8.6.2': 'DRAW & DISCARD: Draw 1 card +1 per uncovered bonus. Discard to 5.',

  // --- VAGABOND (9) ---
  '9.2.2': 'LONE WANDERER: Pawn is not a warrior. Cannot rule. Cannot be removed. If "removed" by effect, damage 3 items.',
  '9.2.5': 'ITEMS: Exhaust items to take actions. Face up = Undamaged. Face down = Exhausted.',
  '9.2.9': 'RELATIONSHIPS: Aid non-hostile to improve. Remove warrior of non-hostile = Hostile.',
  '9.4.1': 'REFRESH: Flip 3 exhausted items face up (+2 per Tea).',
  '9.4.2': 'SLIP: Move to adjacent clearing/forest for free. Ignores rule and effects.',
  '9.5': 'ACTIONS: Exhaust items to act.',
  '9.5.1': 'MOVE: Exhaust Boot. +1 Boot if moving into Hostile clearing.',
  '9.5.2': 'BATTLE: Exhaust Sword. Deal hits = undamaged Swords.',
  '9.5.3': 'EXPLORE: Exhaust Torch. Take item from Ruin. Score 1 VP.',
  '9.5.4': 'AID: Exhaust item + give card to player in clearing. Take their item. Improve Relationship.',
  '9.5.5': 'QUEST: Exhaust 2 items matching quest. Score 1 VP per completed quest of suit OR Draw 2 cards.',
  '9.5.6': 'STRIKE: Exhaust Crossbow to remove warrior (no roll).',
  '9.5.7': 'REPAIR: Exhaust Hammer to repair damaged item.',
  '9.6.1': 'REST: If in forest, repair all items.',
  '9.6.2': 'DRAW: Draw 1 card +1 per Coin.',
  '9.6.4': 'LIMIT: Satchel limit 6 + 2 per Bag. Discard extras.',

  // --- LIZARD CULT (10) ---
  '10.2.3': 'REVENGE: Defending warriors removed in battle become Acolytes.',
  '10.4.1': 'ADJUST OUTCAST: Suit with most cards in Lost Souls becomes Outcast. If same as previous, becomes Hated.',
  '10.4.2': 'DISCARD LOST SOULS: Move Lost Souls to discard pile.',
  '10.4.3': 'CONSPIRACIES: Spend Acolytes in Outcast clearings. Crusade (2), Convert (2), Sanctify (3). Hated = -1 cost.',
  '10.5': 'RITUALS: Reveal cards to act. Build, Recruit, Score, Sacrifice.',
  '10.6.1': 'RETURN CARDS: Return revealed cards to hand.',
  '10.6.2': 'CRAFT: Activate gardens matching Outcast suit.',
  '10.6.3': 'DRAW: Draw 1 card +1 per uncovered bonus. Discard to 5.',

  // --- RIVERFOLK (11) ---
  '11.2.2': 'SWIMMERS: Treat rivers as paths. Move along rivers regardless of rule.',
  '11.4.1': 'PROTECTIONISM: If Payments empty, place 2 warriors there.',
  '11.4.2': 'DIVIDENDS: Score 1 VP per 2 Funds if you have a Trade Post.',
  '11.4.3': 'GATHER FUNDS: Move all warriors to Funds box.',
  '11.5': 'OPERATIONS: Commit/Spend funds to act.',
  '11.6.1': 'DISCARD: Discard down to 5 cards.',
  '11.6.2': 'SET COSTS: Set costs for Hand Card, Riverboats, Mercenaries.',

  // --- DUCHY (12) ---
  '12.4': 'BIRDSONG: Place warriors in Burrow.',
  '12.5.1': 'ASSEMBLY: Take up to 2 actions (Build, Recruit, Move, Battle, Dig).',
  '12.5.2': 'PARLIAMENT: Take actions of Swayed Ministers.',
  '12.5.3': 'SWAY: Reveal cards matching clearings with pieces to sway Minister.',
  '12.6.1': 'RETURN CARDS: Discard Birds, return others to hand.',
  '12.6.2': 'CRAFT: Activate Citadels and Markets.',

  // --- CORVID (13) ---
  '13.4.1': 'CRAFT: Activate Plot tokens.',
  '13.4.2': 'FLIP PLOTS: Flip any number. Score 1 VP per face-up plot on map.',
  '13.4.3': 'RECRUIT: Discard card to place warrior in matching clearings.',
  '13.5': 'DAYLIGHT: Take up to 3 actions (Move, Plot, Battle, Trick).',
  '13.6.2': 'DRAW: Draw 1 card +1 per Extortion.',

  // --- HUNDREDS (14) ---
  '14.4.1': 'RAZE: At each Mob, remove enemy buildings/tokens. Roll Mob Die to spread.',
  '14.4.2': 'RECRUIT: Place warriors = Prowess at Warlord. +1 per Stronghold.',
  '14.4.3': 'ANOINT: If Warlord off map, replace warrior with Warlord.',
  '14.4.4': 'MOOD: Choose new Mood card.',
  '14.5.1': 'CRAFT: Activate Strongholds.',
  '14.5.2': 'COMMAND: Move, Battle, Build. Limit = Command stat.',
  '14.5.3': 'ADVANCE: Move Warlord + Battle. Limit = Prowess stat.',
  '14.6.1': 'INCITE: Discard card to place Mob in matching clearing.',
  '14.6.2': 'OPPRESS: Score VP for clearings you rule with NO enemy pieces.',

  // --- KEEPERS (15) ---
  '15.4.1': 'ENCAMP: Replace warrior with Waystation.',
  '15.4.2': 'DECAMP: Replace Waystation with warrior.',
  '15.4.3': 'RECRUIT: Discard card to place 2 warriors at Waystation.',
  '15.5.1': 'CRAFT: Activate Waystations.',
  '15.5.2': 'ACT WITH RETINUE: Move, Battle then Delve, Move or Recover.',
  '15.6.1': 'LIVE OFF LAND: Remove 1 warrior from clearings with 4+.',
  '15.6.2': 'GATHER RETINUE: Add cards to Retinue or shift one.',
  '15.6.3': 'DRAW: Draw 1 card +1 per Waystation.'
};