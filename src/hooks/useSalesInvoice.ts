
import { useState } from "react";
import { Invoice, InvoiceItem } from "@/types/invoices";
import { v4 as uuid } from "uuid";
import { format } from "date-fns";
import { toast } from "sonner";
import { useDiscounts } from "@/hooks/useDiscounts";

export const useSalesInvoice = () => {
  const [invoice, setInvoice] = useState<Invoice>({
    id: "",
    invoiceNumber: "",
    customerId: "",
    customerName: "",
    customerPhone: "",
    customerAccountNumber: "",
    date: new Date().toISOString(),
    items: [],
    totalAmount: 0,
    status: "draft",
    paymentMethod: "cash",
    amountPaid: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const { calculateDiscount } = useDiscounts();

  const createNewInvoice = () => {
    // إنشاء رقم فاتورة بتنسيق INV-YYYYMMDD-XXXX
    const date = new Date();
    const dateStr = format(date, "yyyyMMdd");
    const randomNum = Math.floor(1000 + Math.random() * 9000); // رقم عشوائي من 4 أرقام
    const invoiceNumber = `INV-${dateStr}-${randomNum}`;

    setInvoice({
      id: uuid(),
      invoiceNumber: invoiceNumber,
      customerId: "",
      customerName: "",
      customerPhone: "",
      customerAccountNumber: "",
      date: date.toISOString(),
      items: [],
      totalAmount: 0,
      status: "draft",
      paymentMethod: "cash",
      amountPaid: 0,
      warehouseId: ""
    });
  };

  const updateInvoiceField = (field: string, value: any) => {
    setInvoice(prev => {
      // إذا تم تغيير طريقة الدفع إلى نقد، قم بإزالة تاريخ الاستحقاق وشروط الدفع
      if (field === 'paymentMethod' && value === 'cash') {
        return {
          ...prev,
          [field]: value,
          dueDate: undefined,
          paymentTerms: undefined
        };
      }
      return {
        ...prev,
        [field]: value
      };
    });
  };

  const addInvoiceItem = (item: Partial<InvoiceItem>) => {
    const newItem: InvoiceItem = {
      id: uuid(),
      productId: item.productId || "",
      code: item.code || "",
      name: item.name || "",
      description: item.description || "",
      quantity: item.quantity || 0,
      price: item.price || 0,
      discount: item.discount || 0,
      discountType: item.discountType || "percentage",
      tax: item.tax || 0,
      total: item.total || 0,
      notes: item.notes || ""
    };

    setInvoice(prev => {
      const updatedItems = [...prev.items, newItem];
      return {
        ...prev,
        items: updatedItems,
        totalAmount: calculateTotalAmount(updatedItems, prev.discount, prev.discountType)
      };
    });
  };

  const updateInvoiceItem = (index: number, updates: Partial<InvoiceItem>) => {
    setInvoice(prev => {
      const updatedItems = [...prev.items];
      updatedItems[index] = { ...updatedItems[index], ...updates };
      return {
        ...prev,
        items: updatedItems,
        totalAmount: calculateTotalAmount(updatedItems, prev.discount, prev.discountType)
      };
    });
  };

  const removeInvoiceItem = (index: number) => {
    setInvoice(prev => {
      const updatedItems = prev.items.filter((_, i) => i !== index);
      return {
        ...prev,
        items: updatedItems,
        totalAmount: calculateTotalAmount(updatedItems, prev.discount, prev.discountType)
      };
    });
  };

  const applyDiscount = (type: 'percentage' | 'fixed', value: number) => {
    setInvoice(prev => ({
      ...prev,
      discount: value,
      discountType: type,
      totalAmount: calculateTotalAmount(prev.items, value, type)
    }));
  };

  const calculateTotalAmount = (items: InvoiceItem[], discount?: number, discountType?: 'percentage' | 'fixed'): number => {
    // حساب المجموع الفرعي (مجموع الأصناف قبل الخصم والضريبة)
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    // حساب الضريبة الإجمالية
    const totalTax = items.reduce((sum, item) => {
      const itemSubtotal = item.price * item.quantity;
      const itemDiscount = item.discountType === 'percentage' 
        ? itemSubtotal * (item.discount / 100) 
        : item.discount;
      const taxableAmount = itemSubtotal - itemDiscount;
      return sum + (taxableAmount * (item.tax / 100));
    }, 0);
    
    // حساب الخصم على الفاتورة
    let invoiceDiscount = 0;
    if (discount && discount > 0) {
      invoiceDiscount = discountType === 'percentage' ? subtotal * (discount / 100) : discount;
    }
    
    // الإجمالي النهائي
    return Number((subtotal - invoiceDiscount + totalTax).toFixed(2));
  };

  const calculateTotals = () => {
    setInvoice(prev => ({
      ...prev,
      totalAmount: calculateTotalAmount(prev.items, prev.discount, prev.discountType)
    }));
  };

  const saveInvoice = async () => {
    setIsLoading(true);
    try {
      // محاكاة حفظ الفاتورة (في تطبيق حقيقي سيتم حفظها في قاعدة البيانات)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // تحديث حالة الفاتورة
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
