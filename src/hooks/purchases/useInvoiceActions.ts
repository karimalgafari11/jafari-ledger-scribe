
import { PurchaseInvoice } from "@/types/purchases";
import { toast } from "sonner";

interface UseInvoiceActionsProps {
  invoice: PurchaseInvoice;
}

export const useInvoiceActions = ({ invoice }: UseInvoiceActionsProps) => {
  
  // Save invoice to database/backend
  const saveInvoice = async () => {
    // Validate invoice
    if (!invoice.vendorId) {
      toast.error("يرجى اختيار المورد أولاً");
      return false;
    }
    
    if (invoice.items.length === 0) {
      toast.error("يرجى إضافة صنف واحد على الأقل");
      return false;
    }
    
    try {
      // In a real app, this would be an API call
      console.log("Saving invoice:", invoice);
      toast.success("تم حفظ الفاتورة بنجاح");
      return true;
    } catch (error) {
      console.error("Error saving invoice:", error);
      toast.error("حدث خطأ أثناء حفظ الفاتورة");
      return false;
    }
  };

  // Print invoice
  const printInvoice = () => {
    window.print();
  };

  // Send invoice via WhatsApp
  const sendViaWhatsApp = () => {
    if (!invoice.vendorName || !invoice.vendorPhone) {
      toast.error("بيانات المورد غير مكتملة");
      return;
    }

    const phoneNumber = invoice.vendorPhone.replace(/[^\d+]/g, '');
    const message = `فاتورة مشتريات رقم: ${invoice.invoiceNumber}\n` +
      `التاريخ: ${invoice.date}\n` +
      `المبلغ الإجمالي: ${invoice.totalAmount} ر.س`;
      
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    toast.success("تم فتح الواتساب لإرسال الفاتورة");
  };

  return {
    saveInvoice,
    printInvoice,
    sendViaWhatsApp
  };
};
