
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PurchaseItem } from "@/types/purchases";
import { FormHeader } from "./item-form/FormHeader";
import { ProductSearchSection } from "./item-form/ProductSearchSection";
import { FormActions } from "./item-form/FormActions";
import { useItemForm } from "@/hooks/purchases/table/useItemForm";

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
  const {
    newItem,
    handleProductSelect,
    handleItemChange,
    handleUpdateItemField,
    handleCancel,
    handleSave
  } = useItemForm({
    editingItemIndex,
    items,
    onAddItem,
    onUpdateItem,
    setIsAddingItem,
    setEditingItemIndex
  });
  
  // If neither adding nor editing, don't render anything
  if (!isAddingItem && editingItemIndex === null) {
    return null;
  }
  
  return (
    <Card className="mb-4 border-2 border-blue-200 bg-blue-50">
      <CardContent className="p-4">
        <FormHeader 
          title={editingItemIndex !== null ? "تعديل الصنف" : "إضافة صنف جديد"} 
          onClose={handleCancel}
        />
        
        <ProductSearchSection 
          editingItemIndex={editingItemIndex}
          items={items}
          newItem={newItem}
          onProductSelect={handleProductSelect}
          onChange={handleItemChange}
          onUpdateItem={handleUpdateItemField}
        />
        
        <FormActions
          editingItemIndex={editingItemIndex}
          showSaveButton={editingItemIndex !== null || !!newItem.name}
          onSave={handleSave}
          actionLabel="إضافة الصنف"
        />
      </CardContent>
    </Card>
  );
};
