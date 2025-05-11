
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TableHeaderProps {
  handleAddItemClick: () => void;
  isAddingItem: boolean;
  editingItemIndex: number | null;
  showGridLines: boolean;
  isDenseView: boolean;
  toggleGridLines: () => void;
  toggleDenseView: () => void;
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  handleAddItemClick,
  isAddingItem,
  editingItemIndex,
  showGridLines,
  isDenseView,
  toggleGridLines,
  toggleDenseView
}) => {
  return (
    <div className="flex justify-between items-center p-4 border-b">
      <h3 className="text-lg font-semibold">الأصناف والخدمات</h3>
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              size="sm"
              className="h-8 gap-1"
            >
              <Settings className="w-4 h-4" /> خيارات الجدول
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuCheckboxItem
              checked={showGridLines}
              onCheckedChange={toggleGridLines}
            >
              إظهار خطوط الجدول
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={isDenseView}
              onCheckedChange={toggleDenseView}
            >
              عرض مضغوط
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
