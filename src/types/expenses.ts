
export interface ExpenseCategory {
  id: string;
  name: string;
  description: string;
  budgetLimit: number;
  isActive: boolean;
}

export interface Expense {
  id: string;
  date: Date;
  amount: number;
  category: string;
  description: string;
  paymentMethod?: string;
  vendor?: string;
  receiptUrl?: string;
  status?: string;
  tags?: string[];
  approvedBy?: string;
  approvedDate?: Date;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
  attachments?: string[];
}
