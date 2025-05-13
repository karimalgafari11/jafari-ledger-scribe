
import { PurchaseItem } from "@/types/purchases";

export const calculateSubtotal = (items: PurchaseItem[]): number => {
  return items.reduce((sum, item) => sum + item.total, 0);
};

export const calculateTotalAmount = (
  subtotal: number, 
  discount?: number, 
  discountType?: 'percentage' | 'fixed',
  tax?: number,
  expenses?: number
): number => {
  let total = subtotal;
  
  // Apply discount
  if (discount && discount > 0) {
    if (discountType === 'percentage') {
      total -= (subtotal * (discount / 100));
    } else {
      total -= discount;
    }
  }
  
  // Apply tax
  if (tax && tax > 0) {
    total += (total * (tax / 100));
  }
  
  // Add expenses
  if (expenses && expenses > 0) {
    total += expenses;
  }
  
  return total;
};
