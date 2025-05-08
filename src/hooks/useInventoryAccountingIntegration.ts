
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { InvoiceItem } from '@/types/invoices';
import { InventoryValuationMethod, InventoryMovementCost } from '@/types/accountingRules';
import { JournalEntry, JournalStatus } from '@/types/journal';
import { v4 as uuidv4 } from 'uuid';

interface InventoryAccountingOptions {
  valuationMethod: InventoryValuationMethod;
  createJournalEntries: boolean;
  documentId?: string;
  documentType?: string;
  warehouseId?: string;
}

export const useInventoryAccountingIntegration = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  
  // محاكاة جلب تكلفة المنتج الحالية
  const fetchCurrentProductCost = async (productId: string): Promise<number> => {
    // في التطبيق الفعلي، سيتم جلب تكلفة المنتج من قاعدة البيانات
    await new Promise(resolve => setTimeout(resolve, 100)); // محاكاة تأخير الشبكة
    return Math.random() * 50 + 50; // تكلفة عشوائية بين 50 و 100
  };
  
  // التحقق من توفر المخزون
  const validateInventoryAvailability = async (
    items: InvoiceItem[],
    allowNegative = false
  ): Promise<boolean> => {
    try {
      setIsProcessing(true);
      
      // في التطبيق الفعلي، سيتم التحقق من توفر المخزون من قاعدة البيانات
      // محاكاة نجاح التحقق
      return true;
    } catch (error) {
      console.error('خطأ في التحقق من توفر المخزون:', error);
      toast.error('حدث خطأ أثناء التحقق من توفر المخزون');
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  // حساب تكلفة المنتج باستخدام طريقة التقييم المحددة
  const calculateProductCost = useCallback(
    async (
      productId: string,
      quantity: number,
      method: InventoryValuationMethod
    ): Promise<{ unitCost: number; totalCost: number }> => {
      try {
        // في التطبيق الفعلي، سيتم استخدام الطريقة المحددة لحساب التكلفة
        const unitCost = await fetchCurrentProductCost(productId);
        
        let calculatedUnitCost = unitCost;
        
        // تطبيق طريقة التقييم المختارة
        switch (method) {
          case InventoryValuationMethod.FIFO:
            // تنفيذ حساب FIFO الفعلي (محاكاة)
            calculatedUnitCost = unitCost * 0.95; // تخفيض بنسبة 5% للتوضيح
            break;
            
          case InventoryValuationMethod.LIFO:
            // تنفيذ حساب LIFO الفعلي (محاكاة)
            calculatedUnitCost = unitCost * 1.05; // زيادة بنسبة 5% للتوضيح
            break;
            
          case InventoryValuationMethod.WeightedAverage:
            // تنفيذ حساب المتوسط المرجح (المحاكاة الافتراضية)
            break;
            
          case InventoryValuationMethod.SpecificIdentification:
            // تنفيذ حساب التحديد المعين
            break;
            
          default:
            // استخدم المتوسط المرجح كطريقة افتراضية
            break;
        }
        
        return {
          unitCost: calculatedUnitCost,
          totalCost: calculatedUnitCost * quantity
        };
      } catch (error) {
        console.error('خطأ في حساب تكلفة المنتج:', error);
        throw new Error('فشل حساب تكلفة المنتج');
      }
    },
    []
  );

  // تحديث تكاليف المخزون عند شراء منتجات جديدة
  const updateInventoryCostsOnPurchase = async (
    items: InvoiceItem[],
    options: InventoryAccountingOptions
  ): Promise<InventoryMovementCost[]> => {
    try {
      setIsProcessing(true);
      
      const movements: InventoryMovementCost[] = [];
      
      for (const item of items) {
        const { unitCost } = await calculateProductCost(
          item.productId,
          item.quantity,
          options.valuationMethod
        );
        
        // إنشاء سجل حركة المخزون
        const movement: InventoryMovementCost = {
          productId: item.productId,
          date: new Date().toISOString(),
          inQty: item.quantity,
          inCost: unitCost * item.quantity,
          outQty: 0,
          outCost: 0,
          balanceQty: item.quantity, // في التطبيق الفعلي، سيتم إضافة الكمية الحالية
          balanceCost: unitCost * item.quantity, // في التطبيق الفعلي، سيتم حساب القيمة الإجمالية
          method: options.valuationMethod,
          documentId: options.documentId || '',
          documentType: options.documentType || 'purchase'
        };
        
        movements.push(movement);
        
        // في التطبيق الفعلي، سيتم حفظ حركة المخزون في قاعدة البيانات
        console.log(`تحديث تكلفة المنتج ${item.name} (${item.productId}) إلى ${unitCost}`);
      }
      
      return movements;
    } catch (error) {
      console.error('خطأ في تحديث تكاليف المخزون:', error);
      throw new Error('فشل تحديث تكاليف المخزون');
    } finally {
      setIsProcessing(false);
    }
  };
  
  // إنشاء قيود محاسبية لعمليات المخزون
  const createInventoryJournalEntries = async (
    items: InvoiceItem[],
    options: InventoryAccountingOptions
  ): Promise<JournalEntry | null> => {
    if (!options.createJournalEntries) {
      return null;
    }
    
    try {
      setIsProcessing(true);
      
      // حساب إجمالي تكلفة المنتجات
      let totalCost = 0;
      
      for (const item of items) {
        const { totalCost: itemTotalCost } = await calculateProductCost(
          item.productId,
          item.quantity,
          options.valuationMethod
        );
        
        totalCost += itemTotalCost;
      }
      
      // إعداد القيد المحاسبي المناسب بناءً على نوع المستند
      let description = '';
      const journalLines = [];
      
      if (options.documentType === 'purchase') {
        description = 'قيد تكلفة مشتريات وتحديث المخزون';
        
        // مدين: حساب المخزون
        journalLines.push({
          id: uuidv4(),
          accountId: '120', // رمز حساب المخزون
          accountName: 'المخزون',
          description: 'تحديث تكلفة المخزون للمشتريات',
          debit: totalCost,
          credit: 0
        });
        
        // دائن: حساب تكلفة المشتريات
        journalLines.push({
          id: uuidv4(),
          accountId: '511', // رمز حساب تكلفة المشتريات
          accountName: 'تكلفة المشتريات',
          description: 'تسجيل تكلفة المشتريات',
          debit: 0,
          credit: totalCost
        });
      } else if (options.documentType === 'sale') {
        description = 'قيد تكلفة المبيعات وتخفيض المخزون';
        
        // مدين: حساب تكلفة المبيعات
        journalLines.push({
          id: uuidv4(),
          accountId: '410', // رمز حساب تكلفة المبيعات
          accountName: 'تكلفة المبيعات',
          description: 'تسجيل تكلفة المبيعات',
          debit: totalCost,
          credit: 0
        });
        
        // دائن: حساب المخزون
        journalLines.push({
          id: uuidv4(),
          accountId: '120', // رمز حساب المخزون
          accountName: 'المخزون',
          description: 'تخفيض المخزون للمبيعات',
          debit: 0,
          credit: totalCost
        });
      }
      
      // إنشاء القيد المحاسبي
      const journalEntry: JournalEntry = {
        id: uuidv4(),
        number: `J-${Math.floor(Math.random() * 10000)}`,
        entryNumber: `J-${Math.floor(Math.random() * 10000)}`,
        date: new Date().toISOString().split('T')[0],
        description,
        lines: journalLines,
        totalDebit: totalCost,
        totalCredit: totalCost,
        status: JournalStatus.Draft,
        createdBy: 'النظام',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      // في التطبيق الفعلي، سيتم حفظ القيد في قاعدة البيانات
      console.log('تم إنشاء قيد محاسبي للمخزون:', journalEntry);
      
      return journalEntry;
    } catch (error) {
      console.error('خطأ في إنشاء القيود المحاسبية:', error);
      toast.error('حدث خطأ أثناء إنشاء القيد المحاسبي');
      return null;
    } finally {
      setIsProcessing(false);
    }
  };
  
  // معالجة فاتورة مبيعات: تحديث المخزون وإنشاء القيود المحاسبية
  const processSalesInvoice = async (
    invoiceItems: InvoiceItem[],
    options: InventoryAccountingOptions
  ) => {
    try {
      setIsProcessing(true);
      
      // 1. التحقق من توفر المخزون
      const isAvailable = await validateInventoryAvailability(
        invoiceItems,
        false // عدم السماح بالمخزون السالب
      );
      
      if (!isAvailable) {
        toast.error('لا يمكن إتمام العملية: كمية المخزون غير كافية');
        return { success: false };
      }
      
      // 2. حساب تكلفة المنتجات المباعة
      const costDetails = [];
      let totalCost = 0;
      
      for (const item of invoiceItems) {
        const cost = await calculateProductCost(
          item.productId,
          item.quantity,
          options.valuationMethod
        );
        
        costDetails.push({
          productId: item.productId,
          name: item.name,
          quantity: item.quantity,
          unitCost: cost.unitCost,
          totalCost: cost.totalCost
        });
        
        totalCost += cost.totalCost;
      }
      
      // 3. إنشاء قيد محاسبي لتكلفة المبيعات إذا كان مطلوبًا
      let journalEntry = null;
      if (options.createJournalEntries) {
        const docOptions = {
          ...options,
          documentType: 'sale'
        };
        
        journalEntry = await createInventoryJournalEntries(invoiceItems, docOptions);
      }
      
      // 4. إرجاع معلومات التكلفة والقيد المحاسبي
      return {
        success: true,
        totalCost,
        costDetails,
        journalEntry
      };
    } catch (error) {
      console.error('خطأ في معالجة فاتورة المبيعات:', error);
      toast.error('حدث خطأ أثناء معالجة فاتورة المبيعات');
      return { success: false };
    } finally {
      setIsProcessing(false);
    }
  };
  
  // معالجة فاتورة مشتريات: تحديث المخزون وإنشاء القيود المحاسبية
  const processPurchaseInvoice = async (
    invoiceItems: InvoiceItem[],
    options: InventoryAccountingOptions
  ) => {
    try {
      setIsProcessing(true);
      
      // 1. تحديث تكاليف المخزون للمنتجات المشتراة
      const movements = await updateInventoryCostsOnPurchase(invoiceItems, options);
      
      // 2. إنشاء قيد محاسبي لتكلفة المشتريات إذا كان مطلوبًا
      let journalEntry = null;
      if (options.createJournalEntries) {
        const docOptions = {
          ...options,
          documentType: 'purchase'
        };
        
        journalEntry = await createInventoryJournalEntries(invoiceItems, docOptions);
      }
      
      return {
        success: true,
        movements,
        journalEntry
      };
    } catch (error) {
      console.error('خطأ في معالجة فاتورة المشتريات:', error);
      toast.error('حدث خطأ أثناء معالجة فاتورة المشتريات');
      return { success: false };
    } finally {
      setIsProcessing(false);
    }
  };

  // استرجاع طريقة تقييم المخزون المستخدمة حاليًا
  const getInventoryValuationMethod = (): InventoryValuationMethod => {
    // في التطبيق الفعلي، سيتم استرجاع هذه القيمة من الإعدادات المخزنة
    return InventoryValuationMethod.WeightedAverage;
  };

  return {
    isProcessing,
    validateInventoryAvailability,
    calculateProductCost,
    updateInventoryCostsOnPurchase,
    createInventoryJournalEntries,
    processSalesInvoice,
    processPurchaseInvoice,
    getInventoryValuationMethod
  };
};
