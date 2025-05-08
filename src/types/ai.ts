
export interface SystemAlert {
  id: string;
  title: string;
  message: string;
  type: "expenses" | "inventory" | "customers" | "invoices" | "budget" | "financial" | "sales";
  severity: "low" | "medium" | "high";
  timestamp: Date;
  read: boolean;
  actionRequired?: boolean;
  actionLink?: string;
}
