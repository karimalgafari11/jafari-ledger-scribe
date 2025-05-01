
import { useState } from 'react';
import { toast } from 'sonner';
import { 
  AccountingRule, 
  ValidationRule, 
  AutomaticEntry, 
  AccountingRuleSettings
} from '@/types/accountingRules';

// إعدادات افتراضية لقوانين المحاسبة
const defaultSettings: AccountingRuleSettings = {
  enforceValidation: true,
  allowBackdatedEntries: false,
  maxEntryAmount: 100000,
  requireApproval: true,
  checkDuplicateEntries: true,
  allowNegativeInventory: false,
};

export const useAccountingRules = () => {
  const [settings, setSettings] = useState<AccountingRuleSettings>(defaultSettings);
  
  // التحقق من صحة القيد المحاسبي
  const validateJournalEntry = (entry: any) => {
    const errors: string[] = [];
    
    // التحقق من توازن القيد
    const totalDebit = entry.lines.reduce((sum: number, line: any) => sum + (line.debit || 0), 0);
    const totalCredit = entry.lines.reduce((sum: number, line: any) => sum + (line.credit || 0), 0);
    
    if (totalDebit !== totalCredit) {
      errors.push('مجموع المدين لا يساوي مجموع الدائن');
    }
    
    // التحقق من وجود وصف
    if (!entry.description || entry.description.trim() === '') {
      errors.push('يجب إدخال وصف للقيد');
    }
    
    // التحقق من حد القيمة القصوى
    if (settings.maxEntryAmount && totalDebit > settings.maxEntryAmount) {
      errors.push(`قيمة القيد تتجاوز الحد الأقصى (${settings.maxEntryAmount})`);
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  };
  
  // إنشاء قيد تلقائي بناءً على نوع الحدث
  const createAutomaticJournalEntry = (eventType: string, data: any) => {
    // في تطبيق حقيقي، سنبحث عن قالب القيد المناسب في قاعدة البيانات
    // ولكننا هنا سنقوم بإنشاء قيد افتراضي للتوضيح
    
    let lines = [];
    let description = '';
    
    switch (eventType) {
      case 'sale_cash':
        description = `قيد مبيعات نقدية - ${data.invoiceNumber || ''}`;
        lines = [
          { accountId: '101', accountName: 'الصندوق', description: 'مبيعات نقدية', debit: data.amount, credit: 0 },
          { accountId: '411', accountName: 'إيرادات المبيعات', description: 'مبيعات نقدية', debit: 0, credit: data.amount }
        ];
        break;
        
      case 'purchase_cash':
        description = `قيد مشتريات نقدية - ${data.invoiceNumber || ''}`;
        lines = [
          { accountId: '511', accountName: 'المشتريات', description: 'مشتريات نقدية', debit: data.amount, credit: 0 },
          { accountId: '101', accountName: 'الصندوق', description: 'مشتريات نقدية', debit: 0, credit: data.amount }
        ];
        break;
        
      default:
        toast.error('نوع الحدث غير معرّف للقيود التلقائية');
        return null;
    }
    
    const entry = {
      entryNumber: `AUTO-${Date.now().toString().substring(5)}`,
      date: new Date().toISOString().split('T')[0],
      description,
      lines: lines.map(line => ({ ...line, id: Math.random().toString(36).substring(2, 9) })),
      totalDebit: data.amount,
      totalCredit: data.amount,
      status: 'draft',
      createdBy: 'النظام',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // التحقق من صحة القيد قبل إرجاعه
    const validation = validateJournalEntry(entry);
    if (!validation.isValid) {
      toast.error(`فشل إنشاء القيد التلقائي: ${validation.errors.join(', ')}`);
      return null;
    }
    
    return entry;
  };
  
  // تحديث إعدادات قوانين المحاسبة
  const updateSettings = (newSettings: Partial<AccountingRuleSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    toast.success('تم تحديث إعدادات قوانين المحاسبة');
  };
  
  return {
    settings,
    updateSettings,
    validateJournalEntry,
    createAutomaticJournalEntry
  };
};
