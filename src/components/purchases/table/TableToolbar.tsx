
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Grid } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip";
import { ProductSearch } from "../ProductSearch";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Product } from "@/types/inventory";
import { TableHeader } from "./TableHeader";
import { QuickProductSearch } from "../QuickProductSearch";

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
  const [open, setOpen] = useState(false);
  const [quickSearchActive, setQuickSearchActive] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  
  const handleAddClick = () => {
    setQuickSearchActive(true);
  };
  
  const handleToggleSearch = () => {
    setOpen(!open);
  };
  
  const handleProductSelectAndClose = (product: Product) => {
    console.log("Product selected:", product);
    handleProductSelect(product);
    setOpen(false);
  };

  return (
    <div>
      <TableHeader 
        onAddNewItem={handleAddClick}
        onToggleSearch={handleToggleSearch}
      />
      
      {/* Display the quick search dialog when active */}
      {quickSearchActive && (
        <QuickProductSearch
          onClose={() => setQuickSearchActive(false)}
          onSelect={handleProductSelect}
        />
      )}
      
      <div className="flex justify-end items-center space-x-2 rtl:space-x-reverse">
        <TooltipProvider>
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
        </TooltipProvider>
      </div>
    </div>
  );
};
