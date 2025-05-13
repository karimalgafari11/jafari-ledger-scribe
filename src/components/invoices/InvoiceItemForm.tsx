
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { InvoiceItem } from "@/types/invoices";
import { v4 as uuid } from "uuid";
import { FormHeader } from "@/components/invoices/item-form";
import { ProductSearchSection } from "@/components/invoices/item-form";
import { FormActions } from "@/components/invoices/item-form";

interface InvoiceItemFormProps {
  item?: InvoiceItem;
  onSubmit: (item: Partial<InvoiceItem>) => void;
  onCancel: () => void;
  includeNotes?: boolean;
}

export const InvoiceItemForm: React.FC<InvoiceItemFormProps> = ({
  item,
  onSubmit,
  onCancel,
  includeNotes = true
}) => {
  const [formData, setFormData] = useState<Partial<InvoiceItem>>({
    id: item?.id || uuid(),
    productId: item?.productId || "",
    code: item?.code || "",
    name: item?.name || "",
    description: item?.description || "",
    quantity: item?.quantity || 1,
    price: item?.price || 0,
    discount: item?.discount || 0,
    discountType: item?.discountType || "percentage",
    tax: item?.tax || 15,
    total: item?.total || 0,
    notes: item?.notes || ""
  });

  useEffect(() => {
    calculateTotal();
  }, [formData.quantity, formData.price, formData.discount, formData.discountType, formData.tax]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const calculateTotal = () => {
    const quantity = formData.quantity || 0;
    const price = formData.price || 0;
    const discount = formData.discount || 0;
    const tax = formData.tax || 0;
    
    let subtotal = quantity * price;
    
    // Apply discount
    if (formData.discountType === "percentage") {
      subtotal = subtotal * (1 - discount / 100);
    } else {
      subtotal = subtotal - discount;
    }
    
    // Apply tax
    const total = subtotal * (1 + tax / 100);
    
    setFormData((prev) => ({
      ...prev,
      total,
    }));
  };

  const handleSave = () => {
    if (!formData.name || !formData.quantity || !formData.price) {
      // You could show a toast error here
      return;
    }
    
    onSubmit(formData);
  };

  return (
    <Card className="mb-2 shadow-sm">
      <CardContent className="p-4">
        <FormHeader
          title={item ? "تعديل صنف" : "إضافة صنف جديد"}
          onClose={onCancel}
        />
        
        <ProductSearchSection
          formData={formData}
          onChange={handleChange}
          includeNotes={includeNotes}
        />
        
        <FormActions
          onSave={handleSave}
          onCancel={onCancel}
          isEdit={!!item}
        />
      </CardContent>
    </Card>
  );
};

