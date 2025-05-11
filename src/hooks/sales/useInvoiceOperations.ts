
import { useState } from "react";
import { toast } from "sonner";
import { Invoice, InvoiceItem } from "@/types/invoices";
import { supabase } from "@/integrations/supabase/client";

export const useInvoiceOperations = (
  invoice: any,
  setInvoice: React.Dispatch<React.SetStateAction<any>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const saveInvoice = async () => {
    setIsLoading(true);
    try {
      // Save invoice to Supabase
      const { data: savedInvoice, error: invoiceError } = await supabase
        .from('sales_invoices')
        .upsert({
          id: invoice.id,
          invoice_number: invoice.invoiceNumber,
          customer_id: invoice.customerId,
          customer_name: invoice.customerName,
          customer_phone: invoice.customerPhone,
          customer_account_number: invoice.customerAccountNumber,
          date: invoice.date,
          due_date: invoice.dueDate,
          status: invoice.paymentMethod === 'cash' ? "paid" : "pending",
          payment_method: invoice.paymentMethod,
          subtotal: invoice.subtotal || 0,
          discount: invoice.discount || 0,
          discount_type: invoice.discountType,
          tax: invoice.tax || 0,
          total_amount: invoice.totalAmount,
          amount_paid: invoice.amountPaid || 0,
          notes: invoice.notes,
          warehouse_id: invoice.warehouseId,
          warehouse_name: invoice.warehouseName,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();
      
      if (invoiceError) throw invoiceError;
      
      // Save invoice items to Supabase
      const invoiceItems = invoice.items.map((item: InvoiceItem) => ({
        id: item.id,
        invoice_id: invoice.id,
        product_id: item.productId,
        code: item.code,
        name: item.name,
        description: item.description || "",
        quantity: item.quantity,
        price: item.price,
        discount: item.discount,
        discount_type: item.discountType,
        tax: item.tax,
        total: item.total,
        notes: item.notes
      }));

      // First, delete any existing items for this invoice (to handle removed items)
      const { error: deleteError } = await supabase
        .from('sales_invoice_items')
        .delete()
        .eq('invoice_id', invoice.id);

      if (deleteError) throw deleteError;
      
      // Then insert all current items
      if (invoiceItems.length > 0) {
        const { error: itemsError } = await supabase
          .from('sales_invoice_items')
          .insert(invoiceItems);
        
        if (itemsError) throw itemsError;
      }
      
      // Update invoice status
      setInvoice(prev => ({
        ...prev,
        status: prev.paymentMethod === 'cash' ? "paid" : "pending",
        updatedAt: new Date().toISOString()
      }));
      
      setIsLoading(false);
      toast.success("تم حفظ الفاتورة بنجاح");
      return true;
    } catch (error: any) {
      console.error("Error saving invoice:", error);
      setIsLoading(false);
      toast.error(`حدث خطأ أثناء حفظ الفاتورة: ${error.message}`);
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
