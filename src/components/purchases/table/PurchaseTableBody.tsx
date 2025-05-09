
import React, { KeyboardEvent, useRef } from "react";
import { TableBody } from "@/components/ui/table";
import { PurchaseItem } from "@/types/purchases";
import { PurchaseItemRow } from "./rows/PurchaseItemRow";

interface PurchaseTableBodyProps {
  items: PurchaseItem[];
  activeSearchCell: { rowIndex: number; cellName: string } | null;
  handleCellClick: (rowIndex: number, cellName: string) => void;
  handleProductSelect: (product: any, index?: number) => void;
  handleDirectEdit: (index: number, field: string, value: any) => void;
  setActiveSearchCell: (cell: { rowIndex: number; cellName: string } | null) => void;
  setEditingItemIndex: (index: number | null) => void;
  onRemoveItem: (index: number) => void;
  searchInputRef: React.RefObject<HTMLInputElement>;
  isAddingItem: boolean;
  editingItemIndex: number | null;
  setIsAddingItem: (isAdding: boolean) => void;
  isEditingCell: (rowIndex: number, cellName: string) => boolean;
  showItemCodes?: boolean;
  showItemNotes?: boolean;
}

export const PurchaseTableBody: React.FC<PurchaseTableBodyProps> = ({
  items,
  activeSearchCell,
  handleCellClick,
  handleProductSelect,
  handleDirectEdit,
  setEditingItemIndex,
  onRemoveItem,
  isAddingItem,
  editingItemIndex,
  isEditingCell,
  showItemCodes = true,
  showItemNotes = true
}) => {
  // Create a reference array to store references to each cell
  const cellRefs = useRef<Map<string, HTMLTableCellElement>>(new Map());
  
  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent<HTMLTableCellElement>, rowIndex: number, cellName: string) => {
    const cellId = `${rowIndex}-${cellName}`;
    
    if (e.key === 'Enter') {
      // Activate cell for editing
      handleCellClick(rowIndex, cellName);
      e.preventDefault();
      return;
    }
    
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
      return;
    }
    
    e.preventDefault();
    
    const cellNames = ['code', 'name', 'unit', 'quantity', 'price', 'notes'];
    if (!showItemCodes) {
      cellNames.splice(cellNames.indexOf('code'), 1);
    }
    if (!showItemNotes) {
      cellNames.splice(cellNames.indexOf('notes'), 1);
    }
    
    let nextRowIndex = rowIndex;
    let nextCellIndex = cellNames.indexOf(cellName);
    
    switch (e.key) {
      case 'ArrowUp':
        nextRowIndex = Math.max(0, rowIndex - 1);
        break;
      case 'ArrowDown':
        nextRowIndex = Math.min(items.length - 1, rowIndex + 1);
        break;
      case 'ArrowLeft':
        nextCellIndex = Math.max(0, nextCellIndex - 1);
        break;
      case 'ArrowRight':
        nextCellIndex = Math.min(cellNames.length - 1, nextCellIndex + 1);
        break;
      case 'Tab':
        if (e.shiftKey) {
          nextCellIndex = Math.max(0, nextCellIndex - 1);
          if (nextCellIndex === 0 && rowIndex > 0) {
            nextRowIndex = rowIndex - 1;
            nextCellIndex = cellNames.length - 1;
          }
        } else {
          nextCellIndex = Math.min(cellNames.length - 1, nextCellIndex + 1);
          if (nextCellIndex === cellNames.length - 1 && rowIndex < items.length - 1) {
            nextRowIndex = rowIndex + 1;
            nextCellIndex = 0;
          }
        }
        break;
    }
    
    const nextCellName = cellNames[nextCellIndex];
    const nextCellId = `${nextRowIndex}-${nextCellName}`;
    
    // Focus the next cell
    const nextCell = cellRefs.current.get(nextCellId);
    if (nextCell) {
      nextCell.focus();
    }
  };
  
  return (
    <TableBody dir="rtl">
      {items.length === 0 ? (
        <tr>
          <td 
            colSpan={6 + (showItemCodes ? 1 : 0) + (showItemNotes ? 1 : 0)}
            className="text-center p-4 border border-gray-300 text-gray-500"
          >
            لا توجد أصناف بعد. انقر على زر "إضافة صنف" لإضافة أصناف للفاتورة.
          </td>
        </tr>
      ) : (
        items.map((item, index) => (
          <PurchaseItemRow
            key={item.id}
            item={item}
            index={index}
            activeSearchCell={activeSearchCell}
            handleCellClick={handleCellClick}
            handleProductSelect={handleProductSelect}
            handleDirectEdit={handleDirectEdit}
            isEditingCell={(rowIndex, cellName) => 
              isEditingCell && 
              activeSearchCell?.rowIndex === rowIndex && 
              activeSearchCell?.cellName === cellName
            }
            editingItemIndex={editingItemIndex}
            isAddingItem={isAddingItem}
            setEditingItemIndex={setEditingItemIndex}
            onRemoveItem={onRemoveItem}
            showItemCodes={showItemCodes}
            showItemNotes={showItemNotes}
            onKeyDown={handleKeyDown}
            cellRefs={cellRefs.current}
          />
        ))
      )}
    </TableBody>
  );
};
