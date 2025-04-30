
export interface AccountingSettings {
  id: string;
  fiscalYearStart: Date;
  fiscalYearEnd: Date;
  defaultCurrency: string;
  autoGenerateEntries: boolean;
  journalNamingFormat: string;
  allowBackdatedEntries: boolean;
  requireApproval: boolean;
  defaultApprover: string;
  autoCloseAccounts: boolean;
  retainDataYears: number;
  taxSettings: TaxSettings;
  closingMethods: ClosingMethod[];
}

export interface TaxSettings {
  enableTax: boolean;
  defaultTaxRate: number;
  taxNumber: string;
  taxAuthority: string;
}

export interface ClosingMethod {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
}

export type SettingsTabType = 'general' | 'tax' | 'closing' | 'automation';
