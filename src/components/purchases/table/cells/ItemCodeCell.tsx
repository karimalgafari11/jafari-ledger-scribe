
import React, { useState, useEffect, forwardRef, KeyboardEvent } from "react";
import { TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

interface ItemCodeCellProps {
  code: string;
  index: number;
  isEditing: boolean;
  handleCellClick: (rowIndex: number, cellName: string) => void;
  handleDirectEdit: (index: number, field: string, value: any) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLTableCellElement>) => void;
  tabIndex?: number;
}

export const ItemCodeCell = forwardRef<HTMLTableCellElement, ItemCodeCellProps>(({
  code = "",
  index,
  isEditing,
  handleCellClick,
  handleDirectEdit,
  onKeyDown,
  tabIndex
}, ref) => {
  const [inputValue, setInputValue] = useState(code);
  
  useEffect(() => {
    if (isEditing) {
      setInputValue(code);
    }
  }, [isEditing, code]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  
  const handleBlur = () => {
    if (inputValue !== code) {
      handleDirectEdit(index, 'code', inputValue);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleDirectEdit(index, 'code', inputValue);
    }
  };
  
  return (
    <TableCell 
      className="text-center border border-gray-300 p-2"
      onClick={() => handleCellClick(index, 'code')}
      onKeyDown={onKeyDown}
      data-row-index={index}
      data-cell-name="code"
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
          className="h-8 text-center"
          autoFocus
        />
      ) : (
        <span className="cursor-text">{code || "—"}</span>
      )}
    </TableCell>
  );
});

ItemCodeCell.displayName = "ItemCodeCell";
