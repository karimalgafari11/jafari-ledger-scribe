import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/inventory";
import { ProductSearch } from "../ProductSearch";
import { Grid3X3, Search, Plus, Rows } from "lucide-react";
import { TableActionButtons } from "./TableActionButtons";

interface TableToolbarProps {
  isAddingItem: boolean;
  editingItemIndex: number | null;
  setIsAddingItem: (isAdding: boolean) => void;
  handleProductSelect: (product: Product) => void;
  toggleGridLines: () => void;
}

export const TableToolbar: React.FC<TableToolbarProps> = ({
  isAddingItem,
  editingItemIndex,
  setIsAddingItem,
  handleProductSelect,
  toggleGridLines
}) => {
  const [isSearching, setIsSearching] = useState(false);

  const handleAddNewItem = () => {
    if (!isAddingItem && editingItemIndex === null) {
      setIsAddingItem(true);
    }
  };

  const handleToggleSearch = () => {
    setIsSearching(prev => !prev);
  };

  return (
    <div className="flex flex-wrap justify-between items-center mb-2 gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleGridLines}
          className="h-9"
          title="تبديل خطوط الشبكة"
        >
          <Grid3X3 className="h-4 w-4" />
        </Button>
        
        {!isSearching ? (
          <TableActionButtons
            onAddNewItem={handleAddNewItem}
            onToggleSearch={handleToggleSearch}
          />
        ) : (
          <div className="flex items-center flex-grow gap-2 w-full md:w-auto">
            <ProductSearch 
              onSelect={handleProductSelect}
              placeholder="ابحث عن منتج..."
              autoFocus={true}
              showIcon={false}
              className="md:w-96"
            />
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleToggleSearch}
              className="h-9"
            >
              إلغاء
            </Button>
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="default"
          size="sm"
          className="flex items-center gap-1 h-9 bg-primary"
          onClick={handleAddNewItem}
          disabled={isAddingItem || editingItemIndex !== null}
          title="إضافة صنف جديد"
        >
          <Plus className="h-4 w-4" />
          إضافة صنف
        </Button>
      </div>
    </div>
  );
};
