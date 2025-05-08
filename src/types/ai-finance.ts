
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

export type FinancialDecisionStatus = 'suggested' | 'accepted' | 'rejected' | 'implemented';

// Base interface for all financial decisions
export interface FinancialDecision {
  id: string;
  title: string;
  description: string;
  impact: number; // نوع رقم بسيط للمقارنة
  confidence: number;
  suggestedActions: string[];
  createdAt: string; // نوع نصي بدلاً من Date
  status: FinancialDecisionStatus;
  type: 'journal_entry' | 'pricing' | 'provision' | 'variance'; // إضافة خاصية النوع
  implementedAt?: string; // تاريخ التنفيذ
  category?: string; // تصنيف القرار (اختياري)
  priority?: 'high' | 'medium' | 'low'; // أولوية القرار (اختياري)
  relatedEntityId?: string; // معرف الكيان المرتبط (مثل رقم المنتج) (اختياري)
  aiConfidenceReason?: string; // سبب مستوى الثقة من الذكاء الاصطناعي (اختياري)
  tags?: string[]; // علامات إضافية للتصنيف (اختياري)
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
  affectedStatements?: ('balance_sheet' | 'income_statement' | 'cash_flow')[]; // البيانات المالية المتأثرة
  dateRange?: { start: string; end: string }; // نطاق التاريخ للقيد
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
  marketResearch?: string; // بيانات بحث السوق
  seasonalAdjustment?: number; // تعديل موسمي
  priceTrend?: 'increasing' | 'decreasing' | 'stable'; // اتجاه السعر في السوق
}

export interface ProvisionSuggestion extends FinancialDecision {
  type: 'provision';
  accountId: string;
  accountName: string;
  currentAmount: number;
  suggestedAmount: number;
  riskFactor: number;
  category: 'bad_debts' | 'inventory' | 'legal' | 'other';
  calculationMethod?: string; // طريقة احتساب المخصص
  historicalData?: { period: string; amount: number }[]; // بيانات تاريخية
  comparisonMetric?: number; // مؤشر المقارنة بمعيار القطاع
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
  period?: string; // الفترة التي تم تحليل الفروقات لها
  trend?: { period: string; variance: number }[]; // اتجاه الفروقات
  rootCauseAnalysis?: string[]; // تحليل الأسباب الجذرية
  correctionPlan?: string; // خطة التصحيح المقترحة
}

// معلومات المراجعة المالية الذكية
export interface AIFinancialReview {
  id: string;
  createdAt: string;
  period: {
    start: string;
    end: string;
  };
  summary: string;
  keyMetrics: {
    profitability: number;
    liquidity: number;
    efficiency: number;
    stability: number;
    growth: number;
  };
  findings: {
    category: string;
    description: string;
    impact: 'positive' | 'negative' | 'neutral';
    severity: 'high' | 'medium' | 'low';
  }[];
  recommendations: {
    category: string;
    description: string;
    expectedImpact: string;
    difficulty: 'easy' | 'moderate' | 'complex';
    priority: 'high' | 'medium' | 'low';
  }[];
}
