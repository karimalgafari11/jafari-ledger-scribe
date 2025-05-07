
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Grid, List } from "lucide-react";
import { Tooltip } from "@/components/ui/tooltip";
import { TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

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
  handleProductSelect,
  toggleGridLines
}) => {
  const handleAddClick = () => {
    if (!isAddingItem && editingItemIndex === null) {
      setIsAddingItem(true);
    }
  };

  return (
    <div className="flex justify-between items-center mb-2">
      <div>
        <Button
          onClick={handleAddClick}
          disabled={isAddingItem || editingItemIndex !== null}
          className="bg-blue-600 hover:bg-blue-700 text-base"
        >
          <Plus className="h-4 w-4 mr-1" />
          إضافة صنف جديد
        </Button>
      </div>
      
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={toggleGridLines}
            >
              <Grid className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>إظهار/إخفاء الخطوط الشبكية</TooltipContent>
        </Tooltip>
        
        {/* يمكن إضافة المزيد من أزرار الأدوات هنا */}
      </div>
    </div>
  );
};
