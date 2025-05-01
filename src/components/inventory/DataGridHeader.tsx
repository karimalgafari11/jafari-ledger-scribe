import React from "react";
import { TableHeader, TableRow, TableHead } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Settings, ArrowUp, ArrowDown } from "lucide-react";
import { ColumnVisibilityMenu } from "./ColumnVisibilityMenu";
import { ColumnDefinition } from "./types";
import { cn } from "@/lib/utils";
interface DataGridHeaderProps {
  columns: ColumnDefinition[];
  visibleColumns: ColumnDefinition[];
  selectable: boolean;
  hasActions: boolean;
  selectedCount: number;
  totalCount: number;
  sortConfig: {
    key: string;
    direction: 'asc' | 'desc';
  } | null;
  onSort: (key: string) => void;
  onSelectAll: ((selected: boolean) => void) | undefined;
  onColumnVisibilityChange: (columnId: string, isVisible: boolean) => void;
  onResetColumns: () => void;
  onAutoSizeColumns: () => void;
  onCopyToClipboard: () => void;
}
export function DataGridHeader({
  columns,
  visibleColumns,
  selectable,
  hasActions,
  selectedCount,
  totalCount,
  sortConfig,
  onSort,
  onSelectAll,
  onColumnVisibilityChange,
  onResetColumns,
  onAutoSizeColumns,
  onCopyToClipboard
}: DataGridHeaderProps) {
  return <TableHeader className="bg-gray-50">
      <TableRow>
        {selectable && <TableHead className="w-10 text-center bg-stone-300">
            <input type="checkbox" className="rounded border-gray-300" onChange={e => onSelectAll?.(e.target.checked)} checked={totalCount > 0 && selectedCount === totalCount} />
          </TableHead>}
        
        {visibleColumns.map(column => <TableHead key={column.id} style={{
        width: column.width
      }} className={cn("h-11 px-4 text-center bg-gray-50 text-gray-700 font-medium border-b border-gray-200", column.isSortable && "cursor-pointer select-none")} onClick={() => column.isSortable && onSort(column.accessorKey)}>
            <div className="flex items-center justify-center gap-1 bg-amber-100">
              {column.header}
              {sortConfig && sortConfig.key === column.accessorKey && (sortConfig.direction === 'asc' ? <ArrowUp className="h-3.5 w-3.5" /> : <ArrowDown className="h-3.5 w-3.5" />)}
            </div>
          </TableHead>)}
        
        {hasActions && <TableHead className="w-[120px] text-center">
            <div className="flex items-center justify-center gap-1">
              <span>الإجراءات</span>
              <ColumnVisibilityMenu columns={columns} onColumnVisibilityChange={onColumnVisibilityChange} onResetColumns={onResetColumns} onAutoSizeColumns={onAutoSizeColumns} onCopyToClipboard={onCopyToClipboard} />
            </div>
          </TableHead>}
      </TableRow>
    </TableHeader>;
}