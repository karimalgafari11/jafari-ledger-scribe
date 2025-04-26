
import { Eye, FileText, CheckCircle } from "lucide-react";
import { ActionDefinition } from "./types";

interface CreateCountingActionsProps {
  onViewDetails: (id: string) => void;
  onExport: (id: string) => void;
  onComplete: (id: string) => void;
}

export const createCountingActions = ({
  onViewDetails,
  onExport,
  onComplete
}: CreateCountingActionsProps): ActionDefinition[] => [
  {
    icon: <Eye className="h-4 w-4" />,
    label: "عرض",
    onClick: (row: any) => onViewDetails(row.id)
  },
  {
    icon: <FileText className="h-4 w-4" />,
    label: "طباعة",
    onClick: (row: any) => onExport(row.id)
  },
  {
    icon: <CheckCircle className="h-4 w-4" />,
    label: "اعتماد",
    onClick: (row: any) => onComplete(row.id),
    condition: (row: any) => row.status === 'draft',
    variant: "ghost" as const
  }
];
