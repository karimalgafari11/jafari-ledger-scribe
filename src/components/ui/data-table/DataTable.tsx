
"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  PaginationState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  X, 
  Download, 
  Printer,
  FileJson,
  FileSpreadsheet,
  FileCsv
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  exportToExcel, 
  downloadAsJson, 
  downloadAsCsv,
  printTableData
} from "@/utils/exportUtils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchable?: boolean;
  searchKey?: string;
  enablePagination?: boolean;
  pageSize?: number;
  onRowClick?: (row: TData) => void;
  gridLines?: boolean;
  striped?: boolean;
  dense?: boolean;
  bordered?: boolean;
  hoverable?: boolean;
  stickyHeader?: boolean;
  emptyMessage?: string;
  className?: string;
  enableExport?: boolean;
  tableName?: string;
  getRowId?: (row: TData) => string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchable = false,
  searchKey,
  enablePagination = true,
  pageSize = 10,
  onRowClick,
  gridLines = false,
  striped = false,
  hoverable = false,
  dense = false,
  bordered = false,
  stickyHeader = false,
  emptyMessage = "لا توجد بيانات",
  className,
  enableExport = false,
  tableName = "data_table",
  getRowId,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [paginationState, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: pageSize || 10,
  });
  
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: paginationState,
    },
    ...(getRowId ? { getRowId } : {})
  });

  // تطبيق البحث عند تغير قيمة البحث
  useEffect(() => {
    if (searchable && searchKey && searchValue.trim() !== "") {
      table.getColumn(searchKey)?.setFilterValue(searchValue);
    }
  }, [searchValue, searchable, searchKey, table]);

  // تمرير صفحة الجدول إلى الأعلى عند تغيير الصفحة
  useEffect(() => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollTop = 0;
    }
  }, [paginationState.pageIndex]);

  // مسح البحث
  const clearSearch = () => {
    setSearchValue("");
    if (searchable && searchKey) {
      table.getColumn(searchKey)?.setFilterValue("");
    }
  };

  // إعداد البيانات للتصدير أو الطباعة
  const prepareDataForExport = (): Record<string, any>[] => {
    // استخدام البيانات المصفاة إذا كان هناك بحث نشط
    const dataToExport = table.getFilteredRowModel().rows.map((row) => {
      const item: Record<string, any> = {};
      
      // استخراج البيانات من الأعمدة المرئية فقط
      columns.forEach((column: any) => {
        if (column.accessorKey && typeof column.accessorKey === 'string') {
          const key = column.accessorKey;
          const header = column.header || key;
          item[header] = row.getValue(key);
        }
      });
      
      return item;
    });
    
    return dataToExport;
  };

  // وظائف التصدير والطباعة
  const handleExportToExcel = () => {
    const dataToExport = prepareDataForExport();
    exportToExcel(dataToExport, tableName);
  };
  
  const handleExportToJson = () => {
    const dataToExport = prepareDataForExport();
    downloadAsJson(dataToExport, tableName);
  };
  
  const handleExportToCsv = () => {
    const dataToExport = prepareDataForExport();
    downloadAsCsv(dataToExport, tableName);
  };
  
  const handlePrintTable = () => {
    const dataToExport = prepareDataForExport();
    
    // إعداد معلومات الأعمدة للطباعة
    const columnsForPrint = columns
      .filter((column: any) => column.accessorKey && typeof column.accessorKey === 'string')
      .map((column: any) => ({
        key: column.accessorKey,
        header: column.header || column.accessorKey
      }));
    
    printTableData(dataToExport, tableName, columnsForPrint);
  };

  const tableClasses = cn(
    bordered && "border border-border",
    stickyHeader && "relative",
    className
  );
  
  const headerClasses = cn(
    "bg-muted/50",
    stickyHeader && "sticky top-0 z-10"
  );
  
  const rowClasses = (index: number) => cn(
    onRowClick && "cursor-pointer hover:bg-muted/50 transition-colors",
    hoverable && "hover:bg-muted/50 transition-colors",
    striped && index % 2 === 1 && "bg-muted/20",
    gridLines && "border-b border-border",
    dense ? "h-8" : "h-10"
  );
  
  const cellClasses = cn(
    dense ? "py-1" : "py-2",
    gridLines && bordered && "border-x border-border"
  );

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        {searchable && searchKey ? (
          <div className="relative mb-4 flex-1 max-w-sm">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground">
              <Search className="h-4 w-4" />
            </div>
            <Input
              placeholder="بحث..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="pl-10 pr-10 h-9"
            />
            {searchValue && (
              <div className="absolute inset-y-0 right-3 flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5"
                  onClick={clearSearch}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
        ) : <div />}

        {enableExport && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrintTable}
              className="flex items-center gap-1 text-xs"
            >
              <Printer className="h-3 w-3 mr-1" />
              طباعة
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 text-xs"
                >
                  <Download className="h-3 w-3 mr-1" />
                  تصدير
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleExportToExcel}>
                  <FileSpreadsheet className="h-4 w-4 ml-2" />
                  <span>Excel</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleExportToCsv}>
                  <FileCsv className="h-4 w-4 ml-2" />
                  <span>CSV</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleExportToJson}>
                  <FileJson className="h-4 w-4 ml-2" />
                  <span>JSON</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>

      <div ref={tableContainerRef} className="overflow-auto rounded-md">
        <Table className={tableClasses}>
          <TableHeader className={headerClasses}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className={gridLines ? "border-b border-border" : ""}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={cn(gridLines && bordered && "border-x border-border")}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, i) => (
                <TableRow
                  key={row.id}
                  className={rowClasses(i)}
                  onClick={onRowClick ? () => onRowClick(row.original) : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell 
                      key={cell.id}
                      className={cellClasses}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {enablePagination && (
        <div className="flex items-center justify-between py-2">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length > 0 && (
              <span>
                تم تحديد {table.getFilteredSelectedRowModel().rows.length} من أصل{" "}
                {table.getFilteredRowModel().rows.length} عنصر
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <span className="text-sm mx-2">
              الصفحة {table.getState().pagination.pageIndex + 1} من{" "}
              {table.getPageCount()}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
