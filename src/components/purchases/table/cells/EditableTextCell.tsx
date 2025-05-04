
import React from "react";
import { TableCell } from "@/components/ui/table";
import { EditableCell } from "../EditableCell";

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
  
  return (
    <TableCell 
      className={`text-center border border-gray-300 p-2 ${isActive ? 'bg-blue-50 ring-2 ring-blue-300' : 'hover:bg-gray-100'}`}
      onClick={(e) => {
        e.stopPropagation();
        handleCellClick(index, field);
      }}
    >
      <EditableCell 
        active={isActive}
        value={value}
        field={field}
        index={index}
        inputRef={inputRef}
        onChange={handleDirectEdit}
        onBlur={() => setActiveSearchCell(null)}
      />
      {!isActive && (
        <div 
          className="cursor-pointer w-full min-h-[24px] flex items-center justify-center"
        >
          {value || ""}
        </div>
      )}
    </TableCell>
  );
};

