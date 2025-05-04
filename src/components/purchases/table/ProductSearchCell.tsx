
import React, { useRef, useEffect } from "react";
import { ProductSearch } from "../ProductSearch";

interface ProductSearchCellProps {
  active: boolean;
  index: number;
  field: string;
  onSelect: (product: any, index?: number) => void;
  searchInputRef: React.RefObject<HTMLInputElement>;
}

export const ProductSearchCell: React.FC<ProductSearchCellProps> = ({ 
  active, 
  index, 
  field, 
  onSelect, 
  searchInputRef 
}) => {
  if (!active) return null;

  return (
    <div className="product-search-dropdown w-full z-50">
      <ProductSearch 
        ref={searchInputRef}
        autoFocus={true}
        showIcon={field === "quickadd"}
        placeholder={
          field === "quickadd" 
            ? "ابحث لإضافة صنف جديد..." 
            : field === "code" 
              ? "ابحث برقم الصنف..." 
              : "ابحث عن صنف..."
        }
        className="w-full text-center border-none focus:ring-0"
        onSelect={(product) => onSelect(product, index !== -1 ? index : undefined)}
      />
    </div>
  );
};
