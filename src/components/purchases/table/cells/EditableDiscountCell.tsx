
import React, { useRef, useEffect, useState } from "react";
import { TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EditableDiscountCellProps {
  discount: number;
  discountType: 'percentage' | 'fixed';
  index: number;
  activeSearchCell: string | null;
  handleCellClick: (index: number, field: string) => void;
  handleDirectEdit: (index: number, field: any, value: any) => void;
  setActiveSearchCell: (cellId: string | null) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  onDiscountTypeChange: (value: 'percentage' | 'fixed') => void;
}

export const EditableDiscountCell: React.FC<EditableDiscountCellProps> = ({ 
  discount,
  discountType,
  index,
  activeSearchCell,
  handleCellClick,
  handleDirectEdit,
  setActiveSearchCell,
  inputRef,
  onDiscountTypeChange
}) => {
  const cellId = `discount-${index}`;
  const isActive = activeSearchCell === cellId;
  const cellInputRef = useRef<HTMLInputElement>(null);
  const [localDiscount, setLocalDiscount] = useState<number>(discount);
  
  // Update local state when discount changes externally
  useEffect(() => {
    setLocalDiscount(discount);
  }, [discount]);
  
  const handleCellClickInternal = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(`EditableDiscountCell clicked: index=${index}`);
    handleCellClick(index, 'discount');
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
    setLocalDiscount(newValue);
    handleDirectEdit(index, 'discount', newValue);
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
        <div className="flex items-center gap-1">
          <Input
            ref={cellInputRef}
            type="number"
            min="0"
            step="0.01"
            className="w-3/4 border-none focus:ring-0 p-1 text-center"
            value={localDiscount === 0 ? '' : localDiscount}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <Select 
            value={discountType}
            onValueChange={(value) => onDiscountTypeChange(value as 'percentage' | 'fixed')}
          >
            <SelectTrigger className="w-1/4 border-none h-8 px-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="percentage">%</SelectItem>
              <SelectItem value="fixed">ر.س</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ) : (
        <div 
          className="cursor-pointer w-full min-h-[24px] flex items-center justify-center"
          onClick={handleCellClickInternal}
        >
          {discount > 0 ? (
            `${discount}${discountType === 'percentage' ? '%' : ' ر.س'}`
          ) : (
            <span className="text-gray-400 text-sm">خصم</span>
          )}
        </div>
      )}
    </TableCell>
  );
};
