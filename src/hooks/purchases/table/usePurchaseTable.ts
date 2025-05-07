
import { useTableState } from './useTableState';
import { useCellEditing } from './useCellEditing';
import { useTableEvents } from './useTableEvents';
import { PurchaseItem } from "@/types/purchases";
import { toast } from "sonner";
import { useEffect } from 'react';

export interface UsePurchaseTableProps {
  items: PurchaseItem[];
  onAddItem: (item: Partial<PurchaseItem>) => void;
  onUpdateItem: (index: number, item: Partial<PurchaseItem>) => void;
  onRemoveItem: (index: number) => void;
  isAddingItem: boolean;
  editingItemIndex: number | null;
}

export function usePurchaseTable({
  items,
  onAddItem,
  onUpdateItem,
  onRemoveItem,
  isAddingItem,
  editingItemIndex
}: UsePurchaseTableProps) {
  // Use our smaller hooks
  const {
    activeSearchCell,
    setActiveSearchCell,
    showGridLines,
    isDenseView,
    searchInputRef,
    tableRef,
    lastSelectedRowIndex,
    setLastSelectedRowIndex,
    isEditingCell,
    setIsEditingCell,
    toggleGridLines
  } = useTableState();

  const {
    handleCellClick,
    handleDirectEdit,
    handleProductSelect,
    finishEditing
  } = useCellEditing({
    items,
    onUpdateItem,
    isAddingItem,
    editingItemIndex,
    setActiveSearchCell,
    setIsEditingCell,
    setLastSelectedRowIndex
  });

  const {
    handleTableClick
  } = useTableEvents({
    activeSearchCell,
    tableRef,
    setActiveSearchCell,
    setIsEditingCell,
    items
  });

  // Add debug logs
  useEffect(() => {
    console.log("Purchase Table State:", {
      itemsCount: items.length,
      isAddingItem,
      editingItemIndex,
      activeSearchCell,
      isEditingCell
    });
  }, [items.length, isAddingItem, editingItemIndex, activeSearchCell, isEditingCell]);

  // إزالة المساعدة التي قد تفتح المربع المنبثق تلقائيًا
  // useEffect(() => {
  //   if (items.length > 0 && !isAddingItem && !editingItemIndex && !isEditingCell) {
  //     toast.info("يمكنك الضغط على الخلايا لتعديلها أو إضافة منتج جديد", {
  //       id: "table-help",
  //       duration: 3000,
  //     });
  //   }
  // }, [items.length, isAddingItem, editingItemIndex, isEditingCell]);

  return {
    activeSearchCell,
    showGridLines,
    isDenseView,
    searchInputRef,
    tableRef,
    lastSelectedRowIndex,
    isEditingCell,
    handleCellClick,
    handleProductSelect,
    handleDirectEdit,
    handleTableClick,
    toggleGridLines,
    setActiveSearchCell,
    finishEditing,
  };
}
