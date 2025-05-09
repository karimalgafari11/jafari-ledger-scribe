
import { useState } from "react";
import { PurchaseItem } from "@/types/purchases";

export interface UseItemFormProps {
  editingItemIndex: number | null;
  items: PurchaseItem[];
  onAddItem: (item: any) => void;
  onUpdateItem: (index: number, item: any) => void;
  setIsAddingItem: (isAdding: boolean) => void;
  setEditingItemIndex: (index: number | null) => void;
}

export const useItemForm = ({
  editingItemIndex,
  items,
  onAddItem,
  onUpdateItem,
  setIsAddingItem,
  setEditingItemIndex
}: UseItemFormProps) => {
  const [newItem, setNewItem] = useState<Partial<PurchaseItem>>({
    quantity: 1,
    price: 0,
    total: 0
  });
  
  // Function to handle product selection from search
  const handleProductSelect = (product: any) => {
    if (editingItemIndex !== null) {
      // Update existing item
      onUpdateItem(editingItemIndex, {
        ...items[editingItemIndex],
        productId: product.id,
        code: product.code,
        name: product.name,
        price: product.price,
        unit: product.unit || "قطعة", // Default to piece if unit not provided
        total: items[editingItemIndex].quantity * product.price
      });
    } else {
      // Set new item for adding
      setNewItem({
        ...newItem,
        productId: product.id,
        code: product.code,
        name: product.name,
        price: product.price,
        unit: product.unit || "قطعة", // Default to piece if unit not provided
        total: newItem.quantity ? newItem.quantity * product.price : product.price
      });
    }
  };
  
  // Cancel adding or editing
  const handleCancel = () => {
    setIsAddingItem(false);
    setEditingItemIndex(null);
    setNewItem({
      quantity: 1,
      price: 0,
      total: 0
    });
  };
  
  // Save new item or update existing item
  const handleSave = () => {
    if (editingItemIndex !== null) {
      // Nothing to do here as we update the item directly in the table
      setEditingItemIndex(null);
    } else if (newItem.name && newItem.price) {
      onAddItem({
        ...newItem,
        quantity: newItem.quantity || 1,
        total: (newItem.quantity || 1) * (newItem.price || 0)
      });
      setNewItem({
        quantity: 1,
        price: 0,
        total: 0
      });
      setIsAddingItem(false);
    }
  };

  // Handle field change in the form
  const handleItemChange = (field: string, value: any) => {
    setNewItem({
      ...newItem,
      [field]: value,
    });
  };

  // Handle field update for existing item
  const handleUpdateItemField = (index: number, field: string, value: any) => {
    // For quantity and price, also update the total
    if (field === 'quantity' || field === 'price') {
      const updatedItem = {...items[index], [field]: value};
      updatedItem.total = updatedItem.quantity * updatedItem.price;
      onUpdateItem(index, updatedItem);
    } else {
      onUpdateItem(index, {...items[index], [field]: value});
    }
  };

  return {
    newItem,
    setNewItem,
    handleProductSelect,
    handleItemChange,
    handleUpdateItemField,
    handleCancel,
    handleSave
  };
};
