
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { QuickProductSearch } from "./QuickProductSearch";
import { ProductSearchSection } from "../item-form/ProductSearchSection";
import { v4 as uuidv4 } from "uuid";
import { X } from "lucide-react";
import { DialogFooter } from "@/components/ui/dialog";
import { FormActions } from "../item-form";
import { InvoiceItem } from "@/types/invoices";
import { Product } from "@/types/inventory";

interface InvoiceItemFormProps {
  item?: InvoiceItem;
  onCancel: () => void;
  onSave: (item: Partial<InvoiceItem>) => void;
  settings?: {
    showItemCodes?: boolean;
    showItemNotes?: boolean;
  }
}

export const InvoiceItemForm: React.FC<InvoiceItemFormProps> = ({
  item,
  onCancel,
  onSave,
  settings = {}
}) => {
  const [formData, setFormData] = useState<Partial<InvoiceItem>>(
    item || {
      id: uuidv4(),
      code: "",
      name: "",
      quantity: 1,
      price: 0,
      discount: 0,
      discountType: "percentage",
      tax: 15,
      total: 0
    }
  );
  const [showProductSearch, setShowProductSearch] = useState(!item?.name);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => {
      const updatedData = {
        ...prev,
        [field]: value
      };

      // Recalculate total
      if (['quantity', 'price', 'discount', 'discountType', 'tax'].includes(field)) {
        const quantity = updatedData.quantity || 0;
        const price = updatedData.price || 0;
        const discount = updatedData.discount || 0;
        const discountType = updatedData.discountType || 'percentage';
        const tax = updatedData.tax || 0;
        
        let subtotal = quantity * price;
        
        // Apply discount
        if (discountType === 'percentage') {
          subtotal = subtotal * (1 - discount / 100);
        } else {
          subtotal = subtotal - discount;
        }
        
        // Apply tax
        const total = subtotal * (1 + tax / 100);
        
        updatedData.total = parseFloat(total.toFixed(2));
      }
      
      return updatedData;
    });
  };

  const handleProductSelect = (product: Product) => {
    setFormData(prev => ({
      ...prev,
      productId: product.id,
      code: product.code,
      name: product.name,
      description: product.description,
      price: product.price,
      total: product.price * (prev.quantity || 1)
    }));
    
    setShowProductSearch(false);
  };

  const handleSave = () => {
    // Validate
    if (!formData.name || !formData.price || !(formData.quantity && formData.quantity > 0)) {
      return;
    }
    
    // Save
    onSave(formData);
  };

  return (
    <div className="space-y-4">
      {showProductSearch ? (
        <div className="relative">
          <QuickProductSearch
            onClose={() => setShowProductSearch(false)}
            onSelect={handleProductSelect}
            initialQuery=""
          />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">تفاصيل الصنف</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={onCancel}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <ProductSearchSection
            formData={formData}
            onChange={handleChange}
            includeNotes={settings.showItemNotes !== false}
          />
          
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={onCancel}>إلغاء</Button>
            <Button onClick={handleSave}>إضافة الصنف</Button>
          </DialogFooter>
        </>
      )}
    </div>
  );
};
