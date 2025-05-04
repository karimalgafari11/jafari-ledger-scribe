
import React, { useState, useRef } from "react";
import { TableCell } from "@/components/ui/table";
import { InventoryPicker } from "../InventoryPicker";
import { Product } from "@/types/inventory";
import { Input } from "@/components/ui/input";

interface ItemNameCellProps {
  name: string;
  index: number;
  handleProductSelect: (product: Product, index?: number) => void;
  isAddingItem: boolean;
  editingItemIndex: number | null;
  handleDirectEdit: (index: number, field: string, value: any) => void;
}

export const ItemNameCell: React.FC<ItemNameCellProps> = ({ 
  name, 
  index, 
  handleProductSelect,
  isAddingItem,
  editingItemIndex,
  handleDirectEdit
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isEditing, setIsEditing] = useState(false);
  const cellRef = useRef<HTMLTableCellElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleCellClick = () => {
    // Don't activate if in edit mode
    if (isAddingItem || editingItemIndex !== null) return;
    
    // Enable direct editing on double click
    if (isEditing) return;

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

  const handleDoubleClick = () => {
    if (isAddingItem || editingItemIndex !== null) return;
    setIsEditing(true);
    setShowPicker(false);
    
    // Focus input after render
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }, 10);
  };
  
  const handleSelect = (product: Product) => {
    handleProductSelect(product, index);
    setShowPicker(false);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
    } else if (e.key === 'Escape') {
      setIsEditing(false);
    }
  };
  
  return (
    <TableCell 
      ref={cellRef}
      className={`border border-gray-300 p-2 ${isEditing ? '' : 'cursor-pointer hover:bg-gray-100'}`}
      onClick={handleCellClick}
      onDoubleClick={handleDoubleClick}
    >
      {isEditing ? (
        <Input
          ref={inputRef}
          className="w-full h-full border-none p-0 focus:ring-0"
          value={name}
          onChange={(e) => handleDirectEdit(index, 'name', e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        <div className="w-full h-full min-h-[24px] flex items-center">
          {name || ""}
        </div>
      )}
      
      {showPicker && (
        <InventoryPicker 
          position={position}
          onSelect={handleSelect}
          onClose={() => setShowPicker(false)}
          field="name"
        />
      )}
    </TableCell>
  );
};
