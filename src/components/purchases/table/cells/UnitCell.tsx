
import React from "react";
import { TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

interface UnitCellProps {
  unit?: string;
  index: number;
  isEditing: boolean;
  handleCellClick: (rowIndex: number, cellName: string) => void;
  handleDirectEdit: (index: number, field: string, value: any) => void;
}

export const UnitCell: React.FC<UnitCellProps> = ({
  unit,
  index,
  isEditing,
  handleCellClick,
  handleDirectEdit
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleDirectEdit(index, 'unit', e.target.value);
  };

  return (
    <TableCell className="text-center">
      {isEditing ? (
        <Input
          value={unit || ''}
          onChange={handleChange}
          className="w-full h-full border-none p-0 text-center focus:ring-2 focus:ring-blue-500"
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        <div 
          className="w-full h-full min-h-[24px] cursor-pointer flex items-center justify-center"
          onClick={() => handleCellClick(index, 'unit')}
        >
          {unit || 'قطعة'}
        </div>
      )}
    </TableCell>
  );
};
