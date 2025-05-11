
export interface Transaction {
  id: string;
  date: Date;
  type: 'invoice' | 'payment' | 'return';
  reference: string;
  description: string;
  debit: number;
  credit: number;
  balance: number;
  attachments?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string;
}

export interface TransactionFilter {
  accountId?: string;
  dateFrom?: Date;
  dateTo?: Date;
  type?: 'invoice' | 'payment' | 'return';
  minAmount?: number;
  maxAmount?: number;
  searchTerm?: string;
}

export interface AccountTransaction extends Transaction {
  accountId: string;
  accountName: string;
  opposingAccountId?: string;
  opposingAccountName?: string;
}
