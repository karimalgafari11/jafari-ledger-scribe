
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Grid, List, Search } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

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
  const handleAddItem = () => {
    if (!isAddingItem && editingItemIndex === null) {
      setIsAddingItem(true);
    }
  };
  
  return (
    <div className="flex flex-wrap gap-2 items-center justify-between">
      <div>
        <Button
          variant="default"
          size="sm"
          className="gap-1"
          onClick={handleAddItem}
          disabled={isAddingItem || editingItemIndex !== null}
        >
          <Plus className="h-4 w-4 ml-1" />
          إضافة صنف
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          className="gap-1 mr-2"
          onClick={onToggleSearch}
          disabled={isAddingItem || editingItemIndex !== null}
        >
          <Search className="h-4 w-4 ml-1" />
          بحث عن منتج
        </Button>
      </div>
      
      <div className="flex items-center gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleGridLines}
              className="h-8 w-8 p-0"
            >
              <Grid className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>إظهار/إخفاء الخطوط</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleProductSelect}
              className="h-8 w-8 p-0"
            >
              <Search className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>البحث عن منتجات</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};
