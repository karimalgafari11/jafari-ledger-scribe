
import { PurchaseItem } from "@/types/purchases";
import { useState } from "react";
import { toast } from "sonner";

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
  
  // Handle cell click to start editing
  const handleCellClick = (rowIndex: number, cellName: string) => {
    if (isAddingItem || editingItemIndex !== null) return;
    
    console.log(`Activating search cell: rowIndex=${rowIndex}, cellName=${cellName}`);
    
    // If clicking the same cell that's already active, don't reset
    if (setActiveSearchCell) {
      setActiveSearchCell({ rowIndex, cellName });
    }
    
    setLastSelectedRowIndex(rowIndex);
    setIsEditingCell(true);
  };

  // Handle direct edit of cell value
  const handleDirectEdit = (rowIndex: number, cellName: string, value: any) => {
    const updatedItem = { ...items[rowIndex], [cellName]: value };
    
    // Recalculate total if quantity or price changed
    if (cellName === 'quantity' || cellName === 'price') {
      const quantity = cellName === 'quantity' ? Number(value) : items[rowIndex].quantity;
      const price = cellName === 'price' ? Number(value) : items[rowIndex].price;
      updatedItem.total = quantity * price;
    }
    
    onUpdateItem(rowIndex, updatedItem);
  };

  // Handle product selection from search
  const handleProductSelect = (product: any, rowIndex?: number) => {
    console.log("Product selected:", product, "for rowIndex:", rowIndex);
    
    if (rowIndex !== undefined && rowIndex >= 0) {
      // Update existing item
      const updatedItem = {
        ...items[rowIndex],
        productId: product.id,
        code: product.code,
        name: product.name,
        price: product.price,
        unit: product.unit || "قطعة", // Default to piece if unit not provided
        total: items[rowIndex].quantity * product.price
      };
      onUpdateItem(rowIndex, updatedItem);
      toast.success(`تم تحديث المنتج إلى ${product.name}`);
      
      // Move to quantity field after selection
      setTimeout(() => {
        setActiveSearchCell({ rowIndex, cellName: "quantity" });
        console.log(`Moving to quantity cell: rowIndex=${rowIndex}, cellName=quantity`);
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
