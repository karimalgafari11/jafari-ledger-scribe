
import React, { useRef, useEffect } from "react";
import { TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

interface EditableNumberCellProps {
  value: number;
  field: string;
  index: number;
  activeSearchCell: string | null;
  handleCellClick: (index: number, field: string) => void;
  handleDirectEdit: (index: number, field: any, value: any) => void;
  setActiveSearchCell: (cellId: string | null) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  min?: string;
  step?: string;
  showPercentageSymbol?: boolean;
  displayValue?: string;
  displaySuffix?: string;
}

export const EditableNumberCell: React.FC<EditableNumberCellProps> = ({ 
  value,
  field,
  index,
  activeSearchCell,
  handleCellClick,
  handleDirectEdit,
  setActiveSearchCell,
  inputRef,
  min = "0",
  step = "0.01",
  showPercentageSymbol = false,
  displayValue,
  displaySuffix
}) => {
  const cellId = `${field}-${index}`;
  const isActive = activeSearchCell === cellId;
  const cellInputRef = useRef<HTMLInputElement>(null);
  
  const handleCellClickInternal = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(`EditableNumberCell clicked: field=${field}, index=${index}`);
    handleCellClick(index, field);
  };

  // Focus input when cell becomes active
  useEffect(() => {
    if (isActive && cellInputRef.current) {
      setTimeout(() => {
        cellInputRef.current?.focus();
        cellInputRef.current?.select();
      }, 10);
    }
  }, [isActive]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value === '' ? 0 : Number(e.target.value);
    handleDirectEdit(index, field, newValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      e.preventDefault();
      setActiveSearchCell(null);
    }
  };

  return (
    <TableCell 
      className={`text-center border border-gray-300 p-2 editable-cell ${isActive ? 'bg-blue-50 ring-2 ring-blue-300' : 'hover:bg-blue-50'}`}
      onClick={handleCellClickInternal}
    >
      {isActive ? (
        <Input
          ref={cellInputRef}
          type="number"
          min={min}
          step={step}
          className="w-full border-none focus:ring-0 p-1 text-center"
          value={value === 0 ? '' : value}
          onChange={handleChange}
          onBlur={() => setActiveSearchCell(null)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <div 
          className="cursor-pointer w-full min-h-[24px] flex items-center justify-center"
          onClick={handleCellClickInternal}
        >
          {value > 0 ? (
            <>
              {displayValue || value.toString()}
              {displaySuffix || ""}
            </>
          ) : (
            <span className="text-gray-400 text-sm">اضغط للتعديل</span>
          )}
        </div>
      )}
    </TableCell>
  );
};
