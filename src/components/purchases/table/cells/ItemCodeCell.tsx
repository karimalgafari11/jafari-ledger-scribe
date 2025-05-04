
import React, { useState, useRef } from "react";
import { TableCell } from "@/components/ui/table";
import { InventoryPicker } from "../InventoryPicker";
import { Product } from "@/types/inventory";

interface ItemCodeCellProps {
  code: string;
  index: number;
  handleProductSelect: (product: Product, index?: number) => void;
  isAddingItem: boolean;
  editingItemIndex: number | null;
}

export const ItemCodeCell: React.FC<ItemCodeCellProps> = ({ 
  code, 
  index, 
  handleProductSelect,
  isAddingItem,
  editingItemIndex
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const cellRef = useRef<HTMLTableCellElement>(null);
  
  const handleCellClick = () => {
    // Don't activate if in edit mode
    if (isAddingItem || editingItemIndex !== null) return;
    
    // Calculate position for the picker
    if (cellRef.current) {
      const rect = cellRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX
      });
    }
    
    setShowPicker(true);
  };
  
  const handleSelect = (product: Product) => {
    handleProductSelect(product, index);
    setShowPicker(false);
  };
  
  return (
    <TableCell 
      ref={cellRef}
      className="text-center border border-gray-300 p-2 cursor-pointer hover:bg-gray-100"
      onClick={handleCellClick}
    >
      <div className="w-full h-full min-h-[24px] flex items-center justify-center">
        {code || ""}
      </div>
      
      {showPicker && (
        <InventoryPicker 
          position={position}
          onSelect={handleSelect}
          onClose={() => setShowPicker(false)}
          field="code"
          initialSearchTerm={code || ""}
        />
      )}
    </TableCell>
  );
};
