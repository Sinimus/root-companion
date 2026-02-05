export type FactionType = 'militant' | 'insurgent';

export interface IFaction {
  id: string;
  name: string;
  shortName: string;
  reach: number;
  type: FactionType;
  color: string;
  iconName: string;
}

export const FACTIONS_DATA: IFaction[] = [
  {
    id: 'marquise',
    name: 'Marquise de Cat',
    shortName: 'Marquise',
    reach: 10,
    type: 'militant',
    color: 'border-orange-600 bg-orange-900/20 hover:bg-orange-900/40',
    iconName: 'cat',
  },
  {
    id: 'eyrie',
    name: 'Eyrie Dynasties',
    shortName: 'Eyrie',
    reach: 7,
    type: 'militant',
    color: 'border-blue-600 bg-blue-900/20 hover:bg-blue-900/40',
    iconName: 'bird',
  },
  {
    id: 'alliance',
    name: 'Woodland Alliance',
    shortName: 'Alliance',
    reach: 3,
    type: 'insurgent',
    color: 'border-green-600 bg-green-900/20 hover:bg-green-900/40',
    iconName: 'mouse',
  },
  {
    id: 'vagabond_1',
    name: 'Vagabond (First)',
    shortName: 'Vagabond 1',
    reach: 5,
    type: 'insurgent',
    color: 'border-gray-500 bg-gray-800/40 hover:bg-gray-700/40',
    iconName: 'boot',
  },
  {
    id: 'vagabond_2',
    name: 'Vagabond (Second)',
    shortName: 'Vagabond 2',
    reach: 2,
    type: 'insurgent',
    color: 'border-gray-600 bg-gray-800/40 hover:bg-gray-700/40',
    iconName: 'boot',
  },
  {
    id: 'cult',
    name: 'Lizard Cult',
    shortName: 'Cult',
    reach: 2,
    type: 'insurgent',
    color: 'border-yellow-500 bg-yellow-900/20 hover:bg-yellow-900/40',
    iconName: 'lizard',
  },
  {
    id: 'riverfolk',
    name: 'Riverfolk Company',
    shortName: 'Riverfolk',
    reach: 5,
    type: 'insurgent',
    color: 'border-cyan-500 bg-cyan-900/20 hover:bg-cyan-900/40',
    iconName: 'otter',
  },
  {
    id: 'duchy',
    name: 'Underground Duchy',
    shortName: 'Duchy',
    reach: 8,
    type: 'militant',
    color: 'border-amber-700 bg-amber-900/20 hover:bg-amber-900/40',
    iconName: 'mole',
  },
  {
    id: 'corvid',
    name: 'Corvid Conspiracy',
    shortName: 'Corvids',
    reach: 3,
    type: 'insurgent',
    color: 'border-purple-700 bg-purple-900/20 hover:bg-purple-900/40',
    iconName: 'crow',
  },
  {
    id: 'hundreds',
    name: 'Lord of the Hundreds',
    shortName: 'Hundreds',
    reach: 9,
    type: 'militant',
    color: 'border-red-700 bg-red-900/20 hover:bg-red-900/40',
    iconName: 'rat',
  },
  {
    id: 'keepers',
    name: 'Keepers in Iron',
    shortName: 'Keepers',
    reach: 8,
    type: 'militant',
    color: 'border-stone-400 bg-stone-800/40 hover:bg-stone-700/40',
    iconName: 'badger',
  },
];

export const RECOMMENDED_REACH: Record<number, number> = {
  2: 17,
  3: 18,
  4: 21,
  5: 25,
  6: 28,
};
