
import React from "react";
import { ProductSearch } from "../../ProductSearch";
import { Product } from "@/types/inventory";
import { PurchaseItem } from "@/types/purchases";
import { ItemForm } from "../ItemForm";

interface ProductSearchSectionProps {
  editingItemIndex: number | null;
  items: PurchaseItem[];
  newItem: Partial<PurchaseItem>;
  onProductSelect: (product: Product) => void;
  onChange: (field: string, value: any) => void;
  onUpdateItem?: (index: number, field: string, value: any) => void;
}

export const ProductSearchSection: React.FC<ProductSearchSectionProps> = ({
  editingItemIndex,
  items,
  newItem,
  onProductSelect,
  onChange,
  onUpdateItem
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
      <div className="md:col-span-3">
        <label className="block text-sm font-medium mb-1">البحث عن صنف</label>
        <ProductSearch 
          onSelect={onProductSelect}
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
              ? (field, value) => onUpdateItem && onUpdateItem(editingItemIndex, field, value)
              : (field, value) => onChange(field, value)
            }
          />
        </div>
      )}
    </div>
  );
};
