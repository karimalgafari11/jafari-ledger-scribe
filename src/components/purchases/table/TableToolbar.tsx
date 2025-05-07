
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Search, Grid } from "lucide-react";

interface TableToolbarProps {
  isAddingItem: boolean;
  editingItemIndex: number | null;
  setIsAddingItem: (isAdding: boolean) => void;
  handleProductSelect: (product: any, index?: number) => void;
  toggleGridLines: () => void;
}

export const TableToolbar: React.FC<TableToolbarProps> = ({
  isAddingItem,
  editingItemIndex,
  setIsAddingItem,
  handleProductSelect,
  toggleGridLines
}) => {
  return (
    <div className="flex justify-between items-center rtl">
      <h3 className="text-lg font-semibold">الأصناف</h3>
      
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={toggleGridLines}
          className="flex items-center gap-1"
        >
          <Grid className="h-4 w-4" />
          خطوط الشبكة
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center gap-1"
        >
          <Search className="h-4 w-4" />
          بحث
        </Button>
        
        <Button 
          onClick={() => setIsAddingItem(true)} 
          disabled={isAddingItem || editingItemIndex !== null}
          size="sm"
          className="flex items-center gap-1"
        >
          <Plus className="h-4 w-4" />
          إضافة صنف جديد
        </Button>
      </div>
    </div>
  );
};
