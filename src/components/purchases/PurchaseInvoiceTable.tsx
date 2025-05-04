import React, { useState, useRef } from "react";
import { PurchaseItem } from "@/types/purchases";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { PurchaseItemForm } from "./PurchaseItemForm";
import { PurchaseTableHeader } from "./table/TableHeader";
import { ItemRow } from "./table/ItemRow";
import { QuickAddRow } from "./table/QuickAddRow";
import { EmptyTableRow } from "./table/EmptyTableRow";
import { TableToolbar } from "./table/TableToolbar";
import { useInventoryProducts } from "@/hooks/useInventoryProducts";

interface PurchaseInvoiceTableProps {
  items: PurchaseItem[];
  isAddingItem: boolean;
  editingItemIndex: number | null;
  setIsAddingItem: (isAdding: boolean) => void;
  setEditingItemIndex: (index: number | null) => void;
  onAddItem: (item: Partial<PurchaseItem>) => void;
  onUpdateItem: (index: number, item: Partial<PurchaseItem>) => void;
  onRemoveItem: (index: number) => void;
}

export const PurchaseInvoiceTable: React.FC<PurchaseInvoiceTableProps> = ({
  items,
  isAddingItem,
  editingItemIndex,
  setIsAddingItem,
  setEditingItemIndex,
  onAddItem,
  onUpdateItem,
  onRemoveItem
}) => {
  const { products } = useInventoryProducts();
  const [activeSearchCell, setActiveSearchCell] = useState<string | null>(null);
  const [showGridLines, setShowGridLines] = useState<'both' | 'horizontal' | 'vertical' | 'none'>('both');
  const [isDenseView, setIsDenseView] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  
  // Handle product search activation in table
  const handleCellClick = (index: number, field: string) => {
    if (isAddingItem || editingItemIndex !== null) return;
    
    // Generate a unique ID for the cell
    const cellId = `${field}-${index}`;
    setActiveSearchCell(cellId);
    
    // Focus the search input after rendering
    setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, 10);
  };
  
  // Handle product selection from search
  const handleProductSelect = (product: any, index?: number) => {
    if (index !== undefined) {
      // Update existing item
      const updatedItem = {
        ...items[index],
        productId: product.id,
        code: product.code,
        name: product.name,
        price: product.price,
        total: items[index].quantity * product.price
      };
      onUpdateItem(index, updatedItem);
    } else {
      // Add new item
      const newItem = {
        productId: product.id,
        code: product.code,
        name: product.name,
        price: product.price,
        quantity: 1,
        total: product.price
      };
      onAddItem(newItem);
    }
    setActiveSearchCell(null);
  };
  
  // Handle direct edit of cell value
  const handleDirectEdit = (index: number, field: keyof PurchaseItem, value: any) => {
    const updatedItem = { ...items[index], [field]: value };
    
    // Recalculate total if quantity or price changed
    if (field === 'quantity' || field === 'price') {
      updatedItem.total = updatedItem.quantity * updatedItem.price;
    }
    
    onUpdateItem(index, updatedItem);
  };
  
  // Reset active search cell when user clicks away
  const handleTableClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    // Only close if clicking outside the search cells
    if (!target.closest('.search-cell') && !target.closest('.product-search-dropdown')) {
      setActiveSearchCell(null);
    }
  };
  
  // Toggle table display settings
  const toggleGridLines = () => {
    const options: Array<'both' | 'horizontal' | 'vertical' | 'none'> = ['both', 'horizontal', 'vertical', 'none'];
    const currentIndex = options.indexOf(showGridLines);
    const nextIndex = (currentIndex + 1) % options.length;
    setShowGridLines(options[nextIndex]);
  };
  
  return (
    <div className="space-y-3" onClick={handleTableClick} ref={tableRef}>
      <TableToolbar
        isAddingItem={isAddingItem}
        editingItemIndex={editingItemIndex}
        setIsAddingItem={setIsAddingItem}
        handleProductSelect={handleProductSelect}
        toggleGridLines={toggleGridLines}
      />
      
      {/* نموذج إضافة أو تحرير صنف */}
      {(isAddingItem || editingItemIndex !== null) && (
        <PurchaseItemForm 
          item={editingItemIndex !== null ? items[editingItemIndex] : undefined} 
          onSubmit={item => {
            if (editingItemIndex !== null) {
              onUpdateItem(editingItemIndex, item);
              setEditingItemIndex(null);
            } else {
              onAddItem(item);
              setIsAddingItem(false);
            }
          }} 
          onCancel={() => {
            setIsAddingItem(false);
            setEditingItemIndex(null);
          }} 
        />
      )}
      
      {/* جدول الأصناف */}
      <div className="border rounded overflow-auto">
        <Table className="min-w-full border-collapse" gridLines={showGridLines} striped bordered hoverable>
          <PurchaseTableHeader />
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
                
                {/* إضافة صفوف فارغة إذا كان عدد الأصناف أقل من 10 */}
                {items.length > 0 && items.length < 10 && (
                  Array.from({ length: 10 - items.length }, (_, index) => (
                    <TableRow key={`empty-padding-row-${index}`} className={(items.length + index) % 2 === 0 ? "bg-gray-50" : ""}>
                      <TableCell className="text-center border border-gray-300 p-2 font-bold text-lg">
                        {items.length + index + 1}
                      </TableCell>
                      <TableCell className="border border-gray-300 p-2"></TableCell>
                      <TableCell className="text-center border border-gray-300 p-2"></TableCell>
                      <TableCell className="text-center border border-gray-300 p-2"></TableCell>
                      <TableCell className="text-center border border-gray-300 p-2"></TableCell>
                      <TableCell className="text-center border border-gray-300 p-2"></TableCell>
                      <TableCell className="text-center border border-gray-300 p-2"></TableCell>
                      <TableCell className="text-center border border-gray-300 p-2"></TableCell>
                      <TableCell className="text-center border border-gray-300 p-2"></TableCell>
                      <TableCell className="text-center border border-gray-300 p-2 font-bold"></TableCell>
                      <TableCell className="border border-gray-300 p-2"></TableCell>
                      <TableCell className="text-center border border-gray-300 p-2 print:hidden"></TableCell>
                    </TableRow>
                  ))
                )}
              </>
            )}
            
            {/* Empty row for quick add */}
            {!isAddingItem && editingItemIndex === null && (
              <QuickAddRow 
                itemsLength={items.length}
                activeSearchCell={activeSearchCell}
                handleCellClick={handleCellClick}
                handleProductSelect={handleProductSelect}
                searchInputRef={searchInputRef}
              />
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
