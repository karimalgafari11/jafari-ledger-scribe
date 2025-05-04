
import React, { useState, useRef, useEffect } from "react";
import { TableCell } from "@/components/ui/table";
import { InventoryPicker } from "../InventoryPicker";
import { Product } from "@/types/inventory";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

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
  
  // Better visibility for editable cells
  const handleCellClick = (e: React.MouseEvent) => {
    // Don't activate if in edit mode
    if (isAddingItem || editingItemIndex !== null) return;
    
    // Enable direct editing on double click
    if (isEditing) return;

    console.log("ItemNameCell clicked at index", index);

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

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAddingItem || editingItemIndex !== null) return;
    
    console.log("ItemNameCell double clicked at index", index);
    
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
    console.log("Product selected:", product);
    handleProductSelect(product, index);
    setShowPicker(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleDirectEdit(index, 'name', e.target.value);
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

  // Close picker if we click elsewhere
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (showPicker && cellRef.current && !cellRef.current.contains(e.target as Node)) {
        setShowPicker(false);
      }
    };
    
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [showPicker]);
  
  return (
    <TableCell 
      ref={cellRef}
      className={`border border-gray-300 p-2 ${isEditing ? '' : 'cursor-pointer hover:bg-blue-50'}`}
      onClick={handleCellClick}
      onDoubleClick={handleDoubleClick}
    >
      {isEditing ? (
        <Input
          ref={inputRef}
          className="w-full h-full border-none p-0 focus:ring-2 focus:ring-blue-500"
          value={name}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        <div className="w-full h-full min-h-[24px] flex items-center gap-2">
          <Search className="h-3 w-3 text-gray-400 flex-shrink-0" />
          <span className={name ? '' : 'text-gray-400'}>
            {name || "انقر لاختيار المنتج"}
          </span>
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
