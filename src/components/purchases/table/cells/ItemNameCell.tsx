
import React from "react";
import { TableCell } from "@/components/ui/table";
import { ProductSearchCell } from "../ProductSearchCell";

interface ItemNameCellProps {
  name: string;
  index: number;
  activeSearchCell: string | null;
  handleCellClick: (index: number, field: string) => void;
  handleProductSelect: (product: any, index?: number) => void;
  searchInputRef: React.RefObject<HTMLInputElement>;
}

export const ItemNameCell: React.FC<ItemNameCellProps> = ({ 
  name, 
  index, 
  activeSearchCell, 
  handleCellClick, 
  handleProductSelect,
  searchInputRef
}) => {
  const cellId = `name-${index}`;
  const isActive = activeSearchCell === cellId;
  
  return (
    <TableCell 
      className={`border border-gray-300 p-2 search-cell relative ${isActive ? 'bg-blue-50 ring-2 ring-blue-300' : 'hover:bg-gray-100'}`}
      onClick={(e) => {
        e.stopPropagation();
        handleCellClick(index, 'name');
      }}
    >
      <ProductSearchCell 
        active={isActive}
        index={index}
        field="name"
        onSelect={handleProductSelect}
        searchInputRef={searchInputRef}
      />
      {!isActive && (
        <div className="w-full h-full min-h-[24px] flex items-center">
          {name || ""}
        </div>
      )}
    </TableCell>
  );
};

