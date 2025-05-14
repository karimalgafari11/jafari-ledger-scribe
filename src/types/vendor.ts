
export interface Vendor {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  accountNumber?: string;
  balance: number;
  currency: string;
  status: string;
  createdAt: string;
  dueDate?: string | null;
  lastTransaction?: string;
  contactPerson?: string;
  taxNumber?: string;
  vatNumber?: string;
  category?: string;
  creditLimit?: number;
}
