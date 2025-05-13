
import React, { forwardRef } from "react";
import { TableCell } from "@/components/ui/table";
import { EditableCell } from "../EditableCell";

interface QuantityCellProps {
  quantity: number;
  index: number;
  isEditing: boolean;
  handleCellClick: (rowIndex: number, cellName: string) => void;
  handleDirectEdit: (index: number, field: string, value: any) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTableCellElement>) => void;
  tabIndex?: number;
}

export const QuantityCell = forwardRef<HTMLTableCellElement, QuantityCellProps>(({
  quantity,
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
        value={quantity.toString()}
        active={isEditing}
        onActivate={() => handleCellClick(index, "quantity")}
        onChange={(value) => handleDirectEdit(index, "quantity", parseFloat(value) || 0)}
        type="number"
        className="text-center"
      />
    </TableCell>
  );
});

QuantityCell.displayName = "QuantityCell";
