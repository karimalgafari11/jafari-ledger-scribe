
import React from "react";
import { TableCell } from "@/components/ui/table";
import { EditableCell } from "../EditableCell";

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
  
  const handleCellClickInternal = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleCellClick(index, field);
  };

  return (
    <TableCell 
      className={`text-center border border-gray-300 p-2 editable-cell ${isActive ? 'bg-blue-50 ring-2 ring-blue-300' : 'hover:bg-gray-100'}`}
      onClick={handleCellClickInternal}
    >
      <EditableCell 
        active={isActive}
        value={value}
        type="number"
        min={min}
        step={step}
        field={field}
        index={index}
        inputRef={inputRef}
        onChange={handleDirectEdit}
        onBlur={() => setActiveSearchCell(null)}
        showPercentageSymbol={showPercentageSymbol}
      />
      {!isActive && (
        <div 
          className="cursor-pointer w-full min-h-[24px] flex items-center justify-center"
          onClick={handleCellClickInternal}
        >
          {displayValue || value.toString()}
          {displaySuffix || ""}
        </div>
      )}
    </TableCell>
  );
};
