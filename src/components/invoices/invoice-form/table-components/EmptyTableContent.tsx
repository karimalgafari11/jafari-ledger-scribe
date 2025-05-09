
import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface EmptyTableContentProps {
  colSpanValue: number;
  handleAddItemClick: () => void;
  isAddingItem: boolean;
  editingItemIndex: number | null;
}

export const EmptyTableContent: React.FC<EmptyTableContentProps> = ({
  colSpanValue,
  handleAddItemClick,
  isAddingItem,
  editingItemIndex
}) => {
  return (
    <TableRow>
      <TableCell 
        colSpan={colSpanValue}
        className="text-center py-12 text-muted-foreground"
      >
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
            <Plus className="h-6 w-6 text-gray-400" />
          </div>
          <p>لم يتم إضافة أصناف بعد</p>
          <Button 
            onClick={handleAddItemClick}
            size="sm"
            className="mt-2"
            disabled={isAddingItem || editingItemIndex !== null}
          >
            إضافة صنف جديد
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};
