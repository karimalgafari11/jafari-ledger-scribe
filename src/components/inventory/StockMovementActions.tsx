
import React from "react";
import { Eye, FileText, Trash2 } from "lucide-react";
import { ActionDefinition } from "@/components/inventory/types";

interface StockMovementActionsProps {
  onViewDetails: (id: string) => void;
  onExportMovement: (id: string) => void;
  onDelete: (id: string) => void;
}

export const createStockMovementActions = ({
  onViewDetails,
  onExportMovement,
  onDelete,
}: StockMovementActionsProps): ActionDefinition[] => {
  return [
    {
      icon: <Eye className="h-4 w-4" />,
      label: "عرض",
      onClick: (row: any) => onViewDetails(row.id)
    },
    {
      icon: <FileText className="h-4 w-4" />,
      label: "تصدير",
      onClick: (row: any) => onExportMovement(row.id)
    },
    {
      icon: <Trash2 className="h-4 w-4" />,
      label: "حذف",
      onClick: (row: any) => onDelete(row.id),
      variant: "ghost" as const
    }
  ];
};
