
import React from "react";
import { Button } from "@/components/ui/button";
import { Search, FilePlus, Grid, FileUp } from "lucide-react";
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
    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
      <div className="flex items-center gap-2">
        <Button
          onClick={handleAddClick}
          disabled={isAddingItem || editingItemIndex !== null}
          size="lg"
          className="bg-green-500 hover:bg-green-600 text-white py-3 px-5 rounded-md flex items-center gap-2 shadow-md transition-all duration-200 relative"
        >
          <FilePlus className="h-5 w-5" />
          <span className="font-bold">إضافة صنف جديد</span>
          {!isAddingItem && editingItemIndex === null && (
            <span className="absolute -top-1 -right-1 animate-ping bg-yellow-400 h-3 w-3 rounded-full"></span>
          )}
        </Button>
        
        <div className="hidden md:block text-sm text-gray-500 bg-gray-50 p-2 rounded-md border">
          <span className="font-semibold">تنبيه: </span>
          يمكنك الضغط على خلايا الجدول للتعديل المباشر
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={toggleGridLines}
          className="text-xs flex items-center gap-1"
        >
          <Grid className="h-4 w-4" />
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
