
import React from "react";
import { PurchaseItem } from "@/types/purchases";
import { PurchaseItemForm } from "../PurchaseItemForm";

interface ItemFormContainerProps {
  isAddingItem: boolean;
  editingItemIndex: number | null;
  items: PurchaseItem[];
  onAddItem: (item: Partial<PurchaseItem>) => void;
  onUpdateItem: (index: number, item: Partial<PurchaseItem>) => void;
  setIsAddingItem: (isAdding: boolean) => void;
  setEditingItemIndex: (index: number | null) => void;
}

export const ItemFormContainer: React.FC<ItemFormContainerProps> = ({
  isAddingItem,
  editingItemIndex,
  items,
  onAddItem,
  onUpdateItem,
  setIsAddingItem,
  setEditingItemIndex
}) => {
  // If we're not adding or editing an item, don't render anything
  if (!isAddingItem && editingItemIndex === null) {
    return null;
  }

  return (
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
  );
};
