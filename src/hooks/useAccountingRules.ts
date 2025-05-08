
import { useState } from 'react';
import { toast } from 'sonner';
import { 
  AccountingRule, 
  ValidationRule, 
  AutomaticEntry, 
  AccountingRuleSettings
} from '@/types/accountingRules';
import { v4 as uuidv4 } from 'uuid';

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
        
      case 'payment_receipt':
        description = `قيد تحصيل دفعة من العميل ${data.customerName} - ${data.reference || ''}`;
        
        // تحديد حساب التحصيل بناءً على طريقة الدفع
        let receiptAccountId = '101'; // الصندوق (افتراضي)
        let receiptAccountName = 'الصندوق';
        
        if (data.paymentMethod === 'bank') {
          receiptAccountId = '102';
          receiptAccountName = 'البنك';
        } else if (data.paymentMethod === 'check') {
          receiptAccountId = '103';
          receiptAccountName = 'شيكات تحت التحصيل';
        } else if (data.paymentMethod === 'card') {
          receiptAccountId = '104';
          receiptAccountName = 'بطاقات ائتمان';
        }
        
        // إنشاء القيد المحاسبي
        lines = [
          { accountId: receiptAccountId, accountName: receiptAccountName, description: `تحصيل من العميل ${data.customerName}`, debit: data.amount, credit: 0 },
          { accountId: '131', accountName: 'مدينون / عملاء', description: `تحصيل من العميل ${data.customerName}`, debit: 0, credit: data.amount }
        ];
        
        // إضافة تفاصيل الفاتورة إذا كانت متاحة
        if (data.invoiceNumber) {
          description += ` - الفاتورة ${data.invoiceNumber}`;
          lines[1].description += ` - الفاتورة ${data.invoiceNumber}`;
        }
        break;
      
      case 'vendor_payment':
        description = `قيد دفع مستحقات للمورد ${data.vendorName} - ${data.reference || ''}`;
        
        // تحديد حساب الدفع بناءً على طريقة الدفع
        let paymentAccountId = '101'; // الصندوق (افتراضي)
        let paymentAccountName = 'الصندوق';
        
        if (data.paymentMethod === 'bank') {
          paymentAccountId = '102';
          paymentAccountName = 'البنك';
        } else if (data.paymentMethod === 'check') {
          paymentAccountId = '103';
          paymentAccountName = 'شيكات صادرة';
        }
        
        // إنشاء القيد المحاسبي
        lines = [
          { accountId: '231', accountName: 'دائنون / موردين', description: `دفع مستحقات للمورد ${data.vendorName}`, debit: data.amount, credit: 0 },
          { accountId: paymentAccountId, accountName: paymentAccountName, description: `دفع مستحقات للمورد ${data.vendorName}`, debit: 0, credit: data.amount }
        ];
        
        // إضافة تفاصيل الفاتورة إذا كانت متاحة
        if (data.invoiceNumber) {
          description += ` - الفاتورة ${data.invoiceNumber}`;
          lines[0].description += ` - الفاتورة ${data.invoiceNumber}`;
        }
        break;
        
      default:
        toast.error('نوع الحدث غير معرّف للقيود التلقائية');
        return null;
    }
    
    const entry = {
      id: uuidv4(),
      entryNumber: `AUTO-${Date.now().toString().substring(5)}`,
      number: `AUTO-${Date.now().toString().substring(5)}`, // Adding number field to meet the JournalEntry interface
      date: new Date().toISOString().split('T')[0],
      description,
      lines: lines.map(line => ({ ...line, id: uuidv4() })),
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
