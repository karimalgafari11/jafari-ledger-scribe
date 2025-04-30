
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  vatNumber?: string;
  contactPerson?: string;
  type: 'individual' | 'company';
  creditLimit?: number;
  balance: number;
  status: 'active' | 'inactive';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CustomerFilters {
  search: string;
  status: string;
  type: string;
  balanceRange: [number, number] | null;
}
