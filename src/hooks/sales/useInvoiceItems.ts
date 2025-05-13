
import { Product } from "@/types/inventory";
import { InvoiceItem } from "@/types/invoices";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';

export const calculateItemTotal = (item: InvoiceItem): number => {
  const subtotal = item.price * item.quantity;
  const discountAmount = item.discountType === 'percentage'
    ? subtotal * (item.discount / 100)
    : item.discount;
  
  const afterDiscount = subtotal - discountAmount;
  const taxAmount = afterDiscount * (item.tax / 100);
  
  return Number((afterDiscount + taxAmount).toFixed(2));
};

export const useInvoiceItems = (
  invoice: any,
  setInvoice: React.Dispatch<React.SetStateAction<any>>,
  calculateTotalAmount: (items: InvoiceItem[], discount?: number, discountType?: 'percentage' | 'fixed') => number
) => {
  const addInvoiceItem = (item: Partial<InvoiceItem>): void => {
    // Create complete item if it's partial
    const newItem: InvoiceItem = {
      id: item.id || uuidv4(),
      productId: item.productId || "",
      code: item.code || "",
      name: item.name || "",
      description: item.description || "",
      quantity: item.quantity || 1,
      price: item.price || 0,
      discount: item.discount || 0,
      discountType: item.discountType || 'percentage',
      tax: item.tax || 15, // Default VAT rate, should come from system settings
      total: item.total || calculateItemTotal({
        ...item,
        id: item.id || "",
        productId: item.productId || "",
        code: item.code || "",
        name: item.name || "",
        quantity: item.quantity || 1,
        price: item.price || 0,
        discount: item.discount || 0,
        discountType: item.discountType || 'percentage',
        tax: item.tax || 15
      } as InvoiceItem)
    };
    
    // Update invoice with new item
    setInvoice(prev => {
      const updatedItems = [...prev.items, newItem];
      return {
        ...prev,
        items: updatedItems,
        subtotal: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        totalAmount: calculateTotalAmount(
          updatedItems, 
          prev.discount, 
          prev.discountType
        )
      };
    });

    // إظهار رسالة نجاح
    toast.success(`تم إضافة ${item.name} إلى الفاتورة`);
  };

  const updateInvoiceItem = (itemId: string, updates: Partial<InvoiceItem>): void => {
    setInvoice(prev => {
      const updatedItems = prev.items.map(item => {
        if (item.id === itemId) {
          const updatedItem = {
            ...item,
            ...updates
          };
          // Recalculate item total
          updatedItem.total = calculateItemTotal(updatedItem);
          return updatedItem;
        }
        return item;
      });

      return {
        ...prev,
        items: updatedItems,
        subtotal: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        totalAmount: calculateTotalAmount(
          updatedItems, 
          prev.discount, 
          prev.discountType
        )
      };
    });

    toast.success("تم تحديث الصنف بنجاح");
  };

  const removeInvoiceItem = (itemId: string): void => {
    setInvoice(prev => {
      const updatedItems = prev.items.filter(item => item.id !== itemId);
      return {
        ...prev,
        items: updatedItems,
        subtotal: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        totalAmount: calculateTotalAmount(
          updatedItems, 
          prev.discount, 
          prev.discountType
        )
      };
    });
    
    toast.success("تم حذف الصنف من الفاتورة");
  };

  return {
    addInvoiceItem,
    updateInvoiceItem,
    removeInvoiceItem
  };
};
