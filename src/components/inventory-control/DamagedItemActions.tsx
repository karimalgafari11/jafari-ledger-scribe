
import React from "react";
import { Eye, FileText, Trash2 } from "lucide-react";
import { ActionDefinition } from "@/components/inventory/types";

interface DamagedItemActionsProps {
  onViewDetails: (id: string) => void;
  onExportItem: (id: string) => void;
  onDelete: (id: string) => void;
}

export const createDamagedItemActions = ({
  onViewDetails,
  onExportItem,
  onDelete,
}: DamagedItemActionsProps): ActionDefinition[] => {
  return [
    {
      icon: <Eye className="h-4 w-4" />,
      label: "عرض",
      onClick: (row: any) => onViewDetails(row.id)
    },
    {
      icon: <FileText className="h-4 w-4" />,
      label: "تصدير",
      onClick: (row: any) => onExportItem(row.id)
    },
    {
      icon: <Trash2 className="h-4 w-4" />,
      label: "حذف",
      onClick: (row: any) => onDelete(row.id),
      variant: "ghost" as const
    }
  ];
};
