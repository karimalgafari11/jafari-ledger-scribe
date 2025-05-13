
import React, { forwardRef } from "react";
import { TableCell } from "@/components/ui/table";
import { EditableCell } from "../EditableCell";

interface ItemCodeCellProps {
  code: string;
  index: number;
  isEditing: boolean;
  handleCellClick: (rowIndex: number, cellName: string) => void;
  handleDirectEdit: (index: number, field: string, value: any) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTableCellElement>) => void;
  tabIndex?: number;
}

export const ItemCodeCell = forwardRef<HTMLTableCellElement, ItemCodeCellProps>(({
  code,
  index,
  isEditing,
  handleCellClick,
  handleDirectEdit,
  onKeyDown,
  tabIndex
}, ref) => {
  return (
    <TableCell 
      className="px-3 py-2 text-center" 
      ref={ref} 
      tabIndex={tabIndex}
      onKeyDown={onKeyDown}
    >
      <EditableCell
        value={code}
        active={isEditing}
        onActivate={() => handleCellClick(index, "code")}
        onChange={(value) => handleDirectEdit(index, "code", value)}
        placeholder="أدخل الكود"
        className="text-center"
      />
    </TableCell>
  );
});

ItemCodeCell.displayName = "ItemCodeCell";
