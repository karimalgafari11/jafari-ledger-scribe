
import React, { useRef, useEffect } from "react";
import { TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

interface EditableTextCellProps {
  value: string;
  field: string;
  index: number;
  activeSearchCell: string | null;
  handleCellClick: (index: number, field: string) => void;
  handleDirectEdit: (index: number, field: any, value: any) => void;
  setActiveSearchCell: (cellId: string | null) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

export const EditableTextCell: React.FC<EditableTextCellProps> = ({ 
  value,
  field,
  index,
  activeSearchCell,
  handleCellClick,
  handleDirectEdit,
  setActiveSearchCell,
  inputRef
}) => {
  const cellId = `${field}-${index}`;
  const isActive = activeSearchCell === cellId;
  const cellInputRef = useRef<HTMLInputElement>(null);
  
  const handleCellClickInternal = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(`EditableTextCell clicked: field=${field}, index=${index}`);
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
    handleDirectEdit(index, field, e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      e.preventDefault();
      setActiveSearchCell(null);
    } else if (e.key === 'Tab') {
      // Don't close the cell on Tab, allow natural tab navigation
      // The blur handler will take care of closing this cell
      return;
    }
  };

  return (
    <TableCell 
      className={`text-center border border-gray-300 p-2 editable-cell cursor-pointer transition-all duration-150 
      ${isActive ? 'bg-blue-50 ring-2 ring-blue-300' : 'hover:bg-blue-100'}`}
      onClick={handleCellClickInternal}
      title="انقر للتعديل"
    >
      {isActive ? (
        <Input
          ref={cellInputRef}
          className="w-full border-none focus:ring-2 focus:ring-blue-400 p-1 text-center"
          value={value}
          onChange={handleChange}
          onBlur={() => setTimeout(() => setActiveSearchCell(null), 100)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <div 
          className="cursor-pointer w-full min-h-[24px] flex items-center justify-center p-1 transition-colors duration-150 rounded hover:bg-blue-50"
          onClick={handleCellClickInternal}
        >
          {value || 
            <span className="text-gray-400 text-sm bg-gray-100 px-2 py-1 rounded-md">اضغط للتعديل</span>
          }
        </div>
      )}
    </TableCell>
  );
};
