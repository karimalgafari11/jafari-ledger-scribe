
import { JournalEntry } from "@/types/journal";

export interface ExchangeRateDifference {
  id: string;
  transactionId?: string;
  transactionType?: string;
  sourceCurrencyId: string;
  targetCurrencyId: string;
  originalAmount: number;
  originalRate: number;
  newRate: number;
  differenceAmount: number;
  journalEntryId?: string;
  date: string;
  processed: boolean;
  createdAt: Date;
}

export interface ExchangeRateHistoryEntry {
  id: string;
  sourceCurrencyId: string;
  targetCurrencyId: string;
  rate: number;
  date: string; 
  provider: string;
}

export interface ExchangeRateDashboardData {
  recentChanges: {
    currencyPair: string;
    oldRate: number;
    newRate: number;
    percentageChange: number;
    date: string;
  }[];
  topVolatilePairs: {
    currencyPair: string;
    volatility: number;
  }[];
  unrealizedDifferences: number;
  processedDifferences: number;
  pendingJournalEntries: number;
}

export interface ExchangeRateJournalInfo {
  difference: ExchangeRateDifference;
  generatedEntry: JournalEntry;
  processed: boolean;
}
