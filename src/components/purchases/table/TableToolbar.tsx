
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Settings } from "lucide-react";

interface TableToolbarProps {
  isAddingItem: boolean;
  editingItemIndex: number | null;
  setIsAddingItem: (isAdding: boolean) => void;
  handleProductSelect: (product: any) => void;
  toggleGridLines: () => void;
}

export const TableToolbar: React.FC<TableToolbarProps> = ({
  isAddingItem,
  editingItemIndex,
  setIsAddingItem,
  toggleGridLines
}) => {
  return (
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-semibold">الأصناف</h3>
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={toggleGridLines}
          className="flex items-center gap-1"
        >
          <Settings size={16} />
          <span className="hidden sm:inline">إعدادات الجدول</span>
        </Button>
        
        <Button 
          onClick={() => setIsAddingItem(true)} 
          className="flex items-center gap-1" 
          size="sm" 
          disabled={isAddingItem || editingItemIndex !== null}
        >
          <Plus size={16} /> إضافة صنف
        </Button>
      </div>
    </div>
  );
};
