
export interface SystemAlert {
  id: string;
  title: string;
  message: string;
  type: "inventory" | "invoices" | "expenses" | "customers" | "system";
  priority: "high" | "medium" | "low";
  severity: "high" | "medium" | "low";
  timestamp: Date;
  read: boolean;
  data?: any;
}

export interface AiAssistantContext {
  lowStockItems: number;
  unpaidInvoices: number;
  pendingExpenses: number;
  pendingApprovals: number;
  recentAlerts: SystemAlert[];
}

export interface AiAnalyticsSettings {
  enabled: boolean;
  refreshRate: number;
  detailLevel: "basic" | "detailed" | "comprehensive";
  autoShare: boolean;
}

export interface AiInsight {
  id: string;
  title: string;
  description: string;
  category: "financial" | "operational" | "customer" | "inventory";
  impact: "positive" | "negative" | "neutral";
  severity: "high" | "medium" | "low";
  createdAt: Date;
  read: boolean;
  source: string;
  relatedEntities?: string[];
  recommendations?: string[];
}

export interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

