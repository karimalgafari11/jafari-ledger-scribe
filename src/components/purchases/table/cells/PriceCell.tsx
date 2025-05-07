
import React from "react";
import { TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

interface PriceCellProps {
  price: number;
  index: number;
  isEditing: boolean;
  handleCellClick: (rowIndex: number, cellName: string) => void;
  handleDirectEdit: (index: number, field: string, value: any) => void;
}

export const PriceCell: React.FC<PriceCellProps> = ({
  price,
  index,
  isEditing,
  handleCellClick,
  handleDirectEdit
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    handleDirectEdit(index, 'price', value);
  };

  return (
    <TableCell className="text-center">
      {isEditing ? (
        <Input
          type="number"
          min="0"
          step="0.01"
          value={price}
          onChange={handleChange}
          className="w-full h-full border-none p-0 text-center focus:ring-2 focus:ring-blue-500"
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        <div 
          className="w-full h-full min-h-[24px] cursor-pointer flex items-center justify-center"
          onClick={() => handleCellClick(index, 'price')}
        >
          {price.toFixed(2)}
        </div>
      )}
    </TableCell>
  );
};
