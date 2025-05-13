
import { useCallback } from "react";
import { PurchaseItem } from "@/types/purchases";
import { Product } from "@/types/inventory";

interface UseCellEditingProps {
  items: PurchaseItem[];
  onUpdateItem: (index: number, item: Partial<PurchaseItem>) => void;
  isAddingItem: boolean;
  editingItemIndex: number | null;
  setActiveSearchCell: (cell: { rowIndex: number; cellName: string } | null) => void;
  setIsEditingCell: (isEditing: boolean) => void;
  setLastSelectedRowIndex: (index: number | null) => void;
}

export function useCellEditing({
  items,
  onUpdateItem,
  isAddingItem,
  editingItemIndex,
  setActiveSearchCell,
  setIsEditingCell,
  setLastSelectedRowIndex
}: UseCellEditingProps) {
  
  // Handle cell click for editing
  const handleCellClick = useCallback((rowIndex: number, cellName: string) => {
    if (isAddingItem || editingItemIndex !== null) {
      return; // Don't allow cell editing when adding or editing a row
    }
    
    setActiveSearchCell({ rowIndex, cellName });
    setIsEditingCell(true);
    setLastSelectedRowIndex(rowIndex);
  }, [isAddingItem, editingItemIndex, setActiveSearchCell, setIsEditingCell, setLastSelectedRowIndex]);

  // Handle direct cell editing
  const handleDirectEdit = useCallback((index: number, field: string, value: any) => {
    // For quantity and price, update the total as well
    if (field === 'quantity' || field === 'price') {
      const item = items[index];
      const newQuantity = field === 'quantity' ? value : item.quantity;
      const newPrice = field === 'price' ? value : item.price;
      const newTotal = newQuantity * newPrice;
      
      onUpdateItem(index, {
        [field]: value,
        total: newTotal
      });
    } else {
      onUpdateItem(index, { [field]: value });
    }
    
    // Close the active cell after editing
    setActiveSearchCell(null);
    setIsEditingCell(false);
  }, [items, onUpdateItem, setActiveSearchCell, setIsEditingCell]);

  // Handle product selection from search
  const handleProductSelect = useCallback((product: Product, index?: number) => {
    if (typeof index === 'number') {
      const item = items[index];
      
      onUpdateItem(index, {
        productId: product.id,
        code: product.code,
        name: product.name,
        price: product.price || item.price,
        total: (product.price || item.price) * item.quantity
      });
      
      setActiveSearchCell(null);
      setIsEditingCell(false);
    }
  }, [items, onUpdateItem, setActiveSearchCell, setIsEditingCell]);

  // Finish editing the current cell
  const finishEditing = useCallback(() => {
    setActiveSearchCell(null);
    setIsEditingCell(false);
  }, [setActiveSearchCell, setIsEditingCell]);

  return {
    handleCellClick,
    handleDirectEdit,
    handleProductSelect,
    finishEditing
  };
}
