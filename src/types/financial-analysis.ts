
export interface FinancialMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'neutral';
  percentChange?: number;
  targetValue?: number;
  color?: string;
  category: string;
  period: string;
  description?: string;
}

export interface FinancialRatio {
  id: string;
  name: string;
  value: number;
  industry: number;
  trend: 'up' | 'down' | 'neutral';
  description: string;
  formula: string;
  lastPeriod?: number;
  benchmark?: number;
}

export interface FinancialAnalysis {
  id: string;
  title: string;
  date: Date;
  period: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  metrics: FinancialMetric[];
  ratios: FinancialRatio[];
  insights: string[];
  recommendations: string[];
}

export interface FinancialForecast {
  id: string;
  category: string;
  month: string;
  actualValue?: number;
  predictedValue: number;
  lowerBound?: number;
  upperBound?: number;
  confidence: number;
}

export type AnalysisPeriod = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly' | 'custom';
