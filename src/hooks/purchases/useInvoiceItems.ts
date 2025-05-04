
import { PurchaseInvoice, PurchaseItem } from "@/types/purchases";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { calculateTotalAmount, calculateSubtotal } from "./invoiceCalculations";

interface UseInvoiceItemsProps {
  invoice: PurchaseInvoice;
  setInvoice: React.Dispatch<React.SetStateAction<PurchaseInvoice>>;
  setIsAddingItem: React.Dispatch<React.SetStateAction<boolean>>;
  setEditingItemIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

export const useInvoiceItems = ({
  invoice,
  setInvoice,
  setIsAddingItem,
  setEditingItemIndex
}: UseInvoiceItemsProps) => {
  
  // Add new item
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

  // Update existing item
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

  // Remove item
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

  return {
    addItem,
    updateItem,
    removeItem
  };
};
