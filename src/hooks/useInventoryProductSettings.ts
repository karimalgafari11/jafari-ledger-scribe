
import { useState, useEffect } from "react";
import { ColumnDefinition } from "@/components/inventory/types";

export const useInventoryProductSettings = (defaultColumns: ColumnDefinition[]) => {
  // Set up state for column visibility
  const [visibleColumns, setVisibleColumns] = useState<string[]>(() => {
    // Try to load from localStorage
    const saved = localStorage.getItem("inventory-product-visible-columns");
    if (saved) {
      return JSON.parse(saved);
    }
    // Default to all columns visible
    return defaultColumns.map(col => col.id);
  });

  // Set up state for column order
  const [columnOrder, setColumnOrder] = useState<string[]>(() => {
    // Try to load from localStorage
    const saved = localStorage.getItem("inventory-product-column-order");
    if (saved) {
      return JSON.parse(saved);
    }
    // Default to original order
    return defaultColumns.map(col => col.id);
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem("inventory-product-visible-columns", JSON.stringify(visibleColumns));
  }, [visibleColumns]);

  useEffect(() => {
    localStorage.setItem("inventory-product-column-order", JSON.stringify(columnOrder));
  }, [columnOrder]);

  // Toggle column visibility
  const toggleColumnVisibility = (columnId: string, visible: boolean) => {
    if (visible && !visibleColumns.includes(columnId)) {
      setVisibleColumns([...visibleColumns, columnId]);
    } else if (!visible && visibleColumns.includes(columnId)) {
      setVisibleColumns(visibleColumns.filter(id => id !== columnId));
    }
  };

  // Update column order
  const updateColumnOrder = (newOrder: string[]) => {
    setColumnOrder(newOrder);
  };

  return {
    visibleColumns,
    columnOrder,
    toggleColumnVisibility,
    updateColumnOrder
  };
};
