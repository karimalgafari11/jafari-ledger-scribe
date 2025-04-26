
import { ReactNode } from "react";

export type ColumnDefinition = {
  id: string;
  header: string;
  accessorKey: string;
  cell?: (value: any, row: any) => ReactNode;
  width?: string;
  isSortable?: boolean;
  isVisible?: boolean;
};

export type ActionDefinition = {
  icon: ReactNode;
  label: string;
  onClick: (row: any) => void;
  condition?: (row: any) => boolean;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
};

export interface DataGridProps {
  data: any[];
  columns: ColumnDefinition[];
  actions?: ActionDefinition[];
  selectable?: boolean;
  selectedRows?: string[];
  onToggleSelection?: (id: string) => void;
  onSelectAll?: (selected: boolean) => void;
  idField?: string;
  emptyMessage?: string;
  className?: string;
}
