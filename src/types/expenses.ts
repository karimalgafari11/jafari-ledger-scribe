export interface Expense {
  id: string;
  date: Date;
  category: string;
  description: string;
  amount: number;
  paymentMethod: 'cash' | 'credit' | 'bank';
  status?: 'pending' | 'approved' | 'rejected';
  attachments?: string[];
  reference?: string;
  notes?: string;
  vendor?: string;
  vendorId?: string;
}

export interface ExpenseCategory {
  id: string;
  name: string;
  description?: string;
  budgetLimit?: number;
  isActive: boolean;
}

export interface SalesReport {
  totalSales: number;
  transactions: number;
  averageOrder: number;
  netProfit: number;
  change: number;
  transactionChange: number;
  averageOrderChange: number;
  profitChange: number;
}

export interface SalesByDate {
  invoiceNumber: string;
  date: string;
  customer: string;
  amount: number;
  paymentMethod: string;
  status: 'paid' | 'pending' | 'overdue';
}

export interface ProductSalesData {
  id: number;
  name: string;
  quantity: number;
  sales: number;
  percentage: number;
}

export interface CustomerSalesData {
  id: number;
  name: string;
  transactions: number;
  sales: number;
  percentage: number;
}
