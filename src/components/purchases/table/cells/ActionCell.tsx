
import React from "react";
import { TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

interface ActionCellProps {
  index: number;
  setEditingItemIndex: (index: number | null) => void;
  onRemoveItem: (index: number) => void;
  isAddingItem: boolean;
  editingItemIndex: number | null;
}

export const ActionCell: React.FC<ActionCellProps> = ({ 
  index,
  setEditingItemIndex,
  onRemoveItem,
  isAddingItem,
  editingItemIndex
}) => {
  return (
    <TableCell className="text-center border border-gray-300 p-2 print:hidden">
      <div className="flex justify-center gap-1">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setEditingItemIndex(index)} 
          disabled={isAddingItem || editingItemIndex !== null}
        >
          <Edit size={16} />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onRemoveItem(index)} 
          disabled={isAddingItem || editingItemIndex !== null}
        >
          <Trash2 size={16} />
        </Button>
      </div>
    </TableCell>
  );
};
