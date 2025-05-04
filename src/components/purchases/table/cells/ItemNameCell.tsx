
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
  
  return (
    <TableCell 
      className="border border-gray-300 p-2 hover:bg-gray-100 cursor-pointer search-cell relative"
      onClick={(e) => {
        e.stopPropagation();
        handleCellClick(index, 'name');
      }}
    >
      <ProductSearchCell 
        active={activeSearchCell === cellId}
        index={index}
        field="name"
        onSelect={handleProductSelect}
        searchInputRef={searchInputRef}
      />
      {activeSearchCell !== cellId && (
        <div className="w-full h-full min-h-[24px] flex items-center">{name || ""}</div>
      )}
    </TableCell>
  );
};
