
export interface Customer {
  id: string;
  name: string;
  type: 'individual' | 'company';
  accountNumber?: string;
  phone: string;
  email?: string;
  balance: number;
  creditLimit?: number;
  address?: string;
  contactPerson?: string;
  status: 'active' | 'inactive';
  taxNumber?: string;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Transaction {
  id: string;
  customerId: string;
  date: Date;
  amount: number;
  type: 'invoice' | 'payment' | 'credit' | 'debit';
  reference: string;
  balance: number;
  description?: string;
}
