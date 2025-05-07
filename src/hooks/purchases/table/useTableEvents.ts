
import { PurchaseItem } from "@/types/purchases";
import { RefObject } from "react";

interface UseTableEventsProps {
  activeSearchCell: { rowIndex: number; cellName: string } | null;
  tableRef: RefObject<HTMLDivElement>;
  setActiveSearchCell: (cell: { rowIndex: number; cellName: string } | null) => void;
  setIsEditingCell: (isEditing: boolean) => void;
  items: PurchaseItem[];
}

export function useTableEvents({
  activeSearchCell,
  tableRef,
  setActiveSearchCell,
  setIsEditingCell,
  items
}: UseTableEventsProps) {
  
  // Handle clicks outside of active cells to close edit mode
  const handleTableClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // If no active search cell, nothing to do
    if (!activeSearchCell) return;
    
    // Check if clicked element is within the search cell
    const activeCell = document.querySelector(`.editable-cell.active`);
    if (activeCell && activeCell.contains(e.target as Node)) {
      return; // Click was inside active cell, don't close
    }
    
    // Check if click was inside the table
    if (tableRef.current && tableRef.current.contains(e.target as Node)) {
      // If not in an active cell but within the table, close the active cell
      setActiveSearchCell(null);
      setIsEditingCell(false);
    }
  };
  
  return {
    handleTableClick
  };
}
