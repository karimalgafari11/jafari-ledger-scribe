
export type JournalStatus = 'draft' | 'approved' | 'canceled';

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
