
import React, { useState, useEffect } from "react";
import { PurchaseOrder, PurchaseItem } from "@/types/purchases";
import { Button } from "@/components/ui/button";
import { PurchaseOrderHeader } from "./PurchaseOrderHeader";
import { PurchaseOrderItems } from "./PurchaseOrderItems";
import { PurchaseOrderSummary } from "./PurchaseOrderSummary";
import { PurchaseOrderNotes } from "./PurchaseOrderNotes";
import { CalendarIcon, FilePlus, Save } from "lucide-react";
import { toast } from "sonner";

interface PurchaseOrderFormProps {
  initialOrder: PurchaseOrder;
  onSave: (order: PurchaseOrder) => void;
  onCancel: () => void;
  isLoading: boolean;
}

export const PurchaseOrderForm: React.FC<PurchaseOrderFormProps> = ({
  initialOrder,
  onSave,
  onCancel,
  isLoading
}) => {
  const [order, setOrder] = useState<PurchaseOrder>(initialOrder);
  
  // Update order field
  const handleFieldChange = (field: keyof PurchaseOrder, value: any) => {
    setOrder(prev => ({ ...prev, [field]: value }));
  };
  
  // Add new item to order
  const handleAddItem = (item: PurchaseItem) => {
    const updatedItems = [...order.items, item];
    const subtotal = calculateSubtotal(updatedItems);
    const totalAmount = calculateTotalAmount(subtotal, order.discount, order.discountType, order.tax);
    
    setOrder(prev => ({
      ...prev,
      items: updatedItems,
      subtotal,
      totalAmount
    }));
    
    toast.success("تمت إضافة الصنف بنجاح");
  };
  
  // Update existing item
  const handleUpdateItem = (index: number, updatedItem: PurchaseItem) => {
    const updatedItems = [...order.items];
    updatedItems[index] = updatedItem;
    
    const subtotal = calculateSubtotal(updatedItems);
    const totalAmount = calculateTotalAmount(subtotal, order.discount, order.discountType, order.tax);
    
    setOrder(prev => ({
      ...prev,
      items: updatedItems,
      subtotal,
      totalAmount
    }));
  };
  
  // Remove item from order
  const handleRemoveItem = (index: number) => {
    const updatedItems = order.items.filter((_, i) => i !== index);
    const subtotal = calculateSubtotal(updatedItems);
    const totalAmount = calculateTotalAmount(subtotal, order.discount, order.discountType, order.tax);
    
    setOrder(prev => ({
      ...prev,
      items: updatedItems,
      subtotal,
      totalAmount
    }));
    
    toast.success("تم حذف الصنف بنجاح");
  };
  
  // Apply discount to order
  const handleApplyDiscount = (discount: number, discountType: 'percentage' | 'fixed') => {
    const totalAmount = calculateTotalAmount(order.subtotal, discount, discountType, order.tax);
    
    setOrder(prev => ({
      ...prev,
      discount,
      discountType,
      totalAmount
    }));
  };
  
  // Apply tax to order
  const handleApplyTax = (tax: number) => {
    const totalAmount = calculateTotalAmount(order.subtotal, order.discount, order.discountType, tax);
    
    setOrder(prev => ({
      ...prev,
      tax,
      totalAmount
    }));
  };
  
  // Calculate subtotal from items
  const calculateSubtotal = (items: PurchaseItem[]): number => {
    return items.reduce((sum, item) => sum + item.total, 0);
  };
  
  // Calculate total amount with discounts and taxes
  const calculateTotalAmount = (
    subtotal: number, 
    discount?: number, 
    discountType?: 'percentage' | 'fixed',
    tax?: number
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
    
    return total;
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!order.vendorId) {
      toast.error("يرجى اختيار المورد");
      return;
    }
    
    if (order.items.length === 0) {
      toast.error("يرجى إضافة صنف واحد على الأقل");
      return;
    }
    
    // Save order
    onSave(order);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PurchaseOrderHeader 
        order={order}
        onFieldChange={handleFieldChange}
      />
      
      <PurchaseOrderItems 
        items={order.items}
        onAddItem={handleAddItem}
        onUpdateItem={handleUpdateItem}
        onRemoveItem={handleRemoveItem}
      />
      
      <PurchaseOrderSummary 
        subtotal={order.subtotal}
        discount={order.discount}
        discountType={order.discountType}
        tax={order.tax}
        totalAmount={order.totalAmount}
        onApplyDiscount={handleApplyDiscount}
        onApplyTax={handleApplyTax}
      />
      
      <PurchaseOrderNotes 
        notes={order.notes}
        termsAndConditions={order.termsAndConditions}
        onFieldChange={handleFieldChange}
      />
      
      <div className="flex justify-end gap-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          إلغاء
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
        >
          <Save className="ml-2 h-4 w-4" />
          حفظ أمر الشراء
        </Button>
        <Button
          type="button"
          variant="secondary"
          disabled={isLoading}
        >
          <FilePlus className="ml-2 h-4 w-4" />
          حفظ كمسودة
        </Button>
      </div>
    </form>
  );
};
