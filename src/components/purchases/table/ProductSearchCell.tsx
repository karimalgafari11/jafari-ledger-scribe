
import React from "react";
import { Search } from "lucide-react";

interface ProductSearchCellProps {
  value: string;
  code: string;
  isActive: boolean;
  onActivate: () => void;
  onProductSelect: (product: any) => void;
  inputRef: React.RefObject<HTMLInputElement> | undefined;
  className?: string;
}

export const ProductSearchCell: React.FC<ProductSearchCellProps> = ({
  value,
  code,
  isActive,
  onActivate,
  onProductSelect,
  inputRef,
  className = ""
}) => {
  // If the cell is active, we show an input field
  if (isActive && inputRef) {
    return (
      <div className="relative w-full">
        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Search size={16} />
        </div>
        <input
          ref={inputRef}
          type="text"
          className={`w-full py-1 pl-8 pr-2 border-none focus:ring-2 focus:ring-blue-500 ${className}`}
          placeholder="ابحث عن منتج..."
          defaultValue={value}
          autoFocus
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    );
  }

  // If the cell is not active, we show the product name or a placeholder
  return (
    <div 
      className={`flex items-center gap-2 cursor-pointer w-full min-h-[24px] ${className}`}
      onClick={onActivate}
    >
      {value ? (
        <span className="flex-1">{value}</span>
      ) : (
        <>
          <Search size={14} className="text-gray-400 mr-1" />
          <span className="text-gray-400">ابحث عن منتج</span>
        </>
      )}
    </div>
  );
};
