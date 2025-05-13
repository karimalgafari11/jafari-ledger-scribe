
import React, { forwardRef, KeyboardEvent, useRef } from "react";
import { EditableTableCell } from "./TableCell";
import { useTranslation } from "@/hooks/useTranslation";

interface NameCellProps {
  name: string;
  index: number;
  isEditing: boolean;
  isActive: boolean;
  handleCellClick: (rowIndex: number, cellName: string) => void;
  handleDirectEdit: (index: number, field: string, value: string) => void;
  onKeyDown: (e: KeyboardEvent<HTMLTableCellElement>) => void;
}

export const NameCell = forwardRef<HTMLTableCellElement, NameCellProps>(
  ({ name, index, isEditing, isActive, handleCellClick, handleDirectEdit, onKeyDown }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { language } = useTranslation();
    
    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // السماح للأحداث الخاصة بالتنقل بالمرور إلى الأعلى
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Enter", "Escape", "Tab"].includes(e.key)) {
        e.stopPropagation(); // منع المعالجة المزدوجة
        onKeyDown(e as unknown as KeyboardEvent<HTMLTableCellElement>);
      }
    };
    
    const placeholderText = language === 'ar' ? "انقر لإضافة اسم" : "Click to add name";
    
    return (
      <EditableTableCell
        rowIndex={index}
        cellName="name"
        isActive={isActive}
        onClick={() => handleCellClick(index, "name")}
        onKeyDown={onKeyDown}
        ref={ref}
      >
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={name || ""}
            onChange={(e) => handleDirectEdit(index, 'name', e.target.value)}
            className="w-full h-8 border rounded focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none"
            autoFocus
            onKeyDown={handleInputKeyDown}
          />
        ) : (
          <span className="cursor-text block w-full h-full py-1 font-medium">
            {name || placeholderText}
          </span>
        )}
      </EditableTableCell>
    );
  }
);

NameCell.displayName = "NameCell";
