
export interface Account {
  id: string;
  name: string;
  number: string;
  type: 'asset' | 'liability' | 'equity' | 'revenue' | 'expense';
  balance: number;
  parentId: string | null;
  level: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AccountFormData {
  name: string;
  number: string;
  type: 'asset' | 'liability' | 'equity' | 'revenue' | 'expense';
  parentId: string | null;
}

export interface AccountNode extends Account {
  children: AccountNode[];
}
