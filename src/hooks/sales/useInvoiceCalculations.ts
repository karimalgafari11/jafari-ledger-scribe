
import { InvoiceItem } from "@/types/invoices";
import { ErrorTracker } from "@/utils/errorTracker";

/**
 * Hook for invoice calculations
 * Provides functions for calculating totals, discounts, and taxes
 */
export const useInvoiceCalculations = () => {
  /**
   * Calculate total amount for all invoice items
   * @param items Array of invoice items
   * @param discount Optional discount to apply to the total
   * @param discountType Optional discount type ('percentage' or 'fixed')
   * @returns Calculated total amount
   */
  const calculateTotalAmount = (
    items: InvoiceItem[],
    discount?: number,
    discountType?: 'percentage' | 'fixed'
  ): number => {
    try {
      // Calculate subtotal from all items
      const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      // Calculate discount amount
      let discountAmount = 0;
      if (discount) {
        if (discountType === 'percentage') {
          discountAmount = subtotal * (discount / 100);
        } else {
          discountAmount = discount;
        }
      }
      
      // Calculate tax on each item
      const totalTax = items.reduce((sum, item) => {
        const itemSubtotal = item.price * item.quantity;
        
        // Apply item-level discount
        const itemDiscountAmount = item.discountType === 'percentage'
          ? itemSubtotal * (item.discount / 100)
          : item.discount;
          
        const afterItemDiscount = itemSubtotal - itemDiscountAmount;
        const itemTax = afterItemDiscount * (item.tax / 100);
        
        return sum + itemTax;
      }, 0);
      
      // Calculate final amount
      const afterDiscount = subtotal - discountAmount;
      const totalAmount = afterDiscount + totalTax;
      
      return Number(totalAmount.toFixed(2));
    } catch (error) {
      ErrorTracker.error('Error calculating total amount', {
        component: 'useInvoiceCalculations',
        additionalInfo: { items, discount, discountType, error }
      });
      return 0;
    }
  };

  /**
   * Apply discount to an invoice
   * @param invoice Current invoice object
   * @param setInvoice Function to update invoice state
   * @param type Discount type ('percentage' or 'fixed')
   * @param value Discount value
   */
  const applyDiscount = (
    invoice: any,
    setInvoice: React.Dispatch<React.SetStateAction<any>>,
    type: 'percentage' | 'fixed',
    value: number
  ): void => {
    try {
      setInvoice(prev => {
        const discountValue = Math.max(0, value); // Ensure non-negative discount
        return {
          ...prev,
          discount: discountValue,
          discountType: type,
          totalAmount: calculateTotalAmount(prev.items, discountValue, type)
        };
      });
    } catch (error) {
      ErrorTracker.error('Error applying discount', {
        component: 'useInvoiceCalculations',
        additionalInfo: { type, value, error }
      });
    }
  };

  /**
   * Calculate and update all invoice totals
   * @param invoice Current invoice object
   * @param setInvoice Function to update invoice state
   */
  const calculateTotals = (
    invoice: any,
    setInvoice: React.Dispatch<React.SetStateAction<any>>
  ): void => {
    try {
      setInvoice(prev => {
        const subtotal = prev.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const totalAmount = calculateTotalAmount(prev.items, prev.discount, prev.discountType);
        
        return {
          ...prev,
          subtotal,
          totalAmount
        };
      });
    } catch (error) {
      ErrorTracker.error('Error calculating invoice totals', {
        component: 'useInvoiceCalculations',
        additionalInfo: { error }
      });
    }
  };

  return {
    calculateTotalAmount,
    applyDiscount,
    calculateTotals
  };
};
