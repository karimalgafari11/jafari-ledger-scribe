
import { useState } from "react";
import { PurchaseInvoice, PurchaseItem } from "@/types/purchases";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import { useInvoiceItems } from "./useInvoiceItems";
import { useInvoiceCalculations } from "./useInvoiceCalculations";
import { useInvoiceActions } from "./useInvoiceActions";

export const usePurchaseInvoice = (initialInvoice?: PurchaseInvoice) => {
  // Default invoice if none provided
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

  // Update invoice field
  const updateField = (field: keyof PurchaseInvoice, value: any) => {
    setInvoice(prev => ({ ...prev, [field]: value }));
  };

  // Update invoice date
  const updateDate = (date: Date | null) => {
    if (date) {
      updateField("date", format(date, "yyyy-MM-dd"));
    }
  };

  // Import functionality from smaller hooks
  const { addItem, updateItem, removeItem } = useInvoiceItems({
    invoice,
    setInvoice,
    setIsAddingItem,
    setEditingItemIndex
  });

  const { applyDiscount, applyExpenses, calculateRemaining } = useInvoiceCalculations({
    invoice,
    setInvoice
  });

  const { saveInvoice, printInvoice, sendViaWhatsApp } = useInvoiceActions({
    invoice
  });

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
