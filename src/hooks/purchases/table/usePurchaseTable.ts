
import { useTableState } from './useTableState';
import { useCellEditing } from './useCellEditing';
import { useTableEvents } from './useTableEvents';
import { PurchaseItem } from "@/types/purchases";
import { useEffect } from 'react';

export interface UsePurchaseTableProps {
  items: PurchaseItem[];
  onAddItem: (item: Partial<PurchaseItem>) => void;
  onUpdateItem: (index: number, item: Partial<PurchaseItem>) => void;
  onRemoveItem: (index: number) => void;
  isAddingItem: boolean;
  editingItemIndex: number | null;
  setEditingItemIndex: (index: number | null) => void;
}

export function usePurchaseTable({
  items,
  onAddItem,
  onUpdateItem,
  onRemoveItem,
  isAddingItem,
  editingItemIndex,
  setEditingItemIndex
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
      isEditingCell: activeSearchCell !== null
    });
  }, [items.length, isAddingItem, editingItemIndex, activeSearchCell]);

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
    finishEditing,
  };
}
