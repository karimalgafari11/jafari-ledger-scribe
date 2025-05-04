
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
  
  return (
    <TableCell className="text-center border border-gray-300 p-2">
      <EditableCell 
        active={activeSearchCell === cellId}
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
      {activeSearchCell !== cellId && (
        <div 
          className="cursor-pointer w-full min-h-[24px]" 
          onClick={() => handleCellClick(index, 'discount')}
        >
          {discount > 0 ? `${discount}${discountType === 'percentage' ? '%' : ' ر.س'}` : ""}
        </div>
      )}
    </TableCell>
  );
};
