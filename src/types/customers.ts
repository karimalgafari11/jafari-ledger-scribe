
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
  taxNumber?: string; // Previous field name used in some files
  vatNumber?: string; // New field name that's being used in components
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
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

export interface CustomerFilters {
  search: string;
  status: string;
  type: string;
  balanceRange: [number, number] | null;
}
