
import React from "react";
import { PurchaseItem } from "@/types/purchases";
import { Table } from "@/components/ui/table";
import { PurchaseTableHeader } from "./table/TableHeader";
import { TableToolbar } from "./table/TableToolbar";
import { ItemFormContainer } from "./table/ItemFormContainer";
import { PurchaseTableBody } from "./table/PurchaseTableBody";
import { usePurchaseTable } from "@/hooks/purchases/table";

interface PurchaseInvoiceTableProps {
  items: PurchaseItem[];
  isAddingItem: boolean;
  editingItemIndex: number | null;
  setIsAddingItem: (isAdding: boolean) => void;
  setEditingItemIndex: (index: number | null) => void;
  onAddItem: (item: Partial<PurchaseItem>) => void;
  onUpdateItem: (index: number, item: Partial<PurchaseItem>) => void;
  onRemoveItem: (index: number) => void;
  showItemCodes?: boolean;
  showItemNotes?: boolean;
}

export const PurchaseInvoiceTable: React.FC<PurchaseInvoiceTableProps> = ({
  items,
  isAddingItem,
  editingItemIndex,
  setIsAddingItem,
  setEditingItemIndex,
  onAddItem,
  onUpdateItem,
  onRemoveItem,
  showItemCodes = true,
  showItemNotes = true
}) => {
  const {
    activeSearchCell,
    showGridLines,
    searchInputRef,
    tableRef,
    isEditingCell,
    handleCellClick,
    handleProductSelect,
    handleDirectEdit,
    handleTableClick,
    toggleGridLines,
    setActiveSearchCell
  } = usePurchaseTable({
    items,
    onAddItem,
    onUpdateItem,
    onRemoveItem,
    isAddingItem,
    editingItemIndex
  });
  
  return (
    <div className="space-y-3" onClick={handleTableClick} ref={tableRef}>
      <TableToolbar
        isAddingItem={isAddingItem}
        editingItemIndex={editingItemIndex}
        setIsAddingItem={setIsAddingItem}
        handleProductSelect={handleProductSelect}
        toggleGridLines={toggleGridLines}
      />
      
      {/* Form for adding or editing items */}
      <ItemFormContainer
        isAddingItem={isAddingItem}
        editingItemIndex={editingItemIndex}
        items={items}
        onAddItem={onAddItem}
        onUpdateItem={onUpdateItem}
        setIsAddingItem={setIsAddingItem}
        setEditingItemIndex={setEditingItemIndex}
      />
      
      {/* Items table */}
      <div className="border rounded overflow-auto rtl">
        <Table className="min-w-full border-collapse" gridLines={showGridLines} striped bordered hoverable>
          <PurchaseTableHeader showItemCodes={showItemCodes} showItemNotes={showItemNotes} />
          <PurchaseTableBody
            items={items}
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
            setIsAddingItem={setIsAddingItem}
            isEditingCell={isEditingCell}
            showItemCodes={showItemCodes}
            showItemNotes={showItemNotes}
          />
        </Table>
      </div>
    </div>
  );
};
