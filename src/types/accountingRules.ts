
// نوع إعدادات قوانين المحاسبة
export interface AccountingRuleSettings {
  enforceValidation: boolean;         // إلزام التحقق من توازن القيود
  allowBackdatedEntries: boolean;     // السماح بالقيود بتاريخ سابق
  maxEntryAmount: number;             // الحد الأقصى لمبلغ القيد
  requireApproval: boolean;           // تتطلب القيود موافقة
  checkDuplicateEntries: boolean;     // التحقق من تكرار القيود
  allowNegativeInventory: boolean;    // السماح بمخزون سالب
  inventoryValuationMethod: InventoryValuationMethod; // طريقة تقييم المخزون
  automaticCostCalculation: boolean;  // حساب التكلفة آلياً
  recordInventoryTransactions: boolean; // تسجيل معاملات المخزون تلقائيًا
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

// طرق تقييم المخزون
export enum InventoryValuationMethod {
  FIFO = 'fifo',           // الوارد أولاً صادر أولاً
  LIFO = 'lifo',           // الوارد أخيراً صادر أولاً
  WeightedAverage = 'weighted_average', // المتوسط المرجح
  SpecificIdentification = 'specific_identification' // التحديد المعين
}

// نوع معاملة المخزون المحاسبية
export interface InventoryTransaction {
  id: string;
  date: string;
  type: 'purchase' | 'sale' | 'return' | 'adjustment';
  documentId: string;
  documentType: string;
  productId: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
  journalEntryId?: string;
}

// نوع حركة المخزون المحاسبية
export interface InventoryMovementCost {
  productId: string;
  date: string;
  inQty: number;
  inCost: number;
  outQty: number;
  outCost: number;
  balanceQty: number;
  balanceCost: number;
  method: InventoryValuationMethod;
  documentId: string;
  documentType: string;
}
