
import React from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Product } from "@/types/inventory";

interface TableToolbarProps {
  isAddingItem: boolean;
  editingItemIndex: number | null;
  setIsAddingItem: (isAdding: boolean) => void;
  handleProductSelect: (product: Product, index?: number) => void;
  toggleGridLines: () => void;
}

export const TableToolbar: React.FC<TableToolbarProps> = ({
  isAddingItem,
  editingItemIndex,
  setIsAddingItem,
  toggleGridLines,
}) => {
  const handleAddClick = () => {
    console.log("Add Item button clicked");
    setIsAddingItem(true);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
      <div className="flex items-center gap-2">
        <Button
          onClick={handleAddClick}
          disabled={isAddingItem || editingItemIndex !== null}
          size="lg"
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md flex items-center gap-2 shadow-sm"
        >
          <span className="text-lg">+</span> إضافة صنف جديد
        </Button>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={toggleGridLines}
          className="text-xs"
        >
          تبديل الشبكة
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9"
          onClick={() => {}}
        >
          <Search className="h-4 w-4" />
          <span className="sr-only">بحث</span>
        </Button>
      </div>
    </div>
  );
};
