
export type RuleSeverity = 'critical' | 'warning' | 'info';

export interface AccountingRule {
  id: string | number;
  name: string;
  description: string;
  category: string;
  isActive: boolean;
}

export interface ValidationRule extends AccountingRule {
  severity: RuleSeverity;
  canOverride: boolean;
}

export interface AutomaticEntryAccount {
  accountId?: string;
  accountName: string;
  type: 'مدين' | 'دائن';
  amount?: number | null;
}

export interface AutomaticEntry extends AccountingRule {
  trigger: string;
  accounts: AutomaticEntryAccount[];
}

export interface AccountingRuleSettings {
  enforceValidation: boolean;
  allowBackdatedEntries: boolean;
  maxEntryAmount: number | null;
  requireApproval: boolean;
  checkDuplicateEntries: boolean;
  allowNegativeInventory: boolean;
}
