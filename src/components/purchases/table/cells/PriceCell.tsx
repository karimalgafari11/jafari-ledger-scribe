
import React, { useState, useEffect } from "react";
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
  const [inputValue, setInputValue] = useState(price.toString());
  
  useEffect(() => {
    if (isEditing) {
      setInputValue(price.toString());
    }
  }, [isEditing, price]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers and decimal point
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setInputValue(value);
  };
  
  const handleBlur = () => {
    const numValue = parseFloat(inputValue);
    if (!isNaN(numValue) && numValue !== price) {
      handleDirectEdit(index, 'price', numValue);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const numValue = parseFloat(inputValue);
      if (!isNaN(numValue)) {
        handleDirectEdit(index, 'price', numValue);
      }
    }
  };
  
  return (
    <TableCell 
      className="text-center border border-gray-300 p-2"
      onClick={() => handleCellClick(index, 'price')}
      data-row-index={index}
      data-cell-name="price"
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
        <span className="cursor-text">{price.toFixed(2)}</span>
      )}
    </TableCell>
  );
};
