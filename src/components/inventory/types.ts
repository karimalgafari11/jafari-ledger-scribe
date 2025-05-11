
import { ReactNode } from "react";

export interface ColumnDefinition {
  id: string;
  header: string | ReactNode;
  accessorKey: string;
  cell?: (value: any, row: any, rowIndex?: number) => ReactNode;
  isSortable?: boolean;
  isVisible?: boolean;
  width?: string | number;
}

export interface ActionDefinition {
  icon: ReactNode;
  label: string;
  onClick: (row: any) => void;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  className?: string;
  condition?: (row: any) => boolean;
}
