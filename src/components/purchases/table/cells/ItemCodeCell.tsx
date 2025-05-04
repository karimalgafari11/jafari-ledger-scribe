
import React, { useState, useRef, useEffect } from "react";
import { TableCell } from "@/components/ui/table";
import { InventoryPicker } from "../InventoryPicker";
import { Product } from "@/types/inventory";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ItemCodeCellProps {
  code: string;
  index: number;
  handleProductSelect: (product: Product, index?: number) => void;
  isAddingItem: boolean;
  editingItemIndex: number | null;
  handleDirectEdit: (index: number, field: string, value: any) => void;
}

export const ItemCodeCell: React.FC<ItemCodeCellProps> = ({ 
  code, 
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
  
  const handleCellClick = (e: React.MouseEvent) => {
    // Don't activate if in edit mode
    if (isAddingItem || editingItemIndex !== null) return;
    
    // Enable direct editing on double click
    if (isEditing) return;

    console.log("ItemCodeCell clicked at index", index);
    
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
    
    console.log("ItemCodeCell double clicked at index", index);
    
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
    console.log("Product selected from code cell:", product);
    handleProductSelect(product, index);
    setShowPicker(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleDirectEdit(index, 'code', e.target.value);
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
      className={`text-center border border-gray-300 p-2 ${isEditing ? '' : 'cursor-pointer hover:bg-blue-50'}`}
      onClick={handleCellClick}
      onDoubleClick={handleDoubleClick}
    >
      {isEditing ? (
        <Input
          ref={inputRef}
          className="w-full h-full text-center border-none p-0 focus:ring-2 focus:ring-blue-500"
          value={code}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        <div className="w-full h-full min-h-[24px] flex items-center justify-center gap-1">
          {code ? (
            code
          ) : (
            <>
              <Search className="h-3 w-3 text-gray-400" />
              <span className="text-gray-400">رمز الصنف</span>
            </>
          )}
        </div>
      )}
      
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
