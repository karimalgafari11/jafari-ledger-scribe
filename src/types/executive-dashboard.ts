
import { SystemAlert } from './ai';
import { Project } from './project-management';
import { FinancialMetric, FinancialRatio } from './financial-analysis';

export interface KpiCard {
  id: string;
  title: string;
  value: string | number;
  previousValue?: string | number;
  percentChange?: number;
  status: 'up' | 'down' | 'neutral';
  icon?: string;
  description?: string;
  trend?: number[];
  color?: string;
}

export interface ExecutiveSummary {
  financialHealth: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
  topMetrics: FinancialMetric[];
  keyInsights: string[];
  recommendations: string[];
  risks: string[];
  opportunities: string[];
}

export interface ExecutiveFilter {
  dateRange: { from: Date; to: Date };
  department?: string;
  businessUnit?: string;
  productLines?: string[];
  regions?: string[];
  compareWith?: 'previousPeriod' | 'previousYear' | 'budget' | 'forecast';
}

export interface DashboardConfig {
  id: string;
  userId: string;
  name: string;
  layout: DashboardLayoutItem[];
  isDefault: boolean;
  dateRange: { from: Date; to: Date };
  filters: Record<string, any>;
  lastModified: Date;
}

export interface DashboardLayoutItem {
  id: string;
  type: 'kpi' | 'chart' | 'table' | 'alert' | 'project' | 'custom';
  title: string;
  size: 'small' | 'medium' | 'large' | 'full';
  position: { x: number; y: number };
  config: Record<string, any>;
  dataSource: string;
}
