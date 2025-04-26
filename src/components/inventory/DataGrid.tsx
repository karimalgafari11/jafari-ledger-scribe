
import React, { useState, useRef, useEffect } from "react";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  ArrowDown, 
  ArrowUp, 
  Settings, 
  Copy, 
  Eye,
  FileText,
  Edit,
  Trash2,
  ChevronDown
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ColumnDefinition = {
  id: string;
  header: string;
  accessorKey: string;
  cell?: (value: any, row: any) => React.ReactNode;
  width?: string;
  isSortable?: boolean;
  isVisible?: boolean;
};

export type ActionDefinition = {
  icon: React.ReactNode;
  label: string;
  onClick: (row: any) => void;
  condition?: (row: any) => boolean;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
};

interface DataGridProps {
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

  const renderCellContent = (row: any, column: ColumnDefinition) => {
    const value = row[column.accessorKey];
    
    if (column.cell) {
      return column.cell(value, row);
    }
    
    if (value === undefined || value === null) {
      return '';
    }
    
    return (
      <div className="overflow-hidden text-ellipsis whitespace-nowrap max-w-full">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>{value.toString()}</span>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs break-words">{value.toString()}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    );
  };

  return (
    <div className={cn("bg-white rounded-lg shadow overflow-hidden", className)} ref={tableRef}>
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="relative overflow-auto">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                {selectable && (
                  <TableHead className="w-10 text-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                      onChange={e => onSelectAll && onSelectAll(e.target.checked)}
                      checked={data.length > 0 && selectedRows.length === data.length}
                    />
                  </TableHead>
                )}
                
                {visibleColumns.map(column => (
                  <TableHead 
                    key={column.id}
                    style={{ width: column.width }}
                    className={cn(
                      "h-11 px-4 text-center bg-gray-50 text-gray-700 font-medium border-b border-gray-200",
                      column.isSortable && "cursor-pointer select-none"
                    )}
                    onClick={() => column.isSortable && handleSort(column.accessorKey)}
                  >
                    <div className="flex items-center justify-center gap-1">
                      {column.header}
                      {sortConfig && sortConfig.key === column.accessorKey && (
                        sortConfig.direction === 'asc' ? (
                          <ArrowUp className="h-3.5 w-3.5" />
                        ) : (
                          <ArrowDown className="h-3.5 w-3.5" />
                        )
                      )}
                    </div>
                  </TableHead>
                ))}
                
                {(actions && actions.length > 0) && (
                  <TableHead className="w-[120px] text-center">
                    <div className="flex items-center justify-center gap-1">
                      <span>الإجراءات</span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <Settings className="h-3.5 w-3.5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rtl">
                          <DropdownMenuItem onClick={copyToClipboard}>
                            <Copy className="mr-2 h-4 w-4" />
                            نسخ البيانات
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={autoSizeColumns}>
                            تلقائي العرض
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={resetColumns}>
                            إعادة ترتيب الأعمدة
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {initialColumns.map(column => (
                            <DropdownMenuItem 
                              key={column.id}
                              onClick={() => handleColumnVisibilityChange(
                                column.id, 
                                !columns.find(c => c.id === column.id)?.isVisible
                              )}
                            >
                              <input
                                type="checkbox"
                                className="mr-2"
                                checked={columns.find(c => c.id === column.id)?.isVisible || false}
                                readOnly
                              />
                              {column.header}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableHead>
                )}
              </TableRow>
            </TableHeader>
            
            <TableBody>
              {sortedData.length === 0 ? (
                <TableRow>
                  <TableCell 
                    colSpan={visibleColumns.length + (selectable ? 1 : 0) + (actions ? 1 : 0)} 
                    className="h-24 text-center text-muted-foreground py-8"
                  >
                    {emptyMessage}
                  </TableCell>
                </TableRow>
              ) : (
                sortedData.map((row, index) => (
                  <TableRow 
                    key={row[idField] || index}
                    className="h-[45px] hover:bg-gray-50"
                    data-state={selectedRows.includes(row[idField]) ? "selected" : ""}
                  >
                    {selectable && (
                      <TableCell className="text-center">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                          checked={selectedRows.includes(row[idField])}
                          onChange={() => onToggleSelection && onToggleSelection(row[idField])}
                        />
                      </TableCell>
                    )}
                    
                    {visibleColumns.map(column => (
                      <TableCell 
                        key={`${row[idField]}-${column.id}`} 
                        className="p-4 text-sm text-center"
                      >
                        {renderCellContent(row, column)}
                      </TableCell>
                    ))}
                    
                    {(actions && actions.length > 0) && (
                      <TableCell className="p-2">
                        <div className="flex items-center justify-center space-x-1 rtl:space-x-reverse">
                          {actions.map((action, idx) => (
                            action.condition ? (action.condition(row) && (
                              <Button
                                key={idx}
                                variant={action.variant || "ghost"}
                                size="icon"
                                onClick={() => action.onClick(row)}
                                className="h-8 w-8"
                              >
                                {action.icon}
                              </Button>
                            )) : (
                              <Button
                                key={idx}
                                variant={action.variant || "ghost"}
                                size="icon"
                                onClick={() => action.onClick(row)}
                                className="h-8 w-8"
                              >
                                {action.icon}
                              </Button>
                            )
                          ))}
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
