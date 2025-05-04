
import { InvoiceItem } from "@/types/invoices";
import { v4 as uuid } from "uuid";

export const useInvoiceItems = (
  invoice: any, 
  setInvoice: React.Dispatch<React.SetStateAction<any>>,
  calculateTotalAmount: (items: InvoiceItem[], discount?: number, discountType?: 'percentage' | 'fixed') => number
) => {
  const addInvoiceItem = (item: Partial<InvoiceItem>) => {
    const newItem: InvoiceItem = {
      id: uuid(),
      productId: item.productId || "",
      code: item.code || "",
      name: item.name || "",
      description: item.description || "",
      quantity: item.quantity || 0,
      price: item.price || 0,
      discount: item.discount || 0,
      discountType: item.discountType || "percentage",
      tax: item.tax || 0,
      total: calculateItemTotal(item.quantity || 0, item.price || 0, item.discount || 0, item.discountType || "percentage", item.tax || 0),
      notes: item.notes || ""
    };

    setInvoice(prev => {
      const updatedItems = [...prev.items, newItem];
      return {
        ...prev,
        items: updatedItems,
        totalAmount: calculateTotalAmount(updatedItems, prev.discount, prev.discountType)
      };
    });
  };

  const updateInvoiceItem = (index: number, updates: Partial<InvoiceItem>) => {
    setInvoice(prev => {
      const updatedItems = [...prev.items];
      updatedItems[index] = { 
        ...updatedItems[index], 
        ...updates,
        total: calculateItemTotal(
          updates.quantity !== undefined ? updates.quantity : updatedItems[index].quantity,
          updates.price !== undefined ? updates.price : updatedItems[index].price,
          updates.discount !== undefined ? updates.discount : updatedItems[index].discount,
          updates.discountType !== undefined ? updates.discountType : updatedItems[index].discountType,
          updates.tax !== undefined ? updates.tax : updatedItems[index].tax
        )
      };
      return {
        ...prev,
        items: updatedItems,
        totalAmount: calculateTotalAmount(updatedItems, prev.discount, prev.discountType)
      };
    });
  };

  const removeInvoiceItem = (index: number) => {
    setInvoice(prev => {
      const updatedItems = prev.items.filter((_, i) => i !== index);
      return {
        ...prev,
        items: updatedItems,
        totalAmount: calculateTotalAmount(updatedItems, prev.discount, prev.discountType)
      };
    });
  };

  return {
    addInvoiceItem,
    updateInvoiceItem,
    removeInvoiceItem
  };
};

// Helper function for calculating item totals
export const calculateItemTotal = (
  quantity: number, 
  price: number, 
  discount: number, 
  discountType: 'percentage' | 'fixed', 
  tax: number
): number => {
  const subtotal = quantity * price;
  const discountAmount = discountType === 'percentage' ? (subtotal * discount / 100) : discount;
  const afterDiscount = subtotal - discountAmount;
  const taxAmount = afterDiscount * (tax / 100);
  return Number((afterDiscount + taxAmount).toFixed(2));
};
