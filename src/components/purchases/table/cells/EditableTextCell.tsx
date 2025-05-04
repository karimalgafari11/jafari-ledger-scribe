
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
  
  return (
    <TableCell className="text-center border border-gray-300 p-2">
      <EditableCell 
        active={activeSearchCell === cellId}
        value={value}
        field={field}
        index={index}
        inputRef={inputRef}
        onChange={handleDirectEdit}
        onBlur={() => setActiveSearchCell(null)}
      />
      {activeSearchCell !== cellId && (
        <div 
          className="cursor-pointer w-full min-h-[24px]" 
          onClick={() => handleCellClick(index, field)}
        >
          {value || ""}
        </div>
      )}
    </TableCell>
  );
};
