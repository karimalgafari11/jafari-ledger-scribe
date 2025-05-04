
import { PurchaseInvoice } from "@/types/purchases";
import { calculateTotalAmount } from "./invoiceCalculations";

interface UseInvoiceCalculationsProps {
  invoice: PurchaseInvoice;
  setInvoice: React.Dispatch<React.SetStateAction<PurchaseInvoice>>;
}

export const useInvoiceCalculations = ({
  invoice,
  setInvoice
}: UseInvoiceCalculationsProps) => {
  
  // Apply discount to invoice
  const applyDiscount = (type: 'percentage' | 'fixed', value: number) => {
    setInvoice(prev => ({
      ...prev,
      discount: value,
      discountType: type,
      totalAmount: calculateTotalAmount(prev.subtotal, value, type, prev.tax, prev.expenses)
    }));
  };

  // Apply purchase expenses
  const applyExpenses = (value: number) => {
    setInvoice(prev => ({
      ...prev,
      expenses: value,
      totalAmount: calculateTotalAmount(prev.subtotal, prev.discount, prev.discountType, prev.tax, value)
    }));
  };

  // Calculate remaining amount to be paid
  const calculateRemaining = (): number => {
    const amountPaid = invoice.amountPaid || 0;
    return invoice.totalAmount - amountPaid;
  };

  return {
    applyDiscount,
    applyExpenses,
    calculateRemaining
  };
};
