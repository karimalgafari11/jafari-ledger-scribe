
import { useState } from "react";
import { toast } from "sonner";
import { Invoice } from "@/types/invoices";

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

  const convertQuoteToInvoice = async (quoteId: string, quote: any): Promise<Invoice> => {
    setIsLoading(true);
    try {
      // In a real app, this would fetch the quote details from an API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Create a new invoice based on the quote
      setInvoice(prev => ({
        ...prev,
        customerId: quote.customerId,
        customerName: quote.customerName,
        customerPhone: quote.customerPhone,
        notes: `تم إنشاؤها من عرض السعر رقم ${quote.quoteNumber}. ${quote.notes || ''}`,
        // Transfer any other relevant fields from quote to invoice
      }));
      
      setIsLoading(false);
      return invoice;
    } catch (error) {
      setIsLoading(false);
      toast.error("حدث خطأ أثناء تحويل عرض السعر إلى فاتورة");
      throw error;
    }
  };

  const generatePrintableInvoice = (templateId?: string) => {
    // In a real app, this would generate a printable version of the invoice
    // based on the selected template
    return {
      ...invoice,
      printedAt: new Date().toISOString(),
      templateId: templateId || 'default'
    };
  };

  return {
    saveInvoice,
    convertQuoteToInvoice,
    generatePrintableInvoice
  };
};
