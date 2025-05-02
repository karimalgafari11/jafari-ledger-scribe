
import React from "react";
import { InvoiceItem } from "@/types/invoices";
import { mockProducts } from "@/data/mockProducts";
import { ItemSearch } from "./item-form/ItemSearch";
import { ProductDetails } from "./item-form/ProductDetails";
import { PricingDetails } from "./item-form/PricingDetails";
import { ItemFormFooter } from "./item-form/ItemFormFooter";
import { useItemFormState } from "./item-form/useItemFormState";

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
  includeNotes = false
}) => {
  const { formData, handleChange, handleSelectProduct } = useItemFormState(item);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <ItemSearch
        products={mockProducts} 
        onSelectProduct={handleSelectProduct}
        selectedProductId={formData.productId || ""}
      />

      <ProductDetails
        code={formData.code || ""}
        name={formData.name || ""}
        description={formData.description || ""}
        notes={formData.notes}
        includeNotes={includeNotes}
        onChange={handleChange}
      />

      <PricingDetails
        quantity={formData.quantity || 1}
        price={formData.price || 0}
        tax={formData.tax || 15}
        discount={formData.discount || 0}
        discountType={formData.discountType || "percentage"}
        onChange={handleChange}
      />

      <ItemFormFooter
        total={formData.total || 0}
        isUpdate={!!item}
        onCancel={onCancel}
        onSubmit={handleSubmit}
      />
    </form>
  );
};
