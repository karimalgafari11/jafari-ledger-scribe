
import { useState } from "react";
import { InvoiceItem } from "@/types/invoices";
import { Product } from "@/types/inventory";
import { toast } from "sonner";
import { useInventoryAccountingIntegration } from "./useInventoryAccountingIntegration";
import { InventoryValuationMethod } from "@/types/accountingRules";

interface InventoryUpdateOptions {
  allowNegativeInventory?: boolean;
  createMovementRecords?: boolean;
  warehouseId?: string;
  documentId?: string;
  documentType?: 'invoice' | 'purchase' | 'return' | 'transfer';
  createAccountingEntries?: boolean;
}

interface InventoryUpdateItem {
  productId: string;
  quantity: number;
  direction: 'increase' | 'decrease';
  success: boolean;
  message?: string;
  cost?: number;
  journalEntryId?: string;
}

interface UseInventoryUpdatesReturn {
  validateInventory: (items: InvoiceItem[]) => Promise<boolean>;
  updateInventory: (items: InvoiceItem[], type: 'increase' | 'decrease', options?: InventoryUpdateOptions) => Promise<InventoryUpdateItem[]>;
  insufficientItems: InvoiceItem[];
  isValidating: boolean;
  isUpdating: boolean;
}

export const useInventoryUpdates = (): UseInventoryUpdatesReturn => {
  const [insufficientItems, setInsufficientItems] = useState<InvoiceItem[]>([]);
  const [isValidating, setIsValidating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  
  const {
    validateInventoryAvailability,
    calculateProductCost,
    processSalesInvoice,
    processPurchaseInvoice,
    getInventoryValuationMethod
  } = useInventoryAccountingIntegration();

  // Simulate fetching a product from inventory
  const getProductFromInventory = async (productId: string): Promise<Product | null> => {
    // In a real app, this would make an API call to get the current product data
    // For now, we'll simulate with mock data
    await new Promise(resolve => setTimeout(resolve, 100)); // Simulate API delay
    
    // Mock product data - in a real app, this would come from your API
    const mockProduct: Product = {
      id: productId,
      name: "Mock Product",
      code: "MP001",
      price: 100,
      quantity: 10, // For demonstration, assuming we have 10 in stock
      isActive: true,
      reorderLevel: 5
    };
    
    return mockProduct;
  };

  // Validate if inventory has sufficient quantities for all invoice items
  const validateInventory = async (items: InvoiceItem[]): Promise<boolean> => {
    setIsValidating(true);
    try {
      // استخدام الدالة الجديدة للتحقق من توفر المخزون
      const isValid = await validateInventoryAvailability(items, false);
      
      if (!isValid) {
        setInsufficientItems(items.filter(item => {
          // في التطبيق الفعلي، سنحدد العناصر التي لا تتوفر بكميات كافية
          return false; // للتبسيط نفترض أن جميع العناصر متوفرة
        }));
        return false;
      }
      
      setInsufficientItems([]);
      return true;
    } finally {
      setIsValidating(false);
    }
  };

  // Update inventory quantities based on invoice items
  const updateInventory = async (
    items: InvoiceItem[], 
    type: 'increase' | 'decrease',
    options: InventoryUpdateOptions = {}
  ): Promise<InventoryUpdateItem[]> => {
    setIsUpdating(true);
    const results: InventoryUpdateItem[] = [];
    
    try {
      // الحصول على طريقة تقييم المخزون المستخدمة حاليًا
      const valuationMethod = getInventoryValuationMethod();
      
      // تحضير خيارات المعالجة
      const processingOptions = {
        valuationMethod: valuationMethod,
        createJournalEntries: options.createAccountingEntries || false,
        documentId: options.documentId || `DOC-${Date.now()}`,
        documentType: options.documentType || (type === 'increase' ? 'purchase' : 'invoice'),
        warehouseId: options.warehouseId
      };
      
      if (type === 'decrease') {
        // معالجة فاتورة مبيعات (تخفيض المخزون)
        const saleResult = await processSalesInvoice(items, processingOptions);
        
        if (saleResult.success) {
          // إنشاء نتائج التحديث
          results.push(...items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            direction: 'decrease' as const,
            success: true,
            cost: saleResult.costDetails?.find(d => d.productId === item.productId)?.totalCost || 0,
            journalEntryId: saleResult.journalEntry?.id
          })));
        } else {
          throw new Error("فشل في معالجة تخفيض المخزون");
        }
      } else {
        // معالجة فاتورة مشتريات (زيادة المخزون)
        const purchaseResult = await processPurchaseInvoice(items, processingOptions);
        
        if (purchaseResult.success) {
          // إنشاء نتائج التحديث
          results.push(...items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            direction: 'increase' as const,
            success: true,
            journalEntryId: purchaseResult.journalEntry?.id
          })));
        } else {
          throw new Error("فشل في معالجة زيادة المخزون");
        }
      }
      
      // تسجيل حركة المخزون إذا كان مطلوبًا
      if (options.createMovementRecords) {
        console.log(`إنشاء حركة مخزون: ${type} ${options.documentType || 'unknown'} ${options.documentId || 'unknown'}`);
        // في التطبيق الفعلي، سيتم إنشاء سجلات حركة المخزون
      }
      
      return results;
    } catch (error) {
      console.error("خطأ في تحديث المخزون:", error);
      toast.error("حدث خطأ أثناء تحديث المخزون");
      return results;
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    validateInventory,
    updateInventory,
    insufficientItems,
    isValidating,
    isUpdating
  };
};
