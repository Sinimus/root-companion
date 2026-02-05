export type PhaseId = 'birdsong' | 'daylight' | 'evening';

export interface ITurnStep {
  id: string;
  title: string;
  description?: string;
  ruleReference?: string; // e.g., "7.4.1"
  architectTip?: string; // Contextual warning
  tacticalTip?: string; // Strategic advice from Player Aid
  required?: boolean;
}

export interface ITurnPhase {
  id: PhaseId;
  title: string;
  color: string;
  steps: ITurnStep[];
}

export interface IStrategyTip {
  title: string;
  text: string;
}

export interface IFactionGuide {
  factionId: string;
  setup: string[]; // Array of setup instructions
  strategy?: {
    summary: string;
    tips: IStrategyTip[];
  };
  phases: ITurnPhase[];
}

export interface IHireling {
  id: string;
  name: string;
  description: string;
  ruleReference?: string;
  items?: string[]; // Pokud hireling používá items
  controlType: 'die_roll' | 'passive';
  promotedSide: {
    abilities: {
      title: string;
      effect: string;
      type: 'passive' | 'action' | 'setup';
    }[];
    markers: number; // Default control markers for promoted side
  };
  demotedSide: {
    abilities: {
      title: string;
      effect: string;
      type: 'passive' | 'action' | 'setup';
    }[];
    markers: number; // Default control markers for demoted side
  };
  iconName: string; // lucide icon string match
}

export interface ILandmark {
  id: string;
  name: string;
  setupText: string;
  ruleText: string;
  gameplayEffect?: string; // Optional dynamic state description
  icon?: string; // Lucide icon name for visual representation
}

export interface IRuleDefinition {
  id: string;
  text: string;
}

export type Suit = 'fox' | 'rabbit' | 'mouse' | 'bird';

export interface IGameSession {
  activeFactionIds: string[];
  map?: string;
  suitMapping?: Record<number, Suit>;
  hirelings?: string[];
  landmarks?: string[];
  deck?: 'standard' | 'exiles';
  startedAt: number;
}