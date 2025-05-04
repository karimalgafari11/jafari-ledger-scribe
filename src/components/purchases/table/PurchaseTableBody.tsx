
import React from "react";
import { TableBody } from "@/components/ui/table";
import { PurchaseItem } from "@/types/purchases";
import { ItemRow } from "./ItemRow";
import { EmptyTableRow } from "./EmptyTableRow";
import { PaddingRows } from "./PaddingRows";

interface PurchaseTableBodyProps {
  items: PurchaseItem[];
  activeSearchCell: string | null;
  handleCellClick: (index: number, field: string) => void;
  handleProductSelect: (product: any, index?: number) => void;
  handleDirectEdit: (index: number, field: any, value: any) => void;
  setActiveSearchCell: (cellId: string | null) => void;
  setEditingItemIndex: (index: number | null) => void;
  onRemoveItem: (index: number) => void;
  isAddingItem: boolean;
  editingItemIndex: number | null;
  searchInputRef: React.RefObject<HTMLInputElement>;
  setIsAddingItem: (isAdding: boolean) => void;
  isEditingCell?: boolean;
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
  isEditingCell
}) => {
  const MIN_ROWS = 10; // Minimum number of visible rows
  
  return (
    <TableBody>
      {items.length === 0 ? (
        <EmptyTableRow />
      ) : (
        <>
          {items.map((item, index) => (
            <ItemRow 
              key={item.id || index}
              item={item}
              index={index}
              activeSearchCell={activeSearchCell}
              handleCellClick={handleCellClick}
              handleProductSelect={handleProductSelect}
              handleDirectEdit={handleDirectEdit}
              setActiveSearchCell={setActiveSearchCell}
              setEditingItemIndex={setEditingItemIndex}
              onRemoveItem={onRemoveItem}
              isAddingItem={isAddingItem}
              editingItemIndex={editingItemIndex}
              searchInputRef={searchInputRef}
            />
          ))}
          
          {/* Add padding rows if needed */}
          <PaddingRows currentItemCount={items.length} totalRows={MIN_ROWS} />
        </>
      )}
    </TableBody>
  );
};
