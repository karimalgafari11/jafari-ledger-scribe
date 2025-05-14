
import React, { useState, useEffect, forwardRef, KeyboardEvent } from "react";
import { TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

interface UnitCellProps {
  unit?: string;
  index: number;
  isEditing: boolean;
  handleCellClick: (rowIndex: number, cellName: string) => void;
  handleDirectEdit: (index: number, field: string, value: any) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLTableCellElement>) => void;
  tabIndex?: number;
}

export const UnitCell = forwardRef<HTMLTableCellElement, UnitCellProps>(({
  unit = "قطعة",
  index,
  isEditing,
  handleCellClick,
  handleDirectEdit,
  onKeyDown,
  tabIndex
}, ref) => {
  const [inputValue, setInputValue] = useState(unit);
  
  useEffect(() => {
    if (isEditing) {
      setInputValue(unit);
    }
  }, [isEditing, unit]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  
  const handleBlur = () => {
    if (inputValue !== unit) {
      handleDirectEdit(index, 'unit', inputValue);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleDirectEdit(index, 'unit', inputValue);
    }
  };
  
  return (
    <TableCell 
      className="text-center border border-gray-300 p-2"
      onClick={() => handleCellClick(index, 'unit')}
      onKeyDown={onKeyDown}
      data-row-index={index}
      data-cell-name="unit"
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
        <span className="cursor-text">{unit}</span>
      )}
    </TableCell>
  );
});

UnitCell.displayName = "UnitCell";
