
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

export interface FinancialDecision {
  id: string;
  title: string;
  description: string;
  category: 'expense_reduction' | 'revenue_increase' | 'cash_flow' | 'inventory' | 'pricing';
  impact: {
    value: number;
    period: 'monthly' | 'quarterly' | 'yearly';
    description: string;
  };
  confidence: number;
  implementationSteps: string[];
  status: 'suggested' | 'accepted' | 'rejected' | 'implemented';
  createdAt: string;
  updatedAt: string;
}
