
import React from "react";
import { TableBody } from "@/components/ui/table";
import { PurchaseItem } from "@/types/purchases";
import { PurchaseItemRow } from "./rows/PurchaseItemRow";
import { EmptyTableRow } from "./rows/EmptyTableRow";

interface PurchaseTableBodyProps {
  items: PurchaseItem[];
  activeSearchCell: { rowIndex: number; cellName: string } | null;
  handleCellClick: (rowIndex: number, cellName: string) => void;
  handleProductSelect: (product: any, index?: number) => void;
  handleDirectEdit: (index: number, field: string, value: any) => void;
  setActiveSearchCell: (cell: { rowIndex: number; cellName: string } | null) => void;
  setEditingItemIndex: (index: number | null) => void;
  onRemoveItem: (index: number) => void;
  isAddingItem: boolean;
  editingItemIndex: number | null;
  searchInputRef: React.RefObject<HTMLInputElement>;
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
  setActiveSearchCell,
  setEditingItemIndex,
  onRemoveItem,
  isAddingItem,
  editingItemIndex,
  searchInputRef,
  setIsAddingItem,
  isEditingCell,
  showItemCodes = true,
  showItemNotes = true
}) => {
  // Calculate colspan based on display settings
  const totalColumns = showItemCodes && showItemNotes ? 9 : 
                      (showItemCodes || showItemNotes) ? 8 : 7;
  
  return (
    <TableBody>
      {items.length === 0 ? (
        <EmptyTableRow 
          colSpan={totalColumns} 
          isAddingItem={isAddingItem} 
        />
      ) : (
        items.map((item, index) => (
          <PurchaseItemRow
            key={item.id || index}
            item={item}
            index={index}
            activeSearchCell={activeSearchCell}
            handleCellClick={handleCellClick}
            handleProductSelect={handleProductSelect}
            handleDirectEdit={handleDirectEdit}
            isEditingCell={isEditingCell}
            editingItemIndex={editingItemIndex}
            isAddingItem={isAddingItem}
            setEditingItemIndex={setEditingItemIndex}
            onRemoveItem={onRemoveItem}
            showItemCodes={showItemCodes}
            showItemNotes={showItemNotes}
          />
        ))
      )}
    </TableBody>
  );
};
