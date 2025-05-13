
import React, { forwardRef } from "react";
import { TableCell } from "@/components/ui/table";
import { EditableCell } from "../EditableCell";

interface NotesCellProps {
  notes?: string;
  index: number;
  isEditing: boolean;
  handleCellClick: (rowIndex: number, cellName: string) => void;
  handleDirectEdit: (index: number, field: string, value: any) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTableCellElement>) => void;
  tabIndex?: number;
}

export const NotesCell = forwardRef<HTMLTableCellElement, NotesCellProps>(({
  notes,
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
        value={notes || ""}
        active={isEditing}
        onActivate={() => handleCellClick(index, "notes")}
        onChange={(value) => handleDirectEdit(index, "notes", value)}
        placeholder="إضافة ملاحظة"
      />
    </TableCell>
  );
});

NotesCell.displayName = "NotesCell";
