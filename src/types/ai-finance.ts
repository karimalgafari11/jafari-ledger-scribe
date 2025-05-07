
export interface AIEngineSettings {
  journalEntrySuggestions: {
    enabled: boolean;
    threshold: number;
    autoCreate: boolean;
  };
  dynamicPricing: {
    enabled: boolean;
    maxAdjustmentPercentage: number;
    frequencyDays: number;
    considerDemand: boolean;
    considerCost: boolean;
    considerCompetition: boolean;
  };
  behavioralAlerts: {
    enabled: boolean;
    learningPeriodDays: number;
    maxDailyAlerts: number;
  };
  varianceAnalysis: {
    enabled: boolean;
    thresholdPercentage: number;
    analysisPeriod: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  };
}

export interface AiPerformanceAnalysis {
  profitMargin: number;
  currentRatio: number;
  revenueGrowth: number;
  expenseTrend: number;
  cashFlow: number;
  keyInsights: string[];
  recommendations: {
    priority: 'high' | 'medium' | 'low';
    description: string;
    potentialImpact: string;
    implementationDifficulty: 'easy' | 'moderate' | 'complex';
  }[];
}

// Base interface for all financial decisions
export interface FinancialDecision {
  id: string;
  title: string;
  description: string;
  impact: number; // Changed from object to number for simpler comparison
  confidence: number;
  suggestedActions: string[];
  createdAt: string; // Changed from Date to string
  status: 'suggested' | 'accepted' | 'rejected' | 'implemented';
  type: 'journal_entry' | 'pricing' | 'provision' | 'variance'; // Added type property
}

// Specific decision types
export interface JournalEntrySuggestion extends FinancialDecision {
  type: 'journal_entry';
  suggestedLines: {
    accountId: string;
    accountName: string;
    debit: number;
    credit: number;
    description: string;
  }[];
  preventionReason?: string;
  commonError?: string;
}

export interface PricingSuggestion extends FinancialDecision {
  type: 'pricing';
  productId: string;
  productName: string;
  currentPrice: number;
  suggestedPrice: number;
  priceChangeReason: 'demand' | 'cost' | 'competition';
  demandFactor?: number;
  costFactor?: number;
  competitionFactor?: number;
  expectedRevenue: number;
}

export interface ProvisionSuggestion extends FinancialDecision {
  type: 'provision';
  accountId: string;
  accountName: string;
  currentAmount: number;
  suggestedAmount: number;
  riskFactor: number;
  category: 'bad_debts' | 'inventory' | 'legal' | 'other';
}

export interface VarianceAnalysis extends FinancialDecision {
  type: 'variance';
  accountId: string;
  accountName: string;
  expectedAmount: number;
  actualAmount: number;
  variance: number;
  variancePercentage: number;
  explanation: string;
  severity: 'low' | 'medium' | 'high';
}
