
import { useInvoiceState } from './useInvoiceState';
import { useInvoiceItems, calculateItemTotal } from './useInvoiceItems';
import { useInvoiceCalculations } from './useInvoiceCalculations';
import { useInvoiceOperations } from './useInvoiceOperations';
import { useDiscounts } from "@/hooks/useDiscounts";

export const useSalesInvoice = () => {
  const { calculateDiscount } = useDiscounts();
  
  const {
    invoice,
    setInvoice,
    isLoading,
    setIsLoading,
    createNewInvoice,
    updateInvoiceField
  } = useInvoiceState();

  const {
    calculateTotalAmount,
    applyDiscount: applyDiscountCalc,
    calculateTotals: calculateTotalsInternal
  } = useInvoiceCalculations();

  const {
    addInvoiceItem,
    updateInvoiceItem,
    removeInvoiceItem
  } = useInvoiceItems(invoice, setInvoice, calculateTotalAmount);

  const {
    saveInvoice
  } = useInvoiceOperations(invoice, setInvoice, setIsLoading);

  // Create wrapper functions to avoid passing too many params
  const applyDiscount = (type: 'percentage' | 'fixed', value: number) => {
    applyDiscountCalc(invoice, setInvoice, type, value);
  };

  const calculateTotals = () => {
    calculateTotalsInternal(invoice, setInvoice);
  };

  return {
    invoice,
    isLoading,
    createNewInvoice,
    updateInvoiceField,
    addInvoiceItem,
    updateInvoiceItem,
    removeInvoiceItem,
    applyDiscount,
    calculateTotals,
    saveInvoice
  };
};
