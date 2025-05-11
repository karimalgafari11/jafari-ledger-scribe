
export interface ColumnDefinition {
  id: string;
  header: string;
  accessorKey: string;
  cell?: (value: any, row: any) => React.ReactNode;
  width?: string;
  isSortable?: boolean;
}

export interface ActionDefinition {
  icon: React.ReactNode;
  label: string;
  onClick: (row: any) => void;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  className?: string;
}
