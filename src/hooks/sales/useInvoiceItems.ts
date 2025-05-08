
import { Product } from "@/types/inventory";
import { InvoiceItem } from "@/types/invoices";
import { useInventoryUpdates } from "../useInventoryUpdates";
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
  const { validateInventory } = useInventoryUpdates();

  const addInvoiceItem = async (product: Product, quantity: number = 1): Promise<boolean> => {
    // Create new item
    const newItem: InvoiceItem = {
      id: uuidv4(),
      productId: product.id,
      code: product.code,
      name: product.name,
      description: product.description || "",
      quantity,
      price: product.price,
      discount: 0,
      discountType: 'percentage',
      tax: 15, // Default VAT rate, should come from system settings
      total: product.price * quantity
    };
    
    // Validate inventory availability
    const hasInventory = await validateInventory([newItem]);
    
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
    
    // Return whether inventory was available
    return hasInventory;
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
  };

  return {
    addInvoiceItem,
    updateInvoiceItem,
    removeInvoiceItem
  };
};
