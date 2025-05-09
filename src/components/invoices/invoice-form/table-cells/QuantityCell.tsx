
import React, { forwardRef, KeyboardEvent, useRef } from "react";
import { EditableTableCell } from "./TableCell";

interface QuantityCellProps {
  quantity: number;
  index: number;
  isEditing: boolean;
  isActive: boolean;
  handleCellClick: (rowIndex: number, cellName: string) => void;
  handleDirectEdit: (index: number, field: string, value: string) => void;
  onKeyDown: (e: KeyboardEvent<HTMLTableCellElement>) => void;
}

export const QuantityCell = forwardRef<HTMLTableCellElement, QuantityCellProps>(
  ({ quantity, index, isEditing, isActive, handleCellClick, handleDirectEdit, onKeyDown }, ref) => {
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
        cellName="quantity"
        isActive={isActive}
        onClick={() => handleCellClick(index, "quantity")}
        onKeyDown={onKeyDown}
        ref={ref}
        className="text-center"
      >
        {isEditing ? (
          <input
            ref={inputRef}
            type="number"
            value={quantity || 0}
            onChange={(e) => handleDirectEdit(index, 'quantity', e.target.value)}
            className="w-full h-8 text-center border rounded focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none"
            autoFocus
            onKeyDown={handleInputKeyDown}
          />
        ) : (
          <span className="cursor-text block w-full h-full py-1">{quantity}</span>
        )}
      </EditableTableCell>
    );
  }
);

QuantityCell.displayName = "QuantityCell";
