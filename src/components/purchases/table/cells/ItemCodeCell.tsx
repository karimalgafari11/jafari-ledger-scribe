
import React from "react";
import { TableCell } from "@/components/ui/table";
import { ProductSearchCell } from "../ProductSearchCell";

interface ItemCodeCellProps {
  code: string;
  index: number;
  activeSearchCell: string | null;
  handleCellClick: (index: number, field: string) => void;
  handleProductSelect: (product: any, index?: number) => void;
  searchInputRef: React.RefObject<HTMLInputElement>;
}

export const ItemCodeCell: React.FC<ItemCodeCellProps> = ({ 
  code, 
  index, 
  activeSearchCell, 
  handleCellClick, 
  handleProductSelect,
  searchInputRef
}) => {
  const cellId = `code-${index}`;
  const isActive = activeSearchCell === cellId;
  
  return (
    <TableCell 
      className={`text-center border border-gray-300 p-2 search-cell relative ${isActive ? 'bg-blue-50 ring-2 ring-blue-300' : 'hover:bg-gray-100'}`}
      onClick={(e) => {
        e.stopPropagation();
        handleCellClick(index, 'code');
      }}
    >
      <ProductSearchCell 
        active={isActive}
        index={index}
        field="code"
        onSelect={handleProductSelect}
        searchInputRef={searchInputRef}
      />
      {!isActive && (
        <div className="w-full h-full min-h-[24px] flex items-center justify-center">
          {code || ""}
        </div>
      )}
    </TableCell>
  );
};

