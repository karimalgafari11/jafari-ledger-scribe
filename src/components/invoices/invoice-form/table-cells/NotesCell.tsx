
import React, { forwardRef, KeyboardEvent, useRef } from "react";
import { EditableTableCell } from "./TableCell";
import { useTranslation } from "@/hooks/useTranslation";

interface NotesCellProps {
  notes?: string;
  index: number;
  isEditing: boolean;
  isActive: boolean;
  handleCellClick: (rowIndex: number, cellName: string) => void;
  handleDirectEdit: (index: number, field: string, value: string) => void;
  onKeyDown: (e: KeyboardEvent<HTMLTableCellElement>) => void;
}

export const NotesCell = forwardRef<HTMLTableCellElement, NotesCellProps>(
  ({ notes, index, isEditing, isActive, handleCellClick, handleDirectEdit, onKeyDown }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    
    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // السماح للأحداث الخاصة بالتنقل بالمرور إلى الأعلى
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Enter", "Escape", "Tab"].includes(e.key)) {
        e.stopPropagation(); // منع المعالجة المزدوجة
        onKeyDown(e as unknown as KeyboardEvent<HTMLTableCellElement>);
      }
    };
    
    return (
      <EditableTableCell
        rowIndex={index}
        cellName="notes"
        isActive={isActive}
        onClick={() => handleCellClick(index, "notes")}
        onKeyDown={onKeyDown}
        ref={ref}
      >
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={notes || ""}
            onChange={(e) => handleDirectEdit(index, 'notes', e.target.value)}
            className="w-full h-8 border rounded focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none"
            autoFocus
            onKeyDown={handleInputKeyDown}
          />
        ) : (
          <span className="cursor-text block w-full h-full py-1">{notes || "—"}</span>
        )}
      </EditableTableCell>
    );
  }
);

NotesCell.displayName = "NotesCell";
