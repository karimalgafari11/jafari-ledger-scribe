
import React, { forwardRef } from "react";
import { TableCell } from "@/components/ui/table";
import { ProductSearchCell } from "../ProductSearchCell";

interface ItemNameCellProps {
  name: string;
  index: number;
  handleProductSelect: (product: any, index?: number) => void;
  isAddingItem: boolean;
  editingItemIndex: number | null;
  handleDirectEdit: (index: number, field: string, value: any) => void;
  isEditing: boolean;
  handleCellClick: (rowIndex: number, cellName: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTableCellElement>) => void;
  tabIndex?: number;
}

export const ItemNameCell = forwardRef<HTMLTableCellElement, ItemNameCellProps>(({
  name,
  index,
  handleProductSelect,
  isEditing,
  handleCellClick,
  onKeyDown,
  tabIndex
}, ref) => {
  return (
    <TableCell 
      className="px-3 py-2" 
      ref={ref} 
      tabIndex={tabIndex}
      onKeyDown={onKeyDown}
    >
      <ProductSearchCell
        value={name}
        isActive={isEditing}
        onActivate={() => handleCellClick(index, "name")}
        onProductSelect={(product) => handleProductSelect(product, index)}
        className="text-right"
      />
    </TableCell>
  );
});

ItemNameCell.displayName = "ItemNameCell";
