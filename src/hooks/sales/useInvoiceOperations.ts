
import { useState } from "react";
import { toast } from "sonner";

export const useInvoiceOperations = (
  invoice: any,
  setInvoice: React.Dispatch<React.SetStateAction<any>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const saveInvoice = async () => {
    setIsLoading(true);
    try {
      // Simulate saving the invoice (in a real app, this would save to a database)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update invoice status
      setInvoice(prev => ({
        ...prev,
        status: prev.paymentMethod === 'cash' ? "paid" : "pending",
        updatedAt: new Date().toISOString()
      }));
      
      setIsLoading(false);
      return true;
    } catch (error) {
      setIsLoading(false);
      toast.error("حدث خطأ أثناء حفظ الفاتورة");
      return false;
    }
  };

  return {
    saveInvoice
  };
};
