
export interface Expense {
  id: string;
  date: Date;
  category: string;
  amount: number;
  description: string;
  paymentMethod: 'cash' | 'credit' | 'bank';
  status: 'pending' | 'approved' | 'rejected';
  attachments?: string[];
  notes?: string;
}

export interface ExpenseCategory {
  id: string;
  name: string;
  description?: string;
  budgetLimit?: number;
  isActive: boolean;
}
