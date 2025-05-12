
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
  FileDown,
  FileType2,
  FileSpreadsheet
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { exportToExcel, sanitizeDataForExport } from "@/utils/exportUtils";

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
  stickyHeader?: boolean;
  emptyMessage?: string;
  className?: string;
  hoverable?: boolean;
  getRowId?: (row: TData) => string;
  enableExport?: boolean;
  tableName?: string;
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
  dense = false,
  bordered = false,
  stickyHeader = false,
  emptyMessage = "لا توجد بيانات",
  className,
  hoverable = false,
  getRowId,
  enableExport = false,
  tableName = "جدول_البيانات",
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [paginationState, setPaginationState] = useState<PaginationState>({
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
    onPaginationChange: setPaginationState,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: paginationState,
    },
    getRowId: getRowId,
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

  // تصدير البيانات إلى CSV
  const exportToCSV = () => {
    // الحصول على بيانات الجدول
    const filteredData = table.getFilteredRowModel().rows.map((row) => row.original);
    
    // تحويل البيانات إلى تنسيق CSV
    const headers = columns
      .filter((column) => "accessorKey" in column && typeof column.accessorKey === "string")
      .map((column) => {
        if ("accessorKey" in column && typeof column.accessorKey === "string") {
          return column.accessorKey;
        }
        return "";
      });
    
    const headerRow = headers.join(",");
    
    const dataRows = filteredData.map((item: any) => {
      return headers
        .map((header) => {
          let cell = item[header] || "";
          
          // معالجة الخلايا التي تحتوي على فواصل
          if (cell && typeof cell === 'string' && cell.includes(",")) {
            cell = `"${cell}"`;
          }
          
          return cell;
        })
        .join(",");
    });
    
    const csvContent = [headerRow, ...dataRows].join("\n");
    
    // تنزيل الملف
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    
    link.setAttribute("href", url);
    link.setAttribute("download", `${tableName}_${new Date().toLocaleDateString()}.csv`);
    link.style.visibility = "hidden";
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // تصدير البيانات إلى JSON
  const exportToJSON = () => {
    const filteredData = table.getFilteredRowModel().rows.map((row) => row.original);
    const jsonContent = JSON.stringify(filteredData, null, 2);
    
    const blob = new Blob([jsonContent], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    
    link.setAttribute("href", url);
    link.setAttribute("download", `${tableName}_${new Date().toLocaleDateString()}.json`);
    link.style.visibility = "hidden";
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // تصدير البيانات إلى Excel
  const handleExportToExcel = () => {
    const filteredData = table.getFilteredRowModel().rows.map((row) => row.original);
    const sanitizedData = sanitizeDataForExport(filteredData as Record<string, any>[]);
    
    exportToExcel(
      sanitizedData,
      `${tableName}_${new Date().toLocaleDateString('ar-SA')}`,
      tableName
    );
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
      <div className="flex justify-between items-center">
        {searchable && searchKey && (
          <div className="relative mb-4 w-full md:w-80">
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
        )}

        {enableExport && (
          <div className="flex-shrink-0 ml-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9">
                  <Download className="h-4 w-4 ml-2" />
                  تصدير
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={exportToCSV}>
                  <FileDown className="mr-2 h-4 w-4" />
                  تصدير كملف CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={exportToJSON}>
                  <FileType2 className="mr-2 h-4 w-4" />
                  تصدير كملف JSON
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleExportToExcel}>
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  تصدير إلى Excel
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
