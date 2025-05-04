
import { useState } from "react";
import { Invoice } from "@/types/invoices";
import { v4 as uuid } from "uuid";
import { format } from "date-fns";

export const useInvoiceState = () => {
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

  const createNewInvoice = () => {
    // Generate invoice number with format INV-YYYYMMDD-XXXX
    const date = new Date();
    const dateStr = format(date, "yyyyMMdd");
    const randomNum = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
    const invoiceNumber = `INV-${dateStr}-${randomNum}`;

    // Create default invoice 
    const newInvoice: Invoice = {
      id: uuid(),
      invoiceNumber: invoiceNumber,
      customerId: "",
      customerName: "عميل افتراضي",
      customerPhone: "0500000000",
      customerAccountNumber: "",
      date: date.toISOString(),
      items: [],
      totalAmount: 0,
      status: "draft",
      paymentMethod: "cash",
      amountPaid: 0,
      warehouseId: ""
    };

    setInvoice(newInvoice);
    return newInvoice;
  };

  const updateInvoiceField = (field: string, value: any) => {
    setInvoice(prev => {
      // If payment method changed to cash, remove due date and payment terms
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

  return {
    invoice,
    setInvoice,
    isLoading,
    setIsLoading,
    createNewInvoice,
    updateInvoiceField
  };
};
