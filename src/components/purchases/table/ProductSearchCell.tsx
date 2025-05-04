
import React, { useEffect } from "react";
import { ProductSearch } from "../ProductSearch";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();
  
  // Don't render anything if not active or if it's a quickadd field
  if (!active || field === "quickadd") return null;

  // Choose different positioning based on device
  const positionClass = isMobile 
    ? "fixed inset-0 z-[1000]" 
    : "absolute z-[1000] left-0 right-0 top-0 bottom-0";

  return (
    <div 
      className={`product-search-dropdown ${positionClass} bg-white shadow-xl border border-gray-300 rounded-sm overflow-visible`}
      onClick={(e) => e.stopPropagation()}
    >
      <ProductSearch 
        ref={searchInputRef}
        autoFocus={true}
        showIcon={false}
        placeholder={
          field === "code" 
            ? "ابحث برقم الصنف..." 
            : "ابحث عن صنف..."
        }
        className="w-full text-center border-none focus:ring-0"
        onSelect={(product) => onSelect(product, index !== -1 ? index : undefined)}
        maxResults={5}
      />
    </div>
  );
};
