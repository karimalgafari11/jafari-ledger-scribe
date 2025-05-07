
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { PurchaseItem } from "@/types/purchases";
import { ProductSearch } from "../ProductSearch";
import { ItemForm } from "./ItemForm";

interface ItemFormContainerProps {
  isAddingItem: boolean;
  editingItemIndex: number | null;
  items: PurchaseItem[];
  onAddItem: (item: any) => void;
  onUpdateItem: (index: number, item: any) => void;
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
  
  // If neither adding nor editing, don't render anything
  if (!isAddingItem && editingItemIndex === null) {
    return null;
  }
  
  return (
    <Card className="mb-4 border-2 border-blue-200 bg-blue-50">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {editingItemIndex !== null ? "تعديل الصنف" : "إضافة صنف جديد"}
          </h3>
          <Button variant="ghost" size="icon" onClick={handleCancel}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
          <div className="md:col-span-3">
            <label className="block text-sm font-medium mb-1">البحث عن صنف</label>
            <ProductSearch 
              onSelect={handleProductSelect}
              placeholder="ابحث برقم الصنف أو اسمه..." 
              autoFocus={true}
              showIcon={true}
            />
          </div>
          
          {(editingItemIndex !== null || newItem.name) && (
            <div className="md:col-span-2">
              <ItemForm 
                item={editingItemIndex !== null ? items[editingItemIndex] : newItem as PurchaseItem}
                onChange={editingItemIndex !== null 
                  ? (field, value) => onUpdateItem(editingItemIndex, { ...items[editingItemIndex], [field]: value })
                  : (field, value) => setNewItem({ ...newItem, [field]: value })
                }
              />
            </div>
          )}
        </div>
        
        {(editingItemIndex !== null || newItem.name) && (
          <div className="flex justify-end">
            <Button 
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700"
            >
              {editingItemIndex !== null ? "تحديث الصنف" : "إضافة الصنف"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
