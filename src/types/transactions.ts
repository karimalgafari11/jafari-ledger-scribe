
export interface Transaction {
  id: string;
  date: Date;
  type: 'invoice' | 'payment' | 'return';
  reference: string;
  description: string;
  debit: number;
  credit: number;
  balance: number;
}
