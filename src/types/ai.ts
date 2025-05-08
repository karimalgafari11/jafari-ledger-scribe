
export interface SystemAlert {
  id: string;
  title: string;
  message: string;
  type: "expenses" | "inventory" | "customers" | "invoices" | "budget" | "financial" | "sales";
  severity: "low" | "medium" | "high";
  timestamp: Date;
  read: boolean;
  priority?: "low" | "medium" | "high";
  actionRequired?: boolean;
  actionLink?: string;
  data?: any;
}

export interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface ApiResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

export interface AiAssistantContext {
  lowStockItems: number;
  unpaidInvoices: number;
  pendingExpenses: number;
  pendingApprovals: number;
  recentAlerts: SystemAlert[];
}

export interface DateRange {
  from: Date;
  to?: Date;
}
