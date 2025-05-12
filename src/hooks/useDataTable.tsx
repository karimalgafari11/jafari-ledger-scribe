
import { useState, useCallback } from "react";
import { 
  ColumnDef, 
  VisibilityState, 
  SortingState, 
  ColumnFiltersState,
  PaginationState
} from "@tanstack/react-table";

export interface DataTableState {
  sorting: SortingState;
  columnVisibility: VisibilityState;
  columnFilters: ColumnFiltersState;
  pagination: PaginationState;
  globalFilter: string;
  selectedRows: string[];
}

export interface DataTableOptions {
  initialPageSize?: number;
  initialPageIndex?: number;
  persistKey?: string;
  onStateChange?: (state: DataTableState) => void;
}

export function useDataTable<TData>(options?: DataTableOptions) {
  const {
    initialPageSize = 10,
    initialPageIndex = 0,
    persistKey,
    onStateChange
  } = options || {};

  // حالة الجدول
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: initialPageIndex,
    pageSize: initialPageSize,
  });
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // تحديث الصفوف المحددة
  const toggleRowSelection = useCallback((id: string) => {
    setSelectedRows(prev => 
      prev.includes(id) 
        ? prev.filter(rowId => rowId !== id) 
        : [...prev, id]
    );
  }, []);

  // تحديد أو إلغاء تحديد كل الصفوف
  const toggleAllRowsSelection = useCallback((value: boolean, ids: string[]) => {
    setSelectedRows(value ? ids : []);
  }, []);

  // إعادة حالة الجدول إلى الحالة الأصلية
  const resetTable = useCallback(() => {
    setSorting([]);
    setColumnVisibility({});
    setColumnFilters([]);
    setPagination({
      pageIndex: initialPageIndex,
      pageSize: initialPageSize,
    });
    setGlobalFilter("");
    setSelectedRows([]);
  }, [initialPageIndex, initialPageSize]);

  // تحضير حالة الجدول للاستخدام في React Table
  const tableState: DataTableState = {
    sorting,
    columnVisibility,
    columnFilters,
    pagination,
    globalFilter,
    selectedRows
  };

  // معالجات حدث لتحديث حالة الجدول
  const onSortingChange = useCallback((updater: any) => {
    setSorting(updater);
    if (onStateChange) {
      const newSorting = typeof updater === "function" ? updater(sorting) : updater;
      onStateChange({ ...tableState, sorting: newSorting });
    }
  }, [sorting, tableState, onStateChange]);

  const onColumnVisibilityChange = useCallback((updater: any) => {
    setColumnVisibility(updater);
    if (onStateChange) {
      const newVisibility = typeof updater === "function" ? updater(columnVisibility) : updater;
      onStateChange({ ...tableState, columnVisibility: newVisibility });
    }
  }, [columnVisibility, tableState, onStateChange]);

  const onColumnFiltersChange = useCallback((updater: any) => {
    setColumnFilters(updater);
    if (onStateChange) {
      const newFilters = typeof updater === "function" ? updater(columnFilters) : updater;
      onStateChange({ ...tableState, columnFilters: newFilters });
    }
  }, [columnFilters, tableState, onStateChange]);

  const onPaginationChange = useCallback((updater: any) => {
    setPagination(updater);
    if (onStateChange) {
      const newPagination = typeof updater === "function" ? updater(pagination) : updater;
      onStateChange({ ...tableState, pagination: newPagination });
    }
  }, [pagination, tableState, onStateChange]);

  const onGlobalFilterChange = useCallback((value: string) => {
    setGlobalFilter(value);
    if (onStateChange) {
      onStateChange({ ...tableState, globalFilter: value });
    }
  }, [tableState, onStateChange]);

  return {
    state: tableState,
    selectedRows,
    toggleRowSelection,
    toggleAllRowsSelection,
    resetTable,
    onSortingChange,
    onColumnVisibilityChange,
    onColumnFiltersChange,
    onPaginationChange,
    onGlobalFilterChange,
  };
}
