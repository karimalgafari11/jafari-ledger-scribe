
import { NotificationChannel, NotificationPriority } from '@/types/notifications';

export interface FinancialDecision {
  id: string;
  type: 'journal_entry' | 'pricing' | 'provision' | 'variance';
  title: string;
  description: string;
  impact: number;
  confidence: number; // 0-100
  suggestedActions: string[];
  relatedEntityId?: string;
  relatedEntityType?: string;
  createdAt: Date;
  implementedAt?: Date;
  status: 'pending' | 'approved' | 'rejected' | 'implemented';
}

export interface JournalEntrySuggestion extends FinancialDecision {
  type: 'journal_entry';
  suggestedLines: {
    accountId: string;
    accountName: string;
    debit: number;
    credit: number;
    description: string;
  }[];
  commonError?: string;
  preventionReason?: string;
}

export interface PricingSuggestion extends FinancialDecision {
  type: 'pricing';
  productId: string;
  productName: string;
  currentPrice: number;
  suggestedPrice: number;
  priceChangeReason: 'demand' | 'cost' | 'competition' | 'seasonality' | 'other';
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
  riskFactor: number; // 0-100
  category: 'bad_debts' | 'inventory_obsolescence' | 'warranties' | 'legal_claims' | 'other';
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

export interface UserBehavior {
  userId: string;
  frequentlyAccessedPages: { [page: string]: number };
  importantAccounts: string[];
  criticalThresholds: { [metric: string]: number };
  workingHours: { start: string; end: string; timezone: string };
  interestedInProducts: string[];
  interestedInCustomers: string[];
  notificationPreferences: {
    [key: string]: {
      priority: NotificationPriority;
      channels: NotificationChannel[];
    };
  };
  lastUpdated: Date;
}

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
    analysisPeriod: 'daily' | 'weekly' | 'monthly';
  };
}
