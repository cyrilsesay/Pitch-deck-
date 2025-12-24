
export interface PitchDeckInput {
  startupName: string;
  problem: string;
  solution: string;
  targetMarket: string;
  businessModel: string;
  uvp: string;
  technology: string;
  competitiveAdvantage: string;
  team?: string;
  fundingAsk?: string;
}

export interface SlideContent {
  title: string;
  subtitle?: string;
  bullets: string[];
  footer?: string;
}

export interface GeneratedDeck {
  startupName: string;
  slides: SlideContent[];
}
