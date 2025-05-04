
import { PurchaseItem } from "@/types/purchases";
import { useState } from "react";
import { toast } from "sonner";

interface UseCellEditingProps {
  items: PurchaseItem[];
  onUpdateItem: (index: number, item: Partial<PurchaseItem>) => void;
  isAddingItem: boolean;
  editingItemIndex: number | null;
  setActiveSearchCell: (cellId: string | null) => void;
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
  
  // Handle cell click to start editing
  const handleCellClick = (index: number, field: string) => {
    if (isAddingItem || editingItemIndex !== null) return;
    
    // Generate a unique ID for the cell using consistent format
    const cellId = `${field}-${index}`;
    console.log(`Activating search cell: ${cellId}`);
    
    // If clicking the same cell that's already active, don't reset
    if (setActiveSearchCell) {
      setActiveSearchCell(cellId);
    }
    
    setLastSelectedRowIndex(index);
    setIsEditingCell(true);
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

  // Handle product selection from search
  const handleProductSelect = (product: any, index?: number) => {
    console.log("Product selected:", product, "for index:", index);
    
    if (index !== undefined && index >= 0) {
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
      toast.success(`تم تحديث المنتج إلى ${product.name}`);
      
      // Move to quantity field after selection
      setTimeout(() => {
        const quantityCellId = `quantity-${index}`;
        setActiveSearchCell(quantityCellId);
        console.log(`Moving to quantity cell: ${quantityCellId}`);
      }, 10);
    }
  };

  // Function to blur active inputs and end editing session
  const finishEditing = () => {
    setActiveSearchCell(null);
    setIsEditingCell(false);
  };

  return {
    handleCellClick,
    handleDirectEdit,
    handleProductSelect,
    finishEditing
  };
}
