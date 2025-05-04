
import { PurchaseInvoice } from "@/types/purchases";
import { useState } from "react";

interface UseInvoiceCalculationsProps {
  invoice: PurchaseInvoice;
  setInvoice: React.Dispatch<React.SetStateAction<PurchaseInvoice>>;
}

export const useInvoiceCalculations = ({
  invoice,
  setInvoice
}: UseInvoiceCalculationsProps) => {
  
  // Apply discount
  const applyDiscount = (type: 'percentage' | 'fixed', value: number) => {
    setInvoice(prev => {
      return {
        ...prev,
        discount: value,
        discountType: type,
        totalAmount: calculateTotalAmount(prev.subtotal, value, type, prev.tax, prev.expenses)
      };
    });
  };

  // Apply expenses
  const applyExpenses = (value: number) => {
    setInvoice(prev => {
      return {
        ...prev,
        expenses: value,
        totalAmount: calculateTotalAmount(prev.subtotal, prev.discount, prev.discountType, prev.tax, value)
      };
    });
  };

  // Calculate remaining amount
  const calculateRemaining = () => {
    const amountPaid = invoice.amountPaid || 0;
    return invoice.totalAmount - amountPaid;
  };
  
  // Calculate total amount with discounts, taxes, and expenses
  const calculateTotalAmount = (
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

  return {
    applyDiscount,
    applyExpenses,
    calculateRemaining,
    calculateTotalAmount
  };
};
