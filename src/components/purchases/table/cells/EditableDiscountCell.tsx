
import React from "react";
import { TableCell } from "@/components/ui/table";
import { EditableCell } from "../EditableCell";

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
  
  return (
    <TableCell 
      className={`text-center border border-gray-300 p-2 ${isActive ? 'bg-blue-50 ring-2 ring-blue-300' : 'hover:bg-gray-100'}`}
      onClick={(e) => {
        e.stopPropagation();
        handleCellClick(index, 'discount');
      }}
    >
      <EditableCell 
        active={isActive}
        value={discount}
        type="number"
        min="0"
        step="0.01"
        field="discount"
        index={index}
        inputRef={inputRef}
        onChange={handleDirectEdit}
        onBlur={() => setActiveSearchCell(null)}
        discountType={discountType}
        onDiscountTypeChange={onDiscountTypeChange}
      />
      {!isActive && (
        <div 
          className="cursor-pointer w-full min-h-[24px] flex items-center justify-center"
        >
          {discount > 0 ? `${discount}${discountType === 'percentage' ? '%' : ' ر.س'}` : ""}
        </div>
      )}
    </TableCell>
  );
};

