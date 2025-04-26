
import React, { useState, useRef, useEffect } from "react";
import { Table } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { DataGridHeader } from "./DataGridHeader";
import { DataGridBody } from "./DataGridBody";
import { DataGridProps, ColumnDefinition } from "./types";

export function DataGrid({
  data,
  columns: initialColumns,
  actions,
  selectable = false,
  selectedRows = [],
  onToggleSelection,
  onSelectAll,
  idField = "id",
  emptyMessage = "لا توجد بيانات متاحة",
  className
}: DataGridProps) {
  const [columns, setColumns] = useState<ColumnDefinition[]>(
    initialColumns.map(col => ({ ...col, isVisible: col.isVisible !== false }))
  );
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);
  
  const tableRef = useRef<HTMLDivElement>(null);
  const [visibleColumns, setVisibleColumns] = useState(columns.filter(col => col.isVisible !== false));

  useEffect(() => {
    setVisibleColumns(columns.filter(col => col.isVisible));
  }, [columns]);

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    
    if (sortConfig && sortConfig.key === key) {
      direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
    }
    
    setSortConfig({ key, direction });
  };

  const handleColumnVisibilityChange = (columnId: string, isVisible: boolean) => {
    setColumns(prev => 
      prev.map(col => 
        col.id === columnId ? { ...col, isVisible } : col
      )
    );
  };

  const resetColumns = () => {
    setColumns(initialColumns.map(col => ({ ...col, isVisible: col.isVisible !== false })));
  };

  const autoSizeColumns = () => {
    // In a real implementation, this would measure content and adjust column widths
    console.log("Auto-sizing columns");
  };

  const copyToClipboard = () => {
    if (data.length) {
      const headers = visibleColumns.map(col => col.header).join('\t');
      const rows = data.map(row => 
        visibleColumns.map(col => {
          const value = row[col.accessorKey];
          return value !== undefined ? value.toString() : '';
        }).join('\t')
      ).join('\n');
      
      navigator.clipboard.writeText(`${headers}\n${rows}`);
    }
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;

    const sorted = [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (sortConfig.direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return sorted;
  }, [data, sortConfig]);

  return (
    <div className={cn("bg-white rounded-lg shadow overflow-hidden", className)} ref={tableRef}>
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="relative overflow-auto">
          <Table>
            <DataGridHeader
              columns={columns}
              visibleColumns={visibleColumns}
              selectable={selectable}
              hasActions={!!actions && actions.length > 0}
              selectedCount={selectedRows.length}
              totalCount={data.length}
              sortConfig={sortConfig}
              onSort={handleSort}
              onSelectAll={onSelectAll}
              onColumnVisibilityChange={handleColumnVisibilityChange}
              onResetColumns={resetColumns}
              onAutoSizeColumns={autoSizeColumns}
              onCopyToClipboard={copyToClipboard}
            />
            <DataGridBody
              data={sortedData}
              visibleColumns={visibleColumns}
              actions={actions}
              selectable={selectable}
              selectedRows={selectedRows}
              onToggleSelection={onToggleSelection}
              idField={idField}
              emptyMessage={emptyMessage}
            />
          </Table>
        </div>
      </div>
    </div>
  );
}

export type { DataGridProps, ColumnDefinition, ActionDefinition } from "./types";
