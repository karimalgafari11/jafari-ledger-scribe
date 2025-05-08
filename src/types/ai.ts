
export interface SystemAlert {
  id: string;
  title: string;
  message: string;
  type: 'financial' | 'inventory' | 'sales' | 'customers' | 'vendors' | 'expenses' | 'invoices' | 'system';
  priority?: 'low' | 'medium' | 'high';
  severity?: 'low' | 'medium' | 'high';
  timestamp: Date;
  read: boolean;
  data?: any;
}

export interface AiSuggestion {
  id: string;
  title: string;
  description: string;
  category: string;
  impact: 'low' | 'medium' | 'high';
  timestamp: Date;
  implemented: boolean;
  dismissed?: boolean;
  details?: string[];
}

export interface AiPerformance {
  score: number;
  insights: string[];
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  recommendations: string[];
}

export interface FinancialDecision {
  id: string;
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  confidence: number;
  category: 'investment' | 'cost-saving' | 'pricing' | 'staffing' | 'inventory' | 'other';
  recommendation: string;
  potentialSavings?: number;
  potentialRevenue?: number;
  riskLevel: 'low' | 'moderate' | 'high';
  timeframe: 'immediate' | 'short-term' | 'long-term';
  implementationSteps?: string[];
  relatedMetrics?: string[];
  alternatives?: {
    title: string;
    description: string;
    pros: string[];
    cons: string[];
  }[];
}

// Add missing interfaces needed by useAiAssistant hook
export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export interface ApiResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
    index: number;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface AiAssistantContext {
  lowStockItems: number;
  unpaidInvoices: number;
  pendingExpenses: number;
  pendingApprovals: number;
  recentAlerts: SystemAlert[];
}
