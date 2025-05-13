
import React, { forwardRef } from "react";
import { TableCell } from "@/components/ui/table";
import { EditableCell } from "../EditableCell";

interface UnitCellProps {
  unit?: string;
  index: number;
  isEditing: boolean;
  handleCellClick: (rowIndex: number, cellName: string) => void;
  handleDirectEdit: (index: number, field: string, value: any) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTableCellElement>) => void;
  tabIndex?: number;
}

export const UnitCell = forwardRef<HTMLTableCellElement, UnitCellProps>(({
  unit,
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
        value={unit || "قطعة"}
        active={isEditing}
        onActivate={() => handleCellClick(index, "unit")}
        onChange={(value) => handleDirectEdit(index, "unit", value)}
        className="text-center"
      />
    </TableCell>
  );
});

UnitCell.displayName = "UnitCell";
