
import React, { forwardRef } from "react";
import { TableCell } from "@/components/ui/table";
import { EditableCell } from "../EditableCell";

interface PriceCellProps {
  price: number;
  index: number;
  isEditing: boolean;
  handleCellClick: (rowIndex: number, cellName: string) => void;
  handleDirectEdit: (index: number, field: string, value: any) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTableCellElement>) => void;
  tabIndex?: number;
}

export const PriceCell = forwardRef<HTMLTableCellElement, PriceCellProps>(({
  price,
  index,
  isEditing,
  handleCellClick,
  handleDirectEdit,
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
      <EditableCell
        value={price.toString()}
        active={isEditing}
        onActivate={() => handleCellClick(index, "price")}
        onChange={(value) => handleDirectEdit(index, "price", parseFloat(value) || 0)}
        type="number"
        className="text-left"
      />
    </TableCell>
  );
});

PriceCell.displayName = "PriceCell";
