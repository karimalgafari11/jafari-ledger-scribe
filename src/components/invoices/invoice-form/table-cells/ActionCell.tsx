
import React from "react";
import { TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";

interface ActionCellProps {
  onEdit: () => void;
  onDelete: () => void;
  disabled: boolean;
}

export const ActionCell: React.FC<ActionCellProps> = ({ onEdit, onDelete, disabled }) => {
  return (
    <TableCell className="text-center">
      <div className="flex justify-center space-x-1 rtl:space-x-reverse">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 hover:bg-blue-100 hover:text-blue-700"
          onClick={onEdit}
          disabled={disabled}
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 hover:bg-red-100 hover:text-red-700"
          onClick={onDelete}
          disabled={disabled}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </TableCell>
  );
};
