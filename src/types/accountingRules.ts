
// نوع إعدادات قوانين المحاسبة
export interface AccountingRuleSettings {
  enforceValidation: boolean;         // إلزام التحقق من توازن القيود
  allowBackdatedEntries: boolean;     // السماح بالقيود بتاريخ سابق
  maxEntryAmount: number;             // الحد الأقصى لمبلغ القيد
  requireApproval: boolean;           // تتطلب القيود موافقة
  checkDuplicateEntries: boolean;     // التحقق من تكرار القيود
  allowNegativeInventory: boolean;    // السماح بمخزون سالب
}

// نوع قانون المحاسبة
export interface AccountingRule {
  id: string;
  name: string;
  description?: string;
  validationRules?: ValidationRule[];
  automaticEntries?: AutomaticEntry[];
  isActive: boolean;
}

// نوع قاعدة التحقق
export interface ValidationRule {
  id: string;
  ruleType: 'balance_check' | 'duplicate_check' | 'limit_check' | 'date_check' | 'custom';
  description: string;
  parameters?: Record<string, any>;
  errorMessage: string;
  isActive: boolean;
}

// نوع القيد التلقائي
export interface AutomaticEntry {
  id: string;
  name: string;
  triggerEvent: string;
  description?: string;
  accountEntries: AccountEntry[];
  isActive: boolean;
}

// نوع إدخال الحساب
export interface AccountEntry {
  accountId: string;
  accountName: string;
  isDebit: boolean;
  amount?: number;
  amountType: 'fixed' | 'percentage' | 'calculated';
  amountSource?: string;
  description?: string;
}
