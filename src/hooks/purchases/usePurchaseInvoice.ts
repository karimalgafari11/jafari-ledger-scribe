
import { useState, useEffect } from "react";
import { PurchaseInvoice, PurchaseItem } from "@/types/purchases";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import { useInvoiceItems } from "./useInvoiceItems";
import { useInvoiceCalculations } from "./useInvoiceCalculations";
import { useInvoiceActions } from "./useInvoiceActions";

interface UsePurchaseInvoiceProps {
  initialInvoice?: PurchaseInvoice;
  pdfData?: Partial<PurchaseInvoice>;
}

export const usePurchaseInvoice = ({ initialInvoice, pdfData }: UsePurchaseInvoiceProps = {}) => {
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

  // Update invoice when PDF data is provided
  useEffect(() => {
    if (pdfData && Object.keys(pdfData).length > 0) {
      console.log("Updating invoice with PDF data:", pdfData);
      
      // Validate PDF data before applying it
      const validItems = Array.isArray(pdfData.items) 
        ? pdfData.items.filter(item => 
            item && typeof item === 'object' && 
            item.name && 
            !isNaN(item.quantity) && 
            !isNaN(item.price)
          )
        : [];
        
      if (validItems.length === 0) {
        toast.error("لم يتم العثور على أصناف صالحة في ملف PDF");
        return;
      }
      
      setInvoice(prev => {
        const mergedInvoice = {
          ...prev,
          invoiceNumber: pdfData.invoiceNumber || prev.invoiceNumber,
          vendorName: pdfData.vendorName || prev.vendorName,
          date: pdfData.date || prev.date,
          // Ensure proper handling of items
          items: validItems.map(item => ({
            id: item.id || uuidv4(),
            productId: item.productId || uuidv4(),
            code: item.code || "",
            name: item.name || "",
            manufacturer: item.manufacturer || "",
            size: item.size || "",
            quantity: item.quantity || 1,
            price: item.price || 0,
            discount: item.discount || 0,
            discountType: item.discountType || "percentage",
            tax: item.tax || 15, // Default 15% VAT in Saudi Arabia
            total: item.total || (item.quantity || 1) * (item.price || 0),
            notes: item.notes || ""
          }))
        };
        
        // Ensure all calculations are correct
        const subtotal = mergedInvoice.items.reduce((sum, item) => sum + item.total, 0);
        return {
          ...mergedInvoice,
          subtotal,
          totalAmount: calculateTotalAmount(
            subtotal, 
            mergedInvoice.discount, 
            mergedInvoice.discountType, 
            mergedInvoice.tax, 
            mergedInvoice.expenses
          )
        };
      });
      
      toast.success(`تم استيراد ${validItems.length} صنف بنجاح من ملف PDF`);
    }
  }, [pdfData]);

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

  // Calculate total amount helper function
  const calculateTotalAmount = (
    subtotal: number, 
    discount?: number, 
    discountType?: 'percentage' | 'fixed',
    tax?: number,
    expenses?: number
  ): number => {
    let total = subtotal;
    
    // Apply discount
    if (discount && discount > 0) {
      if (discountType === 'percentage') {
        total -= (subtotal * (discount / 100));
      } else {
        total -= discount;
      }
    }
    
    // Apply tax
    if (tax && tax > 0) {
      total += (total * (tax / 100));
    }
    
    // Add expenses
    if (expenses && expenses > 0) {
      total += expenses;
    }
    
    return total;
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

  // Performance optimization for large invoices
  useEffect(() => {
    if (invoice.items.length > 100) {
      console.log(`Large invoice detected: ${invoice.items.length} items - optimizing rendering`);
    }
  }, [invoice.items.length]);

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
