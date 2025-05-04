
import { InvoiceItem } from "@/types/invoices";

export const useInvoiceCalculations = () => {
  const calculateTotalAmount = (items: InvoiceItem[], discount?: number, discountType?: 'percentage' | 'fixed'): number => {
    // Calculate subtotal (sum of items before discount and tax)
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    // Calculate total tax
    const totalTax = items.reduce((sum, item) => {
      const itemSubtotal = item.price * item.quantity;
      const itemDiscount = item.discountType === 'percentage' 
        ? itemSubtotal * (item.discount / 100) 
        : item.discount;
      const taxableAmount = itemSubtotal - itemDiscount;
      return sum + (taxableAmount * (item.tax / 100));
    }, 0);
    
    // Calculate invoice discount
    let invoiceDiscount = 0;
    if (discount && discount > 0) {
      invoiceDiscount = discountType === 'percentage' ? subtotal * (discount / 100) : discount;
    }
    
    // Final total
    return Number((subtotal - invoiceDiscount + totalTax).toFixed(2));
  };

  const applyDiscount = (
    invoice: any,
    setInvoice: React.Dispatch<React.SetStateAction<any>>,
    type: 'percentage' | 'fixed', 
    value: number
  ) => {
    setInvoice(prev => ({
      ...prev,
      discount: value,
      discountType: type,
      totalAmount: calculateTotalAmount(prev.items, value, type)
    }));
  };

  const calculateTotals = (invoice: any, setInvoice: React.Dispatch<React.SetStateAction<any>>) => {
    setInvoice(prev => ({
      ...prev,
      totalAmount: calculateTotalAmount(prev.items, prev.discount, prev.discountType)
    }));
  };

  return {
    calculateTotalAmount,
    applyDiscount,
    calculateTotals
  };
};
