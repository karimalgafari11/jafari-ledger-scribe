
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
  
  return (
    <TableCell 
      className="text-center border border-gray-300 p-2 hover:bg-gray-100 cursor-pointer search-cell relative" 
      onClick={(e) => {
        e.stopPropagation();
        handleCellClick(index, 'code');
      }}
    >
      <ProductSearchCell 
        active={activeSearchCell === cellId}
        index={index}
        field="code"
        onSelect={handleProductSelect}
        searchInputRef={searchInputRef}
      />
      {activeSearchCell !== cellId && (
        <div className="w-full h-full min-h-[24px]">{code || ""}</div>
      )}
    </TableCell>
  );
};
