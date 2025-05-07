
import React from "react";
import { TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

interface ItemNameCellProps {
  name: string;
  index: number;
  handleProductSelect: (product: any, index?: number) => void;
  isAddingItem: boolean;
  editingItemIndex: number | null;
  handleDirectEdit: (index: number, field: string, value: any) => void;
  isEditing: boolean;
  handleCellClick: (rowIndex: number, cellName: string) => void;
}

export const ItemNameCell: React.FC<ItemNameCellProps> = ({
  name,
  index,
  handleProductSelect,
  isAddingItem,
  editingItemIndex,
  handleDirectEdit,
  isEditing,
  handleCellClick
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleDirectEdit(index, 'name', e.target.value);
  };

  return (
    <TableCell>
      {isEditing ? (
        <Input
          value={name || ''}
          onChange={handleChange}
          className="w-full h-full border-none p-0 focus:ring-2 focus:ring-blue-500"
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        <div 
          className="w-full h-full min-h-[24px] cursor-pointer flex items-center"
          onClick={() => handleCellClick(index, 'name')}
        >
          {name || ''}
        </div>
      )}
    </TableCell>
  );
};
