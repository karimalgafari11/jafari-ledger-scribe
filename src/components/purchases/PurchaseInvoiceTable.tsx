
import React, { useState } from "react";
import { PurchaseItem } from "@/types/purchases";
import { Table } from "@/components/ui/table";
import { TableToolbar } from "./table/TableToolbar";
import { ItemFormContainer } from "./table/ItemFormContainer";
import { PurchaseTableBody } from "./table/PurchaseTableBody";
import { TableHeader } from "./table/TableHeader";
import { usePurchaseTable } from "@/hooks/purchases/table";
import { Product } from "@/types/inventory";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QuickProductSearch } from "./QuickProductSearch";

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
    handleCellClick,
    handleProductSelect,
    handleDirectEdit,
    handleTableClick,
    toggleGridLines,
    isEditingCell
  } = usePurchaseTable({
    items,
    onAddItem,
    onUpdateItem,
    onRemoveItem,
    isAddingItem,
    editingItemIndex,
    setEditingItemIndex
  });
  
  // State for product search modal
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // Handle product selection from the toolbar or quick search
  const handleToolbarProductSelect = (product: Product) => {
    console.log("Product selected from toolbar or quick search:", product);
    const newItem: Partial<PurchaseItem> = {
      id: uuidv4(),
      productId: product.id,
      code: product.code,
      name: product.name,
      quantity: 1,
      price: product.price,
      unit: product.unit || "قطعة",
      total: product.price
    };
    
    onAddItem(newItem);
    toast.success(`تمت إضافة ${product.name} إلى الفاتورة`);
    setIsSearchOpen(false);
  };
  
  const handleOpenSearch = () => {
    setIsSearchOpen(true);
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
  };
  
  return (
    <TooltipProvider>
      <div className="space-y-3" onClick={handleTableClick} ref={tableRef}>
        <TableToolbar
          isAddingItem={isAddingItem}
          editingItemIndex={editingItemIndex}
          setIsAddingItem={setIsAddingItem}
          handleProductSelect={handleOpenSearch}
          toggleGridLines={toggleGridLines}
          onToggleSearch={handleOpenSearch}
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
          <Table 
            className="min-w-full" 
            gridLines={true} 
            bordered={true} 
            striped={true}
            hoverable={true}
          >
            <TableHeader 
              showItemCodes={showItemCodes} 
              showItemNotes={showItemNotes} 
            />
            <PurchaseTableBody
              items={items}
              activeSearchCell={activeSearchCell}
              handleCellClick={handleCellClick}
              handleProductSelect={handleProductSelect}
              handleDirectEdit={handleDirectEdit}
              setActiveSearchCell={() => {}}
              setEditingItemIndex={setEditingItemIndex}
              onRemoveItem={onRemoveItem}
              isAddingItem={isAddingItem}
              editingItemIndex={editingItemIndex}
              searchInputRef={searchInputRef}
              setIsAddingItem={setIsAddingItem}
              isEditingCell={(rowIndex, cellName) => activeSearchCell?.rowIndex === rowIndex && activeSearchCell?.cellName === cellName}
              showItemCodes={showItemCodes}
              showItemNotes={showItemNotes}
            />
          </Table>
        </div>
        
        {/* Product Search Dialog */}
        {isSearchOpen && (
          <QuickProductSearch
            onClose={handleCloseSearch}
            onSelect={handleToolbarProductSelect}
          />
        )}
      </div>
    </TooltipProvider>
  );
};
