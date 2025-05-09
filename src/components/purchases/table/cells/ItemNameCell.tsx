
import React, { useState, forwardRef, KeyboardEvent } from "react";
import { TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

interface ItemNameCellProps {
  name: string;
  index: number;
  isEditing: boolean;
  handleCellClick: (rowIndex: number, cellName: string) => void;
  handleDirectEdit: (index: number, field: string, value: any) => void;
  handleProductSelect: (product: any, index?: number) => void;
  editingItemIndex: number | null;
  isAddingItem: boolean;
  onKeyDown?: (e: KeyboardEvent<HTMLTableCellElement>) => void;
  tabIndex?: number;
}

export const ItemNameCell = forwardRef<HTMLTableCellElement, ItemNameCellProps>(({
  name,
  index,
  isEditing,
  handleCellClick,
  handleDirectEdit,
  handleProductSelect,
  editingItemIndex,
  isAddingItem,
  onKeyDown,
  tabIndex
}, ref) => {
  const [inputValue, setInputValue] = useState(name);
  
  React.useEffect(() => {
    if (isEditing) {
      setInputValue(name);
    }
  }, [isEditing, name]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  
  const handleBlur = () => {
    if (inputValue !== name) {
      handleDirectEdit(index, 'name', inputValue);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleDirectEdit(index, 'name', inputValue);
    }
  };
  
  return (
    <TableCell 
      className="border border-gray-300 p-2"
      onClick={() => handleCellClick(index, 'name')}
      onKeyDown={onKeyDown}
      data-row-index={index}
      data-cell-name="name"
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
          className="h-8"
          autoFocus
        />
      ) : (
        <span className="cursor-text font-medium">{name || "انقر لإضافة اسم"}</span>
      )}
    </TableCell>
  );
});

ItemNameCell.displayName = "ItemNameCell";
