
import React from "react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/inventory";
import { Grid3X3, Search, Plus } from "lucide-react";
import { TableActionButtons } from "./TableActionButtons";

interface TableToolbarProps {
  isAddingItem: boolean;
  editingItemIndex: number | null;
  setIsAddingItem: (isAdding: boolean) => void;
  handleProductSelect: () => void;
  toggleGridLines: () => void;
  onToggleSearch: () => void;
}

export const TableToolbar: React.FC<TableToolbarProps> = ({
  isAddingItem,
  editingItemIndex,
  setIsAddingItem,
  handleProductSelect,
  toggleGridLines,
  onToggleSearch
}) => {
  const handleAddNewItem = () => {
    if (!isAddingItem && editingItemIndex === null) {
      handleProductSelect();
    }
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
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onToggleSearch}
          className="flex items-center gap-1 h-9"
        >
          <Search className="h-4 w-4" />
          بحث عن منتج
        </Button>
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
