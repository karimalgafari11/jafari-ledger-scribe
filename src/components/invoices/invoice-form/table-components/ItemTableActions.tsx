
import React from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface ItemTableActionsProps {
  onEdit: () => void;
  onRemove: () => void;
}

export const ItemTableActions: React.FC<ItemTableActionsProps> = ({ onEdit, onRemove }) => {
  return (
    <div className="flex space-x-1 rtl space-x-reverse justify-center">
      <Button variant="ghost" size="sm" onClick={onEdit} className="h-6 w-6 p-1">
        <Pencil size={14} />
      </Button>
      <Button variant="ghost" size="sm" onClick={onRemove} className="h-6 w-6 p-1">
        <Trash2 size={14} />
      </Button>
    </div>
  );
};
