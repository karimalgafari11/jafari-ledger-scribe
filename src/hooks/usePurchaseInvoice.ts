
import { useState } from "react";
import { PurchaseInvoice, PurchaseItem } from "@/types/purchases";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";

export const usePurchaseInvoice = (initialInvoice?: PurchaseInvoice) => {
  // إذا لم يتم توفير فاتورة، إنشاء فاتورة جديدة
  const defaultInvoice: PurchaseInvoice = initialInvoice || {
    id: uuidv4(),
    invoiceNumber: `P-${Math.floor(Math.random() * 10000)}`,
    vendorId: "",
    vendorName: "",
    date: format(new Date(), "yyyy-MM-dd"),
    items: [],
    subtotal: 0,
    totalAmount: 0,
    paymentMethod: "cash",
    status: "draft"
  };

  const [invoice, setInvoice] = useState<PurchaseInvoice>(defaultInvoice);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [editingItemIndex, setEditingItemIndex] = useState<number | null>(null);

  // تحديث حقل من الفاتورة
  const updateField = (field: keyof PurchaseInvoice, value: any) => {
    setInvoice(prev => ({ ...prev, [field]: value }));
  };

  // تحديث تاريخ الفاتورة
  const updateDate = (date: Date | null) => {
    if (date) {
      updateField("date", format(date, "yyyy-MM-dd"));
    }
  };

  // إضافة صنف جديد
  const addItem = (item: Partial<PurchaseItem>) => {
    const newItem = {
      id: uuidv4(),
      productId: item.productId || uuidv4(),
      code: item.code || "",
      name: item.name || "",
      manufacturer: item.manufacturer || "",
      size: item.size || "",
      quantity: item.quantity || 1,
      price: item.price || 0,
      discount: item.discount || 0,
      discountType: item.discountType || "percentage",
      tax: item.tax || 0,
      total: (item.quantity || 1) * (item.price || 0),
      notes: item.notes || ""
    } as PurchaseItem;

    setInvoice(prev => {
      const updatedItems = [...prev.items, newItem];
      const subtotal = calculateSubtotal(updatedItems);
      return {
        ...prev,
        items: updatedItems,
        subtotal,
        totalAmount: calculateTotalAmount(subtotal, prev.discount, prev.discountType, prev.tax, prev.expenses)
      };
    });
    
    setIsAddingItem(false);
    toast.success("تمت إضافة الصنف بنجاح");
  };

  // تحديث صنف
  const updateItem = (index: number, item: Partial<PurchaseItem>) => {
    setInvoice(prev => {
      const updatedItems = [...prev.items];
      updatedItems[index] = {
        ...updatedItems[index],
        ...item,
        total: (item.quantity || updatedItems[index].quantity) * 
               (item.price || updatedItems[index].price)
      };
      
      const subtotal = calculateSubtotal(updatedItems);
      return {
        ...prev,
        items: updatedItems,
        subtotal,
        totalAmount: calculateTotalAmount(subtotal, prev.discount, prev.discountType, prev.tax, prev.expenses)
      };
    });
    
    setEditingItemIndex(null);
    toast.success("تم تحديث الصنف بنجاح");
  };

  // حذف صنف
  const removeItem = (index: number) => {
    setInvoice(prev => {
      const updatedItems = prev.items.filter((_, i) => i !== index);
      const subtotal = calculateSubtotal(updatedItems);
      return {
        ...prev,
        items: updatedItems,
        subtotal,
        totalAmount: calculateTotalAmount(subtotal, prev.discount, prev.discountType, prev.tax, prev.expenses)
      };
    });
    
    toast.success("تم حذف الصنف بنجاح");
  };

  // تطبيق خصم
  const applyDiscount = (type: 'percentage' | 'fixed', value: number) => {
    setInvoice(prev => ({
      ...prev,
      discount: value,
      discountType: type,
      totalAmount: calculateTotalAmount(prev.subtotal, value, type, prev.tax, prev.expenses)
    }));
  };

  // تطبيق مصاريف الشراء
  const applyExpenses = (value: number) => {
    setInvoice(prev => ({
      ...prev,
      expenses: value,
      totalAmount: calculateTotalAmount(prev.subtotal, prev.discount, prev.discountType, prev.tax, value)
    }));
  };

  // حساب المجموع الفرعي
  const calculateSubtotal = (items: PurchaseItem[]): number => {
    return items.reduce((sum, item) => sum + item.total, 0);
  };

  // حساب المجموع الكلي
  const calculateTotalAmount = (
    subtotal: number, 
    discount?: number, 
    discountType?: 'percentage' | 'fixed',
    tax?: number,
    expenses?: number
  ): number => {
    let total = subtotal;
    
    // تطبيق الخصم
    if (discount && discount > 0) {
      if (discountType === 'percentage') {
        total -= (subtotal * (discount / 100));
      } else {
        total -= discount;
      }
    }
    
    // تطبيق الضريبة
    if (tax && tax > 0) {
      total += (total * (tax / 100));
    }
    
    // إضافة مصاريف الشراء
    if (expenses && expenses > 0) {
      total += expenses;
    }
    
    return total;
  };

  // حساب المبلغ المتبقي
  const calculateRemaining = (): number => {
    const amountPaid = invoice.amountPaid || 0;
    return invoice.totalAmount - amountPaid;
  };

  // حفظ الفاتورة
  const saveInvoice = async () => {
    try {
      // هنا يمكن إضافة منطق لحفظ الفاتورة في قاعدة البيانات
      console.log("Saving invoice:", invoice);
      toast.success("تم حفظ الفاتورة بنجاح");
      return true;
    } catch (error) {
      console.error("Error saving invoice:", error);
      toast.error("حدث خطأ أثناء حفظ الفاتورة");
      return false;
    }
  };

  // طباعة الفاتورة
  const printInvoice = () => {
    window.print();
  };

  // إرسال الفاتورة عبر الواتساب
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
    calculateRemaining,
    saveInvoice,
    printInvoice,
    sendViaWhatsApp
  };
};
