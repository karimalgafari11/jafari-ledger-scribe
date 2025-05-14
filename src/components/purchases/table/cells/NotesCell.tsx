
import React, { useState, useEffect, forwardRef, KeyboardEvent } from "react";
import { TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

interface NotesCellProps {
  notes?: string;
  index: number;
  isEditing: boolean;
  handleCellClick: (rowIndex: number, cellName: string) => void;
  handleDirectEdit: (index: number, field: string, value: any) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLTableCellElement>) => void;
  tabIndex?: number;
}

export const NotesCell = forwardRef<HTMLTableCellElement, NotesCellProps>(({
  notes = "",
  index,
  isEditing,
  handleCellClick,
  handleDirectEdit,
  onKeyDown,
  tabIndex
}, ref) => {
  const [inputValue, setInputValue] = useState(notes);
  
  useEffect(() => {
    if (isEditing) {
      setInputValue(notes);
    }
  }, [isEditing, notes]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  
  const handleBlur = () => {
    if (inputValue !== notes) {
      handleDirectEdit(index, 'notes', inputValue);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleDirectEdit(index, 'notes', inputValue);
    }
  };
  
  return (
    <TableCell 
      className="border border-gray-300 p-2"
      onClick={() => handleCellClick(index, 'notes')}
      onKeyDown={onKeyDown}
      data-row-index={index}
      data-cell-name="notes"
      ref={ref}
      tabIndex={tabIndex}
    >
      {isEditing ? (
        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="h-8"
          autoFocus
        />
      ) : (
        <span className="cursor-text">{notes || "—"}</span>
      )}
    </TableCell>
  );
});

NotesCell.displayName = "NotesCell";
