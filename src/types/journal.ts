
// Define JournalStatus as enum to be used both as type and value
export enum JournalStatus {
  Draft = 'draft',
  Approved = 'approved',
  Canceled = 'canceled',
  Pending = 'pending'
}

export interface JournalEntryLine {
  id: string;
  accountId: string;
  accountName: string;
  description: string;
  debit: number;
  credit: number;
}

export interface JournalEntry {
  id: string;
  number: string; // Added this property since it's referenced in code
  entryNumber: string;
  date: string;
  description: string;
  lines: JournalEntryLine[];
  totalDebit: number;
  totalCredit: number;
  status: JournalStatus;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface JournalFormData {
  entryNumber: string;
  date: string;
  description: string;
  lines: Omit<JournalEntryLine, "id">[];
  status: JournalStatus;
}
