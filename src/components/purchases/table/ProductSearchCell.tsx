
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
  // Don't render anything if not active
  if (!active) return null;

  return (
    <div 
      className="product-search-dropdown w-full absolute left-0 right-0 top-0 bottom-0 z-50 bg-white"
      onClick={(e) => e.stopPropagation()}
    >
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
