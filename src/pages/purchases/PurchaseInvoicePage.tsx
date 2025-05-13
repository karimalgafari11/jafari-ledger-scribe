
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import { PurchaseInvoice } from "@/types/purchases";
import { PurchaseInvoiceForm } from "@/components/purchases/PurchaseInvoiceForm";
import { usePurchaseInvoice } from "@/hooks/purchases/usePurchaseInvoice";

const PurchaseInvoicePage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Use our custom hook to manage invoice state and operations
  const {
    invoice,
    isAddingItem,
    setIsAddingItem,
    editingItemIndex,
    setEditingItemIndex,
    updateField,
    updateDate,
    addItem,
    updateItem,
    removeItem,
    applyDiscount,
    applyExpenses,
    calculateRemaining
  } = usePurchaseInvoice();

  // Handle save action
  const handleSave = () => {
    setIsLoading(true);
    
    // Validate invoice before saving
    if (!invoice.vendorId) {
      toast.error("يرجى اختيار المورد أولاً");
      setIsLoading(false);
      return;
    }
    
    if (invoice.items.length === 0) {
      toast.error("يرجى إضافة صنف واحد على الأقل");
      setIsLoading(false);
      return;
    }
    
    // Simulate saving to database (in a real app, this would be an API call)
    setTimeout(() => {
      console.log("Saving invoice:", invoice);
      toast.success("تم حفظ الفاتورة بنجاح");
      setIsLoading(false);
      navigate("/purchases/invoices");
    }, 1000);
  };

  // Handle print action
  const handlePrint = () => {
    window.print();
  };

  // Handle WhatsApp send action
  const handleWhatsAppSend = () => {
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

  return (
    <div className="container p-6 mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">فاتورة شراء جديدة</h1>
      </div>
      
      <Card className="p-6">
        <PurchaseInvoiceForm
          invoice={invoice}
          onFieldChange={updateField}
          onDateChange={updateDate}
          addItem={addItem}
          updateItem={updateItem}
          removeItem={removeItem}
          applyDiscount={applyDiscount}
          applyExpenses={applyExpenses}
          calculateRemaining={calculateRemaining}
          onSave={handleSave}
          onPrint={handlePrint}
          onWhatsAppSend={handleWhatsAppSend}
          isLoading={isLoading}
          isAddingItem={isAddingItem}
          setIsAddingItem={setIsAddingItem}
          editingItemIndex={editingItemIndex}
          setEditingItemIndex={setEditingItemIndex}
          settings={{
            showVendorDetails: true,
            showItemCodes: true,
            showItemNotes: true,
            showDiscount: true,
            showTax: true,
            showSignature: true
          }}
        />
      </Card>
    </div>
  );
};

export default PurchaseInvoicePage;
