
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Grid, List } from "lucide-react";
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
  const searchRef = useRef<HTMLDivElement>(null);
  
  // تحسين التعامل مع الضغط على زر الإضافة
  const handleAddClick = () => {
    if (!isAddingItem && editingItemIndex === null) {
      // فقط تغيير حالة الـ Popover
      console.log("Opening product search popover");
    }
  };
  
  const handleProductSelectAndClose = (product: Product) => {
    console.log("Product selected:", product);
    handleProductSelect(product);
    setOpen(false);
  };

  return (
    <div className="flex justify-between items-center mb-2">
      <div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              onClick={handleAddClick}
              disabled={isAddingItem || editingItemIndex !== null}
              className="bg-blue-600 hover:bg-blue-700 text-base"
            >
              <Plus className="h-4 w-4 mr-1" />
              إضافة صنف جديد
            </Button>
          </PopoverTrigger>
          <PopoverContent 
            className="w-80 p-4 bg-white border rounded-md shadow-md z-[1000]" 
            align="start"
            side="bottom"
            sideOffset={5}
          >
            <div className="space-y-4" ref={searchRef}>
              <h4 className="font-medium text-sm">البحث عن صنف</h4>
              <ProductSearch 
                onSelect={handleProductSelectAndClose} 
                autoFocus={true}
                placeholder="أدخل اسم أو رمز الصنف..."
                showIcon={true}
              />
            </div>
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
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
        
        {/* يمكن إضافة المزيد من أزرار الأدوات هنا */}
      </div>
    </div>
  );
};
