
import React from "react";
import { ProductDetails } from "./ProductDetails";
import { PricingDetails } from "./PricingDetails";
import { mockProducts } from "@/data/mockProducts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProductSearchSectionProps {
  formData: any;
  onChange: (field: string, value: any) => void;
  includeNotes?: boolean;
}

export const ProductSearchSection: React.FC<ProductSearchSectionProps> = ({
  formData,
  onChange,
  includeNotes = true
}) => {
  const handleProductSelect = (productId: string) => {
    const product = mockProducts.find(p => p.id === productId);
    
    if (product) {
      onChange("productId", product.id);
      onChange("code", product.code);
      onChange("name", product.name);
      onChange("price", product.price);
    }
  };

  return (
    <div className="space-y-3">
      <div>
        <label htmlFor="product" className="block text-xs font-medium mb-0.5">اختر المنتج</label>
        <Select
          value={formData.productId}
          onValueChange={handleProductSelect}
        >
          <SelectTrigger className="h-7 text-sm">
            <SelectValue placeholder="اختر منتجًا..." />
          </SelectTrigger>
          <SelectContent>
            {mockProducts.map((product) => (
              <SelectItem key={product.id} value={product.id}>
                {product.name} - {product.code}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <ProductDetails
        code={formData.code}
        name={formData.name}
        description={formData.description || ""}
        notes={formData.notes}
        includeNotes={includeNotes}
        onChange={onChange}
      />

      <PricingDetails
        quantity={formData.quantity}
        price={formData.price}
        tax={formData.tax}
        discount={formData.discount}
        discountType={formData.discountType}
        onChange={onChange}
      />
    </div>
  );
};

