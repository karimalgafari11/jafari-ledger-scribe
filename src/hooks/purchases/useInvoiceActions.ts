
import { PurchaseInvoice } from "@/types/purchases";
import { toast } from "sonner";

interface UseInvoiceActionsProps {
  invoice: PurchaseInvoice;
}

export const useInvoiceActions = ({
  invoice
}: UseInvoiceActionsProps) => {
  
  // Save invoice
  const saveInvoice = async () => {
    try {
      // Logic to save invoice to database
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
    if (!invoice.vendorPhone) {
      toast.error("رقم هاتف المورد غير متوفر");
      return;
    }

    const message = `فاتورة شراء رقم: ${invoice.invoiceNumber}\n` +
      `التاريخ: ${invoice.date}\n` +
      `المورد: ${invoice.vendorName}\n` +
      `المبلغ الإجمالي: ${invoice.totalAmount.toFixed(2)} ريال`;
    
    const phoneNumber = invoice.vendorPhone.replace(/[^\d+]/g, '');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    toast.success("تم فتح رابط واتساب");
  };

  return {
    saveInvoice,
    printInvoice,
    sendViaWhatsApp
  };
};
